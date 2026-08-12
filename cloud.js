/* ════════════════════════════════════════════════════════════
   السحابة — ربط هيئة محبي الحسين بـ Firebase
   • تسجيل دخول بالبريد وكلمة المرور
   • مزامنة لحظية: أي تعديل من أي طرف يظهر عند الآخر فوراً
   • يعمل بدون إنترنت ويزامن عند عودة الاتصال
   ════════════════════════════════════════════════════════════ */

const FB_CONFIG = {
  apiKey: "AIzaSyBlAxijaUz0OHwCsq5NnvQ90OVOCsr1vKY",
  authDomain: "haiaa-banijamrah.firebaseapp.com",
  projectId: "haiaa-banijamrah",
  storageBucket: "haiaa-banijamrah.firebasestorage.app",
  messagingSenderId: "499603171369",
  appId: "1:499603171369:web:19c71e92ca2690cfe61438"
};

/* المجموعات: كل عنصر مستند مستقل (يتجاوز حد 1 ميغا للمستند الواحد) */
const CLOUD_COLLECTIONS = {
  members:    () => members,
  miqats:     () => miqats,
  meetings:   () => meetings,
  assemblies: () => assemblies,
  news:       () => news,
  photos:     () => photos,
  reminders:  () => reminders,
  financeLog: () => financeLog,
  paidThawab: () => paidThawab,
  projects:   () => projects,
  auditLog:   () => auditLog,
  radoodParts:() => radoodParts,
  archives:   () => archives,
  revenues:   () => revenues,
  letters:    () => letters,
  mediaItems: () => mediaItems,
  radoods:    () => radoods,
  radoodEvals:() => radoodEvals,
  devIdeas:() => devIdeas,
  devUpdates:() => devUpdates,
  devVersions:() => devVersions,
  memberCandidates:() => memberCandidates
};

