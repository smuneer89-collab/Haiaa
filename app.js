/* ═══════════════════════════════════════════════════════════
   هيئة محبي الحسين — نظام العضويات (PWA, يعمل دون إنترنت)
   ═══════════════════════════════════════════════════════════ */

/* ─── Offline storage: IndexedDB with localStorage fallback ─── */
const storage = (() => {
  const DB_NAME = 'husain_db', STORE = 'kv';
  let dbPromise = null, mem = {};
  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      let req;
      try { req = indexedDB.open(DB_NAME, 1); }
      catch (e) { return reject(e); }
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }
  function lsGet(k){ try { return localStorage.getItem('kv_'+k); } catch(e){ return mem[k] ?? null; } }
  function lsSet(k,v){ try { localStorage.setItem('kv_'+k,v); } catch(e){ mem[k]=v; } }
  return {
    async get(key) {
      try {
        const db = await openDB();
        return await new Promise((res, rej) => {
          const r = db.transaction(STORE,'readonly').objectStore(STORE).get(key);
          r.onsuccess = () => res(r.result === undefined ? null : r.result);
          r.onerror = () => rej(r.error);
        });
      } catch(e) { return lsGet(key); }
    },
    async set(key, value) {
      try {
        const db = await openDB();
        return await new Promise((res, rej) => {
          const r = db.transaction(STORE,'readwrite').objectStore(STORE).put(value, key);
          r.onsuccess = () => res(true); r.onerror = () => rej(r.error);
        });
      } catch(e) { lsSet(key, value); return true; }
    }
  };
})();

/* ─── Constants ─── */
const TYPE_LETTER = { 'عادي': 'A', 'شرفي': 'H', 'كادر': 'E' };
const AR_MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const HIJRI_MONTHS = ['محرم','صفر','ربيع الأول','ربيع الثاني','جمادى الأولى','جمادى الثانية','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'];
const HIJRI_LEN = [30,29,30,29,30,29,30,29,30,29,30,29]; // approx month lengths for ordering

/* ─── State ─── */
let members = [];
let miqats = [];   // {id, name, day, month, requiredAmount, bookings:[{memberId, amount}]}
let news = [];     // {id, title, body, date}
let settings = {
  fee: 30, year: 1448,
  counters: { 'عادي': 1, 'شرفي': 1, 'كادر': 1 },
  templates: {
    reminder: 'السلام عليكم ورحمة الله،\nنذكّركم بدفع اشتراك العضوية السنوي في هيئة محبي الحسين. قيمة الاشتراك {fee} د.ب.\nيمكنكم التواصل مع أمانة السر للترتيب.\nبارك الله فيكم.',
    meeting: 'السلام عليكم ورحمة الله،\nندعوكم لحضور اجتماع أعضاء الهيئة يوم [التاريخ] الساعة [الوقت] في مقر الهيئة.\nحضوركم مهم.\nبارك الله فيكم.',
    condolence: 'إنا لله وإنا إليه راجعون.\nنعزّي أنفسنا وإياكم في مصابنا بسيد الشهداء الإمام الحسين عليه السلام.\nأعظم الله لكم الأجر.',
    celebration: 'السلام عليكم ورحمة الله،\nنبارك لكم مولد [المناسبة]، جعله الله عليكم مباركاً.\nكل عام وأنتم بخير.'
  }
};
let currentPhoto = null;

/* ─── Helpers ─── */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2500); }
function escapeHtml(s){ if(s==null) return ''; return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function today(){ return new Date().toISOString().split('T')[0]; }
function padNum(n){ return String(n).padStart(4,'0'); }
function memberCode(m){ return `${TYPE_LETTER[m.type]||'A'}-${padNum(m.number)}`; }
function fmtMoney(n){ return (Number(n)||0).toFixed(3)+' د.ب'; }

function fmtDate(iso){ if(!iso) return '—'; const d=new Date(iso); if(isNaN(d)) return '—';
  return `${d.getDate()} ${AR_MONTHS[d.getMonth()]} ${d.getFullYear()}`; }
function fmtDateShort(iso){ if(!iso) return '—'; const d=new Date(iso); if(isNaN(d)) return '—';
  const p=n=>String(n).padStart(2,'0'); return `${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()}`; }
function addYear(iso){ const d=new Date(iso); d.setFullYear(d.getFullYear()+1); return d.toISOString().split('T')[0]; }
/* العضوية هجرية: تبدأ محرم {سنة} وتنتهي محرم {سنة+1} */
function currentHijriYear(){ return parseInt(hijriParts().year) || 1448; }
function memberStartYear(m){ return m.hijriStartYear || settings.year || 1448; }
function memberEndYear(m){ return m.hijriEndYear || (memberStartYear(m) + 1); }
function isActive(m){ if(!m.paymentDate) return false; return currentHijriYear() < memberEndYear(m); }
function fmtHijriStart(m){ return `محرم ${memberStartYear(m)} هـ`; }
function fmtHijriEnd(m){ return `محرم ${memberEndYear(m)} هـ`; }
function fmtMiqatDate(m){ if(!m) return ''; return `${m.day} ${HIJRI_MONTHS[m.month]}`; }

function hijriParts(){
  try {
    const p = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{day:'numeric',month:'numeric',year:'numeric'}).formatToParts(new Date());
    return { day:+p.find(x=>x.type==='day').value, month:+p.find(x=>x.type==='month').value-1, year:p.find(x=>x.type==='year').value.replace(/\D/g,'') };
  } catch(e){ return {day:1,month:0,year:'1448'}; }
}
function hijriToday(){ const h=hijriParts(); return `${h.day} ${HIJRI_MONTHS[h.month]} ${h.year} هـ`; }

/* ─── Miqat status ─── */
function miqatPaid(mq){ return (mq.bookings||[]).reduce((s,b)=>s+(Number(b.amount)||0),0); }
function miqatStatus(mq){
  const paid = miqatPaid(mq); const req = Number(mq.requiredAmount)||0;
  if (paid <= 0) return 'red';
  if (req > 0 && paid < req) return 'yellow';
  return 'green';
}
const STATUS_LABEL = { green:'محجوز', yellow:'يحتاج تعزيز', red:'غير محجوز' };

/* ─── Storage load/save ─── */
async function loadData(){
  try { const m=await storage.get('members'); if(m) members=JSON.parse(m); } catch(e){ members=[]; }
  try { const q=await storage.get('miqats'); if(q) miqats=JSON.parse(q); } catch(e){ miqats=[]; }
  try { const n=await storage.get('news'); if(n) news=JSON.parse(n); } catch(e){ news=[]; }
  try { const s=await storage.get('settings'); if(s) settings={...settings,...JSON.parse(s),
    counters:{...settings.counters,...(JSON.parse(s).counters||{})},
    templates:{...settings.templates,...(JSON.parse(s).templates||{})}}; } catch(e){}
}
async function saveMembers(){ try{ await storage.set('members',JSON.stringify(members)); }catch(e){ toast('تعذر الحفظ'); } }
async function saveMiqats(){ try{ await storage.set('miqats',JSON.stringify(miqats)); }catch(e){ toast('تعذر الحفظ'); } }
async function saveNews(){ try{ await storage.set('news',JSON.stringify(news)); }catch(e){} }
async function persistSettings(){ try{ await storage.set('settings',JSON.stringify(settings)); }catch(e){} }

