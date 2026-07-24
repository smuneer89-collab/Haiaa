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
  photos:     () => photos
};

const CloudSync = (() => {
  let db = null, auth = null, ready = false, user = null;
  let unsubs = [];
  const writeCache = {};   // { collection: { id: jsonString } }
  let applyingRemote = false;
  let allowBigDelete = false;
  let pendingPush = {};

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
        if(++firstDone>=total) setStatus('ok','متصل');
      }, err => { console.error('snapshot '+name, err); setStatus('offline','تعذّر الوصول — تحقّق من الصلاحيات'); });
      unsubs.push(un);
    });

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
      if(++firstDone>=total) setStatus('ok','متصل');
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
    applyingRemote = true;
    try{
      switch(name){
        case 'members':    members=arr;    storage.set('members',JSON.stringify(arr)); break;
        case 'miqats':     miqats=arr;     storage.set('miqats',JSON.stringify(arr)); break;
        case 'meetings':   meetings=arr;   storage.set('meetings',JSON.stringify(arr)); break;
        case 'assemblies': assemblies=arr; storage.set('assemblies',JSON.stringify(arr)); break;
        case 'news':       news=arr;       storage.set('news',JSON.stringify(arr)); break;
        case 'photos':     photos=arr;     storage.set('photos',JSON.stringify(arr)); break;
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

  return { init, signIn, signOut, push, pushSettings, migrate, reapply,
           get isReady(){ return ready; },
           get email(){ return user ? user.email : ''; } };
})();

window.CloudSync = CloudSync;
document.addEventListener('DOMContentLoaded', () => CloudSync.init());
