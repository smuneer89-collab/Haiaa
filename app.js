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
let meetings = []; // {id, number, datetime, committee, plannedMinutes, attendance:[{memberId,present}], speech, agenda, proceedings, minutes, decisions:[{id,text,owner,due,done}], tasks:[...], attachments:[{id,name,type,data}], startedAt, endedAt}
let assemblies = []; // الجمعية العمومية: {id, year, attendees:[memberId], projects:[{id,title,committee,category}], report:{adminWord,plan,majalis,events,mawakib,achievements,topProjects,challenges,honoring}}
let uiDark = false;
let settings = {
  fee: 30, year: 1448,
  counters: { 'عادي': 1, 'شرفي': 1, 'كادر': 1 },
  templates: {
    reminder: 'السلام عليكم ورحمة الله،\nنذكّركم بدفع اشتراك العضوية السنوي في هيئة محبي الحسين. قيمة الاشتراك {fee} د.ب.\nيمكنكم التواصل مع أمانة السر للترتيب.\nبارك الله فيكم.',
    meeting: 'السلام عليكم ورحمة الله،\nندعوكم لحضور اجتماع أعضاء الهيئة يوم [التاريخ] الساعة [الوقت] في مقر الهيئة.\nحضوركم مهم.\nبارك الله فيكم.',
    occasion: '*[اسم المناسبة]*  ✨\n🏴 *[نوع الليلة]*\n\n🎙️ *الخطيب [الاسم]*\n🌑 *الليلة:* [اليوم]\n🗓️ *التاريخ الهجري:* [التاريخ الهجري]\n📆 *التاريخ الميلادي:* [التاريخ الميلادي]\n🕰️ *التوقيت:* [الوقت]\n\n🎙️ *الرادود [الاسم]*\n(لطم كربلائي)\n🕰️ *التوقيت:* [الوقت]\n📍 *المكان:* [المكان]\n\n====================\nانستقرام هيئة محبي الحسين\nhttps://www.instagram.com/alhaiaa\n\n🔸للــنـشر\n🔸نسألكم الدعاء 🔸',
    adminMeeting: 'دعوة إلى الاجتماع رقم ( )\nلهيئة محبي الحسين (ع)\n\nيسر إدارة هيئة محبي الحسين (ع) دعوتكم لحضور الاجتماع، وذلك لمناقشة عدد من الموضوعات المتعلقة بأعمال الهيئة وخططها المقبلة وأهمها:\n\n-\n-\n-\n\n📅 التاريخ: [اليوم] [التاريخ]\n🕗 الوقت: الساعة [الوقت]\n📍 المكان: [المكان]\n\nحضوركم محل تقدير واعتزاز، ونسأل الله تعالى التوفيق والسداد للجميع، وأن يبارك في جهودكم لخدمة الإمام الحسين (عليه السلام).'
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
  try { const mt=await storage.get('meetings'); if(mt) meetings=JSON.parse(mt); } catch(e){ meetings=[]; }
  try { const asm=await storage.get('assemblies'); if(asm) assemblies=JSON.parse(asm); } catch(e){ assemblies=[]; }
  try { uiDark = (await storage.get('ui_dark'))==='1'; } catch(e){ uiDark=false; }
}
async function saveMembers(){ try{ await storage.set('members',JSON.stringify(members)); }catch(e){ toast('تعذر الحفظ'); } }
async function saveMiqats(){ try{ await storage.set('miqats',JSON.stringify(miqats)); }catch(e){ toast('تعذر الحفظ'); } }
async function saveNews(){ try{ await storage.set('news',JSON.stringify(news)); }catch(e){} }
async function persistSettings(){ try{ await storage.set('settings',JSON.stringify(settings)); }catch(e){} }
async function saveMeetings(){ try{ await storage.set('meetings',JSON.stringify(meetings)); }catch(e){ toast('تعذر حفظ الاجتماع'); } }
async function saveAssemblies(){ try{ await storage.set('assemblies',JSON.stringify(assemblies)); }catch(e){ toast('تعذر حفظ الجمعية'); } }

/* ─── WhatsApp ─── */
const COUNTRIES=[
  {code:'973',flag:'🇧🇭',name:'البحرين'},
  {code:'966',flag:'🇸🇦',name:'السعودية'},
  {code:'965',flag:'🇰🇼',name:'الكويت'},
  {code:'974',flag:'🇶🇦',name:'قطر'},
  {code:'971',flag:'🇦🇪',name:'الإمارات'},
  {code:'968',flag:'🇴🇲',name:'عُمان'},
  {code:'964',flag:'🇮🇶',name:'العراق'},
  {code:'98',flag:'🇮🇷',name:'إيران'},
  {code:'962',flag:'🇯🇴',name:'الأردن'},
  {code:'963',flag:'🇸🇾',name:'سوريا'},
  {code:'961',flag:'🇱🇧',name:'لبنان'},
  {code:'970',flag:'🇵🇸',name:'فلسطين'},
  {code:'20',flag:'🇪🇬',name:'مصر'},
  {code:'967',flag:'🇾🇪',name:'اليمن'},
  {code:'249',flag:'🇸🇩',name:'السودان'},
  {code:'218',flag:'🇱🇾',name:'ليبيا'},
  {code:'216',flag:'🇹🇳',name:'تونس'},
  {code:'213',flag:'🇩🇿',name:'الجزائر'},
  {code:'212',flag:'🇲🇦',name:'المغرب'},
  {code:'222',flag:'🇲🇷',name:'موريتانيا'},
  {code:'252',flag:'🇸🇴',name:'الصومال'},
  {code:'253',flag:'🇩🇯',name:'جيبوتي'},
];
const COUNTRY_CODES=COUNTRIES.map(c=>c.code).sort((a,b)=>b.length-a.length);
function countryOptions(selected){ return COUNTRIES.map(c=>`<option value="${c.code}"${selected===c.code?' selected':''}>${c.flag} ${c.name} +${c.code}</option>`).join(''); }
function splitPhone(phone){ let c=toEnglishDigits(phone).replace(/\D/g,''); if(c.startsWith('00'))c=c.slice(2); for(const cc of COUNTRY_CODES){ if(c.startsWith(cc)) return {code:cc, local:c.slice(cc.length)}; } return {code:'', local:c}; }
function toEnglishDigits(s){ return String(s||'').replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)); }
function normalizePhone(phone){ let c=toEnglishDigits(phone).replace(/\D/g,''); if(c.startsWith('00'))c=c.slice(2); if(c.startsWith('973'))return c; return '973'+c; }
function localPhone(phone){ let c=normalizePhone(phone); return c.startsWith('973')?c.slice(3):c; }
function digitsOnly(phone){ let c=toEnglishDigits(phone).replace(/\D/g,''); if(c.startsWith('00'))c=c.slice(2); return c; }
function whatsappLink(phone,text){ const n=digitsOnly(phone); const q=text?`?text=${encodeURIComponent(text)}`:''; return `https://wa.me/${n}${q}`; }
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
$$('.tab[data-tab]').forEach(t=>{
  t.addEventListener('click',()=>{
    $$('.tab[data-tab]').forEach(x=>x.classList.remove('active')); t.classList.add('active');
    $$('.tab-content').forEach(c=>c.style.display='none');
    $('#tab-'+t.dataset.tab).style.display='block';
    if(t.dataset.tab==='dashboard') renderDashboard();
    if(t.dataset.tab==='members') renderMembers();
    if(t.dataset.tab==='miqats') renderMiqats();
    if(t.dataset.tab==='meetings') idaraHome();
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
  const summary=meetingsSummaryCardHTML();
  const items = news.length
    ? [...news].reverse().map(n=>`
    <div class="news-item">
      <button class="n-del" onclick="deleteNews('${n.id}')">🗑</button>
      <div class="n-date">${fmtDate(n.date)}</div>
      <div class="n-title">${escapeHtml(n.title)}</div>
      <div class="n-body">${escapeHtml(n.body)}</div>
    </div>`).join('')
    : (summary ? '' : `<div class="empty"><div class="icon">📰</div><div class="txt">لا توجد أخبار بعد. أضف خبراً ليظهر هنا وللأعضاء.</div></div>`);
  el.innerHTML = summary + items;
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
  return `<div class="member-row compact ${status}" onclick="showDetail('${m.id}')">
    <div class="name">${escapeHtml(m.name)}</div>
    <span class="mr-caret">‹</span>
  </div>`;
}
function openAddMember(){
  const f=document.getElementById('addForm'); if(f){ f.reset(); if(typeof resetForm==='function') resetForm(); }
  $$('.tab-content').forEach(c=>c.style.display='none');
  $('#tab-add').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}
function backToMembers(){
  $$('.tab-content').forEach(c=>c.style.display='none');
  $('#tab-members').style.display='block';
  renderMembers();
  window.scrollTo({top:0,behavior:'smooth'});
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
    phone:'+'+(fd.get('countryCode')||'973')+toEnglishDigits(fd.get('phone')).replace(/\D/g,''), area:(fd.get('area')||'').trim(),
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
  backToMembers();
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
  const sp=splitPhone(m.phone); $('#editCountryCode').value=sp.code||'973'; $('#editPhone').value=sp.local;
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
  m.name=name; m.phone='+'+($('#editCountryCode').value||'973')+toEnglishDigits(phone).replace(/\D/g,''); m.type=$('#editType').value;
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
  const miqatsBlock=mms.length?`<div style="margin-top:16px;background:rgba(255,255,255,.06);border-radius:12px;padding:12px 16px;">
      <div style="font-size:11px;color:#d4b877;letter-spacing:2px;font-weight:600;margin-bottom:8px;">المواقيت</div>
      ${mms.map(mq=>`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13.5px;"><span style="color:#f2e6cf;">${escapeHtml(mq.name)}</span><span style="color:#e5c878;font-weight:600;">${fmtMiqatDate(mq)}</span></div>`).join('')}</div>`:'';
  const photoBlock=m.photo?`<div style="width:64px;height:64px;border-radius:50%;overflow:hidden;border:2px solid #b8934a;flex-shrink:0;"><img src="${m.photo}" alt="" style="width:100%;height:100%;object-fit:cover;" /></div>`:'';
  const birthRow=(m.isMinor&&m.birthdate)?`<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);"><span style="color:#c9a86a;font-size:14px;">تاريخ الميلاد</span><span style="font-weight:600;color:#fff;font-size:15px;">${fmtDate(m.birthdate)}</span></div>`:'';
  return `<div class="id-card" id="printableCard" style="width:100%;max-width:410px;background:#3a1010;border-radius:20px;padding:10px;box-shadow:0 20px 50px rgba(58,16,16,.3);font-family:var(--font-sans);">
    <div style="border:2px solid #b8934a;border-radius:14px;padding:24px 22px;">
      <div style="text-align:center;padding-bottom:18px;border-bottom:1px solid rgba(184,147,74,.35);">
        <img src="${HAIAA_LOGO_WHITE}" alt="هيئة محبي الحسين" style="max-height:76px;max-width:85%;" />
      </div>
      <div style="display:flex;align-items:center;gap:14px;justify-content:center;padding:18px 0 6px;">
        ${photoBlock}
        <div style="text-align:center;">
          <div style="font-size:12px;color:#d4b877;letter-spacing:3px;">رقم العضوية</div>
          <div style="font-size:30px;font-weight:800;color:#fff;letter-spacing:2px;line-height:1.1;">${memberCode(m)}</div>
          <div style="margin-top:6px;display:inline-block;padding:3px 14px;border-radius:20px;background:rgba(184,147,74,.25);color:#e5c878;font-size:12px;font-weight:700;">${m.type}</div>
        </div>
      </div>
      <div style="background:rgba(255,255,255,.06);border-radius:12px;padding:6px 18px;margin-top:14px;">
        <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);"><span style="color:#c9a86a;font-size:14px;">الاسم</span><span style="font-weight:700;color:#fff;font-size:15.5px;">${escapeHtml(m.name)}</span></div>
        ${birthRow}
        <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);"><span style="color:#c9a86a;font-size:14px;">بداية العضوية</span><span style="font-weight:600;color:#f2e6cf;font-size:14.5px;">${fmtHijriStart(m)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:12px 0;"><span style="color:#c9a86a;font-size:14px;">صالحة حتى</span><span style="font-weight:700;color:#e5c878;font-size:14.5px;">${fmtHijriEnd(m)}</span></div>
      </div>
      ${miqatsBlock}
      <div style="margin-top:16px;padding:14px 16px;background:rgba(184,147,74,.12);border-right:3px solid #b8934a;border-radius:8px;text-align:center;color:#f2e6cf;font-size:13.5px;line-height:1.8;">
        بارك الله فيك على خدمتك الحسينية<br/>وانضمامك لهيئة محبي الحسين،<br/>
        جعله الله في ميزان حسناتك،<br/>ورزقك شفاعة أبي عبدالله ﷺ.
      </div>
      <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(184,147,74,.35);display:flex;justify-content:space-between;color:#c9a86a;font-size:12px;">
        <span>عضوية سنوية</span><span>محرم ${memberStartYear(m)} — محرم ${memberEndYear(m)} هـ</span>
      </div>
    </div>
  </div>`;
}
function printCard(){
  const cardEl=document.getElementById('printableCard'); if(!cardEl) return;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>بطاقة عضوية</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    <style>
      :root{--font-sans:'IBM Plex Sans Arabic',sans-serif;}
      *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
      body{margin:0;padding:30px 20px 50px;background:#eae5dc;min-height:100vh;font-family:var(--font-sans);}
      .wrap{display:flex;justify-content:center;align-items:flex-start;}
      #printableCard{max-width:560px !important;}
      .bar{display:flex;gap:8px;justify-content:center;padding:12px;background:#3a1010;margin:0 -20px 28px;}
      .bar button{font-family:inherit;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;border:1px solid #b8934a;background:transparent;color:#f2e6cf;cursor:pointer;}
      .bar button:first-child{background:#b8934a;color:#3a1010;}
      @media print{ .no-print{display:none !important;} #printableCard{max-width:520px !important;} }
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
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:30px;color:#1a0a0a;}
    .pdf-logo{display:block;margin:0 auto 8px;max-width:240px;max-height:85px;width:auto;height:auto;}
    .pdf-head{border-bottom:2px solid #b8934a;padding-bottom:12px;text-align:center;}
    h1{font-family:'Amiri',serif;color:#7a1e1e;text-align:center;margin:0;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:20px;} table{width:100%;border-collapse:collapse;font-size:14px;} th,td{border:1px solid #e0dccf;padding:10px 12px;text-align:right;} th{background:#3a1010;color:#fff;} tr:nth-child(even){background:#faf7f2;}
    ${PRINT_BAR_CSS}</style>
    </head><body>${PRINT_BAR}<div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="هيئة محبي الحسين" /></div><div class="sub">${titleMap[status]} — ${hijriToday()}</div>
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
  $('#tplOccasion').value=settings.templates.occasion; $('#tplAdminMeeting').value=settings.templates.adminMeeting;
}
async function saveSettings(){
  const fee=parseFloat($('#setFee').value); const year=parseInt($('#setYear').value);
  if(isNaN(fee)||fee<0){ toast('قيمة الاشتراك غير صحيحة'); return; }
  settings.fee=fee; settings.year=year||1448; await persistSettings(); toast('تم حفظ الإعدادات');
}
async function saveTemplates(){
  settings.templates.reminder=$('#tplReminder').value; settings.templates.meeting=$('#tplMeeting').value;
  settings.templates.occasion=$('#tplOccasion').value; settings.templates.adminMeeting=$('#tplAdminMeeting').value;
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
  members=[]; miqats=[]; news=[]; meetings=[]; assemblies=[];
  settings={...settings, counters:{'عادي':1,'شرفي':1,'كادر':1}};
  await saveMembers(); await saveMiqats(); await storage.set('news','[]'); await saveMeetings(); await saveAssemblies(); await persistSettings();
  toast('تم مسح كل البيانات'); renderDashboard(); renderMembers();
}

/* ═══════════ Backup ═══════════ */
function downloadBlob(content,type,filename){
  const blob=new Blob([content],{type}); const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
async function backupExport(){
  const backup={ app:'هيئة محبي الحسين', version:7, exportedAt:new Date().toISOString(), members, miqats, news, settings, meetings, assemblies };
  downloadBlob(JSON.stringify(backup,null,2),'application/json;charset=utf-8',`نسخة_احتياطية_${today().replace(/-/g,'')}.json`);
  toast(`تم حفظ نسخة احتياطية (${members.length} عضو)`);
}
async function backupImport(e){
  const file=e.target.files[0]; if(!file) return;
  let text;
  try{
    text=await file.text();
  }catch(err){ alert('تعذّر فتح الملف: '+err.message); e.target.value=''; return; }
  let backup;
  try{
    backup=JSON.parse(text);
  }catch(err){ alert('الملف ليس بصيغة JSON صحيحة: '+err.message); e.target.value=''; return; }
  if(!backup.members||!Array.isArray(backup.members)){ toast('الملف غير صالح'); e.target.value=''; return; }
  if(!confirm(`استيراد ${backup.members.length} عضو؟ سيتم استبدال البيانات الحالية بالكامل.`)){ e.target.value=''; return; }
  try{
    members=backup.members||[]; miqats=backup.miqats||[]; news=backup.news||[]; meetings=backup.meetings||[]; assemblies=backup.assemblies||[];
    if(backup.settings) settings={...settings,...backup.settings, counters:{...settings.counters,...(backup.settings.counters||{})}, templates:{...settings.templates,...(backup.settings.templates||{})}};
    await saveMembers(); await saveMiqats(); await storage.set('news',JSON.stringify(news)); await saveMeetings(); await saveAssemblies(); await persistSettings();
    e.target.value=''; toast(`تمت الاستعادة — ${members.length} عضو`); renderDashboard(); renderMembers(); fillSettings();
  }catch(err){ alert('خطأ أثناء الاستعادة: '+(err&&err.message?err.message:err)); e.target.value=''; }
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

/* ═══════════════════════════ اجتماعات الإدارة ═══════════════════════════ */
function uid(p){ return p+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,6); }
function adminList(){ return members.filter(m=>m.isAdmin); }

/* ─── الوضع الداكن ─── */
function applyDarkMode(){
  document.body.classList.toggle('dark', uiDark);
  const b=document.getElementById('darkModeBtn'); if(b) b.textContent=uiDark?'☀️ فاتح':'🌙 داكن';
}
async function toggleDarkMode(){ uiDark=!uiDark; applyDarkMode(); try{ await storage.set('ui_dark', uiDark?'1':'0'); }catch(e){} }

/* ─── مساعدات التاريخ ─── */
function localDatetimeValue(d){ const p=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; }
function fmtMeetingDT(iso){ if(!iso) return '—'; const d=new Date(iso); if(isNaN(d)) return '—';
  const p=n=>String(n).padStart(2,'0'); let hh=d.getHours(); const ap=hh>=12?'م':'ص'; hh=hh%12||12;
  return `${p(d.getDate())} ${AR_MONTHS[d.getMonth()]} ${d.getFullYear()} · ${hh}:${p(d.getMinutes())} ${ap}`; }
function formatDuration(ms){ if(ms<0)ms=0; const s=Math.floor(ms/1000);
  const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), ss=s%60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`; }
function meetingDuration(m){ if(m.startedAt&&m.endedAt) return formatDuration(new Date(m.endedAt)-new Date(m.startedAt)); return null; }

/* ─── الإحصائيات ─── */
function meetingStats(){
  let present=0,total=0; const absentBy={};
  meetings.forEach(m=>(m.attendance||[]).forEach(a=>{ total++;
    if(a.present) present++; else absentBy[a.memberId]=(absentBy[a.memberId]||0)+1; }));
  const attPct=total?Math.round(present/total*100):0;
  let openDec=0; meetings.forEach(m=>(m.decisions||[]).forEach(d=>{ if(!d.done) openDec++; }));
  const ts=today(); let lateTasks=0;
  meetings.forEach(m=>(m.tasks||[]).forEach(t=>{ if(!t.done && t.due && t.due<ts) lateTasks++; }));
  let topId=null,topN=0; Object.entries(absentBy).forEach(([id,n])=>{ if(n>topN){topN=n;topId=id;} });
  const topMember=topId?members.find(x=>x.id===topId):null;
  return { count:meetings.length, attPct, absPct:100-attPct, openDec, lateTasks, topMember, topAbsN:topN,
    present, absent:total-present, total };
}
function renderMeetingStats(){
  const s=meetingStats();
  document.getElementById('mtgStats').innerHTML=`
    <div class="mtg-stat tot clickable" onclick="openMeetingsFromStat('count')"><div class="num">${s.count}</div><div class="lbl">عدد الاجتماعات</div></div>
    <div class="mtg-stat att"><div class="num">${s.attPct}%</div><div class="lbl">نسبة الحضور</div></div>
    <div class="mtg-stat dec clickable" onclick="openMeetingsFromStat('openDec')"><div class="num">${s.openDec}</div><div class="lbl">قرارات قيد التنفيذ</div></div>
    <div class="mtg-stat late clickable" onclick="openMeetingsFromStat('lateTasks')"><div class="num">${s.lateTasks}</div><div class="lbl">مهام متأخرة</div></div>`;
  const ab=document.getElementById('mtgMostAbsent');
  if(s.topMember){ ab.className='mtg-absent-card';
    ab.innerHTML=`<span>👤 الأكثر غياباً: <b>${escapeHtml(s.topMember.name)}</b></span><span>${s.topAbsN} غياب · نسبة الغياب ${s.absPct}%</span>`;
  } else { ab.className='mtg-absent-card none';
    ab.innerHTML=`<span>✅ لا توجد غيابات مسجّلة بعد</span><span>نسبة الحضور ${s.attPct}%</span>`; }
  const sum=document.getElementById('mtgDashSummary');
  if(sum) sum.textContent = s.count
    ? `${s.count} اجتماع · حضور ${s.attPct}% · ${s.openDec} قرار · ${s.lateTasks} متأخرة — اضغط للتفاصيل`
    : 'لا اجتماعات بعد — اضغط لعرض الإحصائيات';
}
function openMeetingsFromStat(which){
  if(which==='count'){ switchMeetingSubtab('list'); }
  else if(which==='openDec'){ switchMeetingSubtab('followup'); $('#followType').value='decision'; $('#followStatus').value='open'; renderFollowup(); }
  else if(which==='lateTasks'){ switchMeetingSubtab('followup'); $('#followType').value='task'; $('#followStatus').value='overdue'; renderFollowup(); }
  const target=document.getElementById(which==='count'?'mtab-list':'mtab-followup');
  if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
}
/* بطاقة ملخّص الاجتماعات داخل الأخبار (الصفحة الرئيسية) */
function meetingsSummaryCardHTML(){
  if(!meetings.length) return '';
  const s=meetingStats(); const ts=today();
  const rows=[];
  meetings.forEach(m=>{
    (m.decisions||[]).forEach(d=>rows.push({kind:'decision', text:d.text, owner:d.owner, due:d.due, done:d.done}));
    (m.tasks||[]).forEach(t=>rows.push({kind:'task', text:t.text, owner:t.owner, due:t.due, done:t.done}));
  });
  const open=rows.filter(r=>!r.done);
  open.sort((a,b)=>{ const rank=x=>(x.due&&x.due<ts)?0:1; return rank(a)-rank(b); });
  const top=open.slice(0,3).map(r=>{
    const overdue=r.due&&r.due<ts;
    return `<div class="msc-item"><span class="fu-kind ${r.kind}">${r.kind==='decision'?'قرار':'مهمة'}</span>
      <span class="msc-item-text">${escapeHtml(r.text||'—')}</span>
      ${overdue?'<span class="md-chip late">متأخر</span>':''}</div>`;
  }).join('');
  return `<div class="news-item mtg-summary-card" onclick="openSecretariatFromHome()">
    <div class="msc-head">📋 لوحة اجتماعات الإدارة</div>
    <div class="msc-stats">
      <span><b>${s.count}</b> اجتماع</span>
      <span>الحضور <b>${s.attPct}%</b></span>
      <span><b>${s.openDec}</b> قرار قيد التنفيذ</span>
      <span><b>${s.lateTasks}</b> مهمة متأخرة</span>
    </div>
    ${top?`<div class="msc-follow">${top}</div>`:''}
    <div class="msc-cta">اضغط لعرض اللوحة ولوحة المتابعة ←</div>
  </div>`;
}

/* ─── الفلاتر ─── */
function populateMeetingFilters(){
  const years=[...new Set(meetings.filter(m=>m.datetime).map(m=>new Date(m.datetime).getFullYear()))].sort((a,b)=>b-a);
  const months=[...new Set(meetings.filter(m=>m.datetime).map(m=>new Date(m.datetime).getMonth()))].sort((a,b)=>a-b);
  const comms=[...new Set(meetings.map(m=>m.committee).filter(Boolean))];
  const yEl=$('#mtgFilterYear'), mEl=$('#mtgFilterMonth'), cEl=$('#mtgFilterCommittee');
  const ky=yEl.value, km=mEl.value, kc=cEl.value;
  yEl.innerHTML='<option value="">كل السنوات</option>'+years.map(y=>`<option value="${y}">${y}</option>`).join('');
  mEl.innerHTML='<option value="">كل الشهور</option>'+months.map(mo=>`<option value="${mo}">${AR_MONTHS[mo]}</option>`).join('');
  cEl.innerHTML='<option value="">كل اللجان</option>'+comms.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  yEl.value=ky; mEl.value=km; cEl.value=kc;
}
function populateCommitteeDatalist(){
  const comms=[...new Set([...meetings.map(m=>m.committee), ...members.map(m=>m.committee)].filter(Boolean))];
  $('#committeeList').innerHTML=comms.map(c=>`<option value="${escapeHtml(c)}"></option>`).join('');
}

/* ─── العرض الرئيسي ─── */
function renderMeetings(){ renderMeetingStats(); populateMeetingFilters(); renderMeetingsList(); renderFollowup(); }

/* ─── التنقل داخل قسم الإدارة ─── */
function idaraShow(view){
  ['hub','sec','finance','media','admins'].forEach(v=>{
    const el=document.getElementById('idara-'+v); if(el) el.style.display = (v===view)?'block':'none';
  });
}
function idaraHome(){ idaraShow('hub'); renderIdaraHub(); window.scrollTo({top:0,behavior:'smooth'}); }
function renderIdaraHub(){
  const n=members.filter(m=>m.isAdmin).length;
  const el=document.getElementById('idaraAdminsCount'); if(el) el.textContent=`${n} إداري`;
}
function openIdara(which){
  if(which==='sec'){ idaraShow('sec'); renderMeetings(); }
  else if(which==='admins'){ idaraShow('admins'); renderAdmins(); }
  else if(which==='finance'){ idaraShow('finance'); }
  else if(which==='media'){ idaraShow('media'); }
  window.scrollTo({top:0,behavior:'smooth'});
}
function openSecretariatFromHome(){ switchTab('meetings'); openIdara('sec'); }

/* لوحة الإحصائيات القابلة للطي */
function toggleDash(){
  const body=document.getElementById('mtgDashBody'), caret=document.getElementById('dashCaret');
  const open = body.style.display==='none';
  body.style.display = open?'block':'none';
  if(caret) caret.classList.toggle('open', open);
}
function switchMeetingSubtab(which){
  $$('.mtg-subtabs .tab').forEach(t=>t.classList.toggle('active', t.dataset.mtab===which));
  $('#mtab-list').style.display = which==='list'?'block':'none';
  $('#mtab-followup').style.display = which==='followup'?'block':'none';
  $('#mtab-assembly').style.display = which==='assembly'?'block':'none';
  if(which==='followup') renderFollowup();
  if(which==='assembly') renderAssemblyTab();
}
function meetingCardHTML(m){
  const ended=!!m.endedAt;
  const present=(m.attendance||[]).filter(a=>a.present).length;
  const absent=(m.attendance||[]).length-present;
  const dur=meetingDuration(m);
  return `<div class="mtg-card" onclick="showMeetingDetail('${m.id}')">
    <div class="mtg-card-top">
      <span class="mtg-card-no">اجتماع رقم ${escapeHtml(m.number)}</span>
      <span class="mtg-badge ${ended?'ended':'open'}">${ended?'منتهٍ':'لم ينتهِ'}</span>
    </div>
    <div class="mtg-card-meta">
      <span class="mi">🗓️ ${fmtMeetingDT(m.datetime)}</span>
      ${m.committee?`<span class="mi">🏷️ ${escapeHtml(m.committee)}</span>`:''}
      ${dur?`<span class="mi">⏱️ ${dur}</span>`:''}
    </div>
    <div class="mtg-card-stats">
      <span>الحضور <b>${present}</b></span>
      <span>الغياب <b>${absent}</b></span>
      <span>القرارات <b>${(m.decisions||[]).length}</b></span>
      <span>المهام <b>${(m.tasks||[]).length}</b></span>
    </div>
  </div>`;
}
function renderMeetingsList(){
  const q=($('#mtgSearch').value||'').trim().toLowerCase();
  const fy=$('#mtgFilterYear').value, fm=$('#mtgFilterMonth').value, fc=$('#mtgFilterCommittee').value;
  let list=[...meetings].sort((a,b)=>new Date(b.datetime||0)-new Date(a.datetime||0)).filter(m=>{
    if(fy){ const y=m.datetime?new Date(m.datetime).getFullYear():''; if(String(y)!==fy) return false; }
    if(fm){ const mo=m.datetime?new Date(m.datetime).getMonth():''; if(String(mo)!==fm) return false; }
    if(fc && (m.committee||'')!==fc) return false;
    if(q){ const hay=`${m.number} ${m.committee||''} ${m.minutes||''} ${m.agenda||''} ${m.proceedings||''}`.toLowerCase(); if(!hay.includes(q)) return false; }
    return true;
  });
  const el=$('#meetingsList');
  if(!meetings.length){ el.innerHTML=`<div class="empty"><div class="icon">📋</div><div class="txt">لا توجد اجتماعات بعد. اضغط «➕ اجتماع جديد» للبدء.</div></div>`; return; }
  if(!list.length){ el.innerHTML=`<div class="empty"><div class="icon">🔍</div><div class="txt">لا نتائج مطابقة.</div></div>`; return; }
  el.innerHTML=list.map(meetingCardHTML).join('');
}

/* ─── نموذج الاجتماع (جديد/تعديل) ─── */
let mtgEditId=null, mtgDraft=null, mtgTimerInterval=null, mtgAlertShown=false;

function openMeetingModal(id){
  clearInterval(mtgTimerInterval); mtgAlertShown=false;
  $('#mtgTimeAlert').style.display='none';
  populateCommitteeDatalist();
  const m=id?meetings.find(x=>x.id===id):null;
  mtgEditId=m?m.id:null;
  $('#meetingModalTitle').textContent=m?'تعديل الاجتماع':'اجتماع جديد';
  if(m){
    mtgDraft={ startedAt:m.startedAt||null, endedAt:m.endedAt||null, attachments:(m.attachments||[]).slice(), createdAt:m.createdAt };
    $('#mtgNumber').value=m.number||''; $('#mtgDatetime').value=m.datetime||'';
    $('#mtgCommittee').value=m.committee||''; $('#mtgPlanned').value=String(m.plannedMinutes!=null?m.plannedMinutes:60);
    $('#mtgSpeech').value=m.speech||''; $('#mtgAgenda').value=m.agenda||'';
    $('#mtgProceedings').value=m.proceedings||''; $('#mtgMinutes').value=m.minutes||'';
    renderAttendancePicker(m.attendance);
    $('#mtgDecisions').innerHTML=''; (m.decisions||[]).forEach(d=>addDecisionEntry(d));
    $('#mtgTasks').innerHTML=''; (m.tasks||[]).forEach(t=>addTaskEntry(t));
  } else {
    mtgDraft={ startedAt:null, endedAt:null, attachments:[], createdAt:new Date().toISOString() };
    const nextNo=meetings.reduce((mx,x)=>{ const n=parseInt(x.number); return isNaN(n)?mx:Math.max(mx,n); },0)+1;
    $('#mtgNumber').value=String(nextNo); $('#mtgDatetime').value=localDatetimeValue(new Date());
    $('#mtgCommittee').value=''; $('#mtgPlanned').value='60';
    $('#mtgSpeech').value=''; $('#mtgAgenda').value=''; $('#mtgProceedings').value=''; $('#mtgMinutes').value='';
    renderAttendancePicker([]); $('#mtgDecisions').innerHTML=''; $('#mtgTasks').innerHTML='';
  }
  renderMeetingAttachments(); updateItemCounts(); updateTimerUI();
  if(mtgDraft.startedAt && !mtgDraft.endedAt) mtgTimerInterval=setInterval(tickTimer,1000);
  $('#meetingModal').classList.add('open');
}
function closeMeetingModal(){ clearInterval(mtgTimerInterval); $('#meetingModal').classList.remove('open'); }

/* الحضور والغياب */
function renderAttendancePicker(attendance){
  const admins=adminList(); const cont=$('#mtgAttendance');
  if(!admins.length){ cont.innerHTML='<div class="mtg-block-help" style="margin:0">لا يوجد أعضاء إدارة مسجّلون بعد. فعّل «من إدارة الهيئة» عند تسجيل العضو أولاً.</div>'; updateAttSummary(); return; }
  const map={}; (attendance||[]).forEach(a=>map[a.memberId]=a.present);
  cont.innerHTML=admins.map(m=>{
    const present=map[m.id]!==false;
    return `<div class="mtg-att-row" data-mid="${m.id}">
      <div class="mtg-att-name">${escapeHtml(m.name)}<small>${escapeHtml(m.committee||'إدارة الهيئة')} · ${memberCode(m)}</small></div>
      <div class="mtg-att-toggle">
        <button type="button" class="${present?'on-present':''}" onclick="setAtt(this,true)">حاضر</button>
        <button type="button" class="${!present?'on-absent':''}" onclick="setAtt(this,false)">غائب</button>
      </div></div>`;
  }).join('');
  updateAttSummary();
}
function setAtt(btn,present){
  const row=btn.closest('.mtg-att-row'); const btns=row.querySelectorAll('.mtg-att-toggle button');
  btns[0].classList.toggle('on-present',present); btns[1].classList.toggle('on-absent',!present);
  updateAttSummary();
}
function collectAttendance(){
  return [...$$('#mtgAttendance .mtg-att-row')].map(row=>({
    memberId:row.dataset.mid,
    present:row.querySelectorAll('.mtg-att-toggle button')[0].classList.contains('on-present')
  }));
}
function updateAttSummary(){
  const rows=[...$$('#mtgAttendance .mtg-att-row')];
  const present=rows.filter(r=>r.querySelectorAll('.mtg-att-toggle button')[0].classList.contains('on-present')).length;
  $('#mtgAttSummary').textContent=`${present} حاضر · ${rows.length-present} غائب`;
}

/* القرارات والمهام */
function itemEntryHTML(kind,data){
  data=data||{}; const admins=adminList(); let names=admins.map(m=>m.name);
  if(data.owner && !names.includes(data.owner)) names=[data.owner,...names];
  const opts=`<option value="">— المسؤول —</option>`+names.map(n=>`<option value="${escapeHtml(n)}" ${data.owner===n?'selected':''}>${escapeHtml(n)}</option>`).join('');
  return `<div class="mtg-item" data-kind="${kind}" data-id="${data.id||''}">
    <textarea rows="2" class="it-text" oninput="updateItemCounts()" placeholder="${kind==='decision'?'نص القرار...':'وصف المهمة...'}">${escapeHtml(data.text||'')}</textarea>
    <div class="mtg-item-row">
      <select class="it-owner">${opts}</select>
      <input type="date" class="it-due" value="${data.due||''}" />
      <label class="mtg-item-done"><input type="checkbox" class="it-done" ${data.done?'checked':''}/> منجز</label>
      <button type="button" class="remove-btn" onclick="this.closest('.mtg-item').remove(); updateItemCounts();">× حذف</button>
    </div></div>`;
}
function addDecisionEntry(data){ const c=$('#mtgDecisions'); const d=document.createElement('div'); d.innerHTML=itemEntryHTML('decision',data); c.appendChild(d.firstElementChild); updateItemCounts(); }
function addTaskEntry(data){ const c=$('#mtgTasks'); const d=document.createElement('div'); d.innerHTML=itemEntryHTML('task',data); c.appendChild(d.firstElementChild); updateItemCounts(); }
function collectItems(sel){
  return [...$$(sel+' .mtg-item')].map(el=>{
    const text=el.querySelector('.it-text').value.trim(); if(!text) return null;
    return { id:el.dataset.id||uid('it'), text,
      owner:el.querySelector('.it-owner').value,
      due:el.querySelector('.it-due').value,
      done:el.querySelector('.it-done').checked };
  }).filter(Boolean);
}
function updateItemCounts(){
  const dc=[...$$('#mtgDecisions .mtg-item')].filter(el=>el.querySelector('.it-text').value.trim()).length;
  const tc=[...$$('#mtgTasks .mtg-item')].filter(el=>el.querySelector('.it-text').value.trim()).length;
  $('#mtgDecCount').textContent=dc; $('#mtgTaskCount').textContent=tc;
}

/* المرفقات */
function fileToDataURL(file){ return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file); }); }
async function handleMeetingAttach(e){
  const files=[...e.target.files]; if(!files.length) return;
  for(const f of files){
    if(f.size>4*1024*1024){ toast(`«${f.name}» أكبر من 4 ميجا`); continue; }
    try{ const data=await fileToDataURL(f); mtgDraft.attachments.push({id:uid('at'), name:f.name, type:f.type, data}); }
    catch(_){ toast('تعذّر إرفاق '+f.name); }
  }
  e.target.value=''; renderMeetingAttachments();
}
function renderMeetingAttachments(){
  const el=$('#mtgAttachments'); const list=(mtgDraft&&mtgDraft.attachments)||[];
  if(!list.length){ el.innerHTML='<div class="mtg-block-help" style="margin:0">لا مرفقات</div>'; return; }
  el.innerHTML=list.map(a=>`<div class="mtg-attach-row"><a href="${a.data}" download="${escapeHtml(a.name)}" target="_blank">📎 ${escapeHtml(a.name)}</a><button type="button" class="remove-btn" onclick="removeMeetingAttach('${a.id}')">×</button></div>`).join('');
}
function removeMeetingAttach(id){ mtgDraft.attachments=mtgDraft.attachments.filter(a=>a.id!==id); renderMeetingAttachments(); }

/* المؤقّت والتنبيه */
function beep(){ try{ const ctx=new (window.AudioContext||window.webkitAudioContext)(); const o=ctx.createOscillator(); const g=ctx.createGain();
  o.connect(g); g.connect(ctx.destination); o.type='sine'; o.frequency.value=880; g.gain.value=0.1;
  o.start(); setTimeout(()=>{ o.stop(); ctx.close(); },400); }catch(e){} }
function updateTimerUI(){
  const started=mtgDraft.startedAt, ended=mtgDraft.endedAt;
  const clock=$('#mtgTimerClock'), label=$('#mtgTimerLabel'), sBtn=$('#mtgStartBtn'), eBtn=$('#mtgEndBtn');
  if(ended){ clock.textContent=formatDuration(new Date(ended)-new Date(started));
    label.textContent='انتهى الاجتماع — المدة الإجمالية'; sBtn.style.display='none'; eBtn.style.display='none';
  } else if(started){ label.textContent='الاجتماع جارٍ...'; sBtn.style.display='none'; eBtn.style.display='inline-flex'; tickTimer();
  } else { clock.textContent='00:00:00'; label.textContent='لم يبدأ الاجتماع بعد'; sBtn.style.display='inline-flex'; eBtn.style.display='none'; }
}
function tickTimer(){
  if(!mtgDraft || !mtgDraft.startedAt || mtgDraft.endedAt) return;
  const elapsed=Date.now()-new Date(mtgDraft.startedAt).getTime();
  $('#mtgTimerClock').textContent=formatDuration(elapsed);
  const planned=parseInt($('#mtgPlanned').value)||0;
  if(planned>0 && elapsed>=planned*60000 && !mtgAlertShown){
    mtgAlertShown=true; $('#mtgTimeAlert').style.display='block'; toast('⏰ انتهى الوقت المحدد للاجتماع'); beep();
  }
}
function startMeetingTimer(){
  if(!persistMeetingDraft(false)) return;
  mtgDraft.startedAt=new Date().toISOString(); mtgDraft.endedAt=null; mtgAlertShown=false;
  $('#mtgTimeAlert').style.display='none'; persistMeetingDraft(true); updateTimerUI();
  clearInterval(mtgTimerInterval); mtgTimerInterval=setInterval(tickTimer,1000); toast('بدأ توقيت الاجتماع');
}
function endMeetingTimer(){
  if(!mtgDraft.startedAt){ toast('لم يبدأ الاجتماع بعد'); return; }
  mtgDraft.endedAt=new Date().toISOString(); clearInterval(mtgTimerInterval); persistMeetingDraft(true); updateTimerUI();
  toast('انتهى الاجتماع — المدة '+formatDuration(new Date(mtgDraft.endedAt)-new Date(mtgDraft.startedAt)));
}

/* الحفظ */
function persistMeetingDraft(silent){
  const number=$('#mtgNumber').value.trim(); const datetime=$('#mtgDatetime').value;
  if(!number){ if(!silent) toast('أدخل رقم الاجتماع'); return false; }
  if(!datetime){ if(!silent) toast('أدخل تاريخ ووقت الاجتماع'); return false; }
  const obj={ id:mtgEditId||uid('mtg'), number, datetime,
    committee:$('#mtgCommittee').value.trim(), plannedMinutes:parseInt($('#mtgPlanned').value)||0,
    attendance:collectAttendance(), speech:$('#mtgSpeech').value.trim(), agenda:$('#mtgAgenda').value.trim(),
    proceedings:$('#mtgProceedings').value.trim(), minutes:$('#mtgMinutes').value.trim(),
    decisions:collectItems('#mtgDecisions'), tasks:collectItems('#mtgTasks'),
    attachments:mtgDraft.attachments||[], startedAt:mtgDraft.startedAt||null, endedAt:mtgDraft.endedAt||null,
    createdAt:mtgDraft.createdAt||new Date().toISOString() };
  const idx=meetings.findIndex(x=>x.id===obj.id);
  if(idx>=0) meetings[idx]=obj; else meetings.push(obj);
  mtgEditId=obj.id; saveMeetings(); return true;
}
async function saveMeeting(){ if(!persistMeetingDraft(false)) return; closeMeetingModal(); toast('تم حفظ الاجتماع'); renderMeetings(); }

/* ─── صفحة التفاصيل ─── */
let mdCurrentId=null;
function showMeetingDetail(id){
  const m=meetings.find(x=>x.id===id); if(!m) return; mdCurrentId=id;
  $('#mdTitle').textContent=`اجتماع رقم ${m.number}`;
  $('#mdSubtitle').textContent=`${fmtMeetingDT(m.datetime)}${m.committee?' · '+m.committee:''}`;
  renderDetailPanes(m); switchDetailTab('info'); $('#meetingDetailModal').classList.add('open');
}
function switchDetailTab(which){
  $$('#mdTabs .tab').forEach(t=>t.classList.toggle('active', t.dataset.mdtab===which));
  ['info','attendance','agenda','proceedings','decisions','tasks','attachments','minutes'].forEach(p=>{
    $('#md-'+p).style.display = p===which?'block':'none';
  });
}
function detailItemList(m,kind){
  const items=kind==='decision'?(m.decisions||[]):(m.tasks||[]);
  if(!items.length) return `<div class="empty"><div class="txt">لا يوجد.</div></div>`;
  const ts=today();
  return items.map(it=>{
    const overdue=!it.done && it.due && it.due<ts;
    const chip=it.done?'<span class="md-chip done">منجز</span>':(overdue?'<span class="md-chip late">متأخر</span>':'<span class="md-chip open">قيد التنفيذ</span>');
    return `<div class="md-item ${it.done?'done':''}">
      <div class="md-item-text">${escapeHtml(it.text)}</div>
      <div class="md-item-meta">
        <span>👤 ${it.owner?escapeHtml(it.owner):'—'}</span>
        <span>📅 ${it.due||'بدون موعد'}</span> ${chip}
        <button class="btn btn-ghost btn-sm" onclick="toggleItemDone('${kind}','${it.id}')">${it.done?'إلغاء الإنجاز':'وضع كمنجز'}</button>
      </div></div>`;
  }).join('');
}
function renderDetailPanes(m){
  const dur=meetingDuration(m);
  $('#md-info').innerHTML=
    detailRow('رقم الاجتماع', escapeHtml(m.number))+
    detailRow('التاريخ والوقت', fmtMeetingDT(m.datetime))+
    detailRow('اللجنة', m.committee?escapeHtml(m.committee):'—')+
    detailRow('المدة المحددة', m.plannedMinutes?`${m.plannedMinutes} دقيقة`:'بدون تحديد')+
    detailRow('المدة الفعلية', dur||'—')+
    detailRow('بدأ في', m.startedAt?fmtMeetingDT(m.startedAt):'—')+
    detailRow('انتهى في', m.endedAt?fmtMeetingDT(m.endedAt):'—')+
    detailRow('عدد القرارات', (m.decisions||[]).length)+
    detailRow('عدد المهام', (m.tasks||[]).length);
  const present=(m.attendance||[]).filter(a=>a.present), absent=(m.attendance||[]).filter(a=>!a.present);
  const nm=id=>{ const x=members.find(y=>y.id===id); return x?escapeHtml(x.name):'—'; };
  const total=(m.attendance||[]).length, pct=total?Math.round(present.length/total*100):0;
  $('#md-attendance').innerHTML=`
    <div class="mtg-att-summary" style="margin-bottom:12px">نسبة الحضور ${pct}% — حاضر ${present.length} · غائب ${absent.length}</div>
    <div class="md-att-cols">
      <div class="md-att-col present"><h4>الحاضرون (${present.length})</h4><ul>${present.map(a=>`<li>${nm(a.memberId)}</li>`).join('')||'<li>—</li>'}</ul></div>
      <div class="md-att-col absent"><h4>الغائبون (${absent.length})</h4><ul>${absent.map(a=>`<li>${nm(a.memberId)}</li>`).join('')||'<li>—</li>'}</ul></div>
    </div>`;
  $('#md-agenda').innerHTML=m.agenda?`<div class="md-text">${escapeHtml(m.agenda)}</div>`:`<div class="empty"><div class="txt">لا يوجد جدول أعمال.</div></div>`;
  $('#md-proceedings').innerHTML=m.proceedings?`<div class="md-text">${escapeHtml(m.proceedings)}</div>`:`<div class="empty"><div class="txt">لا توجد مجريات مسجّلة.</div></div>`;
  $('#md-decisions').innerHTML=detailItemList(m,'decision');
  $('#md-tasks').innerHTML=detailItemList(m,'task');
  const at=(m.attachments||[]);
  $('#md-attachments').innerHTML=at.length?at.map(a=>`<div class="mtg-attach-row"><a href="${a.data}" download="${escapeHtml(a.name)}" target="_blank">📎 ${escapeHtml(a.name)}</a></div>`).join(''):`<div class="empty"><div class="txt">لا مرفقات.</div></div>`;
  $('#md-minutes').innerHTML=`
    ${m.speech?`<div class="md-section-title">كلمة الاجتماع</div><div class="md-text" style="margin-bottom:12px">${escapeHtml(m.speech)}</div>`:''}
    <div class="md-section-title">محضر الاجتماع (راجعه وعدّله)</div>
    <textarea id="mdMinutesEdit" rows="7" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;font-family:inherit;font-size:14px;background:var(--bg);color:var(--ink);resize:vertical">${escapeHtml(m.minutes||'')}</textarea>
    <div class="actions-row" style="margin-top:10px">
      <button class="btn btn-ghost btn-sm" onclick="saveMinutesEdit()">💾 حفظ التعديل</button>
      <button class="btn btn-accent btn-sm" onclick="summarizeMinutes('${m.id}')">✨ اختصار المحضر</button>
      <button class="btn btn-primary btn-sm" onclick="printMeetingMinutes('${m.id}')">🖨️ طباعة المحضر PDF</button>
      <button class="btn wa-btn btn-sm" onclick="shareMeetingMinutesWA('${m.id}')">${WA_ICON}<span style="margin-right:4px">واتساب</span></button>
    </div>
    <div class="note" style="margin-top:10px">«اختصار المحضر» ينسخ النص ويفتح موقع ذكاء اصطناعي — الصقه (Ctrl+V) واطلب الاختصار. لإرسال المحضر PDF في واتساب: اطبعه واحفظه كـ PDF ثم أرفقه في المحادثة.</div>`;
}
async function toggleItemDone(kind,itemId){
  const m=meetings.find(x=>x.id===mdCurrentId); if(!m) return;
  const arr=kind==='decision'?m.decisions:m.tasks; const it=(arr||[]).find(x=>x.id===itemId); if(!it) return;
  it.done=!it.done; await saveMeetings(); renderDetailPanes(m); switchDetailTab(kind==='decision'?'decisions':'tasks'); renderMeetingStats();
}
async function saveMinutesEdit(){
  const m=meetings.find(x=>x.id===mdCurrentId); if(!m) return;
  m.minutes=$('#mdMinutesEdit').value.trim(); await saveMeetings(); toast('تم حفظ المحضر');
}
async function summarizeMinutes(id){
  const m=meetings.find(x=>x.id===id); if(!m) return;
  const box=document.getElementById('mdMinutesEdit');
  const text=(box?box.value:(m.minutes||'')).trim();
  if(!text){ toast('لا يوجد محضر لاختصاره — اكتب المحضر أولاً'); return; }
  const prompt='لخّص محضر اجتماع مجلس الإدارة التالي في نقاط موجزة وواضحة باللغة العربية، مع إبراز أهم القرارات والمهام والمسؤولين عنها:\n\n'+text;
  await copyToClipboard(prompt);
  const url = prompt.length<1500 ? 'https://chatgpt.com/?q='+encodeURIComponent(prompt) : 'https://chatgpt.com/';
  window.open(url,'_blank');
  toast('تم نسخ المحضر — الصقه في الموقع واطلب الاختصار');
}

/* ─── دعوة اجتماع ─── */
function openInviteModal(){
  const nextNo=meetings.reduce((mx,x)=>{ const n=parseInt(x.number); return isNaN(n)?mx:Math.max(mx,n); },0)+1;
  $('#invNumber').value=String(nextNo);
  $('#invPlace').value='مقر الهيئة';
  $('#invDate').value=''; $('#invTime').value=''; $('#invAgenda').value='';
  buildInviteText(); renderInviteAdmins();
  $('#inviteModal').classList.add('open');
}
function fmtInvDate(v){ if(!v) return '—'; const d=new Date(v+'T00:00'); if(isNaN(d)) return v;
  return `${String(d.getDate()).padStart(2,'0')} ${AR_MONTHS[d.getMonth()]} ${d.getFullYear()}`; }
function fmtInvTime(v){ if(!v) return '—'; let [h,mi]=v.split(':').map(Number); const ap=h>=12?'مساءً':'صباحاً'; h=h%12||12; return `${h}:${String(mi).padStart(2,'0')} ${ap}`; }
function buildInviteText(){
  const no=$('#invNumber').value.trim()||'—';
  const date=fmtInvDate($('#invDate').value), time=fmtInvTime($('#invTime').value);
  const place=$('#invPlace').value.trim()||'مقر الهيئة';
  const agenda=$('#invAgenda').value.trim();
  let t='بسم الله الرحمن الرحيم\n\n';
  t+='*دعوة لحضور اجتماع مجلس إدارة هيئة محبي الحسين*\n\n';
  t+='الأخ الكريم عضو مجلس الإدارة،\n';
  t+=`يسرّ أمانة السر دعوتكم لحضور الاجتماع رقم (${no})\n\n`;
  t+=`🗓️ التاريخ: ${date}\n🕐 الوقت: ${time}\n📍 المكان: ${place}\n`;
  if(agenda) t+=`\n*جدول الأعمال:*\n${agenda}\n`;
  t+='\nنأمل حضوركم في الموعد المحدد، ولكم جزيل الشكر.\nأمانة السر';
  $('#invText').value=t;
}
function copyInvite(){ const t=$('#invText').value.trim(); if(!t){ toast('النص فارغ'); return; } copyToClipboard(t); toast('تم نسخ نص الدعوة'); }
function renderInviteAdmins(){
  const admins=members.filter(m=>m.isAdmin); const el=$('#inviteAdmins');
  if(!admins.length){ el.innerHTML='<div class="mtg-block-help" style="margin:0">لا يوجد أعضاء إدارة مسجّلون.</div>'; return; }
  el.innerHTML=admins.map(m=>`<div class="invite-admin-row">
    <div class="ia-name">${escapeHtml(m.name)}<small>${escapeHtml(m.committee||'إدارة الهيئة')}${m.phone?' · '+escapeHtml(m.phone):''}</small></div>
    <button class="btn wa-btn small" onclick="sendInvite('${m.id}')">${WA_ICON}</button>
  </div>`).join('');
}
function sendInvite(memberId){
  const m=members.find(x=>x.id===memberId); if(!m) return;
  const t=$('#invText').value.trim(); if(!t){ toast('النص فارغ'); return; }
  if(!m.phone){ toast('لا يوجد رقم هاتف لهذا العضو'); return; }
  window.open(whatsappLink(m.phone,t),'_blank');
}
function editCurrentMeeting(){ const id=mdCurrentId; closeModal('meetingDetailModal'); openMeetingModal(id); }
async function deleteCurrentMeeting(){
  const m=meetings.find(x=>x.id===mdCurrentId); if(!m) return;
  if(!confirm(`حذف اجتماع رقم ${m.number}؟ لا يمكن التراجع.`)) return;
  meetings=meetings.filter(x=>x.id!==mdCurrentId); await saveMeetings();
  closeModal('meetingDetailModal'); toast('تم حذف الاجتماع'); renderMeetings();
}

/* ─── لوحة المتابعة ─── */
function renderFollowup(){
  const typeF=$('#followType').value, statF=$('#followStatus').value; const ts=today(); const rows=[];
  meetings.forEach(m=>{
    (m.decisions||[]).forEach(d=>rows.push({kind:'decision', mId:m.id, mNo:m.number, ...d}));
    (m.tasks||[]).forEach(t=>rows.push({kind:'task', mId:m.id, mNo:m.number, ...t}));
  });
  let filtered=rows.filter(r=>{
    if(typeF && r.kind!==typeF) return false;
    const overdue=!r.done && r.due && r.due<ts;
    if(statF==='open' && r.done) return false;
    if(statF==='done' && !r.done) return false;
    if(statF==='overdue' && !overdue) return false;
    return true;
  });
  filtered.sort((a,b)=>{ const rank=x=>x.done?2:((x.due&&x.due<ts)?0:1); return rank(a)-rank(b); });
  const el=$('#followupList');
  if(!filtered.length){ el.innerHTML=`<div class="empty"><div class="icon">📌</div><div class="txt">لا توجد قرارات أو مهام مطابقة.</div></div>`; return; }
  el.innerHTML=filtered.map(r=>{
    const overdue=!r.done && r.due && r.due<ts;
    const chip=overdue?'<span class="md-chip late">متأخر</span>':(r.done?'<span class="md-chip done">منجز</span>':'<span class="md-chip open">قيد التنفيذ</span>');
    return `<div class="fu-row ${r.done?'done':''}">
      <div class="fu-top">
        <input type="checkbox" class="fu-check" ${r.done?'checked':''} onchange="toggleFollowupDone('${r.mId}','${r.kind}','${r.id}')"/>
        <div class="fu-text">${escapeHtml(r.text||'—')}</div>
        <span class="fu-kind ${r.kind}">${r.kind==='decision'?'قرار':'مهمة'}</span>
      </div>
      <div class="fu-meta">
        <span>👤 ${r.owner?escapeHtml(r.owner):'—'}</span>
        <span>📅 ${r.due||'بدون موعد'}</span>
        <span>📋 اجتماع ${escapeHtml(r.mNo)}</span> ${chip}
      </div></div>`;
  }).join('');
}
async function toggleFollowupDone(mId,kind,itemId){
  const m=meetings.find(x=>x.id===mId); if(!m) return;
  const arr=kind==='decision'?m.decisions:m.tasks; const it=(arr||[]).find(x=>x.id===itemId); if(!it) return;
  it.done=!it.done; await saveMeetings(); renderFollowup(); renderMeetingStats();
}

/* ─── الطباعة PDF ─── */
function printMeetingMinutes(id){
  const m=meetings.find(x=>x.id===id); if(!m) return;
  const nm=mid=>{ const x=members.find(y=>y.id===mid); return x?escapeHtml(x.name):'—'; };
  const present=(m.attendance||[]).filter(a=>a.present).map(a=>nm(a.memberId));
  const absent=(m.attendance||[]).filter(a=>!a.present).map(a=>nm(a.memberId));
  const dur=meetingDuration(m);
  const listHTML=arr=>arr.length?'<ol>'+arr.map(it=>`<li>${escapeHtml(it.text)}${it.owner?` — <b>${escapeHtml(it.owner)}</b>`:''}${it.due?` (${it.due})`:''}${it.done?' ✔':''}</li>`).join('')+'</ol>':'<p class="muted">لا يوجد</p>';
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>محضر اجتماع رقم ${escapeHtml(m.number)}</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>
    *{box-sizing:border-box;}
    body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:40px 44px;color:#241412;line-height:1.85;font-size:16px;}
    .pdf-logo{display:block;margin:0 auto 10px;max-width:300px;max-height:105px;width:auto;height:auto;}
    .pdf-header{text-align:center;padding-bottom:18px;margin-bottom:8px;border-bottom:3px double #b8934a;}
    .doc-title{text-align:center;font-family:'Amiri',serif;font-size:26px;font-weight:700;color:#7a1e1e;margin:14px 0 4px;}
    .doc-sub{text-align:center;color:#8a7d75;font-size:15px;margin-bottom:26px;letter-spacing:.3px;}
    .info-card{background:#faf6ef;border:1px solid #ece3d4;border-radius:14px;padding:18px 22px;margin-bottom:28px;}
    .info{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px;font-size:16px;}
    .info .item{display:flex;flex-direction:column;gap:2px;}
    .info .lbl{color:#a08d7a;font-size:13px;font-weight:600;}
    .info .val{color:#241412;font-weight:600;font-size:16.5px;}
    h2{font-size:19px;color:#fff;background:#7a1e1e;display:inline-block;padding:7px 18px 7px 22px;border-radius:0 20px 20px 0;margin:34px 0 14px;box-shadow:0 2px 6px rgba(122,30,30,.2);}
    h2 .cnt{opacity:.75;font-size:15px;font-weight:400;}
    .txt{white-space:pre-wrap;font-size:16.5px;line-height:1.9;background:#fbf9f5;border:1px solid #ece3d4;border-right:4px solid #b8934a;border-radius:10px;padding:16px 20px;color:#33201d;}
    ol{margin:0;padding-right:26px;} li{margin-bottom:9px;font-size:16.5px;line-height:1.75;}
    li b{color:#7a1e1e;}
    .muted{color:#a08d7a;font-size:15px;font-style:italic;}
    .cols{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:6px;}
    .att-box{background:#fbf9f5;border:1px solid #ece3d4;border-radius:12px;padding:14px 18px;}
    .att-box .att-head{font-weight:700;font-size:16px;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #ece3d4;}
    .att-box.present .att-head{color:#2f6b34;} .att-box.absent .att-head{color:#a12b2b;}
    .att-box ul{list-style:none;margin:0;padding:0;} .att-box li{padding:6px 0;border-bottom:1px solid #f0eae0;font-size:16px;}
    .att-box li:last-child{border-bottom:none;}
    .att-box li::before{content:'•';color:#b8934a;margin-left:8px;font-weight:700;}
    .signature-block{margin-top:56px;text-align:center;page-break-inside:avoid;}
    .signature-block .sig-img{display:block;margin:0 auto 2px;max-width:190px;max-height:130px;width:auto;height:auto;}
    .signature-block .sig-line{width:230px;border-top:1.5px solid #cbb48f;margin:0 auto 8px;}
    .signature-block .sig-title{font-size:16px;font-weight:700;color:#241412;}
    .signature-block .sig-name{font-size:16px;color:#5a4a44;margin-top:2px;}
    .foot{margin-top:40px;padding-top:14px;border-top:1px solid #ece3d4;text-align:center;color:#b0a498;font-size:12.5px;}
    @media print{body{padding:28px;}}
    ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
    <div class="pdf-header"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="هيئة محبي الحسين" />
      <div class="doc-title">محضر اجتماع مجلس الإدارة</div>
      <div class="doc-sub">اجتماع رقم ${escapeHtml(m.number)} · ${hijriToday()}</div>
    </div>
    <div class="info-card"><div class="info">
      <div class="item"><span class="lbl">التاريخ والوقت</span><span class="val">${fmtMeetingDT(m.datetime)}</span></div>
      <div class="item"><span class="lbl">اللجنة</span><span class="val">${m.committee?escapeHtml(m.committee):'—'}</span></div>
      <div class="item"><span class="lbl">المدة الفعلية</span><span class="val">${dur||'—'}</span></div>
      <div class="item"><span class="lbl">الحضور / الغياب</span><span class="val">${present.length} حاضر · ${absent.length} غائب</span></div>
    </div></div>
    ${m.speech?`<h2>كلمة الاجتماع</h2><div class="txt">${escapeHtml(m.speech)}</div>`:''}
    <h2>الحضور والغياب</h2>
    <div class="cols">
      <div class="att-box present"><div class="att-head">الحاضرون (${present.length})</div><ul>${present.map(n=>`<li>${n}</li>`).join('')||'<li>—</li>'}</ul></div>
      <div class="att-box absent"><div class="att-head">الغائبون (${absent.length})</div><ul>${absent.map(n=>`<li>${n}</li>`).join('')||'<li>—</li>'}</ul></div>
    </div>
    ${m.agenda?`<h2>جدول الأعمال</h2><div class="txt">${escapeHtml(m.agenda)}</div>`:''}
    ${m.proceedings?`<h2>مجريات الاجتماع</h2><div class="txt">${escapeHtml(m.proceedings)}</div>`:''}
    <h2>القرارات <span class="cnt">(${(m.decisions||[]).length})</span></h2>${listHTML(m.decisions||[])}
    <h2>المهام <span class="cnt">(${(m.tasks||[]).length})</span></h2>${listHTML(m.tasks||[])}
    ${m.minutes?`<h2>نص المحضر</h2><div class="txt">${escapeHtml(m.minutes)}</div>`:''}
    <div class="signature-block">
      <img class="sig-img" src="${HAIAA_SIGNATURE}" alt="التوقيع" />
      <div class="sig-line"></div>
      <div class="sig-title">أمين السر</div>
      <div class="sig-name">صادق الغسرة</div>
    </div>
    <div class="foot">هيئة محبي الحسين (ع) — وثيقة رسمية</div>
    </body></html>`);
  w.document.close(); w.focus();
}
function shareMeetingMinutesWA(id){
  const m=meetings.find(x=>x.id===id); if(!m) return;
  const present=(m.attendance||[]).filter(a=>a.present).length, absent=(m.attendance||[]).length-present;
  let txt=`*محضر اجتماع مجلس الإدارة رقم ${m.number}*\n`;
  txt+=`التاريخ: ${fmtMeetingDT(m.datetime)}\n`;
  if(m.committee) txt+=`اللجنة: ${m.committee}\n`;
  txt+=`الحضور: ${present} — الغياب: ${absent}\n`;
  if(m.agenda) txt+=`\n*جدول الأعمال:*\n${m.agenda}\n`;
  const dec=(m.decisions||[]); if(dec.length) txt+=`\n*القرارات (${dec.length}):*\n`+dec.map((d,i)=>`${i+1}. ${d.text}${d.owner?' — '+d.owner:''}${d.due?' ('+d.due+')':''}`).join('\n')+'\n';
  const tk=(m.tasks||[]); if(tk.length) txt+=`\n*المهام (${tk.length}):*\n`+tk.map((t,i)=>`${i+1}. ${t.text}${t.owner?' — '+t.owner:''}${t.due?' ('+t.due+')':''}`).join('\n')+'\n';
  if(m.minutes) txt+=`\n*المحضر:*\n${m.minutes}\n`;
  window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(txt),'_blank');
}
function printMeetingStats(){
  const s=meetingStats(); const absentBy={};
  meetings.forEach(m=>(m.attendance||[]).forEach(a=>{ if(!a.present) absentBy[a.memberId]=(absentBy[a.memberId]||0)+1; }));
  const rows=Object.entries(absentBy).map(([id,n])=>{ const x=members.find(y=>y.id===id); return {name:x?x.name:'—', n}; }).sort((a,b)=>b.n-a.n);
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>إحصائية الاجتماعات</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:30px;color:#1a0a0a;}
    h1{font-family:'Amiri',serif;color:#7a1e1e;text-align:center;border-bottom:2px solid #b8934a;padding-bottom:12px;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:20px;}
    .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;}
    .c{border:1px solid #e0dccf;border-radius:10px;padding:16px;text-align:center;} .c .n{font-size:26px;font-weight:700;color:#7a1e1e;} .c .l{font-size:12px;color:#94908a;margin-top:4px;}
    h2{font-size:15px;color:#7a1e1e;} table{width:100%;border-collapse:collapse;font-size:14px;} th,td{border:1px solid #e0dccf;padding:9px 12px;text-align:right;} th{background:#3a1010;color:#fff;} tr:nth-child(even){background:#faf7f2;}
    ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
    <h1>هيئة محبي الحسين</h1><div class="sub">إحصائية اجتماعات مجلس الإدارة — ${hijriToday()}</div>
    <div class="cards">
      <div class="c"><div class="n">${s.count}</div><div class="l">عدد الاجتماعات</div></div>
      <div class="c"><div class="n">${s.attPct}%</div><div class="l">نسبة الحضور</div></div>
      <div class="c"><div class="n">${s.absPct}%</div><div class="l">نسبة الغياب</div></div>
      <div class="c"><div class="n">${s.openDec}</div><div class="l">قرارات قيد التنفيذ</div></div>
      <div class="c"><div class="n">${s.lateTasks}</div><div class="l">مهام متأخرة</div></div>
      <div class="c"><div class="n">${s.topMember?escapeHtml(s.topMember.name):'—'}</div><div class="l">الأكثر غياباً (${s.topAbsN})</div></div>
    </div>
    <h2>غياب أعضاء الإدارة</h2>
    <table><thead><tr><th>العضو</th><th>عدد مرات الغياب</th></tr></thead>
    <tbody>${rows.map(r=>`<tr><td>${escapeHtml(r.name)}</td><td>${r.n}</td></tr>`).join('')||'<tr><td colspan="2" style="text-align:center;color:#94908a">لا غيابات</td></tr>'}</tbody></table>
    </body></html>`);
  w.document.close(); w.focus();
}

/* ─── استمارة تسجيل عضو فارغة ─── */
function printBlankMemberForm(){
  const line='<div style="border-bottom:1px dashed #999;height:26px;margin-top:6px;"></div>';
  const field=label=>`<div class="f"><label>${label}</label>${line}</div>`;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>استمارة تسجيل عضو</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:32px;color:#1a0a0a;}
    .pdf-logo{display:block;margin:0 auto 8px;max-width:240px;max-height:85px;width:auto;height:auto;}
    .pdf-head{border-bottom:2px solid #b8934a;padding-bottom:12px;margin-bottom:4px;text-align:center;}
    h1{font-family:'Amiri',serif;color:#7a1e1e;text-align:center;margin:0;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:24px;}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 24px;}
    .f{display:flex;flex-direction:column;} .f.full{grid-column:1/-1;} label{font-size:13px;font-weight:600;color:#3a2a28;}
    .checks{display:flex;gap:24px;margin-top:8px;font-size:14px;flex-wrap:wrap;} .box{display:inline-block;width:16px;height:16px;border:1.5px solid #7a1e1e;border-radius:3px;vertical-align:middle;margin-left:6px;}
    .qblock{display:flex;flex-direction:column;gap:14px;margin-top:16px;}
    .qrow{display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-size:14px;}
    .qrow .q{font-weight:600;min-width:165px;} .yn{display:flex;gap:12px;align-items:center;}
    .blank{display:flex;align-items:center;gap:6px;flex:1;min-width:190px;font-weight:600;} .ln{flex:1;border-bottom:1px dashed #999;height:18px;min-width:110px;}
    .note{margin-top:24px;font-size:12px;color:#94908a;border-top:1px solid #eee;padding-top:12px;}
    ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
    <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="هيئة محبي الحسين" /></div><div class="sub">استمارة تسجيل عضو جديد — تُعبّأ بخط اليد</div>
    <div class="grid">
      ${field('الاسم الكامل')}${field('رقم الهاتف')}${field('المنطقة')}${field('البريد الإلكتروني')}
      <div class="f full">${field('العنوان')}</div>
      ${field('تاريخ الميلاد (للأعضاء دون ١٨)')}
    </div>
    <div class="f full" style="margin-top:16px"><label>نوع العضوية</label>
      <div class="checks"><span><span class="box"></span>عادي فعّال</span><span><span class="box"></span>شرفي</span><span><span class="box"></span>كادر فعّال</span></div></div>
    <div class="qblock">
      <div class="qrow"><span class="q">هل هو أكبر من ١٨ سنة؟</span><span class="yn"><span class="box"></span>نعم <span class="box"></span>لا</span></div>
      <div class="qrow"><span class="q">هل هو من إدارة الهيئة؟</span><span class="yn"><span class="box"></span>نعم <span class="box"></span>لا</span><span class="blank">اسم اللجنة: <span class="ln"></span></span></div>
      <div class="qrow"><span class="q">هل لديه ميقات سنوي؟</span><span class="yn"><span class="box"></span>نعم <span class="box"></span>لا</span><span class="blank">اسم الميقات: <span class="ln"></span></span></div>
    </div>
    <div class="f full" style="margin-top:20px"><label>ملاحظات</label>${line}${line}</div>
    <div class="note">يُنشأ رقم العضوية بعد إدخال البيانات إلكترونياً، وسيتم إرسال بطاقة العضوية على رقم الهاتف المسجّل. التاريخ: ${hijriToday()}</div>
    </body></html>`);
  w.document.close(); w.focus();
}
/* ═══════════════════════ نهاية وحدة الاجتماعات ═══════════════════════ */

/* ═══════════════════════ الجمعية العمومية ═══════════════════════ */
let currentAssemblyId=null, asmSaveTimer=null;

function renderAssemblyTab(){
  const sel=$('#asmYear');
  if(!assemblies.length){ $('#asmEmpty').style.display='block'; $('#asmBody').style.display='none'; sel.innerHTML=''; return; }
  const sorted=[...assemblies].sort((a,b)=>b.year-a.year);
  if(!currentAssemblyId || !assemblies.find(a=>a.id===currentAssemblyId)) currentAssemblyId=sorted[0].id;
  sel.innerHTML=sorted.map(a=>`<option value="${a.id}" ${a.id===currentAssemblyId?'selected':''}>الجمعية العمومية ${a.year}</option>`).join('');
  $('#asmEmpty').style.display='none'; $('#asmBody').style.display='block';
  loadReportFields(); renderAsmAttendance(); renderAsmProjects(); renderAsmDecCard();
  $('#asmSearch').value=''; $('#asmSearchResults').innerHTML='';
  switchAsmPill('attend');
}
function switchAssembly(){ currentAssemblyId=$('#asmYear').value; renderAssemblyTab(); }
function getAssembly(){ return assemblies.find(a=>a.id===currentAssemblyId)||null; }
function newAssembly(){
  const y=prompt('سنة الجمعية العمومية:', String(new Date().getFullYear()));
  if(!y) return; const year=parseInt(y); if(isNaN(year)){ toast('سنة غير صحيحة'); return; }
  const ex=assemblies.find(a=>a.year===year);
  if(ex){ currentAssemblyId=ex.id; toast('الجمعية موجودة'); renderAssemblyTab(); return; }
  const a={ id:uid('asm'), year, attendees:[], projects:[],
    report:{adminWord:'',plan:'',majalis:'',events:'',mawakib:'',achievements:'',topProjects:'',challenges:'',honoring:''} };
  assemblies.push(a); currentAssemblyId=a.id; saveAssemblies(); renderAssemblyTab(); toast('تم إنشاء الجمعية العمومية '+year);
}
function switchAsmPill(which){
  $$('.asm-pills .asm-pill').forEach(p=>p.classList.toggle('active', p.dataset.apill===which));
  $('#apane-attend').style.display = which==='attend'?'block':'none';
  $('#apane-projects').style.display = which==='projects'?'block':'none';
  $('#apane-report').style.display = which==='report'?'block':'none';
}

/* الحضور + الداشبورد */
function donutSVG(active,inactive){
  const total=active+inactive, r=60, c=2*Math.PI*r;
  if(!total) return `<svg viewBox="0 0 140 140"><circle cx="70" cy="70" r="60" fill="none" stroke="#ddd" stroke-width="18"/><text x="70" y="75" text-anchor="middle" font-size="13" fill="#999">لا حضور</text></svg>`;
  const activeLen=c*active/total;
  return `<svg viewBox="0 0 140 140">
    <circle cx="70" cy="70" r="60" fill="none" stroke="#d98a7a" stroke-width="18"/>
    <circle cx="70" cy="70" r="60" fill="none" stroke="#4f9d4d" stroke-width="18"
      stroke-dasharray="${activeLen} ${c-activeLen}" transform="rotate(-90 70 70)"/>
    <text x="70" y="66" text-anchor="middle" font-size="24" font-weight="700" fill="#3a2a28">${Math.round(active/total*100)}%</text>
    <text x="70" y="88" text-anchor="middle" font-size="11" fill="#94908a">مفعّل</text>
  </svg>`;
}
function renderAsmAttendance(){
  const a=getAssembly(); if(!a) return;
  const present=a.attendees.map(id=>members.find(m=>m.id===id)).filter(Boolean);
  const active=present.filter(isActive).length, inactive=present.length-active;
  $('#asmPresentCount').textContent=present.length;
  $('#asmActiveN').textContent=active; $('#asmInactiveN').textContent=inactive;
  $('#asmActivePct').textContent=present.length?Math.round(active/present.length*100)+'%':'0%';
  $('#asmInactivePct').textContent=present.length?Math.round(inactive/present.length*100)+'%':'0%';
  $('#asmTotalMembers').textContent=members.length;
  $('#asmDonut').innerHTML=donutSVG(active,inactive);
  $('#asmAttendListCount').textContent=present.length;
  const el=$('#asmAttendList');
  el.innerHTML=present.length?present.map(m=>`<div class="asm-attend-row">
    <div class="nm">${escapeHtml(m.name)}<small class="${isActive(m)?'badge-active':'badge-inactive'}">${isActive(m)?'مفعّل':'غير مفعّل'} · ${memberCode(m)}</small></div>
    <button class="btn btn-ghost btn-sm" onclick="toggleAsmPresent('${m.id}')">إزالة</button>
  </div>`).join(''):'<div class="mtg-block-help" style="margin:0">لا حاضرين بعد — ابحث بالأعلى وسجّل الحضور.</div>';
}
function renderAsmSearch(){
  const a=getAssembly(); if(!a) return;
  const q=($('#asmSearch').value||'').trim().toLowerCase();
  const el=$('#asmSearchResults');
  if(!q){ el.innerHTML=''; return; }
  const matches=members.filter(m=>m.name.toLowerCase().includes(q)||memberCode(m).toLowerCase().includes(q)).slice(0,15);
  if(!matches.length){
    el.innerHTML=`<div class="asm-new-btn" onclick="asmAddNewMember()">➕ «${escapeHtml($('#asmSearch').value.trim())}» غير مسجّل — سجّله كعضو جديد وأضِف حضوره</div>`;
    return;
  }
  el.innerHTML=matches.map(m=>{
    const present=a.attendees.includes(m.id);
    return `<div class="asm-result-row">
      <div class="nm">${escapeHtml(m.name)}<small class="${isActive(m)?'badge-active':'badge-inactive'}">${isActive(m)?'مفعّل':'غير مفعّل'} · ${memberCode(m)}</small></div>
      <button class="btn ${present?'btn-ghost':'btn-primary'} btn-sm" onclick="toggleAsmPresent('${m.id}')">${present?'✓ حاضر':'➕ حاضر'}</button>
    </div>`;
  }).join('');
}
async function toggleAsmPresent(id){
  const a=getAssembly(); if(!a) return;
  const i=a.attendees.indexOf(id);
  if(i>=0) a.attendees.splice(i,1); else a.attendees.push(id);
  await saveAssemblies(); renderAsmAttendance(); renderAsmSearch();
}
function createQuickMember(name){
  const type='عادي'; const num=settings.counters[type]||1;
  const m={ id:'m_'+Date.now()+'_'+Math.random().toString(36).slice(2,6),
    number:num, type, name:name.trim(), isMinor:false, age:null, birthdate:null,
    phone:'', area:'', email:'', address:'', photo:null, isAdmin:false, committee:'',
    miqats:[], joinDate:today(), paymentDate:null, expiryDate:null, paidAmount:null };
  members.push(m); settings.counters[type]=num+1;
  return m;
}
async function asmAddNewMember(){
  const a=getAssembly(); if(!a) return;
  const name=($('#asmSearch').value||'').trim();
  if(!name){ toast('اكتب اسم العضو أولاً'); return; }
  const m=createQuickMember(name); a.attendees.push(m.id);
  await saveMembers(); await persistSettings(); await saveAssemblies();
  $('#asmSearch').value=''; $('#asmSearchResults').innerHTML='';
  renderAsmAttendance();
  toast(`تم تسجيل ${m.name} (${memberCode(m)}) وحضوره`);
}

/* المشاريع */
function renderAsmProjects(){
  const a=getAssembly(); if(!a) return;
  const el=$('#projectsList');
  if(!a.projects.length){ el.innerHTML='<div class="mtg-block-help" style="margin:0">لا مشاريع مسجّلة بعد.</div>'; return; }
  const groups={}; a.projects.forEach(p=>{ (groups[p.committee]=groups[p.committee]||[]).push(p); });
  el.innerHTML=Object.entries(groups).map(([comm,list])=>`<div class="proj-group">
    <h4>${escapeHtml(comm)}</h4>
    ${list.map(p=>`<div class="proj-card">
      <div class="pt">${escapeHtml(p.title)}</div>
      <div style="display:flex;align-items:center;gap:8px;">
        ${p.category?`<span class="cat">${escapeHtml(p.category)}</span>`:''}
        <button class="btn btn-ghost btn-sm" onclick="removeProject('${p.id}')">×</button>
      </div></div>`).join('')}
  </div>`).join('');
}
async function addProject(){
  const a=getAssembly(); if(!a) return;
  const title=$('#projTitle').value.trim(); if(!title){ toast('اكتب اسم المشروع'); return; }
  a.projects.push({id:uid('prj'), title, committee:$('#projCommittee').value, category:$('#projCategory').value.trim()});
  $('#projTitle').value=''; $('#projCategory').value='';
  await saveAssemblies(); renderAsmProjects();
}
async function removeProject(id){
  const a=getAssembly(); if(!a) return;
  a.projects=a.projects.filter(p=>p.id!==id); await saveAssemblies(); renderAsmProjects();
}

/* التقرير الأدبي */
function loadReportFields(){
  const a=getAssembly(); if(!a) return; const r=a.report||{};
  $('#rpAdminWord').value=r.adminWord||''; $('#rpPlan').value=r.plan||'';
  $('#rpMajalis').value=r.majalis||''; $('#rpEvents').value=r.events||'';
  $('#rpMawakib').value=r.mawakib||''; $('#rpAchievements').value=r.achievements||'';
  $('#rpTopProjects').value=r.topProjects||''; $('#rpChallenges').value=r.challenges||''; $('#rpHonoring').value=r.honoring||'';
}
function saveReportField(){
  const a=getAssembly(); if(!a) return;
  a.report={ adminWord:$('#rpAdminWord').value, plan:$('#rpPlan').value,
    majalis:$('#rpMajalis').value, events:$('#rpEvents').value, mawakib:$('#rpMawakib').value, achievements:$('#rpAchievements').value,
    topProjects:$('#rpTopProjects').value, challenges:$('#rpChallenges').value, honoring:$('#rpHonoring').value };
  clearTimeout(asmSaveTimer); asmSaveTimer=setTimeout(saveAssemblies, 500);
}
function decisionsExecution(){
  let total=0, done=0;
  meetings.forEach(m=>(m.decisions||[]).forEach(d=>{ total++; if(d.done) done++; }));
  return { total, done, pct: total?Math.round(done/total*100):0 };
}
function renderAsmDecCard(){
  const d=decisionsExecution();
  $('#asmDecCard').innerHTML=`<div class="dc-pct">${d.pct}%</div>
    <div class="dc-l">نسبة تنفيذ قرارات الاجتماعات (${d.done} من ${d.total})</div>
    <div class="asm-dec-bar"><i style="width:${d.pct}%"></i></div>`;
}
function printAssemblyReport(){
  const a=getAssembly(); if(!a) return; const r=a.report||{};
  const present=a.attendees.map(id=>members.find(m=>m.id===id)).filter(Boolean);
  const active=present.filter(isActive).length, inactive=present.length-active;
  const pct=present.length?Math.round(active/present.length*100):0;
  const dec=decisionsExecution();
  const groups={}; a.projects.forEach(p=>{(groups[p.committee]=groups[p.committee]||[]).push(p);});
  const projHTML=Object.keys(groups).length
    ? Object.entries(groups).map(([c,list])=>`<h3>${escapeHtml(c)}</h3><ul>${list.map(p=>`<li>${escapeHtml(p.title)}${p.category?` <span class="mut">(${escapeHtml(p.category)})</span>`:''}</li>`).join('')}</ul>`).join('')
    : '<p class="mut">لا مشاريع مسجّلة</p>';
  const sec=(t,b)=> b&&String(b).trim()? `<h2>${t}</h2><div class="txt">${escapeHtml(b)}</div>`:'';
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>التقرير الأدبي — الجمعية العمومية ${a.year}</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:32px;color:#241715;line-height:1.85;}
    h1{font-family:'Amiri',serif;color:#7a1e1e;text-align:center;border-bottom:2px solid #b8934a;padding-bottom:12px;margin-bottom:4px;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:22px;}
    h2{font-family:'Amiri',serif;font-size:20px;color:#7a1e1e;border-right:3px solid #b8934a;padding-right:10px;margin:24px 0 8px;}
    h3{font-size:14px;color:#5c1616;margin:12px 0 4px;}
    .txt{white-space:pre-wrap;font-size:14px;background:#faf7f2;border:1px solid #e0dccf;border-radius:8px;padding:10px 12px;}
    .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:6px 0;}
    .c{border:1px solid #e0dccf;border-radius:10px;padding:14px 8px;text-align:center;} .c .n{font-size:26px;font-weight:700;color:#7a1e1e;} .c .l{font-size:11px;color:#94908a;margin-top:3px;}
    .att{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:6px 0;}
    ul{margin:2px 20px;padding:0;} li{font-size:14px;margin-bottom:3px;} .mut{color:#94908a;}
    .bar{height:10px;background:#eee;border-radius:6px;overflow:hidden;margin-top:6px;} .bar>i{display:block;height:100%;background:#4f9d4d;}
    ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
    <h1>هيئة محبي الحسين</h1><div class="sub">التقرير الأدبي — الجمعية العمومية ${a.year}</div>
    ${sec('كلمة الإدارة', r.adminWord)}
    ${sec('خطة الهيئة لهذا العام', r.plan)}
    <h2>إحصائيات الموسم</h2>
    <div class="cards">
      <div class="c"><div class="n">${r.majalis||0}</div><div class="l">المجالس</div></div>
      <div class="c"><div class="n">${r.events||0}</div><div class="l">الفعاليات</div></div>
      <div class="c"><div class="n">${r.mawakib||0}</div><div class="l">المواكب</div></div>
      <div class="c"><div class="n">${r.achievements||0}</div><div class="l">الإنجازات</div></div>
    </div>
    <h2>الحضور في الجمعية</h2>
    <div class="att">
      <div class="c"><div class="n">${present.length}</div><div class="l">الحاضرون</div></div>
      <div class="c"><div class="n">${active}</div><div class="l">مفعّل العضوية</div></div>
      <div class="c"><div class="n">${inactive}</div><div class="l">غير مفعّل</div></div>
    </div>
    <h2>قرارات الاجتماعات ونسبة تنفيذها</h2>
    <div class="txt">تم تنفيذ <b>${dec.done}</b> من <b>${dec.total}</b> قراراً — بنسبة <b>${dec.pct}%</b>.<div class="bar"><i style="width:${dec.pct}%"></i></div></div>
    ${sec('أبرز المشاريع المنجزة', r.topProjects)}
    <h2>المشاريع المنجزة حسب اللجنة</h2>${projHTML}
    ${sec('التحديات التي واجهت الهيئة', r.challenges)}
    ${sec('التكريم الحسيني لخادم الإمام الحسين', r.honoring)}
    </body></html>`);
  w.document.close(); w.focus();
}
/* ═══════════════ نهاية وحدة الجمعية العمومية ═══════════════ */

/* ═══════════ Init ═══════════ */
function fillCountrySelects(){
  const opts=countryOptions('');
  const add=$('#addCountryCode'); if(add) add.innerHTML=`<option value="" disabled selected>اختر الدولة</option>`+opts;
  const edit=$('#editCountryCode'); if(edit) edit.innerHTML=opts;
}
(async ()=>{
  await loadData();
  applyDarkMode();
  fillHeaderDates();
  fillCountrySelects();
  renderDashboard();
  renderMembers();
  fillSettings();
})();

/* Service worker for offline use */
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{ navigator.serviceWorker.register('service-worker.js').catch(()=>{}); });
}