/* ─── WhatsApp ─── */
function normalizePhone(phone){ let c=String(phone||'').replace(/\D/g,''); if(c.startsWith('00'))c=c.slice(2); if(c.startsWith('973'))return c; return '973'+c; }
function whatsappLink(phone,text){ const n=normalizePhone(phone); const q=text?`?text=${encodeURIComponent(text)}`:''; return `https://wa.me/${n}${q}`; }
const WA_ICON = '<svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2M12.05 3.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1 2.57.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01"/></svg>';

/* ─── Photo processing ─── */
function processPhoto(file, maxSize=320, quality=.72){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=e=>{ const img=new Image();
      img.onload=()=>{ const canvas=document.createElement('canvas'); let w=img.width,h=img.height;
        if(w>h){ if(w>maxSize){ h=h*maxSize/w; w=maxSize; } } else { if(h>maxSize){ w=w*maxSize/h; h=maxSize; } }
        canvas.width=w; canvas.height=h; canvas.getContext('2d').drawImage(img,0,0,w,h);
        resolve(canvas.toDataURL('image/jpeg',quality)); };
      img.onerror=reject; img.src=e.target.result; };
    reader.onerror=reject; reader.readAsDataURL(file);
  });
}
async function handlePhotoSelect(e){
  const file=e.target.files[0]; if(!file) return;
  if(file.size>10*1024*1024){ toast('الصورة كبيرة جداً (أقل من 10 ميجا)'); return; }
  try{ currentPhoto=await processPhoto(file); $('#photoPreview').innerHTML=`<img src="${currentPhoto}" alt="" />`; }
  catch(err){ toast('تعذّرت معالجة الصورة'); }
}

/* ─── Header dates ─── */
function fillHeaderDates(){ $('#dateGregorian').textContent=fmtDate(today()); $('#dateHijri').textContent=hijriToday(); }

/* ─── Tabs ─── */
$$('.tab').forEach(t=>{
  t.addEventListener('click',()=>{
    $$('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active');
    $$('.tab-content').forEach(c=>c.style.display='none');
    $('#tab-'+t.dataset.tab).style.display='block';
    if(t.dataset.tab==='dashboard') renderDashboard();
    if(t.dataset.tab==='members') renderMembers();
    if(t.dataset.tab==='miqats') renderMiqats();
    if(t.dataset.tab==='admins') renderAdmins();
    if(t.dataset.tab==='settings') fillSettings();
    window.scrollTo({top:0,behavior:'smooth'});
  });
});
function switchTab(name){ const b=document.querySelector(`.tab[data-tab="${name}"]`); if(b) b.click(); }

/* ═══════════ Dashboard ═══════════ */
function renderDashboard(){
  const total=members.length, active=members.filter(isActive).length;
  $('#statTotal').textContent=total; $('#statActive').textContent=active; $('#statInactive').textContent=total-active;
  renderUpcoming(); renderNews(); $('#globalSearch').value=''; $('#searchResults').innerHTML='';
}
/* الضغط على الإحصائيات يفتح قائمة الأعضاء مفلترة */
function openMembersFiltered(status){
  switchTab('members');
  const sel=$('#filterStatus'); if(sel){ sel.value=status||''; }
  const q=$('#searchInput'); if(q) q.value='';
  const t=$('#filterType'); if(t) t.value='';
  renderMembers();
}

/* Upcoming occasions within ~2 hijri months */
function renderUpcoming(){
  const h=hijriParts();
  const cur = h.month; // 0-based
  // gather all miqats + member annual miqats as occasions
  const occ=[];
  miqats.forEach(mq=> occ.push({name:mq.name, day:mq.day, month:mq.month}));
  const seen=new Set(occ.map(o=>o.name+o.day+o.month));
  // compute "months ahead" (0,1,2) within window
  const withinTwo = occ.filter(o=>{
    let diff = (o.month - cur + 12) % 12;
    if (diff === 0) return o.day >= h.day; // this month, upcoming day
    return diff <= 2;
  }).sort((a,b)=>{
    let da=(a.month-cur+12)%12, db=(b.month-cur+12)%12;
    if(da!==db) return da-db; return a.day-b.day;
  });
  const el=$('#upcomingOccasions');
  if(!withinTwo.length){ el.innerHTML=`<div class="empty"><div class="txt">لا توجد مناسبات خلال الشهرين القادمين</div></div>`; return; }
  el.innerHTML=withinTwo.map(o=>{
    let diff=(o.month-cur+12)%12;
    const when = diff===0?'هذا الشهر':(diff===1?'الشهر القادم':'بعد شهرين');
    return `<div class="occasion-alert"><div class="oa-name">${escapeHtml(o.name)}</div>
      <div class="oa-meta">${o.day} ${HIJRI_MONTHS[o.month]} · ${when}</div></div>`;
  }).join('');
}

/* News */
function renderNews(){
  const el=$('#newsList');
  if(!news.length){ el.innerHTML=`<div class="empty"><div class="icon">📰</div><div class="txt">لا توجد أخبار بعد. أضف خبراً ليظهر هنا وللأعضاء.</div></div>`; return; }
  el.innerHTML=[...news].reverse().map(n=>`
    <div class="news-item">
      <button class="n-del" onclick="deleteNews('${n.id}')">🗑</button>
      <div class="n-date">${fmtDate(n.date)}</div>
      <div class="n-title">${escapeHtml(n.title)}</div>
      <div class="n-body">${escapeHtml(n.body)}</div>
    </div>`).join('');
}
function openNewsModal(){ $('#newsTitle').value=''; $('#newsBody').value=''; $('#newsModal').classList.add('open'); }
async function saveNews_(){}
async function saveNews(){
  const title=$('#newsTitle').value.trim(), body=$('#newsBody').value.trim();
  if(!title){ toast('اكتب عنواناً'); return; }
  news.push({id:'n_'+Date.now(), title, body, date:today()});
  await storage.set('news',JSON.stringify(news));
  closeModal('newsModal'); renderNews(); toast('تم نشر الخبر');
}
async function deleteNews(id){ if(!confirm('حذف هذا الخبر؟')) return; news=news.filter(n=>n.id!==id); await storage.set('news',JSON.stringify(news)); renderNews(); }

/* Global search */
$('#globalSearch')?.addEventListener('input', globalSearch);
function globalSearch(){
  const q=($('#globalSearch').value||'').trim().toLowerCase();
  const el=$('#searchResults');
  if(!q){ el.innerHTML=''; return; }
  const hits=[];
  members.forEach(m=>{
    const hay=`${m.name} ${memberCode(m)} ${m.phone} ${m.birthdate||''} ${m.area||''}`.toLowerCase();
    if(hay.includes(q)) hits.push({kind:'عضو', label:`${m.name} · ${memberCode(m)}`, action:()=>showDetail(m.id)});
  });
  miqats.forEach(mq=>{
    if((mq.name||'').toLowerCase().includes(q)) hits.push({kind:'ميقات', label:`${mq.name} · ${fmtMiqatDate(mq)}`, action:()=>showMiqatDetail(mq.id)});
  });
  news.forEach(n=>{ if((n.title+' '+n.body).toLowerCase().includes(q)) hits.push({kind:'خبر', label:n.title, action:()=>showNewsDetail(n.id)}); });
  if(!hits.length){ el.innerHTML=`<div class="empty"><div class="txt">لا نتائج</div></div>`; return; }
  el.innerHTML=hits.slice(0,20).map((h,i)=>`<div class="search-hit" data-i="${i}"><span>${escapeHtml(h.label)}</span><span class="kind">${h.kind}</span></div>`).join('');
  el.querySelectorAll('.search-hit').forEach(node=>node.addEventListener('click',()=>hits[+node.dataset.i].action()));
}

