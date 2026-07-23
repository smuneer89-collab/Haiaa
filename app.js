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
let photos = []; // ألبوم الصور: {id, img, occasion, photographer, desc, date}
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
/* ─── الحجز/الاكتمال بالمدفوع فعلاً (تقسيط) ─── */
function bookingAgreed(b){ return Number(b&&b.amount)||0; }                 // المبلغ المتّفق عليه
function bookingPaid(b){ if(b && Array.isArray(b.payments)) return b.payments.reduce((s,p)=>s+(Number(p.amount)||0),0); return Number(b&&b.amount)||0; } // القديم = مدفوع بالكامل
function bookingRemaining(b){ return Math.max(0, bookingAgreed(b)-bookingPaid(b)); }
function miqatPaid(mq){ return (mq.bookings||[]).reduce((s,b)=>s+bookingPaid(b),0); }   // اكتمال الميقات = المُحصّل فعلاً
function miqatAgreed(mq){ return (mq.bookings||[]).reduce((s,b)=>s+bookingAgreed(b),0); }
/* ─── العضوية بالتقسيط ─── */
function memberFeeTotal(m){ return m.feeTotal!=null ? (Number(m.feeTotal)||0) : (Number(settings.fee)||0); }
function memberPaid(m){ if(Array.isArray(m.payments)) return m.payments.reduce((s,p)=>s+(Number(p.amount)||0),0); return m.paymentDate ? (m.paidAmount!=null?Number(m.paidAmount):memberFeeTotal(m)) : 0; }
function memberRemaining(m){ return Math.max(0, memberFeeTotal(m)-memberPaid(m)); }
function memberSubStatus(m){ const paid=memberPaid(m), tot=memberFeeTotal(m); if(paid<=0) return 'none'; if(paid<tot) return 'partial'; return 'full'; }
function memberPayments(m){ if(Array.isArray(m.payments)) return m.payments; return m.paymentDate ? [{amount:(m.paidAmount!=null?Number(m.paidAmount):memberFeeTotal(m)), date:m.paymentDate}] : []; }
/* أنواع المساهمة: نقدي أو عيني (بقيمة تقديرية يكتبها المستخدم). كل حجز قد يضم عدّة بنود */
const CONTRIB_KINDS = ['نقدي','وجبة غداء','وجبة عشاء','أجرة خطيب','أجرة رادود','أخرى'];
function bookingItems(b){ if(b && Array.isArray(b.items) && b.items.length) return b.items; return [{kind:'نقدي', value:Number(b&&b.amount)||0}]; }
function fmtBooking(b){
  const items=bookingItems(b); const total=items.reduce((s,i)=>s+(Number(i.value)||0),0);
  if(items.length===1 && (items[0].kind==='نقدي'||!items[0].kind)) return fmtMoney(total);
  const parts=items.map(i=>`${escapeHtml(i.kind||'نقدي')} ${fmtMoney(Number(i.value)||0)}`);
  return `${parts.join(' + ')} = ${fmtMoney(total)}`;
}
function contribKindOptions(sel){ return CONTRIB_KINDS.map(k=>`<option value="${k}"${k===sel?' selected':''}>${k}</option>`).join(''); }
function miqatReceived(mq){ return (mq.bookings||[]).reduce((s,b)=>s+bookingReceived(b),0); }
function bookingReceived(b){ if(b && Array.isArray(b.payments)) return b.payments.reduce((s,p)=>s+(Number(p.amount)||0),0); return Number(b&&b.amount)||0; }
/* المبلغ الفعّال للمساهمة: المستلَم إن سُجِّل، وإلا المتّفق عليه */
function bookingHasReceipt(b){ return b && b.received!=null && b.received!==''; }
function bookingEffective(b){ return bookingHasReceipt(b) ? (Number(b.received)||0) : bookingAgreed(b); }
function miqatEffective(mq){ return (mq.bookings||[]).reduce((s,b)=>s+bookingEffective(b),0); }
function miqatStatus(mq){
  const eff = miqatEffective(mq); const req = Number(mq.requiredAmount)||0;
  if (eff <= 0) return 'red';
  if (req > 0 && eff < req) return 'yellow';
  return 'green';
}
const STATUS_LABEL = { green:'اكتمل الحجز', yellow:'يحتاج تعزيز', red:'غير محجوز' };

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
  try { const ph=await storage.get('photos'); if(ph) photos=JSON.parse(ph); } catch(e){ photos=[]; }
  try { uiDark = (await storage.get('ui_dark'))==='1'; } catch(e){ uiDark=false; }
}
async function saveMembers(){ try{ await storage.set('members',JSON.stringify(members)); }catch(e){ toast('تعذر الحفظ'); } }
async function saveMiqats(){ try{ await storage.set('miqats',JSON.stringify(miqats)); }catch(e){ toast('تعذر الحفظ'); } }
async function saveNews(){ try{ await storage.set('news',JSON.stringify(news)); }catch(e){} }
async function persistSettings(){ try{ await storage.set('settings',JSON.stringify(settings)); }catch(e){} }
async function saveMeetings(){ try{ await storage.set('meetings',JSON.stringify(meetings)); }catch(e){ toast('تعذر حفظ الاجتماع'); } }
async function saveAssemblies(){ try{ await storage.set('assemblies',JSON.stringify(assemblies)); }catch(e){ toast('تعذر حفظ الجمعية'); } }
async function savePhotos(){ try{ await storage.set('photos',JSON.stringify(photos)); }catch(e){ toast('تعذّر حفظ الصور'); } }

/* ═══════════ ألبوم الصور (اللجنة الإعلامية) ═══════════ */
let albumPhotoData=null;
function renderAlbum(){
  const grid=$('#albumGrid'); const cnt=$('#albumCount');
  if(cnt) cnt.textContent=`${photos.length} صورة`;
  if(!grid) return;
  if(!photos.length){ grid.innerHTML=`<div class="album-empty">لا توجد صور بعد. اضغط «➕ إضافة صورة» لإضافة أول صورة.</div>`; return; }
  const ordered=[...photos].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  grid.innerHTML=ordered.map(p=>`<div class="album-card" onclick="openLightbox('${p.id}')">
    <img class="ac-img" src="${p.img}" alt="${escapeHtml(p.occasion||'')}" loading="lazy">
    <div class="ac-body">
      <div class="ac-occ">${escapeHtml(p.occasion||'بدون عنوان')}</div>
      ${p.photographer?`<div class="ac-by">📷 ${escapeHtml(p.photographer)}</div>`:''}
      ${p.desc?`<div class="ac-desc">${escapeHtml(p.desc)}</div>`:''}
    </div>
  </div>`).join('');
}
function openAddPhoto(){
  albumPhotoData=null;
  $('#albumPhotoPreview').innerHTML='🖼️';
  $('#albumOccasion').value=''; $('#albumPhotographer').value=''; $('#albumDesc').value='';
  $('#addPhotoModal').classList.add('open');
}
async function handleAlbumPhotoSelect(e){
  const file=e.target.files[0]; if(!file) return;
  if(file.size>15*1024*1024){ toast('الصورة كبيرة جداً (أقل من 15 ميجا)'); return; }
  try{ albumPhotoData=await processPhoto(file, 1000, .78); $('#albumPhotoPreview').innerHTML=`<img src="${albumPhotoData}" alt="" />`; }
  catch(err){ toast('تعذّرت معالجة الصورة'); }
}
async function saveAlbumPhoto(){
  if(!albumPhotoData){ toast('اختر صورة أولاً'); return; }
  const occasion=$('#albumOccasion').value.trim();
  const photographer=$('#albumPhotographer').value.trim();
  const desc=$('#albumDesc').value.trim();
  photos.push({ id:'p_'+Date.now(), img:albumPhotoData, occasion, photographer, desc, date:new Date().toISOString() });
  await savePhotos();
  albumPhotoData=null;
  closeModal('addPhotoModal'); toast('تمت إضافة الصورة');
  renderAlbum(); renderPhotoCarousel();
}
function openLightbox(id){
  const p=photos.find(x=>x.id===id); if(!p) return;
  $('#lightboxImg').innerHTML=`<img src="${p.img}" alt="">`;
  $('#lightboxOccasion').textContent=p.occasion||'بدون عنوان';
  $('#lightboxBy').textContent=p.photographer?('📷 '+p.photographer):'';
  $('#lightboxDesc').textContent=p.desc||'';
  $('#lightboxDel').onclick=()=>deletePhoto(id);
  $('#photoLightbox').classList.add('open');
}
async function deletePhoto(id){
  if(!confirm('حذف هذه الصورة؟')) return;
  photos=photos.filter(p=>p.id!==id);
  await savePhotos();
  closeModal('photoLightbox');
  renderAlbum(); renderPhotoCarousel();
  toast('تم حذف الصورة');
}
/* كاروسيل الصور في الرئيسية — ترتيب عشوائي وحركة آلية */
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function renderPhotoCarousel(){
  const panel=$('#photoCarouselPanel'); const box=$('#photoCarousel');
  if(!panel||!box) return;
  if(!photos.length){ panel.style.display='none'; if(box.__marqStop){box.__marqStop();box.__marqStop=null;} return; }
  panel.style.display='block';
  buildPhotoSlider(box, shuffle(photos));
}
/* عارض انزلاق جانبي بنقاط + تحكّم لمسي (سحب) + تقدّم آلي */
function buildPhotoSlider(container, list){
  if(container.__marqStop){ container.__marqStop(); container.__marqStop=null; }
  const n=list.length;
  const slide=p=>`<div class="ps-slide" data-id="${p.id}">
      <img src="${p.img}" alt="${escapeHtml(p.occasion||'')}" loading="lazy">
      <div class="pc-cap"><div class="t">${escapeHtml(p.occasion||'')}</div>${p.photographer?`<div class="b">📷 ${escapeHtml(p.photographer)}</div>`:''}</div>
    </div>`;
  // نسخة من الأولى في النهاية لالتفاف سلس
  const slidesHTML = list.map(slide).join('') + (n>1?slide(list[0]):'');
  const dotsHTML = n>1 ? `<div class="ps-dots">${list.map((_,i)=>`<i class="${i===0?'on':''}" data-i="${i}"></i>`).join('')}</div>` : '';
  container.innerHTML=`<div class="pc-slider"><div class="ps-viewport"><div class="ps-track">${slidesHTML}</div></div>${dotsHTML}</div>`;
  const track=container.querySelector('.ps-track');
  const dots=[...container.querySelectorAll('.ps-dots i')];
  const reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i=0, timer=null, dragging=false, moved=false, startX=0, w=1;

  const setDots=()=>{ const a=((i%n)+n)%n; dots.forEach((d,k)=>d.classList.toggle('on',k===a)); };
  const place=(anim)=>{ track.style.transition=anim?'transform .55s cubic-bezier(.55,.02,.2,1)':'none'; track.style.transform=`translateX(${-i*w}px)`; };
  const measure=()=>{ w=container.querySelector('.ps-viewport').clientWidth||container.clientWidth||300; place(false); };

  track.addEventListener('transitionend',()=>{ // التفاف بعد النسخة
    if(i>=n){ i=0; place(false); } setDots();
  });
  const go=(to,anim=true)=>{ i=to; place(anim); setDots(); };
  const next=()=>{ if(n<2) return; go(i+1); };

  const start=()=>{ if(n<2||reduce) return; stop(); timer=setInterval(()=>{ if(!dragging) next(); }, 3000); };
  const stop=()=>{ if(timer){ clearInterval(timer); timer=null; } };

  // تحكّم بالسحب (لمس/ماوس)
  const vp=container.querySelector('.ps-viewport');
  vp.addEventListener('pointerdown',e=>{ dragging=true; moved=false; startX=e.clientX; stop();
    if(i>=n){ i=0; place(false); } track.style.transition='none'; try{vp.setPointerCapture(e.pointerId);}catch(_){} });
  vp.addEventListener('pointermove',e=>{ if(!dragging) return; const dx=e.clientX-startX; if(Math.abs(dx)>4) moved=true;
    track.style.transform=`translateX(${-i*w+dx}px)`; });
  const release=e=>{ if(!dragging) return; dragging=false; const dx=(e.clientX||startX)-startX;
    const th=Math.max(40,w*0.18);
    if(dx<=-th) go(Math.min(i+1,n)); else if(dx>=th) go(i-1<0?0:i-1); else place(true);
    if(i<0){ i=0; place(true); }
    setTimeout(start,1500); };
  vp.addEventListener('pointerup',release); vp.addEventListener('pointercancel',release);
  // نقرة (بدون سحب) تفتح الصورة المعروضة حالياً
  vp.addEventListener('click',e=>{ if(moved){ e.preventDefault(); e.stopPropagation(); moved=false; return; }
    const cur=list[((i%n)+n)%n]; if(cur&&cur.id) openLightbox(cur.id); });
  // نقاط
  dots.forEach(d=>d.addEventListener('click',()=>{ stop(); go(+d.dataset.i); setTimeout(start,1500); }));

  requestAnimationFrame(()=>{ measure(); setDots(); start(); });
  const onResize=()=>measure(); window.addEventListener('resize',onResize);
  container.__marqStop=()=>{ stop(); window.removeEventListener('resize',onResize); };
}

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

/* ═══════════ Notifications ═══════════ */
function openNotifications(){
  $$('.tab[data-tab]').forEach(x=>x.classList.remove('active'));
  $$('.tab-content').forEach(c=>c.style.display='none');
  $('#tab-notifications').style.display='block';
  renderNotifications();
  requestBadgePermission();
  window.scrollTo({top:0,behavior:'smooth'});
}

let currentMemberPageId=null, currentMiqatPageId=null;
/* فتح صفحة تبويب كاملة (بلا زر في الشريط) */
function openFullPage(name){
  $$('.tab[data-tab]').forEach(x=>x.classList.remove('active'));
  $$('.tab-content').forEach(c=>c.style.display='none');
  const el=$('#tab-'+name); if(el) el.style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}
function isFullPageOpen(name){ const e=$('#tab-'+name); return !!(e && e.style.display==='block'); }