const CloudSync = (() => {
  let db = null, auth = null, ready = false, user = null;
  let unsubs = [];
  const writeCache = {};   // { collection: { id: jsonString } }
  let applyingRemote = false;
  let allowBigDelete = false;
  let pendingPush = {};
  const uploadedOnce = {};   // منع تكرار الرفع التلقائي لكل مجموعة
  const ADMIN_EMAILS = ['smuneer89@gmail.com', 'abuyusufjoud@gmail.com'];
  const LINK_TIMEOUT_MS = 15000;

  function withTimeout(promise, ms, code){
    let timer;
    return Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          const err = new Error('انتهت مهلة الاتصال بـ Firebase. تأكد من الإنترنت ثم حاول مرة أخرى.');
          err.code = code || 'cloud/timeout';
          reject(err);
        }, ms);
      })
    ]).finally(() => clearTimeout(timer));
  }

  async function requireLinkAccess(){
    if(!db || !auth) {
      const err = new Error('السحابة لم تجهز بعد. أعد تحميل الصفحة ثم سجّل الدخول.');
      err.code = 'cloud/not-ready';
      throw err;
    }
    const current = auth.currentUser;
    if(!current){
      const err = new Error('انتهت جلسة الدخول. سجّل الدخول من جديد.');
      err.code = 'cloud/not-authenticated';
      throw err;
    }
    const email = String(current.email || '').trim().toLowerCase();
    if(!ADMIN_EMAILS.includes(email)){
      const err = new Error('هذا البريد غير مسموح له بإنشاء الروابط في قواعد Firebase.');
      err.code = 'cloud/email-not-allowed';
      throw err;
    }
    await withTimeout(current.getIdToken(true), LINK_TIMEOUT_MS, 'cloud/auth-timeout');
  }

  async function createLinkSession(collectionName, payload){
    await requireLinkAccess();
    try{
      const data = Object.assign({ closed:false, at:new Date().toISOString() }, payload);
      const ref = await withTimeout(db.collection(collectionName).add(data), LINK_TIMEOUT_MS, 'cloud/write-timeout');
      return ref.id;
    }catch(e){
      if(e && e.code === 'permission-denied'){
        e.message = 'رفضت قواعد Firebase إنشاء الرابط. تأكد من نشر firestore-rules.txt ومن البريد المسجّل.';
      }else if(e && (e.code === 'unavailable' || e.code === 'auth/network-request-failed')){
        e.message = 'تعذّر الوصول إلى Firebase. تحقق من الإنترنت ثم حاول مرة أخرى.';
      }
      throw e;
    }
  }

  /* ── تهيئة ── */
  function init(){
    if(typeof firebase === 'undefined'){ setStatus('offline','السحابة غير متاحة'); return; }
    try{
      firebase.initializeApp(FB_CONFIG);
      db = firebase.firestore();
      auth = firebase.auth();
      db.enablePersistence({ synchronizeTabs: true }).catch(()=>{});
      auth.onAuthStateChanged(u => {
        user = u;
        if(u){ onSignedIn(u); } else { onSignedOut(); }
      });
    }catch(e){ console.error('Cloud init', e); setStatus('offline','تعذّر الاتصال'); }
  }

  /* ── واجهة الدخول ── */
  function showLogin(){ const el=document.getElementById('authOverlay'); if(el) el.style.display='flex'; }
  function hideLogin(){ const el=document.getElementById('authOverlay'); if(el) el.style.display='none'; }

  async function signIn(){
    const em=(document.getElementById('authEmail')||{}).value||'';
    const pw=(document.getElementById('authPass')||{}).value||'';
    const err=document.getElementById('authError');
    if(!em.trim()||!pw){ if(err) err.textContent='أدخل البريد وكلمة المرور'; return; }
    const btn=document.getElementById('authBtn');
    if(btn){ btn.disabled=true; btn.textContent='جارٍ الدخول…'; }
    try{
      await auth.signInWithEmailAndPassword(em.trim(), pw);
      if(err) err.textContent='';
    }catch(e){
      const map={
        'auth/invalid-email':'صيغة البريد غير صحيحة',
        'auth/user-not-found':'لا يوجد حساب بهذا البريد',
        'auth/wrong-password':'كلمة المرور غير صحيحة',
        'auth/invalid-credential':'البريد أو كلمة المرور غير صحيحة',
        'auth/too-many-requests':'محاولات كثيرة — انتظر قليلاً',
        'auth/network-request-failed':'تعذّر الاتصال بالإنترنت'
      };
      if(err) err.textContent = map[e.code] || 'تعذّر تسجيل الدخول';
    }finally{
      if(btn){ btn.disabled=false; btn.textContent='دخول'; }
    }
  }

  async function signOut(){
    if(!confirm('تسجيل الخروج؟ ستبقى نسخة محلية من البيانات على هذا الجهاز.')) return;
    try{ await auth.signOut(); }catch(e){}
  }

  function onSignedIn(u){
    hideLogin();
    ready = true;
    setStatus('syncing','جارٍ المزامنة…');
    const who=document.getElementById('cloudUser'); if(who) who.textContent=u.email||'';
    attachListeners();
  }

  function onSignedOut(){
    ready = false;
    detachListeners();
    setStatus('offline','غير متصل');
    showLogin();
  }

  /* ── مؤشر الحالة ── */
  function setStatus(kind, text){
    const el=document.getElementById('cloudStatus'); if(!el) return;
    el.className='cloud-status '+kind;
    el.textContent=text;
  }

  /* ── الاستماع اللحظي ── */
  function attachListeners(){
    detachListeners();
    let firstDone = 0;
    const total = Object.keys(CLOUD_COLLECTIONS).length + 1;

    Object.keys(CLOUD_COLLECTIONS).forEach(name => {
      const un = db.collection(name).onSnapshot(snap => {
        const arr=[]; const cache={};
        snap.forEach(doc => {
          const data=doc.data();
          let item;
          try{ item = data && typeof data.j === 'string' ? JSON.parse(data.j) : data; }catch(e){ item = null; }
          if(item){ arr.push(item); cache[doc.id]=JSON.stringify(item); }
        });
        writeCache[name]=cache;
        applyRemote(name, arr);
        if(++firstDone>=total){ setStatus('ok','متصل');
          try{ window.dispatchEvent(new CustomEvent('cloud-ready')); }catch(e){} }
      }, err => { console.error('snapshot '+name, err); setStatus('offline','تعذّر الوصول — تحقّق من الصلاحيات'); });
      unsubs.push(un);
    });

    // المالية: مستند واحد
    const unF = db.collection('meta').doc('finance').onSnapshot(doc => {
      if(doc.exists){
        const d=doc.data();
        try{ const f = d && typeof d.j==='string' ? JSON.parse(d.j) : null;
          if(f){ applyingRemote=true; finance=Object.assign({total:0,yearStart:0,expenses:[]},f);
            storage.set('finance',JSON.stringify(finance)); applyingRemote=false;
            if(typeof refreshFinanceViews==='function') refreshFinanceViews(); }
        }catch(e){}
      }
    }, err => console.error('snapshot finance', err));
    unsubs.push(unF);

    // الإعدادات: مستند واحد
    const un2 = db.collection('meta').doc('settings').onSnapshot(doc => {
      if(doc.exists){
        const d=doc.data();
        try{
          const s = d && typeof d.j==='string' ? JSON.parse(d.j) : null;
          if(s){
            applyingRemote=true;
            settings = { ...settings, ...s,
              counters:{...settings.counters, ...(s.counters||{})},
              templates:{...settings.templates, ...(s.templates||{})} };
            storage.set('settings', JSON.stringify(settings));
            applyingRemote=false;
            if(typeof fillSettings==='function' && isVisible('tab-settings')) fillSettings();
          }
        }catch(e){}
      }
      if(++firstDone>=total){ setStatus('ok','متصل');
        try{ window.dispatchEvent(new CustomEvent('cloud-ready')); }catch(e){} }
    }, err => console.error('snapshot settings', err));
    unsubs.push(un2);
  }

  function detachListeners(){ unsubs.forEach(u=>{ try{ u(); }catch(e){} }); unsubs=[]; }

  function isVisible(id){
    const e=document.getElementById(id); if(!e) return false;
    if(e.style.display==='none') return false;
    return e.offsetParent !== null || e.getClientRects().length > 0;
  }

  /* ── تطبيق التغييرات القادمة من السحابة ── */
  const lastRemote = {};
  function reapply(){
    Object.keys(lastRemote).forEach(n => applyRemote(n, lastRemote[n]));
  }
  function applyRemote(name, arr){
    lastRemote[name] = arr;
    // ── حماية: السحابة فاضية والجهاز فيه بيانات ⇒ لا تمسح، بل ارفع المحلي ──
    try{
      const localArr = (CLOUD_COLLECTIONS[name] && CLOUD_COLLECTIONS[name]()) || [];
      if((arr||[]).length===0 && localArr.length>0 && !uploadedOnce[name]){
        uploadedOnce[name]=true;
        console.warn('cloud: السحابة فاضية في «'+name+'» — يُرفع المحلي ('+localArr.length+')');
        writeCache[name]={};
        setTimeout(()=>{ doPush(name, localArr); }, 300);
        return;                       // لا نطبّق الفراغ على الجهاز
      }
    }catch(e){}
    applyingRemote = true;
    try{
      switch(name){
        case 'members':    members=arr;    storage.set('members',JSON.stringify(arr)); break;
        case 'miqats':     miqats=arr;     storage.set('miqats',JSON.stringify(arr)); break;
        case 'meetings':   meetings=arr;   storage.set('meetings',JSON.stringify(arr)); break;
        case 'assemblies': assemblies=arr; storage.set('assemblies',JSON.stringify(arr)); break;
        case 'news':       news=arr;       storage.set('news',JSON.stringify(arr)); break;
        case 'photos':     photos=arr;     storage.set('photos',JSON.stringify(arr)); break;
        case 'reminders':  reminders=arr;  storage.set('reminders',JSON.stringify(arr)); break;
        case 'financeLog': financeLog=arr; storage.set('financeLog',JSON.stringify(arr)); break;
        case 'paidThawab':  paidThawab=arr;  storage.set('paidThawab',JSON.stringify(arr)); break;
        case 'projects':    projects=arr;    storage.set('projects',JSON.stringify(arr)); break;
        case 'auditLog':    auditLog=arr;    storage.set('auditLog',JSON.stringify(arr)); break;
        case 'radoodParts': radoodParts=arr; storage.set('radoodParts',JSON.stringify(arr)); break;
        case 'archives':    archives=arr;    storage.set('archives',JSON.stringify(arr)); break;
        case 'revenues':    revenues=arr;    storage.set('revenues',JSON.stringify(arr)); break;
        case 'letters':     letters=arr;     storage.set('letters',JSON.stringify(arr)); break;
        case 'mediaItems':  mediaItems=arr;  storage.set('mediaItems',JSON.stringify(arr)); break;
        case 'radoods':     radoods=arr;     storage.set('radoods',JSON.stringify(arr)); break;
        case 'radoodEvals': radoodEvals=arr; storage.set('radoodEvals',JSON.stringify(arr)); break;
        case 'devIdeas': devIdeas=arr; storage.set('devIdeas',JSON.stringify(arr)); break;
        case 'devUpdates': devUpdates=arr; storage.set('devUpdates',JSON.stringify(arr)); break;
        case 'devVersions': devVersions=arr; storage.set('devVersions',JSON.stringify(arr)); break;
        case 'memberCandidates': memberCandidates=arr; storage.set('memberCandidates',JSON.stringify(arr)); break;
      }
      refreshViews();
    } finally { applyingRemote = false; }
  }

  /* ── تحديث الشاشة الظاهرة فقط ── */
  let refreshTimer=null;
  function refreshViews(){
    clearTimeout(refreshTimer);
    refreshTimer=setTimeout(()=>{
      try{
        if(isVisible('tab-dashboard') && typeof renderDashboard==='function') renderDashboard();
        if(isVisible('tab-members')   && typeof renderMembers==='function')   renderMembers();
        if(isVisible('tab-miqats')    && typeof renderMiqats==='function')    renderMiqats();
        // صفحات التفاصيل المفتوحة تُحدَّث أيضاً
        if(isVisible('tab-memberpage') && typeof currentMemberPageId!=='undefined' && currentMemberPageId
           && typeof showDetail==='function') showDetail(currentMemberPageId);
        if(isVisible('tab-miqatpage') && typeof currentMiqatPageId!=='undefined' && currentMiqatPageId
           && typeof showMiqatDetail==='function') showMiqatDetail(currentMiqatPageId);
        if(isVisible('tab-calendar') && typeof renderCalReminders==='function'){ renderCalReminders(); if(typeof renderCalendar==='function') renderCalendar(); }
        if(isVisible('tab-devcenter') && typeof renderDevCenter==='function') renderDevCenter();
        if(typeof updateNotifBadge==='function') updateNotifBadge();
      }catch(e){}
    },250);
  }

  /* ── الدفع إلى السحابة (فروق فقط) ── */
  function push(name, arr){
    if(!ready || applyingRemote) return;
    clearTimeout(pendingPush[name]);
    pendingPush[name]=setTimeout(()=>doPush(name, arr), 400);
  }

  async function doPush(name, arr){
    if(!ready || !db) return;
    // حماية: لا نسمح بحذف أكثر من نصف السجلات دفعة واحدة (يمنع المسح العرضي)
    const known = Object.keys(writeCache[name]||{}).length;
    const incoming = (arr||[]).length;
    if(known >= 5 && incoming < known/2 && !allowBigDelete){
      console.warn('cloud: تم منع حذف جماعي في '+name+' ('+known+' → '+incoming+')');
      return;
    }
    try{
      const cache = writeCache[name] || (writeCache[name]={});
      const seen = new Set();
      let batch = db.batch(), ops = 0;

      for(const item of (arr||[])){
        if(!item || !item.id) continue;
        const id = String(item.id);
        seen.add(id);
        const j = JSON.stringify(item);
        if(cache[id] === j) continue;              // لم يتغيّر
        batch.set(db.collection(name).doc(id), { j });
        cache[id] = j;
        if(++ops >= 400){ await batch.commit(); batch = db.batch(); ops = 0; }
      }
      // المحذوفات
      for(const id of Object.keys(cache)){
        if(seen.has(id)) continue;
        batch.delete(db.collection(name).doc(id));
        delete cache[id];
        if(++ops >= 400){ await batch.commit(); batch = db.batch(); ops = 0; }
      }
      if(ops) await batch.commit();
    }catch(e){ console.error('push '+name, e); }
  }

  async function pushSettings(){
    if(!ready || applyingRemote || !db) return;
    try{ await db.collection('meta').doc('settings').set({ j: JSON.stringify(settings) }); }
    catch(e){ console.error('push settings', e); }
  }
  async function pushFinance(){
    if(!ready || applyingRemote || !db) return;
    try{ await db.collection('meta').doc('finance').set({ j: JSON.stringify(finance) }); }
    catch(e){ console.error('push finance', e); }
  }

  /* ── رفع آمن: يرفع بيانات هذا الجهاز بلا حذف أي شيء من السحابة ── */
  async function uploadLocal(){
    if(!ready){ toast('سجّل الدخول للسحابة أولاً'); return; }
    const btn=document.getElementById('uploadLocalBtn');
    if(btn){ btn.disabled=true; btn.textContent='جارٍ الرفع…'; }
    setStatus('syncing','جارٍ رفع بيانات هذا الجهاز…');
    let sent=0;
    try{
      for(const name of Object.keys(CLOUD_COLLECTIONS)){
        const arr = CLOUD_COLLECTIONS[name]() || [];
        let batch = db.batch(), ops = 0;
        const cache = writeCache[name] || (writeCache[name]={});
        for(const item of arr){
          if(!item || !item.id) continue;
          const j = JSON.stringify(item);
          batch.set(db.collection(name).doc(String(item.id)), { j });
          cache[String(item.id)] = j;
          sent++;
          if(++ops >= 400){ await batch.commit(); batch = db.batch(); ops = 0; }
        }
        if(ops) await batch.commit();
      }
      await db.collection('meta').doc('settings').set({ j: JSON.stringify(settings) });
      await db.collection('meta').doc('finance').set({ j: JSON.stringify(finance) });
      setStatus('ok','متصل');
      toast('تم رفع بيانات هذا الجهاز ('+sent+' سجل)');
    }catch(e){
      console.error('uploadLocal', e);
      setStatus('offline','تعذّر الرفع');
      toast('تعذّر الرفع — تحقّق من الاتصال');
    }
    if(btn){ btn.disabled=false; btn.textContent='⬆️ رفع بيانات هذا الجهاز (آمن)'; }
  }

  /* ── النقل الأول: رفع كل البيانات المحلية ── */
  async function migrate(){
    if(!ready){ toast('سجّل الدخول أولاً'); return; }
    const counts = Object.keys(CLOUD_COLLECTIONS).map(n=>`${(CLOUD_COLLECTIONS[n]()||[]).length} ${n}`).join(' · ');
    if(!confirm(`رفع بياناتك الحالية إلى السحابة؟\n\n${counts}\n\nسيتم استبدال ما في السحابة ببيانات هذا الجهاز.`)) return;
    const btn=document.getElementById('migrateBtn');
    if(btn){ btn.disabled=true; btn.textContent='جارٍ الرفع…'; }
    setStatus('syncing','جارٍ رفع البيانات…');
    allowBigDelete = true;
    try{
      for(const name of Object.keys(CLOUD_COLLECTIONS)){
        writeCache[name] = {};                       // إجبار كتابة الكل
        await doPush(name, CLOUD_COLLECTIONS[name]());
      }
      await db.collection('meta').doc('settings').set({ j: JSON.stringify(settings) });
      await db.collection('meta').doc('finance').set({ j: JSON.stringify(finance) });
      setStatus('ok','متصل');
      toast('تم رفع البيانات إلى السحابة ✅');
    }catch(e){
      console.error(e);
      alert('تعذّر الرفع: '+(e && e.message ? e.message : e));
      setStatus('offline','فشل الرفع');
    }finally{
      allowBigDelete = false;
      if(btn){ btn.disabled=false; btn.textContent='☁️ رفع بياناتي إلى السحابة'; }
    }
  }

  // ═══ التقييم الجماعي عبر الرابط ═══
  // إنشاء جلسة تقييم (يعيد معرّف الجلسة)
  async function createEvalSession(payload){
    return createLinkSession('evalSessions', payload);
  }
  // جلب التقييمات الواردة لجلسة معيّنة (الإدارة فقط)
  async function fetchPublicEvals(sessionId){
    if(!db) throw new Error('cloud not ready');
    const snap = await db.collection('publicEvals').where('sessionId','==',sessionId).get();
    return snap.docs.map(d=>Object.assign({ _id:d.id }, d.data()));
  }
  // إغلاق/فتح جلسة
  async function setEvalSessionClosed(sessionId, closed){
    if(!db) return;
    await db.collection('evalSessions').doc(sessionId).update({ closed:!!closed });
  }
  // جلب كل الجلسات (الإدارة)
  async function fetchEvalSessions(){
    if(!db) throw new Error('cloud not ready');
    const snap = await db.collection('evalSessions').get();
    const arr = snap.docs.map(d=>Object.assign({ _id:d.id }, d.data()));
    arr.sort((a,b)=>(b.at||'').localeCompare(a.at||''));
    return arr;
  }

  // ═══ استبيان الرادود ═══
  async function createSurveySession(payload){
    return createLinkSession('surveySessions', payload);
  }
  async function fetchPublicSurveys(sessionId){
    if(!db) throw new Error('cloud not ready');
    const snap = await db.collection('publicSurveys').where('sessionId','==',sessionId).get();
    return snap.docs.map(d=>Object.assign({ _id:d.id }, d.data()));
  }
  async function setSurveySessionClosed(sessionId, closed){
    if(!db) return;
    await db.collection('surveySessions').doc(sessionId).update({ closed:!!closed });
  }
  async function fetchSurveySessions(){
    if(!db) throw new Error('cloud not ready');
    const snap = await db.collection('surveySessions').get();
    const arr = snap.docs.map(d=>Object.assign({ _id:d.id }, d.data()));
    arr.sort((a,b)=>(b.at||'').localeCompare(a.at||''));
    return arr;
  }
  // حذف جلسة استبيان مع كل إجاباتها
  async function deleteSurveySession(sessionId){
    if(!db) throw new Error('cloud not ready');
    const snap = await db.collection('publicSurveys').where('sessionId','==',sessionId).get();
    const batch = db.batch();
    snap.docs.forEach(d=>batch.delete(d.ref));
    batch.delete(db.collection('surveySessions').doc(sessionId));
    await batch.commit();
  }
  // حذف جلسة تقييم مع كل إجاباتها
  async function deleteEvalSession(sessionId){
    if(!db) throw new Error('cloud not ready');
    const snap = await db.collection('publicEvals').where('sessionId','==',sessionId).get();
    const batch = db.batch();
    snap.docs.forEach(d=>batch.delete(d.ref));
    batch.delete(db.collection('evalSessions').doc(sessionId));
    await batch.commit();
  }

  // ═══ الانتخابات ═══
  async function createElection(payload){
    if(!db) throw new Error('cloud not ready');
    const ref = await db.collection('elections').add(Object.assign({ closed:false, round:1, at:new Date().toISOString() }, payload));
    return ref.id;
  }
  async function updateElection(id, patch){
    if(!db) throw new Error('cloud not ready');
    await db.collection('elections').doc(id).update(patch);
  }
  async function fetchElection(id){
    if(!db) throw new Error('cloud not ready');
    const d = await db.collection('elections').doc(id).get();
    return d.exists ? Object.assign({ _id:d.id }, d.data()) : null;
  }
  async function fetchBallots(electionId, round){
    if(!db) throw new Error('cloud not ready');
    let q = db.collection('ballots').where('electionId','==',electionId);
    const snap = await q.get();
    let arr = snap.docs.map(d=>Object.assign({ _id:d.id }, d.data()));
    if(round!=null) arr = arr.filter(b=>Number(b.round||1)===Number(round));
    return arr;
  }
  async function deleteElection(id){
    if(!db) throw new Error('cloud not ready');
    const snap = await db.collection('ballots').where('electionId','==',id).get();
    const batch = db.batch();
    snap.docs.forEach(d=>batch.delete(d.ref));
    batch.delete(db.collection('elections').doc(id));
    await batch.commit();
  }

  // ═══ تقديم المشاريع عبر الرابط ═══
  async function submitPublicProject(payload){
    if(!db) throw new Error('cloud not ready');
    const ref = await db.collection('publicProjects').add(Object.assign({ at:new Date().toISOString() }, payload));
    return ref.id;
  }
  async function fetchPublicProjects(){
    if(!db) throw new Error('cloud not ready');
    const snap = await db.collection('publicProjects').get();
    const arr = snap.docs.map(d=>Object.assign({ _id:d.id }, d.data()));
    arr.sort((a,b)=>(b.at||'').localeCompare(a.at||''));
    return arr;
  }
  async function deletePublicProject(id){
    if(!db) throw new Error('cloud not ready');
    await db.collection('publicProjects').doc(id).delete();
  }

  return { init, signIn, signOut, push, pushSettings, pushFinance, migrate, reapply, uploadLocal,
           createEvalSession, fetchPublicEvals, setEvalSessionClosed, fetchEvalSessions, deleteEvalSession,
           createSurveySession, fetchPublicSurveys, setSurveySessionClosed, fetchSurveySessions, deleteSurveySession,
           submitPublicProject, fetchPublicProjects, deletePublicProject,
           createElection, updateElection, fetchElection, fetchBallots, deleteElection,
           get isReady(){ return ready; },
           get email(){ return user ? user.email : ''; } };
})();

window.CloudSync = CloudSync;
document.addEventListener('DOMContentLoaded', () => CloudSync.init());