/* تفاصيل الميقات الكاملة */
function showMiqatDetail(id){
  const mq=miqats.find(x=>x.id===id); if(!mq) return;
  const st=miqatStatus(mq), paid=miqatPaid(mq), req=Number(mq.requiredAmount)||0;
  const pct=req>0?Math.min(100,Math.round(paid/req*100)):(paid>0?100:0);
  const bookers=(mq.bookings||[]).map(b=>{ const m=members.find(x=>x.id===b.memberId);
    return `<li><span class="name">${m?escapeHtml(m.name):'—'} <span style="color:var(--muted)">${m?memberCode(m):''}</span></span><span class="date">${fmtMoney(b.amount)}</span></li>`;
  }).join('');
  $('#miqatDetailTitle').textContent=mq.name;
  $('#miqatDetailSub').innerHTML=`${fmtMiqatDate(mq)} · <span class="badge mc-status st-${st}">${STATUS_LABEL[st]}</span>`;
  $('#miqatDetailContent').innerHTML=`
    <div class="detail-rows">
      ${detailRow('التاريخ الهجري', fmtMiqatDate(mq))}
      ${detailRow('المبلغ المطلوب', fmtMoney(req))}
      ${detailRow('المبلغ الموصول', fmtMoney(paid))}
      ${detailRow('المتبقّي', fmtMoney(Math.max(0,req-paid)))}
      ${detailRow('عدد المشاركين', (mq.bookings||[]).length)}
    </div>
    <div class="progress" style="margin:12px 0;"><span style="width:${pct}%"></span></div>
    <div class="detail-miqats"><div class="title">المشاركون ومساهماتهم</div>
      <ul>${bookers||'<li><span class="name" style="color:var(--muted)">لا يوجد مشاركون بعد</span></li>'}</ul>
    </div>
    <div class="actions-row">
      <button class="btn btn-primary" onclick="closeModal('miqatDetailModal'); openBooking('${mq.id}')">+ حجز عضو</button>
      <button class="btn btn-ghost" onclick="closeModal('miqatDetailModal'); openMiqatModal('${mq.id}')">تعديل الميقات</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal('miqatDetailModal'); switchTab('miqats');">عرض في قائمة المواقيت</button>
    </div>`;
  $('#miqatDetailModal').classList.add('open');
}

/* تفاصيل الخبر */
function showNewsDetail(id){
  const n=news.find(x=>x.id===id); if(!n) return;
  $('#newsDetailTitle').textContent=n.title;
  $('#newsDetailSub').textContent=fmtDate(n.date);
  $('#newsDetailContent').innerHTML=`<div style="white-space:pre-wrap; font-size:14px; line-height:1.8; color:var(--ink-2);">${escapeHtml(n.body||'')}</div>`;
  $('#newsDetailModal').classList.add('open');
}

/* ═══════════ Members ═══════════ */
function memberRowHTML(m){
  const status=isActive(m)?'active':'inactive';
  const statusLabel=isActive(m)?'عضوية مفعّلة':'عضوية غير مفعّلة';
  const adminBadge=m.isAdmin?'<span class="badge admin">إداري</span>':'';
  return `<div class="member-row ${status}" onclick="showDetail('${m.id}')">
    <div class="member-info">
      <div class="name">${escapeHtml(m.name)} ${adminBadge}</div>
      <div class="meta"><span class="badge status-${status}">${statusLabel}</span></div>
    </div>
    <div class="member-num">${memberCode(m)}</div>
  </div>`;
}
function renderMembers(){
  const q=($('#searchInput')?.value||'').trim().toLowerCase();
  const status=$('#filterStatus')?.value||''; const type=$('#filterType')?.value||'';
  let list=members.filter(m=>{
    if(q){ const hay=`${m.name} ${memberCode(m)} ${m.phone}`.toLowerCase(); if(!hay.includes(q)) return false; }
    if(status==='active'&&!isActive(m)) return false;
    if(status==='inactive'&&isActive(m)) return false;
    if(type&&m.type!==type) return false;
    return true;
  });
  list.sort((a,b)=>b.number-a.number);
  $('#membersCount').textContent=`${list.length} من ${members.length} عضو`;
  $('#membersList').innerHTML=list.length?list.map(memberRowHTML).join(''):`<div class="empty"><div class="icon">⌕</div><div class="txt">لا توجد نتائج</div></div>`;
}
$('#searchInput')?.addEventListener('input',renderMembers);
$('#filterStatus')?.addEventListener('change',renderMembers);
$('#filterType')?.addEventListener('change',renderMembers);