/* ── طباعة ملف العضو PDF ── */
function printMemberProfile(id){
  const m=members.find(x=>x.id===id); if(!m) return;
  const active=isActive(m); const mms=memberMiqats(m);
  const row=(k,v)=>v?`<tr><th>${k}</th><td>${v}</td></tr>`:'';
  const miq = mms.length ? `<h2>المواقيت والمساهمات</h2><table class="tb"><tr><th>الميقات</th><th>التاريخ</th><th>المساهمة</th></tr>
    ${mms.map(mq=>{const b=(mq.bookings||[]).find(x=>x.memberId===m.id);
      return `<tr><td>${escapeHtml(mq.name)}</td><td>${fmtMiqatDate(mq)}</td><td>${b?fmtMoney(bookingAgreed(b)):'—'}</td></tr>`;}).join('')}</table>` : '';
  const pays = memberPayments(m);
  const inst = pays.length ? `<h2>دفعات العضوية</h2><table class="tb"><tr><th>#</th><th>التاريخ</th><th>المبلغ</th></tr>
    ${pays.map((p,i)=>`<tr><td>${i+1}</td><td>${fmtDate(p.date)}</td><td>${fmtMoney(p.amount)}</td></tr>`).join('')}
    <tr class="sum"><td colspan="2">الإجمالي المدفوع</td><td>${fmtMoney(memberPaid(m))}</td></tr></table>` : '';
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>ملف العضو — ${escapeHtml(m.name)}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>
  *{box-sizing:border-box;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:250px;max-height:88px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:8px;}
  .doc-title{text-align:center;font-family:'Amiri',serif;font-size:24px;font-weight:700;color:#1c4536;margin:12px 0 2px;}
  .doc-sub{text-align:center;color:#8a7c6b;font-size:14px;margin-bottom:24px;}
  h2{font-size:17px;color:#fff;background:#1c4536;display:inline-block;padding:6px 16px 6px 20px;border-radius:0 18px 18px 0;margin:26px 0 12px;}
  table{width:100%;border-collapse:collapse;font-size:14.5px;}
  th,td{border:1px solid #e6ddcb;padding:9px 12px;text-align:right;}
  th{background:#f6f2ea;color:#3a473f;font-weight:600;width:34%;}
  .tb th{background:#1c4536;color:#fff;width:auto;}
  .tb tr:nth-child(even){background:#faf7f0;}
  .tb .sum td{background:#e6f0ea;font-weight:700;}
  .badge{display:inline-block;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:700;}
  .on{background:#e6f3ea;color:#2f8f5b;} .off{background:#f6e6e6;color:#b85c5c;}
  .foot{margin-top:36px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;}}
  ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">ملف العضو</div>
    <div class="doc-sub">${escapeHtml(m.name)} · ${memberCode(m)} · ${hijriToday()}</div></div>
  <h2>البيانات الأساسية</h2>
  <table>
    ${row('الاسم الكامل', escapeHtml(m.name))}
    ${row('رقم العضوية', memberCode(m))}
    ${row('نوع العضوية', m.type)}
    ${row('الحالة', `<span class="badge ${active?'on':'off'}">${active?'مفعّلة':'غير مفعّلة'}</span>`)}
    ${row('الهاتف', m.phone)}
    ${m.isMinor&&m.birthdate?row('تاريخ الميلاد', fmtDate(m.birthdate)):''}
    ${m.isMinor&&m.age!=null?row('العمر', m.age):''}
    ${row('المنطقة', m.area)}
    ${row('البريد الإلكتروني', m.email)}
    ${row('العنوان', m.address)}
    ${m.isAdmin?row('اللجنة', m.committee||'—'):''}
    ${row('تاريخ التسجيل', fmtDate(m.joinDate))}
    ${m.paymentDate?row('بداية العضوية', fmtHijriStart(m)):''}
    ${m.paymentDate?row('انتهاء العضوية', fmtHijriEnd(m)):''}
  </table>
  ${inst}
  ${miq}
  <div class="foot">هيئة محبي الحسين (ع) — وثيقة رسمية</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* ── طباعة تفاصيل الميقات PDF ── */
function printMiqatPDF(id){
  const mq=miqats.find(x=>x.id===id); if(!mq) return;
  const st=miqatStatus(mq), paid=miqatPaid(mq), req=Number(mq.requiredAmount)||0;
  const rows=(mq.bookings||[]).map((b,i)=>{
    const ag=bookingAgreed(b), pd=bookingPaid(b), rm=bookingRemaining(b);
    return `<tr><td>${i+1}</td><td>${escapeHtml(bookingName(b))}${b.familyName?' (عائلة)':''}</td><td>${fmtMoney(ag)}</td><td>${fmtMoney(pd)}</td><td>${rm>0?fmtMoney(rm):'—'}</td></tr>`;
  }).join('');
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>تفاصيل الميقات — ${escapeHtml(mq.name)}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>
  *{box-sizing:border-box;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:250px;max-height:88px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:8px;}
  .doc-title{text-align:center;font-family:'Amiri',serif;font-size:24px;font-weight:700;color:#1c4536;margin:12px 0 2px;}
  .doc-sub{text-align:center;color:#8a7c6b;font-size:14px;margin-bottom:24px;}
  h2{font-size:17px;color:#fff;background:#1c4536;display:inline-block;padding:6px 16px 6px 20px;border-radius:0 18px 18px 0;margin:26px 0 12px;}
  table{width:100%;border-collapse:collapse;font-size:14.5px;}
  th,td{border:1px solid #e6ddcb;padding:9px 12px;text-align:right;}
  th{background:#f6f2ea;color:#3a473f;font-weight:600;width:34%;}
  .tb th{background:#1c4536;color:#fff;width:auto;}
  .tb tr:nth-child(even){background:#faf7f0;}
  .badge{display:inline-block;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:700;}
  .g{background:#e6f3ea;color:#2f8f5b;} .y{background:#f6ecdf;color:#b5763a;} .r{background:#f6e6e6;color:#b85c5c;}
  .foot{margin-top:36px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;}}
  ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">تفاصيل الميقات</div>
    <div class="doc-sub">${escapeHtml(mq.name)} · ${hijriToday()}</div></div>
  <h2>بيانات الميقات</h2>
  <table>
    <tr><th>اسم الميقات</th><td>${escapeHtml(mq.name)}</td></tr>
    <tr><th>التاريخ الهجري</th><td>${fmtMiqatDate(mq)}</td></tr>
    <tr><th>الموافق ميلادياً</th><td>${miqatGregText(mq)}</td></tr>
    <tr><th>المبلغ المطلوب</th><td>${fmtMoney(req)}</td></tr>
    <tr><th>المتّفق عليه</th><td>${fmtMoney(miqatAgreed(mq))}</td></tr>
    <tr><th>المُحصّل فعلاً</th><td>${fmtMoney(paid)}</td></tr>
    <tr><th>المتبقّي تحصيله</th><td>${fmtMoney(Math.max(0,req-paid))}</td></tr>
    <tr><th>عدد المشاركين</th><td>${(mq.bookings||[]).length}</td></tr>
    <tr><th>الحالة</th><td><span class="badge ${st==='green'?'g':(st==='yellow'?'y':'r')}">${STATUS_LABEL[st]}</span></td></tr>
  </table>
  <h2>المشاركون ومساهماتهم</h2>
  ${rows?`<table class="tb"><tr><th>#</th><th>المساهم</th><th>المتّفق عليه</th><th>المدفوع</th><th>المتبقّي</th></tr>${rows}</table>`
        :'<p style="color:#8a7c6b">لا يوجد مشاركون بعد.</p>'}
  <div class="foot">هيئة محبي الحسين (ع) — وثيقة رسمية</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* حساب كل الإشعارات - ترجع مصفوفة مصنّفة */
function computeNotifications(){
  const list=[]; const h=hijriParts(); const curM=h.month; const curD=h.day; const curY=parseInt(h.year,10)||1448;
  const todayG=new Date(); todayG.setHours(0,0,0,0);

  // 1) تجديد العضويات - قبل محرم بشهرين (ذو القعدة/ذو الحجة = شهر 10 و 11)
  if(curM===10||curM===11){
    const needRenew=members.filter(m=>m.paymentDate && memberEndYear(m)<=curY+ (curM>=10?1:0));
    const activeCount=members.filter(m=>isActive(m)).length;
    list.push({ cat:'تجديد العضويات', type:'warn', ic:'⏳',
      title:'موسم تجديد العضويات قريب',
      desc:`تبدأ العضويات الجديدة في محرم ${curY+1}. راجع الأعضاء الذين يحتاجون تجديد اشتراكهم.`,
      meta:`${activeCount} عضو نشط حالياً`, action:()=>switchTab('members') });
  }

  // 2) الاجتماعات القادمة - قبل يومين + يوم الاجتماع
  (meetings||[]).forEach(mt=>{
    if(!mt.datetime) return;
    const dt=new Date(mt.datetime); if(isNaN(dt)) return;
    const dOnly=new Date(dt); dOnly.setHours(0,0,0,0);
    const days=Math.round((dOnly-todayG)/86400000);
    if(days===0){ list.push({ cat:'الاجتماعات', type:'urgent', ic:'📋', title:'اجتماع اليوم', desc:`لديك اجتماع «${escapeHtml(mt.title||'مجلس الإدارة')}» اليوم${mt.committee?' — '+escapeHtml(mt.committee):''}.`, meta:fmtMeetingDT(mt.datetime), action:()=>switchTab('meetings') }); }
    else if(days>0 && days<=2){ list.push({ cat:'الاجتماعات', type:'info', ic:'📋', title:`اجتماع بعد ${days===1?'يوم واحد':'يومين'}`, desc:`«${escapeHtml(mt.title||'مجلس الإدارة')}»${mt.committee?' — '+escapeHtml(mt.committee):''}.`, meta:fmtMeetingDT(mt.datetime), action:()=>switchTab('meetings') }); }
  });

  // 3) الأقساط المستحقة - قبل موعدها بـ 10 أيام
  members.forEach(m=>{
    // أقساط العضوية
    collectDueInstallments(m).forEach(due=>{
      list.push({ cat:'الأقساط المستحقة', type: due.days<=0?'urgent':'warn', ic:'💰',
        title: due.days<=0?`قسط مستحق الآن — ${escapeHtml(m.name)}`:`قسط بعد ${due.days} يوم — ${escapeHtml(m.name)}`,
        desc: due.label,
        meta: `${due.hijriText} · الموافق ${due.gregText}`,
        action:()=>showDetail(m.id) });
    });
  });

  // 4) مواقيت اليوم - في نفس يوم الميقات
  miqats.forEach(mq=>{
    if(mq.month===curM && mq.day===curD){
      list.push({ cat:'مواقيت اليوم', type:'info', ic:'🗓️',
        title:`اليوم مناسبة: ${mq.day} ${HIJRI_MONTHS[mq.month]}`,
        desc:`«${escapeHtml(mq.name)}» — تُقام اليوم.`,
        meta: `${(mq.bookings||[]).length} مساهمة`, action:()=>switchTab('miqats') });
    }
  });

  // 5) أعضاء لم يُذكّروا بمواقيتهم القريبة
  const notReminded=[];
  members.forEach(m=>{
    upcomingMemberMiqats(m).forEach(mq=>{
      if(!isMiqatReminded(m,mq)) notReminded.push({m,mq});
    });
  });
  if(notReminded.length){
    // نجمّعها حسب الميقات
    const byMiqat={};
    notReminded.forEach(({m,mq})=>{ (byMiqat[mq.id]=byMiqat[mq.id]||{mq,members:[]}).members.push(m); });
    Object.values(byMiqat).forEach(g=>{
      list.push({ cat:'تذكيرات لم تُرسل', type:'warn', ic:'🔔',
        title:`${g.members.length} عضو لم تُذكّرهم بـ «${escapeHtml(g.mq.name)}»`,
        desc:`الميقات قريب. ادخل ملف كل عضو لإرسال التذكير عبر واتساب.`,
        meta:`${fmtMiqatDate(g.mq)}`, action:()=>switchTab('members') });
    });
  }

  return list;
}

/* جمع أقساط العضو المستحقة (لها تاريخ استحقاق مجدول ضمن 10 أيام أو فات) */
function collectDueInstallments(m){
  const out=[]; const todayG=new Date(); todayG.setHours(0,0,0,0);
  // العضوية
  if(memberRemaining(m)>0 && Array.isArray(m.dueSchedule)){
    m.dueSchedule.forEach(d=>{
      if(d.paid) return;
      const g=hijriToGregorian(d.day,d.month,d.year); if(!g) return;
      const gd=new Date(g); gd.setHours(0,0,0,0);
      const days=Math.round((gd-todayG)/86400000);
      if(days<=10){ out.push({ days, label:`قسط عضوية مجدول${d.amount?` بمبلغ ${fmtMoney(d.amount)}`:''}`, hijriText:`${d.day} ${HIJRI_MONTHS[d.month]} ${d.year} هـ`, gregText:fmtDate(g) }); }
    });
  }
  // مساهمات المواقيت
  miqats.forEach(mq=>{
    (mq.bookings||[]).forEach(b=>{
      if(b.memberId!==m.id) return;
      if(!Array.isArray(b.dueSchedule)) return;
      if(bookingRemaining(b)<=0) return;
      b.dueSchedule.forEach(d=>{
        if(d.paid) return;
        const g=hijriToGregorian(d.day,d.month,d.year); if(!g) return;
        const gd=new Date(g); gd.setHours(0,0,0,0);
        const days=Math.round((gd-todayG)/86400000);
        if(days<=10){ out.push({ days, label:`قسط مساهمة «${escapeHtml(mq.name)}»${d.amount?` بمبلغ ${fmtMoney(d.amount)}`:''}`, hijriText:`${d.day} ${HIJRI_MONTHS[d.month]} ${d.year} هـ`, gregText:fmtDate(g) }); }
      });
    });
  });
  return out;
}

/* عرض قائمة الإشعارات في التبويب */
function renderNotifications(){
  const list=computeNotifications();
  const el=$('#notifList'); const sub=$('#notifSub');
  if(sub) sub.textContent = list.length?`لديك ${list.length} تنبيه`:'كل شيء تحت السيطرة';
  if(!list.length){ el.innerHTML=`<div class="notif-empty"><div class="big">✅</div><div>لا توجد تنبيهات حالياً</div></div>`; return; }
  // ترتيب: urgent أولاً ثم warn ثم info
  const order={urgent:0,warn:1,info:2,ok:3};
  list.sort((a,b)=>(order[a.type]??9)-(order[b.type]??9));
  // تجميع حسب الفئة
  const groups={};
  list.forEach((n,i)=>{ (groups[n.cat]=groups[n.cat]||[]).push({...n,_i:i}); });
  window.__notifActions=list.map(n=>n.action);
  el.innerHTML=Object.entries(groups).map(([cat,items])=>`
    <div class="notif-group">
      <div class="notif-group-title">${cat} <span style="color:var(--muted-2)">(${items.length})</span></div>
      ${items.map(n=>`<div class="notif-item ${n.type}" onclick="(window.__notifActions[${n._i}]||function(){})()">
        <div class="notif-ic">${n.ic}</div>
        <div class="notif-body">
          <div class="notif-title">${n.title}</div>
          <div class="notif-desc">${n.desc}</div>
          ${n.meta?`<div class="notif-meta">${n.meta}</div>`:''}
        </div>
      </div>`).join('')}
    </div>`).join('');
}

/* تحديث عدّاد الجرس */
function updateNotifBadge(){
  const n=computeNotifications().length;
  const b=$('#notifBadge');
  if(b){ if(n>0){ b.textContent=n>99?'99+':n; b.style.display='flex'; } else b.style.display='none'; }
  syncAppBadge(n);
}

/* شارة العدد فوق أيقونة البرنامج على الشاشة الرئيسية (PWA) */
async function syncAppBadge(count){
  try{
    if(!('setAppBadge' in navigator)) return;
    const n = (typeof count==='number') ? count : computeNotifications().length;
    if(n>0) await navigator.setAppBadge(n); else await navigator.clearAppBadge();
  }catch(e){}
}
/* طلب إذن الإشعارات (مطلوب لإظهار الشارة على الأيقونة) */
async function requestBadgePermission(){
  try{
    if(!('Notification' in window)) return;
    if(Notification.permission==='default') await Notification.requestPermission();
    syncAppBadge();
  }catch(e){}
}
/* تحديث الشارة عند الخروج من التطبيق ليبقى الرقم صحيحاً على الأيقونة */
document.addEventListener('visibilitychange',()=>{ if(document.hidden) syncAppBadge(); });

/* ═══════════ Dashboard ═══════════ */
function renderDashboard(){
  const total=members.length, active=members.filter(isActive).length;
  $('#statTotal').textContent=total; $('#statActive').textContent=active; $('#statInactive').textContent=total-active;
  renderPhotoCarousel(); renderNews(); renderRecentMembers(); renderDues(); updateNotifBadge(); $('#globalSearch').value=''; $('#searchResults').innerHTML='';
}

/* آخر 5 عضويات مضافة - كرت متحرك */
function renderRecentMembers(){
  const panel=$('#recentMembersPanel'); const box=$('#recentMembersCarousel');
  if(!panel||!box) return;
  const h=hijriParts(); const cur=h.month; const curYear=parseInt(h.year,10)||0;
  // اجمع صفاً لكل حجز (عضو أو عائلة) قريب خلال الشهرين القادمين
  let rows=[];
  (miqats||[]).forEach(mq=>{
    let diff=(mq.month-cur+12)%12;
    if(diff===0 && mq.day < h.day) return;
    if(diff>2) return;
    let daysLeft = Math.round(diff*29.5 + (mq.day - h.day)); if(daysLeft<0) daysLeft=0;
    (mq.bookings||[]).forEach(b=>{
      if(b.familyName){ rows.push({kind:'family', b, mq, diff, daysLeft}); }
      else { const m=members.find(x=>x.id===b.memberId); if(m) rows.push({kind:'member', m, b, mq, diff, daysLeft}); }
    });
  });
  if(!rows.length){ panel.style.display='none'; return; }
  panel.style.display='block';
  rows.sort((a,b)=> a.daysLeft - b.daysLeft);

  const MAXD=60; // مدى شريط التقدّم (شهران)
  box.innerHTML = rows.map((row)=>{
    const {mq,diff,daysLeft,kind}=row;
    const cls = daysLeft<=7 ? 'near' : (diff===0 ? 'soon' : (diff===1 ? 'soon' : 'far'));
    const pct = Math.max(6, Math.min(100, Math.round((MAXD-daysLeft)/MAXD*100)));
    const whenTxt = diff===0 ? 'هذا الشهر' : (diff===1 ? 'الشهر القادم' : 'بعد شهرين');
    const leftTxt = daysLeft<=0 ? 'اليوم' : (daysLeft===1 ? 'باقٍ يوم' : `باقٍ ${daysLeft} يوماً`);
    if(kind==='family'){
      const b=row.b;
      const reminded = b.remindKey===miqatRemindKey(mq);
      const rc = bookingHasReceipt(b)?'on':'';
      return `<div class="mq-card ${cls}">
        <div class="mq-top">
          <div class="mq-av">👪</div>
          <div class="mq-mid" onclick="openFamilyList()">
            <div class="mq-name">${escapeHtml(b.familyName)} <span class="code">عائلة</span></div>
            <div class="mq-line">${escapeHtml(mq.name)} <span class="dt">· ${fmtMiqatDate(mq)}</span></div>
          </div>
        </div>
        <div class="mq-bar"><span style="width:${pct}%"></span></div>
        <div class="mq-foot"><span>${whenTxt}</span><b>${leftTxt}</b></div>
        <div class="mq-actions">
          <button class="mq-wa ${reminded?'done':''}" onclick="sendFamilyMiqatReminder('${mq.id}','${b.memberId}')">${reminded?'✓ ذُكّر الممثّل':'✆ تذكير'}</button>
          <button class="mq-rcv ${rc}" onclick="openReceipt('${mq.id}','${b.memberId}')">${receiptBtnLabel(b)}</button>
        </div>
      </div>`;
    }
    const m=row.m;
    const reminded = isMiqatReminded(m,mq);
    const av = m.photo ? `<img src="${m.photo}" alt="">` : escapeHtml((m.name||'؟').trim().charAt(0));
    const rc = bookingHasReceipt(row.b)?'on':'';
    return `<div class="mq-card ${cls}">
      <div class="mq-top">
        <div class="mq-av" onclick="showDetail('${m.id}')">${av}</div>
        <div class="mq-mid" onclick="showDetail('${m.id}')">
          <div class="mq-name">${escapeHtml(m.name)} <span class="code">${memberCode(m)}</span></div>
          <div class="mq-line">${escapeHtml(mq.name)} <span class="dt">· ${fmtMiqatDate(mq)}</span></div>
        </div>
      </div>
      <div class="mq-bar"><span style="width:${pct}%"></span></div>
      <div class="mq-foot"><span>${whenTxt}</span><b>${leftTxt}</b></div>
      <div class="mq-actions">
        <button class="mq-wa ${reminded?'done':''}" onclick="sendMiqatReminder('${m.id}','${mq.id}')">${reminded?'✓ ذُكّر':'✆ تذكير'}</button>
        <button class="mq-rcv ${rc}" onclick="openReceipt('${mq.id}','${row.b.memberId}')">${receiptBtnLabel(row.b)}</button>
      </div>
    </div>`;
  }).join('');
}
function receiptBtnLabel(b){ return bookingHasReceipt(b) ? `✓ استُلم ${fmtMoney(Number(b.received)||0)}` : '💵 استلام المبلغ'; }

/* ═══ نافذة استلام المبلغ (مستقلة عن الأقساط) ═══ */
let receiptCtx=null;
function openReceipt(miqatId, memberId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  receiptCtx={miqatId, memberId};
  const who = b.familyName ? `${b.familyName}${b.repName?` (ممثّلها ${b.repName})`:''}` : (members.find(x=>x.id===memberId)?.name||'');
  $('#receiptSub').textContent = `${who} · ${mq.name}`;
  $('#receiptAgreed').innerHTML = `المتّفق عليه: <b>${fmtMoney(bookingAgreed(b))}</b>` + (mq.requiredAmount?` · سعر الميقات: <b>${fmtMoney(mq.requiredAmount)}</b>`:'');
  $('#receiptAmount').value = bookingHasReceipt(b) ? (Number(b.received)||0) : '';
  $('#receiptNote').value = b.receivedNote||'';
  $('#receiptClearBtn').style.display = bookingHasReceipt(b) ? 'inline-flex' : 'none';
  $('#receiptModal').classList.add('open');
}
async function saveReceipt(){
  if(!receiptCtx) return; const {miqatId, memberId}=receiptCtx;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  const amt=parseFloat($('#receiptAmount').value);
  if(isNaN(amt)||amt<0){ toast('أدخل المبلغ المستلَم'); return; }
  b.received=amt; b.receivedNote=($('#receiptNote').value||'').trim(); b.receivedDate=today();
  await saveMiqats(); closeModal('receiptModal');
  toast('تم تسجيل الاستلام');
  renderMiqats(); renderDashboard();
  if($('#tab-familyList')&&$('#tab-familyList').style.display!=='none') renderFamilyList();
  if(isFullPageOpen('memberpage')) showDetail(memberId);
}
async function clearReceipt(){
  if(!receiptCtx) return; const {miqatId, memberId}=receiptCtx;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  if(!confirm('إلغاء تسجيل الاستلام؟ سيُحسب المتّفق عليه بدلاً منه.')) return;
  delete b.received; delete b.receivedNote; delete b.receivedDate;
  await saveMiqats(); closeModal('receiptModal');
  toast('أُلغي الاستلام'); renderMiqats(); renderDashboard();
  if(isFullPageOpen('memberpage')) showDetail(memberId);
}

/* إرسال تذكير الميقات عبر واتساب بالرسالة الجاهزة */
function sendMiqatReminder(memberId, miqatId){
  const m=members.find(x=>x.id===memberId); const mq=miqats.find(x=>x.id===miqatId);
  if(!m||!mq) return;
  const h=hijriParts(); let diff=(mq.month-h.month+12)%12;
  const when = diff===0?'هذا الشهر':(diff===1?'الشهر القادم':'خلال شهرين');
  const msg=`السلام عليكم\n\nالعضو ${m.name}،\nنذكّركم بقرب ميقات \n\n*${mq.name}* \nبتاريخ ${miqatHijriFull(mq)} \nالموافق ${miqatGregText(mq)} ${when}☝🏼\n\nنسألكم الحضور والمشاركة.\nبارك الله فيكم — هيئة محبي الحسين\n\n⭕️ *ملاحظة*\nتم توليد هذه الرسالة بالذكاء الاصطناعي`;
  markReminded(memberId, miqatId);
  window.open(whatsappLink(m.phone, msg), '_blank');
  setTimeout(renderRecentMembers, 400);
}

/* تحويل تاريخ الميقات الهجري (يوم/شهر) إلى ميلادي حسب تقويم أم القرى */
function hijriToGregorian(hDay, hMonth0, hYear){
  const fmt=new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{day:'numeric',month:'numeric',year:'numeric'});
  const h=hijriParts(); const curY=parseInt(h.year,10)||hYear;
  const approxDays=(hYear-curY)*354.367 + (hMonth0-h.month)*29.53 + (hDay-h.day);
  const base=new Date(Date.now()+Math.round(approxDays)*86400000);
  for(let off=-5; off<=5; off++){
    const cand=new Date(base.getTime()+off*86400000);
    const p=fmt.formatToParts(cand);
    const d=+p.find(x=>x.type==='day').value, mo=+p.find(x=>x.type==='month').value-1, y=+p.find(x=>x.type==='year').value.replace(/\D/g,'');
    if(d===hDay && mo===hMonth0 && y===hYear) return cand;
  }
  return base;
}
function miqatTargetHijriYear(mq){ const h=hijriParts(); const curY=parseInt(h.year,10)||1448;
  return (mq.month < h.month || (mq.month===h.month && mq.day < h.day)) ? curY+1 : curY; }
/* نص التاريخ الميلادي الموافق لتاريخ الميقات */
function miqatGregText(mq){ const ty=miqatTargetHijriYear(mq); const g=hijriToGregorian(mq.day,mq.month,ty);
  return g?g.toLocaleDateString('ar',{day:'numeric',month:'long',year:'numeric'}):''; }
/* نص التاريخ الهجري الكامل للميقات (مع السنة) */
function miqatHijriFull(mq){ const ty=miqatTargetHijriYear(mq); return `${mq.day} ${HIJRI_MONTHS[mq.month]} ${ty} هـ`; }
/* تذكير العائلة بالمساهمة في ميقات (نص مخصّص + تاريخ ميلادي) */
function sendFamilyMiqatReminder(miqatId, memberId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  const ty=miqatTargetHijriYear(mq);
  const greg=hijriToGregorian(mq.day, mq.month, ty);
  const gregText=greg.toLocaleDateString('ar',{day:'numeric',month:'long',year:'numeric'});
  const hijriText=`${mq.day} ${HIJRI_MONTHS[mq.month]} ${ty}هـ`;
  const msg=`السلام عليكم\n\nبصفتكم ممثل ${b.familyName}\nنذكّركم في المساهمة بميقات \n\n*${mq.name}* (${hijriText})\nالموافق ${gregText}\n\n\nجزاكم الله خيراً — هيئة محبي الحسين\n\n⭕️ *ملاحظة*\nتم توليد هذه الرسالة بالذكاء الاصطناعي`;
  b.remindKey=miqatRemindKey(mq); saveMiqats();
  window.open(whatsappLink(bookingPhone(b), msg), '_blank');
  setTimeout(renderRecentMembers, 400);
}

/* ═══ كاروسيل متحرك تلقائياً + قابل للإيقاف والسحب باللمس/الماوس ═══ */
function buildMarquee(container, itemsHTML, opts){
  if(!container) return;
  const axis = opts.axis;                 // 'x' أفقي (يمين↔يسار) | 'y' عمودي (أعلى↕أسفل)
  const speed = opts.speed || 40;         // بكسل/ثانية للحركة الآلية
  const vh = opts.height || 190;          // ارتفاع نافذة العمودي
  const trackClass = axis==='x' ? 'rc-track' : 'occ-track';

  // ألغِ أي حركة سابقة على نفس الحاوية (عند إعادة الرسم)
  if(container.__marqStop){ container.__marqStop(); container.__marqStop=null; }

  container.innerHTML = axis==='y'
    ? `<div class="occ-viewport"><div class="${trackClass}">${itemsHTML}</div></div>`
    : `<div class="${trackClass}">${itemsHTML}</div>`;
  const viewport = axis==='y' ? container.querySelector('.occ-viewport') : container;
  const track = container.querySelector('.'+trackClass);
  if(!track) return;
  if(axis==='y') viewport.style.height = vh+'px';

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  requestAnimationFrame(()=>{
    let one = axis==='x' ? track.scrollWidth : track.scrollHeight; // حجم نسخة واحدة
    if(one <= 0) return;
    const avail = axis==='x' ? (viewport.clientWidth||300) : vh;
    // كرّر العناصر حتى تملأ ضعف النافذة (لحركة سلسة ولإتاحة السحب)
    let reps = Math.min(40, Math.max(3, Math.ceil((avail*2)/one) + 2));
    track.innerHTML = new Array(reps).fill(itemsHTML).join('');
    one = (axis==='x' ? track.scrollWidth : track.scrollHeight) / reps; // حجم نسخة واحدة بعد التكرار

    let pos = 0, paused = false, dragging = false, moved = false;
    let startPt = 0, startPos = 0, lastT = 0, raf = 0;

    const apply = ()=>{ track.style.transform = axis==='x' ? `translateX(${-pos}px)` : `translateY(${-pos}px)`; };
    const wrap  = ()=>{ pos = ((pos % one) + one) % one; };  // إبقاء الإزاحة ضمن نسخة واحدة (تكرار غير محسوس)

    const frame = (t)=>{
      if(!lastT) lastT = t;
      const dt = (t - lastT)/1000; lastT = t;
      if(!paused && !dragging && !reduce){ pos += speed*dt; wrap(); apply(); }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // إيقاف مؤقت عند مرور مؤشر الماوس (سطح المكتب)
    track.addEventListener('mouseenter', ()=>{ paused = true; });
    track.addEventListener('mouseleave', ()=>{ if(!dragging) paused = false; });

    // السحب باللمس أو الماوس
    const down = (e)=>{
      dragging = true; moved = false; paused = true;
      startPt = axis==='x' ? e.clientX : e.clientY; startPos = pos;
      try{ track.setPointerCapture(e.pointerId); }catch(_){}
      track.style.cursor = 'grabbing';
    };
    const move = (e)=>{
      if(!dragging) return;
      const cur = axis==='x' ? e.clientX : e.clientY;
      const delta = cur - startPt;
      if(Math.abs(delta) > 4) moved = true;
      pos = startPos - delta; wrap(); apply();   // سحب لليمين/الأسفل يرجع، ولليسار/الأعلى يقدّم
    };
    const up = ()=>{
      if(!dragging) return;
      dragging = false; track.style.cursor = 'grab';
      setTimeout(()=>{ paused = false; }, 1000);  // استئناف الحركة بعد لحظة
    };
    track.addEventListener('pointerdown', down);
    track.addEventListener('pointermove', move);
    track.addEventListener('pointerup', up);
    track.addEventListener('pointercancel', up);

    // لا تفتح تفاصيل العنصر إن كان المستخدم يسحب (وليس ضغطة)
    track.addEventListener('click', (e)=>{ if(moved){ e.preventDefault(); e.stopPropagation(); moved=false; } }, true);

    container.__marqStop = ()=>{ cancelAnimationFrame(raf); };
  });
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
  miqats.forEach(mq=> occ.push({id:mq.id, name:mq.name, day:mq.day, month:mq.month}));
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
  const itemsHTML=withinTwo.slice(0,8).map(o=>{
    let diff=(o.month-cur+12)%12;
    const when = diff===0?'هذا الشهر':(diff===1?'الشهر القادم':'بعد شهرين');
    return `<div class="occasion-alert" onclick="showMiqatDetail('${o.id}')"><div class="oa-name">${escapeHtml(o.name)}</div>
      <div class="oa-meta">${o.day} ${HIJRI_MONTHS[o.month]} · ${when}</div></div>`;
  }).join('');
  buildMarquee(el, itemsHTML, {axis:'y', height:190, speed:30});
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
  const bookers=(mq.bookings||[]).map(b=>{
    const ag=bookingAgreed(b), pd=bookingPaid(b), rem=bookingRemaining(b);
    const fam=b.familyName?' 👪':'';
    const payLine = rem>0
      ? `<div class="bk-pay">مدفوع ${fmtMoney(pd)} من ${fmtMoney(ag)} · <span class="bk-rem">متبقّي ${fmtMoney(rem)}</span>
           <button class="bk-add" onclick="openBookingPayment('${mq.id}','${b.memberId}')">➕ دفعة</button></div>`
      : (ag>0?`<div class="bk-pay" style="color:var(--ok)">مدفوع بالكامل ✓</div>`:'');
    return `<li><span class="name">${escapeHtml(bookingName(b))}${fam} <span style="color:var(--muted)">${escapeHtml(bookingSubtitle(b))}</span><br><span style="font-size:12px;color:var(--muted)">${fmtBooking(b)}</span>${payLine}</span></li>`;
  }).join('');
  $('#miqatDetailTitle').textContent=mq.name;
  $('#miqatDetailSub').innerHTML=`${fmtMiqatDate(mq)} · <span class="badge mc-status st-${st}">${STATUS_LABEL[st]}</span>`;
  $('#miqatDetailContent').innerHTML=`
    <div class="detail-rows">
      ${detailRow('التاريخ الهجري', fmtMiqatDate(mq))}
      ${detailRow('المبلغ المطلوب', fmtMoney(req))}
      ${detailRow('المتّفق عليه', fmtMoney(miqatAgreed(mq)))}
      ${detailRow('المُحصّل فعلاً', fmtMoney(paid))}
      ${detailRow('المتبقّي تحصيله', fmtMoney(Math.max(0,req-paid)))}
      ${detailRow('عدد المشاركين', (mq.bookings||[]).length)}
    </div>
    <div class="progress" style="margin:12px 0;"><span style="width:${pct}%"></span></div>
    <div class="detail-miqats"><div class="title">المشاركون ومساهماتهم</div>
      <ul>${bookers||'<li><span class="name" style="color:var(--muted)">لا يوجد مشاركون بعد</span></li>'}</ul>
    </div>
    <div class="actions-row">
      <button class="btn btn-primary" onclick="openBooking('${mq.id}')">+ حجز عضو</button>
      <button class="btn btn-ghost" onclick="openMiqatModal('${mq.id}')">تعديل الميقات</button>
      <button class="btn btn-danger btn-sm" onclick="deleteMiqat('${mq.id}')">حذف الميقات</button>
    </div>`;
  currentMiqatPageId=id; openFullPage('miqatpage');
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
  if(formMode==='edit'){ const f=$('#addForm'); if(f) f.reset(); resetForm(); }
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
  else { c.classList.remove('open'); c.querySelectorAll('.miqat-entry').forEach(el=>{ delete contribState[el.getAttribute('data-ctx')]; el.remove(); }); }
});
let regCtxCounter=0;
function miqatEntryHTML(ctx){
  const opts=miqatsByNearest().map(mq=>{
    const st=miqatStatus(mq);
    return `<option value="${mq.id}">${escapeHtml(mq.name)} — ${fmtMiqatDate(mq)} (${STATUS_LABEL[st]})</option>`;
  }).join('');
  return `<div class="miqat-entry" data-ctx="${ctx}">
    <div class="field"><label>اختر الميقات</label>
      <select class="miqat-select" onchange="updateMiqatInfo(this)">
        <option value="">— اختر من قائمة المواقيت —</option>
        ${opts}
      </select></div>
    <div class="miqat-info" style="display:none"></div>
    <div class="field"><label>مساهمة العضو <span class="opt">نقدي أو عيني — أضف بنداً لكل نوع</span></label>
      <div class="contrib-editor" data-ctx="${ctx}"></div></div>
    <div class="field paymode-field"><label>طريقة الدفع</label>
      <div class="paymode">
        <label class="pm-opt"><input type="radio" name="pm_${ctx}" value="full" checked onchange="regPayMode('${ctx}','full')"><span class="pm-dot"></span><span><span class="pm-t">دفع كامل</span><span class="pm-d">تسديد المبلغ مرة واحدة</span></span></label>
        <label class="pm-opt"><input type="radio" name="pm_${ctx}" value="inst" onchange="regPayMode('${ctx}','inst')"><span class="pm-dot"></span><span><span class="pm-t">تقسيط</span><span class="pm-d">دفعات على مواعيد استحقاق</span></span></label>
      </div>
      <input type="number" class="pm-init" id="pmInit_${ctx}" style="display:none;margin-top:8px" placeholder="المدفوع الآن (الدفعة الأولى)" min="0" step="0.001" />
    </div>
    <div class="miqat-preview" style="display:none"></div>
    <button type="button" class="remove-btn" onclick="removeMiqatEntry(this)">× إزالة</button>
  </div>`;
}
function removeMiqatEntry(btn){ const entry=btn.closest('.miqat-entry'); const ctx=entry.getAttribute('data-ctx'); delete contribState[ctx]; entry.remove(); }
/* عرض بيانات الميقات المختار */
function updateMiqatInfo(sel){
  const entry=sel.closest('.miqat-entry'); const ctx=entry.getAttribute('data-ctx');
  const info=entry.querySelector('.miqat-info');
  const mq=miqats.find(x=>x.id===sel.value);
  if(!mq){ info.style.display='none'; regPreviewUpdate(ctx); return; }
  const req=Number(mq.requiredAmount)||0, booked=miqatEffective(mq), rem=Math.max(0,req-booked);
  const st=miqatStatus(mq);
  info.style.display='block';
  info.innerHTML=`
    <div class="mq-info-box">
      <div class="mq-info-row"><span>التاريخ الهجري</span><b>${fmtMiqatDate(mq)}</b></div>
      <div class="mq-info-row"><span>المبلغ المطلوب</span><b>${fmtMoney(req)}</b></div>
      ${bookersBlockHTML(mq)}
      <div class="mq-info-row"><span>المتبقّي</span><b>${fmtMoney(rem)}</b></div>
      <div class="mq-info-row"><span>الحالة الحالية</span><span class="mc-status st-${st}">${STATUS_LABEL[st]}</span></div>
    </div>`;
  regPreviewUpdate(ctx);
}
/* كتلة «المحجوز من» — تفصيل المساهمين السابقين (عضو / عائلة) ومبالغهم */
function bookersBlockHTML(mq){
  const bs=(mq.bookings||[]).filter(b=>bookingEffective(b)>0);
  if(!bs.length) return `<div class="mq-bookers empty"><div class="bk-title">المحجوز من</div><div class="bk-none">لا توجد مساهمات محجوزة بعد</div></div>`;
  const total=bs.reduce((s,b)=>s+bookingEffective(b),0);
  const rows=bs.map(b=>{
    const fam=!!b.familyName;
    const who = fam ? b.familyName : (members.find(x=>x.id===b.memberId)?.name || 'عضو');
    return `<div class="bk-row"><span class="bk-who"><span class="bk-tag ${fam?'fam':'mem'}">${fam?'عائلة':'عضو'}</span>${escapeHtml(who)}</span><b class="bk-amt">${fmtMoney(bookingEffective(b))}</b></div>`;
  }).join('');
  return `<div class="mq-bookers">
    <div class="bk-title">المحجوز من <span class="bk-count">(${bs.length})</span></div>
    ${rows}
    <div class="bk-row bk-total"><span>مجموع المحجوز</span><b>${fmtMoney(total)}</b></div>
  </div>`;
}
/* معاينة الحالة بعد مساهمة العضو (تُحسب من مجموع البنود) */
function regPreviewUpdate(ctx){
  const entry=document.querySelector('.miqat-entry[data-ctx="'+ctx+'"]'); if(!entry) return;
  const prev=entry.querySelector('.miqat-preview');
  const mq=miqats.find(x=>x.id===entry.querySelector('.miqat-select').value);
  const amt=contribTotal(ctx);
  if(!mq||amt<=0){ prev.style.display='none'; return; }
  const req=Number(mq.requiredAmount)||0;
  const booked=miqatEffective(mq);
  const total=booked+amt;
  const newSt = total<=0 ? 'red' : (req>0 && total<req ? 'yellow' : 'green');
  const calc = booked>0 ? `<div class="pv-calc">المحجوز سابقاً ${fmtMoney(booked)} + مساهمة العضو ${fmtMoney(amt)} = <b>${fmtMoney(total)}</b> من ${fmtMoney(req)}</div>` : '';
  const msg = newSt==='green'
    ? `✅ <b>اكتمل الحجز</b> — يُغطّى المبلغ المطلوب بالكامل`
    : `⚠️ <b>يحتاج تعزيز</b> — المجموع أقل من المطلوب (ناقص ${fmtMoney(Math.max(0,req-total))})`;
  prev.style.display='block';
  prev.innerHTML=`<div class="mq-preview-box st-${newSt}">${msg}${calc}</div>`;
}
function addMiqatEntry(){ const c=$('#miqatsContainer'); const btn=c.querySelector('.add-miqat-btn');
  const ctx='reg_'+(++regCtxCounter);
  const d=document.createElement('div'); d.innerHTML=miqatEntryHTML(ctx); c.insertBefore(d.firstElementChild,btn);
  contribInit(ctx); }
function regPayMode(ctx,mode){ const inp=document.getElementById('pmInit_'+ctx); if(inp){ inp.style.display = mode==='inst'?'block':'none'; if(mode==='full') inp.value=''; } if(String(ctx).startsWith('reg_')) regPreviewUpdate(ctx); }
function collectFormMiqats(){
  const list=[]; $$('#miqatsContainer .miqat-entry').forEach(el=>{
    const miqatId=el.querySelector('.miqat-select').value;
    const ctx=el.getAttribute('data-ctx');
    const items=contribItems(ctx); const amount=items.reduce((s,i)=>s+i.value,0);
    const pmSel=el.querySelector(`input[name="pm_${ctx}"]:checked`); const payMode=pmSel?pmSel.value:'full';
    const initEl=document.getElementById('pmInit_'+ctx); const initPaid=(payMode==='inst'&&initEl)?(parseFloat(initEl.value)||0):0;
    if(miqatId) list.push({miqatId, amount, items, payMode, initPaid});
  }); return list;
}
function resetForm(){ $('#isAdminToggle').checked=false; $('#adminCommWrap').style.display='none'; $('#adminCommInput').value='';
  $('#hasMiqatToggle').checked=false; const c=$('#miqatsContainer'); c.classList.remove('open');
  c.querySelectorAll('.miqat-entry,.miqat-existing,.form-existing-title').forEach(el=>{ const cx=el.getAttribute&&el.getAttribute('data-ctx'); if(cx) delete contribState[cx]; el.remove(); }); currentPhoto=null; $('#photoPreview').innerHTML='👤';
  const pi=$('#photoInput'); if(pi) pi.value='';
  const ad=$('#isAdultToggle'); if(ad){ ad.checked=true; $('#minorBirthWrap').style.display='none'; $('#minorBirthdate').value=''; }
  // العودة لوضع الإضافة
  formMode='add'; editingId=null; editRemovedBookings=new Set();
  const t=$('#addFormTitle'); if(t) t.textContent='➕ تسجيل عضو جديد';
  const s=$('#addFormSub'); if(s) s.textContent='رقم العضوية يُنشأ تلقائياً حسب نوع العضوية (مثال: A0001)';
  const sb=$('#addSubmitBtn'); if(sb) sb.textContent='حفظ العضو';
  const rb=$('#addResetBtn'); if(rb) rb.style.display=''; }

$('#addForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const fd=new FormData(e.target); const type=fd.get('type'); const num=settings.counters[type]||1;
  const isAdmin=$('#isAdminToggle').checked;
  const hasMiqat=$('#hasMiqatToggle').checked; const formMiqats=hasMiqat?collectFormMiqats():[];
  if(formMode!=='edit' && hasMiqat && formMiqats.length===0){ toast('أضف بيانات ميقات واحد على الأقل أو أطفئ الخيار'); return; }

  // العمر: سؤال بنعم/لا. البالغ (18+) لا يحتاج عمراً ولا تاريخ ميلاد.
  const isAdult=$('#isAdultToggle').checked;
  const isMinor=!isAdult;
  let birthdate=null, age=null;
  if(isMinor){
    birthdate=$('#minorBirthdate').value;
    if(!birthdate){ toast('أدخل تاريخ ميلاد العضو'); return; }
    age=ageFromBirthdate(birthdate);
  }

  // ═══ وضع التعديل ═══
  if(formMode==='edit'){
    const m=members.find(x=>x.id===editingId); if(!m){ toast('تعذّر إيجاد العضو'); return; }
    const editPhone='+'+(fd.get('countryCode')||'973')+toEnglishDigits(fd.get('phone')).replace(/\D/g,'');
    const dupE=members.find(x=>x.id!==editingId && x.phone===editPhone);
    if(dupE){ toast(`الرقم موجود في ملف العضو: ${dupE.name}`); return; }
    m.name=fd.get('name').trim(); m.type=type; m.isMinor=isMinor; m.age=age; m.birthdate=birthdate;
    m.phone=editPhone;
    m.area=(fd.get('area')||'').trim(); m.email=(fd.get('email')||'').trim(); m.address=(fd.get('address')||'').trim();
    m.photo=currentPhoto||null; m.isAdmin=isAdmin; m.committee=isAdmin?($('#adminCommInput').value.trim()):'';
    // إزالة المواقيت المحذوفة (مع دفعاتها)
    editRemovedBookings.forEach(mid=>{ const mq=miqats.find(x=>x.id===mid); if(mq) mq.bookings=(mq.bookings||[]).filter(b=>b.memberId!==m.id); });
    // إضافة المواقيت الجديدة (بدون المساس بالحجوزات الحالية ودفعاتها)
    (hasMiqat?formMiqats:[]).forEach(fm=>{ const mq=miqats.find(x=>x.id===fm.miqatId); if(!mq) return; mq.bookings=mq.bookings||[];
      const initPaid = (fm.payMode==='inst') ? Math.max(0, Math.min(fm.amount, fm.initPaid||0)) : 0;
      const ex=mq.bookings.find(b=>b.memberId===m.id);
      if(ex){ ex.items=[...bookingItems(ex).filter(x=>(Number(x.value)||0)>0||x.kind!=='نقدي'), ...(fm.items||[])]; ex.amount=(Number(ex.amount)||0)+fm.amount; if(Array.isArray(ex.payments)&&initPaid>0) ex.payments.push({amount:initPaid,date:today()}); }
      else mq.bookings.push({memberId:m.id, amount:fm.amount, items:fm.items||[], payMode:fm.payMode||'full', payments: initPaid>0?[{amount:initPaid, date:today()}]:[]});
    });
    await saveMembers(); await saveMiqats();
    e.target.reset(); resetForm();
    toast('تم حفظ التعديلات');
    renderMembers(); renderMiqats(); renderDashboard();
    backToMembers(); showDetail(m.id);
    return;
  }

  const newPhone='+'+(fd.get('countryCode')||'973')+toEnglishDigits(fd.get('phone')).replace(/\D/g,'');
  const dup=members.find(x=>x.phone===newPhone);
  if(dup){ toast(`الرقم موجود في ملف العضو: ${dup.name}`); return; }

  const newMember={
    id:'m_'+Date.now()+'_'+Math.random().toString(36).slice(2,6),
    number:num, type,
    name:fd.get('name').trim(), isMinor, age, birthdate,
    phone:newPhone, area:(fd.get('area')||'').trim(),
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
    const initPaid = (fm.payMode==='inst') ? Math.max(0, Math.min(fm.amount, fm.initPaid||0)) : 0;
    const ex=mq.bookings.find(b=>b.memberId===newMember.id);
    if(ex){ ex.items=[...bookingItems(ex).filter(x=>(Number(x.value)||0)>0||x.kind!=='نقدي'), ...(fm.items||[])]; ex.amount=(Number(ex.amount)||0)+fm.amount; if(!Array.isArray(ex.payments)) ex.payments=[{amount:Number(ex.amount)-fm.amount, date:today()}]; if(initPaid>0) ex.payments.push({amount:initPaid, date:today()}); }
    else mq.bookings.push({memberId:newMember.id, amount:fm.amount, items:fm.items||[], payMode:fm.payMode||'full', payments: initPaid>0?[{amount:initPaid, date:today()}]:[]});
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

/* المواقيت التي تبعد أقل من شهرين هجريين عن اليوم (لتذكير العضو) */
function upcomingMemberMiqats(m){
  const h=hijriParts(); const cur=h.month;
  return memberMiqats(m).filter(mq=>{
    let diff=(mq.month-cur+12)%12;
    if(diff===0) return mq.day>=h.day;
    return diff<=2;
  }).sort((a,b)=>{ let da=(a.month-cur+12)%12, db=(b.month-cur+12)%12; if(da!==db) return da-db; return a.day-b.day; });
}
function miqatRemindKey(mq){ const h=hijriParts(); return `${mq.id}_${h.year}`; }
function isMiqatReminded(m,mq){ return (m.remindedMiqats||[]).includes(miqatRemindKey(mq)); }
function miqatRemindersHTML(m){
  const ups=upcomingMemberMiqats(m);
  if(!ups.length) return '';
  return ups.map(mq=>{
    const reminded=isMiqatReminded(m,mq);
    const diff=(mq.month-hijriParts().month+12)%12;
    const when = diff===0?'هذا الشهر':(diff===1?'الشهر القادم':'خلال شهرين');
    const msg=`السلام عليكم\n\nالعضو ${m.name}،\nنذكّركم بقرب ميقات \n\n*${mq.name}* \nبتاريخ ${miqatHijriFull(mq)} \nالموافق ${miqatGregText(mq)} ${when}☝🏼\n\nنسألكم الحضور والمشاركة.\nبارك الله فيكم — هيئة محبي الحسين\n\n⭕️ *ملاحظة*\nتم توليد هذه الرسالة بالذكاء الاصطناعي`;
    return `<div class="miqat-reminder ${reminded?'reminded':''}">
      <div class="mr-head">${reminded?'✅ تم تذكير العضو':'🔔 تذكير بميقات قريب'}</div>
      <div class="mr-name">${escapeHtml(mq.name)}</div>
      <div class="mr-meta">${fmtMiqatDate(mq)} · ${when}</div>
      <div class="mr-actions">
        <a href="${whatsappLink(m.phone,msg)}" target="_blank" class="mr-btn wa" onclick="markReminded('${m.id}','${mq.id}')">💬 واتساب</a>
        <a href="tel:${m.phone}" class="mr-btn call" onclick="markReminded('${m.id}','${mq.id}')">📞 اتصال</a>
        ${reminded
          ? `<button class="mr-btn done" onclick="unmarkReminded('${m.id}','${mq.id}')"><span class="mr-done-badge">✓ تم</span></button>`
          : `<button class="mr-btn done" onclick="markReminded('${m.id}','${mq.id}',true)">وضع علامة تم</button>`}
      </div>
    </div>`;
  }).join('');
}
async function markReminded(memberId,miqatId,refresh){
  const m=members.find(x=>x.id===memberId); const mq=miqats.find(x=>x.id===miqatId);
  if(!m||!mq) return;
  const key=miqatRemindKey(mq);
  if(!m.remindedMiqats) m.remindedMiqats=[];
  if(!m.remindedMiqats.includes(key)){ m.remindedMiqats.push(key); await saveMembers(); }
  renderRecentMembers();          // مزامنة قائمة «مواقيت تقترب» في الرئيسية
  if(refresh) showDetail(memberId);
}
async function unmarkReminded(memberId,miqatId){
  const m=members.find(x=>x.id===memberId); const mq=miqats.find(x=>x.id===miqatId);
  if(!m||!mq) return;
  const key=miqatRemindKey(mq);
  m.remindedMiqats=(m.remindedMiqats||[]).filter(k=>k!==key);
  await saveMembers();
  renderRecentMembers();          // مزامنة قائمة «مواقيت تقترب» في الرئيسية
  showDetail(memberId);
}
function showDetail(id){
  const m=members.find(x=>x.id===id); if(!m) return;
  const active=isActive(m);
  $('#detailTitle').textContent=m.name;
  $('#detailSubtitle').innerHTML=`<span style="font-weight:600;color:var(--ink)">${memberCode(m)}</span> · ${m.type} · <span class="badge status-${active?'active':'inactive'}">${active?'مفعّلة':'غير مفعّلة'}</span> ${m.isAdmin?'· <span class="badge admin">إداري</span>':''}`;
  const mms=memberMiqats(m);
  const miqatsHTML=mms.length?`<div class="detail-miqats"><div class="title">مواقيته</div><ul>
    ${mms.map(mq=>{ const b=mq.bookings.find(x=>x.memberId===m.id); return `<li><span class="name">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</span><span class="date">${b?fmtBooking(b):fmtMoney(0)}</span></li>`; }).join('')}
    </ul></div>`:'';
  const reminderHTML=miqatRemindersHTML(m);
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
    </div>
    ${subInstallmentHTML(m)}
    ${miqatsHTML}
    ${reminderHTML}
    <div class="actions-row">
      <button class="btn btn-primary" onclick="openAddSubPayment('${m.id}')">💳 تفعيل العضوية</button>
      ${(memberPayments(m).length||memberMiqats(m).length)?`<button class="btn btn-ghost" onclick="printSubReceipt('${m.id}')">🧾 تقرير الأقساط PDF</button>`:''}
      ${active?`<button class="btn btn-accent" onclick="openCard('${m.id}')">بطاقة العضوية</button>`:''}
      <button class="btn btn-ghost" onclick="openEditMember('${m.id}')">✏️ تعديل الملف</button>
      <a href="${whatsappLink(m.phone)}" target="_blank" class="btn wa-btn large">${WA_ICON} واتساب</a>
      ${active?`<button class="btn btn-ghost" onclick="renewPayment('${m.id}')">تجديد سنة</button>`:''}
      <button class="btn btn-ghost btn-sm" onclick="toggleAdmin('${m.id}')">${m.isAdmin?'إزالة من الإدارة':'تعيين كإداري'}</button>
      <button class="btn btn-danger btn-sm" onclick="deleteMember('${m.id}')">حذف</button>
    </div>`;
  currentMemberPageId=id; openFullPage('memberpage');
}

/* ═══════════ تعديل ملف العضو ═══════════ */
let editingMemberId=null;
let formMode='add', editingId=null, editRemovedBookings=new Set();
function openEditMember(id){
  const m=members.find(x=>x.id===id); if(!m) return;
  formMode='edit'; editingId=id; editingMemberId=id;
  $$('.tab-content').forEach(c=>c.style.display='none');
  $('#tab-add').style.display='block';
  const F=sel=>document.querySelector('#addForm '+sel);
  F('[name=name]').value=m.name||'';
  const sp=splitPhone(m.phone); const cc=document.getElementById('addCountryCode'); if(cc) cc.value=sp.code||'973'; F('[name=phone]').value=sp.local||'';
  F('[name=type]').value=m.type||'عادي';
  F('[name=area]').value=m.area||''; F('[name=email]').value=m.email||''; F('[name=address]').value=m.address||'';
  $('#isAdultToggle').checked=!m.isMinor; $('#minorBirthWrap').style.display=m.isMinor?'block':'none'; if($('#minorBirthdate')) $('#minorBirthdate').value=m.birthdate||'';
  $('#isAdminToggle').checked=!!m.isAdmin; $('#adminCommWrap').style.display=m.isAdmin?'block':'none'; if($('#adminCommInput')) $('#adminCommInput').value=m.committee||'';
  currentPhoto=m.photo||null; $('#photoPreview').innerHTML=currentPhoto?`<img src="${currentPhoto}" alt="" />`:'👤';
  // المواقيت: أظهر الحالية كبطاقات + إمكانية إضافة جديد
  const c=$('#miqatsContainer'); c.querySelectorAll('.miqat-entry,.miqat-existing,.form-existing-title').forEach(el=>{ const cx=el.getAttribute&&el.getAttribute('data-ctx'); if(cx) delete contribState[cx]; el.remove(); });
  editRemovedBookings=new Set();
  const mine=memberMiqats(m);
  $('#hasMiqatToggle').checked = mine.length>0;
  c.classList.toggle('open', mine.length>0);
  if(mine.length){
    const btn=c.querySelector('.add-miqat-btn');
    const title=document.createElement('div'); title.className='form-existing-title'; title.textContent='مواقيته الحالية:'; c.insertBefore(title,btn);
    mine.forEach(mq=>{ const b=mq.bookings.find(x=>x.memberId===m.id); c.insertBefore(makeExistingMiqatCard(mq,b),btn); });
  }
  $('#addFormTitle').textContent='✏️ تعديل بيانات العضو';
  $('#addFormSub').textContent=`رقم العضوية: ${memberCode(m)} — عدّل ما تشاء ثم احفظ`;
  $('#addSubmitBtn').textContent='حفظ التعديلات';
  const rb=$('#addResetBtn'); if(rb) rb.style.display='none';
  window.scrollTo(0,0);
}
function makeExistingMiqatCard(mq,b){
  const rem=bookingRemaining(b);
  const d=document.createElement('div'); d.className='miqat-existing'; d.setAttribute('data-miqat',mq.id);
  d.innerHTML=`<div class="me-mid"><div class="me-name">${escapeHtml(mq.name)} <span style="color:var(--muted);font-weight:400">${fmtMiqatDate(mq)}</span></div>
     <div class="me-sub">${fmtBooking(b)} · ${rem>0?`<span class="rem">متبقّي ${fmtMoney(rem)}</span>`:`<span class="ok">مكتمل ✓</span>`}</div></div>
   <button type="button" class="me-del" title="إزالة الميقات" onclick="removeExistingMiqat(this,'${mq.id}')">×</button>`;
  return d;
}
function removeExistingMiqat(btn,miqatId){ if(!confirm('إزالة هذا الميقات من العضو؟ ستُحذف مساهمته ودفعاته.')) return; editRemovedBookings.add(miqatId); btn.closest('.miqat-existing').remove(); }

/* (النافذة القديمة لم تعد مستخدمة) قائمة المواقيت المتاحة للإضافة */
function populateEditMiqatSelect(){
  const m=members.find(x=>x.id===editingMemberId); if(!m) return;
  const sel=$('#editMiqatSelect'); if(!sel) return;
  const available=miqats.filter(mq=>!(mq.bookings||[]).some(b=>b.memberId===m.id));
  sel.innerHTML = available.length
    ? `<option value="">اختر ميقاتاً…</option>` + available.map(mq=>`<option value="${mq.id}">${escapeHtml(mq.name)} — ${fmtMiqatDate(mq)}</option>`).join('')
    : `<option value="">لا توجد مواقيت متاحة</option>`;
  contribInit('edit');
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
  // إضافة ميقات جديد للعضو (إن اختير) مع مساهمته المالية
  const addMiqatId=$('#editMiqatSelect') ? $('#editMiqatSelect').value : '';
  let miqatsChanged=false;
  if(addMiqatId){
    const mq=miqats.find(x=>x.id===addMiqatId);
    if(mq){
      const items=contribItems('edit'); const amount=items.reduce((s,i)=>s+i.value,0);
      if(items.length){
        mq.bookings=mq.bookings||[];
        const ex=mq.bookings.find(b=>b.memberId===m.id);
        if(ex){ ex.items=[...bookingItems(ex).filter(x=>(Number(x.value)||0)>0||x.kind!=='نقدي'), ...items]; ex.amount=(Number(ex.amount)||0)+amount; }
        else mq.bookings.push({memberId:m.id, amount, items});
        miqatsChanged=true;
      }
    }
  }
  await saveMembers();
  if(miqatsChanged) await saveMiqats();
  closeModal('editModal'); toast('تم حفظ التعديلات');
  renderMembers(); renderAdmins(); renderDashboard();
  if(miqatsChanged) renderMiqats();
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

/* ─── كتلة أقساط العضوية في ملف العضو ─── */
function subInstallmentHTML(m){
  const tot=memberFeeTotal(m), paid=memberPaid(m), rem=memberRemaining(m);
  const st=memberSubStatus(m);
  const pct = tot>0 ? Math.min(100, Math.round(paid/tot*100)) : (paid>0?100:0);
  const label = st==='full'?'مسدَّد بالكامل':(st==='partial'?'مقسّط':'غير مسدَّد');
  const pays=memberPayments(m);
  const paysHTML = pays.length ? `<div class="pay-list">${pays.map(p=>`<div class="pay-item"><span>${fmtMoney(p.amount)}${p.note?` <span class="pn">— ${escapeHtml(p.note)}</span>`:''}</span><span class="pd">${p.date?fmtDate(p.date):''}</span></div>`).join('')}</div>` : '';
  return `<div class="sub-inst">
    <div class="si-head"><span class="si-title">اشتراك العضوية</span><span class="si-badge st-${st==='full'?'green':(st==='partial'?'yellow':'red')}">${label}</span></div>
    <div class="si-bar"><span style="width:${pct}%"></span></div>
    <div class="si-nums"><span>مدفوع <b>${fmtMoney(paid)}</b> من ${fmtMoney(tot)}</span><span>${rem>0?`متبقّي <b>${fmtMoney(rem)}</b>`:'مكتمل'}</span></div>
    ${paysHTML}
  </div>`;
}
let subPayMemberId=null;
/* ═══ مدير الأقساط (عضوية أو مساهمة ميقات) — إضافة/تعديل/حذف ═══ */
let instCtx=null, instEditIdx=-1;
// نقاط الدخول القديمة تُوجَّه للمدير الجديد
function openAddSubPayment(id){ openInstMgr({kind:'sub', memberId:id}); }
function openBookingPayment(miqatId, memberId){ openInstMgr({kind:'miqat', memberId, miqatId}); }
function instObligation(){
  if(!instCtx) return null;
  if(instCtx.kind==='sub'){
    const m=members.find(x=>x.id===instCtx.memberId); if(!m) return null;
    if(!Array.isArray(m.payments)) m.payments = m.paymentDate ? [{amount:(m.paidAmount!=null?Number(m.paidAmount):memberFeeTotal(m)), date:m.paymentDate}] : [];
    if(m.feeTotal==null) m.feeTotal=Number(settings.fee)||0;
    return { m, payments:m.payments, total:memberFeeTotal(m), title:'تفعيل العضوية', sub:`${m.name} — اشتراك العضوية` };
  } else {
    const mq=miqats.find(x=>x.id===instCtx.miqatId); if(!mq) return null;
    const b=(mq.bookings||[]).find(x=>x.memberId===instCtx.memberId); if(!b) return null;
    if(!Array.isArray(b.payments)) b.payments=[{amount:bookingAgreed(b), date:b.date||'', note:'مدفوع بالكامل'}];
    const who = b.familyName ? `${b.familyName}` : (members.find(x=>x.id===b.memberId)?.name || '');
    return { m:members.find(x=>x.id===b.memberId)||null, mq, b, payments:b.payments, total:bookingAgreed(b), title:'تقسيط المساهمة', sub:`${who} · ${mq.name}` };
  }
}
function openInstMgr(ctx){ instCtx=ctx; instEditIdx=-1; if(!instObligation()){ toast('تعذّر فتح الأقساط'); return; }
  $('#instAddAmount').value=''; $('#instAddNote').value=''; renderInstMgr(); $('#instMgrModal').classList.add('open'); }
function renderInstMgr(){
  const o=instObligation(); if(!o) return;
  const paid=o.payments.reduce((s,p)=>s+(Number(p.amount)||0),0); const rem=Math.max(0,o.total-paid);
  $('#instMgrTitle').textContent=o.title; $('#instMgrSub').textContent=o.sub;
  $('#instMgrSummary').innerHTML=`<span>الإجمالي: <b>${fmtMoney(o.total)}</b></span><span class="paid">المدفوع: ${fmtMoney(paid)}</span><span class="rem">${rem>0?'المتبقّي: '+fmtMoney(rem):'مكتمل ✓'}</span>`;
  const list=$('#instMgrList');
  list.innerHTML = o.payments.length ? o.payments.map((p,i)=> i===instEditIdx
    ? `<div class="inst-row"><input type="number" class="ir-ea" id="irEditAmt" value="${p.amount}" step="0.001" min="0"><input type="text" class="ir-en" id="irEditNote" value="${(p.note||'').replace(/"/g,'&quot;')}" placeholder="ملاحظة"><button class="ir-btn ir-edit" onclick="instEditSave(${i})" title="حفظ">✓</button><button class="ir-btn ir-del" onclick="instEditCancel()" title="إلغاء">×</button></div>`
    : `<div class="inst-row"><span class="ir-amt">${fmtMoney(p.amount)}</span><span class="ir-meta">${p.date?fmtDate(p.date):''}${p.note?' · '+escapeHtml(p.note):''}</span><button class="ir-btn ir-edit" onclick="instEditStart(${i})" title="تعديل">✎</button><button class="ir-btn ir-del" onclick="instDelete(${i})" title="حذف">🗑</button></div>`
  ).join('') : `<div class="inst-empty">لا توجد دفعات بعد</div>`;
  const pf=$('#instPayFullBtn'); if(pf){ pf.style.display = (rem>0)?'inline-flex':'none'; pf.textContent = instCtx.kind==='sub' ? '✅ دفع كامل للعضوية' : '✅ تسجيل الاستلام كاملاً'; }
  const pdf=$('#instPdfBtn'); if(pdf){ pdf.style.display='inline-flex'; }
  renderSchedule();
}

/* ─── جدولة تواريخ الاستحقاق ─── */
function schedTarget(){ const o=instObligation(); if(!o) return null; return instCtx.kind==='sub' ? o.m : o.b; }
function fillSchedMonths(){
  const sel=$('#schedMonth'); if(!sel||sel.options.length) return;
  sel.innerHTML=HIJRI_MONTHS.map((n,i)=>`<option value="${i}">${n}</option>`).join('');
}
function updateSchedGreg(){
  const d=parseInt($('#schedDay').value,10), mo=parseInt($('#schedMonth').value,10), y=parseInt($('#schedYear').value,10);
  const out=$('#schedGreg'); if(!out) return;
  if(!d||isNaN(mo)||!y){ out.textContent='—'; return; }
  const g=hijriToGregorian(d,mo,y);
  out.textContent = g ? 'الموافق: '+fmtDate(g) : '—';
}
function renderSchedule(){
  fillSchedMonths();
  const t=schedTarget(); const wrap=$('#instSchedList'); if(!wrap) return;
  const sched=(t&&Array.isArray(t.dueSchedule))?t.dueSchedule:[];
  if(!sched.length){ wrap.innerHTML=`<div class="inst-empty" style="font-size:12px">لا توجد مواعيد استحقاق مجدولة</div>`; }
  else {
    wrap.innerHTML=sched.map((d,i)=>{
      const g=hijriToGregorian(d.day,d.month,d.year);
      return `<div class="sched-item ${d.paid?'done':''}">
        <div class="si-info"><span class="si-hij">${d.day} ${HIJRI_MONTHS[d.month]} ${d.year} هـ</span>${d.amount?`<span class="si-amt">${fmtMoney(d.amount)}</span>`:''}<div class="si-greg">${g?'الموافق '+fmtDate(g):''}</div></div>
        <div class="si-actions">
          <button class="si-btn" onclick="schedTogglePaid(${i})" title="${d.paid?'إلغاء':'تم الدفع'}">${d.paid?'↩️':'✅'}</button>
          <button class="si-btn" onclick="schedRemove(${i})" title="حذف">🗑</button>
        </div>
      </div>`;
    }).join('');
  }
  // ربط تحديث الميلادي
  ['schedDay','schedMonth','schedYear'].forEach(id=>{ const e=$('#'+id); if(e&&!e._bound){ e._bound=true; e.addEventListener('input',updateSchedGreg); e.addEventListener('change',updateSchedGreg); } });
}
async function schedAdd(){
  const t=schedTarget(); if(!t) return;
  const d=parseInt($('#schedDay').value,10), mo=parseInt($('#schedMonth').value,10), y=parseInt($('#schedYear').value,10);
  const amt=parseFloat($('#schedAmount').value)||0;
  if(!d||d<1||d>30){ toast('أدخل يوماً صحيحاً (1-30)'); return; }
  if(isNaN(mo)){ toast('اختر الشهر'); return; }
  if(!y||y<1440){ toast('أدخل سنة هجرية صحيحة'); return; }
  if(!Array.isArray(t.dueSchedule)) t.dueSchedule=[];
  t.dueSchedule.push({day:d,month:mo,year:y,amount:amt,paid:false});
  t.dueSchedule.sort((a,b)=>{ const ga=hijriToGregorian(a.day,a.month,a.year), gb=hijriToGregorian(b.day,b.month,b.year); return new Date(ga)-new Date(gb); });
  await schedSave();
  $('#schedDay').value=''; $('#schedYear').value=''; $('#schedAmount').value=''; $('#schedGreg').textContent='—';
  renderSchedule(); toast('تمت إضافة موعد الاستحقاق');
}
async function schedRemove(i){ const t=schedTarget(); if(!t||!Array.isArray(t.dueSchedule)) return; t.dueSchedule.splice(i,1); await schedSave(); renderSchedule(); }
async function schedTogglePaid(i){ const t=schedTarget(); if(!t||!Array.isArray(t.dueSchedule)) return; t.dueSchedule[i].paid=!t.dueSchedule[i].paid; await schedSave(); renderSchedule(); }
async function schedSave(){ if(instCtx.kind==='sub') await saveMembers(); else await saveMiqats(); updateNotifBadge(); }
function instPrintStatement(){
  if(!instCtx) return;
  if(instCtx.kind==='sub'){ printSubReceipt(instCtx.memberId); return; }
  // ميقات: عائلة → تقرير العائلة، عضو → كشف العضو الشامل (يتضمّن الميقات)
  const mq=miqats.find(x=>x.id===instCtx.miqatId); const b=mq&&(mq.bookings||[]).find(x=>x.memberId===instCtx.memberId);
  if(b&&b.familyName) printOneFamilyReport(instCtx.miqatId, instCtx.memberId);
  else printSubReceipt(instCtx.memberId);
}
/* تسجيل استلام كامل المتبقّي دفعةً واحدة */
async function instPayFull(){
  const o=instObligation(); if(!o) return;
  const paid=o.payments.reduce((s,p)=>s+(Number(p.amount)||0),0); const rem=Math.max(0,o.total-paid);
  if(rem<=0){ toast('مكتمل'); return; }
  o.payments.push({amount:rem, date:today(), note: instCtx.kind==='sub'?'دفع كامل':'استلام كامل'});
  await instCommit(o); renderInstMgr();
  toast(instCtx.kind==='sub'?'تم دفع كامل الاشتراك — العضوية مفعّلة':'تم تسجيل الاستلام كاملاً');
}
function instEditStart(i){ instEditIdx=i; renderInstMgr(); }
function instEditCancel(){ instEditIdx=-1; renderInstMgr(); }
async function instEditSave(i){
  const o=instObligation(); if(!o) return;
  const amt=parseFloat($('#irEditAmt').value)||0; const note=($('#irEditNote').value||'').trim();
  if(amt<=0){ toast('أدخل مبلغاً صحيحاً'); return; }
  o.payments[i]={...o.payments[i], amount:amt, note}; instEditIdx=-1;
  await instCommit(o); renderInstMgr();
}
async function instDelete(i){
  const o=instObligation(); if(!o) return;
  if(!confirm('حذف هذه الدفعة؟')) return;
  o.payments.splice(i,1);
  await instCommit(o); renderInstMgr();
}
async function instAdd(){
  const o=instObligation(); if(!o) return;
  const amt=parseFloat($('#instAddAmount').value)||0; const note=($('#instAddNote').value||'').trim();
  if(amt<=0){ toast('أدخل مبلغاً صحيحاً'); return; }
  o.payments.push({amount:amt, date:today(), note});
  $('#instAddAmount').value=''; $('#instAddNote').value='';
  await instCommit(o); renderInstMgr();
}
async function instCommit(o){
  if(instCtx.kind==='sub'){
    const m=o.m; m.paidAmount=memberPaid(m);
    if(memberPaid(m)>=memberFeeTotal(m)){ if(!m.paymentDate){ m.paymentDate=today(); m.expiryDate=addYear(m.paymentDate); m.hijriStartYear=settings.year||1448; m.hijriEndYear=(settings.year||1448)+1; } }
    else { m.paymentDate=null; m.expiryDate=null; } // نزل عن الكامل → غير مفعّل
    await saveMembers();
  } else {
    await saveMiqats();
    if(isFullPageOpen('miqatpage')) showMiqatDetail(instCtx.miqatId);
    renderMiqats();
  }
  renderMembers(); renderDashboard();
  if($('#tab-familyList')&&$('#tab-familyList').style.display!=='none') renderFamilyList();
  if(isFullPageOpen('memberpage')) showDetail(instCtx.memberId);
}

/* ─── قائمة الأقساط المتبقّية ─── */
function renderDues(){
  const box=$('#duesList'); const panel=$('#duesPanel'); if(!box) return;
  const subDue=members.filter(m=>memberSubStatus(m)==='partial')
    .map(m=>({m, rem:memberRemaining(m)})).sort((a,b)=>b.rem-a.rem);
  let miqatDue=[];
  miqats.forEach(mq=>(mq.bookings||[]).forEach(b=>{ if(b.payMode==='inst'){ const rem=bookingRemaining(b); if(rem>0) miqatDue.push({b,mq,rem}); } }));
  miqatDue.sort((a,b)=>b.rem-a.rem);
  if(!subDue.length && !miqatDue.length){ if(panel) panel.style.display='none'; box.innerHTML=''; return; }
  if(panel) panel.style.display='block';
  let cards='';
  // اشتراكات العضوية المقسّطة
  subDue.forEach(({m,rem})=>{
    const tot=memberFeeTotal(m), paid=memberPaid(m); const pct=tot>0?Math.min(100,Math.round(paid/tot*100)):0;
    const av = m.photo ? `<img src="${m.photo}" alt="">` : escapeHtml((m.name||'؟').trim().charAt(0));
    cards+=`<div class="mq-card">
      <div class="mq-top">
        <div class="mq-av" onclick="showDetail('${m.id}')">${av}</div>
        <div class="mq-mid" onclick="showDetail('${m.id}')">
          <div class="mq-name">${escapeHtml(m.name)} <span class="code">${memberCode(m)}</span></div>
          <div class="mq-line">قسط العضوية · مدفوع ${fmtMoney(paid)} من ${fmtMoney(tot)}</div>
        </div>
      </div>
      <div class="mq-bar"><span style="width:${pct}%"></span></div>
      <div class="mq-foot"><span>مقسّط</span><b>متبقّي ${fmtMoney(rem)}</b></div>
      <div class="mq-actions">
        <button class="mq-wa" onclick="remindSubDue('${m.id}')">✆ تذكير بالقسط</button>
        <button class="mq-rcv rcv" onclick="openAddSubPayment('${m.id}')">💵 استلم المبلغ</button>
      </div>
    </div>`;
  });
  // مساهمات مواقيت مقسّطة
  miqatDue.forEach(({b,mq,rem})=>{
    const ag=bookingAgreed(b), paid=bookingPaid(b); const pct=ag>0?Math.min(100,Math.round(paid/ag*100)):0;
    const fam=!!b.familyName;
    const av = fam ? '👪' : escapeHtml((bookingName(b)||'؟').trim().charAt(0));
    const clickMid = fam ? `openFamilyList()` : `showDetail('${b.memberId}')`;
    const remindFn = `remindMiqatDue('${b.memberId}','${mq.id}')`;
    cards+=`<div class="mq-card">
      <div class="mq-top">
        <div class="mq-av" onclick="${clickMid}">${av}</div>
        <div class="mq-mid" onclick="${clickMid}">
          <div class="mq-name">${escapeHtml(bookingName(b))} <span class="code">${fam?'عائلة':memberCode(members.find(x=>x.id===b.memberId)||{})}</span></div>
          <div class="mq-line">${escapeHtml(mq.name)} · مدفوع ${fmtMoney(paid)} من ${fmtMoney(ag)}</div>
        </div>
      </div>
      <div class="mq-bar"><span style="width:${pct}%"></span></div>
      <div class="mq-foot"><span>مقسّط</span><b>متبقّي ${fmtMoney(rem)}</b></div>
      <div class="mq-actions">
        <button class="mq-wa" onclick="${remindFn}">✆ تذكير بالقسط</button>
        <button class="mq-rcv rcv" onclick="openBookingPayment('${mq.id}','${b.memberId}')">💵 استلم المبلغ</button>
      </div>
    </div>`;
  });
  box.className='dues-list';
  box.innerHTML=cards;
}
/* تذكير قسط العضوية عبر واتساب (النص المعتمد) */
function remindSubDue(id){
  const m=members.find(x=>x.id===id); if(!m) return;
  const msg=`السلام عليكم\n\nالأخ الكريم ${m.name}،\n\nنود تذكيركم  باستحقاق قسط اشتراك العضوية في هيئة محبي الحسين.\n\nنسأل الله أن يجعل مساهمتكم في ميزان حسناتكم، وأن يبارك لكم فيما تقدمونه من دعمٍ لخدمة الإمام الحسين (ع).\n\nوللتنسيق بشأن السداد، يرجى التواصل مع أمانة السر\n*صادق الغسرة:* +97336496449\n\nكما نود الإشارة إلى أن من حق كل عضو طلب كشفٍ تفصيلي بجميع الأقساط والمدفوعات الخاصة به في أي وقت، وذلك تعزيزًا للشفافية وحفظًا لحقوق الأعضاء.\n\nنسعد بحضوركم ودعمكم المستمر.\nبارك الله فيكم.\n\n— هيئة محبي الحسين\n\n⭕️ ملاحظة:\nتم توليد هذه الرسالة بالذكاء الاصطناعي.`;
  window.open(whatsappLink(m.phone, msg), '_blank');
}
/* تذكير قسط مساهمة ميقات عبر واتساب */
function remindMiqatDue(memberId, miqatId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  const phone=bookingPhone(b);
  const who = b.familyName ? `${b.familyName}${b.repName?` (ممثّلها ${b.repName})`:''}` : bookingName(b);
  const msg=`السلام عليكم\n\nالأخ الكريم ${who}،\n\nنود تذكيركم باستحقاق قسط مساهمتكم في *${mq.name}* ضمن مواقيت هيئة محبي الحسين. والذي يصادف ${miqatHijriFull(mq)} الموافق ${miqatGregText(mq)}\n\nنسأل الله أن يجعل مساهمتكم في ميزان حسناتكم، وأن يبارك لكم فيما تقدمونه من دعمٍ لخدمة الإمام الحسين (ع).\n\nوللتنسيق بشأن السداد، يرجى التواصل مع أمانة السر\n*صادق الغسرة:* 36496449\n\n*كما نود الإشارة إلى أن من حق كل عضو طلب كشفٍ تفصيلي بجميع الأقساط والمدفوعات الخاصة به في أي وقت، وذلك تعزيزًا للشفافية وحفظًا لحقوق الأعضاء.*\n\nنسعد بحضوركم ودعمكم المستمر.\nبارك الله فيكم.\n\n— هيئة محبي الحسين\n\n⭕️ ملاحظة:\nتم توليد هذه الرسالة بالذكاء الاصطناعي.`;
  window.open(whatsappLink(phone, msg), '_blank');
}

/* ─── تقرير أقساط العضو الشامل PDF (العضوية + المواقيت) ─── */
function printSubReceipt(id){
  const m=members.find(x=>x.id===id); if(!m) return;
  const money=fmtMoney;
  // العضوية
  const subPays=memberPayments(m); const subTot=memberFeeTotal(m), subPaid=memberPaid(m), subRem=memberRemaining(m);
  const subRows=subPays.map((p,i)=>`<tr><td>${i+1}</td><td>${money(p.amount)}</td><td>${p.date?fmtDate(p.date):''}</td><td>${escapeHtml(p.note||'')}</td></tr>`).join('')||`<tr><td colspan="4" class="empty">لا توجد دفعات</td></tr>`;
  const subStatus = memberSubStatus(m)==='full'?'مسدَّد بالكامل':(memberSubStatus(m)==='partial'?`مقسّط (باقٍ ${money(subRem)})`:'غير مسدَّد');
  // المواقيت
  const mms=memberMiqats(m);
  let grandAgreed=subTot, grandPaid=subPaid, grandRem=subRem;
  const miqatBlocks=mms.map(mq=>{
    const b=(mq.bookings||[]).find(x=>x.memberId===m.id); if(!b) return '';
    const ag=bookingAgreed(b), pd=bookingPaid(b), rem=bookingRemaining(b);
    grandAgreed+=ag; grandPaid+=pd; grandRem+=rem;
    const pays=Array.isArray(b.payments)?b.payments:[{amount:ag,date:'',note:'مدفوع بالكامل'}];
    const rows=pays.map((p,i)=>`<tr><td>${i+1}</td><td>${money(p.amount)}</td><td>${p.date?fmtDate(p.date):''}</td><td>${escapeHtml(p.note||'')}</td></tr>`).join('')||`<tr><td colspan="4" class="empty">لا توجد دفعات</td></tr>`;
    const stt = rem<=0?'مكتمل':`قيد التقسيط (باقٍ ${money(rem)})`;
    return `<div class="blk"><div class="blk-h">${escapeHtml(mq.name)} — ${fmtMiqatDate(mq)} <span class="st">${stt}</span></div>
      <div class="sm">المتّفق عليه: <b>${money(ag)}</b> · المدفوع: <b class="paid">${money(pd)}</b> · المتبقّي: <b class="rem">${money(rem)}</b></div>
      <table><thead><tr><th>#</th><th>المبلغ</th><th>التاريخ</th><th>ملاحظة</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }).join('');
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>تقرير أقساط — ${escapeHtml(m.name)}</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:28px;color:#1a0a0a;}
    .pdf-logo{display:block;margin:0 auto 8px;max-width:210px;max-height:78px;}
    .pdf-head{border-bottom:2px solid #c19a3e;padding-bottom:12px;text-align:center;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin:6px 0 16px;}
    .info{font-size:14px;margin-bottom:14px;} .info b{color:#1c4536;}
    .grand{display:flex;justify-content:space-between;gap:10px;background:#f6f1e6;border:1px solid #e0dccf;border-radius:10px;padding:12px 14px;margin-bottom:18px;font-size:14px;font-weight:600;}
    .grand .paid{color:#2f8f5b;} .grand .rem{color:#b5763a;}
    .blk{margin-bottom:18px;} .blk-h{font-weight:700;color:#1c4536;border-right:3px solid #c19a3e;padding-right:8px;margin-bottom:6px;}
    .blk-h .st{font-weight:400;color:#94908a;font-size:12px;}
    .sm{font-size:12.5px;color:#555;margin-bottom:6px;} .sm .paid{color:#2f8f5b;} .sm .rem{color:#b5763a;}
    table{width:100%;border-collapse:collapse;font-size:13px;} th,td{border:1px solid #e0dccf;padding:7px 10px;text-align:right;} th{background:#123028;color:#fff;}
    td.empty{text-align:center;color:#94908a;}
    ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
    <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" /><div class="sub">تقرير الأقساط — ${hijriToday()}</div></div>
    <div class="info">العضو: <b>${escapeHtml(m.name)}</b> — رقم العضوية: <b>${memberCode(m)}</b></div>
    <div class="grand"><span>الإجمالي المتّفق عليه: ${money(grandAgreed)}</span><span class="paid">المدفوع: ${money(grandPaid)}</span><span class="rem">المتبقّي: ${money(grandRem)}</span></div>
    <div class="blk"><div class="blk-h">اشتراك العضوية <span class="st">${subStatus}</span></div>
      <div class="sm">الإجمالي: <b>${money(subTot)}</b> · المدفوع: <b class="paid">${money(subPaid)}</b> · المتبقّي: <b class="rem">${money(subRem)}</b></div>
      <table><thead><tr><th>#</th><th>المبلغ</th><th>التاريخ</th><th>ملاحظة</th></tr></thead><tbody>${subRows}</tbody></table></div>
    ${miqatBlocks}
    </body></html>`);
  w.document.close(); w.focus();
}

async function recordPayment(id){ const m=members.find(x=>x.id===id); if(!m) return;
  m.paymentDate=today(); m.expiryDate=addYear(m.paymentDate); m.paidAmount=settings.fee; m.feeTotal=Number(settings.fee)||0;
  m.payments=[{amount:Number(settings.fee)||0, date:today()}];
  m.hijriStartYear=settings.year||1448; m.hijriEndYear=(settings.year||1448)+1;
  await saveMembers(); toast('تم تسجيل الاشتراك — العضوية مفعّلة'); openCard(id); renderDashboard(); }
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
  await saveMembers(); await saveMiqats(); switchTab('members'); toast('تم الحذف'); renderMembers(); renderDashboard(); }

/* ═══════════ Membership card ═══════════ */
let cardMemberId=null;
function openCard(id){ const m=members.find(x=>x.id===id); if(!m) return; cardMemberId=id;
  $('#cardPreviewWrap').innerHTML=cardHTML(m); $('#cardModal').classList.add('open'); }
function cardHTML(m){
  const mms=memberMiqats(m);
  const miqatsBlock=mms.length?`<div style="margin-top:16px;background:rgba(255,255,255,.06);border-radius:12px;padding:12px 16px;">
      <div style="font-size:11px;color:#d4b877;letter-spacing:2px;font-weight:600;margin-bottom:8px;">المواقيت</div>
      ${mms.map(mq=>`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13.5px;"><span style="color:#f2e6cf;">${escapeHtml(mq.name)}</span><span style="color:#e8c66a;font-weight:600;">${fmtMiqatDate(mq)}</span></div>`).join('')}</div>`:'';
  const photoBlock=m.photo?`<div style="width:64px;height:64px;border-radius:50%;overflow:hidden;border:2px solid #c19a3e;flex-shrink:0;"><img src="${m.photo}" alt="" style="width:100%;height:100%;object-fit:cover;" /></div>`:'';
  const birthRow=(m.isMinor&&m.birthdate)?`<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);"><span style="color:#c9a86a;font-size:14px;">تاريخ الميلاد</span><span style="font-weight:600;color:#fff;font-size:15px;">${fmtDate(m.birthdate)}</span></div>`:'';
  return `<div class="id-card" id="printableCard" style="width:100%;max-width:410px;background:#123028;border-radius:20px;padding:10px;box-shadow:0 20px 50px rgba(18,48,40,.3);font-family:var(--font-sans);">
    <div style="border:2px solid #c19a3e;border-radius:14px;padding:24px 22px;">
      <div style="text-align:center;padding-bottom:18px;border-bottom:1px solid rgba(184,147,74,.35);">
        <img src="${HAIAA_LOGO_WHITE}" alt="هيئة محبي الحسين" style="max-height:76px;max-width:85%;" />
      </div>
      <div style="display:flex;align-items:center;gap:14px;justify-content:center;padding:18px 0 6px;">
        ${photoBlock}
        <div style="text-align:center;">
          <div style="font-size:12px;color:#d4b877;letter-spacing:3px;">رقم العضوية</div>
          <div style="font-size:30px;font-weight:800;color:#fff;letter-spacing:2px;line-height:1.1;">${memberCode(m)}</div>
          <div style="margin-top:6px;display:inline-block;padding:3px 14px;border-radius:20px;background:rgba(184,147,74,.25);color:#e8c66a;font-size:12px;font-weight:700;">${m.type}</div>
        </div>
      </div>
      <div style="background:rgba(255,255,255,.06);border-radius:12px;padding:6px 18px;margin-top:14px;">
        <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);"><span style="color:#c9a86a;font-size:14px;">الاسم</span><span style="font-weight:700;color:#fff;font-size:15.5px;">${escapeHtml(m.name)}</span></div>
        ${birthRow}
        <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);"><span style="color:#c9a86a;font-size:14px;">بداية العضوية</span><span style="font-weight:600;color:#f2e6cf;font-size:14.5px;">${fmtHijriStart(m)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:12px 0;"><span style="color:#c9a86a;font-size:14px;">صالحة حتى</span><span style="font-weight:700;color:#e8c66a;font-size:14.5px;">${fmtHijriEnd(m)}</span></div>
      </div>
      ${miqatsBlock}
      <div style="margin-top:16px;padding:14px 16px;background:rgba(184,147,74,.12);border-right:3px solid #c19a3e;border-radius:8px;text-align:center;color:#f2e6cf;font-size:13.5px;line-height:1.8;">
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
      .bar{display:flex;gap:8px;justify-content:center;padding:12px;background:#123028;margin:0 -20px 28px;}
      .bar button{font-family:inherit;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;border:1px solid #c19a3e;background:transparent;color:#f2e6cf;cursor:pointer;}
      .bar button:first-child{background:#c19a3e;color:#123028;}
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
    const bookers=(mq.bookings||[]).map(b=>{ const fam=b.familyName?' 👪':'';
      return `<div class="booker-line"><span>${escapeHtml(bookingName(b))}${fam} <span style="color:var(--muted)">${escapeHtml(bookingSubtitle(b))}</span></span>
        <span><span class="bl-amt">${fmtBooking(b)}</span> <button class="bl-del" onclick="removeBooking('${mq.id}','${b.memberId}')">×</button></span></div>`; }).join('');
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
      <div class="mc-row" onclick="showMiqatDetail('${mq.id}')">
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
  if(!confirm(`حذف ميقات «${mq.name}»؟`)) return; miqats=miqats.filter(x=>x.id!==id); await saveMiqats(); renderMiqats(); if(isFullPageOpen('miqatpage')) switchTab('miqats'); toast('تم الحذف'); }
function openBooking(miqatId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  $('#bookingMiqatId').value=miqatId; $('#bookingSub').textContent=`${mq.name} · ${fmtMiqatDate(mq)}`;
  $('#bookingMember').innerHTML=members.slice().sort((a,b)=>a.number-b.number).map(m=>`<option value="${m.id}">${escapeHtml(m.name)} — ${memberCode(m)}</option>`).join('');
  if(!members.length){ toast('أضف أعضاء أولاً'); return; }
  contribInit('booking'); const bi=$('#bookingInitPaid'); if(bi) bi.value='';
  $('#bookingModal').classList.add('open');
}
/* ═══ محرّر بنود المساهمة (متعدّد: نقدي/عيني بقيمة تقديرية) ═══ */
const contribState = { booking: [], edit: [] };
function contribInit(ctx){ contribState[ctx]=[{kind:'نقدي', other:'', value:''}]; contribRender(ctx); }
function contribAdd(ctx){ contribState[ctx].push({kind:'نقدي', other:'', value:''}); contribRender(ctx); }
function contribRemove(ctx,i){ contribState[ctx].splice(i,1); if(!contribState[ctx].length) contribState[ctx].push({kind:'نقدي',other:'',value:''}); contribRender(ctx); }
function contribSetKind(ctx,i,v){ contribState[ctx][i].kind=v; contribRender(ctx); }
function contribSetOther(ctx,i,v){ contribState[ctx][i].other=v; }
function contribSetValue(ctx,i,v){ contribState[ctx][i].value=v; contribTotalUpdate(ctx); if(String(ctx).startsWith('reg_')) regPreviewUpdate(ctx); }
function contribItems(ctx){
  return (contribState[ctx]||[]).map(it=>{
    let kind = it.kind==='أخرى' ? (it.other||'').trim()||'أخرى' : it.kind;
    return { kind, value: parseFloat(it.value)||0 };
  }).filter(it=> it.value>0 || (it.kind && it.kind!=='نقدي'));
}
function contribTotal(ctx){ return (contribState[ctx]||[]).reduce((s,it)=>s+(parseFloat(it.value)||0),0); }
function contribBox(ctx){ return document.querySelector('.contrib-editor[data-ctx="'+ctx+'"]'); }
function contribTotalUpdate(ctx){ const el=document.querySelector('[data-total="'+ctx+'"]'); if(el) el.textContent=fmtMoney(contribTotal(ctx)); }
function contribRender(ctx){
  const box=contribBox(ctx); if(!box) return;
  const rows=(contribState[ctx]||[]).map((it,i)=>`
    <div class="contrib-row">
      <select onchange="contribSetKind('${ctx}',${i},this.value)">${contribKindOptions(it.kind)}</select>
      ${it.kind==='أخرى'?`<input type="text" class="contrib-other" placeholder="النوع" value="${(it.other||'').replace(/"/g,'&quot;')}" oninput="contribSetOther('${ctx}',${i},this.value)">`:''}
      <input type="number" class="contrib-val" min="0" step="0.001" placeholder="القيمة" value="${it.value}" oninput="contribSetValue('${ctx}',${i},this.value)">
      <button type="button" class="contrib-del" onclick="contribRemove('${ctx}',${i})" title="حذف البند">×</button>
    </div>`).join('');
  box.innerHTML = `${rows}
    <div class="contrib-foot">
      <button type="button" class="btn btn-ghost btn-sm" onclick="contribAdd('${ctx}')">➕ بند آخر</button>
      <span class="contrib-total">الإجمالي: <b data-total="${ctx}">${fmtMoney(contribTotal(ctx))}</b></span>
    </div>`;
}

async function saveBooking(){
  const miqatId=$('#bookingMiqatId').value; const memberId=$('#bookingMember').value;
  const items=contribItems('booking'); const amount=items.reduce((s,i)=>s+i.value,0);
  if(!items.length){ toast('أدخل بنداً واحداً على الأقل'); return; }
  const initRaw=$('#bookingInitPaid').value; const initPaid = initRaw==='' ? 0 : Math.max(0, Math.min(amount, parseFloat(initRaw)||0));
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  mq.bookings=mq.bookings||[]; const existing=mq.bookings.find(b=>b.memberId===memberId);
  if(existing){
    existing.items=[...bookingItems(existing).filter(x=>(Number(x.value)||0)>0||x.kind!=='نقدي'), ...items];
    existing.amount=(Number(existing.amount)||0)+amount;
    if(!Array.isArray(existing.payments)) existing.payments=[{amount:Number(existing.amount)-amount, date:today()}];
    if(initPaid>0) existing.payments.push({amount:initPaid, date:today()});
  } else {
    mq.bookings.push({memberId, amount, items, payments: initPaid>0?[{amount:initPaid, date:today()}]:[]});
  }
  await saveMiqats(); closeModal('bookingModal'); renderMiqats(); renderRecentMembers(); renderDashboard(); toast('تم إضافة الحجز');
}
async function removeBooking(miqatId,memberId){ const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  if(!confirm('إزالة حجز هذا العضو؟')) return; mq.bookings=mq.bookings.filter(b=>b.memberId!==memberId); await saveMiqats(); renderMiqats(); }

/* ═══ الميقات العائلي ═══ */
function bookingName(b){ if(b&&b.familyName) return b.familyName; const m=members.find(x=>x.id===b.memberId); return m?m.name:'—'; }
function bookingSubtitle(b){ if(b&&b.familyName) return b.repName?('ممثّلها: '+b.repName):'عائلة'; const m=members.find(x=>x.id===b.memberId); return m?memberCode(m):''; }
function bookingPhone(b){ if(b&&b.phone) return b.phone; const m=members.find(x=>x.id===b.memberId); return m?m.phone:''; }
let famEditRef=null;
function showFamilyTab(id){ $$('.tab-content').forEach(c=>c.style.display='none'); $('#'+id).style.display='block'; window.scrollTo({top:0,behavior:'smooth'}); }
function backFromFamily(){ $$('.tab-content').forEach(c=>c.style.display='none'); $('#tab-miqats').style.display='block'; renderMiqats(); window.scrollTo({top:0}); }
function openFamilyBooking(){
  famEditRef=null;
  if(!miqats.length){ toast('أضف مواقيت أولاً'); return; }
  $('#famFormTitle').textContent='👪 ميقات عائلي';
  $('#famName').value=''; $('#famRep').value=''; $('#famPhone').value=''; $('#famInitPaid').value=''; $('#famInitPaid').style.display='none';
  const r=document.querySelector('input[name="pm_family"][value="full"]'); if(r) r.checked=true;
  const pmf=document.querySelector('#tab-family .paymode-field'); if(pmf) pmf.style.display='';
  const cc=$('#famCountryCode'); if(cc&&!cc.value) cc.value='973';
  $('#famMiqat').innerHTML=miqatsByNearest().map(mq=>`<option value="${mq.id}">${escapeHtml(mq.name)} — ${fmtMiqatDate(mq)}</option>`).join('');
  contribInit('family');
  showFamilyTab('tab-family');
}
function editFamilyBooking(miqatId, memberId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  famEditRef={miqatId, memberId};
  $('#famFormTitle').textContent='✏️ تعديل ميقات عائلي';
  $('#famName').value=b.familyName||''; $('#famRep').value=b.repName||'';
  const sp=splitPhone(b.phone||''); $('#famCountryCode').value=sp.code||'973'; $('#famPhone').value=sp.local||'';
  $('#famMiqat').innerHTML=miqatsByNearest().map(m=>`<option value="${m.id}"${m.id===miqatId?' selected':''}>${escapeHtml(m.name)} — ${fmtMiqatDate(m)}</option>`).join('');
  const its=bookingItems(b).map(it=>({kind:(CONTRIB_KINDS.includes(it.kind)?it.kind:'أخرى'), other:(CONTRIB_KINDS.includes(it.kind)?'':it.kind), value:it.value}));
  contribState['family']=its.length?its:[{kind:'نقدي',other:'',value:''}]; contribRender('family');
  const pmf=document.querySelector('#tab-family .paymode-field'); if(pmf) pmf.style.display='none';
  showFamilyTab('tab-family');
}
function famPayMode(mode){ const inp=$('#famInitPaid'); if(inp){ inp.style.display=mode==='inst'?'block':'none'; if(mode==='full') inp.value=''; } }
async function saveFamilyBooking(){
  const familyName=$('#famName').value.trim();
  const miqatId=$('#famMiqat').value;
  const repName=$('#famRep').value.trim();
  const phoneLocal=toEnglishDigits($('#famPhone').value).replace(/\D/g,'');
  const cc=$('#famCountryCode').value||'973';
  if(!familyName){ toast('أدخل اسم العائلة'); return; }
  if(!miqatId){ toast('اختر الميقات'); return; }
  if(!repName){ toast('أدخل اسم ممثّل العائلة'); return; }
  if(!phoneLocal){ toast('أدخل رقم هاتف الممثّل'); return; }
  const items=contribItems('family'); const amount=items.reduce((s,i)=>s+i.value,0);
  if(!items.length){ toast('أدخل بند مساهمة واحداً على الأقل'); return; }
  const phone='+'+cc+phoneLocal;

  if(famEditRef){ // ═══ تعديل ═══
    const oldMq=miqats.find(x=>x.id===famEditRef.miqatId);
    const b=oldMq&&(oldMq.bookings||[]).find(x=>x.memberId===famEditRef.memberId);
    if(!b){ toast('تعذّر إيجاد الحجز'); return; }
    b.familyName=familyName; b.repName=repName; b.phone=phone; b.items=items; b.amount=amount;
    if(miqatId!==famEditRef.miqatId){ // نُقل إلى ميقات آخر
      oldMq.bookings=oldMq.bookings.filter(x=>x.memberId!==famEditRef.memberId);
      const newMq=miqats.find(x=>x.id===miqatId); newMq.bookings=newMq.bookings||[]; newMq.bookings.push(b);
    }
    await saveMiqats(); renderMiqats(); renderDashboard();
    toast('تم حفظ التعديل'); openFamilyList(); return;
  }

  // ═══ إضافة ═══
  const pmSel=document.querySelector('input[name="pm_family"]:checked'); const payMode=pmSel?pmSel.value:'full';
  const initPaid = payMode==='inst' ? Math.max(0, Math.min(amount, parseFloat($('#famInitPaid').value)||0)) : 0;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  mq.bookings=mq.bookings||[];
  mq.bookings.push({ memberId:'fam_'+Date.now(), onBehalf:'family', familyName, repName, phone, amount, items, payMode, payments: initPaid>0?[{amount:initPaid, date:today()}]:[] });
  await saveMiqats(); renderMiqats(); renderDashboard();
  toast('تم حفظ الميقات العائلي'); showFamilyTab('tab-familyList'); renderFamilyList();
}
async function deleteFamilyBooking(miqatId, memberId){
  if(!confirm('حذف هذا الحجز العائلي وكل دفعاته؟')) return;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  mq.bookings=(mq.bookings||[]).filter(b=>b.memberId!==memberId);
  await saveMiqats(); renderMiqats(); renderDashboard(); renderFamilyList();
  toast('تم حذف الحجز العائلي');
}
function openFamilyList(){ const s=$('#famSearch'); if(s) s.value=''; showFamilyTab('tab-familyList'); renderFamilyList(); }
function renderFamilyList(){
  const body=$('#famListBody'); const sum=$('#famListSummary'); if(!body) return;
  const q=($('#famSearch')?$('#famSearch').value:'').trim().toLowerCase();
  let all=[]; miqats.forEach(mq=>(mq.bookings||[]).forEach(b=>{ if(b.familyName) all.push({mq,b}); }));
  const totAgreed=all.reduce((s,x)=>s+bookingAgreed(x.b),0), totPaid=all.reduce((s,x)=>s+bookingPaid(x.b),0);
  if(sum) sum.innerHTML=`<div class="fs-item"><b>${all.length}</b>عائلة</div><div class="fs-item"><b>${fmtMoney(totAgreed)}</b>المتّفق</div><div class="fs-item paid"><b>${fmtMoney(totPaid)}</b>المُحصّل</div><div class="fs-item rem"><b>${fmtMoney(Math.max(0,totAgreed-totPaid))}</b>المتبقّي</div>`;
  let list=all;
  if(q) list=all.filter(x=> (x.b.familyName||'').toLowerCase().includes(q) || (x.b.repName||'').toLowerCase().includes(q));
  if(!list.length){ body.innerHTML=`<div class="fam-empty">${all.length?'لا نتائج مطابقة':'لا توجد حجوزات عائلية بعد'}</div>`; return; }
  list.sort((a,b)=> bookingRemaining(b.b)-bookingRemaining(a.b));
  body.innerHTML=list.map(({mq,b})=>{
    const ag=bookingAgreed(b), pd=bookingPaid(b), rem=bookingRemaining(b);
    const pct=ag>0?Math.min(100,Math.round(pd/ag*100)):(pd>0?100:0);
    const key=mq.id+'__'+b.memberId; const open=famExpanded.has(key);
    return `<div class="fam-card">
      <div class="fc-head" onclick="toggleFamCard('${key}')">
        <div class="fc-name">👪 ${escapeHtml(b.familyName)}</div>
        <span class="fc-chev">${open?'▲':'▼'}</span>
      </div>
      <div class="fc-details" style="display:${open?'block':'none'}">
        <div class="fc-rep">الممثّل: ${escapeHtml(b.repName||'—')} · ${escapeHtml(b.phone||'')}</div>
        <div class="fc-miqat">🕯️ ${escapeHtml(mq.name)} · ${fmtMiqatDate(mq)}</div>
        <div class="fc-contrib">${fmtBooking(b)}</div>
        <div class="fc-bar"><span style="width:${pct}%"></span></div>
        <div class="fc-nums"><span class="paid">مُحصّل ${fmtMoney(pd)}</span><span>${rem>0?`متّفق ${fmtMoney(ag)} · <span class="rem">متبقّي ${fmtMoney(rem)}</span>`:'مكتمل ✓'}</span></div>
        <div class="fc-btns">
          <button class="fb-edit" onclick="editFamilyBooking('${mq.id}','${b.memberId}')">✏️ تعديل</button>
          <button class="fb-pay" onclick="openBookingPayment('${mq.id}','${b.memberId}')">➕ أقساط</button>
          <button class="fb-wa" onclick="sendFamilyMiqatReminder('${mq.id}','${b.memberId}')">💬 تذكير</button>
          <button class="fb-del" onclick="deleteFamilyBooking('${mq.id}','${b.memberId}')">🗑 حذف</button>
        </div>
        <button class="fb-pdf" onclick="printOneFamilyReport('${mq.id}','${b.memberId}')">🧾 تقرير هذه العائلة (PDF)</button>
      </div>
    </div>`;
  }).join('');
}
let famExpanded=new Set();
function toggleFamCard(key){ if(famExpanded.has(key)) famExpanded.delete(key); else famExpanded.add(key); renderFamilyList(); }

/* تقرير PDF لعائلة واحدة (تفصيلي) */
function printOneFamilyReport(miqatId, memberId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  const ag=bookingAgreed(b), rec=(bookingHasReceipt(b)?Number(b.received)||0:null);
  const diff = rec!=null ? rec-ag : null;
  const itemsRows = bookingItems(b).map((it,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(it.kind||'نقدي')}</td><td>${fmtMoney(it.value)}</td></tr>`).join('');
  const recLine = rec!=null
    ? `<div class="sm">المستلَم فعلاً: <b class="paid">${fmtMoney(rec)}</b> · الفرق: <b class="${diff>=0?'paid':'rem'}">${diff>0?'+':''}${fmtMoney(diff)}</b>${b.receivedDate?` · بتاريخ ${fmtDate(b.receivedDate)}`:''}${b.receivedNote?` · ${escapeHtml(b.receivedNote)}`:''}</div>`
    : `<div class="sm">لم يُسجَّل استلام بعد (يُحسب المتّفق عليه)</div>`;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>تقرير عائلة — ${escapeHtml(b.familyName)}</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:30px;color:#1a0a0a;}
    .pdf-logo{display:block;margin:0 auto 8px;max-width:210px;max-height:78px;}
    .pdf-head{border-bottom:2px solid #c19a3e;padding-bottom:12px;text-align:center;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin:6px 0 16px;}
    .card{border:1px solid #e0dccf;border-radius:12px;padding:16px 18px;}
    .fname{font-family:'Amiri',serif;font-size:20px;color:#1c4536;margin-bottom:4px;}
    .row{font-size:14px;margin:5px 0;} .row b{color:#1c4536;}
    .sm{font-size:13px;color:#555;margin:6px 0;} .sm .paid{color:#2f8f5b;} .sm .rem{color:#b5763a;}
    table{width:100%;border-collapse:collapse;font-size:13px;margin-top:12px;} th,td{border:1px solid #e0dccf;padding:8px 10px;text-align:right;} th{background:#123028;color:#fff;}
    .totrow{margin-top:12px;font-size:15px;font-weight:600;display:flex;justify-content:space-between;border-top:2px solid #c19a3e;padding-top:10px;}
    ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
    <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" /><div class="sub">تقرير حجز عائلي — ${hijriToday()}</div></div>
    <div class="card">
      <div class="fname">👪 ${escapeHtml(b.familyName)}</div>
      <div class="row">ممثّل العائلة: <b>${escapeHtml(b.repName||'—')}</b></div>
      <div class="row">رقم الهاتف: <b>${escapeHtml(b.phone||'—')}</b></div>
      <div class="row">الميقات: <b>${escapeHtml(mq.name)}</b> — ${fmtMiqatDate(mq)}${mq.requiredAmount?` · سعر الميقات: ${fmtMoney(mq.requiredAmount)}`:''}</div>
      <table><thead><tr><th>#</th><th>نوع البند</th><th>القيمة</th></tr></thead><tbody>${itemsRows}</tbody></table>
      <div class="totrow"><span>المتّفق عليه</span><span>${fmtMoney(ag)}</span></div>
      ${recLine}
    </div>
    </body></html>`);
  w.document.close(); w.focus();
}

/* تقرير PDF لكل الحجوزات العائلية */
function printFamilyReport(){
  let all=[]; miqats.forEach(mq=>(mq.bookings||[]).forEach(b=>{ if(b.familyName) all.push({mq,b}); }));
  if(!all.length){ toast('لا توجد حجوزات عائلية'); return; }
  all.sort((a,b)=> bookingRemaining(b.b)-bookingRemaining(a.b));
  const totAgreed=all.reduce((s,x)=>s+bookingAgreed(x.b),0), totPaid=all.reduce((s,x)=>s+bookingPaid(x.b),0);
  const blocks=all.map(({mq,b})=>{
    const ag=bookingAgreed(b), pd=bookingPaid(b), rem=bookingRemaining(b);
    const pays=Array.isArray(b.payments)?b.payments:[];
    const prows=pays.length?pays.map((p,i)=>`<tr><td>${i+1}</td><td>${fmtMoney(p.amount)}</td><td>${p.date?fmtDate(p.date):''}</td><td>${escapeHtml(p.note||'')}</td></tr>`).join(''):`<tr><td colspan="4" class="empty">لا توجد دفعات مستلَمة</td></tr>`;
    return `<div class="blk"><div class="blk-h">👪 ${escapeHtml(b.familyName)} <span class="st">${rem<=0?'مكتمل':'متبقّي '+fmtMoney(rem)}</span></div>
      <div class="sm">الممثّل: ${escapeHtml(b.repName||'—')} · ${escapeHtml(b.phone||'')}</div>
      <div class="sm">الميقات: ${escapeHtml(mq.name)} — ${fmtMiqatDate(mq)} · المساهمة: ${fmtBooking(b)}</div>
      <div class="sm">المتّفق: <b>${fmtMoney(ag)}</b> · المُحصّل: <b class="paid">${fmtMoney(pd)}</b> · المتبقّي: <b class="rem">${fmtMoney(rem)}</b></div>
      <table><thead><tr><th>#</th><th>المبلغ المستلَم</th><th>التاريخ</th><th>ملاحظة</th></tr></thead><tbody>${prows}</tbody></table></div>`;
  }).join('');
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>تقرير الحجوزات العائلية</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:28px;color:#1a0a0a;}
    .pdf-logo{display:block;margin:0 auto 8px;max-width:210px;max-height:78px;}
    .pdf-head{border-bottom:2px solid #c19a3e;padding-bottom:12px;text-align:center;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin:6px 0 16px;}
    .grand{display:flex;justify-content:space-between;gap:10px;background:#f6f1e6;border:1px solid #e0dccf;border-radius:10px;padding:12px 14px;margin-bottom:18px;font-size:14px;font-weight:600;}
    .grand .paid{color:#2f8f5b;} .grand .rem{color:#b5763a;}
    .blk{margin-bottom:18px;} .blk-h{font-weight:700;color:#1c4536;border-right:3px solid #c19a3e;padding-right:8px;margin-bottom:6px;}
    .blk-h .st{font-weight:400;color:#94908a;font-size:12px;}
    .sm{font-size:12.5px;color:#555;margin-bottom:4px;} .sm .paid{color:#2f8f5b;} .sm .rem{color:#b5763a;}
    table{width:100%;border-collapse:collapse;font-size:13px;margin-top:6px;} th,td{border:1px solid #e0dccf;padding:7px 10px;text-align:right;} th{background:#123028;color:#fff;} td.empty{text-align:center;color:#94908a;}
    ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
    <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" /><div class="sub">تقرير الحجوزات العائلية — ${hijriToday()}</div></div>
    <div class="grand"><span>عدد العائلات: ${all.length}</span><span>إجمالي المتّفق: ${fmtMoney(totAgreed)}</span><span class="paid">المُحصّل: ${fmtMoney(totPaid)}</span><span class="rem">المتبقّي: ${fmtMoney(Math.max(0,totAgreed-totPaid))}</span></div>
    ${blocks}
    </body></html>`);
  w.document.close(); w.focus();
}

/* شريط أزرار داخل نافذة الطباعة (لا يظهر في الـ PDF) */
const PRINT_BAR = `
  <div class="no-print bar">
    <button onclick="window.print()">🖨️ حفظ / طباعة PDF</button>
    <button onclick="window.close()">← الرئيسية</button>
  </div>`;
const PRINT_BAR_CSS = `
  .bar{position:sticky;top:0;display:flex;gap:8px;justify-content:center;padding:12px;background:#123028;margin:-30px -30px 24px;}
  .bar button{font-family:inherit;font-size:14px;font-weight:600;padding:10px 18px;border-radius:8px;border:1px solid #c19a3e;background:transparent;color:#f2e6cf;cursor:pointer;}
  .bar button:first-child{background:#c19a3e;color:#123028;}
  @media print{ .no-print{display:none !important;} body{padding-top:0 !important;} }`;

function printMiqats(status){
  const list=miqatsByNearest().filter(mq=>miqatStatus(mq)===status);
  const titleMap={red:'المواقيت غير المحجوزة', yellow:'المواقيت التي تحتاج تعزيز', green:'المواقيت المحجوزة'};
  // تحتاج تعزيز + غير محجوزة: اسم المناسبة + المبلغ المطلوب لإكمالها. المحجوزة: الاسم فقط.
  const needsAmount = (status==='yellow' || status==='red');
  const head = needsAmount
    ? '<tr><th>المناسبة</th><th>المطلوب لإكمال المبلغ</th></tr>'
    : '<tr><th>المناسبة</th></tr>';
  const rows = list.map(mq=>{
    if(!needsAmount) return `<tr><td>${escapeHtml(mq.name)}</td></tr>`;
    const rem=Math.max(0, (Number(mq.requiredAmount)||0) - miqatEffective(mq));
    return `<tr><td>${escapeHtml(mq.name)}</td><td class="amt">${fmtMoney(rem)}</td></tr>`;
  }).join('');
  const cols = needsAmount?2:1;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${titleMap[status]}</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:30px;color:#1a0a0a;}
    .pdf-logo{display:block;margin:0 auto 8px;max-width:240px;max-height:85px;width:auto;height:auto;}
    .pdf-head{border-bottom:2px solid #c19a3e;padding-bottom:12px;text-align:center;}
    h1{font-family:'Amiri',serif;color:#1c4536;text-align:center;margin:0;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:20px;} table{width:100%;border-collapse:collapse;font-size:14px;} th,td{border:1px solid #e0dccf;padding:10px 12px;text-align:right;} th{background:#123028;color:#fff;} tr:nth-child(even){background:#faf7f2;} td.amt{color:#b5763a;font-weight:600;white-space:nowrap;}
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
  renderPhoneDirectory();
}
/* ═══ دليل الأرقام (أعضاء + ممثّلو العوائل) بلا تكرار — يُفضَّل رقم العضو ═══ */
function buildPhoneDirectory(){
  const map=new Map();
  members.forEach(m=>{ if(m.phone && !map.has(m.phone)) map.set(m.phone,{name:m.name||'—', phone:m.phone, kind:'عضو'}); });
  miqats.forEach(mq=>(mq.bookings||[]).forEach(b=>{ if(b.familyName && b.phone && !map.has(b.phone)) map.set(b.phone,{name:b.repName||b.familyName, phone:b.phone, kind:'ممثّل عائلة'}); }));
  return [...map.values()].sort((a,b)=> (a.name||'').localeCompare(b.name||'','ar'));
}
function renderPhoneDirectory(){
  const box=$('#phoneDirList'); if(!box) return;
  const all=buildPhoneDirectory();
  const totEl=$('#dirTotal'); if(totEl) totEl.innerHTML=`مجموع الأرقام: <b>${all.length}</b>`;
  const q=($('#dirSearch')?.value||'').trim().toLowerCase();
  if(!q){ box.innerHTML=''; return; }  // لا تُعرض القائمة إلا عند البحث
  const list=all.filter(x=> (x.name||'').toLowerCase().includes(q) || (x.phone||'').includes(q));
  if(!list.length){ box.innerHTML=`<div class="fam-empty">لا نتائج مطابقة</div>`; return; }
  box.innerHTML=list.map(x=>`<div class="dir-row">
      <div class="dir-name">${escapeHtml(x.name)} <span class="dir-kind ${x.kind==='عضو'?'k-m':'k-f'}">${x.kind}</span></div>
      <a href="${whatsappLink(x.phone)}" target="_blank" class="dir-phone" dir="ltr">${escapeHtml(x.phone)}</a>
    </div>`).join('');
}
function printPhoneDirectory(){
  const list=buildPhoneDirectory();
  if(!list.length){ toast('لا توجد أرقام'); return; }
  const rows=list.map((x,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(x.name)}</td><td>${escapeHtml(x.kind)}</td><td dir="ltr" style="text-align:left">${escapeHtml(x.phone)}</td></tr>`).join('');
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>دليل الأرقام</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:28px;color:#1a0a0a;}
    .pdf-logo{display:block;margin:0 auto 8px;max-width:210px;max-height:78px;}
    .pdf-head{border-bottom:2px solid #c19a3e;padding-bottom:12px;text-align:center;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin:6px 0 16px;}
    table{width:100%;border-collapse:collapse;font-size:13.5px;} th,td{border:1px solid #e0dccf;padding:8px 11px;text-align:right;} th{background:#123028;color:#fff;}
    tr:nth-child(even){background:#faf7f0;}
    ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
    <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" /><div class="sub">دليل الأرقام — ${list.length} رقماً · ${hijriToday()}</div></div>
    <table><thead><tr><th>#</th><th>الاسم</th><th>الصفة</th><th>رقم الهاتف</th></tr></thead><tbody>${rows}</tbody></table>
    </body></html>`);
  w.document.close(); w.focus();
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
  const backup={ app:'هيئة محبي الحسين', version:8, exportedAt:new Date().toISOString(), members, miqats, news, settings, meetings, assemblies, photos };
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
    members=backup.members||[]; miqats=backup.miqats||[]; news=backup.news||[]; meetings=backup.meetings||[]; assemblies=backup.assemblies||[]; photos=backup.photos||[];
    if(backup.settings) settings={...settings,...backup.settings, counters:{...settings.counters,...(backup.settings.counters||{})}, templates:{...settings.templates,...(backup.settings.templates||{})}};
    await saveMembers(); await saveMiqats(); await storage.set('news',JSON.stringify(news)); await saveMeetings(); await saveAssemblies(); await savePhotos(); await persistSettings();
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
  else if(which==='media'){ idaraShow('media'); renderAlbum(); }
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
    .pdf-header{text-align:center;padding-bottom:18px;margin-bottom:8px;border-bottom:3px double #c19a3e;}
    .doc-title{text-align:center;font-family:'Amiri',serif;font-size:26px;font-weight:700;color:#1c4536;margin:14px 0 4px;}
    .doc-sub{text-align:center;color:#8a7d75;font-size:15px;margin-bottom:26px;letter-spacing:.3px;}
    .info-card{background:#faf6ef;border:1px solid #ece3d4;border-radius:14px;padding:18px 22px;margin-bottom:28px;}
    .info{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px;font-size:16px;}
    .info .item{display:flex;flex-direction:column;gap:2px;}
    .info .lbl{color:#a08d7a;font-size:13px;font-weight:600;}
    .info .val{color:#241412;font-weight:600;font-size:16.5px;}
    h2{font-size:19px;color:#fff;background:#1c4536;display:inline-block;padding:7px 18px 7px 22px;border-radius:0 20px 20px 0;margin:34px 0 14px;box-shadow:0 2px 6px rgba(18,48,40,.2);}
    h2 .cnt{opacity:.75;font-size:15px;font-weight:400;}
    .txt{white-space:pre-wrap;font-size:16.5px;line-height:1.9;background:#fbf9f5;border:1px solid #ece3d4;border-right:4px solid #c19a3e;border-radius:10px;padding:16px 20px;color:#33201d;}
    ol{margin:0;padding-right:26px;} li{margin-bottom:9px;font-size:16.5px;line-height:1.75;}
    li b{color:#1c4536;}
    .muted{color:#a08d7a;font-size:15px;font-style:italic;}
    .cols{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:6px;}
    .att-box{background:#fbf9f5;border:1px solid #ece3d4;border-radius:12px;padding:14px 18px;}
    .att-box .att-head{font-weight:700;font-size:16px;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #ece3d4;}
    .att-box.present .att-head{color:#2f6b34;} .att-box.absent .att-head{color:#a12b2b;}
    .att-box ul{list-style:none;margin:0;padding:0;} .att-box li{padding:6px 0;border-bottom:1px solid #f0eae0;font-size:16px;}
    .att-box li:last-child{border-bottom:none;}
    .att-box li::before{content:'•';color:#c19a3e;margin-left:8px;font-weight:700;}
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
    h1{font-family:'Amiri',serif;color:#1c4536;text-align:center;border-bottom:2px solid #c19a3e;padding-bottom:12px;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:20px;}
    .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;}
    .c{border:1px solid #e0dccf;border-radius:10px;padding:16px;text-align:center;} .c .n{font-size:26px;font-weight:700;color:#1c4536;} .c .l{font-size:12px;color:#94908a;margin-top:4px;}
    h2{font-size:15px;color:#1c4536;} table{width:100%;border-collapse:collapse;font-size:14px;} th,td{border:1px solid #e0dccf;padding:9px 12px;text-align:right;} th{background:#123028;color:#fff;} tr:nth-child(even){background:#faf7f2;}
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
    .pdf-head{border-bottom:2px solid #c19a3e;padding-bottom:12px;margin-bottom:4px;text-align:center;}
    h1{font-family:'Amiri',serif;color:#1c4536;text-align:center;margin:0;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:24px;}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 24px;}
    .f{display:flex;flex-direction:column;} .f.full{grid-column:1/-1;} label{font-size:13px;font-weight:600;color:#3a2a28;}
    .checks{display:flex;gap:24px;margin-top:8px;font-size:14px;flex-wrap:wrap;} .box{display:inline-block;width:16px;height:16px;border:1.5px solid #1c4536;border-radius:3px;vertical-align:middle;margin-left:6px;}
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
    h1{font-family:'Amiri',serif;color:#1c4536;text-align:center;border-bottom:2px solid #c19a3e;padding-bottom:12px;margin-bottom:4px;}
    .sub{text-align:center;color:#94908a;font-size:13px;margin-bottom:22px;}
    h2{font-family:'Amiri',serif;font-size:20px;color:#1c4536;border-right:3px solid #c19a3e;padding-right:10px;margin:24px 0 8px;}
    h3{font-size:14px;color:#5c1616;margin:12px 0 4px;}
    .txt{white-space:pre-wrap;font-size:14px;background:#faf7f2;border:1px solid #e0dccf;border-radius:8px;padding:10px 12px;}
    .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:6px 0;}
    .c{border:1px solid #e0dccf;border-radius:10px;padding:14px 8px;text-align:center;} .c .n{font-size:26px;font-weight:700;color:#1c4536;} .c .l{font-size:11px;color:#94908a;margin-top:3px;}
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
  const fam=$('#famCountryCode'); if(fam){ fam.innerHTML=opts; fam.value='973'; }
}
(async ()=>{
  await loadData();
  applyDarkMode();
  fillHeaderDates();
  fillCountrySelects();
  renderDashboard();
  renderMembers();
  fillSettings();
  updateNotifBadge();
})();

/* Service worker for offline use */
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{ navigator.serviceWorker.register('service-worker.js').catch(()=>{}); });
}