/* ═══════════ Add member form ═══════════ */
$('#isAdminToggle').addEventListener('change',e=>{ $('#adminCommWrap').style.display=e.target.checked?'block':'none'; });
/* سؤال العمر: البالغ لا يحتاج بيانات، والصغير نأخذ تاريخ ميلاده فقط */
$('#isAdultToggle')?.addEventListener('change',e=>{
  const adult=e.target.checked;
  $('#minorBirthWrap').style.display=adult?'none':'block';
  if(adult) $('#minorBirthdate').value='';
});
$('#editIsMinor')?.addEventListener('change',e=>{ $('#editBirthWrap').style.display=e.target.checked?'block':'none'; });
$('#editIsAdmin')?.addEventListener('change',e=>{ $('#editCommWrap').style.display=e.target.checked?'block':'none'; });
$('#hasMiqatToggle').addEventListener('change',e=>{
  const c=$('#miqatsContainer');
  if(e.target.checked){
    if(!miqats.length){
      toast('لا توجد مواقيت مسجّلة — أضفها من قائمة المواقيت أولاً');
      e.target.checked=false; return;
    }
    c.classList.add('open'); if(!c.querySelector('.miqat-entry')) addMiqatEntry();
  }
  else { c.classList.remove('open'); c.querySelectorAll('.miqat-entry').forEach(el=>el.remove()); }
});
function miqatEntryHTML(){
  const opts=miqatsByNearest().map(mq=>{
    const st=miqatStatus(mq);
    return `<option value="${mq.id}">${escapeHtml(mq.name)} — ${fmtMiqatDate(mq)} (${STATUS_LABEL[st]})</option>`;
  }).join('');
  return `<div class="miqat-entry">
    <div class="field"><label>اختر الميقات</label>
      <select class="miqat-select" onchange="updateMiqatInfo(this)">
        <option value="">— اختر من قائمة المواقيت —</option>
        ${opts}
      </select></div>
    <div class="miqat-info" style="display:none"></div>
    <div class="field"><label>مساهمة العضو (د.ب)</label>
      <input type="number" class="miqat-amount" min="0" step="0.001" placeholder="0" oninput="updateMiqatPreview(this)" /></div>
    <div class="miqat-preview" style="display:none"></div>
    <button type="button" class="remove-btn" onclick="this.closest('.miqat-entry').remove()">× إزالة</button>
  </div>`;
}
/* عرض بيانات الميقات المختار */
function updateMiqatInfo(sel){
  const entry=sel.closest('.miqat-entry');
  const info=entry.querySelector('.miqat-info');
  const mq=miqats.find(x=>x.id===sel.value);
  if(!mq){ info.style.display='none'; updateMiqatPreview(entry.querySelector('.miqat-amount')); return; }
  const req=Number(mq.requiredAmount)||0, paid=miqatPaid(mq), rem=Math.max(0,req-paid);
  const st=miqatStatus(mq);
  info.style.display='block';
  info.innerHTML=`
    <div class="mq-info-box">
      <div class="mq-info-row"><span>التاريخ الهجري</span><b>${fmtMiqatDate(mq)}</b></div>
      <div class="mq-info-row"><span>المبلغ المطلوب</span><b>${fmtMoney(req)}</b></div>
      <div class="mq-info-row"><span>الموصول حالياً</span><b>${fmtMoney(paid)}</b></div>
      <div class="mq-info-row"><span>المتبقّي</span><b>${fmtMoney(rem)}</b></div>
      <div class="mq-info-row"><span>الحالة الحالية</span><span class="mc-status st-${st}">${STATUS_LABEL[st]}</span></div>
    </div>`;
  updateMiqatPreview(entry.querySelector('.miqat-amount'));
}
/* معاينة الحالة بعد مساهمة العضو */
function updateMiqatPreview(input){
  const entry=input.closest('.miqat-entry');
  const prev=entry.querySelector('.miqat-preview');
  const mq=miqats.find(x=>x.id===entry.querySelector('.miqat-select').value);
  const amt=parseFloat(input.value)||0;
  if(!mq||amt<=0){ prev.style.display='none'; return; }
  const req=Number(mq.requiredAmount)||0;
  const total=miqatPaid(mq)+amt;
  const newSt = total<=0 ? 'red' : (req>0 && total<req ? 'yellow' : 'green');
  const msg = newSt==='green'
    ? `✅ سيكتمل المبلغ — يُحجز الميقات باسم العضو`
    : `⚠️ المساهمة أقل من المطلوب — ينتقل الميقات إلى «يحتاج تعزيز» (المتبقّي ${fmtMoney(Math.max(0,req-total))})`;
  prev.style.display='block';
  prev.innerHTML=`<div class="mq-preview-box st-${newSt}">${msg}</div>`;
}
function addMiqatEntry(){ const c=$('#miqatsContainer'); const btn=c.querySelector('.add-miqat-btn');
  const d=document.createElement('div'); d.innerHTML=miqatEntryHTML(); c.insertBefore(d.firstElementChild,btn); }
function collectFormMiqats(){
  const list=[]; $$('#miqatsContainer .miqat-entry').forEach(el=>{
    const miqatId=el.querySelector('.miqat-select').value;
    const amount=parseFloat(el.querySelector('.miqat-amount').value)||0;
    if(miqatId) list.push({miqatId, amount});
  }); return list;
}
function resetForm(){ $('#isAdminToggle').checked=false; $('#adminCommWrap').style.display='none'; $('#adminCommInput').value='';
  $('#hasMiqatToggle').checked=false; const c=$('#miqatsContainer'); c.classList.remove('open');
  c.querySelectorAll('.miqat-entry').forEach(el=>el.remove()); currentPhoto=null; $('#photoPreview').innerHTML='👤';
  const pi=$('#photoInput'); if(pi) pi.value='';
  const ad=$('#isAdultToggle'); if(ad){ ad.checked=true; $('#minorBirthWrap').style.display='none'; $('#minorBirthdate').value=''; } }

$('#addForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const fd=new FormData(e.target); const type=fd.get('type'); const num=settings.counters[type]||1;
  const isAdmin=$('#isAdminToggle').checked;
  const hasMiqat=$('#hasMiqatToggle').checked; const formMiqats=hasMiqat?collectFormMiqats():[];
  if(hasMiqat&&formMiqats.length===0){ toast('أضف بيانات ميقات واحد على الأقل أو أطفئ الخيار'); return; }

  // العمر: سؤال بنعم/لا. البالغ (18+) لا يحتاج عمراً ولا تاريخ ميلاد.
  const isAdult=$('#isAdultToggle').checked;
  const isMinor=!isAdult;
  let birthdate=null, age=null;
  if(isMinor){
    birthdate=$('#minorBirthdate').value;
    if(!birthdate){ toast('أدخل تاريخ ميلاد العضو'); return; }
    age=ageFromBirthdate(birthdate);
  }

  const newMember={
    id:'m_'+Date.now()+'_'+Math.random().toString(36).slice(2,6),
    number:num, type,
    name:fd.get('name').trim(), isMinor, age, birthdate,
    phone:fd.get('phone').trim(), area:(fd.get('area')||'').trim(),
    email:(fd.get('email')||'').trim(), address:(fd.get('address')||'').trim(),
    photo:currentPhoto||null, isAdmin, committee:isAdmin?($('#adminCommInput').value.trim()):'',
    miqats:formMiqats, joinDate:today(), paymentDate:null, expiryDate:null, paidAmount:null
  };
  members.push(newMember);
  settings.counters[type]=num+1;

  // تسجيل مساهمة العضو في المواقيت المختارة (الحالة تُحسب تلقائياً)
  let completed=0, needsBoost=0;
  formMiqats.forEach(fm=>{
    const mq=miqats.find(x=>x.id===fm.miqatId); if(!mq) return;
    mq.bookings=mq.bookings||[];
    const ex=mq.bookings.find(b=>b.memberId===newMember.id);
    if(ex) ex.amount=(Number(ex.amount)||0)+fm.amount;
    else mq.bookings.push({memberId:newMember.id, amount:fm.amount});
    const st=miqatStatus(mq);
    if(st==='green') completed++; else if(st==='yellow') needsBoost++;
  });

  await saveMembers(); await saveMiqats(); await persistSettings();
  e.target.reset(); resetForm();
  let msg=`تم تسجيل العضو ${memberCode(newMember)}`;
  if(completed) msg+=` · ${completed} ميقات محجوز`;
  if(needsBoost) msg+=` · ${needsBoost} يحتاج تعزيز`;
  toast(msg);
  openCard(newMember.id);
});

/* ═══════════ Member detail ═══════════ */
function memberMiqats(m){ return miqats.filter(mq=>(mq.bookings||[]).some(b=>b.memberId===m.id)); }
function showDetail(id){
  const m=members.find(x=>x.id===id); if(!m) return;
  const active=isActive(m);
  $('#detailTitle').textContent=m.name;
  $('#detailSubtitle').innerHTML=`<span style="font-weight:600;color:var(--ink)">${memberCode(m)}</span> · ${m.type} · <span class="badge status-${active?'active':'inactive'}">${active?'مفعّلة':'غير مفعّلة'}</span> ${m.isAdmin?'· <span class="badge admin">إداري</span>':''}`;
  const mms=memberMiqats(m);
  const miqatsHTML=mms.length?`<div class="detail-miqats"><div class="title">مواقيته</div><ul>
    ${mms.map(mq=>{ const b=mq.bookings.find(x=>x.memberId===m.id); return `<li><span class="name">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</span><span class="date">${fmtMoney(b?b.amount:0)}</span></li>`; }).join('')}
    </ul></div>`:'';
  $('#detailContent').innerHTML=`
    <div class="detail-rows">
      ${m.isMinor&&m.birthdate?detailRow('تاريخ الميلاد', fmtDate(m.birthdate)):''}
      ${m.isMinor&&m.age!=null?detailRow('العمر', m.age):''}
      ${detailRow('الهاتف', m.phone)}
      ${m.area?detailRow('المنطقة',m.area):''}
      ${m.email?detailRow('الإيميل',m.email):''}
      ${m.address?detailRow('العنوان',m.address):''}
      ${m.isAdmin?detailRow('اللجنة', m.committee||'—'):''}
      ${detailRow('تاريخ التسجيل', fmtDate(m.joinDate))}
      ${m.paymentDate?detailRow('بداية العضوية', fmtHijriStart(m)):''}
      ${m.paymentDate?detailRow('انتهاء العضوية', fmtHijriEnd(m)):''}
      ${m.paidAmount!=null?detailRow('المبلغ المدفوع',fmtMoney(m.paidAmount)):''}
    </div>
    ${miqatsHTML}
    <div class="actions-row">
      ${!active?`<button class="btn btn-primary" onclick="recordPayment('${m.id}')">تسجيل الاشتراك (${settings.fee} د.ب)</button>`:''}
      ${active?`<button class="btn btn-accent" onclick="openCard('${m.id}')">بطاقة العضوية</button>`:''}
      <button class="btn btn-ghost" onclick="openEditMember('${m.id}')">✏️ تعديل الملف</button>
      <a href="${whatsappLink(m.phone)}" target="_blank" class="btn wa-btn large">${WA_ICON} واتساب</a>
      ${active?`<button class="btn btn-ghost" onclick="renewPayment('${m.id}')">تجديد سنة</button>`:''}
      <button class="btn btn-ghost btn-sm" onclick="toggleAdmin('${m.id}')">${m.isAdmin?'إزالة من الإدارة':'تعيين كإداري'}</button>
      <button class="btn btn-danger btn-sm" onclick="deleteMember('${m.id}')">حذف</button>
    </div>`;
  $('#detailModal').classList.add('open');
}

/* ═══════════ تعديل ملف العضو ═══════════ */
let editingMemberId=null;
function openEditMember(id){
  const m=members.find(x=>x.id===id); if(!m) return;
  editingMemberId=id;
  $('#editName').value=m.name||'';
  $('#editPhone').value=m.phone||'';
  $('#editType').value=m.type||'عادي';
  $('#editArea').value=m.area||'';
  $('#editEmail').value=m.email||'';
  $('#editAddress').value=m.address||'';
  $('#editIsMinor').checked=!!m.isMinor;
  $('#editBirthWrap').style.display=m.isMinor?'block':'none';
  $('#editBirthdate').value=m.birthdate||'';
  $('#editIsAdmin').checked=!!m.isAdmin;
  $('#editCommWrap').style.display=m.isAdmin?'block':'none';
  $('#editComm').value=m.committee||'';
  editPhoto=m.photo||null;
  $('#editPhotoPreview').innerHTML=editPhoto?`<img src="${editPhoto}" alt="" />`:'👤';
  closeModal('detailModal');
  $('#editModal').classList.add('open');
}
let editPhoto=null;
async function handleEditPhoto(e){
  const file=e.target.files[0]; if(!file) return;
  try{ editPhoto=await processPhoto(file); $('#editPhotoPreview').innerHTML=`<img src="${editPhoto}" alt="" />`; }
  catch(err){ toast('تعذّرت معالجة الصورة'); }
}
async function saveEditMember(){
  const m=members.find(x=>x.id===editingMemberId); if(!m) return;
  const name=$('#editName').value.trim(); const phone=$('#editPhone').value.trim();
  if(!name||!phone){ toast('الاسم والهاتف مطلوبان'); return; }
  m.name=name; m.phone=phone; m.type=$('#editType').value;
  m.area=$('#editArea').value.trim(); m.email=$('#editEmail').value.trim(); m.address=$('#editAddress').value.trim();
  m.isMinor=$('#editIsMinor').checked;
  if(m.isMinor){ m.birthdate=$('#editBirthdate').value||null; m.age=m.birthdate?ageFromBirthdate(m.birthdate):null; }
  else { m.birthdate=null; m.age=null; }
  m.isAdmin=$('#editIsAdmin').checked; m.committee=m.isAdmin?$('#editComm').value.trim():'';
  m.photo=editPhoto||null;
  await saveMembers();
  closeModal('editModal'); toast('تم حفظ التعديلات');
  renderMembers(); renderAdmins(); renderDashboard();
  showDetail(m.id);
}
function ageFromBirthdate(iso){
  const b=new Date(iso); if(isNaN(b)) return null;
  const t=new Date(); let a=t.getFullYear()-b.getFullYear();
  const md=t.getMonth()-b.getMonth();
  if(md<0||(md===0&&t.getDate()<b.getDate())) a--;
  return a;
}
function detailRow(k,v){ return `<div class="detail-row"><span class="k">${k}</span><span class="v">${v}</span></div>`; }
function closeModal(id){ $('#'+id).classList.remove('open'); }

async function recordPayment(id){ const m=members.find(x=>x.id===id); if(!m) return;
  m.paymentDate=today(); m.expiryDate=addYear(m.paymentDate); m.paidAmount=settings.fee;
  m.hijriStartYear=settings.year||1448; m.hijriEndYear=(settings.year||1448)+1;
  await saveMembers(); toast('تم تسجيل الاشتراك — العضوية مفعّلة'); closeModal('detailModal'); openCard(id); renderDashboard(); }
async function renewPayment(id){ const m=members.find(x=>x.id===id); if(!m) return;
  const start=memberEndYear(m);
  if(!confirm(`تجديد العضوية: محرم ${start} هـ حتى محرم ${start+1} هـ؟`)) return;
  m.paymentDate=today(); m.expiryDate=addYear(m.paymentDate); m.paidAmount=settings.fee;
  m.hijriStartYear=start; m.hijriEndYear=start+1;
  await saveMembers(); toast('تم التجديد'); showDetail(id); renderMembers(); }
async function toggleAdmin(id){ const m=members.find(x=>x.id===id); if(!m) return;
  m.isAdmin=!m.isAdmin; if(m.isAdmin&&!m.committee){ const c=prompt('اسم اللجنة (اختياري):',''); m.committee=c?c.trim():''; }
  await saveMembers(); toast(m.isAdmin?'تم التعيين كإداري':'تمت الإزالة من الإدارة'); showDetail(id); }
async function deleteMember(id){ const m=members.find(x=>x.id===id); if(!m) return;
  if(!confirm(`حذف العضو ${m.name} (${memberCode(m)})؟ لا يمكن التراجع.`)) return;
  members=members.filter(x=>x.id!==id);
  miqats.forEach(mq=>mq.bookings=(mq.bookings||[]).filter(b=>b.memberId!==id));
  await saveMembers(); await saveMiqats(); closeModal('detailModal'); toast('تم الحذف'); renderMembers(); renderDashboard(); }

/* ═══════════ Membership card ═══════════ */
let cardMemberId=null;
function openCard(id){ const m=members.find(x=>x.id===id); if(!m) return; cardMemberId=id;
  $('#cardPreviewWrap').innerHTML=cardHTML(m); closeModal('detailModal'); $('#cardModal').classList.add('open'); }
function cardHTML(m){
  const mms=memberMiqats(m);
  const miqatsBlock=mms.length?`<div class="id-card-miqats"><div class="head">المواقيت</div>
    ${mms.map(mq=>`<div class="miqat-line"><span class="n">${escapeHtml(mq.name)}</span><span class="d">${fmtMiqatDate(mq)}</span></div>`).join('')}</div>`:'';
  const logoBand = `<div class="cband">هيئة محبي الحسين</div>`;
  return `<div class="id-card" id="printableCard">
    <div class="id-card-band">${logoBand}</div>
    <div class="id-card-body">
      <div class="id-card-top">
        ${m.photo?`<div class="id-card-photo"><img src="${m.photo}" alt="" /></div>`:''}
        <div class="id-card-numblock">
          <div><div class="label">رقم العضوية</div><div class="num">${memberCode(m)}</div></div>
          <div class="type-chip ${m.type}">${m.type}</div>
        </div>
      </div>
      <div class="id-card-rows">
        <div class="id-card-row"><span class="k">الاسم</span><span class="v">${escapeHtml(m.name)}</span></div>
        ${m.isMinor&&m.birthdate?`<div class="id-card-row"><span class="k">تاريخ الميلاد</span><span class="v">${fmtDate(m.birthdate)}</span></div>`:''}
        <div class="id-card-row"><span class="k">بداية العضوية</span><span class="v">${fmtHijriStart(m)}</span></div>
        <div class="id-card-row"><span class="k">صالحة حتى</span><span class="v">${fmtHijriEnd(m)}</span></div>
      </div>
      ${miqatsBlock}
      <div class="id-card-message">
        بارك الله فيك على خدمتك الحسينية<br/>وانضمامك لهيئة محبي الحسين،<br/>
        جعله الله في ميزان حسناتك،<br/>ورزقك شفاعة أبي عبدالله ﷺ.
      </div>
    </div>
    <div class="id-card-footer"><span>عضوية سنوية</span><span>محرم ${memberStartYear(m)} — محرم ${memberEndYear(m)} هـ</span></div>
  </div>`;
}
function printCard(){
  const cardEl=document.getElementById('printableCard'); if(!cardEl) return;
  const styles=document.querySelector('style').innerHTML;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>بطاقة عضوية</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    <style>${styles}
      body{margin:0;padding:0 20px 40px;background:#eae5dc;min-height:100vh;}
      .wrap{display:flex;justify-content:center;align-items:flex-start;}
      .id-card{max-width:420px;}
      .bar{display:flex;gap:8px;justify-content:center;padding:12px;background:#3a1010;margin:0 -20px 28px;}
      .bar button{font-family:inherit;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;border:1px solid #b8934a;background:transparent;color:#f2e6cf;cursor:pointer;}
      .bar button:first-child{background:#b8934a;color:#3a1010;}
      @media print{ .no-print{display:none !important;} body *{visibility:visible;} }
    </style>
    </head><body>
      <div class="no-print bar">
        <button onclick="window.print()">🖨️ حفظ / طباعة PDF</button>
        <button onclick="window.close()">← الرئيسية</button>
      </div>
      <div class="wrap">${cardEl.outerHTML}</div>
    </body></html>`);
  w.document.close(); w.focus();
}
function shareCardWhatsApp(){
  const m=members.find(x=>x.id===cardMemberId); if(!m) return;
  const msg=`السلام عليكم ${m.name}،\nهذه بطاقة عضويتك في هيئة محبي الحسين.\nرقم العضوية: ${memberCode(m)}\nصالحة حتى: ${fmtHijriEnd(m)}\nبارك الله فيك.`;
  window.open(whatsappLink(m.phone,msg),'_blank');
  toast('احفظ البطاقة PDF ثم أرفقها في المحادثة');
}

/* ═══════════ Miqats (booking system) ═══════════ */
function fillMonthSelect(sel){ sel.innerHTML=HIJRI_MONTHS.map((m,i)=>`<option value="${i}">${m}</option>`).join(''); }
function openMiqatModal(id){
  fillMonthSelect($('#miqatMonth'));
  if(id){ const mq=miqats.find(x=>x.id===id); $('#miqatModalTitle').textContent='تعديل ميقات'; $('#miqatEditId').value=id;
    $('#miqatName').value=mq.name; $('#miqatDay').value=mq.day; $('#miqatMonth').value=mq.month; $('#miqatAmount').value=mq.requiredAmount||''; }
  else { $('#miqatModalTitle').textContent='إضافة ميقات'; $('#miqatEditId').value=''; $('#miqatName').value=''; $('#miqatDay').value=''; $('#miqatMonth').value=0; $('#miqatAmount').value=''; }
  $('#miqatModal').classList.add('open');
}
async function saveMiqat(){
  const id=$('#miqatEditId').value; const name=$('#miqatName').value.trim();
  const day=parseInt($('#miqatDay').value); const month=parseInt($('#miqatMonth').value);
  const req=parseFloat($('#miqatAmount').value)||0;
  if(!name||!(day>=1&&day<=30)){ toast('أدخل اسم الميقات واليوم الصحيح'); return; }
  if(id){ const mq=miqats.find(x=>x.id===id); mq.name=name; mq.day=day; mq.month=month; mq.requiredAmount=req; }
  else { miqats.push({id:'q_'+Date.now()+'_'+Math.random().toString(36).slice(2,5), name, day, month, requiredAmount:req, bookings:[]}); }
  await saveMiqats(); closeModal('miqatModal'); renderMiqats(); toast('تم حفظ الميقات');
}
function miqatSortKey(mq){ return mq.month*31+mq.day; }
/* ترتيب حسب قرب التاريخ الهجري من اليوم */
function miqatDistance(mq){
  const h=hijriParts();
  let diff=(mq.month-h.month+12)%12;
  if(diff===0 && mq.day < h.day) diff=12; // مرّ هذا الشهر → السنة القادمة
  return diff*31 + mq.day;
}
function miqatsByNearest(){ return [...miqats].sort((a,b)=>miqatDistance(a)-miqatDistance(b)); }

const openMiqatRows = new Set();
function toggleMiqatRow(id){
  if(openMiqatRows.has(id)) openMiqatRows.delete(id); else openMiqatRows.add(id);
  renderMiqats();
}
function renderMiqats(){
  const filter=$('#miqatFilter')?.value||'';
  let list=miqatsByNearest();
  if(filter) list=list.filter(mq=>miqatStatus(mq)===filter);
  const counts={green:0,yellow:0,red:0}; miqats.forEach(mq=>counts[miqatStatus(mq)]++);
  $('#miqatsPanelSub').textContent=`${miqats.length} ميقات · ${counts.green} محجوز · ${counts.yellow} تعزيز · ${counts.red} غير محجوز`;
  const el=$('#miqatsList');
  if(!list.length){ el.innerHTML=`<div class="empty"><div class="icon">🕯️</div><div class="txt">لا توجد مواقيت. اضغط «إضافة ميقات».</div></div>`; return; }
  el.innerHTML=list.map(mq=>{
    const st=miqatStatus(mq), paid=miqatPaid(mq), req=Number(mq.requiredAmount)||0;
    const open=openMiqatRows.has(mq.id);
    const pct=req>0?Math.min(100,Math.round(paid/req*100)):(paid>0?100:0);
    const bookers=(mq.bookings||[]).map(b=>{ const m=members.find(x=>x.id===b.memberId);
      return `<div class="booker-line"><span>${m?escapeHtml(m.name):'—'} <span style="color:var(--muted)">${m?memberCode(m):''}</span></span>
        <span><span class="bl-amt">${fmtMoney(b.amount)}</span> <button class="bl-del" onclick="removeBooking('${mq.id}','${b.memberId}')">×</button></span></div>`; }).join('');
    const details = open ? `
      <div class="mc-details">
        <div class="mc-date">${fmtMiqatDate(mq)}</div>
        <div class="mc-money">
          <span class="mm">المطلوب: <b>${fmtMoney(req)}</b></span>
          <span class="mm">المدفوع: <b>${fmtMoney(paid)}</b></span>
          <span class="mm">المتبقّي: <b>${fmtMoney(Math.max(0,req-paid))}</b></span>
        </div>
        <div class="progress"><span style="width:${pct}%"></span></div>
        ${bookers?`<div class="mc-bookers">${bookers}</div>`:''}
        <div class="mc-actions">
          <button class="btn btn-primary btn-sm" onclick="openBooking('${mq.id}')">+ حجز عضو</button>
          <button class="btn btn-ghost btn-sm" onclick="openMiqatModal('${mq.id}')">تعديل</button>
          <button class="btn btn-danger btn-sm" onclick="deleteMiqat('${mq.id}')">حذف</button>
        </div>
      </div>` : '';
    return `<div class="miqat-card st-${st}">
      <div class="mc-row" onclick="toggleMiqatRow('${mq.id}')">
        <span class="mc-name">${escapeHtml(mq.name)}</span>
        <span class="mc-right">
          <span class="mc-status st-${st}">${STATUS_LABEL[st]}</span>
          <span class="mc-chev ${open?'open':''}">▾</span>
        </span>
      </div>
      ${details}
    </div>`;
  }).join('');
}
async function deleteMiqat(id){ const mq=miqats.find(x=>x.id===id); if(!mq) return;
  if(!confirm(`حذف ميقات «${mq.name}»؟`)) return; miqats=miqats.filter(x=>x.id!==id); await saveMiqats(); renderMiqats(); toast('تم الحذف'); }
function openBooking(miqatId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  $('#bookingMiqatId').value=miqatId; $('#bookingSub').textContent=`${mq.name} · ${fmtMiqatDate(mq)}`;
  $('#bookingMember').innerHTML=members.slice().sort((a,b)=>a.number-b.number).map(m=>`<option value="${m.id}">${escapeHtml(m.name)} — ${memberCode(m)}</option>`).join('');
  $('#bookingAmount').value=''; if(!members.length){ toast('أضف أعضاء أولاً'); return; } $('#bookingModal').classList.add('open');
}
async function saveBooking(){
  const miqatId=$('#bookingMiqatId').value; const memberId=$('#bookingMember').value; const amount=parseFloat($('#bookingAmount').value)||0;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  mq.bookings=mq.bookings||[]; const existing=mq.bookings.find(b=>b.memberId===memberId);
  if(existing) existing.amount=(Number(existing.amount)||0)+amount; else mq.bookings.push({memberId,amount});
  await saveMiqats(); closeModal('bookingModal'); renderMiqats(); toast('تم إضافة الحجز');
}
async function removeBooking(miqatId,memberId){ const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  if(!confirm('إزالة حجز هذا العضو؟')) return; mq.bookings=mq.bookings.filter(b=>b.memberId!==memberId); await saveMiqats(); renderMiqats(); }

/* شريط أزرار داخل نافذة الطباعة (لا يظهر في الـ PDF) */
const PRINT_BAR = `
  <div class="no-print bar">
    <button onclick="window.print()">🖨️ حفظ / طباعة PDF</button>
    <button onclick="window.close()">← الرئيسية</button>
  </div>`;
const PRINT_BAR_CSS = `
  .bar{position:sticky;top:0;display:flex;gap:8px;justify-content:center;padding:12px;background:#3a1010;margin:-30px -30px 24px;}
  .bar button{font-family:inherit;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;border:1px solid #b8934a;background:transparent;color:#f2e6cf;cursor:pointer;}
  .bar button:first-child{background:#b8934a;color:#3a1010;}
  @media print{ .no-print{display:none !important;} body{padding-top:0 !important;} }`;

function printMiqats(status){
  const list=miqatsByNearest().filter(mq=>miqatStatus(mq)===status);
  const titleMap={red:'المواقيت غير المحجوزة', yellow:'المواقيت التي تحتاج تعزيز', green:'المواقيت المحجوزة'};
  // المحجوزة وغير المحجوزة: اسم المناسبة فقط. تحتاج تعزيز: الاسم + المبلغ الموصول.
  const isYellow = status==='yellow';
  const head = isYellow
    ? '<tr><th>المناسبة</th><th>المبلغ الموصول</th></tr>'
    : '<tr><th>المناسبة</th></tr>';
  const rows = list.map(mq=> isYellow
    ? `<tr><td>${escapeHtml(mq.name)}</td><td>${fmtMoney(miqatPaid(mq))}</td></tr>`
    : `<tr><td>${escapeHtml(mq.name)}</td></tr>`
  ).join('');
  const cols = isYellow?2:1;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${titleMap[status]}</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:30px;color:#1a0a0a;} h1{font-family:'Amiri',serif;color:#7a1e1e;text-align:center;border-bottom:2px solid #b8934a;padding-bottom:12px;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:20px;} table{width:100%;border-collapse:collapse;font-size:14px;} th,td{border:1px solid #e0dccf;padding:10px 12px;text-align:right;} th{background:#3a1010;color:#fff;} tr:nth-child(even){background:#faf7f2;}
    ${PRINT_BAR_CSS}</style>
    </head><body>${PRINT_BAR}<h1>هيئة محبي الحسين</h1><div class="sub">${titleMap[status]} — ${hijriToday()}</div>
    <table><thead>${head}</thead>
    <tbody>${rows||`<tr><td colspan="${cols}" style="text-align:center;color:#94908a">لا توجد مواقيت</td></tr>`}</tbody></table>
    </body></html>`);
  w.document.close(); w.focus();
}

/* ═══════════ Admins ═══════════ */
function renderAdmins(){
  const admins=members.filter(m=>m.isAdmin);
  $('#adminsCount').textContent=`${admins.length} إداري`;
  const el=$('#adminsList');
  if(!admins.length){ el.innerHTML=`<div class="empty"><div class="icon">👥</div><div class="txt">لا يوجد أعضاء إدارة بعد.</div></div>`; return; }
  el.innerHTML=admins.map(m=>`<div class="admin-row">
    <div><div class="a-name">${escapeHtml(m.name)}</div><div class="a-comm">${escapeHtml(m.committee||'إدارة الهيئة')} · ${memberCode(m)}</div></div>
    <a href="${whatsappLink(m.phone)}" target="_blank" class="wa-btn small">${WA_ICON}</a>
  </div>`).join('');
}
function openAdminBulk(){ openBulkMessage(); $('#bulkFilter').value='admins'; updateBulkCount(); }

/* ═══════════ Settings ═══════════ */
function fillSettings(){
  $('#setFee').value=settings.fee; $('#setYear').value=settings.year;
  $('#tplReminder').value=settings.templates.reminder; $('#tplMeeting').value=settings.templates.meeting;
  $('#tplCondolence').value=settings.templates.condolence; $('#tplCelebration').value=settings.templates.celebration;
}
async function saveSettings(){
  const fee=parseFloat($('#setFee').value); const year=parseInt($('#setYear').value);
  if(isNaN(fee)||fee<0){ toast('قيمة الاشتراك غير صحيحة'); return; }
  settings.fee=fee; settings.year=year||1448; await persistSettings(); toast('تم حفظ الإعدادات');
}
async function saveTemplates(){
  settings.templates.reminder=$('#tplReminder').value; settings.templates.meeting=$('#tplMeeting').value;
  settings.templates.condolence=$('#tplCondolence').value; settings.templates.celebration=$('#tplCelebration').value;
  await persistSettings(); toast('تم حفظ القوالب');
}
function exportCSV(){
  if(!members.length){ toast('لا توجد بيانات'); return; }
  const headers=['رقم العضوية','الاسم','العمر','تاريخ الميلاد','الهاتف','المنطقة','النوع','إداري','اللجنة','الإيميل','العنوان','تاريخ التسجيل','تاريخ الدفع','الانتهاء','المبلغ','الحالة'];
  const rows=members.map(m=>[memberCode(m),m.name,m.age??'',m.birthdate,m.phone,m.area||'',m.type,m.isAdmin?'نعم':'لا',m.committee||'',m.email||'',m.address||'',m.joinDate,m.paymentDate||'',m.expiryDate||'',m.paidAmount!=null?m.paidAmount.toFixed(3):'',isActive(m)?'مفعّلة':'غير مفعّلة']);
  const csv='\uFEFF'+[headers,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  downloadBlob(csv,'text/csv;charset=utf-8',`أعضاء_${today()}.csv`); toast('تم تصدير CSV');
}
async function clearAllData(){
  if(!confirm('سيتم حذف كل البيانات نهائياً. متأكد؟')) return;
  if(!confirm('تأكيد أخير: لا يمكن التراجع.')) return;
  members=[]; miqats=[]; news=[];
  settings={...settings, counters:{'عادي':1,'شرفي':1,'كادر':1}};
  await saveMembers(); await saveMiqats(); await storage.set('news','[]'); await persistSettings();
  toast('تم مسح كل البيانات'); renderDashboard(); renderMembers();
}

/* ═══════════ Backup ═══════════ */
function downloadBlob(content,type,filename){
  const blob=new Blob([content],{type}); const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
async function backupExport(){
  const backup={ app:'هيئة محبي الحسين', version:5, exportedAt:new Date().toISOString(), members, miqats, news, settings };
  downloadBlob(JSON.stringify(backup,null,2),'application/json;charset=utf-8',`نسخة_احتياطية_${today().replace(/-/g,'')}.json`);
  toast(`تم حفظ نسخة احتياطية (${members.length} عضو)`);
}
async function backupImport(e){
  const file=e.target.files[0]; if(!file) return;
  try{
    const backup=JSON.parse(await file.text());
    if(!backup.members||!Array.isArray(backup.members)){ toast('الملف غير صالح'); e.target.value=''; return; }
    if(!confirm(`استيراد ${backup.members.length} عضو؟ سيتم استبدال البيانات الحالية بالكامل.`)){ e.target.value=''; return; }
    members=backup.members||[]; miqats=backup.miqats||[]; news=backup.news||[];
    if(backup.settings) settings={...settings,...backup.settings, counters:{...settings.counters,...(backup.settings.counters||{})}, templates:{...settings.templates,...(backup.settings.templates||{})}};
    await saveMembers(); await saveMiqats(); await storage.set('news',JSON.stringify(news)); await persistSettings();
    e.target.value=''; toast(`تمت الاستعادة — ${members.length} عضو`); renderDashboard(); renderMembers(); fillSettings();
  }catch(err){ toast('تعذّرت قراءة الملف'); e.target.value=''; }
}

/* ═══════════ Bulk messaging ═══════════ */
function bulkFilteredMembers(){
  const f=$('#bulkFilter').value;
  switch(f){
    case 'active': return members.filter(isActive);
    case 'inactive': return members.filter(m=>!isActive(m));
    case 'honorary': return members.filter(m=>m.type==='شرفي');
    case 'cadre': return members.filter(m=>m.type==='كادر');
    case 'admins': return members.filter(m=>m.isAdmin);
    default: return members;
  }
}
function updateBulkCount(){ $('#bulkCountBadge').textContent=`${bulkFilteredMembers().length} عضو`; }
function openBulkMessage(){ updateBulkCount(); $('#bulkMessage').value=''; $('#bulkModal').classList.add('open'); }
function useTemplate(key){
  let t=settings.templates[key]||''; t=t.replace(/\{fee\}/g,settings.fee); $('#bulkMessage').value=t;
}
async function copyToClipboard(text){
  try{ await navigator.clipboard.writeText(text); return true; }
  catch(e){ const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); }catch(_){}
    ta.remove(); return true; }
}
async function copyBulkPhones(){ const list=bulkFilteredMembers(); if(!list.length){ toast('لا يوجد أعضاء'); return; }
  await copyToClipboard(list.map(m=>'+'+normalizePhone(m.phone)).join('\n')); toast(`تم نسخ ${list.length} رقم`); }
async function copyBulkMessage(){ const msg=$('#bulkMessage').value.trim(); if(!msg){ toast('اكتب رسالة'); return; }
  await copyToClipboard(msg); toast('تم نسخ الرسالة'); }
function openWhatsAppBroadcast(){
  const list=bulkFilteredMembers(); if(!list.length){ toast('لا يوجد أعضاء'); return; }
  const msg=$('#bulkMessage').value.trim();
  if(list.length===1){ window.open(whatsappLink(list[0].phone,msg),'_blank'); }
  else { window.open('https://web.whatsapp.com/','_blank'); toast('انسخ الأرقام والرسالة ثم أنشئ قائمة بث'); }
}

/* ═══════════ Init ═══════════ */
(async ()=>{
  await loadData();
  fillHeaderDates();
  renderDashboard();
  renderMembers();
  fillSettings();
})();

/* Service worker for offline use */
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{ navigator.serviceWorker.register('service-worker.js').catch(()=>{}); });
}
