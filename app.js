/* ═══════════════════════════════════════════════════════════
   هيئة محبي الحسين — نظام العضويات (PWA, يعمل دون إنترنت)
   ═══════════════════════════════════════════════════════════ */

/* ═══════════ مكتبة الأيقونات الخطّية ═══════════ */
const ICONS = {
  home:'<path d="M3 10.5L12 3l9 7.5"/><path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/>',
  users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16.5 7.2a2.8 2.8 0 0 1 0 5.6"/><path d="M18 19.8c0-2.4-.9-4.2-2.4-5.3"/>',
  user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  building:'<path d="M4 21V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15"/><path d="M13 10h6a1 1 0 0 1 1 1v10"/><path d="M2 21h20M7 9h2M7 13h2M7 17h2M16 14h1M16 18h1"/>',
  settings:'<circle cx="12" cy="12" r="3.2"/><path d="M19.1 14.6a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-3-1.2l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0-1.2-2.9H2.4a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.2-3l-.1-.1A2 2 0 1 1 6.6 4l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.6V2.4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 3 1.2l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0 1.2 3h.2a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z"/>',
  wallet:'<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="17" cy="14.5" r="1.3"/>',
  money:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M14.5 9.5c0-1-1.1-1.5-2.5-1.5s-2.5.6-2.5 1.7 1.2 1.5 2.5 1.8 2.5.7 2.5 1.8-1.1 1.7-2.5 1.7-2.5-.5-2.5-1.5"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8.5 21h7"/>',
  doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="M21 16l-5-5-9 9"/>',
  archive:'<rect x="3" y="4" width="18" height="4.5" rx="1.5"/><path d="M5 8.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V8.5"/><path d="M10 12.5h4"/>',
  bell:'<path d="M18 8a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 14 18 8"/><path d="M13.7 20a2 2 0 0 1-3.4 0"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  x:'<path d="M18 6L6 18M6 6l12 12"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  trash:'<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  print:'<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  star:'<path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
  cloud:'<path d="M18 18.5a4 4 0 0 0 .5-8 6.2 6.2 0 0 0-11.8-1.4A3.8 3.8 0 0 0 7 18.5z"/>',
  lock:'<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  phone:'<path d="M21.5 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.6 4.2 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.5 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail:'<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2.5 7l9.5 6 9.5-6"/>',
  chevron:'<path d="M15 6l-6 6 6 6"/>',
  news:'<path d="M4 5h13a1 1 0 0 1 1 1v13a2 2 0 0 0 2-2V8"/><rect x="2" y="3" width="16" height="18" rx="1.5"/><path d="M6 8h8M6 12h8M6 16h5"/>',
  gift:'<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12"/><path d="M12 9S10.5 4 8 4a2.5 2.5 0 0 0 0 5M12 9s1.5-5 4-5a2.5 2.5 0 0 1 0 5"/>',
  candle:'<path d="M12 3s2 2.2 2 3.8a2 2 0 0 1-4 0C10 5.2 12 3 12 3z"/><rect x="8.5" y="10" width="7" height="11" rx="1.5"/><path d="M12 10V8.5"/>',
  file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/>',
  warn:'<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
};
function icon(name, size, cls){
  const p = ICONS[name] || ICONS.info;
  const s = size || 20;
  return `<svg class="ico${cls?' '+cls:''}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
}

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
let reminders = []; // تذكيرات التقويم: {id, title, note, day, month, year, cal:'greg'|'hijri', done}
let financeLog = []; // سجل دخول اللجنة المالية: {id, email, at}
let finance = { total:0, yearStart:0, expenses:[] }; // المالية: المبلغ الكلي، بداية العام، المصروفات
let paidThawab = []; // التثويبات المدفوعة: {id, name, phone, miqatId, deceased:[], amount, note, at}
let revenues = []; // إيرادات المواقيت: {id, kind:'vow'|'donation', miqatId, name, amount, note, date, at}
let mediaItems = []; // الأرشيف الإعلامي
let letters = []; // الرسائل الرسمية الصادرة
let archives = []; // أرشيف السنوات
let radoodParts = []; // مشاركات مسجّلة يدوياً: {id, radoodId, miqatId, miqatName, note, at}
let auditLog = []; // سجل التغييرات: {id, at, who, act, cat, what}
let projects = []; // المشاريع: {id, title, date, description, goal, cost, source('donor'/'budget'), donorName, submitter, committee, viaLink, at}
let radoods = []; // الرواديد: {id, name, img, note, at}
let radoodEvals = []; // تقييمات الرواديد (دفعة ٢): {id, radoodId, miqatId, ...}
let devIdeas = [];
let devDrafts = [];
let devUpdates = [];
let devVersions = [];
let memberCandidates = [];
let pendingCandidateId = null;
// كل مصروف: {id, section:'miqat', mood:'farah'|'hzn', miqatId, kind:'mawlid'|'ihtifal', type, subType, cost, date, note, at}
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
function bookingPaid(b){
  if(!b) return 0;
  // بنود المساهمة المفصّلة (نقدي + عيني بقيمته التقديرية) — تُستخدم لحالة الميقات
  if(Array.isArray(b.rcptItems) && b.rcptItems.length) return receiptTotal(b);
  if(b.received!=null && b.received!=='') return Number(b.received)||0;   // المستلم من «مواقيت تقترب»
  if(Array.isArray(b.payments)) return b.payments.reduce((s,p)=>s+(Number(p.amount)||0),0);
  return 0;   // لم يُسجَّل استلام بعد
}
/* النقدي فقط — للإيرادات المالية الحقيقية */
function bookingCash(b){
  if(!b) return 0;
  if(Array.isArray(b.rcptItems) && b.rcptItems.length) return receiptCashTotal(b);
  if(b.received!=null && b.received!=='') return Number(b.received)||0;
  if(Array.isArray(b.payments)) return b.payments.reduce((s,p)=>s+(Number(p.amount)||0),0);
  return 0;
}
function bookingRemaining(b){ return Math.max(0, bookingAgreed(b)-bookingPaid(b)); }
function miqatPaid(mq){ return (mq.bookings||[]).reduce((s,b)=>s+bookingPaid(b),0); }   // اكتمال الميقات = المُحصّل فعلاً
function miqatAgreed(mq){ return (mq.bookings||[]).reduce((s,b)=>s+bookingAgreed(b),0); }
/* ─── العضوية بالتقسيط ─── */
function memberFeeTotal(m){ return m.feeTotal!=null ? (Number(m.feeTotal)||0) : (Number(settings.fee)||0); }
function memberPaid(m){ if(Array.isArray(m.payments)) return m.payments.reduce((s,p)=>s+(Number(p.amount)||0),0); return m.paymentDate ? (m.paidAmount!=null?Number(m.paidAmount):memberFeeTotal(m)) : 0; }
function memberRemaining(m){ return Math.max(0, memberFeeTotal(m)-memberPaid(m)); }
function memberSubStatus(m){ const paid=memberPaid(m), tot=memberFeeTotal(m); if(paid<=0) return 'none'; if(paid<tot) return 'partial'; return 'full'; }
function memberPayments(m){ if(Array.isArray(m.payments)) return m.payments; return m.paymentDate ? [{amount:(m.paidAmount!=null?Number(m.paidAmount):memberFeeTotal(m)), date:m.paymentDate}] : []; }
/* ═══ مساهمة العضو: بنود نقدية أو عينية ═══
   • النقدي  : مبلغ يدخل الصندوق فعلاً
   • العيني  : يتكفّل به العضو مباشرة — قيمته تقديرية لتحديد حالة الميقات فقط،
               ولا تُذكر في تقرير المصروفات (يُذكر اسم البند فقط)          */
const RECEIPT_ITEMS = ['مبلغ نقدي','وجبة غداء','وجبة عشاء','أجرة الخطيب','أجرة الرادود','ماء ومناديل','السواد','زينة','موكب','أخرى'];
function isCashItem(kind){ return kind==='مبلغ نقدي' || kind==='نقدي'; }
/* بنود مساهمة الحجز (المسجّلة في صفحة الاستلام) */
function receiptItems(b){ return (b && Array.isArray(b.rcptItems)) ? b.rcptItems : []; }
function receiptCashTotal(b){ return receiptItems(b).filter(i=>isCashItem(i.kind)).reduce((s,i)=>s+(Number(i.value)||0),0); }
function receiptInKindTotal(b){ return receiptItems(b).filter(i=>!isCashItem(i.kind)).reduce((s,i)=>s+(Number(i.value)||0),0); }
function receiptTotal(b){ return receiptCashTotal(b)+receiptInKindTotal(b); }
/* أسماء البنود العينية + النقدية بلا مبالغ — للتقارير */
function receiptItemNames(b){
  const names=receiptItems(b).map(i=>i.kind).filter(Boolean);
  return [...new Set(names)];
}
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
function bookingHasReceipt(b){ return !!(b && ((Array.isArray(b.rcptItems)&&b.rcptItems.length) || (b.received!=null && b.received!=='')));}
/* المبلغ المعتمد للحجز: المسجّل فعلاً (بنود المساهمة أو الاستلام)، وإلا المتّفق عليه */
function bookingEffective(b){ return bookingHasReceipt(b) ? bookingPaid(b) : bookingAgreed(b); }
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
  try { const r=await storage.get('reminders'); if(r) reminders=JSON.parse(r); } catch(e){ reminders=[]; }
  try { const f=await storage.get('financeLog'); if(f) financeLog=JSON.parse(f); } catch(e){ financeLog=[]; }
  try { const fn=await storage.get('finance'); if(fn) finance=Object.assign({total:0,yearStart:0,expenses:[]}, JSON.parse(fn)); } catch(e){ finance={total:0,yearStart:0,expenses:[]}; }
  try { const pt=await storage.get('paidThawab'); if(pt) paidThawab=JSON.parse(pt); } catch(e){ paidThawab=[]; }
  try { const pr=await storage.get('projects'); if(pr) projects=JSON.parse(pr); } catch(e){ projects=[]; }
  try { window.__lastBackupAt = await storage.get('lastBackupAt') || ''; } catch(e){ window.__lastBackupAt=''; }
  try { const al=await storage.get('auditLog'); if(al) auditLog=JSON.parse(al); } catch(e){ auditLog=[]; }
  try { const rp=await storage.get('radoodParts'); if(rp) radoodParts=JSON.parse(rp); } catch(e){ radoodParts=[]; }
  try { const ar=await storage.get('archives'); if(ar) archives=JSON.parse(ar); } catch(e){ archives=[]; }
  try { const rv=await storage.get('revenues'); if(rv) revenues=JSON.parse(rv); } catch(e){ revenues=[]; }
  try { const lt=await storage.get('letters'); if(lt) letters=JSON.parse(lt); } catch(e){ letters=[]; }
  try { const mi=await storage.get('mediaItems'); if(mi) mediaItems=JSON.parse(mi); } catch(e){ mediaItems=[]; }
  try { const gi=await storage.get('gdIndexCache'); if(gi) gdIndex=JSON.parse(gi); } catch(e){}
  try { const ac=await storage.get('azaSessionsCache'); if(ac){ const o=JSON.parse(ac); window.__azaSessions=o.ev||[]; window.__azaSurveys=o.sv||[]; } } catch(e){ window.__azaSessions=[]; window.__azaSurveys=[]; }
  try { const rd=await storage.get('radoods'); if(rd) radoods=JSON.parse(rd); } catch(e){ radoods=[]; }
  try { const re=await storage.get('radoodEvals'); if(re) radoodEvals=JSON.parse(re); } catch(e){ radoodEvals=[]; }
  try { const x=await storage.get('devIdeas'); if(x) devIdeas=JSON.parse(x); } catch(e){ devIdeas=[]; }
  try { const x=await storage.get('devDrafts'); if(x) devDrafts=JSON.parse(x); } catch(e){ devDrafts=[]; }
  try { const x=await storage.get('devUpdates'); if(x) devUpdates=JSON.parse(x); } catch(e){ devUpdates=[]; }
  try { const x=await storage.get('devVersions'); if(x) devVersions=JSON.parse(x); } catch(e){ devVersions=[]; }
  try { const x=await storage.get('memberCandidates'); if(x) memberCandidates=JSON.parse(x); } catch(e){ memberCandidates=[]; }
  try { uiDark = (await storage.get('ui_dark'))==='1'; } catch(e){ uiDark=false; }
}
function cloudPush(k,v){ if(window.CloudSync) CloudSync.push(k,v); }
async function saveMembers(){ try{ await storage.set('members',JSON.stringify(members)); }catch(e){ toast('تعذر الحفظ'); } cloudPush('members',members); }
async function saveMiqats(){ try{ await storage.set('miqats',JSON.stringify(miqats)); }catch(e){ toast('تعذر الحفظ'); } cloudPush('miqats',miqats); }
async function saveNews(){ try{ await storage.set('news',JSON.stringify(news)); }catch(e){} cloudPush('news',news); }
async function persistSettings(){ try{ await storage.set('settings',JSON.stringify(settings)); }catch(e){} if(window.CloudSync) CloudSync.pushSettings(); }
async function saveMeetings(){ try{ await storage.set('meetings',JSON.stringify(meetings)); }catch(e){ toast('تعذر حفظ الاجتماع'); } cloudPush('meetings',meetings); }
async function saveAssemblies(){ try{ await storage.set('assemblies',JSON.stringify(assemblies)); }catch(e){ toast('تعذر حفظ الجمعية'); } cloudPush('assemblies',assemblies); }
async function savePhotos(){ try{ await storage.set('photos',JSON.stringify(photos)); }catch(e){ toast('تعذّر حفظ الصور'); } cloudPush('photos',photos); }
async function saveReminders(){ try{ await storage.set('reminders',JSON.stringify(reminders)); }catch(e){} cloudPush('reminders',reminders); }
async function saveFinanceLog(){ try{ await storage.set('financeLog',JSON.stringify(financeLog)); }catch(e){} cloudPush('financeLog',financeLog); }
async function saveFinance(){ try{ await storage.set('finance',JSON.stringify(finance)); }catch(e){} if(window.CloudSync && CloudSync.pushFinance) CloudSync.pushFinance(); }
async function savePaidThawab(){ try{ await storage.set('paidThawab',JSON.stringify(paidThawab)); }catch(e){} cloudPush('paidThawab',paidThawab); }
async function saveMediaItems(){ try{ await storage.set('mediaItems',JSON.stringify(mediaItems)); }catch(e){} cloudPush('mediaItems',mediaItems); }
async function saveLetters(){ try{ await storage.set('letters',JSON.stringify(letters)); }catch(e){} cloudPush('letters',letters); }
async function saveRevenues(){ try{ await storage.set('revenues',JSON.stringify(revenues)); }catch(e){} cloudPush('revenues',revenues); }
async function saveArchives(){ try{ await storage.set('archives',JSON.stringify(archives)); }catch(e){} cloudPush('archives',archives); }
async function saveRadoodParts(){ try{ await storage.set('radoodParts',JSON.stringify(radoodParts)); }catch(e){} cloudPush('radoodParts',radoodParts); }
async function saveAuditLog(){ try{ await storage.set('auditLog',JSON.stringify(auditLog)); }catch(e){} cloudPush('auditLog',auditLog); }
/* تسجيل عملية في سجل التغييرات */
function logAudit(act, cat, what){
  try{
    const who = (window.CloudSync && CloudSync.email) ? CloudSync.email : 'غير مسجّل';
    auditLog.push({ id:'lg_'+Date.now()+'_'+Math.random().toString(36).slice(2,6), at:new Date().toISOString(), who, act, cat, what:String(what||'') });
    if(auditLog.length>500) auditLog = auditLog.slice(-500);
    saveAuditLog();
  }catch(e){}
}
async function saveProjects(){ try{ await storage.set('projects',JSON.stringify(projects)); }catch(e){} cloudPush('projects',projects); }
async function saveRadoods(){ try{ await storage.set('radoods',JSON.stringify(radoods)); }catch(e){} cloudPush('radoods',radoods); }
async function saveRadoodEvals(){ try{ await storage.set('radoodEvals',JSON.stringify(radoodEvals)); }catch(e){} cloudPush('radoodEvals',radoodEvals); }
async function saveDevIdeas(){ try{ await storage.set('devIdeas',JSON.stringify(devIdeas)); }catch(e){ toast('تعذر حفظ الأفكار'); } cloudPush('devIdeas',devIdeas); }
async function saveDevDrafts(){ try{ await storage.set('devDrafts',JSON.stringify(devDrafts)); }catch(e){ toast('تعذر حفظ المسودات'); } cloudPush('devDrafts',devDrafts); }
async function saveDevUpdates(){ try{ await storage.set('devUpdates',JSON.stringify(devUpdates)); }catch(e){ toast('تعذر حفظ التحديثات'); } cloudPush('devUpdates',devUpdates); }
async function saveDevVersions(){ try{ await storage.set('devVersions',JSON.stringify(devVersions)); }catch(e){ toast('تعذر حفظ النسخ'); } cloudPush('devVersions',devVersions); }
async function saveMemberCandidates(){ try{ await storage.set('memberCandidates',JSON.stringify(memberCandidates)); }catch(e){ toast('تعذر حفظ المرشحين'); } cloudPush('memberCandidates',memberCandidates); }

/* ═══════════ ألبوم الصور (اللجنة الإعلامية) ═══════════ */
let albumPhotoData=null;
function renderAlbum(){
  const grid=$('#albumGrid'); const cnt=$('#albumCount');
  if(cnt) cnt.textContent=`${photos.length} صورة`;
  if(!grid) return;
  if(!photos.length){ grid.innerHTML=`<div class="album-empty">لا توجد صور بعد. اضغط «${icon('plus',17,'ico-btn')} إضافة صورة» لإضافة أول صورة.</div>`; return; }
  const ordered=[...photos].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  grid.innerHTML=ordered.map(p=>`<div class="album-card" onclick="openLightbox('${p.id}')">
    <img class="ac-img" src="${p.img}" alt="${escapeHtml(p.occasion||'')}" loading="lazy">
    <div class="ac-body">
      <div class="ac-occ">${escapeHtml(p.occasion||'بدون عنوان')}</div>
      ${p.photographer?`<div class="ac-by">${icon('image',17,'ico-btn')} ${escapeHtml(p.photographer)}</div>`:''}
      ${p.desc?`<div class="ac-desc">${escapeHtml(p.desc)}</div>`:''}
    </div>
  </div>`).join('');
}
let editingPhotoId=null;
function openAddPhoto(){
  editingPhotoId=null; albumPhotoData=null;
  $('#albumPhotoPreview').innerHTML='🖼️';
  $('#albumOccasion').value=''; $('#albumPhotographer').value=''; $('#albumDesc').value='';
  const t=$('#addPhotoTitle'); if(t) t.textContent='إضافة صورة';
  const pl=$('#albumPhotoPickLabel'); if(pl) pl.textContent='اختر صورة';
  $('#addPhotoModal').classList.add('open');
}
function openEditPhoto(id){
  const p=photos.find(x=>x.id===id); if(!p) return;
  editingPhotoId=id; albumPhotoData=null;   // null = أبقِ الصورة الحالية ما لم تُغيَّر
  $('#albumPhotoPreview').innerHTML=`<img src="${p.img}" alt="" />`;
  $('#albumOccasion').value=p.occasion||''; $('#albumPhotographer').value=p.photographer||''; $('#albumDesc').value=p.desc||'';
  const t=$('#addPhotoTitle'); if(t) t.textContent='تعديل بيانات الصورة';
  const pl=$('#albumPhotoPickLabel'); if(pl) pl.textContent='تغيير الصورة (اختياري)';
  closeModal('photoLightbox');
  $('#addPhotoModal').classList.add('open');
}
async function handleAlbumPhotoSelect(e){
  const file=e.target.files[0]; if(!file) return;
  if(file.size>15*1024*1024){ toast('الصورة كبيرة جداً (أقل من 15 ميجا)'); return; }
  try{ albumPhotoData=await processPhoto(file, 1000, .78); $('#albumPhotoPreview').innerHTML=`<img src="${albumPhotoData}" alt="" />`; }
  catch(err){ toast('تعذّرت معالجة الصورة'); }
}
async function saveAlbumPhoto(){
  const occasion=$('#albumOccasion').value.trim();
  const photographer=$('#albumPhotographer').value.trim();
  const desc=$('#albumDesc').value.trim();
  if(editingPhotoId){
    const p=photos.find(x=>x.id===editingPhotoId);
    if(p){ p.occasion=occasion; p.photographer=photographer; p.desc=desc; if(albumPhotoData) p.img=albumPhotoData; }
    await savePhotos();
    editingPhotoId=null; albumPhotoData=null;
    closeModal('addPhotoModal'); toast('تم تحديث بيانات الصورة');
    renderAlbum(); renderPhotoCarousel(); return;
  }
  if(!albumPhotoData){ toast('اختر صورة أولاً'); return; }
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
  const ed=$('#lightboxEdit'); if(ed) ed.onclick=()=>openEditPhoto(id);
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
      <div class="pc-cap"><div class="t">${escapeHtml(p.occasion||'')}</div>${p.photographer?`<div class="b">${icon('image',17,'ico-btn')} ${escapeHtml(p.photographer)}</div>`:''}</div>
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
/* حقن أيقونات الشريط */
(function injectTabIcons(){
  const run=()=>{ document.querySelectorAll('.tab[data-ico]').forEach(t=>{
    if(t.querySelector('svg')) return;
    t.insertAdjacentHTML('afterbegin', icon(t.dataset.ico, 21));
  }); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
})();

$$('.tab[data-tab]').forEach(t=>{
  t.addEventListener('click',()=>{
    if(typeof pendingCandidateId!=='undefined' && t.dataset.tab!=='add') pendingCandidateId=null;
    $$('.tab[data-tab]').forEach(x=>x.classList.remove('active')); t.classList.add('active');
    $$('.tab-content').forEach(c=>c.style.display='none');
    $('#tab-'+t.dataset.tab).style.display='block';
    if(t.dataset.tab==='dashboard') renderDashboard();
    if(t.dataset.tab==='members'){ renderMembers(); restoreListPos('members'); }
    if(t.dataset.tab==='miqats'){ renderMiqats(); restoreListPos('miqats'); }
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
/* ═══ حفظ موضع القائمة عند فتح ملف والرجوع إليه ═══ */
const listMemory = { members:null, miqats:null };
function rememberListPos(tab, id){
  listMemory[tab] = { id, y: window.scrollY || document.documentElement.scrollTop || 0 };
}
function restoreListPos(tab){
  const m = listMemory[tab]; if(!m) return;
  const tryScroll=(attempt)=>{
    // أولوية: التمرير لبطاقة العنصر نفسه
    const el = document.querySelector(`[data-row-id="${m.id}"]`);
    if(el){
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY - (window.innerHeight/2 - r.height/2);
      window.scrollTo({ top: Math.max(0, top), behavior:'auto' });
      el.classList.add('row-flash');
      setTimeout(()=>el.classList.remove('row-flash'), 1400);
      return true;
    }
    // بديل: استعادة موضع التمرير المحفوظ
    if(m.y > 0){ window.scrollTo({ top:m.y, behavior:'auto' }); return true; }
    return false;
  };
  // حاول عدة مرات (القائمة قد تُرسم بعد لحظة)
  let n=0;
  const t=setInterval(()=>{ n++; if(tryScroll(n) || n>=8) clearInterval(t); }, 60);
}

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
  const photo=m.photo?`<img src="${m.photo}" alt="صورة العضو" />`:`<span>${escapeHtml((m.name||'؟').trim().charAt(0))}</span>`;
  const miqatRows=mms.map(mq=>{const b=(mq.bookings||[]).find(x=>x.memberId===m.id);
    return `<tr><td>${escapeHtml(mq.name)}</td><td>${fmtMiqatDate(mq)}</td><td>${b?fmtMoney(bookingAgreed(b)):'—'}</td></tr>`;
  }).join('');
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>ملف العضو — ${escapeHtml(m.name)}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>
  *{box-sizing:border-box;}
  @page{size:A4 portrait;margin:0;}
  html,body{width:210mm;height:297mm;margin:0;padding:0;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;color:#142b23;background:#e9ecea;font-size:12px;}
  .page{position:relative;width:210mm;height:297mm;margin:0 auto;background:#fff;overflow:hidden;
    -webkit-print-color-adjust:exact;print-color-adjust:exact;}
  .top-shape{position:absolute;right:0;left:0;top:0;height:69mm;overflow:hidden;pointer-events:none;}
  .green-a,.green-b,.green-c{position:absolute;left:-18mm;top:-29mm;transform:skewY(-15deg);transform-origin:left top;}
  .green-a{width:127mm;height:83mm;background:#063d2e;}
  .green-b{width:151mm;height:76mm;top:-8mm;background:#07583c;opacity:.98;}
  .green-c{width:118mm;height:68mm;top:7mm;background:#08784a;opacity:.78;}
  .head-logo{position:absolute;top:10mm;left:11mm;width:59mm;height:22mm;display:flex;align-items:center;z-index:2;}
  .head-logo img{display:block;max-width:59mm;max-height:22mm;object-fit:contain;filter:none;}
  .title{position:absolute;top:33mm;right:14mm;color:#07543a;font-size:28px;font-weight:800;line-height:1;z-index:2;}
  .profile{position:absolute;top:70mm;right:14mm;left:14mm;height:69mm;display:grid;grid-template-columns:1fr 64mm;gap:12mm;align-items:center;direction:rtl;}
  .details{align-self:stretch;display:flex;flex-direction:column;justify-content:center;}
  .detail-row{display:grid;grid-template-columns:35mm 1fr;gap:5mm;align-items:center;min-height:10mm;border-bottom:1px solid #d8ddda;}
  .detail-label{font-weight:700;color:#273a33;}.detail-value{font-weight:600;color:#17251f;}
  .status{display:inline-block;font-weight:800;}.status.on{color:#158447}.status.off{color:#c62828;}
  .photo{width:61mm;height:61mm;border:1.2mm solid #08784a;border-radius:50%;padding:1.5mm;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#eef3f0;color:#07543a;font-size:64px;font-weight:800;}
  .photo img{width:100%;height:100%;display:block;object-fit:cover;border-radius:50%;}
  .watermark{position:absolute;right:-15mm;left:-15mm;top:139mm;height:91mm;opacity:.06;background:
    linear-gradient(30deg,transparent 47%,#08784a 48%,#08784a 50%,transparent 51%) 0 0/18mm 18mm,
    linear-gradient(-30deg,transparent 47%,#08784a 48%,#08784a 50%,transparent 51%) 0 0/18mm 18mm;}
  .miqats{position:absolute;top:151mm;right:14mm;left:14mm;min-height:55mm;z-index:2;}
  .section-head{display:flex;align-items:center;gap:3mm;color:#07543a;font-size:17px;font-weight:800;border-bottom:1.2px solid #08784a;padding-bottom:3mm;margin-bottom:3mm;}
  .section-head::before{content:'◷';font-size:18px;}
  .miqat-table{width:100%;border-collapse:collapse;font-size:11px;background:rgba(255,255,255,.86);}
  .miqat-table th,.miqat-table td{padding:2.2mm 3mm;border-bottom:1px solid #dfe5e1;text-align:right;}
  .miqat-table th{color:#07543a;font-weight:700;background:#f1f7f3;}
  .no-miqats{padding:8mm 2mm;text-align:center;color:#8a9690;border-bottom:1px dashed #c9d2cd;}
  .approvals{position:absolute;right:14mm;left:14mm;bottom:24mm;height:49mm;border-top:1.2px solid #07543a;display:grid;grid-template-columns:1fr 1fr;direction:rtl;}
  .approval{position:relative;text-align:center;padding-top:6mm;color:#07543a;font-weight:800;font-size:15px;}
  .approval:first-child{border-left:1px solid #c7ceca;}
  .stamp-space{width:31mm;height:31mm;border:1.5px dotted #07543a;border-radius:50%;margin:3mm auto 0;}
  .signature img{display:block;max-width:42mm;max-height:23mm;margin:0 auto -1mm;object-fit:contain;}
  .sig-line{width:48mm;border-top:1px solid #84928b;margin:0 auto;}
  .bottom{position:absolute;right:0;left:0;bottom:0;height:14mm;padding:0 12mm;background:linear-gradient(105deg,#063d2e,#08784a);color:#fff;display:flex;align-items:center;justify-content:space-between;font-size:10px;}
  .phone-disp{direction:ltr;unicode-bidi:isolate;display:inline-block;}
  @media print{html,body{width:210mm;height:297mm;background:#fff}.page{margin:0;}tr{page-break-inside:avoid;}}
  ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
  <main class="page">
    <div class="top-shape"><div class="green-a"></div><div class="green-b"></div><div class="green-c"></div></div>
    <div class="head-logo"><img src="${HAIAA_LOGO_WHITE}" alt="هيئة محبي الحسين" /></div>
    <div class="title">ملف العضو</div>
    <section class="profile">
      <div class="details">
        <div class="detail-row"><div class="detail-label">الاسم</div><div class="detail-value">${escapeHtml(m.name)}</div></div>
        <div class="detail-row"><div class="detail-label">رقم العضوية</div><div class="detail-value">${memberCode(m)}</div></div>
        <div class="detail-row"><div class="detail-label">رقم الهاتف</div><div class="detail-value">${phoneDisp(m.phone)||'—'}</div></div>
        <div class="detail-row"><div class="detail-label">تاريخ الانضمام</div><div class="detail-value">${fmtDate(m.joinDate)}</div></div>
        <div class="detail-row"><div class="detail-label">الحالة</div><div class="detail-value"><span class="status ${active?'on':'off'}">${active?'مفعّلة':'غير مفعّلة'}</span></div></div>
        <div class="detail-row"><div class="detail-label">نوع العضوية</div><div class="detail-value">${escapeHtml(m.type||'—')}</div></div>
      </div>
      <div class="photo">${photo}</div>
    </section>
    <div class="watermark"></div>
    <section class="miqats">
      <div class="section-head">المواقيت</div>
      ${mms.length?`<table class="miqat-table"><thead><tr><th>الميقات</th><th>التاريخ</th><th>المساهمة</th></tr></thead><tbody>${miqatRows}</tbody></table>`:`<div class="no-miqats">لا توجد مواقيت مسجّلة لهذا العضو</div>`}
    </section>
    <section class="approvals">
      <div class="approval"><div>ختم الهيئة</div><div class="stamp-space"></div></div>
      <div class="approval signature"><div>توقيع أمين السر</div><img src="${HAIAA_SIGNATURE}" alt="توقيع أمين السر" /><div class="sig-line"></div></div>
    </section>
    <footer class="bottom"><span>هيئة محبي الحسين (ع) — وثيقة رسمية</span><span>تاريخ الطباعة: ${fmtDate(today())}</span></footer>
  </main>
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


/* ═══════════ التقرير السنوي الشامل ═══════════ */
function fillAnnualYears(){
  const sel=document.getElementById('annualYear'); if(!sel) return;
  const cur=parseInt(hijriParts().year,10)||1448;
  const years=[]; for(let y=cur; y>=cur-4; y--) years.push(y);
  sel.innerHTML=years.map(y=>`<option value="${y}">${y} هـ</option>`).join('');
}
function printAnnualReport(){
  const sel=document.getElementById('annualYear');
  const year=parseInt(sel?sel.value:0,10)||parseInt(hijriParts().year,10)||1448;

  // الأعضاء
  const totalMembers=members.length;
  const minors=members.filter(m=>m.isMinor).length;
  const paidCount=members.filter(m=>memberPaid(m)>0).length;
  const subsTotal=members.reduce((s,m)=>s+memberPaid(m),0);

  // المواقيت (مواقيت السنة المختارة)
  const yearMiqats=miqats.filter(mq=>miqatTargetHijriYear(mq)===year);
  const mqRows=yearMiqats.map(mq=>{
    const bs=mq.bookings||[];
    const agreed=bs.reduce((s,b)=>s+bookingAgreed(b),0);
    const paid=bs.reduce((s,b)=>s+bookingPaid(b),0);
    return { name:mq.name, date:fmtMiqatDate(mq), n:bs.length, agreed, paid };
  });
  const mqTotalAgreed=mqRows.reduce((s,r)=>s+r.agreed,0);
  const mqTotalPaid=mqRows.reduce((s,r)=>s+r.paid,0);

  // المالية
  const balance=Number(finance.total)||0;
  const expenses=(finance.expenses||[]);
  const expTotal=expenses.reduce((s,e)=>s+(Number(e.cost)||0),0);
  const byType={}; expenses.forEach(e=>{ byType[e.type]=(byType[e.type]||0)+(Number(e.cost)||0); });
  const topExp=Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,6);

  // لجنة العزاء
  const radRows=radoods.map(r=>{
    const evs=radoodEvals.filter(e=>e.radoodId===r.id);
    const avg=evs.length?evs.reduce((s,e)=>s+(e.avg||0),0)/evs.length:0;
    return { name:r.name, parts:radoodParticipations(r.id), n:evs.length, pct:evs.length?Math.round(avg/3*100):null };
  }).filter(x=>x.n>0).sort((a,b)=>(b.pct||0)-(a.pct||0));

  // المشاريع
  const projApproved=projects.filter(p=>p.status==='approved');
  const projRejected=projects.filter(p=>p.status==='rejected');
  const projPending=projects.filter(p=>!p.status||p.status==='pending');
  const projCost=projApproved.reduce((s,p)=>s+(Number(p.cost)||0),0);

  // الاجتماعات
  const nMeetings=meetings.length;
  const nDecisions=meetings.reduce((s,m)=>s+((m.decisions||[]).length),0);
  const nTasks=meetings.reduce((s,m)=>s+((m.tasks||[]).length),0);
  const doneTasks=meetings.reduce((s,m)=>s+((m.tasks||[]).filter(t=>t.done).length),0);

  // خلاصة ذكية
  const insights=[];
  insights.push(`بلغ عدد أعضاء الهيئة ${totalMembers} عضواً${minors?`، منهم ${minors} تحت السن`:''}، وقد سدّد ${paidCount} منهم اشتراكاتهم بإجمالي ${finMoney(subsTotal)}.`);
  if(yearMiqats.length) insights.push(`أحيت الهيئة ${yearMiqats.length} ميقاتاً خلال العام، بلغ إجمالي مساهماتها ${finMoney(mqTotalAgreed)}، استُلم منها ${finMoney(mqTotalPaid)}.`);
  if(expTotal) insights.push(`بلغت المصروفات ${finMoney(expTotal)} موزّعة على ${expenses.length} بنداً${topExp.length?`، أعلاها «${topExp[0][0]}» بمبلغ ${finMoney(topExp[0][1])}`:''}.`);
  if(radRows.length) insights.push(`شارك ${radRows.length} رادوداً في مجالس الهيئة، وكان أعلاهم تقييماً «${radRows[0].name}» بنسبة ${radRows[0].pct}%.`);
  if(projects.length) insights.push(`قُدّم ${projects.length} مشروعاً، اعتُمد منها ${projApproved.length} بتكلفة ${finMoney(projCost)}${projRejected.length?`، ورُفض ${projRejected.length}`:''}${projPending.length?`، ولا يزال ${projPending.length} بانتظار القرار`:''}.`);
  if(nMeetings) insights.push(`عقد مجلس الإدارة ${nMeetings} اجتماعاً، صدر عنها ${nDecisions} قراراً و${nTasks} مهمة، أُنجز منها ${doneTasks}.`);

  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>التقرير السنوي ${year} هـ</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:34px 38px;color:#1a2620;line-height:1.85;font-size:14.5px;}
  .cover{text-align:center;padding:40px 0 30px;border-bottom:4px double #c19a3e;margin-bottom:26px;}
  .cover img{max-width:230px;max-height:86px;margin-bottom:18px;}
  .cv-title{font-family:'Amiri',serif;font-size:32px;font-weight:700;color:#1c4536;margin-bottom:6px;}
  .cv-year{font-size:20px;color:#c19a3e;font-weight:700;}
  .cv-sub{font-size:13px;color:#8a7c6b;margin-top:10px;}
  h2{font-size:16px;color:#fff;background:#1c4536;display:inline-block;padding:6px 16px 6px 20px;border-radius:0 18px 18px 0;margin:26px 0 12px;}
  .kpis{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:8px;}
  .kpi{flex:1;min-width:120px;text-align:center;border:1px solid #e6ddcb;border-radius:12px;padding:13px 10px;background:#faf7f0;}
  .kpi .v{font-size:20px;font-weight:800;color:#1c4536;}
  .kpi .l{font-size:11.5px;color:#8a7c6b;margin-top:3px;}
  table{width:100%;border-collapse:collapse;font-size:13.5px;margin:8px 0;}
  th,td{border:1px solid #e6ddcb;padding:8px 11px;text-align:right;}
  th{background:#1c4536;color:#fff;}
  tr:nth-child(even){background:#faf7f0;}
  .sum td{background:#e6f0ea;font-weight:800;color:#1c4536;}
  .insights{background:#fbf6ea;border:1px solid #e5d5a8;border-radius:12px;padding:16px 18px;margin:16px 0;}
  .insights h3{font-size:15px;color:#7a5c1e;margin-bottom:8px;}
  .insights li{margin:8px 0;font-size:13.5px;line-height:1.9;}
  .signature-block{margin-top:44px;text-align:left;padding-left:20px;}
  .sig-img{max-width:150px;display:block;margin-bottom:2px;}
  .sig-line{width:190px;border-bottom:1px solid #8a7c6b;margin-bottom:6px;}
  .sig-title{font-size:12px;color:#8a7c6b;} .sig-name{font-weight:700;color:#1c4536;}
  .foot{margin-top:30px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  .empty{color:#8a7c6b;font-size:13px;padding:8px 0;}
  @media print{body{padding:22px;} .no-print{display:none;} h2{-webkit-print-color-adjust:exact;print-color-adjust:exact;} table{page-break-inside:auto;} tr{page-break-inside:avoid;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>

  <div class="cover">
    <img src="${HAIAA_LOGO}" alt="" />
    <div class="cv-title">التقرير السنوي الشامل</div>
    <div class="cv-year">${year} هـ</div>
    <div class="cv-sub">هيئة محبي الحسين (ع) — بني جمرة · صدر بتاريخ ${hijriToday()}</div>
  </div>

  <h2>👥 الأعضاء</h2>
  <div class="kpis">
    <div class="kpi"><div class="v">${totalMembers}</div><div class="l">إجمالي الأعضاء</div></div>
    <div class="kpi"><div class="v">${paidCount}</div><div class="l">سدّدوا الاشتراك</div></div>
    <div class="kpi"><div class="v">${minors}</div><div class="l">تحت السن</div></div>
    <div class="kpi"><div class="v">${finMoney(subsTotal)}</div><div class="l">محصّل الاشتراكات</div></div>
  </div>

  <h2>🕌 المواقيت والمساهمات</h2>
  ${mqRows.length?`<table><tr><th>الميقات</th><th>التاريخ</th><th>الحجوزات</th><th>المتفق</th><th>المستلم</th></tr>
    ${mqRows.map(r=>`<tr><td>${escapeHtml(r.name)}</td><td>${r.date}</td><td>${r.n}</td><td>${finMoney(r.agreed)}</td><td>${finMoney(r.paid)}</td></tr>`).join('')}
    <tr class="sum"><td colspan="2">الإجمالي</td><td>${mqRows.reduce((s,r)=>s+r.n,0)}</td><td>${finMoney(mqTotalAgreed)}</td><td>${finMoney(mqTotalPaid)}</td></tr>
  </table>`:'<div class="empty">لا توجد مواقيت مسجّلة لهذا العام.</div>'}

  <h2>💰 المالية</h2>
  <div class="kpis">
    <div class="kpi"><div class="v">${finMoney(balance)}</div><div class="l">رصيد الهيئة</div></div>
    <div class="kpi"><div class="v">${finMoney(expTotal)}</div><div class="l">إجمالي المصروفات</div></div>
    <div class="kpi"><div class="v">${expenses.length}</div><div class="l">بنود الصرف</div></div>
  </div>
  ${topExp.length?`<table><tr><th>أعلى بنود الصرف</th><th>المبلغ</th><th>النسبة</th></tr>
    ${topExp.map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${finMoney(v)}</td><td>${expTotal?Math.round(v/expTotal*100):0}%</td></tr>`).join('')}
  </table>`:''}

  <h2>🕯️ لجنة العزاء</h2>
  ${radRows.length?`<table><tr><th>#</th><th>الرادود</th><th>المشاركات</th><th>التقييمات</th><th>المعدّل</th></tr>
    ${radRows.map((r,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(r.name)}</td><td>${r.parts}</td><td>${r.n}</td><td>${r.pct}%</td></tr>`).join('')}
  </table>`:'<div class="empty">لا توجد تقييمات مسجّلة.</div>'}

  <h2>📋 المشاريع</h2>
  <div class="kpis">
    <div class="kpi"><div class="v">${projApproved.length}</div><div class="l">معتمدة</div></div>
    <div class="kpi"><div class="v">${projRejected.length}</div><div class="l">مرفوضة</div></div>
    <div class="kpi"><div class="v">${projPending.length}</div><div class="l">بانتظار القرار</div></div>
    <div class="kpi"><div class="v">${finMoney(projCost)}</div><div class="l">تكلفة المعتمد</div></div>
  </div>
  ${projApproved.length?`<table><tr><th>المشروع</th><th>مقدّم الطلب</th><th>التكلفة</th></tr>
    ${projApproved.map(p=>`<tr><td>${escapeHtml(p.title||'—')}</td><td>${escapeHtml(p.submitter||'—')}</td><td>${finMoney(p.cost||0)}</td></tr>`).join('')}
  </table>`:''}

  <h2>🗓️ اجتماعات الإدارة</h2>
  <div class="kpis">
    <div class="kpi"><div class="v">${nMeetings}</div><div class="l">اجتماع</div></div>
    <div class="kpi"><div class="v">${nDecisions}</div><div class="l">قرار</div></div>
    <div class="kpi"><div class="v">${nTasks}</div><div class="l">مهمة</div></div>
    <div class="kpi"><div class="v">${doneTasks}</div><div class="l">مهمة منجزة</div></div>
  </div>

  <div class="insights"><h3>📌 خلاصة العام</h3><ul>${insights.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div>

  <div class="signature-block">
    <img class="sig-img" src="${HAIAA_SIGNATURE}" alt="" />
    <div class="sig-line"></div>
    <div class="sig-title">أمين السر</div>
    <div class="sig-name">صادق الغسرة</div>
  </div>
  <div class="foot">هيئة محبي الحسين (ع) — بني جمرة · التقرير السنوي ${year} هـ</div>
  </body></html>`);
  w.document.close(); w.focus();
}






/* ═══════════ اقتراحات الأعضاء ═══════════ */
function renderAsmSuggestions(){
  const a=getAssembly(); if(!a) return;
  const host=$('#asmSuggBody'); if(!host) return;
  const list=a.suggestions||[];
  host.innerHTML=`
  <div class="sg-add">
    <div class="fl-h">${icon('plus',16,'ico-btn')} تسجيل اقتراح أو استفسار</div>
    <div class="sg-fld"><label>اسم العضو</label>
      <input id="sgName" type="text" placeholder="اسم مقدّم الاقتراح" /></div>
    <div class="sg-fld"><label>الاقتراح أو الاستفسار</label>
      <textarea id="sgText" rows="3" placeholder="نصّ الاقتراح…"></textarea></div>
    <div class="sg-fld"><label>ردّ الإدارة <span style="font-weight:400;color:var(--muted)">(اختياري)</span></label>
      <textarea id="sgReply" rows="2" placeholder="الردّ أو التوجيه…"></textarea></div>
    <button class="btn btn-primary" style="width:100%" onclick="addSuggestion()">${icon('check',16,'ico-btn')} حفظ</button>
  </div>
  <div class="stats-sec-title">المسجّلة (${list.length})</div>
  ${list.length?list.map((s,i)=>`
    <div class="sg-item">
      <div class="sg-h"><span class="sg-who">${icon('user',14,'ico-btn')} ${escapeHtml(s.name||'—')}</span>
        <span style="font-size:11px;color:var(--muted)">${s.at?new Date(s.at).toLocaleDateString('ar'):''}</span></div>
      <div class="sg-txt">${escapeHtml(s.text||'')}</div>
      ${s.reply?`<div class="sg-reply"><b>ردّ الإدارة:</b> ${escapeHtml(s.reply)}</div>`:''}
      <div class="sg-acts">
        <button class="btn btn-ghost btn-sm" onclick="editSuggestion(${i})">${icon('edit',14,'ico-btn')} تعديل</button>
        <button class="btn btn-sm" style="background:var(--danger);color:#fff;border:none" onclick="delSuggestion(${i})">${icon('trash',14,'ico-btn')} حذف</button>
      </div>
    </div>`).join(''):'<div class="lt-empty">لا اقتراحات مسجّلة بعد</div>'}`;
}
async function addSuggestion(){
  const a=getAssembly(); if(!a) return;
  const name=($('#sgName').value||'').trim();
  const text=($('#sgText').value||'').trim();
  if(!text){ toast('اكتب نصّ الاقتراح'); return; }
  a.suggestions=a.suggestions||[];
  a.suggestions.push({ id:'sg_'+Date.now(), name:name||'عضو', text, reply:($('#sgReply').value||'').trim(), at:new Date().toISOString() });
  await saveAssemblies();
  logAudit('إضافة','الجمعية العمومية',`اقتراح من «${name||'عضو'}»`);
  toast('حُفظ الاقتراح'); renderAsmSuggestions();
}
async function editSuggestion(i){
  const a=getAssembly(); if(!a) return;
  const s=(a.suggestions||[])[i]; if(!s) return;
  const t=prompt('نصّ الاقتراح:', s.text); if(t===null) return;
  const r=prompt('ردّ الإدارة:', s.reply||''); if(r===null) return;
  s.text=t.trim(); s.reply=r.trim();
  await saveAssemblies(); toast('عُدّل'); renderAsmSuggestions();
}
async function delSuggestion(i){
  const a=getAssembly(); if(!a) return;
  const s=(a.suggestions||[])[i]; if(!s) return;
  if(!confirm('حذف هذا الاقتراح؟')) return;
  a.suggestions.splice(i,1);
  await saveAssemblies(); renderAsmSuggestions();
}

/* ═══════════ الملف الشامل ═══════════ */
function renderAsmFull(){
  const a=getAssembly(); if(!a) return;
  const host=$('#asmFullBody'); if(!host) return;
  const f=a.full||{};
  const imgs=a.photos||[];
  host.innerHTML=`
  <div class="fl-sec">
    <div class="fl-h">${icon('doc',16,'ico-btn')} كلمات الجمعية</div>
    <div class="fl-fld"><label>كلمة سماحة الشيخ</label>
      <textarea id="flSheikh" rows="5" placeholder="نصّ كلمة الشيخ…" oninput="saveFullField()">${escapeHtml(f.sheikhWord||'')}</textarea></div>
    <div class="fl-fld"><label>اسم الشيخ</label>
      <input id="flSheikhName" type="text" placeholder="سماحة الشيخ …" value="${escapeHtml(f.sheikhName||'')}" oninput="saveFullField()" /></div>
    <div class="fl-fld"><label>كلمة الإدارة</label>
      <textarea id="flAdmin" rows="5" placeholder="نصّ كلمة الإدارة…" oninput="saveFullField()">${escapeHtml(f.adminWord||'')}</textarea></div>
  </div>

  <div class="fl-sec">
    <div class="fl-h">${icon('money',16,'ico-btn')} التقرير المالي</div>
    <div class="fl-fld"><label>نصّ التقرير المالي</label>
      <textarea id="flFinance" rows="7" placeholder="اكتب التقرير المالي للسنة…" oninput="saveFullField()">${escapeHtml(f.financeReport||'')}</textarea></div>
  </div>

  <div class="fl-sec">
    <div class="fl-h">${icon('image',16,'ico-btn')} صور الجمعية (${imgs.length})</div>
    <button class="btn btn-ghost" style="width:100%" onclick="document.getElementById('asmPhotoInput').click()">
      ${icon('plus',16,'ico-btn')} إضافة صور</button>
    <input type="file" id="asmPhotoInput" accept="image/*" multiple style="display:none" onchange="addAsmPhotos(event)" />
    ${imgs.length?`<div class="fl-imgs">${imgs.map((p,i)=>`
      <div><div class="fl-img"><img src="${p.data}" alt="" onclick="window.open('${p.data}','_blank')" />
        <button class="x" onclick="delAsmPhoto(${i})">×</button></div>
        <input class="fl-cap" type="text" placeholder="تعليق…" value="${escapeHtml(p.caption||'')}" oninput="setAsmPhotoCaption(${i},this.value)" /></div>`).join('')}</div>`:''}
  </div>

  <button class="btn btn-accent" style="width:100%" onclick="printAssemblyFull()">
    ${icon('print',17,'ico-btn')} طباعة الملف الشامل PDF</button>`;
}
let asmFullTimer=null;
function saveFullField(){
  const a=getAssembly(); if(!a) return;
  a.full={
    sheikhWord:$('#flSheikh').value, sheikhName:$('#flSheikhName').value,
    adminWord:$('#flAdmin').value, financeReport:$('#flFinance').value
  };
  clearTimeout(asmFullTimer); asmFullTimer=setTimeout(saveAssemblies,600);
}
async function addAsmPhotos(ev){
  const a=getAssembly(); if(!a) return;
  const files=[...(ev.target.files||[])]; if(!files.length) return;
  a.photos=a.photos||[];
  for(const fl of files){
    try{ const data=await processPhoto(fl, 1100, .82);
      a.photos.push({ id:'ap_'+Date.now()+Math.random().toString(36).slice(2,5), data, caption:'' });
    }catch(e){ console.error(e); }
  }
  ev.target.value='';
  await saveAssemblies();
  toast(`أُضيفت ${files.length} صورة`); renderAsmFull();
}
function setAsmPhotoCaption(i,v){
  const a=getAssembly(); if(!a||!a.photos||!a.photos[i]) return;
  a.photos[i].caption=v;
  clearTimeout(asmFullTimer); asmFullTimer=setTimeout(saveAssemblies,600);
}
async function delAsmPhoto(i){
  const a=getAssembly(); if(!a||!a.photos) return;
  if(!confirm('حذف هذه الصورة؟')) return;
  a.photos.splice(i,1);
  await saveAssemblies(); renderAsmFull();
}

/* الملف الشامل PDF */
async function printAssemblyFull(){
  const a=getAssembly(); if(!a) return;
  const f=a.full||{}, r=a.report||{};
  const e=a.election;
  let ballots=[], res=[];
  if(e && e.cloudId){
    try{ ballots=await CloudSync.fetchBallots(e.cloudId, e.round||1); res=computeResults(e, ballots); }catch(err){}
  }
  const valid=ballots.filter(b=>b.valid).length, invalid=ballots.length-valid;
  const present=(a.attendees||[]).map(id=>members.find(m=>m.id===id)).filter(Boolean);
  const activeN=present.filter(isActive).length;
  const sec=(t,v)=> v && String(v).trim() ? `<h2>${t}</h2><div class="txt">${escapeHtml(v)}</div>` : '';
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>الملف الشامل — الجمعية العمومية ${a.year}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:32px 36px;color:#1a2620;line-height:1.9;font-size:14px;}
  .cover{text-align:center;padding:44px 0 32px;border-bottom:4px double #c19a3e;margin-bottom:26px;}
  .cover img{max-width:230px;max-height:86px;margin-bottom:18px;}
  .cv-title{font-family:'Amiri',serif;font-size:32px;font-weight:700;color:#1c4536;margin-bottom:6px;}
  .cv-year{font-size:21px;color:#c19a3e;font-weight:700;}
  .cv-sub{font-size:13px;color:#8a7c6b;margin-top:10px;}
  h2{font-size:16px;color:#fff;background:#1c4536;display:inline-block;padding:6px 16px 6px 20px;border-radius:0 18px 18px 0;margin:24px 0 11px;}
  .txt{white-space:pre-wrap;background:#fbf9f5;border:1px solid #ece3d4;border-right:4px solid #c19a3e;border-radius:10px;padding:16px 20px;font-size:14px;line-height:2;color:#33201d;}
  .kpis{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:10px;}
  .kpi{flex:1;min-width:110px;text-align:center;border:1px solid #e6ddcb;border-radius:12px;padding:14px 8px;background:#faf7f0;}
  .kpi .v{font-size:20px;font-weight:800;color:#1c4536;} .kpi .l{font-size:11.5px;color:#8a7c6b;margin-top:3px;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin:8px 0 14px;}
  th,td{border:1px solid #e6ddcb;padding:8px 11px;text-align:right;}
  th{background:#1c4536;color:#fff;font-size:12.5px;}
  tr:nth-child(even){background:#faf7f0;}
  .win td{background:#e9f4ed;font-weight:800;color:#2f8f5b;}
  .acc-box{background:#e9f4ed;border:1px solid #2f8f5b;border-radius:10px;padding:11px 15px;margin-bottom:9px;}
  .acc-box b{color:#2f8f5b;} .acc-box span{font-size:12px;color:#5a7a68;margin-right:8px;}
  .sg{border:1px solid #e6ddcb;border-right:4px solid #c19a3e;border-radius:10px;padding:12px 15px;margin-bottom:9px;background:#fdfbf7;}
  .sg-w{font-weight:700;color:#1c4536;font-size:13.5px;margin-bottom:4px;}
  .sg-t{font-size:13.5px;line-height:1.9;}
  .sg-r{background:#eef3ef;border-radius:8px;padding:9px 12px;margin-top:8px;font-size:12.5px;}
  .sg-r b{color:#1c4536;}
  .imgs{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:12px 0;}
  .fig{margin:0;border:1px solid #ece3d4;border-radius:12px;padding:10px;background:#fdfbf7;page-break-inside:avoid;}
  .fig img{width:100%;max-height:280px;object-fit:contain;border-radius:8px;display:block;}
  .fig figcaption{margin-top:8px;font-size:12.5px;color:#5a4d42;text-align:center;line-height:1.7;}
  .sig{margin-top:46px;text-align:left;padding-left:20px;}
  .sig img{max-width:150px;display:block;margin-bottom:2px;}
  .sig-line{width:190px;border-bottom:1px solid #8a7c6b;margin-bottom:6px;}
  .sig-t{font-size:12px;color:#8a7c6b;} .sig-n{font-weight:700;color:#1c4536;}
  .foot{margin-top:30px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:22px;} .no-print{display:none;} h2{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    tr,.fig,.sg{page-break-inside:avoid;} *{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>

  <div class="cover"><img src="${HAIAA_LOGO}" alt="" />
    <div class="cv-title">محضر الجمعية العمومية</div>
    <div class="cv-year">${a.year}</div>
    <div class="cv-sub">هيئة محبي الحسين (ع) — بني جمرة · صدر بتاريخ ${hijriToday()}</div></div>

  <h2>👥 الحضور</h2>
  <div class="kpis">
    <div class="kpi"><div class="v">${present.length}</div><div class="l">إجمالي الحاضرين</div></div>
    <div class="kpi"><div class="v">${activeN}</div><div class="l">مفعّلو العضوية</div></div>
    <div class="kpi"><div class="v">${present.length-activeN}</div><div class="l">غير مفعّلين</div></div>
    <div class="kpi"><div class="v">${members.length}</div><div class="l">إجمالي الأعضاء</div></div>
  </div>

  ${sec(`🕌 كلمة ${f.sheikhName?escapeHtml(f.sheikhName):'سماحة الشيخ'}`, f.sheikhWord)}
  ${sec('🗣️ كلمة الإدارة', f.adminWord || r.adminWord)}

  ${(()=>{ const t=[
      ['الخطة السنوية', r.plan],['المجالس', r.majalis],['الفعاليات', r.events],
      ['المواكب', r.mawakib],['أبرز الإنجازات', r.achievements],['أبرز المشاريع', r.topProjects],
      ['التحديات', r.challenges],['التكريم الحسيني', r.honoring]
    ].filter(x=>x[1] && String(x[1]).trim());
    return t.length?`<h2>📖 التقرير الأدبي</h2>`+t.map(x=>`<div style="margin-bottom:12px"><b style="color:#1c4536;font-size:14px">${x[0]}</b><div class="txt" style="margin-top:6px">${escapeHtml(x[1])}</div></div>`).join(''):''; })()}

  ${sec('💰 التقرير المالي', f.financeReport)}

  ${(a.projects||[]).length?`<h2>📋 المشاريع المنجزة</h2>
    <table><tr><th>#</th><th>المشروع</th><th>اللجنة</th></tr>
    ${a.projects.map((p,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(p.title||'')}</td><td>${escapeHtml(p.committee||'—')}</td></tr>`).join('')}
    </table>`:''}

  ${(a.suggestions||[]).length?`<h2>💡 اقتراحات واستفسارات الأعضاء</h2>
    ${a.suggestions.map(s=>`<div class="sg"><div class="sg-w">${escapeHtml(s.name||'عضو')}</div>
      <div class="sg-t">${escapeHtml(s.text||'')}</div>
      ${s.reply?`<div class="sg-r"><b>ردّ الإدارة:</b> ${escapeHtml(s.reply)}</div>`:''}</div>`).join('')}`:''}

  ${(e && e.cloudId && res.length)?`<h2>🗳️ نتائج الانتخابات</h2>
    <div class="kpis">
      <div class="kpi"><div class="v">${valid}</div><div class="l">صوت صحيح</div></div>
      <div class="kpi"><div class="v">${invalid}</div><div class="l">صوت ملغى</div></div>
      <div class="kpi"><div class="v">${ballots.length}</div><div class="l">إجمالي المصوّتين</div></div>
    </div>
    ${res.filter(x=>!x.skipped).map(x=>{
      if(x.acclaim) return `<div style="margin-bottom:12px"><b style="color:#1c4536;font-size:14px">${escapeHtml(x.comm.name)}</b>
        <div class="acc-box"><b>${escapeHtml(x.acclaim.name)}</b><span>فوز بالتزكية</span></div></div>`;
      return `<div style="margin-bottom:12px"><b style="color:#1c4536;font-size:14px">${escapeHtml(x.comm.name)}</b>
        <table><tr><th>المرشّح</th><th>الأصوات</th><th>النتيجة</th></tr>
        ${x.rows.map(y=>`<tr class="${(y.votes===x.max&&!x.tie&&x.max>0)?'win':''}">
          <td>${escapeHtml(y.name)}</td><td>${y.votes}</td>
          <td>${(y.votes===x.max&&!x.tie&&x.max>0)?'فائز':'—'}</td></tr>`).join('')}
        </table></div>`;
    }).join('')}`:''}

  ${(a.photos||[]).length?`<h2>📷 صور الجمعية</h2>
    <div class="imgs">${a.photos.map(p=>`<figure class="fig"><img src="${p.data}" alt="" />
      ${p.caption?`<figcaption>${escapeHtml(p.caption)}</figcaption>`:''}</figure>`).join('')}</div>`:''}

  <div class="sig"><img src="${HAIAA_SIGNATURE}" alt="" /><div class="sig-line"></div>
    <div class="sig-t">أمين السر</div><div class="sig-n">صادق الغسرة</div></div>
  <div class="foot">هيئة محبي الحسين (ع) — بني جمرة · محضر الجمعية العمومية ${a.year}</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* ═══════════ انتخابات الجمعية العمومية ═══════════ */
let elecLiveTimer=null, elecCandQ={}, elecView='setup';

function electionPageURL(id){
  const base=location.origin + location.pathname.replace(/[^/]*$/, '');
  return base + 'vote.html?e=' + encodeURIComponent(id);
}
function qrImgURL(text,size){
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size||400}x${size||400}&margin=6&data=${encodeURIComponent(text)}`;
}
function asmElec(){ const a=getAssembly(); return a ? (a.election||null) : null; }

function renderAsmElection(){
  const a=getAssembly(); if(!a) return;
  const host=$('#asmElecBody'); if(!host) return;
  if(!a.election){
    host.innerHTML=`
    <div class="el-head"><div class="t">${icon('check',18,'ico-btn')} انتخابات الجمعية ${a.year}</div>
      <div class="s">${(a.attendees||[]).length} حاضراً سيحق لهم التصويت</div></div>
    <div class="fin-hint" style="margin-bottom:12px">${icon('info',15,'ico-btn')}
      الناخبون يُؤخذون تلقائياً من <b>حضور هذه الجمعية</b>. سجّل الحضور أولاً في قسم «الحضور».</div>
    <button class="btn btn-primary" style="width:100%" onclick="createAsmElection()">
      ${icon('plus',17,'ico-btn')} إنشاء الدورة الانتخابية</button>`;
    return;
  }
  if(elecView==='results') return renderAsmResults();
  if(elecView==='send') return renderSendList();
  const e=a.election;
  const url=e.cloudId?electionPageURL(e.cloudId):'';
  const present=(a.attendees||[]).length;
  host.innerHTML=`
  <div class="el-head"><div class="t">${icon('check',18,'ico-btn')} انتخابات الجمعية ${a.year}</div>
    <div class="s">${(e.committees||[]).length} لجنة · ${present} حاضراً${Number(e.round||1)>1?` · الجولة ${e.round}`:''}</div></div>

  ${!e.cloudId?`<button class="btn btn-primary" style="width:100%;margin-bottom:13px" onclick="addElecComm()">
    ${icon('plus',16,'ico-btn')} إضافة لجنة</button>`:''}

  ${(e.committees||[]).map(c=>{
    const n=(c.candidates||[]).length;
    const badge = n===0?'<span class="el-badge empty">بلا مرشّحين</span>'
      : n===1?'<span class="el-badge acc">فوز بالتزكية</span>'
      : `<span class="el-badge vote">انتخاب (${n})</span>`;
    return `<div class="el-comm">
      <div class="el-comm-h"><span class="el-comm-n">${escapeHtml(c.name)}</span>${badge}
        ${!e.cloudId?`<button style="background:none;border:none;color:var(--danger);font-size:18px;cursor:pointer" onclick="delElecComm('${c.id}')">×</button>`:''}</div>
      ${(c.candidates||[]).map(cd=>`<div class="el-cand">${icon('user',15,'ico-btn')} ${escapeHtml(cd.name)}
        ${!e.cloudId?`<button class="x" onclick="delElecCand('${c.id}','${cd.id}')">×</button>`:''}</div>`).join('')}
      ${!e.cloudId?`<div class="el-search">
        <div class="el-search-in">${icon('search',15,'ico-btn')}
          <input type="text" id="q_${c.id}" placeholder="ابحث عن عضو بالاسم…" value="${escapeHtml(elecCandQ[c.id]||'')}"
                 oninput="elecSetCandQ('${c.id}',this.value)" autocomplete="off" /></div>
        ${(()=>{
          const q=(elecCandQ[c.id]||'').trim();
          const avail=[...members].filter(m=>!(c.candidates||[]).some(x=>x.memberId===m.id))
            .filter(m=>!q||(m.name||'').includes(q))
            .sort((x,y)=>(x.name||'').localeCompare(y.name||'','ar'));
          if(!q) return `<div class="el-search-hint">اكتب اسماً للبحث · ${avail.length} عضواً متاحاً</div>`;
          if(!avail.length) return `<div class="el-search-hint">لا نتائج لـ «${escapeHtml(q)}»</div>`;
          return `<div class="el-results">${avail.slice(0,8).map(m=>`
            <div class="el-res" onclick="addElecCandById('${c.id}','${m.id}')">
              ${icon('user',14,'ico-btn')} <span>${escapeHtml(m.name)}</span>
              <span class="el-res-add">${icon('plus',15)}</span></div>`).join('')}
            ${avail.length>8?`<div class="el-search-hint">و${avail.length-8} نتيجة أخرى — ضيّق البحث</div>`:''}</div>`;
        })()}
      </div>`:''}
    </div>`;
  }).join('')}

  ${e.cloudId?`
    <div class="el-link">
      <div class="el-qr"><img src="${qrImgURL(url,400)}" alt="QR" /></div>
      <div class="el-url">${escapeHtml(url)}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" style="flex:1" onclick="copyElecLink()">${icon('link',15,'ico-btn')} نسخ الرابط</button>
        <button class="btn btn-sm" style="flex:1;background:#25d366;color:#fff;border:none" onclick="openSendList()">
          ${icon('mail',15,'ico-btn')} إرسال للحاضرين</button>
      </div>
    </div>
    <div class="el-live" id="elecLive"></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-accent btn-sm" style="flex:1" onclick="showAsmResults()">${icon('chart',15,'ico-btn')} النتائج</button>
      <button class="btn btn-sm" style="flex:1;${e.closed?'background:var(--ok);':'background:var(--danger);'}color:#fff;border:none" onclick="toggleElecClosed()">
        ${e.closed?icon('check',15,'ico-btn')+' فتح التصويت':icon('lock',15,'ico-btn')+' إغلاق التصويت'}</button>
    </div>
  `:`
    <button class="btn btn-primary" style="width:100%;margin-bottom:12px" onclick="openElecVoting()">
      ${icon('link',17,'ico-btn')} فتح التصويت وتوليد الرابط</button>
    <div class="fin-hint">${icon('info',15,'ico-btn')} بعد الفتح لا يمكن تعديل اللجان أو المرشّحين.</div>
  `}
  <button class="btn btn-ghost btn-sm" style="width:100%;color:var(--danger);margin-top:10px" onclick="delAsmElection()">
    ${icon('trash',15,'ico-btn')} حذف الدورة الانتخابية</button>`;
  if(e.cloudId && !e.closed) startElecLive(); else { stopElecLive(); refreshElecLive(); }
}
/* رسالة مخصّصة لكل عضو فيها اسمه ورقم عضويته */
function elecPersonalText(a, m, url){
  return `🗳️ *انتخابات هيئة محبي الحسين (ع)*
الجمعية العمومية ${a.year}

السلام عليكم أخي الكريم *${m.name}*

نرجو التكرّم بالتصويت عبر الرابط أدناه:
${url}

🔑 *رقم عضويتك:* ${memberCode(m)}
(أدخله عند فتح الرابط)

لكل عضو صوت واحد فقط.
جزاكم الله خير الجزاء.`;
}
let sendListQ='';
function openSendList(){ sendListQ=''; elecView='send'; renderSendList(); }
function renderSendList(){
  const a=getAssembly(); const e=a?a.election:null;
  const host=$('#asmElecBody'); if(!a||!e||!e.cloudId||!host) return;
  const url=electionPageURL(e.cloudId);
  const q=sendListQ.trim();
  const list=(a.attendees||[]).map(id=>members.find(m=>m.id===id)).filter(Boolean)
    .filter(m=>!q||(m.name||'').includes(q)||memberCode(m).includes(q))
    .sort((x,y)=>(x.name||'').localeCompare(y.name||'','ar'));
  const sent=e.sentTo||[];
  host.innerHTML=`
  <button class="btn btn-ghost btn-sm" style="width:100%;margin-bottom:11px" onclick="backToElecSetup()">← رجوع لإدارة الانتخابات</button>
  <div class="el-head"><div class="t">${icon('mail',18,'ico-btn')} إرسال روابط التصويت</div>
    <div class="s">رسالة مخصّصة لكل عضو فيها اسمه ورقم عضويته</div></div>
  <div class="mg-search">${icon('search',16,'ico-btn')}
    <input type="text" id="sendQ" placeholder="ابحث بالاسم أو رقم العضوية…" value="${escapeHtml(sendListQ)}"
           oninput="sendSetQ(this.value)" autocomplete="off" /></div>
  <div class="mg-selbar"><span>أُرسل: <b>${sent.length}</b> من <b>${(a.attendees||[]).length}</b></span>
    ${sent.length?`<span class="mg-links"><a onclick="resetSent()">تصفير</a></span>`:''}</div>
  ${list.length?list.map(m=>{
    const done=sent.includes(m.id);
    const noPhone=!m.phone;
    return `<div class="send-row ${done?'done':''}">
      <div class="send-body">
        <div class="send-n">${escapeHtml(m.name)}</div>
        <div class="send-m">${memberCode(m)}${m.phone?` · <span dir="ltr">${escapeHtml(m.phone)}</span>`:' · بلا رقم'}
          ${isActive(m)?'':' · <span style="color:var(--warn)">غير مفعّل</span>'}</div>
      </div>
      ${noPhone?'<span class="send-no">لا رقم</span>':
        `<a class="send-btn ${done?'done':''}" target="_blank"
            href="${whatsappLink(m.phone, elecPersonalText(a,m,url))}"
            onclick="markSent('${m.id}')">${done?icon('check',15):icon('mail',15)}</a>`}
    </div>`;
  }).join(''):'<div class="lt-empty">لا نتائج</div>'}`;
}
function sendSetQ(v){
  sendListQ=v; renderSendList();
  const i=$('#sendQ'); if(i){ i.focus(); i.setSelectionRange(i.value.length,i.value.length); }
}
async function markSent(mid){
  const a=getAssembly(); const e=a?a.election:null; if(!e) return;
  e.sentTo=e.sentTo||[];
  if(!e.sentTo.includes(mid)){ e.sentTo.push(mid); await saveAssemblies(); }
  setTimeout(renderSendList, 400);
}
async function resetSent(){
  const a=getAssembly(); const e=a?a.election:null; if(!e) return;
  if(!confirm('تصفير قائمة المُرسَل إليهم؟')) return;
  e.sentTo=[]; await saveAssemblies(); renderSendList();
}
function elecWhatsappText(a,url){
  return `🗳️ *انتخابات هيئة محبي الحسين (ع)*\n\nالجمعية العمومية ${a.year}\n\nنرجو من الحضور الكرام التصويت عبر الرابط:\n${url}\n\nلكل عضو صوت واحد فقط.\nجزاكم الله خير الجزاء.`;
}
async function createAsmElection(){
  const a=getAssembly(); if(!a) return;
  a.election={ committees:[], cloudId:'', closed:false, round:1, revoteComms:[], at:new Date().toISOString() };
  await saveAssemblies();
  logAudit('إضافة','الانتخابات',`دورة انتخابية للجمعية ${a.year}`);
  renderAsmElection();
}
async function delAsmElection(){
  const a=getAssembly(); if(!a||!a.election) return;
  if(!confirm('حذف الدورة الانتخابية وكل أصواتها؟')) return;
  if(a.election.cloudId){ try{ await CloudSync.deleteElection(a.election.cloudId); }catch(e){} }
  delete a.election;
  await saveAssemblies();
  logAudit('حذف','الانتخابات',`دورة الجمعية ${a.year}`);
  elecView='setup'; renderAsmElection();
}
async function addElecComm(){
  const e=asmElec(); if(!e) return;
  const name=prompt('اسم اللجنة:'); if(!name||!name.trim()) return;
  e.committees=e.committees||[];
  e.committees.push({ id:'c_'+Date.now(), name:name.trim(), candidates:[] });
  await saveAssemblies(); renderAsmElection();
}
async function delElecComm(cid){
  const e=asmElec(); if(!e) return;
  const c=(e.committees||[]).find(x=>x.id===cid); if(!c) return;
  if(!confirm(`حذف «${c.name}»؟`)) return;
  e.committees=e.committees.filter(x=>x.id!==cid);
  await saveAssemblies(); renderAsmElection();
}
function elecSetCandQ(cid,v){
  elecCandQ[cid]=v; renderAsmElection();
  const i=$('#q_'+cid); if(i){ i.focus(); i.setSelectionRange(i.value.length,i.value.length); }
}
async function addElecCandById(cid,mid){
  const e=asmElec(); if(!e) return;
  const c=(e.committees||[]).find(x=>x.id===cid); if(!c) return;
  const m=members.find(x=>x.id===mid); if(!m) return;
  c.candidates=c.candidates||[];
  c.candidates.push({ id:'cd_'+Date.now(), memberId:m.id, name:m.name, code:memberCode(m) });
  elecCandQ[cid]='';
  await saveAssemblies();
  logAudit('إضافة','الانتخابات',`ترشيح «${m.name}» للجنة «${c.name}»`);
  renderAsmElection();
}
async function delElecCand(cid,cdid){
  const e=asmElec(); if(!e) return;
  const c=(e.committees||[]).find(x=>x.id===cid); if(!c) return;
  c.candidates=(c.candidates||[]).filter(x=>x.id!==cdid);
  await saveAssemblies(); renderAsmElection();
}
/* فتح التصويت — الناخبون من حضور هذه الجمعية */
async function openElecVoting(){
  const a=getAssembly(); const e=a?a.election:null; if(!a||!e) return;
  if(!(e.committees||[]).length){ toast('أضف لجنة واحدة على الأقل'); return; }
  const empty=(e.committees||[]).filter(c=>!(c.candidates||[]).length);
  if(empty.length){ toast(`لجان بلا مرشّحين: ${empty.map(c=>c.name).join('، ')}`); return; }
  const attend=(a.attendees||[]);
  if(!attend.length){ toast('سجّل الحضور أولاً في قسم «الحضور»'); return; }
  const voters=[], eligible=[];
  attend.forEach(id=>{
    const m=members.find(x=>x.id===id); if(!m) return;
    const code=memberCode(m); voters.push(code);
    if(isActive(m)) eligible.push(code);
  });
  if(!confirm(`فتح التصويت؟\n\n• ${voters.length} من حضور الجمعية يمكنهم التصويت\n• ${eligible.length} منهم عضويتهم مفعّلة (أصواتهم صحيحة)\n\n⚠️ بعد الفتح لا يمكن تعديل اللجان.`)) return;
  try{
    const id=await CloudSync.createElection({
      title:`الجمعية العمومية ${a.year}`, year:a.year, committees:e.committees,
      voters, eligible, logo:(typeof HAIAA_LOGO!=='undefined'?HAIAA_LOGO:''), revoteComms:[]
    });
    e.cloudId=id; e.closed=false; e.round=1;
    await saveAssemblies();
    logAudit('فتح','الانتخابات',`التصويت للجمعية ${a.year}`);
    toast('فُتح التصويت'); renderAsmElection();
  }catch(err){ console.error(err); toast('تعذّر فتح التصويت'); }
}
function copyElecLink(){
  const e=asmElec(); if(!e||!e.cloudId) return;
  const url=electionPageURL(e.cloudId);
  const done=()=>toast('نُسخ رابط التصويت');
  navigator.clipboard?.writeText(url).then(done).catch(()=>{
    const t=document.createElement('textarea'); t.value=url; document.body.appendChild(t); t.select();
    try{ document.execCommand('copy'); done(); }catch(_){} document.body.removeChild(t);
  });
}
async function toggleElecClosed(){
  const a=getAssembly(); const e=a?a.election:null; if(!e||!e.cloudId) return;
  const next=!e.closed;
  if(!confirm(next?'إغلاق باب التصويت؟':'إعادة فتح التصويت؟')) return;
  try{
    await CloudSync.updateElection(e.cloudId,{ closed:next });
    e.closed=next; await saveAssemblies();
    logAudit(next?'إغلاق':'فتح','الانتخابات',`الجمعية ${a.year}`);
    toast(next?'أُغلق التصويت':'أُعيد فتح التصويت');
    renderAsmElection();
  }catch(err){ console.error(err); toast('تعذّر التنفيذ'); }
}
/* العدّادات الحيّة */
function startElecLive(){ stopElecLive(); refreshElecLive(); elecLiveTimer=setInterval(refreshElecLive,6000); }
function stopElecLive(){ if(elecLiveTimer){ clearInterval(elecLiveTimer); elecLiveTimer=null; } }
async function refreshElecLive(){
  const e=asmElec(); const box=$('#elecLive');
  if(!e||!e.cloudId||!box) return;
  try{
    const ballots=await CloudSync.fetchBallots(e.cloudId, e.round||1);
    const valid=ballots.filter(b=>b.valid).length, invalid=ballots.length-valid;
    box.innerHTML=`
      <div class="elv ok"><div class="v">${valid}</div><div class="l">صوت صحيح</div></div>
      <div class="elv void"><div class="v">${invalid}</div><div class="l">صوت ملغى</div></div>
      <div class="elv"><div class="v">${ballots.length}</div><div class="l">إجمالي المصوّتين</div></div>`;
  }catch(err){ box.innerHTML='<div class="elv" style="grid-column:1/-1"><div class="l">تعذّر جلب الأصوات</div></div>'; }
}
/* النتائج */
function computeResults(e, ballots){
  const valid=ballots.filter(b=>b.valid);
  const only=(Number(e.round||1)>1 && (e.revoteComms||[]).length) ? e.revoteComms : null;
  return (e.committees||[]).map(c=>{
    const cands=c.candidates||[];
    if(cands.length===1) return { comm:c, acclaim:cands[0], rows:[], tie:false, skipped: only?!only.includes(c.id):false };
    const counts={}; cands.forEach(cd=>counts[cd.id]=0);
    valid.forEach(b=>{ const p=(b.picks||{})[c.id]; if(p!=null && counts[p]!=null) counts[p]++; });
    const rows=cands.map(cd=>({ id:cd.id, name:cd.name, votes:counts[cd.id]||0 })).sort((x,y)=>y.votes-x.votes);
    const mx=rows.length?rows[0].votes:0;
    const tie=rows.filter(r=>r.votes===mx).length>1 && mx>0;
    return { comm:c, acclaim:null, rows, tie, max:mx, skipped: only?!only.includes(c.id):false };
  });
}
function showAsmResults(){ elecView='results'; renderAsmResults(); }
function backToElecSetup(){ elecView='setup'; stopElecLive(); renderAsmElection(); }
async function renderAsmResults(){
  const a=getAssembly(); const e=a?a.election:null;
  const host=$('#asmElecBody'); if(!e||!e.cloudId||!host) return;
  let ballots=[]; try{ ballots=await CloudSync.fetchBallots(e.cloudId, e.round||1); }catch(err){}
  const valid=ballots.filter(b=>b.valid).length, invalid=ballots.length-valid;
  const res=computeResults(e, ballots);
  const ties=res.filter(r=>r.tie && !r.skipped);
  host.innerHTML=`
  <button class="btn btn-ghost btn-sm" style="width:100%;margin-bottom:11px" onclick="backToElecSetup()">← رجوع لإدارة الانتخابات</button>
  <div class="el-head"><div class="t">النتائج</div>
    <div class="s">${e.closed?'التصويت مُغلق':'مباشر · يتحدّث تلقائياً'}${Number(e.round||1)>1?` · الجولة ${e.round}`:''}</div></div>
  <div class="el-live">
    <div class="elv ok"><div class="v">${valid}</div><div class="l">صوت صحيح</div></div>
    <div class="elv void"><div class="v">${invalid}</div><div class="l">صوت ملغى</div></div>
    <div class="elv"><div class="v">${ballots.length}</div><div class="l">إجمالي المصوّتين</div></div>
  </div>
  ${res.filter(r=>!r.skipped).map(r=>{
    if(r.acclaim) return `<div class="res-comm"><div class="res-comm-n">${escapeHtml(r.comm.name)}</div>
      <div style="background:var(--ok-soft);border-radius:10px;padding:12px;display:flex;align-items:center;gap:9px">
        <span style="width:26px;height:26px;border-radius:50%;background:var(--ok);color:#fff;display:inline-flex;align-items:center;justify-content:center">✓</span>
        <b style="color:var(--ok)">${escapeHtml(r.acclaim.name)}</b>
        <span style="font-size:11px;color:var(--muted)">فوز بالتزكية</span></div></div>`;
    const mx=r.max||1;
    return `<div class="res-comm"><div class="res-comm-n">${escapeHtml(r.comm.name)}</div>
      ${r.rows.map(x=>`<div class="bar-row ${(x.votes===r.max && !r.tie && r.max>0)?'win':''}">
        <div class="bar-top"><span>${escapeHtml(x.name)}${(x.votes===r.max && !r.tie && r.max>0)?'<span class="win-tag">فائز</span>':''}</span><b>${x.votes}</b></div>
        <div class="bar"><i style="width:${mx?Math.round(x.votes/mx*100):0}%"></i></div></div>`).join('')}
      ${r.tie?'<div class="tie-note">⚠️ تعادل — يلزم إعادة التصويت لهذه اللجنة</div>':''}
    </div>`;
  }).join('')}
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
    ${(e.closed && ties.length)?`<button class="btn" style="flex:1;background:var(--warn);color:#fff;border:none" onclick="startRevote()">
      ${icon('chevron',15,'ico-btn')} إعادة التصويت (${ties.length})</button>`:''}
    <button class="btn btn-accent" style="flex:1" onclick="printElectionResults()">${icon('print',15,'ico-btn')} محضر النتائج PDF</button>
  </div>
  ${voidVotersList().length?`<button class="btn btn-ghost btn-sm" style="width:100%;margin-top:9px" onclick="showVoidVoters()">
    ${icon('users',15,'ico-btn')} قائمة غير المفعّلين (${voidVotersList().length})</button>`:''}`;
  if(!e.closed){ stopElecLive(); elecLiveTimer=setInterval(renderAsmResults,7000); }
}
function voidVotersList(){
  const a=getAssembly(); if(!a) return [];
  return (a.attendees||[]).map(id=>members.find(m=>m.id===id)).filter(m=>m && !isActive(m));
}
function showVoidVoters(){
  const list=voidVotersList(); if(!list.length){ toast('لا يوجد'); return; }
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>غير المفعّلين</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
  <style>body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:24px;color:#1a2620}
  h1{font-size:18px;color:#1c4536;margin-bottom:6px}p{font-size:12.5px;color:#8a7c6b;margin-bottom:16px}
  table{width:100%;border-collapse:collapse;font-size:13.5px}th,td{border:1px solid #e6ddcb;padding:9px 11px;text-align:right}
  th{background:#1c4536;color:#fff}tr:nth-child(even){background:#faf7f0}a{color:#25d366;text-decoration:none;font-weight:600}
  @media print{.np{display:none}}</style></head><body>
  <div class="np" style="margin-bottom:14px"><button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:9px 16px;border-radius:8px;font-family:inherit;cursor:pointer">🖨️ طباعة</button>
  <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:9px 16px;border-radius:8px;font-family:inherit;cursor:pointer;margin-right:6px">↩︎ عودة</button></div>
  <h1>الحاضرون غير المفعّلة عضويتهم</h1>
  <p>حضروا الجمعية ولم تُحتسب أصواتهم — للتواصل بشأن تفعيل العضوية</p>
  <table><tr><th>#</th><th>الاسم</th><th>رقم العضوية</th><th>الهاتف</th><th>واتساب</th></tr>
  ${list.map((m,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(m.name)}</td><td>${memberCode(m)}</td>
    <td dir="ltr">${escapeHtml(m.phone||'—')}</td>
    <td>${m.phone?`<a href="${whatsappLink(m.phone,'السلام عليكم، نشكر لكم حضوركم الجمعية العمومية. نودّ تذكيركم بتفعيل العضوية لهذا العام.')}" target="_blank">مراسلة</a>`:'—'}</td></tr>`).join('')}
  </table></body></html>`);
  w.document.close();
}
async function startRevote(){
  const a=getAssembly(); const e=a?a.election:null; if(!e||!e.cloudId) return;
  let ballots=[]; try{ ballots=await CloudSync.fetchBallots(e.cloudId, e.round||1); }catch(err){}
  const res=computeResults(e, ballots);
  const ties=res.filter(r=>r.tie && !r.skipped).map(r=>r.comm.id);
  if(!ties.length){ toast('لا توجد لجان متعادلة'); return; }
  const names=res.filter(r=>ties.includes(r.comm.id)).map(r=>r.comm.name).join('، ');
  if(!confirm(`بدء جولة إعادة للجان:\n${names}\n\nسيُفتح التصويت على نفس الرابط، وتظهر هذه اللجان فقط.`)) return;
  const nextRound=Number(e.round||1)+1;
  try{
    await CloudSync.updateElection(e.cloudId,{ round:nextRound, revoteComms:ties, closed:false });
    e.round=nextRound; e.revoteComms=ties; e.closed=false;
    await saveAssemblies();
    logAudit('إعادة تصويت','الانتخابات',`الجولة ${nextRound} — ${names}`);
    toast(`بدأت الجولة ${nextRound}`); renderAsmResults();
  }catch(err){ console.error(err); toast('تعذّر بدء الإعادة'); }
}
async function printElectionResults(){
  const a=getAssembly(); const e=a?a.election:null; if(!e||!e.cloudId) return;
  let ballots=[]; try{ ballots=await CloudSync.fetchBallots(e.cloudId, e.round||1); }catch(err){}
  const valid=ballots.filter(b=>b.valid).length, invalid=ballots.length-valid;
  const res=computeResults(e, ballots);
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>محضر نتائج الانتخابات</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:30px 34px;color:#1a2620;line-height:1.8;font-size:13.5px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:175px;max-height:66px;}
  .pdf-head{text-align:center;padding-bottom:12px;border-bottom:3px double #c19a3e;margin-bottom:15px;}
  .doc-title{font-family:'Amiri',serif;font-size:22px;font-weight:700;color:#1c4536;margin:8px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:12.5px;}
  .sum3{display:flex;gap:11px;margin-bottom:18px;}
  .s3{flex:1;text-align:center;border-radius:13px;padding:16px 10px;border:1px solid #e6ddcb;}
  .s3 .v{font-size:20px;font-weight:800;} .s3 .l{font-size:11.5px;color:#8a7c6b;margin-top:4px;}
  .s3.ok{background:#e9f4ed;} .s3.ok .v{color:#2f8f5b;}
  .s3.void{background:#f9ecec;} .s3.void .v{color:#b85c5c;}
  .s3.all{background:#f6f2ea;} .s3.all .v{color:#1c4536;}
  h2{font-size:14.5px;color:#fff;background:#1c4536;display:inline-block;padding:5px 14px 5px 18px;border-radius:0 16px 16px 0;margin:18px 0 9px;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:14px;}
  th,td{border:1px solid #e6ddcb;padding:8px 11px;text-align:right;}
  th{background:#1c4536;color:#fff;font-size:12.5px;}
  tr:nth-child(even){background:#faf7f0;}
  .win td{background:#e9f4ed;font-weight:800;color:#2f8f5b;}
  .acc-box{background:#e9f4ed;border:1px solid #2f8f5b;border-radius:10px;padding:12px 15px;margin-bottom:10px;}
  .acc-box b{color:#2f8f5b;font-size:15px;} .acc-box span{font-size:12px;color:#5a7a68;margin-right:8px;}
  .tie-box{background:#fbf1e4;border:1px solid #e0b088;border-radius:10px;padding:11px 14px;font-size:12.5px;color:#8a5a2a;font-weight:600;margin-bottom:10px;}
  .sig{margin-top:40px;text-align:left;padding-left:20px;}
  .sig img{max-width:150px;display:block;margin-bottom:2px;}
  .sig-line{width:190px;border-bottom:1px solid #8a7c6b;margin-bottom:6px;}
  .sig-t{font-size:12px;color:#8a7c6b;} .sig-n{font-weight:700;color:#1c4536;}
  .foot{margin-top:26px;padding-top:11px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:20px;} .no-print{display:none;} tr{page-break-inside:avoid;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">محضر نتائج الانتخابات</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · الجمعية العمومية ${a.year} · ${hijriToday()}${Number(e.round||1)>1?` · الجولة ${e.round}`:''}</div></div>
  <div class="sum3">
    <div class="s3 ok"><div class="v">${valid}</div><div class="l">صوت صحيح</div></div>
    <div class="s3 void"><div class="v">${invalid}</div><div class="l">صوت ملغى</div></div>
    <div class="s3 all"><div class="v">${ballots.length}</div><div class="l">إجمالي المصوّتين</div></div>
  </div>
  ${res.filter(r=>!r.skipped).map(r=>{
    if(r.acclaim) return `<h2>${escapeHtml(r.comm.name)}</h2>
      <div class="acc-box"><b>${escapeHtml(r.acclaim.name)}</b><span>فوز بالتزكية — المرشّح الوحيد</span></div>`;
    return `<h2>${escapeHtml(r.comm.name)}</h2>
      ${r.tie?'<div class="tie-box">⚠️ تعادل — يلزم إعادة التصويت لهذه اللجنة</div>':''}
      <table><tr><th>#</th><th>المرشّح</th><th>الأصوات</th><th>النسبة</th><th>النتيجة</th></tr>
      ${r.rows.map((x,i)=>`<tr class="${(x.votes===r.max && !r.tie && r.max>0)?'win':''}">
        <td>${i+1}</td><td>${escapeHtml(x.name)}</td><td>${x.votes}</td>
        <td>${valid?Math.round(x.votes/valid*100):0}%</td>
        <td>${(x.votes===r.max && !r.tie && r.max>0)?'فائز':'—'}</td></tr>`).join('')}
      </table>`;
  }).join('')}
  <div class="sig"><img src="${HAIAA_SIGNATURE}" alt="" /><div class="sig-line"></div>
    <div class="sig-t">أمين السر</div><div class="sig-n">صادق الغسرة</div></div>
  <div class="foot">هيئة محبي الحسين (ع) — محضر رسمي لنتائج الانتخابات</div>
  </body></html>`);
  w.document.close(); w.focus();
}


/* ═══════════ الأرشيف الإعلامي ═══════════ */
const MED_TYPES = ['مجلس عزاء','مجلس فرح','محاضرة','مسرحية','فيلم','مونتاج','بث مباشر','لقاء','قصيدة','نشيد','تصميم','صور'];
const MED_SOURCES = ['YouTube','Instagram','Google Drive','Facebook','Vimeo','أخرى'];
const MED_STATUS = { ok:'يعمل', bad:'محذوف', priv:'خاص', chk:'يحتاج مراجعة' };
const MED_KEYWORDS = ['محرم','صفر','رمضان','عاشوراء','ليلة العاشر','الأربعين','التاسع','استقبال','موكب','مجلس',
  'تغطية','لطم','قصيدة','خطبة','ذكرى','ولادة','شهادة','مسيرة','عزاء','احتفال'];

let medFilter = { q:'', type:'', src:'', year:'' };
let medEditId = null;

/* استخراج معرّف يوتيوب والصورة المصغّرة */
function ytId(url){
  if(!url) return '';
  const m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : '';
}
function medThumb(m){
  if(m.thumb) return m.thumb;
  const y=ytId(m.url);
  if(y) return `https://img.youtube.com/vi/${y}/hqdefault.jpg`;
  const dm=String(m.url||'').match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if(dm) return `https://drive.google.com/thumbnail?id=${dm[1]}&sz=w480`;
  return '';
}
function medSourceOf(url){
  const u=String(url||'').toLowerCase();
  if(/youtu\.?be|youtube/.test(u)) return 'YouTube';
  if(/instagram/.test(u)) return 'Instagram';
  if(/drive\.google/.test(u)) return 'Google Drive';
  if(/facebook|fb\.watch/.test(u)) return 'Facebook';
  if(/vimeo/.test(u)) return 'Vimeo';
  return 'أخرى';
}
function medIconFor(t){
  if(/مسرح|فيلم|مونتاج|بث/.test(t)) return 'image';
  if(/قصيدة|نشيد/.test(t)) return 'mic';
  if(/تصميم|صور/.test(t)) return 'image';
  return 'doc';
}

function openMediaArchive(){ medEditId=null; openFullPage('media'); renderMediaArchive(); }
function closeMediaArchive(){ switchTab('meetings'); setTimeout(()=>openIdara('media'),80); }

function renderMediaArchive(){
  const host=$('#mediaBody'); if(!host) return;
  const f=medFilter;
  let list=[...mediaItems];
  if(f.type) list=list.filter(m=>m.type===f.type);
  if(f.src) list=list.filter(m=>(m.source||medSourceOf(m.url))===f.src);
  if(f.year) list=list.filter(m=>String(m.hYear||'')===f.year);
  if(f.q){ const q=f.q.trim();
    list=list.filter(m=>[m.title,m.occasion,m.place,m.people,m.committee,m.desc,(m.keywords||[]).join(' '),m.type]
      .some(x=>String(x||'').includes(q))); }
  list.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.at||'').localeCompare(a.at||''));
  const years=[...new Set(mediaItems.map(m=>m.hYear).filter(Boolean))].sort((a,b)=>b-a);
  host.innerHTML=`
  <div class="med-head"><div class="t">${icon('image',18,'ico-btn')} الأرشيف الإعلامي</div>
    <div class="s">${mediaItems.length} مادة · صور وفيديوهات وتسجيلات وتصاميم</div></div>

  <button class="btn btn-primary" style="width:100%;margin-bottom:12px" onclick="openMediaForm()">
    ${icon('plus',17,'ico-btn')} إضافة مادة إعلامية</button>

  <div class="med-filters">
    <div class="mg-search" style="margin-bottom:9px">${icon('search',16,'ico-btn')}
      <input type="text" id="medQ" placeholder="ابحث بالعنوان أو المناسبة أو المشاركين أو الكلمات…"
             value="${escapeHtml(f.q)}" oninput="medSet('q',this.value)" autocomplete="off" /></div>
    <div class="med-chips">
      <button class="med-chip ${!f.type?'on':''}" onclick="medSet('type','')">كل الأنواع</button>
      ${MED_TYPES.filter(t=>mediaItems.some(m=>m.type===t)).map(t=>`
        <button class="med-chip ${f.type===t?'on':''}" onclick="medSet('type','${t}')">${t}</button>`).join('')}
    </div>
    <div class="med-chips" style="margin-top:6px">
      <button class="med-chip ${!f.src?'on':''}" onclick="medSet('src','')">كل المصادر</button>
      ${MED_SOURCES.filter(s=>mediaItems.some(m=>(m.source||medSourceOf(m.url))===s)).map(s=>`
        <button class="med-chip ${f.src===s?'on':''}" onclick="medSet('src','${s}')">${s}</button>`).join('')}
      ${years.map(y=>`<button class="med-chip ${f.year===String(y)?'on':''}" onclick="medSet('year','${y}')">${y} هـ</button>`).join('')}
    </div>
  </div>

  <div class="mg-selbar"><span>${list.length} ${list.length===1?'مادة':'مادة'}</span>
    ${(f.q||f.type||f.src||f.year)?`<span class="mg-links"><a onclick="medReset()">مسح الفلاتر</a></span>`:''}</div>

  ${list.length?`<div class="med-grid">${list.map(m=>{
    const th=medThumb(m), src=m.source||medSourceOf(m.url);
    const st=m.status||'chk';
    return `<div class="med-item">
      <div class="med-thumb" onclick="openMediaSource('${m.id}')">
        ${th?`<img src="${th}" alt="" loading="lazy" onerror="this.style.display='none'" />`:''}
        ${!th?`<span class="ph">${icon(medIconFor(m.type),34)}</span>`:''}
        <span class="play">${icon('link',20)}</span>
        <span class="src">${escapeHtml(src)}</span>
        ${m.duration?`<span class="dur">${escapeHtml(m.duration)}</span>`:''}
      </div>
      <div class="med-b">
        <div onclick="openMediaSource('${m.id}')">
          <div class="med-t"><span class="med-st ${st}" title="${MED_STATUS[st]||''}"></span>${escapeHtml(m.title||'—')}</div>
          <div class="med-m">${escapeHtml(m.type||'')}${m.occasion?' · '+escapeHtml(m.occasion):''}
            ${m.hijri?`<br>${escapeHtml(m.hijri)}`:(m.date?`<br>${fmtDate(m.date)}`:'')}</div>
          ${(m.keywords||[]).length?`<div class="med-tags">${m.keywords.slice(0,3).map(k=>`<span class="med-tag">${escapeHtml(k)}</span>`).join('')}</div>`:''}
        </div>
        <button class="med-edit" onclick="event.stopPropagation();openMediaForm('${m.id}')">
          ${icon('edit',13,'ico-btn')} تعديل البيانات</button>
      </div>
    </div>`;
  }).join('')}</div>`:`<div class="lt-empty">${f.q||f.type||f.src||f.year?'لا نتائج مطابقة':'لا مواد بعد — اضغط «إضافة مادة إعلامية»'}</div>`}`;
}
function openMediaSource(id){
  const m=mediaItems.find(x=>x.id===id); if(!m) return;
  if(!m.url){ toast('لا يوجد رابط'); return; }
  window.open(m.url, '_blank');
}
function medSet(k,v){
  medFilter[k]=v; renderMediaArchive();
  if(k==='q'){ const i=$('#medQ'); if(i){ i.focus(); i.setSelectionRange(i.value.length,i.value.length); } }
}
function medReset(){ medFilter={q:'',type:'',src:'',year:''}; renderMediaArchive(); }

/* نموذج الإضافة/التعديل */
let medKeywords=[];
function openMediaForm(id){
  medEditId=id||null;
  const m = id ? mediaItems.find(x=>x.id===id) : null;
  medKeywords = m ? [...(m.keywords||[])] : [];
  renderMediaForm(m);
}
function renderMediaForm(m){
  const host=$('#mediaBody');
  const d=m?m.date:today();
  const th=m?medThumb(m):'';
  host.innerHTML=`
  <button class="btn btn-ghost btn-sm" style="width:100%;margin-bottom:11px" onclick="renderMediaArchive()">← رجوع للأرشيف</button>
  <div class="med-head"><div class="t">${m?'تعديل المادة':'مادة إعلامية جديدة'}</div></div>
  <div class="lt-form">
    ${th?`<div class="mf-prev"><img src="${th}" alt="" /></div>`:''}
    <div class="mf-fld"><label>رابط المصدر</label>
      <input id="mfUrl" type="url" dir="ltr" placeholder="https://youtube.com/watch?v=..." value="${escapeHtml(m?m.url:'')}" oninput="medUrlChanged()" /></div>
    <div class="mf-row">
      <div class="mf-fld"><label>المصدر</label>
        <select id="mfSource">${MED_SOURCES.map(s=>`<option value="${s}" ${(m&&(m.source||medSourceOf(m.url))===s)?'selected':''}>${s}</option>`).join('')}</select></div>
      <div class="mf-fld"><label>حالة الرابط</label>
        <select id="mfStatus">${Object.entries(MED_STATUS).map(([k,v])=>`<option value="${k}" ${(m&&m.status===k)?'selected':''}>${v}</option>`).join('')}</select></div>
    </div>
    <div class="mf-fld"><label>عنوان المادة</label>
      <input id="mfTitle" type="text" placeholder="عنوان المقطع" value="${escapeHtml(m?m.title:'')}" /></div>
    <div class="mf-row">
      <div class="mf-fld"><label>النوع</label>
        <select id="mfType">${MED_TYPES.map(t=>`<option value="${t}" ${(m&&m.type===t)?'selected':''}>${t}</option>`).join('')}</select></div>
      <div class="mf-fld"><label>المدة</label>
        <input id="mfDuration" type="text" dir="ltr" placeholder="00:45:20" value="${escapeHtml(m?(m.duration||''):'')}" /></div>
    </div>
    <div class="mf-fld"><label>المناسبة</label>
      <input id="mfOccasion" type="text" placeholder="ليلة عاشوراء ١٤٤٨" value="${escapeHtml(m?(m.occasion||''):'')}" /></div>
    <div class="mf-row">
      <div class="mf-fld"><label>التاريخ الميلادي</label>
        <input id="mfDate" type="date" value="${d}" onchange="medDateChanged()" /></div>
      <div class="mf-fld"><label>التاريخ الهجري</label>
        <input id="mfHijri" type="text" placeholder="تلقائي" value="${escapeHtml(m?(m.hijri||''):gregToHijri(d))}" readonly style="opacity:.8" /></div>
    </div>
    <div class="mf-fld"><label>المكان</label>
      <input id="mfPlace" type="text" placeholder="مأتم بني جمرة" value="${escapeHtml(m?(m.place||''):'')}" /></div>
    <div class="mf-fld"><label>المشاركون <span style="font-weight:400;color:var(--muted)">(خطيب / رادود / شاعر)</span></label>
      <input id="mfPeople" type="text" placeholder="الملا باسم الكربلائي" value="${escapeHtml(m?(m.people||''):'')}" /></div>
    <div class="mf-fld"><label>اللجنة أو الجهة المنظّمة</label>
      <input id="mfCommittee" type="text" placeholder="اللجنة الإعلامية" value="${escapeHtml(m?(m.committee||''):'')}" /></div>
    <div class="mf-fld"><label>وصف مختصر</label>
      <textarea id="mfDesc" rows="3" placeholder="وصف المحتوى…">${escapeHtml(m?(m.desc||''):'')}</textarea></div>
    <div class="mf-fld"><label>الكلمات المفتاحية</label>
      <div class="kw-picked" id="kwPicked"></div>
      <div class="med-chips" id="kwChips"></div>
      <div style="display:flex;gap:7px;margin-top:8px">
        <input id="kwNew" type="text" placeholder="أضف كلمة جديدة…" style="flex:1" />
        <button class="btn btn-ghost btn-sm" style="width:auto;padding:9px 14px" onclick="kwAddCustom()">${icon('plus',15)}</button>
      </div>
    </div>
    <div class="lt-actions">
      <button class="btn btn-primary" onclick="saveMediaItem()">${icon('check',16,'ico-btn')} حفظ</button>
      ${m?`<a class="btn btn-accent" href="${escapeHtml(m.url||'#')}" target="_blank" style="text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px">${icon('link',16,'ico-btn')} فتح المصدر</a>`:''}
      ${m?`<button class="btn" style="background:var(--danger);color:#fff;border:none" onclick="delMediaItem('${m.id}')">${icon('trash',16,'ico-btn')} حذف</button>`:''}
    </div>
  </div>`;
  renderKeywords();
}
function renderKeywords(){
  const picked=$('#kwPicked'), chips=$('#kwChips');
  if(picked) picked.innerHTML = medKeywords.map((k,i)=>`<span class="kw-tag" onclick="kwRemove(${i})">${escapeHtml(k)} ×</span>`).join('');
  if(chips) chips.innerHTML = MED_KEYWORDS.filter(k=>!medKeywords.includes(k))
    .map(k=>`<button class="med-chip" onclick="kwAdd('${k}')">${k}</button>`).join('');
}
function kwAdd(k){ if(!medKeywords.includes(k)) medKeywords.push(k); renderKeywords(); }
function kwRemove(i){ medKeywords.splice(i,1); renderKeywords(); }
function kwAddCustom(){
  const v=($('#kwNew').value||'').trim(); if(!v) return;
  if(!medKeywords.includes(v)) medKeywords.push(v);
  $('#kwNew').value=''; renderKeywords();
}
function medUrlChanged(){
  const u=$('#mfUrl').value;
  const s=$('#mfSource'); if(s) s.value=medSourceOf(u);
  const y=ytId(u);
  if(y){
    const p=document.querySelector('.mf-prev');
    const html=`<img src="https://img.youtube.com/vi/${y}/hqdefault.jpg" alt="" />`;
    if(p) p.innerHTML=html;
    else { const d=document.createElement('div'); d.className='mf-prev'; d.innerHTML=html;
           document.querySelector('.lt-form').prepend(d); }
    checkYtStatus(y);
  }
}
/* فحص حالة رابط يوتيوب تلقائياً */
async function checkYtStatus(id){
  try{
    const r=await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
    const st=$('#mfStatus');
    if(r.ok){
      const j=await r.json();
      if(st) st.value='ok';
      const t=$('#mfTitle'); if(t && !t.value.trim() && j.title) t.value=j.title;
      toast('الرابط يعمل ✓');
    } else { if(st) st.value = r.status===401 ? 'priv' : 'bad'; }
  }catch(e){ /* الشبكة أو CORS — نترك الحالة كما هي */ }
}
function medDateChanged(){
  const d=$('#mfDate').value;
  const h=$('#mfHijri'); if(h) h.value=d?gregToHijri(d):'';
}
async function saveMediaItem(){
  const url=($('#mfUrl').value||'').trim();
  const title=($('#mfTitle').value||'').trim();
  if(!title){ toast('اكتب عنوان المادة'); return; }
  if(!url){ toast('أدخل رابط المصدر'); return; }
  const d=$('#mfDate').value||today();
  const data={
    url, title, type:$('#mfType').value, source:$('#mfSource').value, status:$('#mfStatus').value,
    duration:($('#mfDuration').value||'').trim(), occasion:($('#mfOccasion').value||'').trim(),
    date:d, hijri:$('#mfHijri').value||gregToHijri(d), hYear:parseInt((gregToHijri(d).match(/\d{4}/)||[])[0],10)||null,
    place:($('#mfPlace').value||'').trim(), people:($('#mfPeople').value||'').trim(),
    committee:($('#mfCommittee').value||'').trim(), desc:($('#mfDesc').value||'').trim(),
    keywords:[...medKeywords]
  };
  if(medEditId){
    const m=mediaItems.find(x=>x.id===medEditId);
    if(m) Object.assign(m, data, { updatedAt:new Date().toISOString() });
    logAudit('تعديل','الأرشيف الإعلامي',`«${title}»`);
  } else {
    mediaItems.push({ id:'md_'+Date.now(), ...data, at:new Date().toISOString() });
    logAudit('إضافة','الأرشيف الإعلامي',`«${title}» — ${data.type}`);
  }
  await saveMediaItems();
  toast('حُفظت المادة');
  renderMediaArchive();
}
async function delMediaItem(id){
  const m=mediaItems.find(x=>x.id===id); if(!m) return;
  if(!confirm(`حذف «${m.title}»؟`)) return;
  mediaItems=mediaItems.filter(x=>x.id!==id);
  await saveMediaItems();
  logAudit('حذف','الأرشيف الإعلامي',`«${m.title}»`);
  renderMediaArchive();
}

/* ═══════════ الرسائل الرسمية ═══════════ */
let editingLetterId = null;

function openLettersPage(){ openFullPage('letters'); renderLetters(); }
function closeLettersPage(){ switchTab('meetings'); setTimeout(()=>openIdara('sec'),80); }
function renderLetters(){
  const box=$('#lettersList'); if(!box) return;
  const list=[...letters].sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  const cnt=$('#lettersCount'); if(cnt) cnt.textContent = list.length?`${list.length} رسالة في الأرشيف`:'لا رسائل بعد';
  if(!list.length){ box.innerHTML='<div class="lt-empty">لا رسائل بعد — اضغط «رسالة جديدة» للبدء</div>'; return; }
  box.innerHTML=''+
    list.map(l=>`<div class="lt-row" onclick="openLetterEditor('${l.id}')">
      <div style="flex:1;min-width:0">
        <div class="lt-subj">${escapeHtml(l.subject||'بلا موضوع')}</div>
        <div class="lt-meta">${escapeHtml(l.to||'—')} · ${l.date?fmtDate(l.date):''}</div>
      </div>
      <span class="lt-arrow">›</span>
    </div>`).join('');
}

function openLetterEditor(id){
  editingLetterId = id || null;
  renderLetterEditor();
  openFullPage('letter');
}
function closeLetterEditor(){ openLettersPage(); }
function renderLetterEditor(){
  const l = editingLetterId ? letters.find(x=>x.id===editingLetterId) : null;
  const d = l ? l.date : today();
  $('#letterBody').innerHTML=`
  <div class="lt-form">
    <div class="stats-sec-title" style="margin-top:0">${l?'تعديل الرسالة':'رسالة رسمية جديدة'}</div>
    <div class="lt-date">${icon('calendar',15,'ico-btn')} التاريخ: <b>${gregToHijri(d)}</b> · الموافق ${fmtDate(d)}</div>
    <div class="lt-fld"><label>التاريخ</label>
      <input id="ltDate" type="date" value="${d}" onchange="renderLetterEditor()" /></div>
    <div class="lt-fld"><label>المرسل إليه</label>
      <input id="ltTo" type="text" placeholder="سعادة الأخ الكريم / رئيس مجلس إدارة …" value="${escapeHtml(l?l.to:'')}" /></div>
    <div class="lt-fld"><label>صفة إضافية <span style="font-weight:400;color:var(--muted)">(اختياري)</span></label>
      <input id="ltToSub" type="text" placeholder="حفظه الله ورعاه" value="${escapeHtml(l?(l.toSub||'حفظه الله ورعاه'):'حفظه الله ورعاه')}" /></div>
    <div class="lt-fld"><label>الموضوع</label>
      <input id="ltSubject" type="text" placeholder="موضوع الرسالة" value="${escapeHtml(l?l.subject:'')}" /></div>
    <div class="lt-fld"><label>نص الرسالة</label>
      <textarea id="ltBody" rows="11" placeholder="اكتب نص الرسالة هنا…">${escapeHtml(l?l.body:'')}</textarea>
      <div class="hint">اترك سطراً فارغاً بين الفقرات — سيظهر التباعد في الطباعة</div></div>
    <div class="lt-fld"><label>التوقيع</label>
      <input id="ltSigner" type="text" value="${escapeHtml(l?(l.signer||'صادق الغسرة'):'صادق الغسرة')}" /></div>
    <div class="lt-fld"><label>الصفة</label>
      <input id="ltRole" type="text" value="${escapeHtml(l?(l.role||'أمين السر'):'أمين السر')}" /></div>
    <div class="stats-sec-title">بيانات المتابعة <span style="font-weight:400;font-size:11.5px;color:var(--muted)">(تظهر يمين أسفل الرسالة)</span></div>
    <div class="lt-fld"><label>اسم المسؤول / المتابع</label>
      <input id="ltContact" type="text" placeholder="اسم من يُتواصل معه" value="${escapeHtml(l?(l.contact||''):'')}" /></div>
    <div class="lt-fld"><label>رقم الهاتف</label>
      <input id="ltPhone" type="tel" inputmode="tel" placeholder="+973…" value="${escapeHtml(l?(l.phone||''):'')}" /></div>
    <div class="lt-actions">
      <button class="btn btn-primary" onclick="saveLetter()">${icon('check',16,'ico-btn')} حفظ</button>
      <button class="btn btn-accent" onclick="printLetter()">${icon('print',16,'ico-btn')} طباعة</button>
      ${l?`<button class="btn" style="background:var(--danger);color:#fff;border:none" onclick="deleteLetter('${l.id}')">${icon('trash',16,'ico-btn')} حذف</button>`:''}
    </div>
  </div>`;
}
function readLetterForm(){
  return {
    date: $('#ltDate').value||today(),
    to: ($('#ltTo').value||'').trim(),
    toSub: ($('#ltToSub').value||'').trim(),
    subject: ($('#ltSubject').value||'').trim(),
    body: ($('#ltBody').value||'').trim(),
    signer: ($('#ltSigner').value||'').trim()||'صادق الغسرة',
    role: ($('#ltRole').value||'').trim()||'أمين السر',
    contact: ($('#ltContact').value||'').trim(),
    phone: ($('#ltPhone').value||'').trim()
  };
}
async function saveLetter(){
  const f=readLetterForm();
  if(!f.subject){ toast('اكتب موضوع الرسالة'); return; }
  if(editingLetterId){
    const l=letters.find(x=>x.id===editingLetterId);
    if(l) Object.assign(l, f, { updatedAt:new Date().toISOString() });
    logAudit('تعديل','الرسائل',`رسالة «${f.subject}»`);
  } else {
    const id='lt_'+Date.now();
    letters.push({ id, ...f, at:new Date().toISOString() });
    editingLetterId=id;
    logAudit('إضافة','الرسائل',`رسالة «${f.subject}» إلى ${f.to||'—'}`);
  }
  await saveLetters();
  toast('حُفظت الرسالة');
  renderLetterEditor();
}
async function deleteLetter(id){
  const l=letters.find(x=>x.id===id); if(!l) return;
  if(!confirm(`حذف الرسالة «${l.subject}»؟`)) return;
  letters=letters.filter(x=>x.id!==id);
  await saveLetters();
  logAudit('حذف','الرسائل',`رسالة «${l.subject}»`);
  closeLetterEditor();
}

/* طباعة الرسالة بالترويسة والختم */
function printLetter(){
  const f = readLetterForm();
  if(!f.subject && !f.body){ toast('اكتب الرسالة أولاً'); return; }
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${escapeHtml(f.subject||'رسالة رسمية')}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;background:#e9e5dd;padding:20px}
  .page{width:210mm;min-height:297mm;background:#fff;margin:0 auto;padding:22mm 20mm 18mm;position:relative;
    box-shadow:0 8px 30px -14px rgba(0,0,0,.3);display:flex;flex-direction:column}
  .lh{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-bottom:14px;border-bottom:3px double #c19a3e}
  .lh-logo{max-width:150px;max-height:62px}
  .lh-txt{text-align:left;font-size:11px;color:#8a7c6b;line-height:1.9}
  .lh-txt b{display:block;font-family:'Amiri',serif;font-size:15px;color:#1c4536;margin-bottom:2px}
  .meta{font-size:12px;color:#5a5148;margin:14px 0 20px}
  .meta b{color:#1c4536}
  .to{font-size:15px;font-weight:700;color:#1c4536;margin-bottom:4px}
  .to-sub{font-size:12.5px;color:#8a7c6b;margin-bottom:16px}
  .subj{background:#f6f2ea;border-right:4px solid #c19a3e;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:18px}
  .subj span{font-size:11.5px;color:#8a7c6b;display:block;margin-bottom:3px}
  .subj b{font-size:14.5px;color:#1c4536}
  .salam{font-size:14px;color:#1c4536;font-weight:600;margin-bottom:12px}
  .body-txt{font-size:14px;line-height:2.15;text-align:justify;color:#241f1b;white-space:pre-wrap;flex:1}
  .sign-area{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;margin-top:30px;gap:14px}
  .sign{text-align:center;grid-column:3}
  .sign img{max-width:150px;display:block;margin:0 auto 2px}
  .sign-line{border-bottom:1px solid #8a7c6b;margin-bottom:7px}
  .sign-t{font-size:12px;color:#8a7c6b}
  .sign-n{font-size:14.5px;font-weight:700;color:#1c4536}
  .stamp-mid{grid-column:2;display:flex;justify-content:center;align-items:flex-end;padding-bottom:6px}
  .contact-box{grid-column:1;text-align:right;padding-bottom:8px}
  .cb-l{font-size:10.5px;color:#8a7c6b;margin-bottom:5px}
  .cb-n{font-size:13px;font-weight:700;color:#1c4536}
  .cb-p{font-size:12.5px;color:#5a5148;margin-top:3px;direction:ltr;unicode-bidi:isolate;font-variant-numeric:lining-nums}
  .ink-stamp{position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;
    padding:15px 28px 13px;border:5px solid #123a6b;border-radius:9px;transform:rotate(-8deg);
    filter:url(#inkRough);opacity:.97;background:transparent}
  .ink-stamp::before{content:'';position:absolute;inset:6px;border:2px solid #123a6b;border-radius:5px}
  .ink-stamp img{max-width:140px;max-height:52px;display:block;
    filter:url(#inkRough2) invert(15%) sepia(88%) saturate(2400%) hue-rotate(206deg) brightness(78%) contrast(105%)}
  .ink-stamp .st-sub{font-size:10px;font-weight:700;color:#123a6b;letter-spacing:.8px;margin-top:6px;filter:url(#inkRough2)}
  .lf{margin-top:auto;padding-top:14px;border-top:1px solid #e6ddcb;text-align:center;font-size:10.5px;color:#b3a894}
  .no-print{position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99}
  .no-print button{border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;color:#fff}
  @page{ size:A4 portrait; margin:0; }
  @media print{
    html,body{background:#fff;padding:0;margin:0;width:210mm}
    .page{box-shadow:none;margin:0;width:210mm;height:297mm;min-height:297mm;padding:20mm 18mm 15mm;page-break-after:avoid}
    .no-print{display:none}
    .ink-stamp,.ink-stamp img,.ink-stamp .st-sub{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    *{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style></head><body>
  <svg width="0" height="0" style="position:absolute">
   <filter id="inkRough">
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="7" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="3" result="n2"/>
     <feColorMatrix in="n2" type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.4 1.05" result="mask"/>
     <feComposite in="d" in2="mask" operator="in"/>
   </filter>
   <filter id="inkRough2">
     <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" seed="12" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" seed="9" result="n2"/>
     <feColorMatrix in="n2" type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.6 1.12" result="mask"/>
     <feComposite in="d" in2="mask" operator="in"/>
   </filter>
  </svg>
  <div class="no-print">
    <button onclick="window.print()" style="background:#1c4536">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b">↩︎ عودة</button>
  </div>
  <div class="page">
    <div class="lh"><img class="lh-logo" src="${HAIAA_LOGO}" alt="" />
      <div class="lh-txt"><b>هيئة محبي الحسين (ع)</b>بني جمرة — مملكة البحرين</div></div>
    <div class="meta">التاريخ: <b>${escapeHtml(gregToHijri(f.date))}</b> · الموافق ${fmtDate(f.date)}</div>
    ${f.to?`<div class="to">${escapeHtml(f.to)}</div>`:''}
    ${f.toSub?`<div class="to-sub">${escapeHtml(f.toSub)}</div>`:''}
    ${f.subject?`<div class="subj"><span>الموضوع</span><b>${escapeHtml(f.subject)}</b></div>`:''}
    <div class="salam">السلام عليكم ورحمة الله وبركاته، وبعد؛</div>
    <div class="body-txt">${escapeHtml(f.body)}</div>
    <div class="sign-area">
      ${(f.contact||f.phone)?`<div class="contact-box">
        <div class="cb-l">للتواصل والمتابعة</div>
        ${f.contact?`<div class="cb-n">${escapeHtml(f.contact)}</div>`:''}
        ${f.phone?`<div class="cb-p" dir="ltr">${escapeHtml(f.phone)}</div>`:''}
      </div>`:'<div></div>'}
      <div class="stamp-mid">
        <div class="ink-stamp"><img src="${HAIAA_LOGO}" alt="" /><div class="st-sub">بني جمرة — البحرين</div></div>
      </div>
      <div class="sign"><img src="${HAIAA_SIGNATURE}" alt="" /><div class="sign-line"></div>
        <div class="sign-t">${escapeHtml(f.role)}</div><div class="sign-n">${escapeHtml(f.signer)}</div></div>
    </div>
    <div class="lf">هيئة محبي الحسين (ع) — بني جمرة · وثيقة رسمية صادرة عن أمانة السر</div>
  </div></body></html>`);
  w.document.close(); w.focus();
}

/* ═══════════ الأرشيف السنوي ═══════════ */
function renderArchive(){
  const host=$('#archList'); if(!host) return;
  const sub=$('#archSub');
  const list=[...archives].sort((a,b)=>(b.year||0)-(a.year||0));
  if(sub) sub.textContent = list.length?`${list.length} سنة مؤرشفة`:'لا سنوات مؤرشفة بعد';
  if(!list.length){ host.innerHTML=`<div class="arch-empty"><div style="font-size:38px;margin-bottom:8px;">${icon('archive',17,'ico-btn')}</div><div>لا توجد سنوات مؤرشفة بعد.<br>عند بداية محرم استخدم «إغلاق السنة» أدناه.</div></div>`; return; }
  host.innerHTML=list.map(a=>`
    <div class="arch-row" onclick="openArchYear(${a.year})">
      <div>
        <div class="arch-year">${icon('archive',17,'ico-btn')} سنة ${a.year} هـ</div>
        <div class="arch-meta">${(a.members||[]).length} عضو · ${(a.miqats||[]).length} ميقات · ${(a.meetings||[]).length} اجتماع · ${((a.finance||{}).expenses||[]).length} مصروف</div>
      </div>
      <div class="arch-arrow">›</div>
    </div>`).join('');
}
let currentArchYear=null;
function openArchYear(year){
  currentArchYear=archives.find(a=>a.year===year); if(!currentArchYear) return;
  renderArchYear(); openFullPage('archyear');
}
function closeArchYear(){ switchTab('meetings'); openIdara('archive'); }
function renderArchYear(){
  const a=currentArchYear; if(!a) return;
  const exps=(a.finance||{}).expenses||[];
  const expTotal=exps.reduce((s,e)=>s+(Number(e.cost)||0),0);
  const paidMembers=(a.members||[]).filter(m=>m.paymentDate).length;
  const radEvals=a.radoodEvals||[];
  const projs=a.projects||[];
  $('#archYearBody').innerHTML=`
  <div class="panel" style="padding:0;overflow:hidden;">
    <div class="ay-head">
      <div class="ay-year">${icon('archive',17,'ico-btn')} ${a.year} هـ</div>
      <div class="ay-sub">أُرشِفت في ${a.archivedAt?new Date(a.archivedAt).toLocaleDateString('ar'):'—'}</div>
    </div>
    <div class="ay-sec">
      <div class="ay-sec-h">${icon('chart',17,'ico-btn')} ملخّص السنة</div>
      <div class="ay-kpis">
        <div class="ay-kpi"><div class="v">${(a.members||[]).length}</div><div class="l">عضو</div></div>
        <div class="ay-kpi"><div class="v">${paidMembers}</div><div class="l">سدّدوا الاشتراك</div></div>
        <div class="ay-kpi"><div class="v">${(a.miqats||[]).length}</div><div class="l">ميقات</div></div>
        <div class="ay-kpi"><div class="v">${(a.meetings||[]).length}</div><div class="l">اجتماع</div></div>
        <div class="ay-kpi"><div class="v">${finMoney(expTotal)}</div><div class="l">المصروفات</div></div>
        <div class="ay-kpi"><div class="v">${finMoney((a.finance||{}).total||0)}</div><div class="l">الرصيد الختامي</div></div>
        <div class="ay-kpi"><div class="v">${radEvals.length}</div><div class="l">تقييم رادود</div></div>
        <div class="ay-kpi"><div class="v">${projs.length}</div><div class="l">مشروع</div></div>
        <div class="ay-kpi"><div class="v">${(a.photos||[]).length}</div><div class="l">صورة بالألبوم</div></div>
      </div>
    </div>
    ${(a.meetings||[]).length?`<div class="ay-sec"><div class="ay-sec-h">${icon('calendar',17,'ico-btn')} الاجتماعات</div>
      <div class="ay-list">${a.meetings.slice(0,20).map(m=>`<div>${escapeHtml(m.title||'اجتماع')} — ${m.date?fmtDate(m.date):''} <span style="color:var(--muted-2)">(${(m.decisions||[]).length} قرار)</span></div>`).join('')}</div></div>`:''}
    ${exps.length?`<div class="ay-sec"><div class="ay-sec-h">${icon('money',17,'ico-btn')} أعلى المصروفات</div>
      <div class="ay-list">${Object.entries(exps.reduce((o,e)=>{o[e.type]=(o[e.type]||0)+(Number(e.cost)||0);return o;},{})).sort((x,y)=>y[1]-x[1]).slice(0,8).map(([k,v])=>`<div>${escapeHtml(k)} — <b>${finMoney(v)}</b></div>`).join('')}</div></div>`:''}
    ${radEvals.length?`<div class="ay-sec"><div class="ay-sec-h">${icon('candle',17,'ico-btn')} تقييمات الرواديد</div>
      <div class="ay-list">${radEvals.slice(0,20).map(e=>`<div>${escapeHtml(e.miqatName||'—')} — ${e.pct||Math.round((e.avg||0)/3*100)}%</div>`).join('')}</div></div>`:''}
    ${projs.length?`<div class="ay-sec"><div class="ay-sec-h">${icon('doc',17,'ico-btn')} المشاريع</div>
      <div class="ay-list">${projs.map(p=>`<div>${escapeHtml(p.title||'—')} — ${p.status==='approved'?'✅ معتمد':p.status==='rejected'?'❌ مرفوض':'⏳ معلّق'} ${p.cost?'· '+finMoney(p.cost):''}</div>`).join('')}</div></div>`:''}
    <div style="padding:16px;display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-accent" style="flex:1;" onclick="printArchYear(${a.year})">${icon('print',17,'ico-btn')} تقرير السنة PDF</button>
      <button class="btn btn-ghost" onclick="exportArchYear(${a.year})">${icon('download',17,'ico-btn')} تصدير</button>
      <button class="btn" style="background:var(--danger);color:#fff;border:none;" onclick="deleteArchYear(${a.year})">${icon('trash',17,'ico-btn')}</button>
    </div>
    <div style="padding:0 16px 16px;text-align:center;">
      <button class="btn btn-ghost btn-sm" onclick="closeArchYear()">← رجوع للأرشيف</button>
    </div>
  </div>`;
}
function exportArchYear(year){
  const a=archives.find(x=>x.year===year); if(!a) return;
  downloadBlob(JSON.stringify(a,null,2),'application/json;charset=utf-8',`أرشيف_${year}.json`);
  toast('تم تصدير أرشيف السنة');
}
async function deleteArchYear(year){
  if(!confirm(`حذف أرشيف سنة ${year} هـ نهائياً؟\n\nيُنصح بتصديره أولاً.`)) return;
  const t=prompt('للتأكيد اكتب رقم السنة:');
  if((t||'').trim()!==String(year)){ toast('أُلغي الحذف'); return; }
  archives=archives.filter(x=>x.year!==year);
  await saveArchives();
  logAudit('حذف','الأرشيف',`أرشيف سنة ${year} هـ`);
  closeArchYear();
}
function printArchYear(year){
  const a=archives.find(x=>x.year===year); if(!a) return;
  const exps=(a.finance||{}).expenses||[];
  const expTotal=exps.reduce((s,e)=>s+(Number(e.cost)||0),0);
  const byType=Object.entries(exps.reduce((o,e)=>{o[e.type]=(o[e.type]||0)+(Number(e.cost)||0);return o;},{})).sort((x,y)=>y[1]-x[1]);
  const paidMembers=(a.members||[]).filter(m=>m.paymentDate).length;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>أرشيف ${year} هـ</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:34px 38px;color:#1a2620;line-height:1.85;font-size:14.5px;}
  .cover{text-align:center;padding:30px 0 24px;border-bottom:4px double #c19a3e;margin-bottom:22px;}
  .cover img{max-width:210px;max-height:80px;margin-bottom:14px;}
  .cv-title{font-family:'Amiri',serif;font-size:28px;font-weight:700;color:#1c4536;}
  .cv-year{font-size:19px;color:#c19a3e;font-weight:700;margin-top:4px;}
  .cv-sub{font-size:12.5px;color:#8a7c6b;margin-top:8px;}
  h2{font-size:15px;color:#fff;background:#1c4536;display:inline-block;padding:5px 15px 5px 19px;border-radius:0 17px 17px 0;margin:22px 0 10px;}
  .kpis{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:8px;}
  .kpi{flex:1;min-width:110px;text-align:center;border:1px solid #e6ddcb;border-radius:11px;padding:12px 8px;background:#faf7f0;}
  .kpi .v{font-size:18px;font-weight:800;color:#1c4536;} .kpi .l{font-size:11px;color:#8a7c6b;margin-top:2px;}
  table{width:100%;border-collapse:collapse;font-size:13.5px;margin:8px 0;}
  th,td{border:1px solid #e6ddcb;padding:7px 11px;text-align:right;} th{background:#1c4536;color:#fff;}
  tr:nth-child(even){background:#faf7f0;}
  .foot{margin-top:28px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:22px;} .no-print{display:none;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="cover"><img src="${HAIAA_LOGO}" alt="" />
    <div class="cv-title">أرشيف السنة</div><div class="cv-year">${year} هـ</div>
    <div class="cv-sub">هيئة محبي الحسين (ع) — بني جمرة</div></div>
  <h2>📊 ملخّص السنة</h2>
  <div class="kpis">
    <div class="kpi"><div class="v">${(a.members||[]).length}</div><div class="l">عضو</div></div>
    <div class="kpi"><div class="v">${paidMembers}</div><div class="l">سدّدوا</div></div>
    <div class="kpi"><div class="v">${(a.miqats||[]).length}</div><div class="l">ميقات</div></div>
    <div class="kpi"><div class="v">${(a.meetings||[]).length}</div><div class="l">اجتماع</div></div>
    <div class="kpi"><div class="v">${finMoney(expTotal)}</div><div class="l">المصروفات</div></div>
    <div class="kpi"><div class="v">${finMoney((a.finance||{}).total||0)}</div><div class="l">الرصيد الختامي</div></div>
  </div>
  ${byType.length?`<h2>💰 المصروفات حسب النوع</h2><table><tr><th>البند</th><th>المبلغ</th><th>النسبة</th></tr>
    ${byType.map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${finMoney(v)}</td><td>${expTotal?Math.round(v/expTotal*100):0}%</td></tr>`).join('')}</table>`:''}
  ${(a.meetings||[]).length?`<h2>🗓️ الاجتماعات</h2><table><tr><th>الاجتماع</th><th>التاريخ</th><th>القرارات</th></tr>
    ${a.meetings.map(m=>`<tr><td>${escapeHtml(m.title||'اجتماع')}</td><td>${m.date?fmtDate(m.date):'—'}</td><td>${(m.decisions||[]).length}</td></tr>`).join('')}</table>`:''}
  ${(a.projects||[]).length?`<h2>📋 المشاريع</h2><table><tr><th>المشروع</th><th>الحالة</th><th>التكلفة</th></tr>
    ${a.projects.map(p=>`<tr><td>${escapeHtml(p.title||'—')}</td><td>${p.status==='approved'?'معتمد':p.status==='rejected'?'مرفوض':'معلّق'}</td><td>${finMoney(p.cost||0)}</td></tr>`).join('')}</table>`:''}
  <div class="foot">هيئة محبي الحسين (ع) — أرشيف سنة ${year} هـ</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* ── إغلاق السنة وبدء سنة جديدة ── */
async function closeYearWizard(){
  const curY = settings.year || parseInt(hijriParts().year,10) || 1448;
  if(archives.some(a=>a.year===curY)){
    if(!confirm(`سنة ${curY} هـ مؤرشفة مسبقاً. هل تريد المتابعة وإعادة أرشفتها (سيُستبدل الأرشيف القديم)؟`)) return;
  }
  const activeCount=members.filter(isActive).length;
  const summary=`📦 إغلاق سنة ${curY} هـ\n\n`+
    `سيُحفظ في الأرشيف:\n`+
    `• ${members.length} عضو · ${miqats.length} ميقات\n`+
    `• ${meetings.length} اجتماع · ${(finance.expenses||[]).length} مصروف\n`+
    `• ${radoodEvals.length} تقييم رادود · ${projects.length} مشروع\n`+
    `• ${photos.length} صورة في ألبوم اللجنة\n\n`+
    `ثم تبدأ سنة ${curY+1} هـ:\n`+
    `• تُفرَّغ المحاضر والمصروفات والتقييمات والمشاريع وألبوم الصور\n`+
    `• تبقى مكتبة الصور (Google Drive) كما هي\n`+
    `• تبقى الأعضاء والمواقيت وحجوزاتها والرواديد\n`+
    `• تُصفَّر المبالغ المستلمة (تبقى محفوظة في الأرشيف)\n`+
    `• ${activeCount} عضوية مفعّلة ستصير غير مفعّلة\n`+
    `• الرصيد ${finMoney(finance.total||0)} ينتقل كرصيد افتتاحي\n\n`+
    `⚠️ خذ نسخة احتياطية أولاً.\n\nهل تريد المتابعة؟`;
  if(!confirm(summary)) return;
  const typed=prompt('للتأكيد النهائي اكتب:  إغلاق السنة');
  if((typed||'').trim()!=='إغلاق السنة'){ toast('أُلغيت العملية'); return; }

  // 1) أرشفة
  const snap={
    year:curY, archivedAt:new Date().toISOString(),
    members:JSON.parse(JSON.stringify(members)),
    miqats:JSON.parse(JSON.stringify(miqats)),
    meetings:JSON.parse(JSON.stringify(meetings)),
    finance:JSON.parse(JSON.stringify(finance)),
    financeLog:JSON.parse(JSON.stringify(financeLog||[])),
    radoodEvals:JSON.parse(JSON.stringify(radoodEvals)),
    radoodParts:JSON.parse(JSON.stringify(radoodParts||[])),
    projects:JSON.parse(JSON.stringify(projects)),
    assemblies:JSON.parse(JSON.stringify(assemblies||[])),
    paidThawab:JSON.parse(JSON.stringify(paidThawab||[])),
    photos:JSON.parse(JSON.stringify(photos||[])),
    revenues:JSON.parse(JSON.stringify(revenues||[]))   // ألبوم اللجنة الإعلامية (مكتبة Drive لا تُؤرشف — تبقى مكانها)
  };
  archives=archives.filter(a=>a.year!==curY);
  archives.push(snap);
  await saveArchives();

  // 2) تفريغ وإعادة ضبط
  const openingBalance=Number(finance.total)||0;
  meetings=[]; await saveMeetings();
  radoodEvals=[]; await saveRadoodEvals();
  radoodParts=[]; await saveRadoodParts();
  projects=[]; await saveProjects();
  assemblies=[]; await saveAssemblies();
  paidThawab=[]; await savePaidThawab();
  photos=[]; await savePhotos();
  revenues=[]; await saveRevenues();   // ينتقل الألبوم للأرشيف · مكتبة Drive تبقى
  // تصفير المبالغ المستلمة في الحجوزات (الحجز نفسه يبقى — المال أُرشِف مع السنة)
  miqats.forEach(mq=>{
    (mq.bookings||[]).forEach(b=>{
      delete b.received; delete b.receivedNote; delete b.receivedDate;
      delete b.rcptItems; delete b.payments;
    });
    delete mq.closedOn;
  });
  await saveMiqats();
  finance={ ...finance, total:openingBalance, expenses:[], closedMiqats:{} };
  await saveFinance();
  financeLog=[]; try{ await storage.set('financeLog',JSON.stringify(financeLog)); }catch(e){}

  // 3) إلغاء تفعيل كل العضويات
  members.forEach(m=>{ m.paymentDate=''; m.expiryDate=''; m.paidAmount=0; m.payments=[]; });
  await saveMembers();

  // 4) تقديم السنة
  settings.year = curY+1;
  await persistSettings();

  logAudit('إغلاق سنة','الأرشيف',`أُرشفت سنة ${curY} هـ وبدأت ${curY+1} هـ`);
  toast(`تمت الأرشفة — بدأت سنة ${curY+1} هـ`);
  renderArchive(); renderDashboard(); renderMembers(); fillSettings();
}


/* ═══════════ مكتبة الصور من Google Drive ═══════════ */
const GD_API_KEY = 'AIzaSyDEmgbVxhtW7Bb7sWnjA88sq0ZidIKrqQU';
const GD_ROOT_FOLDER = '1zNOLTMmQqWJ_kheUHZpvJAWCLXGnyo-C';
const GD_CAT_ICONS = { 'الخطباء':'building', 'الرواديد':'mic', 'قارئي القرآن الكريم':'doc', 'عريفي الحفل':'news', 'الشعراء':'edit' };
function gdCatIcon(name, size){ return icon(GD_CAT_ICONS[name] || 'archive', size||26); }
let gdCache = { cats:null, people:{}, photos:{} };

/* استدعاء Drive API */
async function gdFetch(query, fields){
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${GD_API_KEY}`
    + `&fields=${encodeURIComponent(fields||'files(id,name,mimeType,thumbnailLink,webViewLink)')}`
    + `&orderBy=name&pageSize=200&supportsAllDrives=true&includeItemsFromAllDrives=true`;
  const res = await fetch(url);
  if(!res.ok){
    let msg = 'خطأ '+res.status;
    try{ const j=await res.json(); if(j.error && j.error.message) msg = j.error.message; }catch(e){}
    throw new Error(msg);
  }
  const data = await res.json();
  return data.files || [];
}

/* الفئات (المجلدات داخل الجذر) */
async function renderGdCats(){
  const host=$('#gdCats'); if(!host) return;
  host.innerHTML='<div class="gd-loading" style="grid-column:1/-1"><div class="gd-spin"></div>جارٍ تحميل الفئات…</div>';
  try{
    const cats = gdCache.cats || await gdFetch(`'${GD_ROOT_FOLDER}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,'files(id,name)');
    gdCache.cats = cats;
    if(!cats.length){ host.innerHTML='<div class="gd-empty" style="grid-column:1/-1">لا توجد مجلدات في الدرايف بعد.</div>'; return; }
    host.innerHTML = cats.map(c=>`
      <div class="gd-cat" onclick="openGdCat('${c.id}','${escapeHtml(c.name)}')">
        <div class="gc-ic">${gdCatIcon(c.name,26)}</div>
        <div class="gc-name">${escapeHtml(c.name)}</div>
        <div class="gc-sub">اضغط للعرض</div>
      </div>`).join('');
  }catch(e){
    console.error('gd cats', e);
    host.innerHTML=`<div class="gd-err" style="grid-column:1/-1">تعذّر الاتصال بـ Google Drive.<br><span style="font-size:11.5px;color:var(--muted)">${escapeHtml(e.message||'')}</span></div>`;
  }
}

/* ═══ البحث الموحّد في مكتبة الصور ═══ */
let gdIndex=null, gdIndexing=false;
async function buildGdIndex(){
  if(gdIndex || gdIndexing) return gdIndex;
  gdIndexing=true;
  try{
    const cats = gdCache.cats || await gdFetch(`'${GD_ROOT_FOLDER}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,'files(id,name)');
    gdCache.cats=cats;
    const idx=[];
    await Promise.all(cats.map(async c=>{
      try{
        const people = gdCache.people[c.id] || await gdFetch(`'${c.id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,'files(id,name)');
        gdCache.people[c.id]=people;
        people.forEach(p=>idx.push({ id:p.id, name:p.name, cat:c.name, catId:c.id }));
      }catch(e){}
    }));
    gdIndex=idx;
    try{ await storage.set('gdIndexCache', JSON.stringify(idx)); }catch(e){}
  }catch(e){ console.warn('gd index', e); }
  gdIndexing=false;
  return gdIndex;
}
function gdDoSearch(){
  const box=$('#gdSearchRes'); if(!box) return;
  const q=($('#gdSearch')?.value||'').trim();
  if(!q){ box.innerHTML=''; return; }
  if(!gdIndex){
    box.innerHTML='<div class="gd-shint">جارٍ تجهيز الفهرس…</div>';
    buildGdIndex().then(()=>gdDoSearch());
    return;
  }
  const res=gdIndex.filter(x=>(x.name||'').includes(q));
  if(!res.length){ box.innerHTML=`<div class="gd-shint">لا نتائج لـ «${escapeHtml(q)}»</div>`; return; }
  box.innerHTML=res.slice(0,20).map(x=>`
    <div class="gd-sitem" onclick="openGdPhotos('${x.id}','${escapeHtml(x.name)}')">
      <div><div class="gd-sname">${escapeHtml(x.name)}</div>
        <div class="gd-scat">${gdCatIcon(x.cat,13)} ${escapeHtml(x.cat)}</div></div>
      ${icon('chevron',18)}
    </div>`).join('');
}

/* قائمة الأشخاص داخل فئة */
let gdCurrentCat=null;
function openGdCat(id, name){
  gdCurrentCat={id,name};
  renderGdList(); openFullPage('gdlist');
}
function closeGdList(){ switchTab('meetings'); openIdara('media'); }
async function renderGdList(){
  const c=gdCurrentCat; if(!c) return;
  const host=$('#gdListBody');
  host.innerHTML=`<div class="panel" style="padding:0;overflow:hidden;">
    <div class="gd-head"><div class="gh-title">${gdCatIcon(c.name,20)} ${escapeHtml(c.name)}</div>
      <div class="gh-sub">اختر الاسم لعرض صوره</div></div>
    <div style="padding:14px;" id="gdListInner"><div class="gd-loading"><div class="gd-spin"></div>جارٍ التحميل…</div></div>
  </div>`;
  const inner=$('#gdListInner');
  try{
    const people = gdCache.people[c.id] || await gdFetch(`'${c.id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,'files(id,name)');
    gdCache.people[c.id]=people;
    if(!people.length){ inner.innerHTML='<div class="gd-empty">لا توجد مجلدات داخل هذه الفئة.<br><span style="font-size:12px">أضف مجلداً باسم الشخص في الدرايف.</span></div>'; return; }
    inner.innerHTML = people.map(p=>`
      <div class="gd-person" onclick="openGdPhotos('${p.id}','${escapeHtml(p.name)}')">
        <div class="gp-name">${escapeHtml(p.name)}</div>
        <div class="gp-arrow">›</div>
      </div>`).join('');
  }catch(e){ inner.innerHTML=`<div class="gd-err">تعذّر التحميل.<br><span style="font-size:11.5px">${escapeHtml(e.message||'')}</span></div>`; }
}

/* معرض صور الشخص */
let gdCurrentPerson=null;
function openGdPhotos(id,name){
  gdCurrentPerson={id,name};
  renderGdPhotos(); openFullPage('gdphotos');
}
function closeGdPhotos(){ switchTab('meetings'); openIdara('media'); setTimeout(()=>{ if(gdCurrentCat){ renderGdList(); openFullPage('gdlist'); } },80); }
async function renderGdPhotos(){
  const p=gdCurrentPerson; if(!p) return;
  const host=$('#gdPhotosBody');
  host.innerHTML=`<div class="panel" style="padding:0;overflow:hidden;">
    <div class="gd-head"><div class="gh-title">${escapeHtml(p.name)}</div>
      <div class="gh-sub">اضغط الصورة لفتحها في Google Drive بحجمها الكامل</div></div>
    <div id="gdPhotosInner"><div class="gd-loading"><div class="gd-spin"></div>جارٍ تحميل الصور…</div></div>
    <div style="padding:0 14px 16px;text-align:center;">
      <a class="btn btn-ghost btn-sm" href="https://drive.google.com/drive/folders/${p.id}" target="_blank">${icon('archive',17,'ico-btn')} فتح المجلد في Drive</a>
    </div>
  </div>`;
  const inner=$('#gdPhotosInner');
  try{
    const files = gdCache.photos[p.id] || await gdFetch(`'${p.id}' in parents and mimeType contains 'image/' and trashed=false`,'files(id,name,thumbnailLink,webViewLink)');
    gdCache.photos[p.id]=files;
    if(!files.length){ inner.innerHTML='<div class="gd-empty">لا توجد صور في هذا المجلد بعد.</div>'; return; }
    inner.innerHTML=`<div class="gd-grid">${files.map(f=>{
      const thumb = f.thumbnailLink ? f.thumbnailLink.replace(/=s\d+$/,'=s400') : `https://drive.google.com/thumbnail?id=${f.id}&sz=w400`;
      const link = f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`;
      return `<div class="gd-thumb" onclick="window.open('${link}','_blank')">
        <img src="${thumb}" alt="${escapeHtml(f.name)}" loading="lazy"
             onerror="this.src='https://drive.google.com/thumbnail?id=${f.id}&sz=w400'" />
        <div class="gt-open">فتح في Drive</div>
      </div>`;
    }).join('')}</div>`;
  }catch(e){ inner.innerHTML=`<div class="gd-err">تعذّر تحميل الصور.<br><span style="font-size:11.5px">${escapeHtml(e.message||'')}</span></div>`; }
}

/* ═══════════ لوحة الإحصائيات ═══════════ */
function renderStats(){
  const host=$('#statsBody'); if(!host) return;
  const h=hijriParts(); const curY=parseInt(h.year,10)||1448;
  const todayG=new Date(); todayG.setHours(0,0,0,0);

  // الأعضاء
  const totalMembers=members.length;
  const minors=members.filter(m=>m.isMinor).length;
  const paidMembers=members.filter(m=>memberPaid(m)>0).length;
  const subsCollected=members.reduce((s,m)=>s+memberPaid(m),0);

  // المواقيت
  const totalMiqats=miqats.length;
  let totalBookings=0, bookedAmount=0, receivedAmount=0;
  miqats.forEach(mq=>(mq.bookings||[]).forEach(b=>{ totalBookings++; bookedAmount+=bookingAgreed(b); receivedAmount+=bookingPaid(b); }));
  const pendingAmount=Math.max(0, bookedAmount-receivedAmount);

  // أقرب ميقات
  let nextMq=null, nextDays=null;
  miqats.forEach(mq=>{
    const ty=miqatTargetHijriYear(mq);
    const g=hijriToGregorian(mq.day,mq.month,ty); if(!g) return;
    const gd=new Date(g); gd.setHours(0,0,0,0);
    const d=Math.round((gd-todayG)/86400000);
    if(d>=0 && (nextDays===null || d<nextDays)){ nextDays=d; nextMq=mq; }
  });

  // المالية
  const balance=Number(finance.total)||0;
  const expenses=financeTotalExpenses();
  const expCount=(finance.expenses||[]).length;

  // لجنة العزاء
  const nRadoods=radoods.length;
  const nEvals=radoodEvals.length;
  const avgEval = nEvals ? radoodEvals.reduce((s,e)=>s+(e.avg||0),0)/nEvals : 0;
  const avgPct = Math.round(avgEval/3*100);

  // المشاريع
  const projPending=projects.filter(p=>!p.status||p.status==='pending').length;
  const projApproved=projects.filter(p=>p.status==='approved').length;

  // الإدارة
  const nMeetings=meetings.length;
  const openTasks=meetings.reduce((s,m)=>s+((m.tasks||[]).filter(t=>!t.done).length),0);

  const card=(cls,ic,val,lbl,extra,onclick)=>`
    <div class="stat-card ${cls||''}" ${onclick?`onclick="${onclick}"`:''}>
      <div class="sc-ic">${ic}</div>
      <div class="sc-val ${String(val).length>9?'sm':''}">${val}</div>
      <div class="sc-lbl">${lbl}</div>
      ${extra?`<div class="sc-extra">${extra}</div>`:''}
    </div>`;

  host.innerHTML=`
  <div class="stats-head">
    <h2>${icon('chart',17,'ico-btn')} لوحة الإحصائيات</h2>
    <div class="sh-sub">هيئة محبي الحسين (ع) · ${hijriToday()}</div>
  </div>

  ${nextMq?`<div class="stats-grid">${card('warn','📅',
      nextDays===0?'اليوم':nextDays===1?'غداً':`${nextDays} يوم`,
      escapeHtml(nextMq.name), fmtMiqatDate(nextMq)+' هـ', "switchTab('miqats')")}
    ${card('', '🎫', totalBookings, 'إجمالي الحجوزات', `في ${totalMiqats} ميقات`, "switchTab('miqats')")}
  </div>`:''}

  <div class="stats-sec-title">${icon('users',17,'ico-btn')} الأعضاء</div>
  <div class="stats-grid">
    ${card('','👥',totalMembers,'إجمالي الأعضاء', minors?`منهم ${minors} تحت السن`:'', "switchTab('members')")}
    ${card('ok','💳',paidMembers,'دفعوا الاشتراك', `${totalMembers-paidMembers} لم يدفعوا`, "switchTab('members')")}
    ${card('ok','💰',finMoney(subsCollected),'محصّل من الاشتراكات','','')}
  </div>

  <div class="stats-sec-title">${icon('money',17,'ico-btn')} المالية</div>
  <div class="stats-grid">
    ${card('ok','🏦',finMoney(balance),'رصيد الهيئة','',"enterFinance()")}
    ${card('warn','📤',finMoney(expenses),'إجمالي المصروفات',`${expCount} بند`,"enterFinance()")}
    ${card('','🎫',finMoney(receivedAmount),'مستلم من الحجوزات','','')}
    ${card(pendingAmount>0?'danger':'ok','⏳',finMoney(pendingAmount),'متبقٍّ على الحجوزات','','')}
  </div>

  <div class="stats-sec-title">${icon('candle',17,'ico-btn')} لجنة العزاء</div>
  <div class="stats-grid">
    ${card('','🎤',nRadoods,'الرواديد', nEvals?`${nEvals} تقييم`:'لا تقييمات', "switchTab('meetings')")}
    ${card(avgPct>=80?'ok':avgPct>=50?'warn':'', '⭐', nEvals?avgPct+'%':'—','متوسط التقييم العام','', "switchTab('meetings')")}
  </div>

  <div class="stats-sec-title">${icon('doc',17,'ico-btn')} المشاريع والإدارة</div>
  <div class="stats-grid">
    ${card(projPending>0?'warn':'','📋',projPending,'مشاريع بانتظار القرار',`${projApproved} معتمد`,"enterFinance()")}
    ${card('','🗓️',nMeetings,'اجتماعات الإدارة', openTasks?`${openTasks} مهمة مفتوحة`:'لا مهام معلّقة', "switchTab('meetings')")}
  </div>`;
}

function computeNotifications(){
  const list=[]; const h=hijriParts(); const curM=h.month; const curD=h.day; const curY=parseInt(h.year,10)||1448;
  const todayG=new Date(); todayG.setHours(0,0,0,0);

  // 0-ج) تذكير بشهادات الشكر — بعد يوم من انتهاء الميقات
  miqats.forEach(mq=>{
    // احسب أقرب حدوث ماضٍ للميقات (السنة الحالية أو التي قبلها)
    let daysPassed=null;
    for(const y of [curY, curY-1]){
      const g=hijriToGregorian(mq.day,mq.month,y); if(!g) continue;
      const gd=new Date(g); gd.setHours(0,0,0,0);
      const d=Math.round((todayG-gd)/86400000);
      if(d>=1 && (daysPassed===null || d<daysPassed)) daysPassed=d;
    }
    if(daysPassed===null || daysPassed>30) return;     // من اليوم التالي وحتى شهر
    const n=(mq.bookings||[]).length; if(!n) return;    // لا مساهمين
    list.push({
      cat:'شهادات الشكر', type:'info', ic:'📜',
      title:`أرسل شهادات الشكر — ${mq.name}`,
      desc:`انتهت المناسبة${daysPassed===1?' أمس':` قبل ${daysPassed} يوماً`}، ولديها ${n} ${n===1?'مساهم':'مساهمين'}.`,
      meta:'اضغط لفتح الميقات وإرسال الشهادات',
      action:()=>{ switchTab('miqats'); setTimeout(()=>showMiqatDetail(mq.id),120); }
    });
  });

  // 0-ب) تقييمات/استبيانات جديدة وصلت عبر الروابط
  const seenEv = Number(window.__seenEvalCount||0), curEv = Number(window.__newEvalCount||0);
  if(curEv > seenEv){
    const diff = curEv - seenEv;
    list.push({
      cat:'لجنة العزاء', type:'info', ic:'⭐',
      title:`وصل ${diff} تقييم جديد`,
      desc:'تقييمات جديدة من الرابط الجماعي بانتظار المراجعة.',
      meta:'اضغط لفتح لجنة العزاء',
      action:()=>{ switchTab('meetings'); setTimeout(()=>openIdara('aza'),120); }
    });
  }
  const seenSv = Number(window.__seenSurveyCount||0), curSv = Number(window.__newSurveyCount||0);
  if(curSv > seenSv){
    const diff = curSv - seenSv;
    list.push({
      cat:'لجنة العزاء', type:'info', ic:'📋',
      title:`وصل ${diff} استبيان جديد`,
      desc:'استبيانات من الرواديد بانتظار الاطّلاع.',
      meta:'اضغط لفتح لجنة العزاء',
      action:()=>{ switchTab('meetings'); setTimeout(()=>openIdara('aza'),120); }
    });
  }

  // 0-أ) تذكير النسخة الاحتياطية — كل يوم جمعة
  if(todayG.getDay()===5){
    const lastB = window.__lastBackupAt || '';
    let daysSince = null;
    if(lastB){ const d=new Date(lastB); d.setHours(0,0,0,0); daysSince=Math.round((todayG-d)/86400000); }
    if(daysSince===null || daysSince>=3){
      list.push({
        cat:'النسخ الاحتياطي', type:'warn', ic:'💾',
        title:'خذ نسخة احتياطية اليوم',
        desc: daysSince===null ? 'لم تُؤخذ نسخة احتياطية من هذا الجهاز بعد.' : `آخر نسخة كانت قبل ${daysSince} يوماً.`,
        meta:'تذكير أسبوعي كل جمعة',
        action:()=>{ switchTab('settings'); setTimeout(()=>{ const el=document.querySelector('.set-acc'); if(el){ el.open=true; el.scrollIntoView({behavior:'smooth'}); } },150); }
      });
    }
  }

  // 0) دخول اللجنة المالية — يظهر لأمين السر فقط
  const myEmail = (window.CloudSync && CloudSync.email) ? CloudSync.email.toLowerCase() : '';
  if(myEmail==='smuneer89@gmail.com'){
    (financeLog||[]).slice().reverse().forEach(f=>{
      const d=new Date(f.at); const days=Math.round((todayG-new Date(d.getFullYear(),d.getMonth(),d.getDate()))/86400000);
      if(days<=7){
        list.push({ cat:'اللجنة المالية', type:'info', ic:'🔐',
          title:'دخول إلى اللجنة المالية',
          desc:`دخل ${escapeHtml(f.email)} إلى قسم اللجنة المالية.`,
          meta: d.toLocaleString('ar',{dateStyle:'medium',timeStyle:'short'}),
          action:()=>{ switchTab('meetings'); } });
      }
    });
  }

  // 0b) تذكيرات التقويم المستحقة اليوم أو الفائتة
  (reminders||[]).forEach(r=>{
    if(r.done) return;
    let g = (r.cal==='hijri') ? hijriToGregorian(r.day,r.month,r.year) : new Date(r.year, r.month, r.day);
    if(!g) return;
    const gd=new Date(g); gd.setHours(0,0,0,0);
    const days=Math.round((gd-todayG)/86400000);
    if(days<=0){
      list.push({ cat:'تذكيرات', type: days<0?'warn':'urgent', ic:'⏰',
        title: r.title || 'تذكير',
        desc: (r.note?r.note+(r.time?' · ':''):'') + (r.time?'الساعة '+fmtTime12(r.time):'') || (days===0?'موعده اليوم':'موعده فات'),
        meta: days===0?'اليوم':(days===-1?'أمس':`منذ ${-days} يوم`),
        action:()=>openCalendar() });
    }
  });

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

  // 4b) بعد انتهاء الميقات - تذكير بإرسال رسائل الشكر للمساهمين
  miqats.forEach(mq=>{
    const ty=miqatTargetHijriYear(mq);
    const g=hijriToGregorian(mq.day,mq.month,ty);
    if(!g) return;
    const gd=new Date(g); gd.setHours(0,0,0,0);
    const daysSince=Math.round((todayG-gd)/86400000);
    if(daysSince>=1 && daysSince<=14){   // انتهى خلال آخر أسبوعين
      (mq.bookings||[]).forEach(b=>{
        const nm=bookingName(b);
        list.push({ cat:'رسائل الشكر', type:'info', ic:'📜',
          title:`أرسل رسالة الشكر`,
          desc:`للعضو ${escapeHtml(nm)} على مساهمته في «${escapeHtml(mq.name)}».`,
          meta: `انتهى الميقات قبل ${daysSince} يوم`,
          action:()=>{ enterFinance(); } });
      });
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
  let list=computeNotifications();
  // إضافة مفتاح فريد لكل إشعار (لتتبّع المقروء)
  list.forEach(n=>{ n.key = notifKey(n); });
  const dismissed = getDismissedNotifs();
  const visible = list.filter(n=>!dismissed.includes(n.key));
  const el=$('#notifList'); const sub=$('#notifSub');
  if(sub) sub.textContent = visible.length?`لديك ${visible.length} تنبيه`:'كل شيء تحت السيطرة';
  if(!visible.length){ el.innerHTML=`<div class="notif-empty"><div class="big">${icon('check',17,'ico-btn')}</div><div>لا توجد تنبيهات حالياً</div></div>`; return; }
  const order={urgent:0,warn:1,info:2,ok:3};
  visible.sort((a,b)=>(order[a.type]??9)-(order[b.type]??9));
  const groups={};
  visible.forEach((n,i)=>{ (groups[n.cat]=groups[n.cat]||[]).push({...n,_i:i}); });
  window.__notifActions=visible.map(n=>n.action);
  const clearBar=`<div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
    <button class="btn btn-ghost btn-sm" onclick="clearAllNotifs()">${icon('trash',17,'ico-btn')} مسح الكل</button></div>`;
  el.innerHTML=clearBar+Object.entries(groups).map(([cat,items])=>`
    <div class="notif-group">
      <div class="notif-group-title">${cat} <span style="color:var(--muted-2)">(${items.length})</span></div>
      ${items.map(n=>`<div class="notif-item ${n.type}">
        <div class="notif-ic" onclick="(window.__notifActions[${n._i}]||function(){})()">${n.ic}</div>
        <div class="notif-body" onclick="(window.__notifActions[${n._i}]||function(){})()">
          <div class="notif-title">${n.title}</div>
          <div class="notif-desc">${n.desc}</div>
          ${n.meta?`<div class="notif-meta">${n.meta}</div>`:''}
        </div>
        <button class="notif-x" onclick="dismissNotif('${n.key}')" title="حذف">×</button>
      </div>`).join('')}
    </div>`).join('');
}
/* مفتاح فريد للإشعار من فئته وعنوانه */
function notifKey(n){ return (n.cat+'|'+n.title+'|'+(n.meta||'')).replace(/\s+/g,'_'); }
function getDismissedNotifs(){ try{ return JSON.parse(localStorage.getItem('dismissedNotifs')||'[]'); }catch(e){ return []; } }
function setDismissedNotifs(a){ try{ localStorage.setItem('dismissedNotifs', JSON.stringify(a)); }catch(e){} }
function dismissNotif(key){
  const d=getDismissedNotifs(); if(!d.includes(key)) d.push(key);
  setDismissedNotifs(d); renderNotifications(); updateNotifBadge();
}
function clearAllNotifs(){
  const list=computeNotifications().map(n=>notifKey(n));
  const d=getDismissedNotifs();
  list.forEach(k=>{ if(!d.includes(k)) d.push(k); });
  setDismissedNotifs(d); renderNotifications(); updateNotifBadge();
}

/* عند جاهزية السحابة: افحص التقييمات الجديدة */
window.addEventListener('cloud-ready', ()=>{ setTimeout(checkNewAzaSubmissions, 800); });

/* فحص التقييمات/الاستبيانات الجديدة من السحابة */
async function checkNewAzaSubmissions(){
  if(!window.CloudSync || !CloudSync.isReady) return;
  try{
    const [evSess, svSess] = await Promise.all([
      CloudSync.fetchEvalSessions().catch(()=>[]),
      CloudSync.fetchSurveySessions().catch(()=>[])
    ]);
    let evTotal=0, svTotal=0;
    const evCounts = await Promise.all(evSess.map(s=>CloudSync.fetchPublicEvals(s._id).catch(()=>[])));
    evCounts.forEach(a=>evTotal+=a.length);
    const svCounts = await Promise.all(svSess.map(s=>CloudSync.fetchPublicSurveys(s._id).catch(()=>[])));
    svCounts.forEach(a=>svTotal+=a.length);
    window.__newEvalCount=evTotal; window.__newSurveyCount=svTotal;
    window.__azaSessions=evSess; window.__azaSurveys=svSess;
    try{ await storage.set('azaSessionsCache', JSON.stringify({ ev:evSess, sv:svSess })); }catch(e){}
    try{
      window.__seenEvalCount = Number(await storage.get('seenEvalCount')||0);
      window.__seenSurveyCount = Number(await storage.get('seenSurveyCount')||0);
    }catch(e){}
    updateNotifBadge();
  }catch(e){ console.warn('aza check', e); }
}
/* تعليم التقييمات كمقروءة عند فتح لجنة العزاء */
async function markAzaSeen(){
  try{
    if(window.__newEvalCount!=null){ await storage.set('seenEvalCount', String(window.__newEvalCount)); window.__seenEvalCount=window.__newEvalCount; }
    if(window.__newSurveyCount!=null){ await storage.set('seenSurveyCount', String(window.__newSurveyCount)); window.__seenSurveyCount=window.__newSurveyCount; }
  }catch(e){}
  updateNotifBadge();
}

/* تحديث عدّاد الجرس */
function updateNotifBadge(){
  const all=computeNotifications();
  all.forEach(n=>{ n.key=notifKey(n); });
  const dismissed=getDismissedNotifs();
  const n=all.filter(x=>!dismissed.includes(x.key)).length;
  const b=$('#notifBadge');
  if(b){ if(n>0){ b.textContent=n>99?'99+':n; b.style.display='flex'; } else b.style.display='none'; }
  syncAppBadge(n);
}

/* عدد الإشعارات الظاهرة فعلاً (بعد طرح المحذوف) */
function visibleNotifCount(){
  const all=computeNotifications();
  const dismissed=getDismissedNotifs();
  return all.filter(n=>!dismissed.includes(notifKey(n))).length;
}

/* شارة العدد فوق أيقونة البرنامج على الشاشة الرئيسية (PWA) */
async function syncAppBadge(count){
  try{
    if(!('setAppBadge' in navigator)) return;
    const n = (typeof count==='number') ? count : visibleNotifCount();
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

/* ═══════════ التقويم والتذكيرات ═══════════ */
function fmtTime12(t){ if(!t) return ''; const [h,m]=t.split(':').map(Number); const ap=h<12?'ص':'م'; const h12=h%12||12; return `${h12}:${String(m).padStart(2,'0')} ${ap}`; }
let calMode='greg';          // 'greg' | 'hijri'
let calYear, calMonth;       // الشهر المعروض (حسب النمط)
function openCalendar(){
  const now=new Date();
  if(calMode==='hijri'){ const h=hijriParts(); calYear=parseInt(h.year,10)||1448; calMonth=h.month; }
  else { calYear=now.getFullYear(); calMonth=now.getMonth(); }
  openFullPage('calendar');
  renderCalendar(); renderCalReminders();
}
function setCalMode(mode){
  if(calMode===mode) return;
  calMode=mode;
  $('#calGregBtn').classList.toggle('active', mode==='greg');
  $('#calHijriBtn').classList.toggle('active', mode==='hijri');
  const now=new Date();
  if(mode==='hijri'){ const h=hijriParts(); calYear=parseInt(h.year,10)||1448; calMonth=h.month; }
  else { calYear=now.getFullYear(); calMonth=now.getMonth(); }
  renderCalendar();
}
function calShift(dir){
  calMonth+=dir;
  if(calMonth>11){ calMonth=0; calYear++; }
  if(calMonth<0){ calMonth=11; calYear--; }
  renderCalendar();
}
const GREG_MONTHS=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const DOW=['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'];
function reminderOn(cal,d,mo,y){
  return (reminders||[]).some(r=>!r.done && r.cal===cal && r.day===d && r.month===mo && r.year===y);
}
function renderCalendar(){
  const title=$('#calTitle'), grid=$('#calGrid'); if(!grid) return;
  const months = calMode==='hijri'?HIJRI_MONTHS:GREG_MONTHS;
  title.textContent = `${months[calMonth]} ${calYear}${calMode==='hijri'?' هـ':''}`;
  let html = DOW.map(d=>`<div class="cal-dow">${d}</div>`).join('');
  const today=new Date(); today.setHours(0,0,0,0);
  const hToday=hijriParts();

  if(calMode==='hijri'){
    // اليوم الميلادي المقابل لأول الشهر الهجري → لتحديد يوم الأسبوع
    const firstG=hijriToGregorian(1,calMonth,calYear);
    const startDow = firstG ? new Date(firstG).getDay() : 0;
    const daysInMonth=30;   // الأشهر الهجرية 29-30؛ نعرض 30 ونخفي غير الصالح
    for(let i=0;i<startDow;i++) html+=`<div class="cal-cell empty"></div>`;
    for(let d=1; d<=daysInMonth; d++){
      const g=hijriToGregorian(d,calMonth,calYear); if(!g) continue;
      const gd=new Date(g); gd.setHours(0,0,0,0);
      const isToday = (parseInt(hToday.year,10)===calYear && hToday.month===calMonth && hToday.day===d);
      const hasRem = reminderOn('hijri',d,calMonth,calYear);
      const gLabel = `${gd.getDate()}/${gd.getMonth()+1}`;
      html+=`<div class="cal-cell ${isToday?'today':''} ${hasRem?'has-rem':''}" onclick="quickAddReminder('hijri',${d},${calMonth},${calYear})">${d}<span class="sub">${gLabel}</span></div>`;
    }
  } else {
    const first=new Date(calYear,calMonth,1);
    const startDow=first.getDay();
    const daysInMonth=new Date(calYear,calMonth+1,0).getDate();
    for(let i=0;i<startDow;i++) html+=`<div class="cal-cell empty"></div>`;
    for(let d=1; d<=daysInMonth; d++){
      const gd=new Date(calYear,calMonth,d); gd.setHours(0,0,0,0);
      const isToday = gd.getTime()===today.getTime();
      const hasRem = reminderOn('greg',d,calMonth,calYear);
      html+=`<div class="cal-cell ${isToday?'today':''} ${hasRem?'has-rem':''}" onclick="quickAddReminder('greg',${d},${calMonth},${calYear})">${d}</div>`;
    }
  }
  grid.innerHTML=html;
}
function renderCalReminders(){
  const el=$('#calReminders'); if(!el) return;
  const list=(reminders||[]).slice().sort((a,b)=>{
    const ga=a.cal==='hijri'?hijriToGregorian(a.day,a.month,a.year):new Date(a.year,a.month,a.day);
    const gb=b.cal==='hijri'?hijriToGregorian(b.day,b.month,b.year):new Date(b.year,b.month,b.day);
    return new Date(ga)-new Date(gb);
  });
  if(!list.length){ el.innerHTML=`<div class="empty" style="padding:20px"><div class="txt">لا توجد تذكيرات</div></div>`; return; }
  el.innerHTML=list.map(r=>{
    const g = r.cal==='hijri'?hijriToGregorian(r.day,r.month,r.year):new Date(r.year,r.month,r.day);
    const gtxt = g?new Date(g).toLocaleDateString('ar',{day:'numeric',month:'long',year:'numeric'}):'';
    const htxt = r.cal==='hijri'?`${r.day} ${HIJRI_MONTHS[r.month]} ${r.year} هـ`:'';
    return `<div class="rem-item ${r.done?'done':''}">
      <button class="ri-btn" onclick="toggleReminder('${r.id}')" title="${r.done?'إلغاء':'تم'}">${r.done?'↩️':'✅'}</button>
      <div class="ri-body">
        <div class="ri-title">${escapeHtml(r.title)}</div>
        <div class="ri-date">${htxt?htxt+' · الموافق ':''}${gtxt}${r.time?' · '+fmtTime12(r.time):''}</div>
        ${r.note?`<div class="ri-note">${escapeHtml(r.note)}</div>`:''}
      </div>
      <button class="ri-btn" onclick="deleteReminder('${r.id}')" title="حذف">🗑</button>
    </div>`;
  }).join('');
}
/* نافذة التذكير */
let quickPrefill=null;
function fillRemMonths(){
  const sel=$('#remMonth'); if(!sel) return;
  const cal=$('#remCal').value;
  const months = cal==='hijri'?HIJRI_MONTHS:GREG_MONTHS;
  sel.innerHTML=months.map((n,i)=>`<option value="${i}">${n}</option>`).join('');
}
function fillRemDayOptions(){ fillRemMonths(); updateRemGreg(); }
function updateRemGreg(){
  const out=$('#remGreg'); if(!out) return;
  const cal=$('#remCal').value;
  const d=parseInt($('#remDay').value,10), mo=parseInt($('#remMonth').value,10), y=parseInt($('#remYear').value,10);
  if(!d||isNaN(mo)||!y){ out.textContent=''; return; }
  if(cal==='hijri'){ const g=hijriToGregorian(d,mo,y); out.textContent = g?'الموافق: '+new Date(g).toLocaleDateString('ar',{day:'numeric',month:'long',year:'numeric'}):''; }
  else { const g=new Date(y,mo,d); out.textContent='📅 '+g.toLocaleDateString('ar',{weekday:'long'}); }
}
function openAddReminder(){
  quickPrefill=null;
  $('#reminderModalTitle').textContent='إضافة تذكير';
  $('#remTitle').value=''; $('#remNote').value=''; $('#remTime').value='';
  const now=new Date();
  $('#remCal').value = calMode;
  fillRemMonths();
  if(calMode==='hijri'){ const h=hijriParts(); $('#remDay').value=h.day; $('#remMonth').value=h.month; $('#remYear').value=h.year; }
  else { $('#remDay').value=now.getDate(); $('#remMonth').value=now.getMonth(); $('#remYear').value=now.getFullYear(); }
  updateRemGreg();
  $('#reminderModal').classList.add('open');
}
function quickAddReminder(cal,d,mo,y){
  $('#reminderModalTitle').textContent='إضافة تذكير';
  $('#remTitle').value=''; $('#remNote').value=''; $('#remTime').value='';
  $('#remCal').value=cal; fillRemMonths();
  $('#remDay').value=d; $('#remMonth').value=mo; $('#remYear').value=y;
  updateRemGreg();
  $('#reminderModal').classList.add('open');
}
async function saveReminder(){
  const title=$('#remTitle').value.trim();
  if(!title){ toast('أدخل عنوان التذكير'); return; }
  const cal=$('#remCal').value;
  const d=parseInt($('#remDay').value,10), mo=parseInt($('#remMonth').value,10), y=parseInt($('#remYear').value,10);
  if(!d||isNaN(mo)||!y){ toast('أدخل تاريخاً صحيحاً'); return; }
  reminders.push({ id:'r_'+Date.now(), title, note:$('#remNote').value.trim(), day:d, month:mo, year:y, time:$('#remTime').value||'', cal, done:false });
  await saveReminders();
  closeModal('reminderModal'); toast('تمت إضافة التذكير');
  renderCalendar(); renderCalReminders(); updateNotifBadge();
}
async function toggleReminder(id){ const r=reminders.find(x=>x.id===id); if(!r) return; r.done=!r.done; await saveReminders(); renderCalReminders(); renderCalendar(); updateNotifBadge(); }
async function deleteReminder(id){ if(!confirm('حذف هذا التذكير؟')) return; reminders=reminders.filter(x=>x.id!==id); await saveReminders(); renderCalReminders(); renderCalendar(); updateNotifBadge(); }

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
          <div class="mq-av">${icon('users',17,'ico-btn')}</div>
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
function receiptBtnLabel(b){
  if(!bookingHasReceipt(b)) return icon('wallet',15,'ico-btn')+' تسجيل المساهمة';
  const items=receiptItems(b);
  if(items.length){
    const cash=receiptCashTotal(b), kindN=items.filter(i=>!isCashItem(i.kind)).length;
    let t = cash>0 ? fmtMoney(cash) : '';
    if(kindN) t += (t?' + ':'') + `${kindN} عيني`;
    return icon('check',15,'ico-btn')+' '+(t||'مسجّلة');
  }
  return icon('check',15,'ico-btn')+` استُلم ${fmtMoney(Number(b.received)||0)}`;
}

/* ═══ صفحة مساهمة العضو (بدل نافذة الاستلام) ═══ */
let receiptCtx=null;
function openReceipt(miqatId, memberId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  receiptCtx={miqatId, memberId}; rcEditIdx=null;
  renderReceiptPage();
  openFullPage('receipt');
}
function closeReceiptPage(){
  switchTab('miqats');
  if(receiptCtx) setTimeout(()=>{ showMiqatDetail(receiptCtx.miqatId); },60);
}
function renderReceiptPage(){
  if(!receiptCtx) return;
  const {miqatId, memberId}=receiptCtx;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  const who = b.familyName ? `${b.familyName}${b.repName?` (ممثّلها ${b.repName})`:''}` : (members.find(x=>x.id===memberId)?.name||'');
  const items=receiptItems(b);
  const cash=receiptCashTotal(b), kind=receiptInKindTotal(b), all=cash+kind;
  $('#receiptBody').innerHTML=`
  <div class="panel" style="padding:0;overflow:hidden;">
    <div class="rc-head">
      <div class="rc-who">${escapeHtml(who)}</div>
      <div class="rc-mq">${escapeHtml(mq.name)}</div>
      <div class="rc-agreed">المتّفق عليه: ${fmtMoney(bookingAgreed(b))}${mq.requiredAmount?` · سعر الميقات: ${fmtMoney(mq.requiredAmount)}`:''}</div>
    </div>

    <div class="rc-sec">
      <div class="rc-sec-h">${icon('plus',16,'ico-btn')} إضافة بند مساهمة</div>
      <div class="rc-add">
        <select id="rcKind" onchange="rcKindChange()">
          ${RECEIPT_ITEMS.map(k=>`<option value="${k}">${k}</option>`).join('')}
        </select>
        <input id="rcValue" type="number" min="0" step="0.001" placeholder="المبلغ / القيمة التقديرية" />
        <input id="rcOther" class="full" type="text" placeholder="اسم البند" style="display:none" />
        <input id="rcNote" class="full" type="text" placeholder="ملاحظة على هذا البند (اختياري)" />
      </div>
      <button class="btn btn-primary" style="width:100%" onclick="addReceiptItem()">${icon('plus',16,'ico-btn')} إضافة البند</button>
      <div class="rc-hint">${icon('info',14,'ico-btn')} <b>المبلغ النقدي</b> يدخل الصندوق فعلاً.
        أما <b>التبرّع العيني</b> فقيمته تقديرية — تُستخدم لتحديد حالة الميقات فقط، ولا تُذكر في تقرير المصروفات.</div>
    </div>

    <div class="rc-sec">
      <div class="rc-sec-h">${icon('doc',16,'ico-btn')} بنود المساهمة (${items.length})</div>
      ${items.length?items.map((it,i)=>{
        const ed = (rcEditIdx===i);
        if(ed) return `
        <div class="rc-item editing">
          <div class="rc-edit">
            <div class="rc-edit-h">${icon('edit',15,'ico-btn')} تعديل «${escapeHtml(it.kind||'')}»</div>
            <div class="rc-edit-grid">
              <select id="rcEKind">
                ${RECEIPT_ITEMS.map(k=>`<option value="${k}" ${k===it.kind?'selected':''}>${k}</option>`).join('')}
                ${RECEIPT_ITEMS.includes(it.kind)?'':`<option value="${escapeHtml(it.kind)}" selected>${escapeHtml(it.kind)}</option>`}
              </select>
              <input id="rcEValue" type="number" min="0" step="0.001" value="${Number(it.value)||0}" placeholder="المبلغ" />
              <input id="rcENote" class="full" type="text" value="${escapeHtml(it.note||'')}" placeholder="ملاحظة" />
            </div>
            <div class="rc-edit-btns">
              <button class="btn btn-primary btn-sm" onclick="saveReceiptItemEdit(${i})">${icon('check',15,'ico-btn')} حفظ</button>
              <button class="btn btn-ghost btn-sm" onclick="cancelReceiptItemEdit()">إلغاء</button>
            </div>
          </div>
        </div>`;
        return `
        <div class="rc-item">
          <span class="rc-badge ${isCashItem(it.kind)?'cash':'kind'}">${isCashItem(it.kind)?'نقدي':'عيني'}</span>
          <div style="flex:1;min-width:0">
            <div class="rc-iname">${escapeHtml(it.kind||'—')}</div>
            ${it.note?`<div class="rc-inote">${escapeHtml(it.note)}</div>`:''}
          </div>
          <span class="rc-ival">${fmtMoney(Number(it.value)||0)}</span>
          <button class="rc-ed" onclick="editReceiptItem(${i})" title="تعديل">${icon('edit',15)}</button>
          <button class="rc-del" onclick="removeReceiptItem(${i})" title="حذف">×</button>
        </div>`;
      }).join(''):'<div class="fel-empty">لا بنود بعد — أضف أول بند</div>'}
    </div>

    <div class="rc-totals">
      <div class="rc-t cash"><div class="v">${fmtMoney(cash)}</div><div class="l">نقدي مستلَم</div></div>
      <div class="rc-t kind"><div class="v">${fmtMoney(kind)}</div><div class="l">عيني (تقديري)</div></div>
      <div class="rc-t all"><div class="v">${fmtMoney(all)}</div><div class="l">إجمالي المساهمة</div></div>
    </div>

    <div class="rc-note-box">
      <div class="rc-sec-h" style="margin-bottom:8px">${icon('edit',16,'ico-btn')} ملاحظات عامة</div>
      <textarea id="rcGeneralNote" rows="3" placeholder="ملاحظات تظهر في التقرير…">${escapeHtml(b.receivedNote||'')}</textarea>
      <button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="saveReceiptNote()">${icon('check',16,'ico-btn')} حفظ الملاحظات</button>
    </div>

    <div style="padding:0 16px 16px;display:flex;gap:8px;flex-wrap:wrap">
      ${items.length?`<button class="btn btn-ghost btn-sm" style="color:var(--danger)" onclick="clearReceipt()">مسح كل البنود</button>`:''}
      <button class="btn btn-ghost btn-sm" onclick="closeReceiptPage()" style="margin-right:auto">← رجوع للميقات</button>
    </div>
  </div>`;
}
function rcKindChange(){
  const k=$('#rcKind').value;
  const o=$('#rcOther'); if(o) o.style.display = (k==='أخرى') ? 'block' : 'none';
}
async function addReceiptItem(){
  if(!receiptCtx) return;
  const {miqatId, memberId}=receiptCtx;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  let kind=$('#rcKind').value;
  if(kind==='أخرى'){
    const other=($('#rcOther').value||'').trim();
    if(!other){ toast('اكتب اسم البند'); return; }
    kind=other;
  }
  const val=parseFloat($('#rcValue').value);
  if(isNaN(val)||val<0){ toast('أدخل المبلغ أو القيمة التقديرية'); return; }
  b.rcptItems = b.rcptItems || [];
  b.rcptItems.push({ kind, value:val, note:($('#rcNote').value||'').trim(), at:new Date().toISOString() });
  b.receivedDate = b.receivedDate || today();
  await saveMiqats();
  logAudit('إضافة','المواقيت',`مساهمة «${kind}» بقيمة ${fmtMoney(val)} — ${mq.name}`);
  toast('أُضيف البند');
  renderReceiptPage(); renderMiqats(); renderDashboard();
}
let rcEditIdx = null;
function editReceiptItem(i){ rcEditIdx=i; renderReceiptPage(); }
function cancelReceiptItemEdit(){ rcEditIdx=null; renderReceiptPage(); }
async function saveReceiptItemEdit(i){
  if(!receiptCtx) return;
  const {miqatId, memberId}=receiptCtx;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  const it=(b.rcptItems||[])[i]; if(!it) return;
  const kind=($('#rcEKind').value||'').trim();
  const val=parseFloat($('#rcEValue').value);
  if(!kind){ toast('اختر نوع البند'); return; }
  if(isNaN(val)||val<0){ toast('أدخل مبلغاً صحيحاً'); return; }
  const oldTxt=`${it.kind} ${fmtMoney(Number(it.value)||0)}`;
  it.kind=kind; it.value=val; it.note=($('#rcENote').value||'').trim();
  it.editedAt=new Date().toISOString();
  await saveMiqats();
  logAudit('تعديل','المواقيت',`مساهمة: ${oldTxt} ← ${kind} ${fmtMoney(val)} — ${mq.name}`);
  rcEditIdx=null;
  toast('حُفظ التعديل');
  renderReceiptPage(); renderMiqats(); renderDashboard();
}
async function removeReceiptItem(idx){
  if(!receiptCtx) return;
  const {miqatId, memberId}=receiptCtx;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  const it=(b.rcptItems||[])[idx]; if(!it) return;
  if(!confirm(`حذف «${it.kind}»؟`)) return;
  b.rcptItems.splice(idx,1);
  await saveMiqats();
  toast('حُذف البند');
  renderReceiptPage(); renderMiqats(); renderDashboard();
}
async function saveReceiptNote(){
  if(!receiptCtx) return;
  const {miqatId, memberId}=receiptCtx;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  b.receivedNote=($('#rcGeneralNote').value||'').trim();
  await saveMiqats();
  toast('حُفظت الملاحظات');
}
async function clearReceipt(){
  if(!receiptCtx) return;
  const {miqatId, memberId}=receiptCtx;
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===memberId); if(!b) return;
  if(!confirm('مسح كل بنود المساهمة؟ سيُحسب المتّفق عليه بدلاً منها.')) return;
  delete b.rcptItems; delete b.received; delete b.receivedNote; delete b.receivedDate;
  await saveMiqats();
  toast('مُسحت البنود');
  renderReceiptPage(); renderMiqats(); renderDashboard();
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
           <button class="bk-add" onclick="openBookingPayment('${mq.id}','${b.memberId}')">${icon('plus',17,'ico-btn')} دفعة</button></div>`
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
  rememberListPos('miqats', id);
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
  return `<div class="member-row compact ${status}" data-row-id="${m.id}" onclick="showDetail('${m.id}')">
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
  pendingCandidateId=null;
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
  if(pendingCandidateId){
    const candidate=memberCandidates.find(x=>x.id===pendingCandidateId);
    if(candidate){ candidate.status='تم تحويله إلى عضو'; candidate.memberId=newMember.id; candidate.convertedAt=new Date().toISOString(); candidate.updatedAt=new Date().toISOString(); candidate.archived=false; await saveMemberCandidates(); }
    pendingCandidateId=null;
  }
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
        <a href="${whatsappLink(m.phone,msg)}" target="_blank" class="mr-btn wa" onclick="markReminded('${m.id}','${mq.id}')">${icon('mail',17,'ico-btn')} واتساب</a>
        <a href="tel:${m.phone}" class="mr-btn call" onclick="markReminded('${m.id}','${mq.id}')">${icon('phone',17,'ico-btn')} اتصال</a>
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
  const profilePhoto=m.photo?`<img src="${m.photo}" alt="صورة ${escapeHtml(m.name)}">`:escapeHtml((m.name||'؟').trim().charAt(0));
  $('#detailContent').innerHTML=`
    <div class="member-modern-card">
      <div class="member-modern-hero">
        <div class="member-modern-logo">
          <img src="${HAIAA_LOGO}" alt="هيئة محبي الحسين">
          <span class="file-label">ملف العضو</span>
        </div>
        <div class="member-modern-identity">
          <div class="member-modern-photo">${profilePhoto}</div>
          <div>
            <div class="member-modern-name">${escapeHtml(m.name)}</div>
            <div class="member-modern-code">${memberCode(m)}</div><br>
            <div class="member-modern-state ${active?'':'inactive'}"><span class="dot"></span>${active?'عضوية مفعّلة':'عضوية غير مفعّلة'}</div>
          </div>
        </div>
      </div>
      <div class="member-photo-actions modern">
        <button class="member-photo-btn" onclick="openEditMember('${m.id}');setTimeout(()=>document.getElementById('editPhotoInput').click(),120)">📷 تغيير الصورة</button>
        ${m.photo?`<button class="member-photo-btn delete" onclick="removeMemberPhoto('${m.id}')">🗑 حذف الصورة</button>`:''}
      </div>
    </div>
    <div class="member-modern-grid">
      <div class="member-modern-panel">
        <div class="member-modern-panel-title">البيانات الشخصية <span>${memberCode(m)}</span></div>
        <div class="detail-rows">
          ${m.isMinor&&m.birthdate?detailRow('تاريخ الميلاد', fmtDate(m.birthdate)):''}
          ${m.isMinor&&m.age!=null?detailRow('العمر', m.age):''}
          ${detailRow('الهاتف', phoneDisp(m.phone))}
          ${m.area?detailRow('المنطقة',m.area):''}
          ${m.email?detailRow('الإيميل',m.email):''}
          ${m.address?detailRow('العنوان',m.address):''}
          ${m.isAdmin?detailRow('اللجنة', m.committee||'—'):''}
          ${detailRow('تاريخ التسجيل', fmtDate(m.joinDate))}
        </div>
      </div>
      <div class="member-modern-panel">
        <div class="member-modern-panel-title">بيانات العضوية <span>${escapeHtml(m.type||'—')}</span></div>
        <div class="member-modern-membership">
          <div class="member-modern-kpi"><div class="k">بداية العضوية</div><div class="v">${m.paymentDate?fmtHijriStart(m):'—'}</div></div>
          <div class="member-modern-kpi"><div class="k">انتهاء العضوية</div><div class="v">${m.paymentDate?fmtHijriEnd(m):'—'}</div></div>
          <div class="member-modern-kpi"><div class="k">الحالة</div><div class="v ${active?'active':''}">${active?'مفعّلة':'غير مفعّلة'}</div></div>
        </div>
      </div>
    </div>
    ${subInstallmentHTML(m)}
    ${miqatsHTML}
    ${reminderHTML}
    <div class="actions-row">
      <button class="btn btn-primary" onclick="openAddSubPayment('${m.id}')">${icon('wallet',17,'ico-btn')} تفعيل العضوية</button>
      ${active?`<button class="btn btn-ghost" onclick="deactivateMembership('${m.id}')">⛔ إلغاء التفعيل</button>`:''}
      ${(memberPayments(m).length||memberMiqats(m).length)?`<button class="btn btn-ghost" onclick="printSubReceipt('${m.id}')">${icon('doc',17,'ico-btn')} تقرير الأقساط PDF</button>`:''}
      ${active?`<button class="btn btn-accent" onclick="openCard('${m.id}')">بطاقة العضوية</button>`:''}
      ${memberMiqats(m).length?`<button class="btn btn-ghost" onclick="openMemberThawab('${m.id}')">${icon('candle',17,'ico-btn')} تثويبات المرحومين</button>`:''}
      <button class="btn btn-ghost" onclick="openEditMember('${m.id}')">${icon('edit',17,'ico-btn')} تعديل الملف</button>
      <a href="${whatsappLink(m.phone)}" target="_blank" class="btn wa-btn large">${WA_ICON} واتساب</a>
      ${active?`<button class="btn btn-ghost" onclick="renewPayment('${m.id}')">تجديد سنة</button>`:''}
      <button class="btn btn-ghost btn-sm" onclick="toggleAdmin('${m.id}')">${m.isAdmin?'إزالة من الإدارة':'تعيين كإداري'}</button>
      <button class="btn btn-danger btn-sm" onclick="deleteMember('${m.id}')">حذف</button>
    </div>`;
  rememberListPos('members', id);
  currentMemberPageId=id; openFullPage('memberpage');
}

/* حذف صورة العضو من واجهة ملفه */
async function removeMemberPhoto(id){
  const m=members.find(x=>x.id===id); if(!m||!m.photo) return;
  if(!confirm('حذف صورة العضو؟')) return;
  m.photo=null;
  await saveMembers();
  showDetail(id); renderMembers(); renderDashboard();
  toast('تم حذف الصورة');
}

/* ═══════════ تثويبات المرحومين من ملف العضو ═══════════ */
let mThawabMemberId=null, mThawabMiqatId=null, mThawabNames=[];
function openMemberThawab(memberId){
  const m=members.find(x=>x.id===memberId); if(!m) return;
  const mqs=memberMiqats(m);
  if(!mqs.length){ toast('لا توجد مواقيت محجوزة لهذا العضو'); return; }
  mThawabMemberId=memberId;
  mThawabMiqatId = mqs.length===1 ? mqs[0].id : '';
  loadMThawabNames();
  $('#mThawabMemberName').textContent=m.name;
  renderMThawabBody();
  $('#memberThawabModal').classList.add('open');
}
function loadMThawabNames(){
  const mq=miqats.find(x=>x.id===mThawabMiqatId);
  if(!mq){ mThawabNames=[]; return; }
  const b=(mq.bookings||[]).find(x=>x.memberId===mThawabMemberId);
  mThawabNames = (b && b.deceased) ? [...b.deceased] : [];
}
function renderMThawabBody(){
  const m=members.find(x=>x.id===mThawabMemberId); if(!m) return;
  const mqs=memberMiqats(m);
  const body=$('#mThawabBody');
  const miqatSelector = mqs.length>1 ? `
    <div class="field full"><label>اختر الميقات</label>
      <select id="mThawabMiqatSel" onchange="mThawabPickMiqat(this.value)">
        <option value="">— اختر ميقاتاً —</option>
        ${mqs.map(mq=>`<option value="${mq.id}" ${mq.id===mThawabMiqatId?'selected':''}>${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</option>`).join('')}
      </select></div>` :
    `<div class="fin-ctx">${escapeHtml(mqs[0].name)} · ${fmtMiqatDate(mqs[0])}</div>`;

  let namesBlock='';
  if(mThawabMiqatId){
    namesBlock=`
    <div class="field full"><label>أسماء المرحومين (إهداء ثواب هذا الميقات)</label>
      <div id="mThawabNames"></div>
      <button type="button" class="btn btn-ghost btn-sm" onclick="mThawabAddName()">${icon('plus',17,'ico-btn')} إضافة اسم متوفى</button>
    </div>
    <div class="actions-row">
      <button class="btn btn-primary" onclick="saveMemberThawab()">${icon('download',17,'ico-btn')} حفظ التثويبات</button>
      ${isMiqatPassed(mThawabMiqatId)?`<button class="btn btn-accent" onclick="sendMemberThankYou('${mThawabMemberId}','${mThawabMiqatId}')">📜 إرسال شهادة الشكر PDF</button>`:''}
    </div>`;
  }
  body.innerHTML=miqatSelector+namesBlock;
  if(mThawabMiqatId) renderMThawabNames();
}
function mThawabPickMiqat(id){ mThawabMiqatId=id; loadMThawabNames(); renderMThawabBody(); }
function renderMThawabNames(){
  const box=$('#mThawabNames'); if(!box) return;
  if(!mThawabNames.length) mThawabNames=[''];
  box.innerHTML=mThawabNames.map((nm,i)=>`
    <div class="thawab-name-row">
      <input type="text" placeholder="اسم المرحوم/ة" value="${(nm||'').replace(/"/g,'&quot;')}" oninput="mThawabNames[${i}]=this.value" />
      <button type="button" class="contrib-del" onclick="mThawabRemoveName(${i})">×</button>
    </div>`).join('');
}
function mThawabAddName(){ mThawabNames.push(''); renderMThawabNames(); }
function mThawabRemoveName(i){ mThawabNames.splice(i,1); if(!mThawabNames.length) mThawabNames=['']; renderMThawabNames(); }
async function saveMemberThawab(){
  if(!mThawabMiqatId){ toast('اختر ميقاتاً'); return; }
  const mq=miqats.find(x=>x.id===mThawabMiqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===mThawabMemberId);
  if(!b){ toast('لا يوجد حجز لهذا العضو في هذا الميقات'); return; }
  const clean=mThawabNames.map(s=>(s||'').trim()).filter(Boolean);
  b.deceased = clean;
  await saveMiqats();
  closeModal('memberThawabModal');
  toast(clean.length?`تم حفظ ${clean.length} اسماً`:'تم مسح التثويبات');
}
/* هل انتهى تاريخ الميقات؟ */
function isMiqatPassed(miqatId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return false;
  const t=new Date(); t.setHours(0,0,0,0);
  const curY=parseInt(hijriParts().year,10)||1448;
  // تحقّق من أقرب حدوث للميقات (السنة الحالية أو التي قبلها)
  for(const y of [curY, curY-1]){
    const g=hijriToGregorian(mq.day,mq.month,y); if(!g) continue;
    const gd=new Date(g); gd.setHours(0,0,0,0);
    if(gd < t) return true;
  }
  return false;
}
/* إرسال شهادة الشكر من ملف العضو (نفس شهادة تثويبات المساهمين) */
function sendMemberThankYou(memberId, miqatId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const idx=(mq.bookings||[]).findIndex(b=>b.memberId===memberId);
  if(idx<0){ toast('لا يوجد حجز'); return; }
  printThawabCertificate(miqatId, memberId, idx);
}

/* ═══════════ تثويبات المرحومين للعوائل ═══════════ */
let fThawabMiqatId='', fThawabKey='', fThawabNames=[];
function famBooking(){
  const mq=miqats.find(x=>x.id===fThawabMiqatId); if(!mq) return null;
  return (mq.bookings||[]).find(b=>b.memberId===fThawabKey) || null;
}
function openFamilyThawab(miqatId, bookingKey){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const b=(mq.bookings||[]).find(x=>x.memberId===bookingKey); if(!b) return;
  fThawabMiqatId=miqatId; fThawabKey=bookingKey;
  fThawabNames = (b.deceased && b.deceased.length) ? [...b.deceased] : [''];
  $('#mThawabMemberName').textContent = b.familyName || 'العائلة';
  renderFamThawabBody();
  $('#memberThawabModal').classList.add('open');
}
function renderFamThawabBody(){
  const mq=miqats.find(x=>x.id===fThawabMiqatId); const b=famBooking();
  if(!mq||!b) return;
  $('#mThawabBody').innerHTML=`
    <div class="fin-ctx">${escapeHtml(mq.name)} · ${fmtMiqatDate(mq)}</div>
    ${b.repName?`<div class="fin-hint" style="margin-bottom:11px">${icon('user',15,'ico-btn')} الممثّل: <b>${escapeHtml(b.repName)}</b>${b.phone?` · <span dir="ltr">${escapeHtml(b.phone)}</span>`:''}</div>`:''}
    <div class="field full"><label>أسماء المرحومين (إهداء ثواب هذا الميقات)</label>
      <div id="fThawabNames"></div>
      <button type="button" class="btn btn-ghost btn-sm" onclick="fThawabAddName()">${icon('plus',17,'ico-btn')} إضافة اسم متوفى</button>
    </div>
    <div class="actions-row">
      <button class="btn btn-primary" onclick="saveFamilyThawab()">${icon('download',17,'ico-btn')} حفظ التثويبات</button>
      ${isMiqatPassed(fThawabMiqatId)?`<button class="btn btn-accent" onclick="sendFamilyThankYou()">📜 شهادة الشكر PDF</button>`:''}
    </div>
    ${(b.phone && isMiqatPassed(fThawabMiqatId))?`
      <button class="btn btn-sm" style="width:100%;margin-top:9px;background:#25d366;color:#fff;border:none" onclick="sendFamilyThawabWA()">
        ${icon('mail',16,'ico-btn')} إرسال رسالة الشكر للممثّل عبر واتساب</button>`:''}`;
  renderFamThawabNames();
}
function renderFamThawabNames(){
  const box=$('#fThawabNames'); if(!box) return;
  if(!fThawabNames.length) fThawabNames=[''];
  box.innerHTML=fThawabNames.map((nm,i)=>`
    <div class="thawab-name-row">
      <input type="text" placeholder="اسم المرحوم/ة" value="${(nm||'').replace(/"/g,'&quot;')}" oninput="fThawabNames[${i}]=this.value" />
      <button type="button" class="contrib-del" onclick="fThawabRemoveName(${i})">×</button>
    </div>`).join('');
}
function fThawabAddName(){ fThawabNames.push(''); renderFamThawabNames(); }
function fThawabRemoveName(i){ fThawabNames.splice(i,1); if(!fThawabNames.length) fThawabNames=['']; renderFamThawabNames(); }
async function saveFamilyThawab(){
  const b=famBooking(); if(!b) return;
  const names=fThawabNames.map(x=>(x||'').trim()).filter(Boolean);
  b.deceased=names;
  await saveMiqats();
  const mq=miqats.find(x=>x.id===fThawabMiqatId);
  logAudit('تعديل','المواقيت',`تثويبات ${b.familyName||'عائلة'} — ${names.length} اسماً في «${mq?mq.name:''}»`);
  toast(names.length?`حُفظت ${names.length} ${names.length===1?'تثويبة':'تثويبات'}`:'حُفظ');
  renderFamThawabBody(); if(typeof renderFamilyList==="function") renderFamilyList(); renderMiqats();
}
function sendFamilyThankYou(){
  const mq=miqats.find(x=>x.id===fThawabMiqatId); if(!mq) return;
  const idx=(mq.bookings||[]).findIndex(b=>b.memberId===fThawabKey);
  if(idx<0){ toast('لا يوجد حجز'); return; }
  printThawabCertificate(fThawabMiqatId, fThawabKey, idx);
}
/* رسالة شكر لممثّل العائلة مع أسماء المرحومين */
function sendFamilyThawabWA(){
  const mq=miqats.find(x=>x.id===fThawabMiqatId); const b=famBooking();
  if(!mq||!b||!b.phone) return;
  const names=(b.deceased||[]).filter(Boolean);
  const hijri=fmtMiqatDate(mq);
  let msg=`🌹 *السلام عليكم ورحمة الله وبركاته*\n\n`;
  msg+=`الأخ الكريم ${b.repName||''} حفظكم الله\n`;
  msg+=`ممثّل *${b.familyName||'العائلة'}*\n\n`;
  msg+=`نتقدّم إليكم بجزيل الشكر والتقدير على مساهمتكم الكريمة في إحياء مجلس:\n`;
  msg+=`*${mq.name}*\n${hijri}\n\n`;
  if(names.length){
    msg+=`🕯️ *وقد أُهدي ثواب هذا المجلس إلى أرواح:*\n`;
    names.forEach(n=>{ msg+=`• المرحوم/ة ${n}\n`; });
    msg+=`\nتغمّدهم الله بواسع رحمته، وأسكنهم فسيح جنّاته.\n\n`;
  }
  msg+=`نسأل الله أن يتقبّل منكم، ويجعله في ميزان حسناتكم، ويرزقكم شفاعة سيد الشهداء (ع).\n\n`;
  msg+=`جزاكم الله خير الجزاء\n*هيئة محبي الحسين (ع)*`;
  window.open(whatsappLink(b.phone, msg), '_blank');
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
/* عرض الهاتف بصرياً (LTR) — لا يغيّر قيمة الرقم المخزّنة إطلاقاً */
function phoneDisp(p){
  if(!p) return '';
  return `<span class="phone-disp" dir="ltr">${escapeHtml(String(p))}</span>`;
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
async function deactivateMembership(id){ const m=members.find(x=>x.id===id); if(!m) return;
  if(!confirm(`إلغاء تفعيل عضوية ${m.name}؟\n\nستُصبح العضوية «غير مفعّلة». لا يؤثر ذلك على مساهماته في المواقيت، ويمكنك تفعيلها مجدداً في أي وقت.`)) return;
  m.paymentDate=null; m.expiryDate=null; m.paidAmount=null; m.feeTotal=0; m.payments=[]; m.hijriStartYear=null; m.hijriEndYear=null;
  await saveMembers(); toast('تم إلغاء تفعيل العضوية'); showDetail(id); renderMembers(); renderDashboard(); }
async function toggleAdmin(id){ const m=members.find(x=>x.id===id); if(!m) return;
  m.isAdmin=!m.isAdmin; if(m.isAdmin&&!m.committee){ const c=prompt('اسم اللجنة (اختياري):',''); m.committee=c?c.trim():''; }
  await saveMembers(); toast(m.isAdmin?'تم التعيين كإداري':'تمت الإزالة من الإدارة'); showDetail(id); }
async function deleteMember(id){ const m=members.find(x=>x.id===id); if(!m) return;
  logAudit('حذف','الأعضاء',`العضو «${m.name}»`);
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
  if(!list.length){ el.innerHTML=`<div class="empty"><div class="icon">${icon('candle',17,'ico-btn')}</div><div class="txt">لا توجد مواقيت. اضغط «إضافة ميقات».</div></div>`; return; }
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
    return `<div class="miqat-card st-${st}" data-row-id="${mq.id}">
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
  resetThawabInputs();
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
      <button type="button" class="btn btn-ghost btn-sm" onclick="contribAdd('${ctx}')">${icon('plus',17,'ico-btn')} بند آخر</button>
      <span class="contrib-total">الإجمالي: <b data-total="${ctx}">${fmtMoney(contribTotal(ctx))}</b></span>
    </div>`;
}

let thawabNamesList=[];
function toggleThawabNames(){
  const on=$('#bookingThawab').checked;
  $('#thawabNamesWrap').style.display = on?'block':'none';
  if(on && !thawabNamesList.length){ thawabNamesList=['']; renderThawabNames(); }
}
function renderThawabNames(){
  const box=$('#thawabNames'); if(!box) return;
  box.innerHTML=thawabNamesList.map((nm,i)=>`
    <div class="thawab-name-row">
      <input type="text" placeholder="اسم المرحوم/ة" value="${(nm||'').replace(/"/g,'&quot;')}" oninput="setThawabName(${i},this.value)" />
      <button type="button" class="contrib-del" onclick="removeThawabName(${i})" title="حذف">×</button>
    </div>`).join('');
}
function setThawabName(i,v){ thawabNamesList[i]=v; }
function addThawabName(){ thawabNamesList.push(''); renderThawabNames(); }
function removeThawabName(i){ thawabNamesList.splice(i,1); if(!thawabNamesList.length){ thawabNamesList=['']; } renderThawabNames(); }
function resetThawabInputs(){ thawabNamesList=[]; const cb=$('#bookingThawab'); if(cb) cb.checked=false; const w=$('#thawabNamesWrap'); if(w) w.style.display='none'; const b=$('#thawabNames'); if(b) b.innerHTML=''; }

async function saveBooking(){
  const miqatId=$('#bookingMiqatId').value; const memberId=$('#bookingMember').value;
  const items=contribItems('booking'); const amount=items.reduce((s,i)=>s+i.value,0);
  if(!items.length){ toast('أدخل بنداً واحداً على الأقل'); return; }
  const initRaw=$('#bookingInitPaid').value; const initPaid = initRaw==='' ? 0 : Math.max(0, Math.min(amount, parseFloat(initRaw)||0));
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  // أسماء المرحومين (إهداء الثواب)
  const deceased = ($('#bookingThawab') && $('#bookingThawab').checked)
    ? thawabNamesList.map(s=>(s||'').trim()).filter(Boolean) : [];
  mq.bookings=mq.bookings||[]; const existing=mq.bookings.find(b=>b.memberId===memberId);
  if(existing){
    existing.items=[...bookingItems(existing).filter(x=>(Number(x.value)||0)>0||x.kind!=='نقدي'), ...items];
    existing.amount=(Number(existing.amount)||0)+amount;
    if(!Array.isArray(existing.payments)) existing.payments=[{amount:Number(existing.amount)-amount, date:today()}];
    if(initPaid>0) existing.payments.push({amount:initPaid, date:today()});
    if(deceased.length) existing.deceased=[...(existing.deceased||[]), ...deceased];
  } else {
    const b={memberId, amount, items, payments: initPaid>0?[{amount:initPaid, date:today()}]:[]};
    if(deceased.length) b.deceased=deceased;
    mq.bookings.push(b);
  }
  await saveMiqats(); resetThawabInputs(); closeModal('bookingModal'); renderMiqats(); renderRecentMembers(); renderDashboard(); toast('تم إضافة الحجز');
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
        <div class="fc-name">${icon('users',17,'ico-btn')} ${escapeHtml(b.familyName)}</div>
        <span class="fc-chev">${open?'▲':'▼'}</span>
      </div>
      <div class="fc-details" style="display:${open?'block':'none'}">
        <div class="fc-rep">الممثّل: ${escapeHtml(b.repName||'—')} · ${phoneDisp(b.phone)}</div>
        <div class="fc-miqat">${icon('candle',17,'ico-btn')} ${escapeHtml(mq.name)} · ${fmtMiqatDate(mq)}</div>
        <div class="fc-contrib">${fmtBooking(b)}</div>
        <div class="fc-bar"><span style="width:${pct}%"></span></div>
        <div class="fc-nums"><span class="paid">مُحصّل ${fmtMoney(pd)}</span><span>${rem>0?`متّفق ${fmtMoney(ag)} · <span class="rem">متبقّي ${fmtMoney(rem)}</span>`:'مكتمل ✓'}</span></div>
        <div class="fc-btns">
          <button class="fb-edit" onclick="editFamilyBooking('${mq.id}','${b.memberId}')">${icon('edit',17,'ico-btn')} تعديل</button>
          <button class="fb-pay" onclick="openBookingPayment('${mq.id}','${b.memberId}')">${icon('plus',17,'ico-btn')} أقساط</button>
          <button class="fb-wa" onclick="sendFamilyMiqatReminder('${mq.id}','${b.memberId}')">${icon('mail',17,'ico-btn')} تذكير</button>
          <button class="fb-del" onclick="deleteFamilyBooking('${mq.id}','${b.memberId}')">🗑 حذف</button>
        </div>
        <button class="fb-thawab" onclick="openFamilyThawab('${mq.id}','${b.memberId}')">${icon('candle',17,'ico-btn')} تثويبات المرحومين${(b.deceased&&b.deceased.length)?` (${b.deceased.length})`:''}</button>
        <button class="fb-pdf" onclick="printOneFamilyReport('${mq.id}','${b.memberId}')">${icon('doc',17,'ico-btn')} تقرير هذه العائلة (PDF)</button>
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
      <div class="row">رقم الهاتف: <b>${b.phone?phoneDisp(b.phone):'—'}</b></div>
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
    return `<div class="blk"><div class="blk-h">${icon('users',17,'ico-btn')} ${escapeHtml(b.familyName)} <span class="st">${rem<=0?'مكتمل':'متبقّي '+fmtMoney(rem)}</span></div>
      <div class="sm">الممثّل: ${escapeHtml(b.repName||'—')} · ${phoneDisp(b.phone)}</div>
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
    <button onclick="window.print()">${icon('print',17,'ico-btn')} حفظ / طباعة PDF</button>
    <button onclick="window.close()">↩︎ عودة</button>
    <button onclick="window.close()">${icon('home',17,'ico-btn')} الرئيسية</button>
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
  if(!admins.length){ el.innerHTML=`<div class="empty"><div class="icon">${icon('users',17,'ico-btn')}</div><div class="txt">لا يوجد أعضاء إدارة بعد.</div></div>`; return; }
  el.innerHTML=admins.map(m=>`<div class="admin-row">
    <div><div class="a-name">${escapeHtml(m.name)}</div><div class="a-comm">${escapeHtml(m.committee||'إدارة الهيئة')} · ${memberCode(m)}</div></div>
    <a href="${whatsappLink(m.phone)}" target="_blank" class="wa-btn small">${WA_ICON}</a>
  </div>`).join('');
}
function openAdminBulk(){ openBulkMessage(); $('#bulkFilter').value='admins'; updateBulkCount(); }

/* ═══════════ Settings ═══════════ */
/* سجل التغييرات — لأمين السر فقط */
function renderAuditLog(){
  const box=document.getElementById('auditList'); if(!box) return;
  const cat=(document.getElementById('auditCat')||{}).value||'';
  const q=((document.getElementById('auditSearch')||{}).value||'').trim();
  let list=[...auditLog].reverse();
  if(cat) list=list.filter(x=>x.cat===cat);
  if(q) list=list.filter(x=>(x.what||'').includes(q)||(x.who||'').includes(q)||(x.act||'').includes(q));
  if(!list.length){ box.innerHTML='<div class="audit-empty">لا توجد عمليات مسجّلة'+(cat||q?' بهذا الفلتر':' بعد')+'</div>'; return; }
  const cls=(a)=>a==='حذف'||a==='رفض'?'del':a==='إضافة'||a==='موافقة'?'add':'edit';
  box.innerHTML=list.slice(0,200).map(x=>{
    const d=new Date(x.at);
    return `<div class="audit-row">
      <span class="au-act ${cls(x.act)}">${escapeHtml(x.act)}</span>
      <div class="au-body">
        <div class="au-what">${escapeHtml(x.what)} <span style="color:var(--muted-2)">· ${escapeHtml(x.cat)}</span></div>
        <div class="au-meta">${escapeHtml((x.who||'').split('@')[0])} · ${d.toLocaleDateString('ar')} ${d.toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'})}</div>
      </div>
    </div>`;
  }).join('');
}
async function clearAuditLog(){
  if(!confirm('مسح سجل التغييرات بالكامل؟')) return;
  auditLog=[]; await saveAuditLog(); renderAuditLog(); toast('مُسح السجل');
}
/* حماية قسم السحابة برقم سري — اعتراض الضغط قبل الفتح */
let cloudUnlocked=false;
let archiveUnlocked=false;   // قفل الأرشيف بالرقم السري
function guardCloudClick(ev){
  const acc=document.getElementById('cloudAcc');
  if(!acc) return true;
  // إذا كان مفتوحاً: اسمح بالإغلاق بلا سؤال
  if(acc.open) return true;
  // مفتوح مسبقاً في هذه الجلسة؟ اسمح
  if(cloudUnlocked) return true;
  // امنع الفتح واسأل
  ev.preventDefault(); ev.stopPropagation();
  const code=prompt('🔐 السحابة والمزامنة — أدخل الرقم السري:');
  if(code===null) return false;
  if(code.trim()!=='4827'){ toast('رقم سري غير صحيح'); return false; }
  cloudUnlocked=true;
  acc.open=true;
  try{ logAudit('دخول','السحابة','فُتح قسم السحابة والمزامنة'); }catch(e){}
  return false;
}
function renderBackupStatus(){
  const box=document.getElementById('backupWarnBox'); if(!box) return;
  const lastB=window.__lastBackupAt||'';
  if(!lastB){ box.innerHTML=`<div class="backup-warn">${icon('warn',17,'ico-btn')} لم تُؤخذ نسخة احتياطية من هذا الجهاز بعد — يُنصح بأخذ نسخة الآن.</div>`; return; }
  const d=new Date(lastB); const t=new Date(); t.setHours(0,0,0,0); const d0=new Date(d); d0.setHours(0,0,0,0);
  const days=Math.round((t-d0)/86400000);
  const txt = days===0?'اليوم':days===1?'أمس':`قبل ${days} يوماً`;
  const dateStr = d.toLocaleDateString('ar',{day:'numeric',month:'long',year:'numeric'});
  const timeStr = d.toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
  const full = `${dateStr} · ${timeStr}`;
  box.innerHTML = days>=7
    ? `<div class="backup-warn">${icon('warn',17,'ico-btn')} آخر نسخة احتياطية كانت ${txt} — يُنصح بأخذ نسخة جديدة.
        <div class="bk-when">${escapeHtml(full)}</div></div>`
    : `<div class="backup-ok">${icon('check',17,'ico-btn')} آخر نسخة احتياطية: ${txt}
        <div class="bk-when">${escapeHtml(full)}</div></div>`;
}
function fillSettings(){
  $('#setFee').value=settings.fee; $('#setYear').value=settings.year;
  $('#tplReminder').value=settings.templates.reminder; $('#tplMeeting').value=settings.templates.meeting;
  $('#tplOccasion').value=settings.templates.occasion; $('#tplAdminMeeting').value=settings.templates.adminMeeting;
  renderPhoneDirectory();
  renderBackupStatus();
  // سجل التغييرات — لأمين السر فقط
  const acc=document.getElementById('auditAcc');
  if(acc){
    const me=(window.CloudSync && CloudSync.email)?CloudSync.email.toLowerCase():'';
    acc.style.display = (me==='smuneer89@gmail.com') ? 'block' : 'none';
  }
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
async function downloadProjectZip(){
  const url='https://github.com/smuneer89-collab/Haiaa/archive/refs/heads/main.zip';
  const filename='Haiaa-main.zip';
  try{
    let saveHandle=null;
    if(typeof window.showSaveFilePicker==='function'){
      saveHandle=await window.showSaveFilePicker({
        suggestedName:filename,
        types:[{description:'ZIP archive',accept:{'application/zip':['.zip']}}]
      });
    }
    toast('جارٍ تجهيز أحدث ملفات المشروع…');
    const response=await fetch(url);
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob=await response.blob();
    if(saveHandle){
      const writable=await saveHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      toast('تم حفظ أحدث ملفات المشروع');
      return;
    }
    const file=new File([blob],filename,{type:'application/zip'});
    if(navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))){
      await new Promise((resolve,reject)=>{
        const layer=document.createElement('div');
        layer.style.cssText='position:fixed;inset:0;z-index:99999;background:#0008;display:flex;align-items:center;justify-content:center;padding:20px';
        layer.innerHTML=`<div style="max-width:360px;width:100%;background:#fff;color:#222;border-radius:16px;padding:20px;text-align:center;box-shadow:0 12px 40px #0005"><b style="display:block;margin-bottom:8px">ملف المشروع جاهز</b><div style="font-size:14px;margin-bottom:16px">اضغط الزر ثم اختر «حفظ في الملفات» وحدد المجلد.</div><button class="btn btn-primary" data-save style="width:100%;margin-bottom:8px">اختيار مكان الحفظ</button><button class="btn btn-ghost" data-cancel style="width:100%">إلغاء</button></div>`;
        document.body.appendChild(layer);
        layer.querySelector('[data-save]').onclick=async()=>{
          try{ await navigator.share({files:[file],title:'نسخة ملفات المشروع'}); layer.remove(); resolve(); }
          catch(e){ layer.remove(); reject(e); }
        };
        layer.querySelector('[data-cancel]').onclick=()=>{ layer.remove(); reject(new DOMException('Cancelled','AbortError')); };
      });
      toast('تم فتح خيارات حفظ الملف');
      return;
    }
    const blobUrl=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=blobUrl; a.download=filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(blobUrl),1000);
    toast('المتصفح لا يدعم Save As؛ بدأ التنزيل بالطريقة العادية');
  }catch(err){
    if(err && err.name==='AbortError'){
      toast('تم إلغاء الحفظ');
      return;
    }
    console.error('Project ZIP download failed:',err);
    toast('تعذّر تجهيز ملف المشروع — تحقق من الإنترنت وحاول مرة أخرى');
  }
}
async function backupExport(){
  const backup={
    app:'هيئة محبي الحسين', version:11, exportedAt:new Date().toISOString(),
    members, miqats, news, settings, meetings, assemblies, photos,
    finance, financeLog, paidThawab, reminders,
    radoods, radoodEvals, projects, auditLog, radoodParts, archives, revenues, letters, mediaItems,
    devIdeas, devDrafts, devUpdates, devVersions, memberCandidates
  };
  const counts=`${members.length} عضو · ${miqats.length} ميقات · ${(finance.expenses||[]).length} مصروف · ${radoods.length} رادود · ${projects.length} مشروع`;
  downloadBlob(JSON.stringify(backup,null,2),'application/json;charset=utf-8',`نسخة_احتياطية_${today().replace(/-/g,'')}.json`);
  try{ const nowISO=new Date().toISOString(); await storage.set('lastBackupAt', nowISO); window.__lastBackupAt=nowISO; }catch(e){}
  toast(`تم حفظ نسخة احتياطية كاملة (${counts})`);
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
  const has=(k)=>Array.isArray(backup[k])?backup[k].length:0;
  const summary = `📦 محتوى النسخة:\n\n`+
    `• التاريخ: ${backup.exportedAt?new Date(backup.exportedAt).toLocaleString('ar'):'غير معروف'}\n`+
    `• الأعضاء: ${has('members')}\n• المواقيت: ${has('miqats')}\n`+
    `• المصروفات: ${(backup.finance&&backup.finance.expenses||[]).length}\n`+
    `• الرواديد: ${has('radoods')} (تقييمات: ${has('radoodEvals')})\n`+
    `• المشاريع: ${has('projects')}\n• الاجتماعات: ${has('meetings')}\n\n`+
    `⚠️ سيُستبدل كل ما في هذا الجهاز.\n\nهل تريد المتابعة؟`;
  if(!confirm(summary)){ e.target.value=''; return; }
  const typed=prompt('للتأكيد النهائي، اكتب كلمة:  استعادة');
  if((typed||'').trim()!=='استعادة'){ toast('أُلغيت الاستعادة'); e.target.value=''; return; }
  try{
    members=backup.members||[]; miqats=backup.miqats||[]; news=backup.news||[]; meetings=backup.meetings||[]; assemblies=backup.assemblies||[]; photos=backup.photos||[];
    if(backup.finance) finance={...finance, ...backup.finance};
    if(Array.isArray(backup.financeLog)) financeLog=backup.financeLog;
    if(Array.isArray(backup.paidThawab)) paidThawab=backup.paidThawab;
    if(Array.isArray(backup.reminders)) reminders=backup.reminders;
    if(Array.isArray(backup.radoods)) radoods=backup.radoods;
    if(Array.isArray(backup.radoodEvals)) radoodEvals=backup.radoodEvals;
    if(Array.isArray(backup.projects)) projects=backup.projects;
    if(Array.isArray(backup.auditLog)) auditLog=backup.auditLog;
    if(Array.isArray(backup.radoodParts)) radoodParts=backup.radoodParts;
    if(Array.isArray(backup.archives)) archives=backup.archives;
    if(Array.isArray(backup.revenues)) revenues=backup.revenues;
    if(Array.isArray(backup.letters)) letters=backup.letters;
    if(Array.isArray(backup.mediaItems)) mediaItems=backup.mediaItems;
    if(Array.isArray(backup.devIdeas)) devIdeas=backup.devIdeas;
    if(Array.isArray(backup.devDrafts)) devDrafts=backup.devDrafts;
    if(Array.isArray(backup.devUpdates)) devUpdates=backup.devUpdates;
    if(Array.isArray(backup.devVersions)) devVersions=backup.devVersions;
    if(Array.isArray(backup.memberCandidates)) memberCandidates=backup.memberCandidates;
    if(backup.settings) settings={...settings,...backup.settings, counters:{...settings.counters,...(backup.settings.counters||{})}, templates:{...settings.templates,...(backup.settings.templates||{})}};
    await saveMembers(); await saveMiqats(); await storage.set('news',JSON.stringify(news)); await saveMeetings(); await saveAssemblies(); await savePhotos(); await persistSettings();
    await saveFinance(); try{ await storage.set('financeLog',JSON.stringify(financeLog)); }catch(_){}
    await savePaidThawab(); await saveRadoods(); await saveRadoodEvals(); await saveProjects(); await saveAuditLog(); await saveRadoodParts(); await saveArchives(); await saveRevenues(); await saveLetters(); await saveMediaItems();
    await saveDevIdeas(); await saveDevDrafts(); await saveDevUpdates(); await saveDevVersions(); await saveMemberCandidates();
    try{ await storage.set('reminders',JSON.stringify(reminders)); }catch(_){}
    e.target.value=''; toast(`تمت الاستعادة الكاملة — ${members.length} عضو`); renderDashboard(); renderMembers(); fillSettings();
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
    ab.innerHTML=`<span>${icon('user',17,'ico-btn')} الأكثر غياباً: <b>${escapeHtml(s.topMember.name)}</b></span><span>${s.topAbsN} غياب · نسبة الغياب ${s.absPct}%</span>`;
  } else { ab.className='mtg-absent-card none';
    ab.innerHTML=`<span>${icon('check',17,'ico-btn')} لا توجد غيابات مسجّلة بعد</span><span>نسبة الحضور ${s.attPct}%</span>`; }
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
    <div class="msc-head">${icon('doc',17,'ico-btn')} لوحة اجتماعات الإدارة</div>
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
  ['hub','sec','finance','media','aza','archive','admins'].forEach(v=>{
    const el=document.getElementById('idara-'+v); if(el) el.style.display = (v===view)?'block':'none';
  });
}
function idaraHome(){ idaraShow('hub'); renderIdaraHub(); window.scrollTo({top:0,behavior:'smooth'}); }
function renderIdaraHub(){
  const n=members.filter(m=>m.isAdmin).length;
  const el=document.getElementById('idaraAdminsCount'); if(el) el.textContent=`${n} إداري`;
}
function openIdara(which){
  if(which==='sec'){ idaraShow('sec'); updateSecCards(); fillAnnualYears(); }
  else if(which==='admins'){ idaraShow('admins'); renderAdmins(); }
  else if(which==='finance'){ enterFinance(); }
  else if(which==='media'){ idaraShow('media'); renderAlbum(); renderGdCats(); buildGdIndex(); const c=$('#medCount'); if(c) c.textContent=mediaItems.length?mediaItems.length+' مادة':''; }
  else if(which==='archive'){
    if(!archiveUnlocked){
      const code=prompt('🔐 الأرشيف — أدخل الرقم السري:');
      if(code===null) return;
      if(code.trim()!=='4827'){ toast('رقم سري غير صحيح'); return; }
      archiveUnlocked=true;
      try{ logAudit('دخول','الأرشيف','فُتح قسم الأرشيف'); }catch(e){}
    }
    idaraShow('archive'); renderArchive();
  }
  else if(which==='aza'){ idaraShow('aza'); renderRadoods(); markAzaSeen(); checkNewAzaSubmissions().then(()=>renderRadoods()); }
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ═══════════ لجنة العزاء — الرواديد ═══════════ */
let radoodPhotoData=null, editingRadoodId=null;
/* مشاركات الرادود: من التقييمات + جلسات التقييم + الاستبيانات + المُدخل يدوياً */
function radoodParticipationList(radoodId){
  const map=new Map();   // miqatId -> {miqatId, miqatName, sources:Set, manualId}
  const add=(miqatId, miqatName, src, manualId)=>{
    const key = miqatId || ('name:'+(miqatName||'—'));
    if(!map.has(key)) map.set(key,{ key, miqatId:miqatId||'', miqatName:miqatName||'', sources:new Set(), manualId:null });
    const it=map.get(key);
    it.sources.add(src);
    if(!it.miqatName && miqatName) it.miqatName=miqatName;
    if(manualId) it.manualId=manualId;
  };
  radoodEvals.filter(e=>e.radoodId===radoodId).forEach(e=>{
    const mq=miqats.find(x=>x.id===e.miqatId);
    add(e.miqatId, e.miqatName||(mq?mq.name:''), 'تقييم');
  });
  (window.__azaSessions||[]).filter(s=>s.radoodId===radoodId).forEach(s=>{ add(s.miqatId, s.miqatName, 'جلسة تقييم'); const k=s.miqatId||('name:'+(s.miqatName||'—')); const it=map.get(k); if(it) it.evalSessionId=s._id; });
  (window.__azaSurveys||[]).filter(s=>s.radoodId===radoodId).forEach(s=>{ add(s.miqatId, s.miqatName, 'استبيان'); const k=s.miqatId||('name:'+(s.miqatName||'—')); const it=map.get(k); if(it) it.surveySessionId=s._id; });
  (radoodParts||[]).filter(p=>p.radoodId===radoodId).forEach(p=>{
    const mq=miqats.find(x=>x.id===p.miqatId);
    add(p.miqatId, p.miqatName||(mq?mq.name:''), 'يدوي', p.id);
  });
  return [...map.values()];
}
function radoodParticipations(radoodId){ return radoodParticipationList(radoodId).length; }
function radoodOverallAvg(radoodId){
  const evs=radoodEvals.filter(e=>e.radoodId===radoodId);
  if(!evs.length) return 0;
  return evs.reduce((s,e)=>s+(e.avg||0),0)/evs.length;
}
function renderRadoods(){
  const q=($('#radoodSearch')?.value||'').trim();
  const cnt=$('#azaRcount'); if(cnt) cnt.textContent=`${radoods.length} رادود`;
  const host=$('#radoodList'); if(!host) return;
  if(!radoods.length){
    host.innerHTML=`<div class="radood-empty"><div class="re-ic">${icon('mic',17,'ico-btn')}</div><div>لا يوجد رواديد بعد — أضف أول رادود من زر «${icon('plus',17,'ico-btn')} إضافة رادود»</div></div>`;
    return;
  }
  const list=radoods.filter(r=>!q||(r.name||'').includes(q)).sort((a,b)=>(a.name||'').localeCompare(b.name||'','ar'));
  if(!list.length){ host.innerHTML=`<div class="radood-empty"><div class="re-ic">${icon('search',17,'ico-btn')}</div><div>لا نتائج للبحث «${escapeHtml(q)}»</div></div>`; return; }
  host.innerHTML=list.map(r=>{
    const nPart=radoodParticipations(r.id);
    const avg=radoodOverallAvg(r.id);
    const pct=Math.round(avg/3*100);
    return `<div class="radood-card">
      <div class="radood-open" onclick="openRadoodRecord('${r.id}')">
        <div class="radood-avatar">${r.img?`<img class="radood-avatar" src="${r.img}" alt="" style="border:none">`:'🎤'}</div>
        <div class="radood-info">
          <div class="radood-name">${escapeHtml(r.name)}</div>
          <div class="radood-meta">${nPart} مشاركة${nPart?` · متوسط ${pct}%`:''}${r.note?' · '+escapeHtml(r.note):''} · اضغط للسجل ›</div>
        </div>
      </div>
      <div class="radood-actions">
        <button onclick="openEditRadood('${r.id}')" title="تعديل">${icon('edit',17,'ico-btn')}</button>
        <button onclick="deleteRadood('${r.id}')" title="حذف">${icon('trash',17,'ico-btn')}</button>
      </div>
    </div>`;
  }).join('');
}
function openAddRadood(){
  editingRadoodId=null; radoodPhotoData=null;
  $('#radoodModalTitle').textContent='➕ إضافة رادود';
  $('#radoodName').value=''; $('#radoodNote').value='';
  $('#radoodPhotoPreview').innerHTML='🎤';
  $('#radoodPhotoPickLabel').textContent='اختر صورة';
  $('#radoodModal').classList.add('open');
}
function openEditRadood(id){
  const r=radoods.find(x=>x.id===id); if(!r) return;
  editingRadoodId=id; radoodPhotoData=null;
  $('#radoodModalTitle').textContent='✏️ تعديل رادود';
  $('#radoodName').value=r.name||''; $('#radoodNote').value=r.note||'';
  $('#radoodPhotoPreview').innerHTML=r.img?`<img src="${r.img}" alt="" />`:'🎤';
  $('#radoodPhotoPickLabel').textContent='تغيير الصورة (اختياري)';
  $('#radoodModal').classList.add('open');
}
async function handleRadoodPhotoSelect(e){
  const file=e.target.files[0]; if(!file) return;
  if(file.size>15*1024*1024){ toast('الصورة كبيرة جداً (أقل من 15 ميجا)'); return; }
  try{ radoodPhotoData=await processPhoto(file, 500, .8); $('#radoodPhotoPreview').innerHTML=`<img src="${radoodPhotoData}" alt="" />`; }
  catch(err){ toast('تعذّرت معالجة الصورة'); }
}
async function saveRadood(){
  const name=$('#radoodName').value.trim();
  if(!name){ toast('أدخل اسم الرادود'); return; }
  const note=$('#radoodNote').value.trim();
  if(editingRadoodId){
    const r=radoods.find(x=>x.id===editingRadoodId);
    if(r){ r.name=name; r.note=note; if(radoodPhotoData) r.img=radoodPhotoData; }
    await saveRadoods(); editingRadoodId=null; radoodPhotoData=null;
    closeModal('radoodModal'); toast('تم تحديث بيانات الرادود'); renderRadoods(); return;
  }
  radoods.push({ id:'rad_'+Date.now(), name, note, img:radoodPhotoData||'', at:new Date().toISOString() });
  logAudit('إضافة','لجنة العزاء',`رادود «${name}»`);
  await saveRadoods(); radoodPhotoData=null;
  closeModal('radoodModal'); toast('تمت إضافة الرادود'); renderRadoods();
}
async function deleteRadood(id){
  const r=radoods.find(x=>x.id===id); if(!r) return;
  const nEval=radoodEvals.filter(e=>e.radoodId===id).length;
  const warn=nEval?`\n\nتنبيه: لديه ${nEval} تقييم سيُحذف أيضاً.`:'';
  if(!confirm(`حذف الرادود «${r.name}»؟${warn}`)) return;
  logAudit('حذف','لجنة العزاء',`الرادود «${r.name}» (${nEval} تقييم)`);
  radoods=radoods.filter(x=>x.id!==id);
  radoodEvals=radoodEvals.filter(e=>e.radoodId!==id);
  await saveRadoods(); await saveRadoodEvals();
  renderRadoods();
}

/* ═══════════ تقييم الرادود ═══════════ */
// بنود النجوم مجمّعة
const EVAL_GROUPS=[
  { key:'commit', title:'الالتزام', items:[['attendance','الحضور في الوقت'],['duration','الالتزام بمدة القراءة']] },
  { key:'perf', title:'الأداء', items:[['voice','جودة الصوت'],['clarity','وضوح النطق'],['melody','التحكم باللحن'],['meter','ضبط الوزن'],['variety','التنوع في الأداء']] },
  { key:'engage', title:'التفاعل', items:[['audience','تفاعل المعزّين'],['response','الرد مع الرادود'],['opener','المستهل'],['poem','القصيدة']] },
  { key:'poems', title:'القصائد', items:[['selection','اختيار القصائد'],['suitability','مناسبة الشعر للمناسبة'],['quality','جودة الكلمات']] },
  { key:'mgmt', title:'إدارة المجلس', items:[['admin','التعامل مع الإدارة'],['flexibility','المرونة أثناء التغيير']] },
];
const PROGRAM_TYPES=['حماسي','حزين','ولائي','عقائدي','تاريخي'];
const AMBIANCE_Q=[
  ['full','هل امتلأ المجلس؟'],['left','هل خرج أشخاص أثناء القراءة؟'],
  ['increased','هل زاد الحضور أثناء القراءة؟'],['quiet','هل كان هناك هدوء؟'],['disciplined','هل كان المجلس منضبطاً؟'],
];
const STRENGTHS=['مستهل ممتاز','سيطرة على المجلس','صوت قوي','اختيار موفّق للقصائد','تفاعل كبير'];
const RECOMMENDS=['إعادة دعوته ليلة عاشوراء','إعطاؤه مناسبة أكبر','إعطاؤه مناسبة أخرى','يحتاج تنويعاً في القصائد','يحتاج تحسين إدارة الوقت','يحتاج التدريب أكثر'];
const RATING_LEVELS=[['bad','سيء',1],['good','جيد',2],['excellent','ممتاز',3]]; // من 3: سيء=33% جيد=67% ممتاز=100%

let evalRadoodId=null, evalData=null;
function openRadoodEval(radoodId){
  const r=radoods.find(x=>x.id===radoodId); if(!r) return;
  evalRadoodId=radoodId;
  evalData={ stars:{}, program:{}, programList:[], ambiance:{}, strengths:[], recommends:[], miqatId:'', occasion:'', duration:'', notes:'', gaveRight:'', gaveRightReason:'' };
  renderRadoodEvalPage();
  openFullPage('radoodeval');
}
function closeRadoodEval(){ switchTab('meetings'); openIdara('aza'); }

function renderRadoodEvalPage(){
  const r=radoods.find(x=>x.id===evalRadoodId); if(!r) return;
  const miqatOpts=[...miqats].sort((a,b)=>a.month-b.month||a.day-b.day);
  const host=$('#radoodEvalBody');
  host.innerHTML=`
  <div class="panel eval-panel">
    <div class="eval-head">
      <div class="eval-radood">
        <div class="eval-avatar">${r.img?`<img src="${r.img}" alt="">`:'🎤'}</div>
        <div class="eval-rname">${escapeHtml(r.name)}</div>
      </div>
      <div class="eval-title">${icon('star',17,'ico-btn')} تقييم الرادود</div>
    </div>

    <!-- معلومات المناسبة -->
    <div class="eval-sec">
      <div class="eval-sec-h">${icon('calendar',17,'ico-btn')} معلومات المناسبة</div>
      <div class="eval-field"><label>الميقات</label>
        <select id="evMiqat" onchange="evalPickMiqat(this.value)">
          <option value="">— اختر الميقات —</option>
          ${miqatOpts.map(mq=>`<option value="${mq.id}">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</option>`).join('')}
        </select></div>
      <div class="eval-field"><label>المناسبة</label>
        <input id="evOccasion" type="text" placeholder="مثال: ليلة السابع من محرم" oninput="evalData.occasion=this.value"></div>
      <div class="eval-field"><label>مدة القراءة</label>
        <input id="evDuration" type="text" placeholder="مثال: ساعة و15 دقيقة" oninput="evalData.duration=this.value"></div>
    </div>

    <!-- بنود التقييم (سيء/جيد/ممتاز) -->
    ${EVAL_GROUPS.map(g=>`
      <div class="eval-sec">
        <div class="eval-sec-h">${g.title}</div>
        ${g.items.map(([k,label])=>`
          <div class="eval-rate-row">
            <span class="err-label">${label}</span>
            <span class="rate-btns" data-key="${k}">
              ${RATING_LEVELS.map(([rk,rlabel,rval])=>`<button class="rate-btn r-${rk}" data-v="${rval}" onclick="setRating('${k}',${rval})">${rlabel}</button>`).join('')}
            </span>
          </div>`).join('')}
      </div>`).join('')}

    <!-- نوع البرنامج العام -->
    <div class="eval-sec">
      <div class="eval-sec-h">${icon('star',17,'ico-btn')} نوع البرنامج العام <span class="eval-hint">تستطيع اختيار خيارين فقط</span></div>
      <div class="eval-chips">
        ${PROGRAM_TYPES.map(t=>`<button class="eval-chip" onclick="toggleProgram('${escapeHtml(t)}',this)">${t}</button>`).join('')}
      </div>
    </div>

    <!-- تقييم الأجواء -->
    <div class="eval-sec">
      <div class="eval-sec-h">🌙 تقييم الأجواء</div>
      ${AMBIANCE_Q.map(([k,q])=>`
        <div class="eval-yn-row">
          <span class="eyn-q">${q}</span>
          <span class="eyn-btns">
            <button class="eyn-btn" data-k="${k}" data-v="yes" onclick="setAmbiance('${k}','yes')">نعم</button>
            <button class="eyn-btn" data-k="${k}" data-v="no" onclick="setAmbiance('${k}','no')">لا</button>
          </span>
        </div>`).join('')}
    </div>

    <!-- نقاط القوة -->
    <div class="eval-sec">
      <div class="eval-sec-h">${icon('star',17,'ico-btn')} أبرز نقاط القوة</div>
      <div class="eval-chips">
        ${STRENGTHS.map(s=>`<button class="eval-chip" data-s="${escapeHtml(s)}" onclick="toggleStrength('${escapeHtml(s)}',this)">${s}</button>`).join('')}
      </div>
    </div>

    <!-- الملاحظات -->
    <div class="eval-sec">
      <div class="eval-sec-h">${icon('edit',17,'ico-btn')} الملاحظات</div>
      <textarea id="evNotes" rows="4" placeholder="اكتب ملاحظاتك هنا…" oninput="evalData.notes=this.value"></textarea>
    </div>

    <!-- التوصيات -->
    <div class="eval-sec">
      <div class="eval-sec-h">${icon('star',17,'ico-btn')} التوصيات <span class="eval-hint">تستطيع اختيار أكثر من توصية (حتى ٣)</span></div>
      <div class="eval-chips">
        ${RECOMMENDS.map(s=>`<button class="eval-chip" data-r="${escapeHtml(s)}" onclick="toggleRecommend('${escapeHtml(s)}',this)">${s}</button>`).join('')}
      </div>
    </div>

    <!-- هل أعطى المناسبة حقها -->
    <div class="eval-sec">
      <div class="eval-sec-h">${icon('chart',17,'ico-btn')} هل أعطى الرادود هذه المناسبة حقّها؟</div>
      <div class="eyn-btns" style="margin-bottom:10px;">
        <button class="eyn-btn" id="rightYes" onclick="setGaveRight('yes')">نعم</button>
        <button class="eyn-btn" id="rightNo" onclick="setGaveRight('no')">لا</button>
      </div>
      <div id="rightReasonWrap" style="display:none;">
        <textarea id="rightReason" rows="2" placeholder="اذكر السبب…" oninput="evalData.gaveRightReason=this.value"></textarea>
      </div>
    </div>

    <!-- النتيجة النهائية -->
    <div class="eval-result" id="evalResult">
      <div class="er-label">النتيجة النهائية</div>
      <div class="er-value" id="evalScore">—</div>
      <div class="er-stars" id="evalScoreStars"></div>
    </div>

    <button class="btn btn-primary" style="width:100%;margin-top:14px;" onclick="saveRadoodEval()">${icon('download',17,'ico-btn')} حفظ التقييم</button>
  </div>`;
}
function evalPickMiqat(id){ evalData.miqatId=id; const mq=miqats.find(x=>x.id===id); if(mq && !$('#evOccasion').value){ $('#evOccasion').value=mq.name; evalData.occasion=mq.name; } }
function setRating(key,val){
  evalData.stars[key]=val;
  document.querySelectorAll(`.rate-btns[data-key="${key}"] .rate-btn`).forEach(b=>b.classList.toggle('on',+b.dataset.v===val));
  updateEvalScore();
}
function setAmbiance(k,v){
  evalData.ambiance[k]=v;
  document.querySelectorAll(`.eyn-btn[data-k="${k}"]`).forEach(b=>b.classList.toggle('on',b.dataset.v===v));
}
function toggleStrength(s,btn){
  const i=evalData.strengths.indexOf(s);
  if(i<0){ evalData.strengths.push(s); btn.classList.add('on'); } else { evalData.strengths.splice(i,1); btn.classList.remove('on'); }
}
function toggleRecommend(s,btn){
  const i=evalData.recommends.indexOf(s);
  if(i<0){
    if(evalData.recommends.length>=3){ toast('الحد الأقصى ٣ توصيات'); return; }
    evalData.recommends.push(s); btn.classList.add('on');
  } else { evalData.recommends.splice(i,1); btn.classList.remove('on'); }
}
function toggleProgram(t,btn){
  const i=evalData.programList.indexOf(t);
  if(i<0){
    if(evalData.programList.length>=2){ toast('تستطيع اختيار خيارين فقط'); return; }
    evalData.programList.push(t); btn.classList.add('on');
  } else { evalData.programList.splice(i,1); btn.classList.remove('on'); }
}
function setGaveRight(v){
  evalData.gaveRight=v;
  $('#rightYes')?.classList.toggle('on', v==='yes');
  $('#rightNo')?.classList.toggle('on', v==='no');
  const wrap=$('#rightReasonWrap'); if(wrap) wrap.style.display = v==='no' ? 'block' : 'none';
  if(v==='yes') evalData.gaveRightReason='';
}
/* حساب النتيجة: متوسط التقييمات (من 3) → نسبة مئوية */
function computeEvalScore(data){
  const vals=Object.values(data.stars||{}).map(Number).filter(n=>n>0);
  if(!vals.length) return { avg:0, pct:0, n:0 };
  const avg=vals.reduce((s,v)=>s+v,0)/vals.length; // من 3
  return { avg:Math.round(avg*100)/100, pct:Math.round(avg/3*100), n:vals.length };
}
function updateEvalScore(){
  const {avg,pct,n}=computeEvalScore(evalData);
  const el=$('#evalScore'), st=$('#evalScoreStars');
  if(!el) return;
  if(!n){ el.textContent='—'; if(st) st.textContent=''; return; }
  const label = pct>=84?'ممتاز':pct>=50?'جيد':'يحتاج تطوير';
  el.textContent=`${pct}%`;
  if(st) st.innerHTML=`<span class="score-label">${label}</span>`;
  const res=$('#evalResult');
  if(res){ res.classList.remove('good','mid','low'); res.classList.add(pct>=80?'good':pct>=50?'mid':'low'); }
}
async function saveRadoodEval(){
  if(!evalData.miqatId){ toast('اختر الميقات'); return; }
  const {avg,pct,n}=computeEvalScore(evalData);
  if(!n){ toast('قيّم بنداً واحداً على الأقل'); return; }
  const mq=miqats.find(x=>x.id===evalData.miqatId);
  const entry={
    id:'ev_'+Date.now(), radoodId:evalRadoodId, miqatId:evalData.miqatId,
    miqatName:mq?mq.name:'', occasion:evalData.occasion||'', duration:evalData.duration||'',
    stars:evalData.stars, program:evalData.program, programList:evalData.programList||[], ambiance:evalData.ambiance,
    strengths:evalData.strengths, recommends:evalData.recommends, notes:evalData.notes||'',
    gaveRight:evalData.gaveRight||'', gaveRightReason:evalData.gaveRightReason||'',
    avg, pct, at:new Date().toISOString()
  };
  radoodEvals.push(entry);
  await saveRadoodEvals();
  toast('تم حفظ التقييم بنجاح');
  closeRadoodEval();
}

/* ═══════════ التقرير الذكي (يُبنى من الدرجات) ═══════════ */
function buildSmartReport(ev){
  const parts=[];
  const st=ev.stars||{};
  const g=(k)=>Number(st[k])||0;
  const avg=ev.avg||0;
  // الافتتاح حسب المستوى العام
  if(avg>=4.5) parts.push('قدّم الرادود أداءً متميّزاً في هذه المناسبة');
  else if(avg>=3.5) parts.push('قدّم الرادود أداءً جيداً بشكل عام');
  else if(avg>=2.5) parts.push('كان أداء الرادود متوسطاً في هذه المناسبة');
  else parts.push('أظهر الأداء عدداً من الجوانب التي تحتاج إلى تطوير');
  // الالتزام
  const commit=(g('attendance')+g('duration'))/2;
  if(commit>=4) parts.push('مع التزام ممتاز بالحضور وإدارة الوقت');
  else if(commit>0 && commit<3) parts.push('مع الحاجة إلى تحسين الالتزام بالوقت');
  // الصوت والأداء
  if(g('voice')>=4 || g('melody')>=4) parts.push('وتميّز بقوة الصوت والتحكّم باللحن');
  // التفاعل
  const eng=(g('audience')+g('response'))/2;
  if(eng>=4) parts.push('وكان تفاعل المعزّين مرتفعاً');
  else if(eng>0 && eng<3) parts.push('ويُنصح برفع مستوى التفاعل مع المعزّين');
  // القصائد
  const poems=(g('selection')+g('suitability')+g('quality'))/3;
  if(poems>0 && poems<3) parts.push('كما يُوصى بتنويع اختيار القصائد وتحسين ملاءمتها للمناسبة');
  else if(poems>=4) parts.push('مع اختيار موفّق للقصائد');
  // المستهل
  if(g('opener')>0 && g('opener')<3) parts.push('ويُنصح بالتركيز على تحسين المستهل');
  // الخلاصة
  let verdict='';
  if(avg>=4.3) verdict='بشكل عام يُعتبر مناسباً للمناسبات الرئيسية.';
  else if(avg>=3.3) verdict='بشكل عام يُعتبر مناسباً للمناسبات الاعتيادية.';
  else if(avg>0) verdict='ويُنصح بمنحه مناسبات أصغر مع المتابعة والتطوير.';
  let report=parts.join('، ')+'. '+verdict;
  return report;
}

/* ═══════════ سجل الرادود ═══════════ */
let recordRadoodId=null;
function openRadoodRecord(id){ recordRadoodId=id; renderRadoodRecord(); openFullPage('radoodrecord'); }
function closeRadoodRecord(){ switchTab('meetings'); openIdara('aza'); }

// ترتيب الرواديد حسب متوسط التقييم
function radoodRanking(){
  const arr=radoods.map(r=>{
    const evs=radoodEvals.filter(e=>e.radoodId===r.id);
    const avg=evs.length ? evs.reduce((s,e)=>s+(e.avg||0),0)/evs.length : 0;
    return { id:r.id, name:r.name, avg, n:evs.length };
  }).filter(x=>x.n>0).sort((a,b)=>b.avg-a.avg);
  return arr;
}
function renderRadoodRecord(){
  const r=radoods.find(x=>x.id===recordRadoodId); if(!r) return;
  const evs=radoodEvals.filter(e=>e.radoodId===recordRadoodId).sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  const host=$('#radoodRecordBody');
  if(!evs.length){
    host.innerHTML=`<div class="panel"><div class="rec-head">
      <div class="eval-avatar">${r.img?`<img src="${r.img}" alt="">`:'🎤'}</div>
      <div class="rec-name">${escapeHtml(r.name)}</div>
    </div>
      <div class="radood-empty"><div class="re-ic">${icon('doc',17,'ico-btn')}</div><div>لا توجد تقييمات لهذا الرادود بعد</div>
        <div style="margin-top:14px;">
          <button class="btn btn-primary btn-sm" onclick="openRadoodEval('${r.id}')">${icon('star',17,'ico-btn')} إضافة تقييم</button>
        </div>
      </div>
      <div class="rec-sec">
        <div class="rec-sec-h">${icon('link',17,'ico-btn')} جلسات التقييم الجماعي</div>
        <button class="btn btn-sm" style="width:100%;background:#25604a;color:#fff;border:none;margin-bottom:10px;" onclick="openEvalLinkDialog('${r.id}')">${icon('plus',17,'ico-btn')} إنشاء رابط تقييم جديد</button>
        <div id="recSessionsList"><div class="eval-link-loading">جارٍ تحميل الجلسات…</div></div>
      </div>
      <div class="rec-sec">
        <div class="rec-sec-h">${icon('doc',17,'ico-btn')} استبيانات الرادود</div>
        <button class="btn btn-sm" style="width:100%;background:#7a5c1e;color:#fff;border:none;margin-bottom:10px;" onclick="openSurveyLinkDialog('${r.id}')">${icon('plus',17,'ico-btn')} إنشاء رابط استبيان جديد</button>
        <div id="recSurveysList"><div class="eval-link-loading">جارٍ تحميل الاستبيانات…</div></div>
      </div>
      <div style="padding:14px 18px;text-align:center;border-top:1px solid var(--line);">
        <button class="btn btn-ghost btn-sm" onclick="closeRadoodRecord()">← رجوع للجنة العزاء</button>
      </div>
    </div>`;
    loadRecordSessions(recordRadoodId);
    return;
  }
  const n=evs.length;
  const avgAll=evs.reduce((s,e)=>s+(e.avg||0),0)/n;
  const pctAll=Math.round(avgAll/3*100);
  const best=[...evs].sort((a,b)=>(b.avg||0)-(a.avg||0))[0];
  const worst=[...evs].sort((a,b)=>(a.avg||0)-(b.avg||0))[0];
  // أعلى تفاعل
  let topEngage=null, topEngageVal=-1;
  evs.forEach(e=>{ const v=((Number(e.stars?.audience)||0)+(Number(e.stars?.response)||0))/2; if(v>topEngageVal){ topEngageVal=v; topEngage=e; } });
  // الترتيب

  // آخر 5
  const last5=evs.slice(0,5);
  // بيانات الرسم (زمنياً تصاعدي)


  host.innerHTML=`
  <div class="panel rec-panel">
    <div class="rec-head">
      <div class="eval-avatar">${r.img?`<img src="${r.img}" alt="">`:'🎤'}</div>
      <div class="rec-name">${escapeHtml(r.name)}</div>
      <button class="btn btn-accent btn-sm" style="margin-top:6px;" onclick="printRadoodProfile('${r.id}')">${icon('print',17,'ico-btn')} طباعة ملف الرادود PDF</button>
      <button class="btn btn-sm" style="margin-top:6px;background:#25604a;color:#fff;border:none;" onclick="openEvalLinkDialog('${r.id}')">${icon('link',17,'ico-btn')} رابط تقييم جماعي</button>
    </div>

    <div class="rec-stats">
      <div class="rec-stat"><div class="rs-v">${n}</div><div class="rs-l">مناسبة</div></div>
      <div class="rec-stat"><div class="rs-v">${pctAll}%</div><div class="rs-l">متوسط التقييم</div></div>
      <div class="rec-stat"><div class="rs-v">${Math.round(avgAll*100)/100}</div><div class="rs-l">من 5</div></div>
    </div>

    <div class="rec-highlights">
      <div class="rec-hl best"><div class="hl-l">${icon('star',17,'ico-btn')} أفضل مناسبة</div><div class="hl-v">${escapeHtml(best.miqatName||'—')}</div><div class="hl-s">${best.pct||Math.round((best.avg||0)*20)}%</div></div>
      <div class="rec-hl low"><div class="hl-l">📉 أقل مناسبة</div><div class="hl-v">${escapeHtml(worst.miqatName||'—')}</div><div class="hl-s">${worst.pct||Math.round((worst.avg||0)*20)}%</div></div>
    </div>
    ${topEngage?`<div class="rec-engage">${icon('star',17,'ico-btn')} أعلى تفاعل: <b>${escapeHtml(topEngage.miqatName||'—')}</b> (${Math.round(topEngageVal*20)}%)</div>`:''}

    <div class="rec-sec">
      <div class="rec-sec-h">🕐 آخر ${last5.length} قراءات</div>
      ${last5.map(e=>{
        const pct=e.pct||Math.round((e.avg||0)*20);
        return `<div class="rec-eval-row" onclick="toggleEvalReport('${e.id}')">
          <div class="rer-body">
            <div class="rer-name">${escapeHtml(e.miqatName||e.occasion||'—')}</div>
            <div class="rer-date">${e.at?new Date(e.at).toLocaleDateString('ar'):''}${e.duration?' · '+escapeHtml(e.duration):''}</div>
          </div>
          <div class="rer-score ${pct>=80?'good':pct>=60?'mid':'low'}">${pct}%</div>
        </div>
        <div class="rer-report" id="report_${e.id}" style="display:none">
          <div class="rer-report-h">${icon('file',17,'ico-btn')} التقرير</div>
          <p>${escapeHtml(buildSmartReport(e))}</p>
          ${e.strengths&&e.strengths.length?`<div class="rer-tags"><b>نقاط القوة:</b> ${e.strengths.map(escapeHtml).join('، ')}</div>`:''}
          ${e.recommends&&e.recommends.length?`<div class="rer-tags"><b>التوصيات:</b> ${e.recommends.map(escapeHtml).join('، ')}</div>`:''}
          ${e.gaveRight?`<div class="rer-tags"><b>أعطى المناسبة حقّها:</b> ${e.gaveRight==='yes'?'نعم ✅':'لا ❌'}${e.gaveRight==='no'&&e.gaveRightReason?' — '+escapeHtml(e.gaveRightReason):''}</div>`:''}
          ${e.notes?`<div class="rer-tags"><b>ملاحظات:</b> ${escapeHtml(e.notes)}</div>`:''}
          <div style="display:flex;gap:8px;margin-top:8px;">
            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();printRadoodMiqatPDF('${e.id}')" style="color:var(--accent);">${icon('print',17,'ico-btn')} طباعة هذه المناسبة</button>
            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();deleteRadoodEval('${e.id}')" style="color:var(--danger);">${icon('trash',17,'ico-btn')} حذف</button>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- جلسات التقييم الجماعي -->
    <div class="rec-sec">
      <div class="rec-sec-h">${icon('link',17,'ico-btn')} جلسات التقييم الجماعي</div>
      <button class="btn btn-sm" style="width:100%;background:#25604a;color:#fff;border:none;margin-bottom:10px;" onclick="openEvalLinkDialog('${r.id}')">${icon('plus',17,'ico-btn')} إنشاء رابط تقييم جديد</button>
      <div id="recSessionsList"><div class="eval-link-loading">جارٍ تحميل الجلسات…</div></div>
    </div>

    <!-- استبيان الرادود -->
    <div class="rec-sec">
      <div class="rec-sec-h">${icon('doc',17,'ico-btn')} استبيانات الرادود</div>
      <button class="btn btn-sm" style="width:100%;background:#7a5c1e;color:#fff;border:none;margin-bottom:10px;" onclick="openSurveyLinkDialog('${r.id}')">${icon('plus',17,'ico-btn')} إنشاء رابط استبيان جديد</button>
      <div id="recSurveysList"><div class="eval-link-loading">جارٍ تحميل الاستبيانات…</div></div>
    </div>

    <div style="padding:16px 18px;text-align:center;">
      <button class="btn btn-ghost" onclick="closeRadoodRecord()">← رجوع للجنة العزاء</button>
    </div>
  </div>`;
  // حمّل الجلسات في صفحة الرادود
  loadRecordSessions(recordRadoodId);
}
function toggleEvalReport(id){
  const el=$('#report_'+id); if(el) el.style.display = el.style.display==='none' ? 'block' : 'none';
}
async function deleteRadoodEval(id){
  if(!confirm('حذف هذا التقييم؟')) return;
  radoodEvals=radoodEvals.filter(e=>e.id!==id);
  await saveRadoodEvals();
  renderRadoodRecord(); renderRadoods();
}
/* رسم بياني SVG بسيط لتطوّر التقييم */
function renderEvalChart(data){
  const W=300, H=120, pad=20;
  const max=100, min=0;
  const n=data.length;
  const stepX=(W-pad*2)/Math.max(1,n-1);
  const y=v=>H-pad-((v-min)/(max-min))*(H-pad*2);
  const pts=data.map((d,i)=>({ x:pad+i*stepX, y:y(d.v), v:d.v }));
  const line=pts.map((p,i)=>`${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area=`${line} L${pts[pts.length-1].x.toFixed(1)},${H-pad} L${pts[0].x.toFixed(1)},${H-pad} Z`;
  return `<svg viewBox="0 0 ${W} ${H}" class="eval-chart" preserveAspectRatio="xMidYMid meet">
    ${[0,25,50,75,100].map(v=>`<line x1="${pad}" y1="${y(v)}" x2="${W-pad}" y2="${y(v)}" stroke="#e6ddcb" stroke-width="1"/>`).join('')}
    <path d="${area}" fill="rgba(28,69,54,.08)"/>
    <path d="${line}" fill="none" stroke="#1c4536" stroke-width="2.5" stroke-linejoin="round"/>
    ${pts.map(p=>`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#c19a3e"/><text x="${p.x.toFixed(1)}" y="${(p.y-9).toFixed(1)}" text-anchor="middle" font-size="10" fill="#1c4536" font-weight="700">${p.v}</text>`).join('')}
  </svg>`;
}

/* عرض قائمة المشاركات */
function renderPartsList(radoodId){
  const list=radoodParticipationList(radoodId);
  if(!list.length) return '<div class="eval-link-note">لا مشاركات مسجّلة بعد.</div>';
  return list.map(p=>{
    const srcs=[...p.sources].join(' · ');
    const btns=[];
    if(p.surveySessionId) btns.push(`<button class="btn btn-sm" style="background:#7a5c1e;color:#fff;border:none;" onclick="viewPartSurvey('${p.surveySessionId}','${escapeHtml(p.miqatName||'')}')">${icon('doc',17,'ico-btn')} الاستبيان</button>`);
    if(p.evalSessionId) btns.push(`<button class="btn btn-sm" style="background:#25604a;color:#fff;border:none;" onclick="viewPartEval('${p.evalSessionId}','${escapeHtml(p.miqatName||'')}')">${icon('star',17,'ico-btn')} التقييم</button>`);
    if(p.manualId){
      btns.push(`<button class="btn btn-sm" onclick="editParticipation('${p.manualId}')">${icon('edit',17,'ico-btn')}</button>`);
      btns.push(`<button class="btn btn-sm" style="background:var(--danger);color:#fff;border:none;" onclick="deleteParticipation('${p.manualId}')">${icon('trash',17,'ico-btn')}</button>`);
    }
    return `<div class="els-row part-row">
      <div class="els-body"><div class="els-name">${escapeHtml(p.miqatName||'—')}</div>
        <div class="els-meta">${escapeHtml(srcs)}</div></div>
      <div class="part-btns">${btns.join('')}</div>
    </div>
    <div id="partRes_${(p.surveySessionId||p.evalSessionId||p.manualId||'x')}" class="rec-session-result" style="display:none;"></div>`;
  }).join('');
}
/* عرض نتائج الاستبيان/التقييم من داخل المشاركة */
async function viewPartSurvey(sessionId, miqatName){
  const box=document.getElementById('partRes_'+sessionId); if(!box) return;
  if(box.style.display==='block'){ box.style.display='none'; return; }
  box.style.display='block'; box.innerHTML='<div class="eval-link-loading">جارٍ جلب الإجابات…</div>';
  try{
    const surveys=await CloudSync.fetchPublicSurveys(sessionId);
    if(!surveys.length){ box.innerHTML='<div class="eval-link-note">لم يصل أي استبيان لهذه المشاركة بعد.</div>'; return; }
    window.__lastSurveys={ sessionId, miqatName, surveys, radoodId:(surveys[0]&&surveys[0].radoodId)||recordRadoodId };
    const genCount={}; surveys.forEach(x=>{ if(x.general) genCount[x.general]=(genCount[x.general]||0)+1; });
    const gen=Object.entries(genCount).map(([k,v])=>`${escapeHtml(k)}: ${v}`).join(' · ')||'—';
    box.innerHTML=`<div class="eval-results-box">
      <div class="erb-h">${icon('doc',17,'ico-btn')} ${surveys.length} استبيان</div>
      <div class="erb-right" style="text-align:right;">التقييم العام: ${gen}</div>
      <div class="erb-actions">
        <button class="btn btn-accent btn-sm" onclick="printSurveyPDF('${sessionId}','${escapeHtml(miqatName)}')">${icon('print',17,'ico-btn')} عرض كامل PDF</button>
      </div></div>`;
  }catch(e){ console.error(e); box.innerHTML='<div class="eval-link-err">تعذّر جلب الإجابات.</div>'; }
}
async function viewPartEval(sessionId, miqatName){
  const box=document.getElementById('partRes_'+sessionId); if(!box) return;
  if(box.style.display==='block'){ box.style.display='none'; return; }
  box.style.display='block'; box.innerHTML='<div class="eval-link-loading">جارٍ جلب النتائج…</div>';
  try{
    const evals=await CloudSync.fetchPublicEvals(sessionId);
    if(!evals.length){ box.innerHTML='<div class="eval-link-note">لم يصل أي تقييم لهذه المشاركة بعد.</div>'; return; }
    const n=evals.length, avg=evals.reduce((s2,e)=>s2+(e.avg||0),0)/n, pct=Math.round(avg/3*100);
    window.__lastGroupEvals={ sessionId, miqatName, evals, avg, pct, n, radoodId:(evals[0]&&evals[0].radoodId)||recordRadoodId };
    const yes=evals.filter(e=>e.gaveRight==='yes').length, no=evals.filter(e=>e.gaveRight==='no').length;
    box.innerHTML=`<div class="eval-results-box">
      <div class="erb-main"><div class="erb-pct">${pct}%</div><div class="erb-sub">${n} مقيّم</div></div>
      <div class="erb-right">أعطى المناسبة حقّها: ${yes} نعم · ${no} لا</div>
      <div class="erb-actions">
        <button class="btn btn-accent btn-sm" onclick="printGroupEvalPDF('${sessionId}','${escapeHtml(miqatName)}')">${icon('print',17,'ico-btn')} عرض كامل PDF</button>
        <button class="btn btn-primary btn-sm" onclick="saveGroupEvalToRecord('${sessionId}','${escapeHtml(miqatName)}')">${icon('download',17,'ico-btn')} حفظ في السجل</button>
      </div></div>`;
  }catch(e){ console.error(e); box.innerHTML='<div class="eval-link-err">تعذّر جلب النتائج.</div>'; }
}
let editingPartId=null;
function openAddParticipation(radoodId){
  editingPartId=null;
  const opts=[...miqats].sort((a,b)=>a.month-b.month||a.day-b.day);
  const sel=prompt('اكتب رقم الميقات:\n\n'+opts.map((mq,i)=>`${i+1}. ${mq.name} (${fmtMiqatDate(mq)})`).join('\n'));
  if(sel===null) return;
  const idx=parseInt(sel,10)-1;
  if(isNaN(idx)||idx<0||idx>=opts.length){ toast('اختيار غير صحيح'); return; }
  const mq=opts[idx];
  radoodParts.push({ id:'rp_'+Date.now(), radoodId, miqatId:mq.id, miqatName:mq.name, note:'', at:new Date().toISOString() });
  saveRadoodParts();
  const r=radoods.find(x=>x.id===radoodId);
  logAudit('إضافة','لجنة العزاء',`مشاركة للرادود «${r?r.name:''}» في «${mq.name}»`);
  toast('سُجّلت المشاركة');
  renderRadoodRecord(); renderRadoods();
}
function editParticipation(partId){
  const p=radoodParts.find(x=>x.id===partId); if(!p) return;
  const opts=[...miqats].sort((a,b)=>a.month-b.month||a.day-b.day);
  const cur=opts.findIndex(m=>m.id===p.miqatId);
  const sel=prompt('غيّر الميقات — اكتب الرقم:\n\n'+opts.map((mq,i)=>`${i+1}. ${mq.name} (${fmtMiqatDate(mq)})`).join('\n'), cur>=0?String(cur+1):'');
  if(sel===null) return;
  const idx=parseInt(sel,10)-1;
  if(isNaN(idx)||idx<0||idx>=opts.length){ toast('اختيار غير صحيح'); return; }
  const mq=opts[idx];
  p.miqatId=mq.id; p.miqatName=mq.name;
  saveRadoodParts();
  logAudit('تعديل','لجنة العزاء',`مشاركة إلى «${mq.name}»`);
  toast('تم التعديل');
  renderRadoodRecord(); renderRadoods();
}
function deleteParticipation(partId){
  const p=radoodParts.find(x=>x.id===partId); if(!p) return;
  if(!confirm(`حذف المشاركة في «${p.miqatName}»؟`)) return;
  radoodParts=radoodParts.filter(x=>x.id!==partId);
  saveRadoodParts();
  logAudit('حذف','لجنة العزاء',`مشاركة في «${p.miqatName}»`);
  renderRadoodRecord(); renderRadoods();
}

/* جلسات التقييم الجماعي داخل صفحة الرادود */
async function loadRecordSessions(radoodId){
  const host=$('#recSessionsList'); if(!host) return;
  if(!window.CloudSync || !CloudSync.isReady){ host.innerHTML='<div class="eval-link-note">سجّل الدخول للسحابة لعرض جلسات التقييم الجماعي.</div>'; return; }
  try{
    const all=await CloudSync.fetchEvalSessions();
    const mine=all.filter(s=>s.radoodId===radoodId);
    if(!mine.length){ host.innerHTML='<div class="eval-link-note">لا توجد جلسات تقييم جماعي بعد. أنشئ رابطاً لبدء جلسة.</div>'; return; }
    host.innerHTML=mine.map(s=>`
      <div class="els-row">
        <div class="els-body"><div class="els-name">${escapeHtml(s.miqatName||'—')}</div>
          <div class="els-meta">${s.at?new Date(s.at).toLocaleDateString('ar'):''} ${s.closed?'· 🔒 مغلقة':'· 🟢 مفتوحة'}</div></div>
        <button class="btn btn-sm" onclick="viewRecordResults('${s._id}','${escapeHtml(s.miqatName||'')}')">${icon('search',17,'ico-btn')} النتائج</button>
        <button class="btn btn-sm" style="background:var(--danger);color:#fff;border:none;" onclick="deleteEvalSessionRec('${s._id}')">${icon('trash',17,'ico-btn')}</button>
      </div>
      <div id="recRes_${s._id}" class="rec-session-result" style="display:none;"></div>`).join('');
  }catch(e){ console.error(e); host.innerHTML='<div class="eval-link-err">تعذّر تحميل الجلسات.</div>'; }
  loadRecordSurveys(radoodId);
}
/* استبيانات الرادود داخل صفحة الرادود */
async function loadRecordSurveys(radoodId){
  const host=$('#recSurveysList'); if(!host) return;
  if(!window.CloudSync || !CloudSync.isReady){ host.innerHTML='<div class="eval-link-note">سجّل الدخول للسحابة لعرض الاستبيانات.</div>'; return; }
  try{
    const all=await Promise.race([
      CloudSync.fetchSurveySessions(),
      new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),12000))
    ]);
    const mine=all.filter(s=>s.radoodId===radoodId);
    if(!mine.length){ host.innerHTML='<div class="eval-link-note">لا توجد استبيانات بعد. أنشئ رابطاً لإرساله للرادود.</div>'; return; }
    host.innerHTML=mine.map(s=>`
      <div class="els-row">
        <div class="els-body"><div class="els-name">${escapeHtml(s.miqatName||'—')}</div>
          <div class="els-meta">${s.at?new Date(s.at).toLocaleDateString('ar'):''} ${s.closed?'· 🔒 مغلق':'· 🟢 مفتوح'}</div></div>
        <button class="btn btn-sm" onclick="viewSurveyResults('${s._id}','${escapeHtml(s.miqatName||'')}')">${icon('search',17,'ico-btn')} الإجابات</button>
        <button class="btn btn-sm" style="background:var(--danger);color:#fff;border:none;" onclick="deleteSurveySession('${s._id}')">${icon('trash',17,'ico-btn')}</button>
      </div>
      <div id="recSurv_${s._id}" class="rec-session-result" style="display:none;"></div>`).join('');
  }catch(e){ console.error('survey load error:',e);
    const msg = e.message==='timeout' ? 'تأخّر الاتصال — تأكد من قواعد Firebase (مجموعة surveySessions) والاتصال.' : 'تعذّر تحميل الاستبيانات. تأكد من نشر قواعد Firebase.';
    host.innerHTML=`<div class="eval-link-err">${msg}</div>`;
  }
}
async function viewRecordResults(sessionId, miqatName){
  const box=$('#recRes_'+sessionId); if(!box) return;
  if(box.style.display==='block'){ box.style.display='none'; return; }
  box.style.display='block';
  box.innerHTML='<div class="eval-link-loading">جارٍ جلب النتائج…</div>';
  try{
    const evals=await CloudSync.fetchPublicEvals(sessionId);
    if(!evals.length){ box.innerHTML='<div class="eval-link-note">لم يصل أي تقييم بعد.</div>'; return; }
    const n=evals.length;
    const avg=evals.reduce((s,e)=>s+(e.avg||0),0)/n;
    const pct=Math.round(avg/3*100);
    const yes=evals.filter(e=>e.gaveRight==='yes').length;
    const no=evals.filter(e=>e.gaveRight==='no').length;
    currentEvalRadoodId=recordRadoodId;
    window.__lastGroupEvals={ sessionId, miqatName, evals, avg, pct, n, radoodId:(evals[0]&&evals[0].radoodId)||recordRadoodId||currentEvalRadoodId };
    box.innerHTML=`
      <div class="eval-results-box">
        <div class="erb-main"><div class="erb-pct">${pct}%</div><div class="erb-sub">${n} مقيّم</div></div>
        <div class="erb-right">أعطى المناسبة حقّها: ${yes} قالوا نعم · ${no} قالوا لا</div>
        <div class="erb-actions">
          <button class="btn btn-primary btn-sm" onclick="saveGroupEvalToRecord('${sessionId}','${escapeHtml(miqatName)}')">${icon('download',17,'ico-btn')} حفظ في السجل</button>
          <button class="btn btn-accent btn-sm" onclick="printGroupEvalPDF('${sessionId}','${escapeHtml(miqatName)}')">${icon('print',17,'ico-btn')} PDF</button>
          <button class="btn btn-sm" style="background:var(--warn);color:#fff;" onclick="toggleEvalSessionRec('${sessionId}')">${icon('lock',17,'ico-btn')} إغلاق</button>
        </div>
      </div>`;
  }catch(e){ console.error(e); box.innerHTML='<div class="eval-link-err">تعذّر جلب النتائج.</div>'; }
}
async function toggleEvalSessionRec(sessionId){
  if(!confirm('إغلاق هذه الجلسة؟ لن يستطيع أحد التقييم بعدها.')) return;
  try{ await CloudSync.setEvalSessionClosed(sessionId, true); toast('أُغلقت الجلسة'); loadRecordSessions(recordRadoodId); }
  catch(e){ toast('تعذّر الإغلاق'); }
}
async function deleteEvalSessionRec(sessionId){
  if(!confirm('حذف هذه الجلسة نهائياً مع كل تقييماتها؟ لا يمكن التراجع.')) return;
  try{ await CloudSync.deleteEvalSession(sessionId); toast('حُذفت الجلسة'); loadRecordSessions(recordRadoodId); }
  catch(e){ console.error(e); toast('تعذّر الحذف'); }
}

/* PDF ملف الرادود الكامل (بصورته + كل مشاركاته) */
function printRadoodProfile(id){
  const r=radoods.find(x=>x.id===id); if(!r) return;
  const evs=radoodEvals.filter(e=>e.radoodId===id).sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  const n=evs.length;
  const avgAll=n?evs.reduce((s,e)=>s+(e.avg||0),0)/n:0;
  const pctAll=Math.round(avgAll*20);
  const parts=radoodParticipations(id);
  const ranking=radoodRanking();
  const rank=ranking.findIndex(x=>x.id===id)+1;
  const best=n?[...evs].sort((a,b)=>(b.avg||0)-(a.avg||0))[0]:null;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>ملف الرادود — ${escapeHtml(r.name)}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>
  *{box-sizing:border-box;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:200px;max-height:76px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:20px;}
  .doc-title{font-family:'Amiri',serif;font-size:22px;font-weight:700;color:#1c4536;margin:10px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:14px;}
  .rp-head{display:flex;align-items:center;gap:20px;margin-bottom:22px;padding:18px;background:#f6f2ea;border-radius:14px;}
  .rp-avatar{width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid #c19a3e;background:#e6f0ea;display:flex;align-items:center;justify-content:center;font-size:40px;}
  .rp-name{font-size:22px;font-weight:800;color:#1c4536;}
  .rp-note{font-size:13px;color:#8a7c6b;margin-top:4px;}
  .rp-stats{display:flex;gap:14px;margin-bottom:24px;}
  .rp-stat{flex:1;text-align:center;border:1px solid #e6ddcb;border-radius:12px;padding:14px;}
  .rp-stat .v{font-size:24px;font-weight:800;color:#1c4536;}
  .rp-stat .l{font-size:12px;color:#8a7c6b;margin-top:3px;}
  h2{font-size:16px;color:#fff;background:#1c4536;display:inline-block;padding:6px 16px 6px 20px;border-radius:0 18px 18px 0;margin:22px 0 12px;}
  table{width:100%;border-collapse:collapse;font-size:14px;}
  th,td{border:1px solid #e6ddcb;padding:9px 12px;text-align:right;}
  th{background:#1c4536;color:#fff;}
  tr:nth-child(even){background:#faf7f0;}
  .foot{margin-top:32px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;} .no-print{display:none;}}
  .no-print{position:fixed;top:12px;left:12px;background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">ملف تقييم الرادود</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · لجنة العزاء · ${hijriToday()}</div></div>
  <div class="rp-head">
    <div class="rp-avatar">${r.img?`<img src="${r.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">`:'🎤'}</div>
    <div><div class="rp-name">${escapeHtml(r.name)}</div>${r.note?`<div class="rp-note">${escapeHtml(r.note)}</div>`:''}</div>
  </div>
  <div class="rp-stats">
    <div class="rp-stat"><div class="v">${parts}</div><div class="l">مشاركة في الهيئة</div></div>
    <div class="rp-stat"><div class="v">${pctAll}%</div><div class="l">التقييم الكلي</div></div>
    <div class="rp-stat"><div class="v">${rank||'—'}</div><div class="l">الترتيب من ${ranking.length}</div></div>
  </div>
  ${best?`<p>🌟 أفضل مناسبة: <b>${escapeHtml(best.miqatName||'—')}</b> بنسبة ${best.pct||Math.round((best.avg||0)*20)}%.</p>`:''}
  <h2>سجل المشاركات (${n})</h2>
  ${n?`<table><tr><th>#</th><th>المناسبة</th><th>التاريخ</th><th>المدة</th><th>التقييم</th><th>أعطى حقّها</th></tr>
    ${evs.map((e,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(e.miqatName||e.occasion||'—')}</td><td>${e.at?new Date(e.at).toLocaleDateString('ar'):''}</td><td>${escapeHtml(e.duration||'—')}</td><td>${e.pct||Math.round((e.avg||0)*20)}%</td><td>${e.gaveRight==='yes'?'نعم':e.gaveRight==='no'?'لا':'—'}</td></tr>`).join('')}
    </table>`:'<p style="color:#8a7c6b">لا مشاركات مسجّلة.</p>'}
  <div class="foot">هيئة محبي الحسين (ع) — لجنة العزاء · ملف تقييم الرادود</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* PDF مناسبة واحدة بتفاصيلها */
function printRadoodMiqatPDF(evalId){
  const e=radoodEvals.find(x=>x.id===evalId); if(!e) return;
  const r=radoods.find(x=>x.id===e.radoodId);
  const pct=e.pct||Math.round((e.avg||0)*20);
  const starRows=EVAL_GROUPS.map(g=>{
    const rows=g.items.filter(([k])=>e.stars&&e.stars[k]).map(([k,label])=>`<tr><td>${label}</td><td>${'★'.repeat(e.stars[k])}${'☆'.repeat(5-e.stars[k])} (${e.stars[k]}/5)</td></tr>`).join('');
    return rows?`<tr class="grp"><td colspan="2">${g.title}</td></tr>${rows}`:'';
  }).join('');
  const prog=(e.programList&&e.programList.length)?e.programList.join(' · '):Object.entries(e.program||{}).filter(([_,v])=>v&&Number(v)>0).map(([k,v])=>`${k}: ${v}%`).join(' · ');
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${escapeHtml(r?r.name:'')} — ${escapeHtml(e.miqatName||'')}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>
  *{box-sizing:border-box;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:190px;max-height:72px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:18px;}
  .doc-title{font-family:'Amiri',serif;font-size:21px;font-weight:700;color:#1c4536;margin:10px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:13px;}
  .mq-info{display:flex;align-items:center;gap:16px;background:#f6f2ea;border-radius:12px;padding:14px;margin-bottom:18px;}
  .mq-avatar{width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid #c19a3e;background:#e6f0ea;display:flex;align-items:center;justify-content:center;font-size:28px;}
  .mq-name{font-size:18px;font-weight:800;color:#1c4536;}
  .mq-occ{font-size:13px;color:#8a7c6b;margin-top:2px;}
  .mq-score{margin-right:auto;text-align:center;}
  .mq-score .v{font-size:28px;font-weight:800;color:${pct>=80?'#2f8f5b':pct>=60?'#b5763a':'#b85c5c'};}
  h2{font-size:15px;color:#fff;background:#1c4536;display:inline-block;padding:5px 14px 5px 18px;border-radius:0 16px 16px 0;margin:18px 0 10px;}
  table{width:100%;border-collapse:collapse;font-size:13.5px;margin-bottom:8px;}
  th,td{border:1px solid #e6ddcb;padding:7px 11px;text-align:right;}
  th{background:#1c4536;color:#fff;}
  tr.grp td{background:#e6f0ea;font-weight:700;color:#1c4536;}
  .box{background:#faf7f0;border:1px solid #e6ddcb;border-radius:10px;padding:12px 14px;margin-bottom:10px;font-size:13.5px;}
  .box b{color:#1c4536;}
  .foot{margin-top:28px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;} .no-print{display:none;}}
  .no-print{position:fixed;top:12px;left:12px;background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">تقييم مناسبة</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · لجنة العزاء · ${hijriToday()}</div></div>
  <div class="mq-info">
    <div class="mq-avatar">${r&&r.img?`<img src="${r.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">`:'🎤'}</div>
    <div><div class="mq-name">${escapeHtml(r?r.name:'')}</div><div class="mq-occ">${escapeHtml(e.miqatName||e.occasion||'')}${e.duration?' · '+escapeHtml(e.duration):''}</div></div>
    <div class="mq-score"><div class="v">${pct}%</div><div style="font-size:11px;color:#8a7c6b;">${e.avg||0}/5</div></div>
  </div>
  <h2>تفاصيل التقييم</h2>
  <table>${starRows}</table>
  ${prog?`<div class="box"><b>نوع البرنامج العام:</b> ${escapeHtml(prog)}</div>`:''}
  ${e.strengths&&e.strengths.length?`<div class="box"><b>نقاط القوة:</b> ${e.strengths.map(escapeHtml).join('، ')}</div>`:''}
  ${e.recommends&&e.recommends.length?`<div class="box"><b>التوصيات:</b> ${e.recommends.map(escapeHtml).join('، ')}</div>`:''}
  <div class="box"><b>هل أعطى المناسبة حقّها؟</b> ${e.gaveRight==='yes'?'نعم':e.gaveRight==='no'?'لا':'—'}${e.gaveRight==='no'&&e.gaveRightReason?' — '+escapeHtml(e.gaveRightReason):''}</div>
  ${e.notes?`<div class="box"><b>ملاحظات:</b> ${escapeHtml(e.notes)}</div>`:''}
  <div class="box"><b>التقرير:</b> ${escapeHtml(buildSmartReport(e))}</div>
  <div class="foot">هيئة محبي الحسين (ع) — لجنة العزاء · تقييم مناسبة</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* ═══════════ رابط التقييم الجماعي ═══════════ */
function evalPageURL(sessionId){
  const base=location.origin + location.pathname.replace(/[^/]*$/, '');
  return base + 'evaluate.html?s=' + sessionId;
}

/* نص رسالة واتساب لاستبيان الرادود */
function surveyWhatsappText(radoodName, miqatName, url){
  return `🌹 السلام عليكم ورحمة الله وبركاته

الأخ الرادود الكريم ${radoodName} حفظكم الله.

نشكر لكم مشاركتكم في إحياء مجلس ${miqatName} ونسأل الله أن يتقبل منكم هذه الخدمة المباركة.

📝 نأمل منكم التكرم *بالإجابة على هذا الاستبيان*، فملاحظاتكم واقتراحاتكم تمثل لنا قيمة كبيرة، وهدفنا منها التطوير المستمر والارتقاء بخدمة الإمام الحسين (ع)، سائلين الله أن يوفقنا جميعًا لما فيه رضا صاحب العصر والزمان (عج).

🔗 رابط الاستبيان:
${url}

🌺 جزاكم الله خير الجزاء، ووفقكم لكل خير.
هيئة محبي الحسين`;
}
function surveyPageURL(sessionId){
  const base=location.origin + location.pathname.replace(/[^/]*$/, '');
  return base + 'survey.html?s=' + sessionId;
}
let currentSurveyRadoodId=null;
function openSurveyLinkDialog(radoodId){
  currentSurveyRadoodId=radoodId;
  const r=radoods.find(x=>x.id===radoodId); if(!r) return;
  const miqatOpts=[...miqats].sort((a,b)=>a.month-b.month||a.day-b.day);
  $('#evalLinkBody').innerHTML=`
    <h3>${icon('doc',17,'ico-btn')} رابط استبيان الرادود</h3>
    <div class="subtitle">لـ <b>${escapeHtml(r.name)}</b> — أنشئ رابطاً يرسله للرادود لتعبئة الاستبيان</div>
    <div class="field full"><label>اختر المناسبة</label>
      <select id="surveyLinkMiqat">
        <option value="">— اختر الميقات —</option>
        ${miqatOpts.map(mq=>`<option value="${mq.id}">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</option>`).join('')}
      </select></div>
    <div class="actions-row">
      <button class="btn btn-primary" onclick="createSurveyLink()">${icon('doc',17,'ico-btn')} إنشاء الرابط</button>
    </div>
    <div id="surveyLinkResult" style="margin-top:14px;"></div>`;
  $('#evalLinkModal').classList.add('open');
}
async function createSurveyLink(){
  if(!window.CloudSync || !CloudSync.isReady){ toast('يجب الاتصال بالسحابة أولاً (سجّل الدخول)'); return; }
  const miqatId=$('#surveyLinkMiqat').value;
  if(!miqatId){ toast('اختر المناسبة'); return; }
  const r=radoods.find(x=>x.id===currentSurveyRadoodId); if(!r) return;
  const mq=miqats.find(x=>x.id===miqatId);
  const res=$('#surveyLinkResult'); res.innerHTML='<div class="eval-link-loading">جارٍ الإنشاء…</div>';
  try{
    const sessionId=await CloudSync.createSurveySession({
      radoodId:r.id, radoodName:r.name, radoodImg:r.img||'', miqatId, miqatName:mq?mq.name:''
    });
    const url=surveyPageURL(sessionId);
    res.innerHTML=`
      <div class="eval-link-box">
        <div class="elb-label">${icon('check',17,'ico-btn')} الرابط جاهز — أرسله للرادود</div>
        <div class="elb-url">${escapeHtml(url)}</div>
        <div class="elb-actions">
          <button class="btn btn-primary btn-sm" onclick="copyEvalLink('${escapeHtml(url)}')">${icon('doc',17,'ico-btn')} نسخ</button>
          <a class="btn btn-sm" style="background:#25d366;color:#fff;" href="https://wa.me/?text=${encodeURIComponent(surveyWhatsappText(r.name, mq?mq.name:'', url))}" target="_blank">${icon('mail',17,'ico-btn')} واتساب</a>
        </div>
      </div>`;
    loadRecordSurveys(currentSurveyRadoodId);
  }catch(e){ console.error(e); res.innerHTML='<div class="eval-link-err">تعذّر إنشاء الرابط.</div>'; }
}
async function viewSurveyResults(sessionId, miqatName){
  const box=$('#recSurv_'+sessionId); if(!box) return;
  if(box.style.display==='block'){ box.style.display='none'; return; }
  box.style.display='block';
  box.innerHTML='<div class="eval-link-loading">جارٍ جلب الإجابات…</div>';
  try{
    const surveys=await CloudSync.fetchPublicSurveys(sessionId);
    if(!surveys.length){ box.innerHTML='<div class="eval-link-note">لم يصل أي استبيان بعد.</div>'; return; }
    window.__lastSurveys={ sessionId, miqatName, surveys, radoodId:(surveys[0]&&surveys[0].radoodId)||recordRadoodId||currentSurveyRadoodId };
    // ملخّص سريع: توزيع التقييم العام + الرغبة بالمشاركة
    const genCount={}; surveys.forEach(s=>{ if(s.general) genCount[s.general]=(genCount[s.general]||0)+1; });
    const genSummary=Object.entries(genCount).map(([k,v])=>`${escapeHtml(k)}: ${v}`).join(' · ')||'—';
    const wantYes=surveys.filter(s=>s.future==='نعم').length;
    const mediaYes=surveys.filter(s=>s.mediaCoord==='نعم').length;
    const clipsYes=surveys.filter(s=>s.mediaClips==='نعم').length;
    let noteCount=0;
    surveys.forEach(s=>{ Object.values(s.texts||{}).forEach(v=>{ if(v&&String(v).trim()) noteCount++; }); (s.golden||[]).forEach(x=>{ if(x&&x.trim()) noteCount++; }); });
    box.innerHTML=`
      <div class="eval-results-box">
        <div class="erb-h">${icon('doc',17,'ico-btn')} ${surveys.length} استبيان وصل</div>
        <div class="erb-right" style="text-align:right;line-height:1.9;">
          <div><b>التقييم العام:</b> ${genSummary}</div>
          <div><b>يرغب بالمشاركة مستقبلاً:</b> ${wantYes} من ${surveys.length}</div>
          <div><b>تم التنسيق إعلامياً:</b> ${mediaYes} من ${surveys.length}</div>
          <div><b>لديه مقاطع يقترح نشرها:</b> ${clipsYes} من ${surveys.length}</div>
          <div><b>عدد الملاحظات المكتوبة:</b> ${noteCount}</div>
        </div>
        <div class="erb-actions">
          <button class="btn btn-accent btn-sm" onclick="printSurveyPDF('${sessionId}','${escapeHtml(miqatName)}')">${icon('print',17,'ico-btn')} عرض كل الإجابات PDF</button>
          <button class="btn btn-sm" style="background:var(--warn);color:#fff;" onclick="toggleSurveySession('${sessionId}')">${icon('lock',17,'ico-btn')} إغلاق</button>
        </div>
      </div>`;
  }catch(e){ console.error(e); box.innerHTML='<div class="eval-link-err">تعذّر جلب الإجابات.</div>'; }
}
async function toggleSurveySession(sessionId){
  if(!confirm('إغلاق هذا الاستبيان؟ لن يستطيع الرادود تعبئته بعدها.')) return;
  try{ await CloudSync.setSurveySessionClosed(sessionId, true); toast('أُغلق الاستبيان'); loadRecordSurveys(currentSurveyRadoodId||recordRadoodId); }
  catch(e){ toast('تعذّر الإغلاق'); }
}
async function deleteSurveySession(sessionId){
  if(!confirm('حذف هذا الاستبيان نهائياً مع كل إجاباته؟ لا يمكن التراجع.')) return;
  try{ await CloudSync.deleteSurveySession(sessionId); toast('حُذف الاستبيان'); loadRecordSurveys(currentSurveyRadoodId||recordRadoodId); }
  catch(e){ console.error(e); toast('تعذّر الحذف'); }
}

let currentEvalRadoodId=null;
function openEvalLinkDialog(radoodId){
  currentEvalRadoodId=radoodId;
  const r=radoods.find(x=>x.id===radoodId); if(!r) return;
  const miqatOpts=[...miqats].sort((a,b)=>a.month-b.month||a.day-b.day);
  $('#evalLinkBody').innerHTML=`
    <h3>${icon('link',17,'ico-btn')} رابط تقييم جماعي</h3>
    <div class="subtitle">لـ <b>${escapeHtml(r.name)}</b> — أنشئ رابطاً يقيّم عبره أي عدد من الأشخاص</div>
    <div class="field full"><label>اختر المناسبة</label>
      <select id="evalLinkMiqat">
        <option value="">— اختر الميقات —</option>
        ${miqatOpts.map(mq=>`<option value="${mq.id}">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</option>`).join('')}
      </select></div>
    <div class="actions-row">
      <button class="btn btn-primary" onclick="createEvalLink()">${icon('link',17,'ico-btn')} إنشاء الرابط</button>
    </div>
    <div id="evalLinkResult" style="margin-top:14px;"></div>`;
  $('#evalLinkModal').classList.add('open');
}
async function createEvalLink(){
  if(!window.CloudSync || !CloudSync.isReady){ toast('يجب الاتصال بالسحابة أولاً (سجّل الدخول)'); return; }
  const miqatId=$('#evalLinkMiqat').value;
  if(!miqatId){ toast('اختر المناسبة'); return; }
  const r=radoods.find(x=>x.id===currentEvalRadoodId); if(!r) return;
  const mq=miqats.find(x=>x.id===miqatId);
  const res=$('#evalLinkResult'); res.innerHTML='<div class="eval-link-loading">جارٍ الإنشاء…</div>';
  try{
    const sessionId=await CloudSync.createEvalSession({
      radoodId:r.id, radoodName:r.name, radoodImg:r.img||'',
      miqatId, miqatName:mq?mq.name:''
    });
    const url=evalPageURL(sessionId);
    res.innerHTML=`
      <div class="eval-link-box">
        <div class="elb-label">${icon('check',17,'ico-btn')} الرابط جاهز — انسخه وأرسله للمقيّمين</div>
        <div class="elb-url" id="elbUrl">${escapeHtml(url)}</div>
        <div class="elb-actions">
          <button class="btn btn-primary btn-sm" onclick="copyEvalLink('${escapeHtml(url)}')">${icon('doc',17,'ico-btn')} نسخ</button>
          <a class="btn btn-sm" style="background:#25d366;color:#fff;" href="https://wa.me/?text=${encodeURIComponent('السلام عليكم، نرجو تقييم قراءة الرادود '+r.name+(mq?' في '+mq.name:'')+' عبر الرابط: '+url)}" target="_blank">${icon('mail',17,'ico-btn')} واتساب</a>
        </div>
      </div>`;
    loadRecordSessions(currentEvalRadoodId);
  }catch(e){ console.error(e); res.innerHTML='<div class="eval-link-err">تعذّر إنشاء الرابط. تأكد من الاتصال.</div>'; }
}
function copyEvalLink(url){
  navigator.clipboard?.writeText(url).then(()=>toast('تم نسخ الرابط')).catch(()=>{
    const t=document.createElement('textarea'); t.value=url; document.body.appendChild(t); t.select();
    try{ document.execCommand('copy'); toast('تم نسخ الرابط'); }catch(_){}
    document.body.removeChild(t);
  });
}
async function loadRadoodSessions(radoodId){
  const host=$('#evalSessionsList'); if(!host) return;
  if(!window.CloudSync || !CloudSync.isReady){ host.innerHTML='<div class="eval-link-note">سجّل الدخول للسحابة لعرض جلسات التقييم ونتائجها.</div>'; return; }
  host.innerHTML='<div class="eval-link-loading">جارٍ تحميل الجلسات…</div>';
  try{
    const all=await CloudSync.fetchEvalSessions();
    const mine=all.filter(s=>s.radoodId===radoodId);
    if(!mine.length){ host.innerHTML='<div class="eval-link-note">لا توجد جلسات تقييم لهذا الرادود بعد.</div>'; return; }
    host.innerHTML=`<div class="els-title">${icon('chart',17,'ico-btn')} جلسات التقييم السابقة</div>`+mine.map(s=>`
      <div class="els-row">
        <div class="els-body"><div class="els-name">${escapeHtml(s.miqatName||'—')}</div>
          <div class="els-meta">${s.at?new Date(s.at).toLocaleDateString('ar'):''} ${s.closed?'· 🔒 مغلقة':'· 🟢 مفتوحة'}</div></div>
        <button class="btn btn-sm" onclick="viewEvalResults('${s._id}','${escapeHtml(s.miqatName||'')}')">${icon('search',17,'ico-btn')} النتائج</button>
      </div>`).join('');
  }catch(e){ console.error(e); host.innerHTML='<div class="eval-link-err">تعذّر تحميل الجلسات.</div>'; }
}
async function viewEvalResults(sessionId, miqatName){
  const res=$('#evalLinkResult');
  res.innerHTML='<div class="eval-link-loading">جارٍ جلب النتائج…</div>';
  try{
    const evals=await CloudSync.fetchPublicEvals(sessionId);
    if(!evals.length){ res.innerHTML='<div class="eval-link-note">لم يصل أي تقييم بعد لهذه الجلسة.</div>'; return; }
    const n=evals.length;
    const avg=evals.reduce((s,e)=>s+(e.avg||0),0)/n;
    const pct=Math.round(avg*20);
    const gaveRightYes=evals.filter(e=>e.gaveRight==='yes').length;
    res.innerHTML=`
      <div class="eval-results-box">
        <div class="erb-h">${icon('chart',17,'ico-btn')} نتائج «${escapeHtml(miqatName)}»</div>
        <div class="erb-main"><div class="erb-pct">${pct}%</div><div class="erb-sub">${n} مقيّم · متوسط ${Math.round(avg*100)/100}/5</div></div>
        <div class="erb-right">أعطى المناسبة حقّها: ${gaveRightYes} من ${n}</div>
        <div class="erb-actions">
          <button class="btn btn-primary btn-sm" onclick="saveGroupEvalToRecord('${sessionId}','${escapeHtml(miqatName)}')">${icon('download',17,'ico-btn')} حفظ في سجل الرادود</button>
          <button class="btn btn-accent btn-sm" onclick="printGroupEvalPDF('${sessionId}','${escapeHtml(miqatName)}')">${icon('print',17,'ico-btn')} PDF</button>
          <button class="btn btn-sm" style="background:var(--warn);color:#fff;" onclick="toggleEvalSession('${sessionId}')">${icon('lock',17,'ico-btn')} إغلاق التقييم</button>
        </div>
      </div>`;
    window.__lastGroupEvals={ sessionId, miqatName, evals, avg, pct, n, radoodId:(evals[0]&&evals[0].radoodId)||recordRadoodId||currentEvalRadoodId };
  }catch(e){ console.error(e); res.innerHTML='<div class="eval-link-err">تعذّر جلب النتائج.</div>'; }
}
async function toggleEvalSession(sessionId){
  if(!confirm('إغلاق هذه الجلسة؟ لن يستطيع أحد التقييم بعدها.')) return;
  try{ await CloudSync.setEvalSessionClosed(sessionId, true); toast('أُغلقت الجلسة'); loadRadoodSessions(currentEvalRadoodId); }
  catch(e){ toast('تعذّر الإغلاق'); }
}
async function saveGroupEvalToRecord(sessionId, miqatName){
  const g=window.__lastGroupEvals; if(!g||g.sessionId!==sessionId) return;
  const r=radoods.find(x=>x.id===currentEvalRadoodId); if(!r) return;
  const starSum={}, starCnt={};
  g.evals.forEach(e=>{ Object.entries(e.stars||{}).forEach(([k,v])=>{ starSum[k]=(starSum[k]||0)+Number(v); starCnt[k]=(starCnt[k]||0)+1; }); });
  const stars={}; Object.keys(starSum).forEach(k=>stars[k]=Math.round(starSum[k]/starCnt[k]));
  const mq=miqats.find(x=>x.name===miqatName);
  const entry={
    id:'ev_'+Date.now(), radoodId:r.id, miqatId:(mq?mq.id:''), miqatName,
    stars, program:{}, ambiance:{}, strengths:[], recommends:[], notes:`تقييم جماعي (${g.n} مقيّم)`,
    gaveRight:'', gaveRightReason:'', avg:Math.round(g.avg*100)/100, pct:g.pct,
    groupCount:g.n, at:new Date().toISOString()
  };
  radoodEvals.push(entry);
  await saveRadoodEvals();
  toast(`حُفظ في سجل الرادود (${g.n} مقيّم)`);
}
function printGroupEvalPDF(sessionId, miqatName){
  const g=window.__lastGroupEvals; if(!g||g.sessionId!==sessionId) return;
  // استخراج الرادود من بيانات التقييم نفسها (أدقّ من المتغيّر العام)
  const rid = g.radoodId || (g.evals[0] && g.evals[0].radoodId) || currentEvalRadoodId || recordRadoodId;
  const r=radoods.find(x=>x.id===rid);
  const gaveRightYes=g.evals.filter(e=>e.gaveRight==='yes').length;
  const gaveRightNo=g.evals.filter(e=>e.gaveRight==='no');
  // كل الملاحظات من كل المقيّمين
  const allNotes=g.evals.map(e=>(e.notes||'').trim()).filter(Boolean);
  const allStrengths=[]; g.evals.forEach(e=>(e.strengths||[]).forEach(s=>allStrengths.push(s)));
  const allRecommends=[]; g.evals.forEach(e=>(e.recommends||[]).forEach(s=>allRecommends.push(s)));
  const countList=(arr)=>{ const m={}; arr.forEach(x=>m[x]=(m[x]||0)+1); return Object.entries(m).sort((a,b)=>b[1]-a[1]); };
  const starSum={}, starCnt={};
  g.evals.forEach(e=>{ Object.entries(e.stars||{}).forEach(([k,v])=>{ starSum[k]=(starSum[k]||0)+Number(v); starCnt[k]=(starCnt[k]||0)+1; }); });
  const starRows=EVAL_GROUPS.map(grp=>{
    const rows=grp.items.filter(([k])=>starCnt[k]).map(([k,label])=>{
      const a=starSum[k]/starCnt[k];
      const lbl = a>=2.5?'ممتاز':a>=1.6?'جيد':'سيء';
      return `<tr><td>${label}</td><td>${lbl} (${Math.round(a/3*100)}%)</td></tr>`;
    }).join('');
    return rows?`<tr class="grp"><td colspan="2">${grp.title}</td></tr>${rows}`:'';
  }).join('');
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>نتيجة التقييم الجماعي</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:190px;max-height:72px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:18px;}
  .doc-title{font-family:'Amiri',serif;font-size:21px;font-weight:700;color:#1c4536;margin:10px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:13px;}
  .g-radood{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:16px;}
  .g-avatar{width:76px;height:76px;border-radius:50%;object-fit:cover;border:3px solid #c19a3e;background:#e6f0ea;display:flex;align-items:center;justify-content:center;font-size:34px;}
  .g-rname{font-size:20px;font-weight:800;color:#1c4536;}
  .g-rocc{font-size:13px;color:#8a7c6b;}
  .g-main{text-align:center;background:#e6f0ea;border-radius:14px;padding:20px;margin-bottom:18px;}
  .g-pct{font-size:40px;font-weight:800;color:#1c4536;}
  .g-sub{font-size:14px;color:#8a7c6b;}
  h2{font-size:15px;color:#fff;background:#1c4536;display:inline-block;padding:5px 14px 5px 18px;border-radius:0 16px 16px 0;margin:16px 0 10px;}
  table{width:100%;border-collapse:collapse;font-size:13.5px;}th,td{border:1px solid #e6ddcb;padding:7px 11px;text-align:right;}th{background:#1c4536;color:#fff;}
  tr.grp td{background:#e6f0ea;font-weight:700;color:#1c4536;}
  .vote-box{display:flex;gap:12px;margin:10px 0;}
  .vote-cell{flex:1;text-align:center;border-radius:12px;padding:14px;}
  .vote-yes{background:#e6f3ea;border:1px solid #2f8f5b;}
  .vote-no{background:#f8ecec;border:1px solid #b85c5c;}
  .vote-n{font-size:26px;font-weight:800;}
  .vote-yes .vote-n{color:#2f8f5b;} .vote-no .vote-n{color:#b85c5c;}
  .vote-l{font-size:12px;color:#8a7c6b;}
  .box{background:#faf7f0;border:1px solid #e6ddcb;border-radius:10px;padding:12px 14px;margin:10px 0;font-size:13.5px;}
  .notes-ul{margin:8px 24px 12px;padding:0;}
  .notes-ul li{margin:6px 0;font-size:13.5px;line-height:1.8;}
  .cnt{color:#8a7c6b;font-size:12px;}
  .foot{margin-top:28px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;} .no-print{display:none;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">نتيجة التقييم الجماعي</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · لجنة العزاء · ${hijriToday()}</div></div>
  <div class="g-radood">
    <div class="g-avatar">${r&&r.img?`<img src="${r.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">`:'🎤'}</div>
    <div><div class="g-rname">${escapeHtml(r?r.name:'')}</div><div class="g-rocc">${escapeHtml(miqatName)}</div></div>
  </div>
  <div class="g-main"><div class="g-pct">${g.pct}%</div><div class="g-sub">${g.n} مقيّم</div></div>
  <h2>متوسط البنود</h2>
  <table>${starRows}</table>
  <h2>هل أعطى المناسبة حقّها؟</h2>
  <div class="vote-box">
    <div class="vote-cell vote-yes"><div class="vote-n">${gaveRightYes}</div><div class="vote-l">قالوا نعم</div></div>
    <div class="vote-cell vote-no"><div class="vote-n">${gaveRightNo.length}</div><div class="vote-l">قالوا لا</div></div>
  </div>
  ${gaveRightNo.length?`<div class="box"><b>أسباب «لا»:</b><ul class="notes-ul">${gaveRightNo.map(e=>escapeHtml(e.gaveRightReason||'')).filter(x=>x).map(x=>`<li>${x}</li>`).join('')||'<li>بلا تفصيل</li>'}</ul></div>`:''}
  ${allStrengths.length?`<h2>أبرز نقاط القوة</h2><ul class="notes-ul">${countList(allStrengths).map(([k,c])=>`<li>${escapeHtml(k)} <span class="cnt">(${c})</span></li>`).join('')}</ul>`:''}
  ${allRecommends.length?`<h2>التوصيات</h2><ul class="notes-ul">${countList(allRecommends).map(([k,c])=>`<li>${escapeHtml(k)} <span class="cnt">(${c})</span></li>`).join('')}</ul>`:''}
  <h2>ملاحظات المقيّمين</h2>
  ${allNotes.length?`<ul class="notes-ul">${allNotes.map(n=>`<li>${escapeHtml(n)}</li>`).join('')}</ul>`:'<div class="box">لم تُسجَّل ملاحظات.</div>'}
  <div class="foot">هيئة محبي الحسين (ع) — لجنة العزاء · التقييم الجماعي</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* PDF إجابات استبيان الرادود */
const SURVEY_MOAZ=[['moaz_opener','سرعة الرد في المستهل'],['moaz_interact','التفاعل أثناء القصائد'],['moaz_help','مساعدة الرادود في الردّات'],['moaz_discipline','الانضباط والالتزام'],['moaz_energy','الحماس العام']];
const SURVEY_ORG=[['org_order','تنظيم المجلس'],['org_time','الالتزام بوقت البداية'],['org_manage','إدارة المجلس'],['org_hospitality','الضيافة والاستقبال']];
function printSurveyPDF(sessionId, miqatName){
  const g=window.__lastSurveys; if(!g||g.sessionId!==sessionId) return;
  // استخراج الرادود من بيانات الاستبيان نفسها (أدقّ من المتغيّر العام)
  const rid = g.radoodId || (g.surveys[0] && g.surveys[0].radoodId) || currentSurveyRadoodId || recordRadoodId;
  const r=radoods.find(x=>x.id===rid);
  const surveys=g.surveys;
  // كل الملاحظات النصية مجمّعة كنقاط
  const noteFields=[['distinct','ما يميّز المجلس'],['improve','يحتاج تطوير'],['sound','ملاحظات الصوتيات'],['wish','يتمنى إضافته'],['ideas','أفكار ومقترحات'],['media','مقاطع مقترحة للنشر'],['other','ملاحظة أخيرة']];
  const allNotes=[];
  surveys.forEach((s,i)=>{
    noteFields.forEach(([k,lbl])=>{
      const v=(s.texts&&s.texts[k]||'').trim();
      if(v) allNotes.push(`<b>${lbl}:</b> ${escapeHtml(v)}`);
    });
    (s.golden||[]).forEach(x=>{ if(x&&x.trim()) allNotes.push(`<b>سؤال ذهبي:</b> ${escapeHtml(x)}`); });
  });
  const block=(s,idx)=>{
    const txt=(v)=>v&&v.trim()?escapeHtml(v):'—';
    const rateRows=(items,obj)=>items.map(([k,l])=>`<tr><td>${l}</td><td>${obj&&obj[k]?escapeHtml(obj[k]):'—'}</td></tr>`).join('');
    return `<div class="s-block">
      <div class="s-block-h">استبيان ${idx+1}${surveys.length>1?` من ${surveys.length}`:''}</div>
      <h3>أولاً: التقييم العام</h3>
      <p><b>المستوى العام:</b> ${s.general?escapeHtml(s.general):'—'}</p>
      <p><b>ما يميّز المجلس:</b> ${txt(s.texts&&s.texts.distinct)}</p>
      <p><b>يحتاج تطوير:</b> ${txt(s.texts&&s.texts.improve)}</p>
      <h3>ثانياً: تقييم المعزّين</h3>
      <table>${rateRows(SURVEY_MOAZ,s.moaz)}</table>
      <h3>ثالثاً: الصوتيات</h3>
      <p><b>التقييم:</b> ${s.sound?escapeHtml(s.sound):'—'}</p>
      <p><b>ملاحظات:</b> ${txt(s.texts&&s.texts.sound)}</p>
      <h3>رابعاً: تنظيم المجلس</h3>
      <table>${rateRows(SURVEY_ORG,s.org)}</table>
      <h3>خامساً: الرؤية المستقبلية</h3>
      <p><b>يتمنى إضافته:</b> ${txt(s.texts&&s.texts.wish)}</p>
      <p><b>أفكار ومقترحات:</b> ${txt(s.texts&&s.texts.ideas)}</p>
      <p><b>الرغبة بالمشاركة مستقبلاً:</b> ${s.future?escapeHtml(s.future):'—'}</p>
      <h3>${icon('news',17,'ico-btn')} أسئلة اللجنة الإعلامية</h3>
      <p><b>هل تم التنسيق معك إعلامياً قبل المجلس؟</b> ${s.mediaCoord?escapeHtml(s.mediaCoord):'—'}</p>
      <p><b>هل لديك مقاطع تقترح نشرها؟</b> ${s.mediaClips?escapeHtml(s.mediaClips):'—'}</p>
      ${(s.texts&&s.texts.media)?`<p><b>تحديد المقاطع:</b> ${escapeHtml(s.texts.media)}</p>`:''}
      <h3>${icon('star',17,'ico-btn')} السؤال الذهبي (أول ٣ أمور للتطوير)</h3>
      ${(s.golden&&s.golden.length)?`<ol>${s.golden.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ol>`:'<p>—</p>'}
      <h3>ملاحظة أخيرة</h3>
      <p>${txt(s.texts&&s.texts.other)}</p>
    </div>`;
  };
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>استبيان الرادود — ${escapeHtml(r?r.name:'')}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.9;font-size:14px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:180px;max-height:68px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:16px;}
  .doc-title{font-family:'Amiri',serif;font-size:21px;font-weight:700;color:#1c4536;margin:8px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:13px;}
  .s-radood{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:16px;}
  .s-avatar{width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid #c19a3e;background:#e6f0ea;display:flex;align-items:center;justify-content:center;font-size:28px;}
  .s-rname{font-size:18px;font-weight:800;color:#1c4536;}
  .s-block{border:1px solid #e6ddcb;border-radius:12px;padding:16px;margin-bottom:18px;}
  .s-block-h{font-weight:800;color:#fff;background:#1c4536;padding:6px 14px;border-radius:8px;display:inline-block;margin-bottom:10px;}
  h3{font-size:14px;color:#1c4536;margin:14px 0 6px;border-right:3px solid #c19a3e;padding-right:8px;}
  p{margin:4px 0;}p b{color:#1c4536;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin:6px 0;}
  th,td{border:1px solid #e6ddcb;padding:6px 10px;text-align:right;}td:last-child{font-weight:600;color:#1c4536;width:120px;}
  ol{margin:6px 22px;}li{margin:3px 0;}
  .notes-ul{margin:8px 24px 12px;padding:0;}
  .notes-ul li{margin:7px 0;font-size:13.5px;line-height:1.8;}
  .notes-ul li b{color:#1c4536;}
  .foot{margin-top:24px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;} .no-print{display:none;} .s-block{page-break-inside:avoid;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">استبيان تطوير المجلس</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · لجنة العزاء · ${hijriToday()}</div></div>
  <div class="s-radood">
    <div class="s-avatar">${r&&r.img?`<img src="${r.img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">`:'🎤'}</div>
    <div><div class="s-rname">${escapeHtml(r?r.name:'')}</div><div style="font-size:13px;color:#8a7c6b;">${escapeHtml(miqatName)}</div></div>
  </div>
  ${surveys.map((s,i)=>block(s,i)).join('')}
  <h2 style="font-size:15px;color:#fff;background:#1c4536;display:inline-block;padding:5px 14px 5px 18px;border-radius:0 16px 16px 0;margin:18px 0 10px;">📝 جميع الملاحظات</h2>
  ${allNotes.length?`<ul class="notes-ul">${allNotes.map(n=>`<li>${n}</li>`).join('')}</ul>`:'<p style="color:#8a7c6b">لم تُسجَّل ملاحظات نصية.</p>'}
  <div class="foot">هيئة محبي الحسين (ع) — لجنة العزاء · استبيان الرادود</div>
  </body></html>`);
  w.document.close(); w.focus();
}


async function enterFinance(){
  const code=prompt('🔒 اللجنة المالية — أدخل الرقم السري:');
  if(code===null) return;
  if(code.trim()!=='1989'){ toast('رقم سري غير صحيح'); return; }
  await logFinanceEntry();
  updateNotifBadge();   // حدّث رقم الجرس فوراً بعد تسجيل الدخول
  openFinancePage('home');
}
/* ═══════════ اللجنة المالية ═══════════ */
const FIN_PAGES=['home','merge','compare','statement','revenue','revMiqat','revEntry','expenses','expMiqat','expMood','expHzn','expEntry','reports','projects','projectAdd','tathwib','tathwibMiqat','tathwibMiqatDetail','tathwibPaid','tathwibReports','soon'];
let finNav=[];   // مكدّس التنقّل للرجوع
function openFinancePage(page, opts, push=true){
  // أخفِ كل تبويبات البرنامج وأظهر صفحة المالية
  $$('.tab[data-tab]').forEach(x=>x.classList.remove('active'));
  $$('.tab-content').forEach(c=>c.style.display='none');
  const host=$('#tab-finance'); if(host) host.style.display='block';
  if(push) finNav.push({page,opts:opts||{}});
  renderFinancePage(page, opts||{});
  window.scrollTo({top:0,behavior:'smooth'});
}
function finBack(){
  finNav.pop();
  const prev=finNav[finNav.length-1];
  if(!prev){ finNav=[]; switchTab('meetings'); idaraHome(); return; }
  renderFinancePage(prev.page, prev.opts);
  window.scrollTo({top:0,behavior:'smooth'});
}
function finMoney(v){ return fmtMoney(Number(v)||0); }
function financeTotalExpenses(){ return (finance.expenses||[]).reduce((s,e)=>s+(Number(e.cost)||0),0); }

function renderFinancePage(page, opts){
  const host=$('#finBody'); if(!host) return;
  opts=opts||{};
  if(page==='home') host.innerHTML=finHomeHTML();
  else if(page==='statement'){ host.innerHTML=finStatementHTML(); }
  else if(page==='merge'){ host.innerHTML=finMergeHTML(); }
  else if(page==='compare'){ host.innerHTML=finCompareHTML(); }
  else if(page==='revenue') host.innerHTML=finRevenueHTML();
  else if(page==='revMiqat') host.innerHTML=finRevMiqatHTML(opts);
  else if(page==='revEntry') host.innerHTML=finRevEntryHTML(opts);
  else if(page==='expenses') host.innerHTML=finExpensesHTML();
  else if(page==='expMiqat') host.innerHTML=finExpMiqatHTML();
  else if(page==='expMood') host.innerHTML=finExpMoodHTML(opts);
  else if(page==='expHzn') host.innerHTML=finExpHznHTML(opts);
  else if(page==='projects'){ host.innerHTML=finProjectsHTML(); loadIncomingProjects(); }
  else if(page==='projectAdd') host.innerHTML=finProjectAddHTML(opts);
  else if(page==='expEntry') host.innerHTML=finExpEntryHTML(opts);
  else if(page==='reports') host.innerHTML=finReportsHTML();
  else if(page==='tathwib') host.innerHTML=finTathwibHTML();
  else if(page==='tathwibMiqat') host.innerHTML=finTathwibMiqatHTML();
  else if(page==='tathwibMiqatDetail') host.innerHTML=finTathwibDetailHTML(opts);
  else if(page==='tathwibPaid'){ host.innerHTML=finTathwibPaidHTML();
    const sel=$('#ptCountry'); if(sel){ sel.innerHTML=countryOptions(''); sel.value='973'; }
    paidThawabNames=['']; ptRenderNames();
  }
  else if(page==='tathwibReports') host.innerHTML=finTathwibReportsHTML();
  else if(page==='tathwibCountList') host.innerHTML=finThawabCountListHTML();
  else if(page==='tathwibAmountList') host.innerHTML=finThawabAmountListHTML();
  else if(page==='soon') host.innerHTML=finSoonHTML(opts);
  // زر الرجوع في الأعلى
  const back=$('#finBackLabel');
  if(back) back.textContent = finNav.length<=1 ? '← الإدارة' : '← رجوع';
}

/* صفحة المبلغ الكلي + زرّي الإيرادات والمصروفات */
function finHomeHTML(){
  return `
  <div class="fin-total-card">
    <div class="fin-total-lbl">المبلغ الكلي لهيئة محبي الحسين</div>
    <div class="fin-total-val">${finMoney(finance.total)}
      <button class="fin-edit" onclick="editFinanceTotal()" title="تعديل">${icon('edit',17,'ico-btn')}</button>
    </div>
  </div>
  <div class="fin-big-btns">
    <button class="fin-big rev" onclick="openFinancePage('revenue')">
      <span class="fb-ic">${icon('download',17,'ico-btn')}</span><span class="fb-t">الإيرادات</span></button>
    <button class="fin-big exp" onclick="openFinancePage('expenses')">
      <span class="fb-ic">${icon('upload',17,'ico-btn')}</span><span class="fb-t">المصروفات</span></button>
  </div>
  <button class="fin-reports-btn" style="background:#2f6f8f;margin-bottom:10px;" onclick="openFinancePage('statement')">
    ${icon('doc',17,'ico-btn')} كشف الحساب (Statement)
  </button>
  <button class="fin-reports-btn" style="background:#7a5c1e;" onclick="copyProjectLink()">
    ${icon('link',17,'ico-btn')} تقديم مشروع للهيئة (نسخ الرابط)
  </button>`;
}
function projectPageURL(){
  const base=location.origin + location.pathname.replace(/[^/]*$/, '');
  return base + 'project.html';
}
function copyProjectLink(){
  const url=projectPageURL();
  const done=()=>toast('تم نسخ رابط تقديم المشروع — أرسله لعضو الإدارة');
  navigator.clipboard?.writeText(url).then(done).catch(()=>{
    const t=document.createElement('textarea'); t.value=url; document.body.appendChild(t); t.select();
    try{ document.execCommand('copy'); done(); }catch(_){}
    document.body.removeChild(t);
  });
}
async function editFinanceTotal(){
  const v=prompt('المبلغ الكلي لهيئة محبي الحسين (د.ب):', finance.total||0);
  if(v===null) return;
  const num=parseFloat(v); if(isNaN(num)){ toast('أدخل رقماً صحيحاً'); return; }
  finance.total=num; await saveFinance(); renderFinancePage('home',{}); toast('تم تحديث المبلغ');
}

/* صفحة الإيرادات */
function finRevenueHTML(){
  const btns=[['المواقيت','miqats'],['التبرعات','donations'],['العضوية','membership'],
    ['حساب الهيئة','account'],['النذور','vows'],['التثويبات','tathwib']];
  return `
  <div class="fin-yearstart">
    <div><div class="fys-lbl">مبلغ بداية العام</div><div class="fys-val">${finMoney(finance.yearStart)}</div></div>
    <button class="fin-edit" onclick="editYearStart()" title="تعديل">${icon('edit',17,'ico-btn')}</button>
  </div>
  <div class="fin-grid">
    ${btns.map(([t,k])=> k==='tathwib'
      ? `<button class="fin-cell" onclick="openFinancePage('tathwib')">${t}</button>`
      : (k==='vows' || k==='donations')
      ? `<button class="fin-cell" onclick="openFinancePage('revMiqat',{kind:'${k==='vows'?'vow':'donation'}'})">${t}</button>`
      : `<button class="fin-cell" onclick="openFinancePage('soon',{title:'${t}'})">${t}</button>`).join('')}
  </div>`;
}
async function editYearStart(){
  const v=prompt('مبلغ بداية العام (د.ب):', finance.yearStart||0);
  if(v===null) return;
  const num=parseFloat(v); if(isNaN(num)){ toast('أدخل رقماً صحيحاً'); return; }
  finance.yearStart=num; await saveFinance(); renderFinancePage('revenue',{}); toast('تم التحديث');
}




/* ═══════════ كشف الحساب (Statement) ═══════════ */
let stmtFilter = { q:'', miqat:'', from:'', to:'' };

function finStatementHTML(){
  let rows=[...(finance.expenses||[])];
  const f=stmtFilter;
  if(f.miqat) rows=rows.filter(e=>e.miqatId===f.miqat);
  if(f.from) rows=rows.filter(e=>(e.date||'')>=f.from);
  if(f.to) rows=rows.filter(e=>(e.date||'')<=f.to);
  if(f.q){ const q=f.q.trim();
    rows=rows.filter(e=>(e.type||'').includes(q)||(e.subType||'').includes(q)||(e.note||'').includes(q)
      ||((miqats.find(m=>m.id===e.miqatId)||{}).name||'').includes(q)); }
  rows.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.at||'').localeCompare(a.at||''));
  const total=rows.reduce((s,e)=>s+(Number(e.cost)||0),0);
  const sorted=miqatsByNearest();
  return `
  <div class="mg-head">
    <div class="mg-t">${icon('doc',18,'ico-btn')} كشف الحساب</div>
    <div class="mg-s">مراجعة كل المصروفات المسجّلة</div>
  </div>
  <div class="stmt-filters">
    <div class="mg-search">${icon('search',16,'ico-btn')}
      <input type="text" id="stmtQ" placeholder="ابحث في البند أو الملاحظة أو الميقات…" value="${escapeHtml(f.q)}" oninput="stmtSet('q',this.value)" /></div>
    <select onchange="stmtSet('miqat',this.value)">
      <option value="">كل المواقيت</option>
      ${sorted.map(mq=>`<option value="${mq.id}" ${f.miqat===mq.id?'selected':''}>${escapeHtml(mq.name)}</option>`).join('')}
    </select>
    <div class="stmt-dates">
      <label>من <input type="date" value="${f.from}" onchange="stmtSet('from',this.value)" /></label>
      <label>إلى <input type="date" value="${f.to}" onchange="stmtSet('to',this.value)" /></label>
    </div>
    ${(f.q||f.miqat||f.from||f.to)?`<button class="btn btn-ghost btn-sm" onclick="stmtReset()">مسح الفلاتر</button>`:''}
  </div>
  <div class="stmt-sum">
    <div class="ss-l">${rows.length} عملية</div>
    <div class="ss-v">${finMoney(total)}</div>
  </div>
  <div class="stmt-list">
    ${rows.length?rows.map(e=>{
      const mq=miqats.find(m=>m.id===e.miqatId);
      return `<div class="stmt-row">
        <div class="sr-body">
          <div class="sr-t">${escapeHtml(e.type||'—')}${e.subType?' — '+escapeHtml(e.subType):''}</div>
          <div class="sr-m">${mq?escapeHtml(mq.name)+' · ':''}${e.date?fmtDate(e.date):'—'}</div>
          ${e.note?`<div class="sr-n">${escapeHtml(e.note)}</div>`:''}
        </div>
        <div class="sr-c">${finMoney(e.cost)}</div>
      </div>`;
    }).join(''):'<div class="fel-empty">لا مصروفات مطابقة</div>'}
  </div>
  ${rows.length?`<button class="btn btn-accent" style="width:100%;margin-top:12px" onclick="printStatement()">
    ${icon('print',17,'ico-btn')} طباعة كشف الحساب</button>`:''}`;
}
function stmtSet(k,v){
  stmtFilter[k]=v;
  const host=$('#finBody'); if(!host) return;
  host.innerHTML=finStatementHTML();
  if(k==='q'){ const i=$('#stmtQ'); if(i){ i.focus(); i.setSelectionRange(i.value.length,i.value.length); } }
}
function stmtReset(){ stmtFilter={q:'',miqat:'',from:'',to:''}; renderFinancePage('statement',{}); }

function printStatement(){
  let rows=[...(finance.expenses||[])];
  const f=stmtFilter;
  if(f.miqat) rows=rows.filter(e=>e.miqatId===f.miqat);
  if(f.from) rows=rows.filter(e=>(e.date||'')>=f.from);
  if(f.to) rows=rows.filter(e=>(e.date||'')<=f.to);
  if(f.q){ const q=f.q.trim();
    rows=rows.filter(e=>(e.type||'').includes(q)||(e.subType||'').includes(q)||(e.note||'').includes(q)
      ||((miqats.find(m=>m.id===e.miqatId)||{}).name||'').includes(q)); }
  rows.sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const total=rows.reduce((s,e)=>s+(Number(e.cost)||0),0);
  const byType={}; rows.forEach(e=>{ byType[e.type]=(byType[e.type]||0)+(Number(e.cost)||0); });
  const typeArr=Object.entries(byType).sort((a,b)=>b[1]-a[1]);
  const mqName=f.miqat?((miqats.find(m=>m.id===f.miqat)||{}).name||''):'';
  const scope=[ mqName?`الميقات: ${mqName}`:'كل المواقيت',
                f.from?`من ${fmtDate(f.from)}`:'', f.to?`إلى ${fmtDate(f.to)}`:'',
                f.q?`بحث: «${f.q}»`:'' ].filter(Boolean).join(' · ');
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>كشف حساب المصروفات</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:30px 34px;color:#1a2620;line-height:1.8;font-size:13.5px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:175px;max-height:66px;}
  .pdf-head{text-align:center;padding-bottom:12px;border-bottom:3px double #c19a3e;margin-bottom:14px;}
  .doc-title{font-family:'Amiri',serif;font-size:21px;font-weight:700;color:#1c4536;margin:8px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:12.5px;}
  .scope{background:#f6f2ea;border-radius:9px;padding:10px 14px;font-size:12.5px;color:#5a5148;margin-bottom:14px;text-align:center;}
  .tot{background:#1c4536;color:#fff;border-radius:12px;padding:16px;text-align:center;margin-bottom:16px;}
  .tot .v{font-size:24px;font-weight:800;} .tot .l{font-size:12px;color:#c19a3e;margin-top:3px;}
  h2{font-size:14px;color:#fff;background:#1c4536;display:inline-block;padding:5px 14px 5px 17px;border-radius:0 15px 15px 0;margin:16px 0 9px;}
  table{width:100%;border-collapse:collapse;font-size:12.5px;margin-bottom:12px;}
  th,td{border:1px solid #e6ddcb;padding:7px 9px;text-align:right;}
  th{background:#1c4536;color:#fff;font-size:12px;}
  tr:nth-child(even){background:#faf7f0;}
  .sum-row td{background:#e6f0ea;font-weight:800;color:#1c4536;}
  .foot{margin-top:24px;padding-top:11px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:20px;} .no-print{display:none;} tr{page-break-inside:avoid;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">كشف حساب المصروفات</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · اللجنة المالية · ${hijriToday()}</div></div>
  <div class="scope">${escapeHtml(scope)}</div>
  <div class="tot"><div class="v">${finMoney(total)}</div><div class="l">إجمالي المصروفات · ${rows.length} عملية</div></div>
  ${typeArr.length?`<h2>حسب النوع</h2>
  <table><tr><th>البند</th><th>المبلغ</th><th>النسبة</th></tr>
    ${typeArr.map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${finMoney(v)}</td><td>${total?Math.round(v/total*100):0}%</td></tr>`).join('')}
    <tr class="sum-row"><td>الإجمالي</td><td>${finMoney(total)}</td><td>100%</td></tr>
  </table>`:''}
  <h2>التفصيل</h2>
  <table><tr><th>#</th><th>التاريخ</th><th>الميقات</th><th>البند</th><th>ملاحظات</th><th>المبلغ</th></tr>
    ${rows.map((e,i)=>{ const mq=miqats.find(m=>m.id===e.miqatId);
      return `<tr><td>${i+1}</td><td>${e.date?fmtDate(e.date):'—'}</td><td>${mq?escapeHtml(mq.name):'—'}</td>
        <td>${escapeHtml(e.type||'—')}${e.subType?' — '+escapeHtml(e.subType):''}</td>
        <td>${e.note?escapeHtml(e.note):'—'}</td><td>${finMoney(e.cost)}</td></tr>`; }).join('')}
    <tr class="sum-row"><td colspan="5">الإجمالي</td><td>${finMoney(total)}</td></tr>
  </table>
  <div class="foot">هيئة محبي الحسين (ع) — كشف حساب المصروفات</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* ═══════════ تقارير مدموجة ═══════════ */
let mergeSel = new Set();
let mergeSearch = '';

/* بيانات مالية موحّدة لميقات (من السنة الحالية أو الأرشيف) */
function miqatFinData(miqatId, arch){
  const src = arch || { miqats, revenues, paidThawab, finance };
  const mq = (src.miqats||[]).find(x=>x.id===miqatId);
  if(!mq) return null;
  const cash = (mq.bookings||[]).reduce((s,b)=>{
    if(Array.isArray(b.rcptItems) && b.rcptItems.length) return s+b.rcptItems.filter(i=>isCashItem(i.kind)).reduce((t,i)=>t+(Number(i.value)||0),0);
    if(b.received!=null && b.received!=='') return s+(Number(b.received)||0);
    if(Array.isArray(b.payments)) return s+b.payments.reduce((t,p)=>t+(Number(p.amount)||0),0);
    return s;
  },0);
  const vows = (src.revenues||[]).filter(r=>r.miqatId===miqatId && r.kind==='vow').reduce((s,r)=>s+(Number(r.amount)||0),0);
  const donations = (src.revenues||[]).filter(r=>r.miqatId===miqatId && r.kind==='donation').reduce((s,r)=>s+(Number(r.amount)||0),0);
  const thawab = (src.paidThawab||[]).filter(t=>t.miqatId===miqatId).reduce((s,t)=>s+(Number(t.amount)||0),0);
  const exps = ((src.finance||{}).expenses||[]).filter(e=>e.miqatId===miqatId);
  const expTotal = exps.reduce((s,e)=>s+(Number(e.cost)||0),0);
  const income = cash+vows+donations+thawab;
  // مساهمات الأعضاء بلا أسماء: النوع + البنود + السعر التقريبي + الملاحظات
  const contribs=[]; let inKindTotal=0;
  (mq.bookings||[]).forEach(b=>{
    const its = Array.isArray(b.rcptItems) ? b.rcptItems : [];
    if(!its.length) return;
    const cashItems = its.filter(i=>isCashItem(i.kind));
    const kindItems = its.filter(i=>!isCashItem(i.kind));
    const type = (cashItems.length && kindItems.length) ? 'نقدي + عيني' : (kindItems.length ? 'عيني' : 'نقدي');
    const names = [...new Set(its.map(i=>i.kind).filter(Boolean))];
    const est = its.reduce((t,i)=>t+(Number(i.value)||0),0);
    inKindTotal += kindItems.reduce((t,i)=>t+(Number(i.value)||0),0);
    const notes = [ ...its.map(i=>(i.note||'').trim()).filter(Boolean), (b.receivedNote||'').trim() ].filter(Boolean);
    contribs.push({ type, items:names, est, note:[...new Set(notes)].join(' · '),
                    kindNames: kindItems.map(i=>i.kind) });
  });
  return { id:miqatId, name:mq.name, date:fmtMiqatDate(mq), cash, vows, donations, thawab, income,
           expTotal, net:income-expTotal, expenses:exps, contribs, inKindTotal };
}
/* جدول المساهمات (بلا أسماء) — مشترك بين التقارير */
function contribTableHTML(allContribs){
  if(!allContribs.length) return '';
  const tot=allContribs.reduce((s,c)=>s+(c.est||0),0);
  const cls=(t)=> t==='نقدي' ? 'cash' : (t==='عيني' ? 'ink' : 'mix');
  return `<h2>مساهمات الأعضاء</h2>
  <table class="contrib-t"><tr><th style="width:15%">نوع المساهمة</th><th style="width:32%">المساهمة</th><th style="width:18%">السعر التقريبي</th><th>ملاحظات</th></tr>
    ${allContribs.map(c=>`<tr>
      <td><span class="kind ${cls(c.type)}">${c.type}</span></td>
      <td>${c.items.map(escapeHtml).join(' + ')}</td>
      <td class="est">${finMoney(c.est)}</td>
      <td>${c.note?escapeHtml(c.note):'—'}</td></tr>`).join('')}
    <tr class="sum-row"><td colspan="2">إجمالي المساهمات</td><td>${finMoney(tot)}</td><td>${allContribs.length} مساهمة</td></tr>
  </table>
  <div class="note-sm">السعر التقريبي للمساهمات العينية تقديري — يُستخدم لتحديد حالة الميقات، ولا يدخل في الرصيد النقدي للهيئة.</div>`;
}
const CONTRIB_CSS = `
  .contrib-t td{vertical-align:top;}
  .kind{font-size:10.5px;padding:2px 8px;border-radius:6px;font-weight:700;white-space:nowrap;display:inline-block;}
  .kind.cash{background:#e6f3ea;color:#2f8f5b;}
  .kind.ink{background:#fbf0e6;color:#b5763a;}
  .kind.mix{background:#eef1f8;color:#4a5f8f;}
  .est{color:#8a7c6b;font-size:11.5px;}
  .note-sm{font-size:11px;color:#8a7c6b;margin:-4px 0 14px;line-height:1.7;}`;
function sumFin(list){
  const z={cash:0,vows:0,donations:0,thawab:0,income:0,expTotal:0,net:0,inKindTotal:0};
  list.forEach(d=>{ if(!d) return; ['cash','vows','donations','thawab','income','expTotal','net','inKindTotal'].forEach(k=>z[k]+=d[k]||0); });
  return z;
}

function finMergeHTML(){
  const q=mergeSearch.trim();
  const list=[...miqats].filter(mq=>!q||(mq.name||'').includes(q)).sort((a,b)=>a.month-b.month||a.day-b.day);
  const selData=[...mergeSel].map(id=>miqatFinData(id)).filter(Boolean);
  const tot=sumFin(selData);
  return `
  <div class="mg-head">
    <div class="mg-t">${icon('doc',18,'ico-btn')} تقارير مدموجة</div>
    <div class="mg-s">اختر المواقيت لدمجها في تقرير واحد</div>
  </div>
  <div class="mg-search">
    ${icon('search',16,'ico-btn')}
    <input type="text" id="mergeQ" placeholder="ابحث عن ميقات…" value="${escapeHtml(mergeSearch)}" oninput="mergeSetSearch(this.value)" />
  </div>
  <div class="mg-selbar">
    <span>محدَّد: <b>${mergeSel.size}</b> ${mergeSel.size===1?'ميقات':'مواقيت'}</span>
    <span class="mg-links">
      <a onclick="mergeSelectAll()">تحديد الكل</a>
      ${mergeSel.size?`<a onclick="mergeClear()">مسح</a>`:''}
    </span>
  </div>
  <div class="mg-list">
    ${list.length?list.map(mq=>{
      const on=mergeSel.has(mq.id);
      const d=miqatFinData(mq.id);
      return `<div class="mg-row ${on?'on':''}" onclick="mergeToggle('${mq.id}')">
        <span class="mg-chk ${on?'on':''}">${on?icon('check',14):''}</span>
        <div class="mg-body">
          <div class="mg-n">${escapeHtml(mq.name)}</div>
          <div class="mg-d">${fmtMiqatDate(mq)}</div>
        </div>
        <div class="mg-v">${finMoney(d?d.income:0)}</div>
      </div>`;
    }).join(''):`<div class="fel-empty">${q?'لا نتائج':'لا مواقيت'}</div>`}
  </div>
  ${mergeSel.size?`
  <div class="mg-sum">
    <div class="mg-s3 inc"><div class="v">${finMoney(tot.income)}</div><div class="l">الإيرادات</div></div>
    <div class="mg-s3 exp"><div class="v">${finMoney(tot.expTotal)}</div><div class="l">المصروفات</div></div>
    <div class="mg-s3 ${tot.net>=0?'net-p':'net-n'}"><div class="v">${finMoney(tot.net)}</div><div class="l">الصافي</div></div>
  </div>
  <button class="btn btn-primary" style="width:100%" onclick="printMergedReport()">${icon('print',17,'ico-btn')} إصدار التقرير المدموج PDF</button>
  `:'<div class="fin-hint">اختر ميقاتاً أو أكثر لعرض المجموع وإصدار التقرير</div>'}`;
}
function mergeSetSearch(v){ mergeSearch=v; const host=$('#finBody'); if(host){ host.innerHTML=finMergeHTML(); const i=$('#mergeQ'); if(i){ i.focus(); i.setSelectionRange(i.value.length,i.value.length); } } }
function mergeToggle(id){ mergeSel.has(id)?mergeSel.delete(id):mergeSel.add(id); renderFinancePage('merge',{}); }
function mergeSelectAll(){ const q=mergeSearch.trim(); miqats.filter(mq=>!q||(mq.name||'').includes(q)).forEach(mq=>mergeSel.add(mq.id)); renderFinancePage('merge',{}); }
function mergeClear(){ mergeSel.clear(); renderFinancePage('merge',{}); }

function printMergedReport(){
  const data=[...mergeSel].map(id=>miqatFinData(id)).filter(Boolean);
  if(!data.length){ toast('اختر ميقاتاً على الأقل'); return; }
  const tot=sumFin(data);
  // تجميع المصروفات حسب النوع
  const byType={};
  data.forEach(d=>d.expenses.forEach(e=>{ byType[e.type]=(byType[e.type]||0)+(Number(e.cost)||0); }));
  const typeArr=Object.entries(byType).sort((a,b)=>b[1]-a[1]);
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>تقرير مدموج — ${data.length} مواقيت</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:32px 36px;color:#1a2620;line-height:1.85;font-size:14px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:180px;max-height:68px;}
  .pdf-head{text-align:center;padding-bottom:13px;border-bottom:3px double #c19a3e;margin-bottom:16px;}
  .doc-title{font-family:'Amiri',serif;font-size:21px;font-weight:700;color:#1c4536;margin:8px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:12.5px;}
  .chips{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-bottom:16px;}
  .chip{background:#eef3ef;border:1px solid #d6e3da;border-radius:20px;padding:5px 13px;font-size:12px;color:#1c4536;}
  .sum3{display:flex;gap:11px;margin-bottom:18px;}
  .s3{flex:1;text-align:center;border-radius:13px;padding:16px 10px;border:1px solid #e6ddcb;}
  .s3 .v{font-size:19px;font-weight:800;} .s3 .l{font-size:11.5px;color:#8a7c6b;margin-top:4px;}
  .s3.inc{background:#e9f4ed;} .s3.inc .v{color:#2f8f5b;}
  .s3.exp{background:#fbf0e6;} .s3.exp .v{color:#b5763a;}
  .s3.np{background:#e6f0ea;} .s3.np .v{color:#1c4536;}
  .s3.nn{background:#f9ecec;} .s3.nn .v{color:#b85c5c;}
  h2{font-size:14.5px;color:#fff;background:#1c4536;display:inline-block;padding:5px 14px 5px 18px;border-radius:0 16px 16px 0;margin:18px 0 9px;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:12px;}
  th,td{border:1px solid #e6ddcb;padding:7px 10px;text-align:right;}
  th{background:#1c4536;color:#fff;font-size:12.5px;}
  tr:nth-child(even){background:#faf7f0;}
  .sum-row td{background:#e6f0ea;font-weight:800;color:#1c4536;}
  .pos{color:#2f8f5b;font-weight:700;} .neg{color:#b85c5c;font-weight:700;}
  ${CONTRIB_CSS}
  .foot{margin-top:26px;padding-top:11px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:22px;} .no-print{display:none;} table{page-break-inside:auto;} tr{page-break-inside:avoid;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">تقرير مالي مدموج</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · اللجنة المالية · ${hijriToday()}</div></div>
  <div class="chips">${data.map(d=>`<span class="chip">${escapeHtml(d.name)}</span>`).join('')}</div>

  <div class="sum3">
    <div class="s3 inc"><div class="v">${finMoney(tot.income)}</div><div class="l">إجمالي الإيرادات</div></div>
    <div class="s3 exp"><div class="v">${finMoney(tot.expTotal)}</div><div class="l">إجمالي المصروفات</div></div>
    <div class="s3 ${tot.net>=0?'np':'nn'}"><div class="v">${finMoney(tot.net)}</div><div class="l">الصافي</div></div>
  </div>

  <h2>الإيرادات المجمّعة</h2>
  <table><tr><th>المصدر</th><th>المبلغ</th><th>النسبة</th></tr>
    <tr><td>مساهمات الأعضاء (نقدي)</td><td>${finMoney(tot.cash)}</td><td>${tot.income?Math.round(tot.cash/tot.income*100):0}%</td></tr>
    <tr><td>النذور</td><td>${finMoney(tot.vows)}</td><td>${tot.income?Math.round(tot.vows/tot.income*100):0}%</td></tr>
    <tr><td>التبرعات</td><td>${finMoney(tot.donations)}</td><td>${tot.income?Math.round(tot.donations/tot.income*100):0}%</td></tr>
    <tr><td>التثويبات المدفوعة</td><td>${finMoney(tot.thawab)}</td><td>${tot.income?Math.round(tot.thawab/tot.income*100):0}%</td></tr>
    <tr class="sum-row"><td>الإجمالي</td><td>${finMoney(tot.income)}</td><td>100%</td></tr>
  </table>

  ${contribTableHTML(data.flatMap(d=>d.contribs||[]))}

  <h2>تفصيل كل ميقات</h2>
  <table><tr><th>الميقات</th><th>التاريخ</th><th>الإيرادات</th><th>المصروفات</th><th>الصافي</th></tr>
    ${data.map(d=>`<tr><td>${escapeHtml(d.name)}</td><td>${d.date}</td><td>${finMoney(d.income)}</td><td>${finMoney(d.expTotal)}</td><td class="${d.net>=0?'pos':'neg'}">${finMoney(d.net)}</td></tr>`).join('')}
    <tr class="sum-row"><td colspan="2">الإجمالي</td><td>${finMoney(tot.income)}</td><td>${finMoney(tot.expTotal)}</td><td>${finMoney(tot.net)}</td></tr>
  </table>

  ${typeArr.length?`<h2>المصروفات حسب النوع</h2>
  <table><tr><th>البند</th><th>المبلغ</th><th>النسبة</th></tr>
    ${typeArr.map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${finMoney(v)}</td><td>${tot.expTotal?Math.round(v/tot.expTotal*100):0}%</td></tr>`).join('')}
    <tr class="sum-row"><td>الإجمالي</td><td>${finMoney(tot.expTotal)}</td><td>100%</td></tr>
  </table>`:''}

  <div class="foot">هيئة محبي الحسين (ع) — تقرير مالي مدموج (${data.length} مواقيت)</div>
  </body></html>`);
  w.document.close(); w.focus();
}


/* ═══════════ مقارنة التقارير ═══════════ */
let cmpA = new Set(), cmpB = new Set();   // معرّفات بصيغة "year|miqatId" (year=0 للسنة الحالية)
let cmpQ = { a:'', b:'' };

function cmpSources(){
  const out=[{ year:0, label:`السنة الحالية ${settings.year||''}`, miqats, revenues, paidThawab, finance }];
  (archives||[]).slice().sort((x,y)=>(y.year||0)-(x.year||0)).forEach(a=>{
    out.push({ year:a.year, label:`أرشيف ${a.year} هـ`, miqats:a.miqats||[], revenues:a.revenues||[], paidThawab:a.paidThawab||[], finance:a.finance||{} });
  });
  return out;
}
function cmpKey(year, id){ return `${year}|${id}`; }
function cmpData(key){
  const [y,id]=key.split('|');
  const src=cmpSources().find(s=>String(s.year)===y);
  if(!src) return null;
  const d=miqatFinData(id, src.year===0?null:src);
  if(d) d.srcLabel=src.label;
  return d;
}
/* السنة المفتوحة في كل مجموعة (لاختصار القائمة) */
let cmpOpenSrc = { a:null, b:null };
function cmpGroupHTML(which){
  const sel = which==='a'?cmpA:cmpB;
  const q=(cmpQ[which]||'').trim();
  const srcs=cmpSources();
  if(cmpOpenSrc[which]===null && srcs.length) cmpOpenSrc[which]=srcs[0].year;
  const openY = cmpOpenSrc[which];
  const searching = q.length>0;
  return `
  <div class="cmp-search">
    ${icon('search',15,'ico-btn')}
    <input type="text" id="cmpQ${which}" placeholder="ابحث في كل السنوات…" value="${escapeHtml(q)}" oninput="cmpSetQ('${which}',this.value)" />
    ${q?`<span class="cmp-clr" onclick="cmpSetQ('${which}','')">×</span>`:''}
  </div>

  ${!searching?`<div class="cmp-years">
    ${srcs.map(src=>{
      const n=[...sel].filter(k=>k.startsWith(src.year+'|')).length;
      return `<button class="cmp-y ${src.year===openY?'on':''}" onclick="cmpOpenYear('${which}',${src.year})">
        ${src.year===0?`${settings.year||''} <small>(الحالية)</small>`:`${src.year} هـ`}${n?`<i>${n}</i>`:''}
      </button>`;
    }).join('')}
  </div>`:''}

  ${srcs.map(src=>{
    if(!searching && src.year!==openY) return '';
    const list=(src.miqats||[]).filter(mq=>!q||(mq.name||'').includes(q)).sort((a,b)=>a.month-b.month||a.day-b.day);
    if(!list.length) return searching?'':'<div class="fel-empty">لا مواقيت في هذه السنة</div>';
    const cnt=list.filter(mq=>sel.has(cmpKey(src.year,mq.id))).length;
    return `<div class="cmp-src">
      ${searching?`<div class="cmp-src-h"><span>${escapeHtml(src.label)}</span>${cnt?`<b>${cnt} محدَّد</b>`:''}</div>`:''}
      ${list.map(mq=>{
        const k=cmpKey(src.year,mq.id), on=sel.has(k);
        return `<div class="cmp-row ${on?'on':''}" onclick="cmpToggle('${which}','${k}')">
          <span class="mg-chk ${on?'on':''}">${on?icon('check',13):''}</span>
          <span class="cmp-n">${escapeHtml(mq.name)}</span>
          <span class="cmp-d">${fmtMiqatDate(mq)}</span>
        </div>`;
      }).join('')}
    </div>`;
  }).join('') || '<div class="fel-empty">لا نتائج للبحث</div>'}

  ${sel.size?`<div class="cmp-picked">
    <span>المحدَّد:</span>
    ${[...sel].map(k=>{ const d=cmpData(k); if(!d) return '';
      return `<span class="cmp-tag" onclick="cmpToggle('${which}','${k}')">${escapeHtml(d.name)} <i>${d.srcLabel.replace('السنة الحالية','')}</i> ×</span>`;
    }).join('')}
  </div>`:''}`;
}
/* طيّ/فتح المجموعة */
let cmpOpen = { a:true, b:true };
function cmpToggleGroup(w){ cmpOpen[w]=!cmpOpen[w]; renderFinancePage('compare',{}); }
/* ملخّص مختصر يظهر عند الطيّ */
function cmpSummaryHTML(which){
  const sel = which==='a'?cmpA:cmpB;
  if(!sel.size) return '<div class="cmp-empty">مطويّة — اضغط لفتح القائمة والاختيار</div>';
  const data=[...sel].map(cmpData).filter(Boolean);
  const t=sumFin(data);
  return `<div class="cmp-collapsed">
    <div class="cc-tags">${data.map(d=>`<span class="cmp-tag">${escapeHtml(d.name)} <i>${d.srcLabel.replace('السنة الحالية','')}</i></span>`).join('')}</div>
    <div class="cc-sum"><span>الإيرادات: <b>${finMoney(t.income)}</b></span><span>المصروفات: <b>${finMoney(t.expTotal)}</b></span></div>
  </div>`;
}
function cmpOpenYear(which, year){ cmpOpenSrc[which]=year; renderFinancePage('compare',{}); }
function finCompareHTML(){
  const a=[...cmpA].map(cmpData).filter(Boolean), b=[...cmpB].map(cmpData).filter(Boolean);
  const ta=sumFin(a), tb=sumFin(b);
  return `
  <div class="mg-head">
    <div class="mg-t">${icon('chart',18,'ico-btn')} مقارنة التقارير</div>
    <div class="mg-s">قارن بين مواقيت السنة الحالية والأرشيف</div>
  </div>
  <div class="cmp-grp ga ${cmpOpen.a?'':'collapsed'}">
    <div class="cmp-grp-h" onclick="cmpToggleGroup('a')">
      <span class="cgh-t">◤ المجموعة الأولى ${cmpA.size?`<b>${cmpA.size}</b>`:''}</span>
      <span class="cgh-arrow">${icon('chevron',18)}</span>
    </div>
    ${cmpOpen.a?cmpGroupHTML('a'):cmpSummaryHTML('a')}
  </div>
  <div class="cmp-vs">— مقابل —</div>
  <div class="cmp-grp gb ${cmpOpen.b?'':'collapsed'}">
    <div class="cmp-grp-h" onclick="cmpToggleGroup('b')">
      <span class="cgh-t">◤ المجموعة الثانية ${cmpB.size?`<b>${cmpB.size}</b>`:''}</span>
      <span class="cgh-arrow">${icon('chevron',18)}</span>
    </div>
    ${cmpOpen.b?cmpGroupHTML('b'):cmpSummaryHTML('b')}
  </div>
  ${(a.length&&b.length)?`
  <div class="cmp-quick">
    <div class="cq a"><div class="v">${finMoney(ta.income)}</div><div class="l">إيرادات الأولى</div></div>
    <div class="cq b"><div class="v">${finMoney(tb.income)}</div><div class="l">إيرادات الثانية</div></div>
  </div>
  <button class="btn" style="width:100%;background:#8a5a9f;color:#fff;border:none" onclick="printCompareReport()">${icon('print',17,'ico-btn')} إصدار تقرير المقارنة PDF</button>
  `:'<div class="fin-hint">اختر مواقيت في المجموعتين لبدء المقارنة</div>'}`;
}
function cmpSetQ(w,v){ cmpQ[w]=v; const host=$('#finBody'); if(host){ host.innerHTML=finCompareHTML(); const i=$('#cmpQ'+w); if(i){ i.focus(); i.setSelectionRange(i.value.length,i.value.length); } } }
function cmpToggle(w,k){ const s=w==='a'?cmpA:cmpB; s.has(k)?s.delete(k):s.add(k); renderFinancePage('compare',{}); }

function printCompareReport(){
  const A=[...cmpA].map(cmpData).filter(Boolean), B=[...cmpB].map(cmpData).filter(Boolean);
  if(!A.length||!B.length){ toast('اختر مواقيت في المجموعتين'); return; }
  const ta=sumFin(A), tb=sumFin(B);
  const rows=[['مساهمات الأعضاء','cash'],['النذور','vows'],['التبرعات','donations'],['التثويبات','thawab'],
              ['إجمالي الإيرادات','income'],['إجمالي المصروفات','expTotal'],['الصافي','net']];
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>تقرير مقارنة مالية</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:30px 34px;color:#1a2620;line-height:1.8;font-size:13.5px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:175px;max-height:66px;}
  .pdf-head{text-align:center;padding-bottom:12px;border-bottom:3px double #c19a3e;margin-bottom:15px;}
  .doc-title{font-family:'Amiri',serif;font-size:21px;font-weight:700;color:#1c4536;margin:8px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:12.5px;}
  .legend{display:flex;gap:10px;margin-bottom:16px;}
  .lg{flex:1;border-radius:11px;padding:12px 14px;border:2px solid;}
  .lg.a{background:#eaf4ee;border-color:#2f8f5b;} .lg.b{background:#f3ecf7;border-color:#8a5a9f;}
  .lg .n{font-size:12.5px;font-weight:700;margin-bottom:5px;}
  .lg.a .n{color:#2f8f5b;} .lg.b .n{color:#8a5a9f;}
  .lg .i{font-size:11.5px;color:#5a5148;line-height:1.7;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:14px;}
  th,td{border:1px solid #e6ddcb;padding:8px 10px;text-align:right;}
  th{background:#1c4536;color:#fff;font-size:12.5px;}
  th.ca{background:#2f8f5b;} th.cb{background:#8a5a9f;}
  td.ca{background:#f3faf6;font-weight:700;color:#2f8f5b;}
  td.cb{background:#faf6fc;font-weight:700;color:#8a5a9f;}
  .up{color:#2f8f5b;font-weight:700;} .down{color:#b85c5c;font-weight:700;}
  .bar{display:flex;height:20px;border-radius:6px;overflow:hidden;margin:3px 0;}
  .bar .pa{background:#2f8f5b;} .bar .pb{background:#8a5a9f;}
  ${CONTRIB_CSS}
  h2{font-size:14px;color:#fff;background:#1c4536;display:inline-block;padding:5px 14px 5px 17px;border-radius:0 15px 15px 0;margin:16px 0 9px;}
  .foot{margin-top:24px;padding-top:11px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:20px;} .no-print{display:none;} tr{page-break-inside:avoid;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">تقرير مقارنة مالية</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · اللجنة المالية · ${hijriToday()}</div></div>

  <div class="legend">
    <div class="lg a"><div class="n">◤ المجموعة الأولى</div>
      <div class="i">${A.map(d=>escapeHtml(d.name)).join(' · ')}<br><span style="opacity:.75">${[...new Set(A.map(d=>d.srcLabel))].join(' · ')}</span></div></div>
    <div class="lg b"><div class="n">◤ المجموعة الثانية</div>
      <div class="i">${B.map(d=>escapeHtml(d.name)).join(' · ')}<br><span style="opacity:.75">${[...new Set(B.map(d=>d.srcLabel))].join(' · ')}</span></div></div>
  </div>

  <h2>المقارنة التفصيلية</h2>
  <table><tr><th>البند</th><th class="ca">المجموعة الأولى</th><th class="cb">المجموعة الثانية</th><th>الفرق</th><th>النسبة</th></tr>
    ${rows.map(([lbl,k])=>{
      const va=ta[k]||0, vb=tb[k]||0, d=va-vb;
      const pct = vb ? Math.round(d/Math.abs(vb)*100) : (va?100:0);
      const cls = d>=0?'up':'down';
      const bold = (k==='income'||k==='expTotal'||k==='net') ? ' style="background:#f6f2ea;font-weight:800"' : '';
      return `<tr${bold}><td>${lbl}</td><td class="ca">${finMoney(va)}</td><td class="cb">${finMoney(vb)}</td>
        <td class="${cls}">${d>=0?'+':''}${finMoney(d)}</td><td class="${cls}">${pct>=0?'+':''}${pct}%</td></tr>`;
    }).join('')}
  </table>

  <h2>التمثيل البصري</h2>
  <table><tr><th style="width:30%">البند</th><th>المقارنة</th></tr>
    ${rows.slice(0,5).map(([lbl,k])=>{
      const va=Math.max(0,ta[k]||0), vb=Math.max(0,tb[k]||0), s=va+vb;
      const pa=s?Math.round(va/s*100):50;
      return `<tr><td>${lbl}</td><td>
        <div class="bar"><div class="pa" style="width:${pa}%"></div><div class="pb" style="width:${100-pa}%"></div></div>
        <span style="font-size:11px;color:#8a7c6b">${finMoney(va)} مقابل ${finMoney(vb)}</span></td></tr>`;
    }).join('')}
  </table>

  ${(()=>{ const ca=A.flatMap(d=>d.contribs||[]), cb=B.flatMap(d=>d.contribs||[]);
    if(!ca.length && !cb.length) return '';
    const kA=ca.filter(c=>c.type!=='نقدي'), kB=cb.filter(c=>c.type!=='نقدي');
    const eA=kA.reduce((s,c)=>s+(c.est||0),0), eB=kB.reduce((s,c)=>s+(c.est||0),0);
    const nA=[...new Set(kA.flatMap(c=>c.kindNames||[]))], nB=[...new Set(kB.flatMap(c=>c.kindNames||[]))];
    const d1=kA.length-kB.length, d2=eA-eB;
    return `<h2>المساهمات العينية</h2>
    <table><tr><th>البند</th><th class="ca">المجموعة الأولى</th><th class="cb">المجموعة الثانية</th><th>الفرق</th></tr>
      <tr><td>عدد المساهمات العينية</td><td class="ca">${kA.length}</td><td class="cb">${kB.length}</td><td class="${d1>=0?'up':'down'}">${d1>=0?'+':''}${d1}</td></tr>
      <tr><td>السعر التقريبي الإجمالي</td><td class="ca">${finMoney(eA)}</td><td class="cb">${finMoney(eB)}</td><td class="${d2>=0?'up':'down'}">${d2>=0?'+':''}${finMoney(d2)}</td></tr>
      <tr class="sum-row"><td>البنود المغطّاة</td><td colspan="3" style="background:#fdfbf7;font-weight:400;text-align:right">
        <b style="color:#2f8f5b">الأولى:</b> ${nA.length?nA.map(escapeHtml).join(' · '):'—'}<br>
        <b style="color:#8a5a9f">الثانية:</b> ${nB.length?nB.map(escapeHtml).join(' · '):'—'}</td></tr>
    </table>
    <div class="note-sm">لا تُذكر أسماء المساهمين — يُكتفى بنوع المساهمة وبنودها وسعرها التقريبي.</div>
    ${contribTableHTML([...ca.map(c=>({...c,g:'الأولى'})), ...cb.map(c=>({...c,g:'الثانية'}))])}`;
  })()}

  <h2>تفصيل المواقيت</h2>
  <table><tr><th>المجموعة</th><th>الميقات</th><th>المصدر</th><th>الإيرادات</th><th>المصروفات</th><th>الصافي</th></tr>
    ${A.map(d=>`<tr><td class="ca">الأولى</td><td>${escapeHtml(d.name)}</td><td>${escapeHtml(d.srcLabel||'')}</td><td>${finMoney(d.income)}</td><td>${finMoney(d.expTotal)}</td><td>${finMoney(d.net)}</td></tr>`).join('')}
    ${B.map(d=>`<tr><td class="cb">الثانية</td><td>${escapeHtml(d.name)}</td><td>${escapeHtml(d.srcLabel||'')}</td><td>${finMoney(d.income)}</td><td>${finMoney(d.expTotal)}</td><td>${finMoney(d.net)}</td></tr>`).join('')}
  </table>

  <div class="foot">هيئة محبي الحسين (ع) — تقرير مقارنة مالية</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* ═══════════ إيرادات المواقيت: النذور والتبرعات ═══════════ */
const REV_KINDS = { vow:{ label:'النذور', person:'اسم صاحب النذر', ico:'gift' },
                    donation:{ label:'التبرعات', person:'اسم المتبرّع', ico:'money' } };

/* اختيار الميقات */
function finRevMiqatHTML(opts){
  const kind=opts.kind||'vow';
  const K=REV_KINDS[kind];
  const sorted=miqatsByNearest();
  return `
  <div class="fin-ctx">${K.label} — اختر الميقات</div>
  <div class="fin-field">
    <label>الميقات</label>
    <select id="revMiqatSel" onchange="finRevGo('${kind}')">
      <option value="">— اختر ميقاتاً —</option>
      ${sorted.map(mq=>{
        const t=revMiqatTotal(mq.id, kind);
        return `<option value="${mq.id}">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})${t?` — ${finMoney(t)}`:''}</option>`;
      }).join('')}
    </select>
  </div>
  <div class="fin-hint">اختر الميقات لتسجيل ${K.label} الخاصة به</div>`;
}
function finRevGo(kind){
  const miqatId=$('#revMiqatSel').value; if(!miqatId) return;
  openFinancePage('revEntry',{kind,miqatId});
}

/* صفحة إدخال النذور/التبرعات */
function finRevEntryHTML(opts){
  const kind=opts.kind||'vow', K=REV_KINDS[kind];
  const mq=miqats.find(x=>x.id===opts.miqatId);
  const rows=revenues.filter(r=>r.miqatId===opts.miqatId && r.kind===kind)
    .sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  const total=rows.reduce((s,r)=>s+(Number(r.amount)||0),0);
  return `
  <div class="fin-ctx">${escapeHtml(mq?mq.name:'')} — ${K.label}</div>
  <div class="fin-add-exp">
    <div class="fin-field"><label>${K.person}</label>
      <input id="revName" type="text" placeholder="${K.person}" /></div>
    <div class="fin-field"><label>المبلغ (د.ب)</label>
      <input id="revAmount" type="number" min="0" step="0.001" placeholder="0.000" /></div>
    <div class="fin-field"><label>التاريخ</label>
      <input id="revDate" type="date" value="${today()}" /></div>
    <div class="fin-field"><label>ملاحظة <span class="opt">اختياري</span></label>
      <input id="revNote" type="text" placeholder="ملاحظة" /></div>
    <button class="btn btn-primary" onclick="addRevenue('${kind}','${opts.miqatId}')">${icon('plus',17,'ico-btn')} إضافة</button>
  </div>
  <div class="fin-exp-list">
    <div class="fel-head"><span>${K.label} المسجّلة</span><b>الإجمالي: ${finMoney(total)}</b></div>
    ${rows.length?rows.map(r=>`<div class="fel-item">
      <div><div class="fel-type">${escapeHtml(r.name||'—')}</div>
        <div class="fel-meta">${r.date?fmtDate(r.date):''}${r.note?' · '+escapeHtml(r.note):''}</div></div>
      <div class="fel-cost">${finMoney(r.amount)}<button class="fel-del" onclick="deleteRevenue('${r.id}')">×</button></div>
    </div>`).join(''):`<div class="fel-empty">لا توجد ${K.label} بعد</div>`}
  </div>`;
}
async function addRevenue(kind, miqatId){
  const name=$('#revName').value.trim();
  const amount=parseFloat($('#revAmount').value);
  if(!name){ toast('أدخل الاسم'); return; }
  if(isNaN(amount)||amount<=0){ toast('أدخل مبلغاً صحيحاً'); return; }
  revenues.push({ id:'rv_'+Date.now(), kind, miqatId, name,
    amount, note:$('#revNote').value.trim(), date:$('#revDate').value||today(), at:new Date().toISOString() });
  await saveRevenues();
  const mq=miqats.find(x=>x.id===miqatId);
  logAudit('إضافة','المالية',`${REV_KINDS[kind].label}: ${name} بمبلغ ${finMoney(amount)} — ${mq?mq.name:''}`);
  toast('تمت الإضافة');
  renderFinancePage('revEntry',{kind,miqatId});
}
async function deleteRevenue(id){
  const r=revenues.find(x=>x.id===id); if(!r) return;
  if(!confirm(`حذف «${r.name}» بمبلغ ${finMoney(r.amount)}؟`)) return;
  revenues=revenues.filter(x=>x.id!==id);
  await saveRevenues();
  logAudit('حذف','المالية',`${REV_KINDS[r.kind].label}: ${r.name}`);
  const cur=finNav[finNav.length-1];
  renderFinancePage(cur.page, cur.opts);
}

/* ═══ فترة تسجيل المصروفات ═══ */
function miqatExpPeriod(miqatId, kind, mood){
  const rows=(finance.expenses||[]).filter(e=>e.miqatId===miqatId && e.kind===kind && e.mood===mood);
  if(!rows.length) return { first:'', last:'' };
  const ats=rows.map(e=>e.at||'').filter(Boolean).sort();
  const toDate=(iso)=>iso?iso.slice(0,10):'';
  return { first: toDate(ats[0]), last: toDate(ats[ats.length-1]) };
}
function miqatCloseKey(miqatId, kind, mood){ return `${miqatId}|${kind}|${mood}`; }
function isMiqatClosed(miqatId, kind, mood){
  finance.closedMiqats = finance.closedMiqats || {};
  return finance.closedMiqats[miqatCloseKey(miqatId,kind,mood)] || '';
}
async function toggleMiqatClosed(opts){
  finance.closedMiqats = finance.closedMiqats || {};
  const key=miqatCloseKey(opts.miqatId, opts.kind, opts.mood);
  const mq=miqats.find(x=>x.id===opts.miqatId);
  if(finance.closedMiqats[key]){
    if(!confirm('إلغاء إنهاء المناسبة؟')) return;
    delete finance.closedMiqats[key];
    logAudit('تعديل','المالية',`أُلغي إنهاء مناسبة «${mq?mq.name:''}»`);
    toast('أُلغي الإنهاء');
  } else {
    const pendingMeals=(finance.expenses||[]).filter(e=>e.miqatId===opts.miqatId&&e.kind===opts.kind&&e.mood===opts.mood&&e.meal&&!e.meal.result).length;
    if(pendingMeals && !confirm(`توجد ${pendingMeals} وجبة لم تُسجّل نتيجتها بعد (زادت / كفت / نقصت).\n\nهل تريد إنهاء المناسبة على أي حال؟`)) return;
    if(!confirm(`تسجيل انتهاء المناسبة اليوم؟\n\nيبقى بإمكانك تعديل المصروفات بعدها.`)) return;
    finance.closedMiqats[key]=today();
    logAudit('تعديل','المالية',`انتهت مناسبة «${mq?mq.name:''}»`);
    toast('سُجّل انتهاء المناسبة');
  }
  await saveFinance();
  renderFinancePage('expEntry', opts);
}

/* ═══ حساب إيرادات الميقات ═══ */
function revMiqatTotal(miqatId, kind){
  return revenues.filter(r=>r.miqatId===miqatId && (!kind || r.kind===kind))
    .reduce((s,r)=>s+(Number(r.amount)||0),0);
}
/* المستلم من مساهمات الأعضاء (هذا وحده يحدّد حالة الميقات) */
function miqatMembersReceived(miqatId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return 0;
  return (mq.bookings||[]).reduce((s,b)=>s+bookingCash(b),0);   // النقدي فقط (العيني لا يدخل الصندوق)
}
/* مساهمات عينية: أسماء البنود بلا مبالغ — للتقرير */
function miqatInKindList(miqatId){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return [];
  const out=[];
  (mq.bookings||[]).forEach(b=>{
    const names=receiptItems(b).map(i=>i.kind).filter(k=>k && !isCashItem(k));
    const cashNames=receiptItems(b).filter(i=>isCashItem(i.kind)).length ? ['مبلغ نقدي'] : [];
    const all=[...new Set([...cashNames,...names])];
    if(!all.length) return;
    const who = b.familyName || (members.find(m=>m.id===b.memberId)?.name) || '—';
    out.push({ who, items:all, note:(b.receivedNote||'').trim() });
  });
  return out;
}
/* التثويبات المدفوعة للميقات */
function miqatThawabTotal(miqatId){
  return (paidThawab||[]).filter(t=>t.miqatId===miqatId)
    .reduce((s,t)=>s+(Number(t.amount)||0),0);
}
/* تفصيل كل الإيرادات */
function miqatRevenueBreakdown(miqatId){
  const members = miqatMembersReceived(miqatId);
  const vows = revMiqatTotal(miqatId,'vow');
  const donations = revMiqatTotal(miqatId,'donation');
  const thawab = miqatThawabTotal(miqatId);
  return { members, vows, donations, thawab, total: members+vows+donations+thawab };
}

/* صفحة المصروفات */
function finExpensesHTML(){
  return `
  <div class="fin-grid one">
    <button class="fin-cell big" onclick="openFinancePage('expMiqat')">مصروفات المواقيت</button>
    <button class="fin-cell big" onclick="openFinancePage('soon',{title:'مصروفات غير متعلقة بالإحياء'})">مصروفات غير متعلقة بالإحياء</button>
    <button class="fin-cell big" onclick="openFinancePage('projects')">مشاريع</button>
  </div>`;
}

/* ترتيب المواقيت من الأقرب زمنياً */
function miqatDaysAway(mq){
  const t=new Date(); t.setHours(0,0,0,0);
  const ty=miqatTargetHijriYear(mq);
  const g=hijriToGregorian(mq.day,mq.month,ty);
  if(!g) return 99999;
  const gd=new Date(g); gd.setHours(0,0,0,0);
  return Math.round((gd-t)/86400000);
}
function miqatsByNearest(){
  return [...miqats].map(mq=>({mq,d:miqatDaysAway(mq)}))
    .sort((a,b)=>{
      const fa=a.d<0?1:0, fb=b.d<0?1:0;     // القادمة أولاً ثم الماضية
      if(fa!==fb) return fa-fb;
      return fa ? b.d-a.d : a.d-b.d;         // الماضية: الأحدث أولاً
    }).map(x=>x.mq);
}
function miqatNearLabel(mq){
  const d=miqatDaysAway(mq);
  if(d===0) return 'اليوم';
  if(d===1) return 'غداً';
  if(d>0) return `بعد ${d} يوماً`;
  return `مضى ${Math.abs(d)} يوماً`;
}

/* مصروفات المواقيت → فرح / حزن */
function finExpMiqatHTML(){
  const sorted=miqatsByNearest();
  return `
  <div class="fin-ctx">مصروفات المواقيت — اختر الميقات</div>
  <div class="fin-field">
    <label>الميقات</label>
    <select id="finMiqatSel" onchange="finMiqatGoDirect()">
      <option value="">— اختر ميقاتاً —</option>
      ${sorted.map(mq=>{
        const n=(finance.expenses||[]).filter(e=>e.miqatId===mq.id).length;
        return `<option value="${mq.id}">${escapeHtml(mq.name)} — ${miqatNearLabel(mq)}${n?` (${n} مصروف)`:''}</option>`;
      }).join('')}
    </select>
  </div>
  <div class="fin-hint">${icon('info',15,'ico-btn')} المواقيت مرتّبة من الأقرب زمنياً</div>`;
}
/* الانتقال المباشر لصفحة المصروفات */
function finMiqatGoDirect(){
  const id=$('#finMiqatSel').value; if(!id) return;
  openFinancePage('expEntry',{mood:'hzn',miqatId:id,kind:'hzn'});
}

/* مناسبة فرح: اختيار ميقات ثم مولد/احتفال */
function finExpMoodHTML(opts){
  const sorted=miqatsByNearest();
  return `
  <div class="fin-field">
    <label>اختر الميقات</label>
    <select id="finMiqatSel" onchange="finMoodPick()">
      <option value="">— اختر ميقاتاً —</option>
      ${sorted.map(mq=>`<option value="${mq.id}">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</option>`).join('')}
    </select>
  </div>
  <div id="finMoodChoice" style="display:none">
    <div class="fin-grid">
      <button class="fin-cell" onclick="finGoEntry('mawlid')">📖 قراءة مولد</button>
      <button class="fin-cell" onclick="finGoEntry('ihtifal')">🎊 احتفال</button>
    </div>
  </div>`;
}
function finMoodPick(){
  const v=$('#finMiqatSel').value;
  $('#finMoodChoice').style.display = v?'block':'none';
}
function finGoEntry(kind){
  const miqatId=$('#finMiqatSel').value; if(!miqatId){ toast('اختر ميقاتاً'); return; }
  openFinancePage('expEntry',{mood:'farah',miqatId,kind});
}

/* مناسبة حزن: اختيار ميقات ثم مباشرة لتقسيم المصروفات (بلا مولد/احتفال) */
function finExpHznHTML(opts){
  const sorted=miqatsByNearest();
  return `
  <div class="fin-field">
    <label>اختر الميقات</label>
    <select id="finHznMiqatSel" onchange="finHznGoEntry()">
      <option value="">— اختر ميقاتاً —</option>
      ${sorted.map(mq=>`<option value="${mq.id}">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</option>`).join('')}
    </select>
  </div>
  <div class="fin-hint">اختر الميقات لتدخل مباشرة إلى تقسيم المصروفات</div>`;
}
function finHznGoEntry(){
  const miqatId=$('#finHznMiqatSel').value; if(!miqatId) return;
  openFinancePage('expEntry',{mood:'hzn',miqatId,kind:'hzn'});
}

/* صفحة إضافة المصروف */
const EXP_TYPES=['خطيب المساء','خطيب الظهر','وجبة العشاء','وجبة الغداء','الرادود','السواد','زينة','موكب','أجار زنجيل','أجار سماعات','جوائز','متفرقات','أخرى'];
const EXP_MISC=['ماء','مناديل','صابون','غاز','قفازات','بارسلات','أخرى'];
function finExpEntryHTML(opts){
  const mq=miqats.find(x=>x.id===opts.miqatId);
  const isHzn = opts.mood==='hzn';
  const kindLbl = isHzn ? 'مناسبة حزن' : (opts.kind==='mawlid'?'قراءة مولد':'احتفال');
  const rows=(finance.expenses||[]).filter(e=>e.miqatId===opts.miqatId && e.kind===opts.kind && e.mood===opts.mood)
    .sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  const total=rows.reduce((s,e)=>s+(Number(e.cost)||0),0);
  const rev = miqatRevenueBreakdown(opts.miqatId);
  const period = miqatExpPeriod(opts.miqatId, opts.kind, opts.mood);
  const closed = isMiqatClosed(opts.miqatId, opts.kind, opts.mood);
  return `
  <div class="fin-ctx">${mq?escapeHtml(mq.name):''} · ${kindLbl}</div>

  <div class="rev-box">
    <div class="rev-head">
      <span>${icon('wallet',17,'ico-btn')} إيرادات هذا الميقات</span>
      <b>${finMoney(rev.total)}</b>
    </div>
    <div class="rev-rows">
      <div class="rev-r"><span>مساهمات الأعضاء المستلمة</span><b>${finMoney(rev.members)}</b></div>
      <div class="rev-r"><span>النذور</span><b>${finMoney(rev.vows)}</b></div>
      <div class="rev-r"><span>التبرعات</span><b>${finMoney(rev.donations)}</b></div>
      <div class="rev-r"><span>التثويبات المدفوعة</span><b>${finMoney(rev.thawab)}</b></div>
    </div>
    <div class="rev-net ${rev.total-total>=0?'pos':'neg'}">
      <span>الصافي بعد المصروفات</span><b>${finMoney(rev.total-total)}</b>
    </div>
  </div>

  <div class="exp-period">
    ${period.first?`<span>${icon('calendar',15,'ico-btn')} بدأ التسجيل: <b>${fmtDate(period.first)}</b></span>`:'<span class="dim">لم يبدأ التسجيل بعد</span>'}
    ${closed?`<span>${icon('check',15,'ico-btn')} انتهت المناسبة: <b>${fmtDate(closed)}</b></span>`:''}
  </div>

  <div class="fin-add-exp">
    <input id="expEditId" type="hidden" value="" />
    <div class="fin-field"><label>نوع المصروف</label>
      <select id="expType" onchange="expTypeChange()">
        <option value="">— اختر —</option>
        ${EXP_TYPES.map(t=>`<option value="${t}">${t}</option>`).join('')}
      </select></div>
    <div class="fin-field" id="expSubWrap" style="display:none"><label>التفصيل</label>
      <select id="expSub">
        ${EXP_MISC.map(t=>`<option value="${t}">${t}</option>`).join('')}
      </select></div>
    <div class="fin-field"><label>التكلفة (د.ب)</label>
      <input id="expCost" type="number" min="0" step="0.001" placeholder="0.000" /></div>
    <div class="fin-field"><label>التاريخ</label>
      <input id="expDate" type="date" value="${today()}" /></div>
    <div class="fin-field"><label>ملاحظة (اختياري)</label>
      <input id="expNote" type="text" placeholder="ملاحظة" /></div>
    <div class="meal-details" id="mealDetails">
      <div class="meal-title">تفاصيل الوجبة (اختيارية)</div>
      <div class="meal-grid">
        <div class="fin-field wide"><label>نوع الطعام</label><input id="mealFood" type="text" placeholder="مثال: چبدة، قيمة، برجر، سندويش تندر دجاج" /></div>
        <div class="fin-field"><label>عدد الوجبات التقديري</label><input id="mealEstimate" type="number" min="0" step="1" placeholder="مثال: 400" /></div>
        <div class="fin-field"><label>الإيدام</label><select id="mealStew" onchange="mealStewChange()"><option value="">— اختر —</option><option>دجاج</option><option>لحم</option><option>سمك</option><option>أخرى</option><option>لا يوجد</option></select></div>
        <div class="fin-field wide" id="mealStewOtherWrap" style="display:none"><label>نوع الإيدام</label><input id="mealStewOther" type="text" placeholder="مثال: قيمة — لحم مفروم، عدس" /></div>
        <div class="fin-field" id="mealStewQtyWrap"><label>كمية الإيدام</label><input id="mealStewQty" type="text" placeholder="مثال: 70 كيلو" /></div>
        <div class="fin-field"><label>كمية العيش</label><input id="mealRiceQty" type="text" placeholder="مثال: 40 كيلو" /><label class="meal-none"><input id="mealNoRice" type="checkbox" onchange="mealRiceChange()" /> لا يوجد</label></div>
        <div class="fin-field"><label>نتيجة الكمية</label><select id="mealResult" onchange="mealResultChange()"><option value="">تُسجّل بعد المناسبة</option><option value="more">زادت</option><option value="enough">كفت</option><option value="less">نقصت</option></select></div>
        <div class="fin-field" id="mealResultQtyWrap" style="display:none"><label id="mealResultQtyLabel">مقدار الزيادة أو النقص</label><input id="mealResultQty" type="text" placeholder="مثال: قرابة 20 وجبة" /></div>
      </div>
    </div>
    <button class="btn btn-primary" id="expSaveBtn" onclick='addExpense(${JSON.stringify(opts)})'>${icon('plus',17,'ico-btn')} إضافة مصروف</button>
  </div>
  <div class="fin-exp-list">
    <div class="fel-head"><span>المصروفات المسجّلة</span><b>الإجمالي: ${finMoney(total)}</b></div>
    ${rows.length?rows.map(e=>`<div class="fel-item">
      <div><div class="fel-type">${escapeHtml(e.type)}${e.subType?' — '+escapeHtml(e.subType):''}</div>
        <div class="fel-meta">${e.date?fmtDate(e.date):''}${e.note?' · '+escapeHtml(e.note):''}</div>
        ${e.meal?`<span class="meal-badge ${e.meal.result||''}">${e.meal.result==='more'?'● زادت':e.meal.result==='enough'?'● كفت':e.meal.result==='less'?'● نقصت':'تفاصيل الوجبة غير مكتملة'}</span>`:''}
        <button class="fel-edit" onclick="editExpense('${e.id}')">تعديل</button></div>
      <div class="fel-cost">${finMoney(e.cost)}<button class="fel-del" onclick="deleteExpense('${e.id}')">×</button></div>
    </div>`).join(''):'<div class="fel-empty">لا توجد مصروفات بعد</div>'}
  </div>
  <div class="exp-foot">
    <div class="exp-actions">
    <button class="btn ${closed?'btn-ghost':''} finish" style="width:100%;${closed?'':'background:var(--warn);color:#fff;border:none;'}"
      onclick='toggleMiqatClosed(${JSON.stringify(opts)})'>
      ${closed?'↺ إلغاء إنهاء المناسبة':icon('check',16,'ico-btn')+' انتهت المناسبة'}
    </button>
    <button class="btn btn-accent" onclick='printMiqatExpenseReport(${JSON.stringify(opts)})'>${icon('print',17,'ico-btn')} التقرير المالي فقط PDF</button>
    <button class="btn btn-primary" onclick='printMiqatDetailedReport(${JSON.stringify(opts)})'>${icon('print',17,'ico-btn')} التقرير التفصيلي PDF</button>
    </div>
  </div>`;
}
function expTypeChange(){
  const t=$('#expType').value;
  $('#expSubWrap').style.display = (t==='متفرقات')?'block':'none';
  $('#mealDetails').classList.toggle('show', t==='وجبة الغداء'||t==='وجبة العشاء');
}
function mealStewChange(){
  const v=$('#mealStew').value;
  $('#mealStewOtherWrap').style.display=v==='أخرى'?'block':'none';
  $('#mealStewQtyWrap').style.display=v==='لا يوجد'?'none':'block';
  if(v==='لا يوجد') $('#mealStewQty').value='';
}
function mealRiceChange(){
  const none=$('#mealNoRice').checked; $('#mealRiceQty').disabled=none; if(none) $('#mealRiceQty').value='';
}
function mealResultChange(){
  const v=$('#mealResult').value, show=v==='more'||v==='less';
  $('#mealResultQtyWrap').style.display=show?'block':'none';
  $('#mealResultQtyLabel').textContent=v==='more'?'مقدار الزيادة':v==='less'?'مقدار النقص':'مقدار الزيادة أو النقص';
  if(!show) $('#mealResultQty').value='';
}
function readMealDetails(type){
  if(type!=='وجبة الغداء'&&type!=='وجبة العشاء') return null;
  const meal={ food:$('#mealFood').value.trim(), estimatedMeals:parseInt($('#mealEstimate').value,10)||0,
    stew:$('#mealStew').value, stewOther:$('#mealStewOther').value.trim(), stewQty:$('#mealStewQty').value.trim(),
    riceQty:$('#mealRiceQty').value.trim(), noRice:$('#mealNoRice').checked,
    result:$('#mealResult').value, resultQty:$('#mealResultQty').value.trim() };
  return Object.values(meal).some(Boolean)?meal:null;
}
async function addExpense(opts){
  const type=$('#expType').value;
  if(!type){ toast('اختر نوع المصروف'); return; }
  const subType = (type==='متفرقات') ? $('#expSub').value : '';
  const cost=parseFloat($('#expCost').value);
  if(isNaN(cost)||cost<0){ toast('أدخل تكلفة صحيحة'); return; }
  const editId=$('#expEditId').value;
  const payload={ section:'miqat', mood:opts.mood, miqatId:opts.miqatId, kind:opts.kind, type, subType, cost,
    date:$('#expDate').value||today(), note:$('#expNote').value.trim(), meal:readMealDetails(type), at:new Date().toISOString() };
  if(editId){ const i=finance.expenses.findIndex(e=>e.id===editId); if(i>=0) finance.expenses[i]={...finance.expenses[i],...payload}; }
  else finance.expenses.push({id:'e_'+Date.now(),...payload});
  await saveFinance();
  renderFinancePage('expEntry',opts); toast(editId?'تم تعديل المصروف':'تمت إضافة المصروف');
}
function editExpense(id){
  const e=finance.expenses.find(x=>x.id===id); if(!e) return;
  $('#expEditId').value=e.id; $('#expType').value=e.type||''; expTypeChange();
  if(e.type==='متفرقات') $('#expSub').value=e.subType||EXP_MISC[0];
  $('#expCost').value=e.cost; $('#expDate').value=e.date||today(); $('#expNote').value=e.note||'';
  const m=e.meal||{}; $('#mealFood').value=m.food||''; $('#mealEstimate').value=m.estimatedMeals||'';
  $('#mealStew').value=m.stew||''; $('#mealStewOther').value=m.stewOther||''; $('#mealStewQty').value=m.stewQty||'';
  $('#mealRiceQty').value=m.riceQty||''; $('#mealNoRice').checked=!!m.noRice; $('#mealResult').value=m.result||''; $('#mealResultQty').value=m.resultQty||'';
  mealStewChange(); mealRiceChange(); mealResultChange();
  $('#expSaveBtn').innerHTML='حفظ التعديل'; $('.fin-add-exp').scrollIntoView({behavior:'smooth',block:'start'});
}
async function deleteExpense(id){
  if(!confirm('حذف هذا المصروف؟')) return;
  const e=finance.expenses.find(x=>x.id===id);
  if(e) logAudit('حذف','المالية',`مصروف «${e.type}» بمبلغ ${finMoney(e.cost)}`);
  finance.expenses=finance.expenses.filter(x=>x.id!==id);
  await saveFinance();
  const cur=finNav[finNav.length-1];
  renderFinancePage(cur.page, cur.opts);
}

/* تحويل تاريخ ميلادي (YYYY-MM-DD) إلى هجري */
function gregToHijri(iso){
  if(!iso) return '';
  try{
    const d=new Date(iso+'T12:00:00');
    let p=new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric'}).format(d);
    return p.replace(/\s*هـ\s*$/,'')+' هـ';
  }catch(e){ return ''; }
}

/* تقرير ذكي لمصروفات مناسبة (PDF بالتاريخين + أزرار) */
function printMiqatDetailedReport(opts){ printMiqatExpenseReport(opts,true); }
function printMiqatExpenseReport(opts, detailed=false){
  const mq=miqats.find(x=>x.id===opts.miqatId);
  const isHzn=opts.mood==='hzn';
  const kindLbl = isHzn ? 'مناسبة حزن' : (opts.kind==='mawlid'?'قراءة مولد':'احتفال');
  const rows=(finance.expenses||[]).filter(e=>e.miqatId===opts.miqatId && e.kind===opts.kind && e.mood===opts.mood)
    .sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const total=rows.reduce((s,e)=>s+(Number(e.cost)||0),0);
  // تجميع حسب النوع
  const byType={};
  rows.forEach(e=>{ const k=e.type+(e.subType?' — '+e.subType:''); byType[k]=(byType[k]||0)+(Number(e.cost)||0); });
  const typeArr=Object.entries(byType).sort((a,b)=>b[1]-a[1]);
  const topType=typeArr[0];
  const avgPerItem = rows.length ? total/rows.length : 0;
  // تحليل ذكي
  const insights=[];
  if(topType) insights.push(`أعلى بند إنفاق هو «${topType[0]}» بمبلغ ${finMoney(topType[1])}، أي ما نسبته ${Math.round(topType[1]/total*100)}% من إجمالي المصروفات.`);
  insights.push(`بلغ عدد بنود الصرف ${rows.length} بنداً، بمتوسط ${finMoney(avgPerItem)} للبند الواحد.`);
  if(typeArr.length>=3) insights.push(`توزّعت المصروفات على ${typeArr.length} أنواع مختلفة، مما يعكس تنوّع احتياجات المناسبة.`);
  const period=miqatExpPeriod(opts.miqatId, opts.kind, opts.mood);
  const closedOn=isMiqatClosed(opts.miqatId, opts.kind, opts.mood);
  if(period.first){
    insights.push(closedOn
      ? `بدأ تسجيل المصروفات في ${fmtDate(period.first)} وانتهت المناسبة في ${fmtDate(closedOn)}.`
      : `بدأ تسجيل المصروفات في ${fmtDate(period.first)}، وآخر تعديل في ${fmtDate(period.last)} (المناسبة لم تُنهَ بعد).`);
  }
  // الإيرادات
  const rev = miqatRevenueBreakdown(opts.miqatId);
  const net = rev.total - total;
  if(rev.total>0){
    insights.push(`بلغت إيرادات هذا الميقات ${finMoney(rev.total)}، منها ${finMoney(rev.members)} من مساهمات الأعضاء.`);
    insights.push(net>=0
      ? `الصافي بعد المصروفات: ${finMoney(net)} لصالح الهيئة.`
      : `تجاوزت المصروفات الإيرادات بمقدار ${finMoney(Math.abs(net))}.`);
  }

  // الميقات مخزّن بالهجري (day/month هجريان). نحسب السنة الهجرية والميلادي المقابل.
  const hYear = (typeof miqatTargetHijriYear==='function') ? miqatTargetHijriYear(mq) : (parseInt(hijriParts().year,10)||1448);
  const hijriDateStr = mq ? `${mq.day} ${HIJRI_MONTHS[mq.month]} ${hYear} هـ` : '—';
  let gregDateStr = '—';
  if(mq){ try{ const g=hijriToGregorian(mq.day, mq.month, hYear); if(g) gregDateStr=new Date(g).toLocaleDateString('ar',{day:'numeric',month:'long',year:'numeric'}); }catch(e){} }

  const w=window.open('','_blank');
  const mealRows=rows.filter(e=>e.meal);
  const resultLabel=r=>r==='more'?'زادت':r==='enough'?'كفت':r==='less'?'نقصت':'لم تُسجّل بعد';
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${detailed?'التقرير التفصيلي':'تقرير مصروفات'} — ${escapeHtml(mq?mq.name:'')}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:14.5px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:185px;max-height:70px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:18px;}
  .doc-title{font-family:'Amiri',serif;font-size:22px;font-weight:700;color:#1c4536;margin:8px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:13px;}
  .mq-banner{background:#f6f2ea;border-radius:12px;padding:16px;margin-bottom:18px;text-align:center;}
  .mq-name{font-size:19px;font-weight:800;color:#1c4536;}
  .mq-kind{display:inline-block;font-size:12px;color:#fff;background:${isHzn?'#8a5a5a':'#3f8f5b'};padding:3px 14px;border-radius:20px;margin:6px 0;}
  .mq-dates{font-size:13px;color:#6a6055;margin-top:6px;line-height:1.9;}
  .total-card{text-align:center;background:#e6f0ea;border-radius:14px;padding:20px;margin-bottom:18px;}
  .total-card .v{font-size:34px;font-weight:800;color:#1c4536;}
  .total-card .l{font-size:13px;color:#8a7c6b;}
  h2{font-size:15px;color:#fff;background:#1c4536;display:inline-block;padding:5px 14px 5px 18px;border-radius:0 16px 16px 0;margin:18px 0 10px;}
  table{width:100%;border-collapse:collapse;font-size:13.5px;}th,td{border:1px solid #e6ddcb;padding:8px 11px;text-align:right;}th{background:#1c4536;color:#fff;}
  tr:nth-child(even){background:#faf7f0;}
  .sum-row td{background:#e6f0ea;font-weight:800;color:#1c4536;}
  .note-sm{font-size:11.5px;color:#8a7c6b;margin:-4px 0 14px;line-height:1.7;}
  .period-bar{display:flex;flex-wrap:wrap;gap:18px;background:#f6f2ea;border:1px solid #e6ddcb;border-radius:10px;padding:11px 15px;margin-bottom:14px;font-size:13px;color:#5a5148;}
  .period-bar b{color:#1c4536;} .period-bar i{color:#8a7c6b;font-style:normal;font-size:12px;}
  .sum3{display:flex;gap:11px;margin-bottom:18px;}
  .s3{flex:1;text-align:center;border-radius:13px;padding:16px 10px;border:1px solid #e6ddcb;}
  .s3 .v{font-size:20px;font-weight:800;} .s3 .l{font-size:11.5px;color:#8a7c6b;margin-top:4px;}
  .s3.inc{background:#e9f4ed;} .s3.inc .v{color:#2f8f5b;}
  .s3.exp{background:#fbf0e6;} .s3.exp .v{color:#b5763a;}
  .s3.net-p{background:#e6f0ea;} .s3.net-p .v{color:#1c4536;}
  .s3.net-n{background:#f9ecec;} .s3.net-n .v{color:#b85c5c;}
  .insights{background:#fbf6ea;border:1px solid #e5d5a8;border-radius:12px;padding:16px;margin:14px 0;}
  .insights h3{font-size:14px;color:#7a5c1e;margin-bottom:8px;}
  .insights li{margin:6px 0;font-size:13.5px;line-height:1.8;}
  .foot{margin-top:28px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  .page-break{break-before:page;page-break-before:always;padding-top:10px}.result{display:inline-block;padding:3px 10px;border-radius:14px;font-weight:700}.result.more{color:#247849;background:#e5f4eb}.result.enough{color:#8a6a10;background:#fff4c9}.result.less{color:#a33f3f;background:#fae5e5}.result.pending{color:#756b5d;background:#eeeae3}.meal-card{border:1px solid #e6ddcb;border-radius:12px;padding:14px;margin:0 0 13px;break-inside:avoid}.meal-card h3{margin:0 0 9px;color:#1c4536;font-size:15px}
  @media print{body{padding:24px;} .no-print{display:none;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">${detailed?'التقرير التفصيلي':'تقرير المناسبة المالي'}</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · اللجنة المالية · ${hijriToday()}</div></div>
  <div class="mq-banner">
    <div class="mq-name">${escapeHtml(mq?mq.name:'')}</div>
    <div class="mq-kind">${kindLbl}</div>
    <div class="mq-dates">🌙 التاريخ الهجري: ${hijriDateStr}<br>📅 الموافق ميلادياً: ${gregDateStr}</div>
  </div>
  <div class="period-bar">
    ${period.first?`<span><b>بدء تسجيل المصروفات:</b> ${fmtDate(period.first)}</span>`:''}
    ${closedOn?`<span><b>انتهاء المناسبة:</b> ${fmtDate(closedOn)}</span>`
             :(period.last?`<span><b>آخر تعديل:</b> ${fmtDate(period.last)} <i>(لم تُنهَ بعد)</i></span>`:'')}
  </div>

  <div class="sum3">
    <div class="s3 inc"><div class="v">${finMoney(rev.total)}</div><div class="l">إجمالي الإيرادات</div></div>
    <div class="s3 exp"><div class="v">${finMoney(total)}</div><div class="l">إجمالي المصروفات</div></div>
    <div class="s3 ${net>=0?'net-p':'net-n'}"><div class="v">${finMoney(net)}</div><div class="l">الصافي</div></div>
  </div>

  <h2>الإيرادات</h2>
  <table><tr><th>المصدر</th><th>المبلغ</th><th>النسبة</th></tr>
    <tr><td>مساهمات الأعضاء المستلمة</td><td>${finMoney(rev.members)}</td><td>${rev.total?Math.round(rev.members/rev.total*100):0}%</td></tr>
    <tr><td>النذور</td><td>${finMoney(rev.vows)}</td><td>${rev.total?Math.round(rev.vows/rev.total*100):0}%</td></tr>
    <tr><td>التبرعات</td><td>${finMoney(rev.donations)}</td><td>${rev.total?Math.round(rev.donations/rev.total*100):0}%</td></tr>
    <tr><td>التثويبات المدفوعة</td><td>${finMoney(rev.thawab)}</td><td>${rev.total?Math.round(rev.thawab/rev.total*100):0}%</td></tr>
    <tr class="sum-row"><td>إجمالي الإيرادات</td><td>${finMoney(rev.total)}</td><td>100%</td></tr>
  </table>
  ${(()=>{ const det=revenues.filter(r=>r.miqatId===opts.miqatId).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
    return det.length?`<h2>تفصيل النذور والتبرعات</h2>
    <table><tr><th>#</th><th>النوع</th><th>التاريخ</th><th>المبلغ</th></tr>
      ${det.map((r,i)=>`<tr><td>${i+1}</td><td>${r.kind==='vow'?'نذر':'تبرّع'}</td><td>${r.date?fmtDate(r.date):'—'}</td><td>${finMoney(r.amount)}</td></tr>`).join('')}
    </table>`:''; })()}

  ${(()=>{ const ik=miqatInKindList(opts.miqatId);
    return ik.length?`<h2>مساهمات الأعضاء</h2>
    <table><tr><th>العضو / العائلة</th><th>المساهمة</th><th>ملاحظات</th></tr>
      ${ik.map(x=>`<tr><td>${escapeHtml(x.who)}</td><td>${x.items.map(escapeHtml).join(' + ')}</td><td>${escapeHtml(x.note||'—')}</td></tr>`).join('')}
    </table>
    <div class="note-sm">تُذكر بنود المساهمة بأسمائها دون مبالغ — القيم التقديرية للتبرّعات العينية تُستخدم لتحديد حالة الميقات فقط.</div>`:''; })()}

  <h2>تفصيل المصروفات حسب النوع</h2>
  <table><tr><th>نوع المصروف</th><th>المبلغ</th><th>النسبة</th></tr>
    ${typeArr.map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${finMoney(v)}</td><td>${Math.round(v/total*100)}%</td></tr>`).join('')}
    <tr class="sum-row"><td>الإجمالي</td><td>${finMoney(total)}</td><td>100%</td></tr>
  </table>
  <h2>سجل المصروفات بالتفصيل</h2>
  <table><tr><th>#</th><th>النوع</th><th>التاريخ الميلادي</th><th>التاريخ الهجري</th><th>المبلغ</th></tr>
    ${rows.map((e,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(e.type)}${e.subType?' — '+escapeHtml(e.subType):''}</td><td>${e.date?fmtDate(e.date):'—'}</td><td>${e.date?escapeHtml(gregToHijri(e.date)):'—'}</td><td>${finMoney(e.cost)}</td></tr>`).join('')}
  </table>
  <div class="insights"><h3>💡 قراءة ذكية للمصروفات</h3><ul>${insights.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div>
  ${detailed?`<section class="page-break">
    <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" /><div class="doc-title">تقرير الوجبات والكميات</div><div class="doc-sub">جزء من التقرير التفصيلي للمناسبة</div></div>
    ${mealRows.length?`<table><tr><th>الوجبة</th><th>نوع الطعام</th><th>العدد التقديري</th><th>الإيدام وكميته</th><th>العيش</th><th>النتيجة</th></tr>${mealRows.map(e=>{const m=e.meal||{}, cls=m.result||'pending';return `<tr><td>${escapeHtml(e.type)}</td><td>${escapeHtml(m.food||'—')}</td><td>${m.estimatedMeals?m.estimatedMeals+' وجبة':'—'}</td><td>${m.stew==='لا يوجد'?'لا يوجد':escapeHtml((m.stew==='أخرى'?(m.stewOther||'أخرى'):(m.stew||'—'))+(m.stewQty?' — '+m.stewQty:''))}</td><td>${m.noRice?'لا يوجد':escapeHtml(m.riceQty||'—')}</td><td><span class="result ${cls}">● ${resultLabel(m.result)}</span></td></tr>`}).join('')}</table>`:'<p style="color:#8a7c6b">لا توجد تفاصيل وجبات مسجّلة لهذه المناسبة.</p>'}
    ${mealRows.map((e,i)=>{const m=e.meal||{}, cls=m.result||'pending';return `<div class="meal-card"><h3>الوجبة ${i+1}: ${escapeHtml(e.type)} — ${escapeHtml(m.food||'نوع الطعام غير مسجّل')}</h3><table><tr><td><b>التكلفة</b></td><td>${finMoney(e.cost)}</td><td><b>عدد الوجبات التقديري</b></td><td>${m.estimatedMeals?m.estimatedMeals+' وجبة':'—'}</td></tr><tr><td><b>الإيدام</b></td><td>${m.stew==='لا يوجد'?'لا يوجد':escapeHtml(m.stew==='أخرى'?(m.stewOther||'أخرى'):(m.stew||'—'))}</td><td><b>كمية الإيدام</b></td><td>${m.stew==='لا يوجد'?'لا يوجد':escapeHtml(m.stewQty||'—')}</td></tr><tr><td><b>كمية العيش</b></td><td>${m.noRice?'لا يوجد':escapeHtml(m.riceQty||'—')}</td><td><b>النتيجة</b></td><td><span class="result ${cls}">● ${resultLabel(m.result)}</span>${m.resultQty?' — '+escapeHtml(m.resultQty):''}</td></tr>${e.note?`<tr><td><b>الملاحظة</b></td><td colspan="3">${escapeHtml(e.note)}</td></tr>`:''}</table></div>`}).join('')}
  </section>`:''}
  <div class="foot">هيئة محبي الحسين (ع) — اللجنة المالية · ${detailed?'التقرير التفصيلي':'تقرير مصروفات المناسبة'}</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* ═══════════ لجنة المشاريع ═══════════ */
const PROJECT_COMMITTEES=['المالية','الضيافة','العلاقات العامة','الاحتفالات','العزاء','المواكب','الخطباء','أمانة السر','التقنية','الإعلامية','الثقافية','السواد','أخرى'];
function finProjectsHTML(){
  const list=[...projects].sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  return `
  <button class="btn btn-primary" style="width:100%;margin-bottom:14px;" onclick="openFinancePage('projectAdd',{})">${icon('plus',17,'ico-btn')} إضافة مشروع جديد</button>
  <div class="proj-incoming" id="projIncoming"><div class="eval-link-loading">جارٍ فحص الطلبات الواردة…</div></div>
  ${list.length?`<div class="proj-list-title">${icon('doc',17,'ico-btn')} المشاريع المسجّلة</div><div class="proj-list">${list.map(p=>projectCardHTML(p)).join('')}</div>`
    :'<div class="fel-empty">لا توجد مشاريع مسجّلة بعد</div>'}`;
}
async function loadIncomingProjects(){
  const host=$('#projIncoming'); if(!host) return;
  if(!window.CloudSync || !CloudSync.isReady){ host.innerHTML=''; return; }
  try{
    const incoming=await Promise.race([
      CloudSync.fetchPublicProjects(),
      new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),12000))
    ]);
    if(!incoming.length){ host.innerHTML=''; return; }
    window.__incomingProjects = incoming;
    host.innerHTML=`<div class="proj-incoming-title">${icon('download',17,'ico-btn')} طلبات واردة عبر الرابط (${incoming.length})</div>`+
      `<div class="inc-list">`+incoming.map(p=>`
        <div class="inc-row" onclick="openIncomingProject('${p._id}')">
          <div class="inc-body">
            <div class="inc-name">${escapeHtml(p.title||'—')}</div>
            <div class="inc-date">${p.date?fmtDate(p.date):(p.at?new Date(p.at).toLocaleDateString('ar'):'')}</div>
          </div>
          <div class="inc-arrow">›</div>
        </div>`).join('')+`</div>`;
  }catch(e){ console.error(e); host.innerHTML='<div class="eval-link-err" style="margin-bottom:12px;">تعذّر جلب الطلبات الواردة.</div>'; }
}
/* صفحة تفاصيل الطلب الوارد */
let currentIncoming=null;
function openIncomingProject(id){
  const p=(window.__incomingProjects||[]).find(x=>x._id===id); if(!p) return;
  currentIncoming=p;
  renderIncomingDetail();
  openFullPage('incomingproj');
}
function closeIncomingProject(){ switchTab('finance'); openFinancePage('projects'); }
function renderIncomingDetail(){
  const p=currentIncoming; if(!p) return;
  const srcLbl = p.source==='budget' ? '🏛️ ميزانية الهيئة' : (p.source==='donor'?('🎁 متبرّع'+(p.donorName?' — '+escapeHtml(p.donorName):'')):'—');
  $('#incomingProjBody').innerHTML=`
  <div class="panel inc-panel">
    <div class="inc-head">
      <div class="inc-h-title">${escapeHtml(p.title||'—')}</div>
      <div class="inc-h-badge ${p.source==='budget'?'budget':'donor'}">${srcLbl}</div>
    </div>
    <div class="inc-sec"><div class="inc-k">${icon('user',17,'ico-btn')} مقدّم الطلب</div><div class="inc-v">${escapeHtml(p.submitter||'—')}${p.committee?' — '+escapeHtml(p.committee):''}</div></div>
    <div class="inc-sec"><div class="inc-k">${icon('calendar',17,'ico-btn')} تاريخ المشروع</div><div class="inc-v">${p.date?fmtDate(p.date):'—'}${p.date?'<br><span class="inc-hijri">'+escapeHtml(gregToHijri(p.date))+'</span>':''}</div></div>
    <div class="inc-sec"><div class="inc-k">${icon('money',17,'ico-btn')} التكلفة</div><div class="inc-v">${finMoney(p.cost||0)}</div></div>
    ${p.description?`<div class="inc-sec col"><div class="inc-k">${icon('edit',17,'ico-btn')} وصف المشروع</div><div class="inc-v">${escapeHtml(p.description)}</div></div>`:''}
    ${p.goal?`<div class="inc-sec col"><div class="inc-k">${icon('star',17,'ico-btn')} الهدف من المشروع</div><div class="inc-v">${escapeHtml(p.goal)}</div></div>`:''}
    ${p.source==='budget'?`<div class="proj-warn" style="margin:14px 16px;">${icon('warn',17,'ico-btn')} يُشترط موافقة ٣ من أعضاء الإدارة يختارهم الأمين المالي</div>`:''}
    <div class="inc-actions">
      <button class="btn btn-accent" onclick="printIncomingProjectPDF()">${icon('print',17,'ico-btn')} طباعة PDF</button>
      <button class="btn btn-primary" onclick='acceptIncomingProject(window.__incomingCurrent)'>${icon('check',17,'ico-btn')} اعتماد وحفظ</button>
      <button class="btn" style="background:var(--danger);color:#fff;border:none;" onclick="rejectIncomingProject('${p._id}')">${icon('trash',17,'ico-btn')} رفض</button>
    </div>
    <div style="padding:14px 16px;text-align:center;border-top:1px solid var(--line);">
      <button class="btn btn-ghost btn-sm" onclick="closeIncomingProject()">← رجوع لقائمة الطلبات</button>
    </div>
  </div>`;
  window.__incomingCurrent=p;
}
function printIncomingProjectPDF(){
  const p=currentIncoming; if(!p) return;
  const srcLbl = p.source==='budget' ? 'ميزانية الهيئة' : ('متبرّع'+(p.donorName?` (${p.donorName})`:''));
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>طلب مشروع — ${escapeHtml(p.title||'')}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.9;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:185px;max-height:70px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:20px;}
  .doc-title{font-family:'Amiri',serif;font-size:22px;font-weight:700;color:#1c4536;margin:8px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:13px;}
  .p-title{font-size:22px;font-weight:800;color:#1c4536;text-align:center;background:#f6f2ea;border-radius:12px;padding:18px;margin-bottom:20px;}
  .row{display:flex;border:1px solid #e6ddcb;border-radius:10px;margin-bottom:10px;overflow:hidden;}
  .row .k{background:#1c4536;color:#fff;padding:12px 16px;font-weight:700;width:160px;flex-shrink:0;}
  .row .v{padding:12px 16px;flex:1;}
  .block{border:1px solid #e6ddcb;border-radius:10px;padding:14px 16px;margin-bottom:10px;}
  .block .bk{font-weight:700;color:#1c4536;margin-bottom:6px;}
  .src-badge{display:inline-block;padding:4px 16px;border-radius:20px;font-size:14px;font-weight:600;color:#fff;background:${p.source==='budget'?'#8a5a5a':'#3f8f5b'};}
  .warn{background:#fbf0e6;border:1px solid #e0b088;border-radius:10px;padding:14px;margin-top:14px;color:#8a5a2a;font-weight:600;text-align:center;}
  .foot{margin-top:28px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;} .no-print{display:none;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#7a5c1e;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ قائمة الطلبات</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🏠 الرئيسية</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">طلب مشروع مقدَّم للهيئة</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · اللجنة المالية · ${hijriToday()}</div></div>
  <div class="p-title">${escapeHtml(p.title||'—')}</div>
  <div class="row"><div class="k">👤 مقدّم الطلب</div><div class="v">${escapeHtml(p.submitter||'—')}${p.committee?' — '+escapeHtml(p.committee):''}</div></div>
  <div class="row"><div class="k">📅 التاريخ</div><div class="v">${p.date?fmtDate(p.date):'—'}${p.date?' — '+escapeHtml(gregToHijri(p.date)):''}</div></div>
  <div class="row"><div class="k">💰 التكلفة</div><div class="v">${finMoney(p.cost||0)}</div></div>
  <div class="row"><div class="k">💵 التمويل</div><div class="v"><span class="src-badge">${escapeHtml(srcLbl)}</span></div></div>
  ${p.description?`<div class="block"><div class="bk">📝 وصف المشروع</div><div>${escapeHtml(p.description)}</div></div>`:''}
  ${p.goal?`<div class="block"><div class="bk">🎯 الهدف من المشروع</div><div>${escapeHtml(p.goal)}</div></div>`:''}
  ${p.source==='budget'?`<div class="warn">⚠️ يُشترط موافقة ٣ من أعضاء الإدارة يختارهم الأمين المالي</div>`:''}
  <div class="foot">هيئة محبي الحسين (ع) — اللجنة المالية · طلب مشروع</div>
  </body></html>`);
  w.document.close(); w.focus();
}
async function acceptIncomingProject(p){
  projects.push({
    id:'prj_'+Date.now(), title:p.title||'', date:p.date||today(),
    description:p.description||'', goal:p.goal||'', cost:Number(p.cost)||0,
    source:p.source||'', donorName:p.donorName||'',
    submitter:p.submitter||'', committee:p.committee||'', viaLink:true,
    at:new Date().toISOString()
  });
  await saveProjects();
  try{ await CloudSync.deletePublicProject(p._id); }catch(e){}
  toast('تم اعتماد المشروع وحفظه');
  closeIncomingProject();
}
async function rejectIncomingProject(id){
  if(!confirm('رفض هذا الطلب وحذفه؟')) return;
  try{ await CloudSync.deletePublicProject(id); }catch(e){}
  toast('تم رفض الطلب');
  closeIncomingProject();
}
function projectCardHTML(p){
  const srcLbl = p.source==='budget' ? '🏛️ ميزانية الهيئة' : '🎁 متبرّع';
  const srcClass = p.source==='budget' ? 'budget' : 'donor';
  const st = p.status || 'pending';
  const stBox = st==='approved'
    ? `<div class="proj-status ok">${icon('check',17,'ico-btn')} تمت الموافقة على المشروع${p.decisionDate?` · ${fmtDate(p.decisionDate)}`:''}</div>`
    : st==='rejected'
    ? `<div class="proj-status no">${icon('x',17,'ico-btn')} تم رفض المشروع${p.decisionDate?` · ${fmtDate(p.decisionDate)}`:''}${p.rejectReason?`<div class="ps-reason">السبب: ${escapeHtml(p.rejectReason)}</div>`:''}</div>`
    : `<div class="proj-status wait">${icon('clock',17,'ico-btn')} بانتظار القرار</div>`;
  return `<div class="proj-card">
    <div class="proj-head">
      <div class="proj-title">${escapeHtml(p.title||'—')}</div>
      <span class="proj-src ${srcClass}">${srcLbl}</span>
    </div>
    <div class="proj-meta">
      ${p.date?`${icon('calendar',17,'ico-btn')} ${fmtDate(p.date)}`:''}
      ${p.cost?` · ${icon('money',17,'ico-btn')} ${finMoney(p.cost)}`:''}
      ${p.viaLink?' · 📎 عبر الرابط':''}
    </div>
    ${p.submitter?`<div class="proj-submitter">مقدّم الطلب: <b>${escapeHtml(p.submitter)}</b>${p.committee?' — '+escapeHtml(p.committee):''}</div>`:''}
    ${p.description?`<div class="proj-desc">${escapeHtml(p.description)}</div>`:''}
    ${(p.source==='budget'&&st==='pending')?`<div class="proj-warn">${icon('warn',17,'ico-btn')} يُشترط موافقة ٣ من أعضاء الإدارة يختارهم الأمين المالي</div>`:''}
    ${stBox}
    ${st==='pending'?`
      <div class="proj-actions">
        <button class="btn btn-sm" style="background:var(--ok);color:#fff;border:none;" onclick="decideProject('${p.id}','approved')">${icon('check',17,'ico-btn')} موافقة</button>
        <button class="btn btn-sm" style="background:var(--danger);color:#fff;border:none;" onclick="decideProject('${p.id}','rejected')">${icon('x',17,'ico-btn')} رفض</button>
      </div>`:''}
    <div class="proj-actions">
      <button class="btn btn-accent btn-sm" onclick="printProjectPDF('${p.id}')">${icon('print',17,'ico-btn')} ${st==='pending'?'طباعة PDF':'أمر القرار PDF'}</button>
      ${st!=='pending'?`<button class="btn btn-sm" style="background:#25d366;color:#fff;border:none;" onclick="sendProjectDecisionWA('${p.id}')">${icon('mail',17,'ico-btn')} واتساب</button>`:''}
      ${st!=='pending'?`<button class="btn btn-ghost btn-sm" onclick="decideProject('${p.id}','pending')">↺ تراجع</button>`:''}
      <button class="btn btn-sm" style="background:var(--danger);color:#fff;border:none;" onclick="deleteProject('${p.id}')">${icon('trash',17,'ico-btn')}</button>
    </div>
  </div>`;
}
/* قرار المشروع: موافقة / رفض / تراجع */
async function decideProject(id, status){
  const p=projects.find(x=>x.id===id); if(!p) return;
  if(status==='rejected'){
    const reason=prompt('اذكر أسباب رفض المشروع:', p.rejectReason||'');
    if(reason===null) return;
    p.rejectReason=reason.trim();
  } else if(status==='approved'){
    if(!confirm(`تأكيد الموافقة على المشروع «${p.title}»؟`)) return;
    p.rejectReason='';
  } else {
    if(!confirm('التراجع عن القرار وإعادة المشروع لحالة الانتظار؟')) return;
    p.rejectReason='';
  }
  p.status=status;
  p.decisionDate = status==='pending' ? '' : today();
  logAudit(status==='approved'?'موافقة':status==='rejected'?'رفض':'تراجع','المشاريع',`المشروع «${p.title}»`);
  await saveProjects();
  toast(status==='approved'?'تمت الموافقة على المشروع':status==='rejected'?'تم رفض المشروع':'أُعيد المشروع للانتظار');
  renderFinancePage('projects',{});
}
/* إرسال أمر القرار عبر واتساب (نص) */
function sendProjectDecisionWA(id){
  const p=projects.find(x=>x.id===id); if(!p||!p.status||p.status==='pending') return;
  const approved = p.status==='approved';
  let txt = `*هيئة محبي الحسين (ع) — اللجنة المالية*\n\n`;
  txt += approved ? `✅ *تمت الموافقة على المشروع*\n\n` : `❌ *تم رفض المشروع*\n\n`;
  txt += `*المشروع:* ${p.title||'—'}\n`;
  if(p.submitter) txt += `*مقدّم الطلب:* ${p.submitter}${p.committee?' — '+p.committee:''}\n`;
  txt += `*تاريخ استلام الطلب:* ${p.date?fmtDate(p.date):'—'}\n`;
  txt += `*تاريخ القرار:* ${p.decisionDate?fmtDate(p.decisionDate):'—'}\n`;
  if(p.cost) txt += `*التكلفة:* ${finMoney(p.cost)}\n`;
  txt += `*التمويل:* ${p.source==='budget'?'ميزانية الهيئة':'متبرّع'+(p.donorName?' ('+p.donorName+')':'')}\n`;
  if(!approved && p.rejectReason) txt += `\n*أسباب الرفض:*\n${p.rejectReason}\n`;
  txt += `\nوفّقكم الله لخدمة الإمام الحسين (ع).`;
  window.open('https://wa.me/?text='+encodeURIComponent(txt), '_blank');
}
function finProjectAddHTML(opts){
  return `
  <div class="fin-ctx">إضافة مشروع جديد</div>
  <div class="fin-add-exp">
    <div class="fin-field"><label>عنوان المشروع</label>
      <input id="projTitle" type="text" placeholder="عنوان المشروع" /></div>
    <div class="fin-field"><label>تاريخ المشروع</label>
      <input id="projDate" type="date" value="${today()}" /></div>
    <div class="fin-field"><label>وصف المشروع</label>
      <textarea id="projDesc" rows="3" placeholder="وصف تفصيلي للمشروع"></textarea></div>
    <div class="fin-field"><label>الهدف من المشروع</label>
      <textarea id="projGoal" rows="2" placeholder="الهدف المرجو من المشروع"></textarea></div>
    <div class="fin-field"><label>مبلغ التكلفة (د.ب)</label>
      <input id="projCost" type="number" min="0" step="0.001" placeholder="0.000" /></div>
    <div class="fin-field"><label>تمويل المشروع</label>
      <div class="proj-src-btns">
        <button type="button" class="proj-src-btn" id="srcDonor" onclick="setProjectSource('donor')">${icon('gift',17,'ico-btn')} متبرّع</button>
        <button type="button" class="proj-src-btn" id="srcBudget" onclick="setProjectSource('budget')">${icon('building',17,'ico-btn')} ميزانية الهيئة</button>
      </div>
    </div>
    <div class="fin-field" id="donorNameWrap" style="display:none"><label>اسم المتبرّع (اختياري)</label>
      <input id="projDonor" type="text" placeholder="اسم المتبرّع" /></div>
    <div id="budgetWarn" class="proj-warn" style="display:none;margin-bottom:14px;">${icon('warn',17,'ico-btn')} يُشترط موافقة ٣ من أعضاء الإدارة يختارهم الأمين المالي</div>
    <button class="btn btn-primary" onclick="saveProject()">${icon('download',17,'ico-btn')} حفظ المشروع</button>
  </div>`;
}
let projectSource='';
function setProjectSource(s){
  projectSource=s;
  $('#srcDonor')?.classList.toggle('on', s==='donor');
  $('#srcBudget')?.classList.toggle('on', s==='budget');
  const dw=$('#donorNameWrap'); if(dw) dw.style.display = s==='donor'?'block':'none';
  const bw=$('#budgetWarn'); if(bw) bw.style.display = s==='budget'?'block':'none';
}
async function saveProject(){
  const title=$('#projTitle').value.trim();
  if(!title){ toast('أدخل عنوان المشروع'); return; }
  if(!projectSource){ toast('اختر تمويل المشروع'); return; }
  const p={
    id:'prj_'+Date.now(), title,
    date:$('#projDate').value||today(),
    description:$('#projDesc').value.trim(),
    goal:$('#projGoal').value.trim(),
    cost:parseFloat($('#projCost').value)||0,
    source:projectSource,
    donorName: projectSource==='donor' ? $('#projDonor').value.trim() : '',
    submitter:'', committee:'', viaLink:false,
    at:new Date().toISOString()
  };
  projects.push(p);
  logAudit('إضافة','المشاريع',`المشروع «${p.title}» بتكلفة ${finMoney(p.cost)}`);
  await saveProjects();
  projectSource='';
  toast('تم حفظ المشروع');
  openFinancePage('projects');
}
async function deleteProject(id){
  const p=projects.find(x=>x.id===id); if(!p) return;
  if(!confirm(`حذف المشروع «${p.title}»؟`)) return;
  logAudit('حذف','المشاريع',`المشروع «${p.title}»`);
  projects=projects.filter(x=>x.id!==id);
  await saveProjects();
  renderFinancePage('projects',{});
}
function printProjectPDF(id){
  const p=projects.find(x=>x.id===id); if(!p) return;
  const srcLbl = p.source==='budget' ? 'ميزانية الهيئة' : 'متبرّع'+(p.donorName?` (${p.donorName})`:'');
  const st = p.status || 'pending';
  const isApp = st==='approved', isRej = st==='rejected';
  const docTitle = isApp ? 'أمر الموافقة على مشروع' : isRej ? 'أمر رفض مشروع' : 'تقرير مشروع';
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>مشروع — ${escapeHtml(p.title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>*{box-sizing:border-box;}body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.9;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:185px;max-height:70px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:20px;}
  .doc-title{font-family:'Amiri',serif;font-size:22px;font-weight:700;color:#1c4536;margin:8px 0 2px;}
  .doc-sub{color:#8a7c6b;font-size:13px;}
  .proj-title-big{font-size:22px;font-weight:800;color:#1c4536;text-align:center;background:#f6f2ea;border-radius:12px;padding:18px;margin-bottom:20px;}
  .row{display:flex;border:1px solid #e6ddcb;border-radius:10px;margin-bottom:10px;overflow:hidden;}
  .row .k{background:#1c4536;color:#fff;padding:12px 16px;font-weight:700;width:150px;flex-shrink:0;}
  .row .v{padding:12px 16px;flex:1;}
  .block{border:1px solid #e6ddcb;border-radius:10px;padding:14px 16px;margin-bottom:10px;}
  .block .bk{font-weight:700;color:#1c4536;margin-bottom:6px;}
  .src-badge{display:inline-block;padding:4px 16px;border-radius:20px;font-size:14px;font-weight:600;color:#fff;background:${p.source==='budget'?'#8a5a5a':'#3f8f5b'};}
  .warn{background:#fbf0e6;border:1px solid #e0b088;border-radius:10px;padding:14px;margin-top:14px;color:#8a5a2a;font-weight:600;text-align:center;}
  .reject-reason{border-color:#e0a8a8;background:#fdf3f3;}
  .reject-reason .bk{color:#b02c2c;}
  .stamp-area{display:flex;justify-content:center;margin:38px 0 10px;}
  .stamp{border:5px double;border-radius:16px;padding:18px 34px;text-align:center;transform:rotate(-6deg);opacity:.95;}
  .stamp.ok{border-color:#1f8a4c;color:#1f8a4c;background:rgba(31,138,76,.05);}
  .stamp.no{border-color:#c62828;color:#c62828;background:rgba(198,40,40,.05);}
  .stamp-logo{display:block;margin:0 auto 8px;max-width:120px;max-height:46px;opacity:.85;}
  .stamp.ok .stamp-logo{filter:invert(31%) sepia(58%) saturate(560%) hue-rotate(101deg) brightness(92%) contrast(90%);}
  .stamp.no .stamp-logo{filter:invert(19%) sepia(70%) saturate(3800%) hue-rotate(353deg) brightness(88%) contrast(95%);}
  .stamp-text{font-family:'Amiri',serif;font-size:30px;font-weight:700;letter-spacing:1px;line-height:1.3;}
  .stamp-sub{font-size:12px;margin-top:6px;opacity:.85;}
  .stamp-date{font-size:12px;margin-top:3px;opacity:.75;}
  .foot{margin-top:28px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;} .no-print{display:none;} .stamp{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
  </style></head><body>
  <div class="no-print" style="position:fixed;top:12px;left:12px;display:flex;gap:8px;z-index:99;">
    <button onclick="window.print()" style="background:#1c4536;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">🖨️ طباعة / PDF</button>
    <button onclick="window.close()" style="background:#8a7c6b;color:#fff;border:none;padding:10px 18px;border-radius:8px;font-family:'IBM Plex Sans Arabic';font-size:14px;cursor:pointer;">↩︎ عودة</button>
  </div>
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">${docTitle}</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · اللجنة المالية · ${hijriToday()}</div></div>
  <div class="proj-title-big">${escapeHtml(p.title)}</div>
  <div class="row"><div class="k">📅 تاريخ استلام الطلب</div><div class="v">${p.date?fmtDate(p.date):'—'}${p.date?' — '+escapeHtml(gregToHijri(p.date)):''}</div></div>
  ${p.decisionDate?`<div class="row"><div class="k">📌 تاريخ القرار</div><div class="v">${fmtDate(p.decisionDate)} — ${escapeHtml(gregToHijri(p.decisionDate))}</div></div>`:''}
  <div class="row"><div class="k">💰 التكلفة</div><div class="v">${finMoney(p.cost)}</div></div>
  <div class="row"><div class="k">💵 التمويل</div><div class="v"><span class="src-badge">${escapeHtml(srcLbl)}</span></div></div>
  ${p.submitter?`<div class="row"><div class="k">👤 مقدّم الطلب</div><div class="v">${escapeHtml(p.submitter)}${p.committee?' — '+escapeHtml(p.committee):''}</div></div>`:''}
  ${p.description?`<div class="block"><div class="bk">📝 وصف المشروع</div><div>${escapeHtml(p.description)}</div></div>`:''}
  ${p.goal?`<div class="block"><div class="bk">🎯 الهدف من المشروع</div><div>${escapeHtml(p.goal)}</div></div>`:''}
  ${(p.source==='budget'&&st==='pending')?`<div class="warn">⚠️ يُشترط موافقة ٣ من أعضاء الإدارة يختارهم الأمين المالي</div>`:''}
  ${isRej&&p.rejectReason?`<div class="block reject-reason"><div class="bk">📌 أسباب الرفض</div><div>${escapeHtml(p.rejectReason)}</div></div>`:''}
  ${(isApp||isRej)?`
  <div class="stamp-area">
    <div class="stamp ${isApp?'ok':'no'}">
      <img class="stamp-logo" src="${HAIAA_LOGO}" alt="" />
      <div class="stamp-text">${isApp?'تمت الموافقة':'تم رفض المشروع'}</div>
      <div class="stamp-sub">اللجنة المالية — هيئة محبي الحسين (ع)</div>
      <div class="stamp-date">${p.decisionDate?fmtDate(p.decisionDate):''}</div>
    </div>
  </div>`:''}
  <div class="foot">هيئة محبي الحسين (ع) — اللجنة المالية · ${docTitle}</div>
  </body></html>`);
  w.document.close(); w.focus();
}


/* صفحة قريباً */
function finSoonHTML(opts){
  return `<div class="fin-soon"><div class="fs-ic">🚧</div><div class="fs-title">${escapeHtml(opts.title||'')}</div><div class="fs-txt">قريباً</div></div>`;
}
/* ═══ التقارير الذكية ═══ */
function expenseMiqatName(e){ const mq=miqats.find(x=>x.id===e.miqatId); return mq?mq.name:'—'; }
function expenseYear(e){ const d=new Date(e.date||e.at); return isNaN(d)?'':d.getFullYear(); }

/* تجميع: إجمالي مصروفات كل ميقات */
function reportByMiqat(){
  const map={};
  (finance.expenses||[]).forEach(e=>{
    const k=e.miqatId||'—';
    if(!map[k]) map[k]={ name:expenseMiqatName(e), total:0, count:0, mawlid:0, ihtifal:0 };
    map[k].total+=Number(e.cost)||0; map[k].count++;
    if(e.kind==='mawlid') map[k].mawlid+=Number(e.cost)||0;
    if(e.kind==='ihtifal') map[k].ihtifal+=Number(e.cost)||0;
  });
  return Object.values(map).sort((a,b)=>b.total-a.total);
}
/* تجميع: كم صُرف على كل نوع (هذا العام) */
function reportByType(year){
  const map={};
  (finance.expenses||[]).forEach(e=>{
    if(year && expenseYear(e)!=year) return;
    const k=e.type+(e.subType?' — '+e.subType:'');
    if(!map[k]) map[k]={ type:k, total:0, count:0 };
    map[k].total+=Number(e.cost)||0; map[k].count++;
  });
  return Object.values(map).sort((a,b)=>b.total-a.total);
}
function expenseYears(){
  const ys=new Set(); (finance.expenses||[]).forEach(e=>{ const y=expenseYear(e); if(y) ys.add(y); });
  return [...ys].sort((a,b)=>b-a);
}

let reportYear=null;
/* ═══════════ التثويبات ═══════════ */
function finTathwibHTML(){
  return `
  <div class="fin-grid one">
    <button class="fin-cell big" onclick="openFinancePage('tathwibMiqat')">${icon('building',17,'ico-btn')} تثويبات المساهمين في المواقيت</button>
    <button class="fin-cell big" onclick="openFinancePage('tathwibPaid')">${icon('wallet',17,'ico-btn')} التثويبات المدفوعة</button>
    <button class="fin-cell big" onclick="openFinancePage('tathwibReports')">${icon('chart',17,'ico-btn')} تقارير التثويبات</button>
  </div>`;
}

/* عدد المساهمين الذين أهدوا ثواباً في ميقات */
function miqatThawabCount(mq){ return (mq.bookings||[]).filter(b=>b.deceased && b.deceased.length).length; }

/* صفحة اختيار الميقات */
function finTathwibMiqatHTML(){
  const withThawab=[...miqats].sort((a,b)=>a.month-b.month||a.day-b.day);
  if(!withThawab.length) return `<div class="rep-empty">لا توجد مواقيت مسجّلة</div>`;
  return `
  <div class="fin-ctx">اختر ميقاتاً لعرض المساهمين وإهداءات الثواب</div>
  <input type="text" class="tath-search" id="tathMiqatSearch" placeholder="🔍 ابحث عن ميقات…" oninput="filterTathMiqats(this.value)" />
  <div class="tath-miqat-list" id="tathMiqatList">
    ${withThawab.map(mq=>{
      const total=(mq.bookings||[]).length;
      const thawabN=miqatThawabCount(mq);
      return `<button class="tath-miqat-row" data-name="${escapeHtml(mq.name)}" onclick="openFinancePage('tathwibMiqatDetail',{miqatId:'${mq.id}'})">
        <div class="tmr-body">
          <div class="tmr-name">${escapeHtml(mq.name)}</div>
          <div class="tmr-meta">${fmtMiqatDate(mq)} · ${total} مساهم${thawabN?` · ${thawabN} إهداء ثواب`:''}</div>
        </div>
        <span class="tmr-arrow">‹</span>
      </button>`;
    }).join('')}
  </div>`;
}
function filterTathMiqats(q){
  q=(q||'').trim();
  document.querySelectorAll('#tathMiqatList .tath-miqat-row').forEach(row=>{
    const nm=row.getAttribute('data-name')||'';
    row.style.display = (!q || nm.includes(q)) ? '' : 'none';
  });
}

/* صفحة تفاصيل الميقات: صفحة (بطاقة) لكل عضو حاجز */
function finTathwibDetailHTML(opts){
  const mq=miqats.find(x=>x.id===opts.miqatId);
  if(!mq) return `<div class="rep-empty">الميقات غير موجود</div>`;
  const bookings=mq.bookings||[];
  if(!bookings.length) return `<div class="fin-ctx">${escapeHtml(mq.name)} · ${fmtMiqatDate(mq)}</div><div class="rep-empty">لا يوجد مساهمون في هذا الميقات</div>`;
  return `
  <div class="fin-ctx">${escapeHtml(mq.name)} · ${fmtMiqatDate(mq)}</div>
  ${bookings.map((b,i)=>{
    const nm=bookingName(b);
    const agreed=bookingAgreed(b);
    const paid=bookingPaid(b);
    const dec=b.deceased||[];
    return `<div class="tath-card">
      <div class="tath-card-head">
        <div class="tch-name">${escapeHtml(nm)}</div>
        <div class="tch-amounts">
          <div class="tch-agreed"><span class="tch-lbl">المتّفق</span><b>${finMoney(agreed)}</b></div>
          <div class="tch-paid"><span class="tch-lbl">تم الاستلام</span><b>${finMoney(paid)}</b></div>
        </div>
      </div>
      <div class="tath-card-body">
        <div class="tcb-row"><span class="tcb-lbl">المساهمة</span><span>${bookingItemsText(b)}</span></div>
        ${dec.length?`<div class="tcb-dec">
          <div class="tcb-lbl">إهداء الثواب إلى أرواح:</div>
          <ul>${dec.map(d=>`<li>${escapeHtml(d)}</li>`).join('')}</ul>
        </div>`:`<div class="tcb-nodec">لم يُسجّل إهداء ثواب لهذا المساهم</div>`}
      </div>
      <button class="btn btn-primary btn-sm" onclick="printThawabCertificate('${mq.id}','${b.memberId||('fam_'+i)}',${i})">📜 طباعة شهادة الشكر PDF</button>
    </div>`;
  }).join('')}`;
}

/* نص بنود المساهمة */
function bookingItemsText(b){
  const items=bookingItems(b);
  if(!items.length) return finMoney(bookingAgreed(b));
  return items.map(it=>{
    const isCash = it.kind==='نقدي';
    return isCash ? finMoney(Number(it.value)||0) : `${escapeHtml(it.kind)}${(Number(it.value)||0)>0?' ('+finMoney(it.value)+')':''}`;
  }).join(' · ');
}

/* شهادة الشكر PDF (للمساهم في الميقات) */
/* دالة موحّدة لتوليد شهادة/سند التثويب (بحجم بطاقة) */
function buildThawabCard(opts){
  // opts: {title, sub, name, miqatName, deceased[], intro, infoBoxes, note, waLink, kind}
  // kind: 'farah' → أزرق | 'hzn' → أحمر | غير محدد → يسأل المستخدم
  const doBuild=(tpl)=>{
    const dec=opts.deceased||[];
    // معامل تصغير حسب عدد الأسماء — نفس النتيجة في الشاشة والطباعة (cqw)
    let s=1;
    if(dec.length>=6) s=0.82; else if(dec.length>=4) s=0.9; else if(dec.length>=3) s=0.95;
    if(opts.infoBoxes) s=Math.min(s,0.92);
    const decBlock = dec.length ? `
      <div class="dec-intro">وقد أُهدي ثواب هذه المناسبة إلى أرواح:</div>
      <div class="dec-box">${dec.map(d=>`<div class="dec-name">${escapeHtml(d)}</div>`).join('')}</div>
      <div class="dec-after">نسأل الله تعالى أن يرحمهم، وأن يجعل ثواب هذا المجلس واصلًا إليهم.</div>
    ` : `<div class="dec-after" style="margin-top:1cqw">نسأل الله تعالى أن يجعله في ميزان حسناتكم، وأن يرزقكم دوام التوفيق لخدمة أهل البيت (ع).</div>`;
    const w=window.open('','_blank');
    w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${escapeHtml(opts.title)} — ${escapeHtml(opts.name)}</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
    *{ margin:0; padding:0; box-sizing:border-box; }
    body{ background:#2a2a2a; font-family:'IBM Plex Sans Arabic','Segoe UI',Tahoma,sans-serif; }
    .toolbar{ display:flex; gap:8px; max-width:600px; margin:14px auto; flex-wrap:wrap; padding:0 10px; }
    .tb-btn{ border:none; padding:10px 16px; border-radius:9px; font-family:inherit; font-size:14px; font-weight:600; cursor:pointer; color:#fff; text-decoration:none; display:inline-flex; align-items:center; gap:5px; }
    .tb-print{ background:#1c4536; } .tb-wa{ background:#25d366; } .tb-close{ background:#8a7c6b; }
    .wrap{ max-width:600px; margin:0 auto 30px; }
    /* container-type يجعل cqw = نسبة من عرض البطاقة، فتتطابق الشاشة والطباعة */
    .card{ position:relative; width:100%; aspect-ratio:1080/1440; overflow:hidden; box-shadow:0 10px 34px rgba(0,0,0,.45); container-type:inline-size; }
    .bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
    /* منطقة النص تحت الفريم */
    .content{ position:absolute; left:6%; right:6%; top:51%; bottom:4%; display:flex; flex-direction:column; text-align:center; color:#fff; }
    .greet{ font-size:calc(2.7cqw * ${s}); opacity:.9; margin-bottom:.6cqw; }
    .name{ font-weight:700; font-size:calc(4.4cqw * ${s}); margin-bottom:2cqw; line-height:1.25; }
    .body{ font-size:calc(3cqw * ${s}); line-height:1.65; margin-bottom:1.8cqw; }
    .body b{ font-weight:700; }
    .dec-intro{ font-size:calc(2.8cqw * ${s}); margin-bottom:1.2cqw; opacity:.92; }
    .dec-box{ background:rgba(255,255,255,.13); border-radius:2.5cqw; padding:1.6cqw 3cqw; margin-bottom:1.6cqw; }
    .dec-name{ font-weight:700; font-size:calc(3.2cqw * ${s}); padding:.5cqw 0; }
    .dec-after{ font-size:calc(2.6cqw * ${s}); line-height:1.5; opacity:.85; }
    .info-row{ display:flex; justify-content:center; gap:4cqw; margin:1.4cqw 0; }
    .info-box{ background:rgba(255,255,255,.13); border-radius:2cqw; padding:1.2cqw 3.5cqw; }
    .info-box .il{ font-size:calc(2.1cqw * ${s}); opacity:.75; } .info-box .iv{ font-weight:700; font-size:calc(3cqw * ${s}); }
    .foot{ margin-top:auto; display:flex; justify-content:space-between; align-items:flex-end; padding-top:1.5cqw; }
    .sig{ font-weight:700; font-size:calc(3cqw * ${s}); text-align:right; }
    .sig span{ display:block; font-weight:400; font-size:calc(2.3cqw * ${s}); opacity:.8; }
    .date{ font-size:calc(2.3cqw * ${s}); opacity:.85; }
    @media print{
      @page{ size:1080px 1440px; margin:0; }
      body{ background:#fff; } .toolbar{ display:none; } .wrap{ max-width:100%; margin:0; }
      .card{ box-shadow:none; width:1080px; height:1440px; }
    }
    </style></head><body>
    <div class="toolbar">
      <button class="tb-btn tb-print" onclick="window.print()">🖨️ طباعة / حفظ PDF</button>
      ${opts.waLink?`<a class="tb-btn tb-wa" href="${opts.waLink}" target="_blank">💬 واتساب</a>`:''}
      <button class="tb-btn tb-close" onclick="window.close()">✕ إغلاق</button>
    </div>
    <div class="wrap"><div class="card">
      <img class="bg" src="${tpl}" alt="" />
      <div class="content">
        <div class="greet">الأخ / الأخت الكريم</div>
        <div class="name">${escapeHtml(opts.name)}</div>
        <div class="body">${opts.intro}</div>
        ${opts.infoBoxes||''}
        ${decBlock}
        ${opts.note?`<div class="dec-after">ملاحظة: ${escapeHtml(opts.note)}</div>`:''}
        <div class="foot">
          <div class="sig">صادق الغسرة<span>أمين السر</span></div>
          <div class="date">${hijriToday()}</div>
        </div>
      </div>
    </div></div>
    </body></html>`);
    w.document.close(); w.focus();
  };
  // اختيار القالب
  if(opts.kind==='farah'){ doBuild(THAWAB_TPL_BLUE); return; }
  if(opts.kind==='hzn'){ doBuild(THAWAB_TPL_RED); return; }
  // اسأل المستخدم عن اللون
  showThawabTemplatePicker(doBuild);
}
/* نافذة اختيار القالب (أحمر/أزرق) */
function showThawabTemplatePicker(cb){
  const ov=document.createElement('div');
  ov.className='tpl-picker-overlay';
  ov.innerHTML=`<div class="tpl-picker">
    <div class="tpp-title">اختر قالب الرسالة</div>
    <div class="tpp-sub">حسب المناسبة</div>
    <div class="tpp-btns">
      <button class="tpp-btn blue" onclick="window.__pickTpl('blue')"><span>🔵</span> أزرق<small>مناسبة فرح</small></button>
      <button class="tpp-btn red" onclick="window.__pickTpl('red')"><span>🔴</span> أحمر<small>مناسبة حزن</small></button>
    </div>
    <button class="tpp-cancel" onclick="window.__pickTpl('')">إلغاء</button>
  </div>`;
  document.body.appendChild(ov);
  window.__pickTpl=(c)=>{
    ov.remove(); delete window.__pickTpl;
    if(c==='blue') cb(THAWAB_TPL_BLUE);
    else if(c==='red') cb(THAWAB_TPL_RED);
  };
}
function printThawabCertificate(miqatId, memberRef, idx){
  const mq=miqats.find(x=>x.id===miqatId); if(!mq) return;
  const bookings=mq.bookings||[];
  const b = (typeof idx==='number' && bookings[idx]) ? bookings[idx] : bookings.find(x=>x.memberId===memberRef);
  if(!b){ toast('تعذّر إيجاد المساهم'); return; }
  buildThawabCard({
    title:'شهادة شكر وتقدير',
    name:bookingName(b),
    miqatName:mq.name,
    deceased:b.deceased||[],
    intro:`تتشرف هيئة محبي الحسين بأن تتقدم لكم بخالص الشكر والتقدير على مساهمتكم في ميقات <span class="cert-miqat">${escapeHtml(mq.name)}</span>، ونسأل الله تعالى أن يتقبل منكم هذا العمل المبارك.`
  });
}

/* ═══ التثويبات المدفوعة ═══ */
let paidThawabNames=[];
function finTathwibPaidHTML(){
  const sorted=miqatsByNearest();
  const recent=[...paidThawab].sort((a,b)=>(b.at||'').localeCompare(a.at||'')).slice(0,20);
  return `
  <div class="fin-ctx">تثويب مدفوع — لأي شخص (عضو أو غير عضو)</div>
  <div class="fin-add-exp">
    <div class="fin-field"><label>اسم مقدّم الطلب</label>
      <input id="ptName" type="text" placeholder="الاسم الكامل" /></div>
    <div class="fin-field"><label>رقم الهاتف</label>
      <div class="phone-wrap"><select id="ptCountry" class="country-select"></select>
      <input id="ptPhone" inputmode="numeric" pattern="[0-9]*" maxlength="12" placeholder="رقم الهاتف" /></div></div>
    <div class="fin-field"><label>المناسبة</label>
      <select id="ptMiqat"><option value="">— اختر الميقات —</option>
        ${sorted.map(mq=>`<option value="${mq.id}">${escapeHtml(mq.name)} (${fmtMiqatDate(mq)})</option>`).join('')}
      </select></div>
    <div class="fin-field"><label>أسماء المرحومين</label>
      <div id="ptNames"></div>
      <button type="button" class="btn btn-ghost btn-sm" onclick="ptAddName()">${icon('plus',17,'ico-btn')} إضافة اسم متوفى</button></div>
    <div class="fin-field"><label>المبلغ المقدّم (د.ب)</label>
      <input id="ptAmount" type="number" min="0" step="0.001" placeholder="0.000" /></div>
    <div class="fin-field"><label>ملاحظات <span class="opt">اختياري</span></label>
      <input id="ptNote" type="text" placeholder="ملاحظة" /></div>
    <button class="btn btn-primary" onclick="savePaidThawabEntry()">✔️ تثبيت</button>
  </div>
  <div class="fin-exp-list">
    <div class="fel-head"><span>آخر التثويبات المدفوعة</span><b>${paidThawab.length} إجمالاً</b></div>
    ${recent.length?recent.map(p=>{
      const mq=miqats.find(x=>x.id===p.miqatId);
      return `<div class="fel-item">
        <div><div class="fel-type">${escapeHtml(p.name)}${p.deceased&&p.deceased.length?` · ${p.deceased.length} مرحوم`:''}</div>
          <div class="fel-meta">${mq?escapeHtml(mq.name):'—'}${p.at?' · '+new Date(p.at).toLocaleDateString('ar'):''}</div></div>
        <div class="fel-cost">${finMoney(p.amount)}
          <button class="fel-del" onclick="reprintPaidThawab('${p.id}')" title="طباعة" style="color:var(--accent)">${icon('print',17,'ico-btn')}</button>
          <button class="fel-del" onclick="deletePaidThawab('${p.id}')">×</button></div>
      </div>`;
    }).join(''):'<div class="fel-empty">لا توجد تثويبات مدفوعة بعد</div>'}
  </div>`;
}
function ptRenderNames(){
  const box=$('#ptNames'); if(!box) return;
  box.innerHTML=paidThawabNames.map((nm,i)=>`
    <div class="thawab-name-row">
      <input type="text" placeholder="اسم المرحوم/ة" value="${(nm||'').replace(/"/g,'&quot;')}" oninput="paidThawabNames[${i}]=this.value" />
      <button type="button" class="contrib-del" onclick="ptRemoveName(${i})">×</button>
    </div>`).join('');
}
function ptAddName(){ paidThawabNames.push(''); ptRenderNames(); }
function ptRemoveName(i){ paidThawabNames.splice(i,1); ptRenderNames(); }

async function savePaidThawabEntry(){
  const name=$('#ptName').value.trim();
  if(!name){ toast('أدخل اسم مقدّم الطلب'); return; }
  const cc=$('#ptCountry').value||'973';
  const local=toEnglishDigits($('#ptPhone').value).replace(/\D/g,'');
  const phone = local ? '+'+cc+local : '';
  const miqatId=$('#ptMiqat').value;
  if(!miqatId){ toast('اختر المناسبة'); return; }
  const amount=parseFloat($('#ptAmount').value);
  if(isNaN(amount)||amount<0){ toast('أدخل مبلغاً صحيحاً'); return; }
  const deceased=paidThawabNames.map(s=>(s||'').trim()).filter(Boolean);
  const entry={ id:'pt_'+Date.now(), name, phone, miqatId, deceased, amount, note:$('#ptNote').value.trim(), at:new Date().toISOString() };
  paidThawab.push(entry);
  await savePaidThawab();
  paidThawabNames=[];
  // رسالة نجاح
  alert('✅ تم استلام طلبكم بنجاح\n\nنسأل الله تعالى أن يتقبل منكم هذا العمل المبارك.');
  // فتح الـ PDF
  printPaidThawabPDF(entry.id);
  renderFinancePage('tathwibPaid',{});
}
async function deletePaidThawab(id){
  if(!confirm('حذف هذا التثويب المدفوع؟')) return;
  paidThawab=paidThawab.filter(x=>x.id!==id);
  await savePaidThawab();
  renderFinancePage('tathwibPaid',{});
}
function reprintPaidThawab(id){ printPaidThawabPDF(id); }

/* PDF التثويب المدفوع + زر واتساب */
function printPaidThawabPDF(id){
  const p=paidThawab.find(x=>x.id===id); if(!p) return;
  const mq=miqats.find(x=>x.id===p.miqatId);
  const waText = `السلام عليكم ورحمة الله وبركاته\nالأخ/الأخت ${p.name}\nتشكركم هيئة محبي الحسين على تثويبكم في ميقات ${mq?mq.name:''} بمبلغ ${fmtMoney(p.amount)}.\n${(p.deceased&&p.deceased.length)?'وقد أُهدي الثواب إلى أرواح: '+p.deceased.join('، ')+'\n':''}نسأل الله أن يتقبل منكم هذا العمل المبارك.`;
  const waLink = p.phone ? whatsappLink(p.phone, waText) : '';
  buildThawabCard({
    title:'سند تثويب',
    sub:'شكراً لتثويبكم المبارك',
    name:p.name,
    miqatName:mq?mq.name:'',
    deceased:p.deceased||[],
    intro:`تتقدم هيئة محبي الحسين بخالص الشكر والتقدير على تثويبكم في ميقات <span class="cert-miqat">${mq?escapeHtml(mq.name):''}</span>، ونسأل الله تعالى أن يتقبل منكم هذا العمل المبارك.`,
    infoBoxes:`<div class="cert-info"><div class="ci-box"><div class="l">المبلغ</div><div class="v">${finMoney(p.amount)}</div></div><div class="ci-box"><div class="l">المناسبة</div><div class="v">${mq?escapeHtml(mq.name):'—'}</div></div></div>`,
    note:p.note||'',
    waLink
  });
}

/* ═══ تقارير التثويبات ═══ */
/* توحيد كل التثويبات من المصدرين: حجوزات المواقيت + المدفوعة
   ملاحظة: المبلغ (amount) يُحسب فقط من التثويبات المدفوعة.
   مساهمة الميقات المتّفق عليها ليست تثويباً مدفوعاً، فمبلغها = 0 في هذه التقارير. */
function allThawabRecords(){
  const recs=[];
  // من حجوزات المواقيت (المساهمون) — بلا مبلغ (المبلغ هو مساهمة الميقات وليس تثويباً)
  miqats.forEach(mq=>{
    (mq.bookings||[]).forEach(b=>{
      if(b.deceased && b.deceased.length){
        recs.push({ source:'booking', miqatId:mq.id, miqatName:mq.name,
          name:bookingName(b), memberId:b.memberId||null,
          amount:0, deceased:b.deceased, at:null });
      }
    });
  });
  // من المدفوعة — المبلغ الفعلي
  (paidThawab||[]).forEach(p=>{
    const mq=miqats.find(x=>x.id===p.miqatId);
    recs.push({ source:'paid', miqatId:p.miqatId, miqatName:mq?mq.name:'—',
      name:p.name, memberId:null, amount:Number(p.amount)||0, deceased:p.deceased||[], at:p.at });
  });
  return recs;
}
/* عدد ومجموع لكل مناسبة (المجموع من المدفوعة فقط) */
function thawabByMiqat(){
  const map={};
  allThawabRecords().forEach(r=>{
    const k=r.miqatId||'—';
    if(!map[k]) map[k]={ miqatId:r.miqatId, name:r.miqatName, count:0, total:0, deceased:[] };
    map[k].count++; map[k].total+=r.amount;
    map[k].deceased.push(...r.deceased);
  });
  return Object.values(map).sort((a,b)=>b.count-a.count);
}
/* تثويبات كل مساهم (بالاسم) */
function thawabByPerson(){
  const map={};
  allThawabRecords().forEach(r=>{
    const k=r.name||'—';
    if(!map[k]) map[k]={ name:k, count:0, total:0 };
    map[k].count++; map[k].total+=r.amount;
  });
  return Object.values(map).sort((a,b)=>b.count-a.count);
}
/* المجاميع الشهرية والسنوية (من المدفوعة التي لها تاريخ) */
function thawabByMonth(){
  const map={};
  (paidThawab||[]).forEach(p=>{
    if(!p.at) return;
    const d=new Date(p.at); const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if(!map[k]) map[k]={ key:k, total:0, count:0 };
    map[k].total+=Number(p.amount)||0; map[k].count++;
  });
  return Object.values(map).sort((a,b)=>b.key.localeCompare(a.key));
}
function thawabByYear(){
  const map={};
  (paidThawab||[]).forEach(p=>{
    if(!p.at) return;
    const y=new Date(p.at).getFullYear();
    if(!map[y]) map[y]={ year:y, total:0, count:0 };
    map[y].total+=Number(p.amount)||0; map[y].count++;
  });
  return Object.values(map).sort((a,b)=>b.year-a.year);
}

let tathReportMiqat='';   // للمرحومين لمناسبة معيّنة
let tathReportPerson='';  // لتثويبات عضو معيّن
function finTathwibReportsHTML(){
  const byMiqat=thawabByMiqat();
  const byPerson=thawabByPerson();
  const topPerson=byPerson[0];
  const topMiqat=[...byMiqat].sort((a,b)=>b.total-a.total)[0];
  const months=thawabByMonth();
  const years=thawabByYear();
  const allRecs=allThawabRecords();
  const grandCount=allRecs.length;
  const grandTotal=allRecs.reduce((s,r)=>s+r.amount,0);
  const miqatOpts=[...miqats].sort((a,b)=>a.month-b.month||a.day-b.day);
  const persons=byPerson.map(p=>p.name);

  const selMiqat=tathReportMiqat;
  const decNames = selMiqat ? (byMiqat.find(m=>{ const mq=miqats.find(x=>x.name===m.name); return mq&&mq.id===selMiqat; })||{}).deceased||[] : [];
  const mqSel=miqats.find(x=>x.id===selMiqat);

  const selPerson=tathReportPerson;
  const personRecs = selPerson ? allRecs.filter(r=>r.name===selPerson) : [];

  return `
  <div class="rep-summary">
    <div class="rep-card in clickable" onclick="openFinancePage('tathwibCountList')"><div class="rc-lbl">عدد التثويبات</div><div class="rc-val">${grandCount}</div><div class="rc-hint">اضغط للقائمة ›</div></div>
    <div class="rep-card net clickable" onclick="openFinancePage('tathwibAmountList')"><div class="rc-lbl">إجمالي المبالغ المدفوعة</div><div class="rc-val">${finMoney(grandTotal)}</div><div class="rc-hint">اضغط للتفصيل ›</div></div>
  </div>

  ${topPerson||topMiqat?`<div class="rep-sec"><div class="rep-h">${icon('star',17,'ico-btn')} الأبرز</div>
    ${topPerson?`<div class="tath-top"><span>أكثر من ثوّب</span><b>${escapeHtml(topPerson.name)}</b><span class="tt-n">${topPerson.count} تثويب</span></div>`:''}
    ${topMiqat?`<div class="tath-top"><span>أكثر مناسبة تثويباً</span><b>${escapeHtml(topMiqat.name)}</b><span class="tt-n">${topMiqat.count} تثويب</span></div>`:''}
  </div>`:''}

  <div class="rep-sec">
    <div class="rep-h">${icon('building',17,'ico-btn')} التثويبات لكل مناسبة</div>
    ${byMiqat.length?`<table class="rep-tbl"><tr><th>المناسبة</th><th>عدد التثويبات</th></tr>
      ${byMiqat.map(m=>`<tr><td>${escapeHtml(m.name)}</td><td>${m.count}</td></tr>`).join('')}
      </table>`:'<div class="rep-empty">لا توجد تثويبات</div>'}
  </div>

  <div class="rep-sec">
    <div class="rep-h">${icon('candle',17,'ico-btn')} أسماء المرحومين في مناسبة</div>
    <select class="rep-year" style="width:100%;margin-bottom:10px;" onchange="tathReportMiqat=this.value; renderFinancePage('tathwibReports',{})">
      <option value="">— اختر المناسبة —</option>
      ${miqatOpts.map(mq=>`<option value="${mq.id}" ${mq.id===selMiqat?'selected':''}>${escapeHtml(mq.name)}</option>`).join('')}
    </select>
    ${selMiqat?(decNames.length?`<div class="tath-dec-list">${decNames.map(d=>`<div>${escapeHtml(d)}</div>`).join('')}</div>`:'<div class="rep-empty">لا مرحومين مسجّلين لهذه المناسبة</div>'):''}
  </div>

  <div class="rep-sec">
    <div class="rep-h">${icon('user',17,'ico-btn')} تثويبات مساهم معيّن</div>
    <select class="rep-year" style="width:100%;margin-bottom:10px;" onchange="tathReportPerson=this.value; renderFinancePage('tathwibReports',{})">
      <option value="">— اختر المساهم —</option>
      ${persons.map(nm=>`<option value="${escapeHtml(nm)}" ${nm===selPerson?'selected':''}>${escapeHtml(nm)}</option>`).join('')}
    </select>
    ${selPerson?(personRecs.length?`<table class="rep-tbl"><tr><th>المناسبة</th><th>المبلغ</th><th>مرحومون</th></tr>
      ${personRecs.map(r=>`<tr><td>${escapeHtml(r.miqatName)}</td><td>${finMoney(r.amount)}</td><td>${r.deceased.length}</td></tr>`).join('')}
      </table>`:'<div class="rep-empty">لا تثويبات لهذا المساهم</div>'):''}
  </div>

  ${months.length?`<div class="rep-sec"><div class="rep-h">${icon('calendar',17,'ico-btn')} المجاميع الشهرية (المدفوعة)</div>
    <table class="rep-tbl"><tr><th>الشهر</th><th>المبلغ</th><th>عدد</th></tr>
    ${months.map(m=>`<tr><td>${m.key}</td><td>${finMoney(m.total)}</td><td>${m.count}</td></tr>`).join('')}
    </table></div>`:''}

  ${years.length?`<div class="rep-sec"><div class="rep-h">${icon('calendar',17,'ico-btn')} المجاميع السنوية (المدفوعة)</div>
    <table class="rep-tbl"><tr><th>السنة</th><th>المبلغ</th><th>عدد</th></tr>
    ${years.map(y=>`<tr><td>${y.year}</td><td>${finMoney(y.total)}</td><td>${y.count}</td></tr>`).join('')}
    </table></div>`:''}

  <button class="btn btn-primary" style="width:100%;margin-top:8px;" onclick="printThawabReport()">${icon('print',17,'ico-btn')} طباعة تقرير التثويبات PDF</button>`;
}

/* تقرير التثويبات PDF */
function printThawabReport(){
  const byMiqat=thawabByMiqat();
  const byPerson=thawabByPerson();
  const topPerson=byPerson[0];
  const topMiqat=[...byMiqat].sort((a,b)=>b.total-a.total)[0];
  const years=thawabByYear();
  const allRecs=allThawabRecords();
  const grandCount=allRecs.length;
  const grandTotal=allRecs.reduce((s,r)=>s+r.amount,0);
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>تقرير التثويبات — ${hijriToday()}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>
  *{box-sizing:border-box;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:230px;max-height:84px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:8px;}
  .doc-title{text-align:center;font-family:'Amiri',serif;font-size:24px;font-weight:700;color:#1c4536;margin:12px 0 2px;}
  .doc-sub{text-align:center;color:#8a7c6b;font-size:14px;margin-bottom:24px;}
  h2{font-size:16px;color:#fff;background:#1c4536;display:inline-block;padding:6px 16px 6px 20px;border-radius:0 18px 18px 0;margin:24px 0 12px;}
  table{width:100%;border-collapse:collapse;font-size:14px;margin-bottom:8px;}
  th,td{border:1px solid #e6ddcb;padding:8px 12px;text-align:right;}
  th{background:#1c4536;color:#fff;}
  tr:nth-child(even){background:#faf7f0;}
  .sum-row{display:flex;gap:14px;margin-bottom:10px;}
  .sum-box{flex:1;border:1px solid #e6ddcb;border-radius:12px;padding:14px;text-align:center;}
  .sum-box .l{font-size:12px;color:#8a7c6b;} .sum-box .v{font-size:22px;font-weight:800;color:#1c4536;margin-top:4px;}
  .top-row{display:flex;gap:14px;margin-bottom:14px;}
  .top-box{flex:1;background:#f6f2ea;border-radius:12px;padding:14px;text-align:center;}
  .top-box .l{font-size:12px;color:#8a7c6b;} .top-box .v{font-size:17px;font-weight:700;color:#1c4536;margin-top:4px;}
  .foot{margin-top:36px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;}}
  ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">تقرير التثويبات</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · ${hijriToday()}</div></div>

  <h2>الملخّص</h2>
  <div class="sum-row">
    <div class="sum-box"><div class="l">عدد التثويبات</div><div class="v">${grandCount}</div></div>
    <div class="sum-box"><div class="l">إجمالي المبالغ</div><div class="v">${finMoney(grandTotal)}</div></div>
  </div>
  ${topPerson||topMiqat?`<div class="top-row">
    ${topPerson?`<div class="top-box"><div class="l">أكثر من ثوّب</div><div class="v">${escapeHtml(topPerson.name)} (${topPerson.count})</div></div>`:''}
    ${topMiqat?`<div class="top-box"><div class="l">أكثر مناسبة تثويباً</div><div class="v">${escapeHtml(topMiqat.name)}</div></div>`:''}
  </div>`:''}

  <h2>التثويبات لكل مناسبة</h2>
  ${byMiqat.length?`<table><tr><th>المناسبة</th><th>عدد التثويبات</th></tr>
    ${byMiqat.map(m=>`<tr><td>${escapeHtml(m.name)}</td><td>${m.count}</td></tr>`).join('')}
    </table>`:'<p style="color:#8a7c6b">لا توجد تثويبات.</p>'}

  <h2>تثويبات كل مساهم</h2>
  ${byPerson.length?`<table><tr><th>المساهم</th><th>عدد التثويبات</th></tr>
    ${byPerson.map(p=>`<tr><td>${escapeHtml(p.name)}</td><td>${p.count}</td></tr>`).join('')}
    </table>`:''}

  ${years.length?`<h2>المجاميع السنوية (المدفوعة)</h2>
  <table><tr><th>السنة</th><th>المبلغ</th><th>العدد</th></tr>
  ${years.map(y=>`<tr><td>${y.year}</td><td>${finMoney(y.total)}</td><td>${y.count}</td></tr>`).join('')}
  </table>`:''}

  <div class="foot">هيئة محبي الحسين (ع) — تقرير التثويبات · وثيقة رسمية</div>
  </body></html>`);
  w.document.close(); w.focus();
}

/* القائمة المختصرة (عند الضغط على عدد التثويبات) */
function finThawabCountListHTML(){
  const recs=allThawabRecords().sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  return `
  <div class="fin-ctx">القائمة المختصرة — ${recs.length} تثويب</div>
  ${recs.length?`<div class="tath-mini-list">
    ${recs.map(r=>`<div class="tath-mini">
      <div class="tm-body"><div class="tm-name">${escapeHtml(r.name)}</div>
        <div class="tm-meta">${escapeHtml(r.miqatName)} · ${r.source==='paid'?'مدفوع':'مساهم'}${r.deceased.length?` · ${r.deceased.length} مرحوم`:''}</div></div>
      ${r.source==='paid'?`<div class="tm-amt">${finMoney(r.amount)}</div>`:''}
    </div>`).join('')}
  </div>`:'<div class="rep-empty">لا توجد تثويبات</div>'}`;
}

/* القائمة التفصيلية لكل مبلغ (المدفوعة فقط) + طباعة */
function finThawabAmountListHTML(){
  const paid=[...(paidThawab||[])].sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  const total=paid.reduce((s,p)=>s+(Number(p.amount)||0),0);
  return `
  <div class="fin-ctx">التثويبات المدفوعة — الإجمالي: ${finMoney(total)}</div>
  ${paid.length?`<table class="rep-tbl"><tr><th>المتبرّع</th><th>المناسبة</th><th>المبلغ</th></tr>
    ${paid.map(p=>{ const mq=miqats.find(x=>x.id===p.miqatId);
      return `<tr><td>${escapeHtml(p.name)}</td><td>${mq?escapeHtml(mq.name):'—'}</td><td>${finMoney(p.amount)}</td></tr>`;
    }).join('')}
    <tr class="rep-sum"><td colspan="2">الإجمالي</td><td>${finMoney(total)}</td></tr>
    </table>
    <button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="printThawabAmountList()">${icon('print',17,'ico-btn')} طباعة القائمة التفصيلية PDF</button>
    `:'<div class="rep-empty">لا توجد تثويبات مدفوعة</div>'}`;
}
function printThawabAmountList(){
  const paid=[...(paidThawab||[])].sort((a,b)=>(b.at||'').localeCompare(a.at||''));
  const total=paid.reduce((s,p)=>s+(Number(p.amount)||0),0);
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>قائمة التثويبات المدفوعة — ${hijriToday()}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>
  *{box-sizing:border-box;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:210px;max-height:80px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:8px;}
  .doc-title{text-align:center;font-family:'Amiri',serif;font-size:23px;font-weight:700;color:#1c4536;margin:12px 0 2px;}
  .doc-sub{text-align:center;color:#8a7c6b;font-size:14px;margin-bottom:22px;}
  table{width:100%;border-collapse:collapse;font-size:14px;}
  th,td{border:1px solid #e6ddcb;padding:9px 12px;text-align:right;}
  th{background:#1c4536;color:#fff;}
  tr:nth-child(even){background:#faf7f0;}
  .sum td{background:#e6f0ea;font-weight:800;color:#1c4536;font-size:16px;}
  .foot{margin-top:32px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;}}
  ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">قائمة التثويبات المدفوعة</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · ${hijriToday()}</div></div>
  <table><tr><th>#</th><th>المتبرّع</th><th>المناسبة</th><th>أسماء المرحومين</th><th>المبلغ</th></tr>
    ${paid.map((p,i)=>{ const mq=miqats.find(x=>x.id===p.miqatId);
      return `<tr><td>${i+1}</td><td>${escapeHtml(p.name)}</td><td>${mq?escapeHtml(mq.name):'—'}</td><td>${(p.deceased||[]).map(escapeHtml).join('، ')||'—'}</td><td>${finMoney(p.amount)}</td></tr>`;
    }).join('')}
    <tr class="sum"><td colspan="4">الإجمالي</td><td>${finMoney(total)}</td></tr>
  </table>
  <div class="foot">هيئة محبي الحسين (ع) — قائمة التثويبات المدفوعة · وثيقة رسمية</div>
  </body></html>`);
  w.document.close(); w.focus();
}

function finReportsHTML(){
  const years=expenseYears();
  if(reportYear===null) reportYear = years[0] || new Date().getFullYear();
  const byMiqat=reportByMiqat();
  const byType=reportByType(reportYear);
  const totalExp=financeTotalExpenses();
  const rev=Number(finance.total)||0;
  const yearStart=Number(finance.yearStart)||0;

  return `
  <div class="rep-summary">
    <div class="rep-card in"><div class="rc-lbl">المبلغ الكلي</div><div class="rc-val">${finMoney(rev)}</div></div>
    <div class="rep-card out"><div class="rc-lbl">إجمالي المصروفات</div><div class="rc-val">${finMoney(totalExp)}</div></div>
    <div class="rep-card net"><div class="rc-lbl">المتبقّي</div><div class="rc-val">${finMoney(rev-totalExp)}</div></div>
  </div>

  <div class="rep-sec">
    <div class="rep-h">${icon('money',17,'ico-btn')} الإيرادات مقابل المصروفات</div>
    <div class="rep-bar-wrap">
      <div class="rep-bar-row"><span>المبلغ الكلي</span><div class="rep-bar"><div class="rb-fill in" style="width:${rev? Math.min(100,rev/Math.max(rev,totalExp)*100):0}%"></div></div><b>${finMoney(rev)}</b></div>
      <div class="rep-bar-row"><span>المصروفات</span><div class="rep-bar"><div class="rb-fill out" style="width:${rev||totalExp? Math.min(100,totalExp/Math.max(rev,totalExp)*100):0}%"></div></div><b>${finMoney(totalExp)}</b></div>
    </div>
  </div>

  <div class="rep-sec">
    <div class="rep-h">${icon('building',17,'ico-btn')} إجمالي مصروفات كل ميقات</div>
    ${byMiqat.length?`<table class="rep-tbl"><tr><th>الميقات</th><th>المصروفات</th><th>عدد</th></tr>
      ${byMiqat.map(m=>`<tr><td>${escapeHtml(m.name)}</td><td>${finMoney(m.total)}</td><td>${m.count}</td></tr>`).join('')}
      </table>`:'<div class="rep-empty">لا توجد مصروفات مسجّلة</div>'}
  </div>

  <div class="rep-sec">
    <div class="rep-h">${icon('doc',17,'ico-btn')} كم صُرف على كل بند
      ${years.length>1?`<select class="rep-year" onchange="reportYear=this.value; renderFinancePage('reports',{})">
        ${years.map(y=>`<option value="${y}" ${y==reportYear?'selected':''}>${y}</option>`).join('')}</select>`:`<span class="rep-year-static">${reportYear}</span>`}
    </div>
    ${byType.length?`<table class="rep-tbl"><tr><th>البند</th><th>المبلغ</th><th>مرّات</th></tr>
      ${byType.map(t=>`<tr><td>${escapeHtml(t.type)}</td><td>${finMoney(t.total)}</td><td>${t.count}</td></tr>`).join('')}
      </table>`:`<div class="rep-empty">لا توجد مصروفات في ${reportYear}</div>`}
  </div>

  <button class="btn btn-primary" style="width:100%;margin-top:8px;" onclick="printFinanceReport()">${icon('print',17,'ico-btn')} طباعة التقرير PDF</button>`;
}

/* طباعة التقرير الذكي PDF */
function printFinanceReport(){
  const byMiqat=reportByMiqat();
  const year=reportYear||new Date().getFullYear();
  const byType=reportByType(year);
  const totalExp=financeTotalExpenses();
  const rev=Number(finance.total)||0;
  const w=window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>التقرير المالي — ${hijriToday()}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
  <style>
  *{box-sizing:border-box;}
  body{font-family:'IBM Plex Sans Arabic',sans-serif;padding:36px 40px;color:#1a2620;line-height:1.8;font-size:15px;}
  .pdf-logo{display:block;margin:0 auto 8px;max-width:230px;max-height:84px;}
  .pdf-head{text-align:center;padding-bottom:14px;border-bottom:3px double #c19a3e;margin-bottom:8px;}
  .doc-title{text-align:center;font-family:'Amiri',serif;font-size:24px;font-weight:700;color:#1c4536;margin:12px 0 2px;}
  .doc-sub{text-align:center;color:#8a7c6b;font-size:14px;margin-bottom:24px;}
  h2{font-size:16px;color:#fff;background:#1c4536;display:inline-block;padding:6px 16px 6px 20px;border-radius:0 18px 18px 0;margin:24px 0 12px;}
  table{width:100%;border-collapse:collapse;font-size:14px;margin-bottom:8px;}
  th,td{border:1px solid #e6ddcb;padding:8px 12px;text-align:right;}
  th{background:#1c4536;color:#fff;}
  tr:nth-child(even){background:#faf7f0;}
  .sum-row{display:flex;gap:14px;margin-bottom:10px;}
  .sum-box{flex:1;border:1px solid #e6ddcb;border-radius:12px;padding:14px;text-align:center;}
  .sum-box .l{font-size:12px;color:#8a7c6b;}
  .sum-box .v{font-size:22px;font-weight:800;margin-top:4px;}
  .sum-box.in .v{color:#2f8f5b;} .sum-box.out .v{color:#b5763a;} .sum-box.net .v{color:#1c4536;}
  .foot{margin-top:36px;padding-top:12px;border-top:1px solid #e6ddcb;text-align:center;color:#b3a894;font-size:12px;}
  @media print{body{padding:24px;}}
  ${PRINT_BAR_CSS}</style></head><body>${PRINT_BAR}
  <div class="pdf-head"><img class="pdf-logo" src="${HAIAA_LOGO}" alt="" />
    <div class="doc-title">التقرير المالي</div>
    <div class="doc-sub">هيئة محبي الحسين (ع) · ${hijriToday()}</div></div>

  <h2>الملخّص</h2>
  <div class="sum-row">
    <div class="sum-box in"><div class="l">المبلغ الكلي</div><div class="v">${finMoney(rev)}</div></div>
    <div class="sum-box out"><div class="l">إجمالي المصروفات</div><div class="v">${finMoney(totalExp)}</div></div>
    <div class="sum-box net"><div class="l">المتبقّي</div><div class="v">${finMoney(rev-totalExp)}</div></div>
  </div>

  <h2>إجمالي مصروفات كل ميقات</h2>
  ${byMiqat.length?`<table><tr><th>الميقات</th><th>قراءة مولد</th><th>احتفال</th><th>الإجمالي</th><th>عدد</th></tr>
    ${byMiqat.map(m=>`<tr><td>${escapeHtml(m.name)}</td><td>${finMoney(m.mawlid)}</td><td>${finMoney(m.ihtifal)}</td><td><b>${finMoney(m.total)}</b></td><td>${m.count}</td></tr>`).join('')}
    </table>`:'<p style="color:#8a7c6b">لا توجد مصروفات مسجّلة.</p>'}

  <h2>تفصيل البنود لعام ${year}</h2>
  ${byType.length?`<table><tr><th>البند</th><th>المبلغ</th><th>عدد المرّات</th></tr>
    ${byType.map(t=>`<tr><td>${escapeHtml(t.type)}</td><td>${finMoney(t.total)}</td><td>${t.count}</td></tr>`).join('')}
    </table>`:`<p style="color:#8a7c6b">لا توجد مصروفات في ${year}.</p>`}

  <div class="foot">هيئة محبي الحسين (ع) — تقرير اللجنة المالية · وثيقة رسمية</div>
  </body></html>`);
  w.document.close(); w.focus();
}
function refreshFinanceViews(){
  if($('#tab-finance') && $('#tab-finance').style.display==='block'){
    const cur=finNav[finNav.length-1]; if(cur) renderFinancePage(cur.page,cur.opts);
  }
}
async function logFinanceEntry(){
  const email = (window.CloudSync && CloudSync.email) ? CloudSync.email : 'مستخدم محلي';
  financeLog.push({ id:'f_'+Date.now(), email, at:new Date().toISOString() });
  // احتفظ بآخر 100 سجل فقط
  if(financeLog.length>100) financeLog=financeLog.slice(-100);
  await saveFinanceLog();
}
function openSecretariatFromHome(){ switchTab('meetings'); openIdara('sec'); }

/* لوحة الإحصائيات القابلة للطي */
function toggleDash(){
  const body=document.getElementById('mtgDashBody'), caret=document.getElementById('dashCaret');
  const open = body.style.display==='none';
  body.style.display = open?'block':'none';
  if(caret) caret.classList.toggle('open', open);
}
/* أقسام أمانة السر — كل واحد صفحة مستقلة */
function switchMeetingSubtab(which){
  if(which==='assembly') return openAssemblyPage();
  if(which==='followup') return openFollowupPage();
  return openMeetingsPage();
}
function openMeetingsPage(){ openFullPage('meetingslist'); renderMeetings(); }
function closeMeetingsPage(){ switchTab('meetings'); setTimeout(()=>openIdara('sec'),80); }
function openFollowupPage(){ openFullPage('followup'); renderFollowup(); }
function closeFollowupPage(){ switchTab('meetings'); setTimeout(()=>openIdara('sec'),80); }
/* عدّادات البطاقات */
function updateSecCards(){
  const m=$('#secMtgCount'); if(m) m.textContent = meetings.length?`${meetings.length} اجتماعاً`:'لا اجتماعات';
  const t=$('#secTaskCount');
  if(t){ const open=meetings.reduce((s,x)=>s+((x.tasks||[]).filter(k=>!k.done).length),0);
    t.textContent = open?`${open} مهمة مفتوحة`:'لا مهام معلّقة'; }
}
/* الجمعية العمومية — صفحة مستقلة */
function openAssemblyPage(){
  openFullPage('assembly');
  renderAssemblyTab();
}
function closeAssemblyPage(){
  switchTab('meetings');
  setTimeout(()=>{ openIdara('sec'); switchMeetingSubtab('list'); },80);
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
      <span class="mi">${icon('calendar',17,'ico-btn')} ${fmtMeetingDT(m.datetime)}</span>
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
  if(!meetings.length){ el.innerHTML=`<div class="empty"><div class="icon">${icon('doc',17,'ico-btn')}</div><div class="txt">لا توجد اجتماعات بعد. اضغط «${icon('plus',17,'ico-btn')} اجتماع جديد» للبدء.</div></div>`; return; }
  if(!list.length){ el.innerHTML=`<div class="empty"><div class="icon">${icon('search',17,'ico-btn')}</div><div class="txt">لا نتائج مطابقة.</div></div>`; return; }
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
  openFullPage('meetingpage');
}
function closeMeetingModal(){ clearInterval(mtgTimerInterval); switchTab('meetings'); switchMeetingSubtab('list'); }

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
    try{
      const isImg=(f.type||'').startsWith('image/');
      const data = isImg ? await processPhoto(f, 1100, .82) : await fileToDataURL(f);
      mtgDraft.attachments.push({id:uid('at'), name:f.name, type:f.type, data, isImage:isImg, caption:''});
    }
    catch(_){ toast('تعذّر إرفاق '+f.name); }
  }
  e.target.value=''; renderMeetingAttachments();
}
function renderMeetingAttachments(){
  const el=$('#mtgAttachments'); const list=(mtgDraft&&mtgDraft.attachments)||[];
  if(!list.length){ el.innerHTML='<div class="mtg-block-help" style="margin:0">لا مرفقات</div>'; return; }
  el.innerHTML=list.map(a=>{
    const isImg = a.isImage || (a.type||'').startsWith('image/');
    if(isImg){
      return `<div class="mtg-attach-img">
        <div class="mai-top">
          <img class="mai-thumb" src="${a.data}" alt="" onclick="window.open('${a.data}','_blank')" />
          <div class="mai-info">
            <div class="mai-name">${icon('image',17,'ico-btn')} ${escapeHtml(a.name)}</div>
            <input class="mai-caption" type="text" placeholder="اكتب تعليقاً على الصورة…" value="${escapeHtml(a.caption||'')}" oninput="setAttachCaption('${a.id}',this.value)" />
          </div>
          <button type="button" class="remove-btn" onclick="removeMeetingAttach('${a.id}')">×</button>
        </div>
      </div>`;
    }
    return `<div class="mtg-attach-row"><a href="${a.data}" download="${escapeHtml(a.name)}" target="_blank">${icon('link',17,'ico-btn')} ${escapeHtml(a.name)}</a><button type="button" class="remove-btn" onclick="removeMeetingAttach('${a.id}')">×</button></div>`;
  }).join('');
}
function setAttachCaption(id,val){
  const a=(mtgDraft.attachments||[]).find(x=>x.id===id); if(a) a.caption=val;
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
function closeMeetingDetail(){ switchTab('meetings'); switchMeetingSubtab('list'); }
function showMeetingDetail(id){
  const m=meetings.find(x=>x.id===id); if(!m) return; mdCurrentId=id;
  $('#mdTitle').textContent=`اجتماع رقم ${m.number}`;
  $('#mdSubtitle').textContent=`${fmtMeetingDT(m.datetime)}${m.committee?' · '+m.committee:''}`;
  renderDetailPanes(m); switchDetailTab('info'); mdCurrentId=id; openFullPage('meetingdetail');
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
        <span>${icon('user',17,'ico-btn')} ${it.owner?escapeHtml(it.owner):'—'}</span>
        <span>${icon('calendar',17,'ico-btn')} ${it.due||'بدون موعد'}</span> ${chip}
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
  $('#md-attachments').innerHTML=at.length?at.map(a=>`<div class="mtg-attach-row"><a href="${a.data}" download="${escapeHtml(a.name)}" target="_blank">${icon('link',17,'ico-btn')} ${escapeHtml(a.name)}</a></div>`).join(''):`<div class="empty"><div class="txt">لا مرفقات.</div></div>`;
  $('#md-minutes').innerHTML=`
    ${m.speech?`<div class="md-section-title">كلمة الاجتماع</div><div class="md-text" style="margin-bottom:12px">${escapeHtml(m.speech)}</div>`:''}
    <div class="md-section-title">محضر الاجتماع (راجعه وعدّله)</div>
    <textarea id="mdMinutesEdit" rows="7" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;font-family:inherit;font-size:14px;background:var(--bg);color:var(--ink);resize:vertical">${escapeHtml(m.minutes||'')}</textarea>
    <div class="actions-row" style="margin-top:10px">
      <button class="btn btn-ghost btn-sm" onclick="saveMinutesEdit()">${icon('download',17,'ico-btn')} حفظ التعديل</button>
      <button class="btn btn-accent btn-sm" onclick="summarizeMinutes('${m.id}')">✨ اختصار المحضر</button>
      <button class="btn btn-primary btn-sm" onclick="printMeetingMinutes('${m.id}')">${icon('print',17,'ico-btn')} طباعة المحضر PDF</button>
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
    <div class="ia-name">${escapeHtml(m.name)}<small>${escapeHtml(m.committee||'إدارة الهيئة')}${m.phone?' · '+phoneDisp(m.phone):''}</small></div>
    <button class="btn wa-btn small" onclick="sendInvite('${m.id}')">${WA_ICON}</button>
  </div>`).join('');
}
function sendInvite(memberId){
  const m=members.find(x=>x.id===memberId); if(!m) return;
  const t=$('#invText').value.trim(); if(!t){ toast('النص فارغ'); return; }
  if(!m.phone){ toast('لا يوجد رقم هاتف لهذا العضو'); return; }
  window.open(whatsappLink(m.phone,t),'_blank');
}
function editCurrentMeeting(){ const id=mdCurrentId; openMeetingModal(id); }
async function deleteCurrentMeeting(){
  const m=meetings.find(x=>x.id===mdCurrentId); if(!m) return;
  if(!confirm(`حذف اجتماع رقم ${m.number}؟ لا يمكن التراجع.`)) return;
  meetings=meetings.filter(x=>x.id!==mdCurrentId); await saveMeetings();
  closeMeetingDetail(); toast('تم حذف الاجتماع'); renderMeetings();
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
        <span>${icon('user',17,'ico-btn')} ${r.owner?escapeHtml(r.owner):'—'}</span>
        <span>${icon('calendar',17,'ico-btn')} ${r.due||'بدون موعد'}</span>
        <span>${icon('doc',17,'ico-btn')} اجتماع ${escapeHtml(r.mNo)}</span> ${chip}
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
    .mtg-imgs{display:flex;flex-direction:column;gap:18px;margin:14px 0;}
    .mtg-fig{margin:0;border:1px solid #ece3d4;border-radius:12px;padding:12px;background:#fdfbf7;page-break-inside:avoid;}
    .mtg-fig img{width:100%;max-height:420px;object-fit:contain;border-radius:8px;display:block;}
    .mtg-fig figcaption{margin-top:10px;font-size:14px;color:#5a4d42;text-align:center;line-height:1.7;}
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
    ${(()=>{ const imgs=(m.attachments||[]).filter(a=>a.isImage||(a.type||'').startsWith('image/'));
      return imgs.length?`<h2>المرفقات المصوّرة <span class="cnt">(${imgs.length})</span></h2>
        <div class="mtg-imgs">${imgs.map(a=>`<figure class="mtg-fig"><img src="${a.data}" alt="" /><figcaption>${a.caption?escapeHtml(a.caption):escapeHtml(a.name)}</figcaption></figure>`).join('')}</div>`:''; })()}
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

/* قائمة الجمعيات */
function renderAssemblyTab(){
  currentAssemblyId=null;
  const lp=$('#asmListPanel'), dp=$('#asmDetailPanel');
  if(lp) lp.style.display='block';
  if(dp) dp.style.display='none';
  const box=$('#asmList'); if(!box) return;
  const sorted=[...assemblies].sort((a,b)=>b.year-a.year);
  const sub=$('#asmListSub'); if(sub) sub.textContent = sorted.length?`${sorted.length} جمعية مسجّلة`:'لا جمعيات بعد';
  box.innerHTML = sorted.length ? sorted.map(a=>`
    <div class="asm-row" onclick="openAssembly('${a.id}')">
      <div style="flex:1;min-width:0">
        <div class="asm-row-n">الجمعية العمومية ${a.year}</div>
        <div class="asm-row-m">${(a.attendees||[]).length} حاضراً · ${(a.projects||[]).length} مشروعاً${a.election?' · انتخابات':''}</div>
      </div>
      <button class="del" onclick="event.stopPropagation();delAssembly('${a.id}')">×</button>
      <span style="font-size:20px;color:var(--muted-2)">›</span>
    </div>`).join('')
    : '<div class="lt-empty">لا جمعيات بعد — اضغط «جمعية عمومية جديدة»</div>';
}
function openAssembly(id){
  const a=assemblies.find(x=>x.id===id); if(!a) return;
  currentAssemblyId=id;
  $('#asmListPanel').style.display='none';
  $('#asmDetailPanel').style.display='block';
  const t=$('#asmTitle'); if(t) t.textContent=`الجمعية العمومية ${a.year}`;
  $('#asmEmpty').style.display='none'; $('#asmBody').style.display='block';
  loadReportFields(); renderAsmAttendance(); renderAsmProjects(); renderAsmDecCard();
  const q=$('#asmSearch'); if(q) q.value='';
  const r=$('#asmSearchResults'); if(r) r.innerHTML='';
  switchAsmPill('attend');
}
function backToAsmList(){ stopElecLive(); renderAssemblyTab(); }
async function delAssembly(id){
  const a=assemblies.find(x=>x.id===id); if(!a) return;
  if(!confirm(`حذف الجمعية العمومية ${a.year} وكل بياناتها؟`)) return;
  if(a.election && a.election.cloudId){ try{ await CloudSync.deleteElection(a.election.cloudId); }catch(e){} }
  assemblies=assemblies.filter(x=>x.id!==id);
  await saveAssemblies();
  logAudit('حذف','الجمعية العمومية',`جمعية ${a.year}`);
  renderAssemblyTab();
}
function switchAssembly(){ }
function getAssembly(){ return assemblies.find(a=>a.id===currentAssemblyId)||null; }
function newAssembly(){
  const y=prompt('سنة الجمعية العمومية:', String(new Date().getFullYear()));
  if(!y) return; const year=parseInt(y); if(isNaN(year)){ toast('سنة غير صحيحة'); return; }
  const ex=assemblies.find(a=>a.year===year);
  if(ex){ currentAssemblyId=ex.id; toast('الجمعية موجودة'); renderAssemblyTab(); return; }
  const a={ id:uid('asm'), year, attendees:[], projects:[],
    report:{adminWord:'',plan:'',majalis:'',events:'',mawakib:'',achievements:'',topProjects:'',challenges:'',honoring:''} };
  assemblies.push(a); saveAssemblies(); toast('تم إنشاء الجمعية العمومية '+year); openAssembly(a.id);
}
function switchAsmPill(which){
  $$('.asm-pills .asm-pill').forEach(p=>p.classList.toggle('active', p.dataset.apill===which));
  $('#apane-attend').style.display = which==='attend'?'block':'none';
  $('#apane-projects').style.display = which==='projects'?'block':'none';
  $('#apane-report').style.display = which==='report'?'block':'none';
  const el=$('#apane-elec'); if(el) el.style.display = which==='elec'?'block':'none';
  const sg=$('#apane-sugg'); if(sg) sg.style.display = which==='sugg'?'block':'none';
  const fl=$('#apane-full'); if(fl) fl.style.display = which==='full'?'block':'none';
  if(which==='elec') renderAsmElection(); else stopElecLive();
  if(which==='sugg') renderAsmSuggestions();
  if(which==='full') renderAsmFull();
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
    el.innerHTML=`<div class="asm-new-btn" onclick="asmAddNewMember()">${icon('plus',17,'ico-btn')} «${escapeHtml($('#asmSearch').value.trim())}» غير مسجّل — سجّله كعضو جديد وأضِف حضوره</div>`;
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
    ${list.map(p=>`<div class="asm-proj-card">
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
  // ── أرقام تلقائية من بيانات البرنامج ──
  const asmYear = parseInt(a.year,10) || parseInt(hijriParts().year,10) || 1448;
  const S_totalMembers=members.length;
  const S_minors=members.filter(m=>m.isMinor).length;
  const S_paidCount=members.filter(m=>memberPaid(m)>0).length;
  const S_subsTotal=members.reduce((s,m)=>s+memberPaid(m),0);
  const S_yearMiqats=miqats.filter(mq=>miqatTargetHijriYear(mq)===asmYear);
  const S_mqRows=S_yearMiqats.map(mq=>{
    const bs=mq.bookings||[];
    return { name:mq.name, date:fmtMiqatDate(mq), n:bs.length,
             agreed:bs.reduce((x,b)=>x+bookingAgreed(b),0), paid:bs.reduce((x,b)=>x+bookingPaid(b),0) };
  });
  const S_mqAgreed=S_mqRows.reduce((x,q)=>x+q.agreed,0);
  const S_mqPaid=S_mqRows.reduce((x,q)=>x+q.paid,0);
  const S_balance=Number(finance.total)||0;
  const S_exps=(finance.expenses||[]);
  const S_expTotal=S_exps.reduce((x,e)=>x+(Number(e.cost)||0),0);
  const S_byType={}; S_exps.forEach(e=>{ S_byType[e.type]=(S_byType[e.type]||0)+(Number(e.cost)||0); });
  const S_topExp=Object.entries(S_byType).sort((x,y)=>y[1]-x[1]).slice(0,6);
  const S_radRows=radoods.map(rd=>{
    const evs=radoodEvals.filter(e=>e.radoodId===rd.id);
    const av=evs.length?evs.reduce((x,e)=>x+(e.avg||0),0)/evs.length:0;
    return { name:rd.name, parts:radoodParticipations(rd.id), n:evs.length, pct:evs.length?Math.round(av/3*100):null };
  }).filter(x=>x.parts>0).sort((x,y)=>(y.pct||0)-(x.pct||0));
  const S_projApp=projects.filter(p=>p.status==='approved');
  const S_projRej=projects.filter(p=>p.status==='rejected');
  const S_projPend=projects.filter(p=>!p.status||p.status==='pending');
  const S_projCost=S_projApp.reduce((x,p)=>x+(Number(p.cost)||0),0);
  const S_nMeetings=meetings.length;
  const S_nTasks=meetings.reduce((x,m)=>x+((m.tasks||[]).length),0);
  const S_doneTasks=meetings.reduce((x,m)=>x+((m.tasks||[]).filter(t=>t.done).length),0);
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
    .kpis{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0 6px;}
    .kpi{flex:1;min-width:120px;text-align:center;border:1px solid #e6ddcb;border-radius:12px;padding:13px 10px;background:#faf7f0;}
    .kpi .v{font-size:19px;font-weight:800;color:#1c4536;line-height:1.3;}
    .kpi .l{font-size:11.5px;color:#8a7c6b;margin-top:3px;}
    .rep-tbl{width:100%;border-collapse:collapse;font-size:13.5px;margin:8px 0 14px;}
    .rep-tbl th,.rep-tbl td{border:1px solid #e6ddcb;padding:8px 11px;text-align:right;}
    .rep-tbl th{background:#1c4536;color:#fff;}
    .rep-tbl tr:nth-child(even){background:#faf7f0;}
    .rep-tbl .sumr td{background:#e6f0ea;font-weight:800;color:#1c4536;}
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

    <h2>👥 الأعضاء بالأرقام</h2>
    <div class="kpis">
      <div class="kpi"><div class="v">${S_totalMembers}</div><div class="l">إجمالي الأعضاء</div></div>
      <div class="kpi"><div class="v">${S_paidCount}</div><div class="l">سدّدوا الاشتراك</div></div>
      <div class="kpi"><div class="v">${S_minors}</div><div class="l">تحت السن</div></div>
      <div class="kpi"><div class="v">${finMoney(S_subsTotal)}</div><div class="l">محصّل الاشتراكات</div></div>
    </div>

    <h2>🕌 المواقيت والمساهمات</h2>
    ${S_mqRows.length?`<table class="rep-tbl"><tr><th>الميقات</th><th>التاريخ</th><th>الحجوزات</th><th>المتفق</th><th>المستلم</th></tr>
      ${S_mqRows.map(q=>`<tr><td>${escapeHtml(q.name)}</td><td>${q.date}</td><td>${q.n}</td><td>${finMoney(q.agreed)}</td><td>${finMoney(q.paid)}</td></tr>`).join('')}
      <tr class="sumr"><td colspan="2">الإجمالي</td><td>${S_mqRows.reduce((x,q)=>x+q.n,0)}</td><td>${finMoney(S_mqAgreed)}</td><td>${finMoney(S_mqPaid)}</td></tr>
    </table>`:'<p class="mut">لا مواقيت مسجّلة لهذا العام.</p>'}

    <h2>💰 الموقف المالي</h2>
    <div class="kpis">
      <div class="kpi"><div class="v">${finMoney(S_balance)}</div><div class="l">رصيد الهيئة</div></div>
      <div class="kpi"><div class="v">${finMoney(S_expTotal)}</div><div class="l">إجمالي المصروفات</div></div>
      <div class="kpi"><div class="v">${S_exps.length}</div><div class="l">بنود الصرف</div></div>
    </div>
    ${S_topExp.length?`<table class="rep-tbl"><tr><th>أعلى بنود الصرف</th><th>المبلغ</th><th>النسبة</th></tr>
      ${S_topExp.map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${finMoney(v)}</td><td>${S_expTotal?Math.round(v/S_expTotal*100):0}%</td></tr>`).join('')}
    </table>`:''}

    <h2>🕯️ لجنة العزاء — الرواديد</h2>
    ${S_radRows.length?`<table class="rep-tbl"><tr><th>#</th><th>الرادود</th><th>المشاركات</th><th>التقييمات</th><th>المعدّل</th></tr>
      ${S_radRows.map((rd,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(rd.name)}</td><td>${rd.parts}</td><td>${rd.n}</td><td>${rd.pct!=null?rd.pct+'%':'—'}</td></tr>`).join('')}
    </table>`:'<p class="mut">لا مشاركات مسجّلة.</p>'}

    <h2>📋 المشاريع</h2>
    <div class="kpis">
      <div class="kpi"><div class="v">${S_projApp.length}</div><div class="l">معتمدة</div></div>
      <div class="kpi"><div class="v">${S_projRej.length}</div><div class="l">مرفوضة</div></div>
      <div class="kpi"><div class="v">${S_projPend.length}</div><div class="l">بانتظار القرار</div></div>
      <div class="kpi"><div class="v">${finMoney(S_projCost)}</div><div class="l">تكلفة المعتمد</div></div>
    </div>

    <h2>🗓️ اجتماعات الإدارة</h2>
    <div class="kpis">
      <div class="kpi"><div class="v">${S_nMeetings}</div><div class="l">اجتماع</div></div>
      <div class="kpi"><div class="v">${dec.total}</div><div class="l">قرار</div></div>
      <div class="kpi"><div class="v">${S_nTasks}</div><div class="l">مهمة</div></div>
      <div class="kpi"><div class="v">${S_doneTasks}</div><div class="l">مهمة منجزة</div></div>
    </div>
    </body></html>`);
  w.document.close(); w.focus();
}
/* ═══════════════ نهاية وحدة الجمعية العمومية ═══════════════ */

/* ═══════════ مركز التطوير والمتابعة ═══════════ */
let devCurrentTab='dashboard', devEditId=null, devShowArchived=false, devSearchQ='', devStatusQ='';
let devDraftSaveTimer=null;
const DEV_COMMITTEES=['عام','أمانة السر','اللجنة المالية','اللجنة الإعلامية','لجنة العزاء','الأعضاء','الإدارة','أخرى'];
const DEV_PRIORITIES=['عاجلة','مهمة','عادية','مستقبلية'];
const DEV_IDEA_STATUS=['مجرد فكرة','تحتاج إلى دراسة','معتمدة للتنفيذ','قيد التنفيذ','مكتملة','مؤجلة','ملغاة'];
const DEV_CANDIDATE_STATUS=['اسم جديد','جارٍ البحث عن الرقم','تم الحصول على الرقم','تم التواصل معه','يرغب في التسجيل','اعتذر','تم تحويله إلى عضو'];
function devId(p){ return p+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7); }
function devFmt(iso){ if(!iso) return '—'; try{return new Date(iso).toLocaleString('ar-BH');}catch(e){return iso;} }
function devOpts(list,val){ return list.map(x=>`<option value="${escapeHtml(x)}"${x===val?' selected':''}>${escapeHtml(x)}</option>`).join(''); }
function devVal(id){ const e=document.getElementById(id); return e?e.value.trim():''; }
function openDevCenter(tab='dashboard'){ openFullPage('devcenter'); devSwitch(tab); }
function devSwitch(tab){ devCurrentTab=tab; devEditId=null; devShowArchived=false; devSearchQ=''; devStatusQ=''; $$('.dev-tab').forEach(b=>b.classList.toggle('active',b.dataset.devtab===tab)); renderDevCenter(); }
function renderDevCenter(){
  const root=$('#devContent'); if(!root) return;
  if(devCurrentTab==='dashboard') return renderDevDashboard(root);
  if(devCurrentTab==='ideas') return renderDevIdeas(root);
  if(devCurrentTab==='drafts') return renderDevDrafts(root);
  if(devCurrentTab==='updates') return renderDevUpdates(root);
  if(devCurrentTab==='versions') return renderDevVersions(root);
  renderCandidates(root);
}
function renderDevDashboard(root){
  const open=devIdeas.filter(x=>!x.archived&&!['مكتملة','ملغاة'].includes(x.status)).length;
  const doing=devIdeas.filter(x=>!x.archived&&x.status==='قيد التنفيذ').length;
  const active=memberCandidates.filter(x=>!x.archived&&!['تم تحويله إلى عضو','اعتذر'].includes(x.status));
  const ready=active.filter(x=>x.phone&&['تم الحصول على الرقم','تم التواصل معه','يرغب في التسجيل'].includes(x.status)).length;
  const approved=devVersions.find(x=>x.approved&&!x.archived);
  const cells=[[open,'الأفكار المفتوحة'],[doing,'أفكار قيد التنفيذ'],[devDrafts.filter(x=>!x.archived).length,'المسودات والملاحظات'],[devUpdates.filter(x=>!x.archived).length,'التحديثات المسجلة'],[active.length,'الأسماء النشطة'],[active.filter(x=>!x.phone).length,'بلا أرقام هواتف'],[ready,'جاهزون للتحويل']];
  root.innerHTML=`<div class="dev-kpis">${cells.map(x=>`<div class="dev-kpi"><div class="v">${x[0]}</div><div class="l">${x[1]}</div></div>`).join('')}</div><div class="dev-item ${approved?'dev-approved':''}"><h3>آخر نسخة مشروع معتمدة</h3>${approved?`<div class="dev-approved-mark">✓ النسخة الحالية المعتمدة</div><div class="dev-meta">${escapeHtml(approved.name||approved.zipName||'بدون اسم')} · الإصدار ${escapeHtml(approved.version)}<br>اعتمدت في ${devFmt(approved.approvedAt)}</div>`:'<div class="dev-meta">لا توجد نسخة معتمدة حتى الآن</div>'}</div>`;
}
function devFormShell(title,body,saveFn){ return `<div class="dev-form"><h3>${title}</h3><div class="dev-form-grid">${body}</div><div class="dev-actions"><button class="btn btn-primary" onclick="${saveFn}()">حفظ</button><button class="btn btn-ghost" onclick="devCancelEdit()">إلغاء</button></div></div>`; }
function devCancelEdit(){ devEditId=null; renderDevCenter(); }
function devNew(){ devEditId='new'; renderDevCenter(); }
function devSetSearch(v){devSearchQ=v;renderDevCenter();const e=$('#devSearch');if(e){e.focus();e.setSelectionRange(v.length,v.length);}}
function devSetStatus(v){devStatusQ=v;renderDevCenter();}
function devToolbar(extra=''){ return `<div class="dev-toolbar"><input id="devSearch" value="${escapeHtml(devSearchQ)}" placeholder="بحث…" oninput="devSetSearch(this.value)"><label class="btn btn-ghost btn-sm"><input type="checkbox" ${devShowArchived?'checked':''} onchange="devShowArchived=this.checked;renderDevCenter()"> الأرشيف</label>${extra}</div>`; }
function renderDevIdeas(root){
  const item=devEditId==='new'?{}:devIdeas.find(x=>x.id===devEditId);
  const form=item?devFormShell(item.id?'تعديل الفكرة':'إضافة فكرة',`<div class="field full"><label>عنوان الفكرة *</label><input id="diTitle" value="${escapeHtml(item.title||'')}"></div><div class="field full"><label>الشرح والملاحظات</label><textarea id="diNotes" rows="4">${escapeHtml(item.notes||'')}</textarea></div><div class="field"><label>اللجنة</label><select id="diCommittee">${devOpts(DEV_COMMITTEES,item.committee||'عام')}</select></div><div class="field"><label>الأولوية</label><select id="diPriority">${devOpts(DEV_PRIORITIES,item.priority||'عادية')}</select></div><div class="field"><label>الحالة</label><select id="diStatus">${devOpts(DEV_IDEA_STATUS,item.status||'مجرد فكرة')}</select></div><div class="field"><label>رابط ملف أو صورة</label><input id="diLink" type="url" value="${escapeHtml(item.link||'')}"></div>`,'saveDevIdea'):`<button class="btn btn-primary" onclick="devNew()">+ إضافة فكرة</button>`;
  root.innerHTML=form+devToolbar(`<select id="devStatusFilter" onchange="devSetStatus(this.value)"><option value="">كل الحالات</option>${devOpts(DEV_IDEA_STATUS,devStatusQ)}</select>`)+`<div class="dev-list" id="devList"></div>`;
  const q=devSearchQ.toLowerCase(), st=devStatusQ;
  const list=devIdeas.filter(x=>!!x.archived===devShowArchived&&(!q||(x.title+' '+(x.notes||'')).toLowerCase().includes(q))&&(!st||x.status===st)).sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''));
  $('#devList').innerHTML=list.length?list.map(x=>`<div class="dev-item"><div class="dev-item-head"><h3>${escapeHtml(x.title)}</h3><span class="dev-badge">${escapeHtml(x.status)}</span></div><div>${['اللجنة: '+x.committee,'الأولوية: '+x.priority].map(v=>`<span class="dev-badge">${escapeHtml(v)}</span>`).join('')}</div>${x.notes?`<div class="dev-notes">${escapeHtml(x.notes)}</div>`:''}<div class="dev-meta">أضيفت: ${devFmt(x.createdAt)} · آخر تعديل: ${devFmt(x.updatedAt)}</div><div class="dev-actions">${x.link?`<button class="btn btn-ghost btn-sm" onclick="window.open('${escapeHtml(x.link)}','_blank','noopener')">فتح المرفق</button>`:''}<button class="btn btn-ghost btn-sm" onclick="devEditId='${x.id}';renderDevCenter()">تعديل</button><button class="btn btn-ghost btn-sm" onclick="devArchive('idea','${x.id}')">${x.archived?'إعادة من الأرشيف':'أرشفة'}</button></div></div>`).join(''):'<div class="empty"><div class="txt">لا توجد أفكار</div></div>';
}
async function saveDevIdea(){ const title=devVal('diTitle'); if(!title){toast('عنوان الفكرة مطلوب');return;} const now=new Date().toISOString(); let x=devIdeas.find(v=>v.id===devEditId); if(!x){x={id:devId('idea'),createdAt:now,archived:false};devIdeas.push(x);} Object.assign(x,{title,notes:devVal('diNotes'),committee:devVal('diCommittee'),priority:devVal('diPriority'),status:devVal('diStatus'),link:devVal('diLink'),updatedAt:now}); await saveDevIdeas(); devEditId=null; renderDevCenter(); toast('تم حفظ الفكرة'); }
function renderDevDrafts(root){
  const item=devEditId==='new'?{}:devDrafts.find(x=>x.id===devEditId);
  const form=item?devFormShell(item.id?'تعديل المسودة':'مسودة جديدة',`<div class="field full"><label>العنوان <span class="opt">اختياري</span></label><input id="ddTitle" value="${escapeHtml(item.title||'')}" oninput="scheduleDraftAutosave()" placeholder="مثلاً: أفكار تطوير اللجنة الإعلامية"></div><div class="field full"><label>الملاحظة أو الفكرة *</label><textarea id="ddBody" rows="10" oninput="scheduleDraftAutosave()" placeholder="اكتب هنا كل ملاحظاتك وأفكارك…">${escapeHtml(item.body||'')}</textarea></div><div class="field"><label>التصنيف</label><input id="ddCategory" value="${escapeHtml(item.category||'')}" oninput="scheduleDraftAutosave()" placeholder="موقع، اجتماع، فعالية…"></div><div class="field"><label>اللجنة</label><select id="ddCommittee" onchange="scheduleDraftAutosave()">${devOpts(DEV_COMMITTEES,item.committee||'عام')}</select></div><div class="field"><label>رابط ملف أو صورة</label><input id="ddLink" type="url" value="${escapeHtml(item.link||'')}" oninput="scheduleDraftAutosave()" placeholder="Google Drive أو أي رابط"></div><div class="field"><label><input id="ddPinned" type="checkbox" ${item.pinned?'checked':''} onchange="scheduleDraftAutosave()"> تثبيت المسودة في الأعلى</label></div><div class="field full"><div class="dev-meta" id="draftSaveState">${item.id?'آخر حفظ: '+devFmt(item.updatedAt):'يبدأ الحفظ التلقائي بعد كتابة الملاحظة'}</div></div>`,'saveDevDraft'):`<button class="btn btn-primary" onclick="devNew()">+ مسودة جديدة</button>`;
  root.innerHTML=form+devToolbar()+`<div class="dev-list" id="devList"></div>`;
  const q=devSearchQ.toLowerCase();
  const list=devDrafts.filter(x=>!!x.archived===devShowArchived&&(!q||((x.title||'')+' '+(x.body||'')+' '+(x.category||'')).toLowerCase().includes(q))).sort((a,b)=>(Number(!!b.pinned)-Number(!!a.pinned))||(b.updatedAt||'').localeCompare(a.updatedAt||''));
  $('#devList').innerHTML=list.length?list.map(x=>`<div class="dev-item"><div class="dev-item-head"><h3>${x.pinned?'📌 ':''}${escapeHtml(x.title||'ملاحظة بلا عنوان')}</h3><span class="dev-badge">${escapeHtml(x.category||x.committee||'عام')}</span></div><div class="dev-notes">${escapeHtml(x.body||'')}</div><div class="dev-meta">${escapeHtml(x.committee||'عام')} · آخر تعديل: ${devFmt(x.updatedAt)}</div><div class="dev-actions">${x.link?`<button class="btn btn-ghost btn-sm" onclick="window.open('${escapeHtml(x.link)}','_blank','noopener')">فتح المرفق</button>`:''}<button class="btn btn-ghost btn-sm" onclick="devEditId='${x.id}';renderDevCenter()">تعديل</button><button class="btn btn-ghost btn-sm" onclick="devArchive('draft','${x.id}')">${x.archived?'إعادة من الأرشيف':'أرشفة'}</button></div></div>`).join(''):'<div class="empty"><div class="txt">لا توجد مسودات أو ملاحظات</div></div>';
}
function draftFormData(){return {title:devVal('ddTitle'),body:devVal('ddBody'),category:devVal('ddCategory'),committee:devVal('ddCommittee')||'عام',link:devVal('ddLink'),pinned:!!($('#ddPinned')&&$('#ddPinned').checked)};}
async function saveDevDraft(silent=false){const data=draftFormData();if(!data.body){if(!silent)toast('اكتب الملاحظة أولاً');return;}const now=new Date().toISOString();let x=devDrafts.find(v=>v.id===devEditId);if(!x){x={id:devId('draft'),createdAt:now,archived:false};devDrafts.push(x);devEditId=x.id;}Object.assign(x,data,{updatedAt:now});await saveDevDrafts();if(silent){const s=$('#draftSaveState');if(s)s.textContent='حُفظت تلقائياً: '+devFmt(now);}else{devEditId=null;renderDevCenter();toast('تم حفظ المسودة');}}
function scheduleDraftAutosave(){clearTimeout(devDraftSaveTimer);const s=$('#draftSaveState');if(s)s.textContent='جارٍ انتظار الحفظ…';devDraftSaveTimer=setTimeout(()=>saveDevDraft(true),800);}
function renderDevUpdates(root){
  const item=devEditId==='new'?{}:devUpdates.find(x=>x.id===devEditId); const form=item?devFormShell(item.id?'تعديل التحديث':'إضافة تحديث',`<div class="field"><label>عنوان التحديث *</label><input id="duTitle" value="${escapeHtml(item.title||'')}"></div><div class="field"><label>رقم الإصدار *</label><input id="duVersion" value="${escapeHtml(item.version||'')}"></div><div class="field"><label>تاريخ التحديث</label><input id="duDate" type="date" value="${escapeHtml(item.date||today())}"></div><div class="field"><label>اللجنة</label><select id="duCommittee">${devOpts(DEV_COMMITTEES,item.committee||'عام')}</select></div><div class="field"><label>الحالة</label><select id="duStatus">${devOpts(['تحت التجربة','معتمد'],item.status||'تحت التجربة')}</select></div><div class="field"><label>الملفات المعدلة</label><input id="duFiles" value="${escapeHtml(item.files||'')}" placeholder="app.js, index.html"></div><div class="field full"><label>الإضافات والإصلاحات</label><textarea id="duNotes" rows="4">${escapeHtml(item.notes||'')}</textarea></div>`,'saveDevUpdate'):`<button class="btn btn-primary" onclick="devNew()">+ إضافة تحديث</button>`;
  root.innerHTML=form+devToolbar()+`<div class="dev-list" id="devList"></div>`; const q=devSearchQ.toLowerCase(); const list=devUpdates.filter(x=>!!x.archived===devShowArchived&&(!q||(x.title+' '+x.version+' '+(x.notes||'')).toLowerCase().includes(q))).sort((a,b)=>(b.date||b.createdAt).localeCompare(a.date||a.createdAt));
  $('#devList').innerHTML=list.length?list.map(x=>`<div class="dev-item"><div class="dev-item-head"><h3>${escapeHtml(x.title)}</h3><span class="dev-badge">الإصدار ${escapeHtml(x.version)}</span></div><div class="dev-meta">${escapeHtml(x.status)} · ${escapeHtml(x.committee)} · ${fmtDate(x.date)}<br>الملفات: ${escapeHtml(x.files||'—')}<br>آخر تعديل: ${devFmt(x.updatedAt)}</div>${x.notes?`<div class="dev-notes">${escapeHtml(x.notes)}</div>`:''}<div class="dev-actions"><button class="btn btn-ghost btn-sm" onclick="devEditId='${x.id}';renderDevCenter()">تعديل</button><button class="btn btn-ghost btn-sm" onclick="devArchive('update','${x.id}')">${x.archived?'إعادة من الأرشيف':'أرشفة'}</button></div></div>`).join(''):'<div class="empty"><div class="txt">لا توجد تحديثات</div></div>';
}
async function saveDevUpdate(){ const title=devVal('duTitle'),version=devVal('duVersion');if(!title||!version){toast('العنوان ورقم الإصدار مطلوبان');return;}const now=new Date().toISOString();let x=devUpdates.find(v=>v.id===devEditId);if(!x){x={id:devId('update'),createdAt:now,archived:false};devUpdates.push(x);}Object.assign(x,{title,version,date:devVal('duDate'),committee:devVal('duCommittee'),status:devVal('duStatus'),files:devVal('duFiles'),notes:devVal('duNotes'),updatedAt:now});await saveDevUpdates();devEditId=null;renderDevCenter();toast('تم حفظ التحديث');}
function renderDevVersions(root){
  const item=devEditId==='new'?{}:devVersions.find(x=>x.id===devEditId);const form=item?devFormShell(item.id?'تعديل سجل النسخة':'إضافة سجل نسخة',`<div class="field"><label>رقم الإصدار *</label><input id="dvVersion" value="${escapeHtml(item.version||'')}"></div><div class="field"><label>اسم النسخة</label><input id="dvName" value="${escapeHtml(item.name||'')}"></div><div class="field"><label>اسم ملف ZIP</label><input id="dvZip" value="${escapeHtml(item.zipName||'')}"></div><div class="field"><label>رابط الملف</label><input id="dvLink" type="url" value="${escapeHtml(item.link||'')}"></div><div class="field full"><label>ملاحظات النسخة</label><textarea id="dvNotes" rows="4">${escapeHtml(item.notes||'')}</textarea></div>`,'saveDevVersion'):`<div class="dev-actions"><button class="btn btn-primary" onclick="devNew()">+ إضافة سجل نسخة</button><button class="btn btn-ghost" onclick="downloadProjectZip()">تنزيل ملفات المشروع الحالية ZIP</button></div>`;
  root.innerHTML=form+devToolbar()+`<div class="dev-list" id="devList"></div>`;const q=devSearchQ.toLowerCase();const list=devVersions.filter(x=>!!x.archived===devShowArchived&&(!q||(x.version+' '+(x.name||'')+' '+(x.zipName||'')).toLowerCase().includes(q))).sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''));
  $('#devList').innerHTML=list.length?list.map(x=>`<div class="dev-item ${x.approved?'dev-approved':''}"><div class="dev-item-head"><h3>${escapeHtml(x.name||x.zipName||'نسخة مشروع')}</h3><span class="dev-badge">${escapeHtml(x.version)}</span></div>${x.approved?'<div class="dev-approved-mark">✓ النسخة الحالية المعتمدة</div>':''}<div class="dev-meta">أضيفت: ${devFmt(x.createdAt)}${x.approved?`<br>اعتمدت: ${devFmt(x.approvedAt)}`:''}<br>ملف ZIP: ${escapeHtml(x.zipName||'—')}</div>${x.notes?`<div class="dev-notes">${escapeHtml(x.notes)}</div>`:''}<div class="dev-actions">${x.link?`<button class="btn btn-ghost btn-sm" onclick="window.open('${escapeHtml(x.link)}','_blank','noopener')">فتح ملف ZIP</button>`:''}<button class="btn btn-ghost btn-sm" onclick="devEditId='${x.id}';renderDevCenter()">تعديل</button>${!x.approved&&!x.archived?`<button class="btn btn-primary btn-sm" onclick="approveDevVersion('${x.id}')">اعتماد هذه النسخة</button>`:''}<button class="btn btn-ghost btn-sm" onclick="devArchive('version','${x.id}')">${x.archived?'إعادة من الأرشيف':'أرشفة'}</button></div></div>`).join(''):'<div class="empty"><div class="txt">لا توجد نسخ مسجلة</div></div>';
}
async function saveDevVersion(){const version=devVal('dvVersion');if(!version){toast('رقم الإصدار مطلوب');return;}const now=new Date().toISOString();let x=devVersions.find(v=>v.id===devEditId);if(!x){x={id:devId('version'),createdAt:now,approved:false,approvedAt:null,archived:false};devVersions.push(x);}Object.assign(x,{version,name:devVal('dvName'),zipName:devVal('dvZip'),link:devVal('dvLink'),notes:devVal('dvNotes'),updatedAt:now});await saveDevVersions();devEditId=null;renderDevCenter();toast('تم حفظ سجل النسخة');}
async function approveDevVersion(id){if(!confirm('اعتماد هذه النسخة وإلغاء اعتماد النسخة السابقة؟'))return;const now=new Date().toISOString();devVersions.forEach(x=>{x.approved=x.id===id;x.approvedAt=x.id===id?now:null;});await saveDevVersions();renderDevCenter();toast('تم اعتماد النسخة');}
function renderCandidates(root){
  const item=devEditId==='new'?{}:memberCandidates.find(x=>x.id===devEditId);const form=item?devFormShell(item.id?'تعديل الاسم والبيانات':'إضافة اسم وبيانات',`<div class="field"><label>الاسم *</label><input id="dcName" value="${escapeHtml(item.name||'')}"></div><div class="field"><label>رقم الهاتف</label><div class="phone-wrap"><select id="dcCode" class="country-select">${countryOptions((splitPhone(item.phone||'').code)||'973')}</select><input id="dcPhone" inputmode="numeric" value="${escapeHtml((splitPhone(item.phone||'').local)||'')}"></div></div><div class="field"><label>المنطقة</label><input id="dcArea" value="${escapeHtml(item.area||'')}"></div><div class="field"><label>البريد الإلكتروني</label><input id="dcEmail" type="email" value="${escapeHtml(item.email||'')}"></div><div class="field full"><label>العنوان</label><input id="dcAddress" value="${escapeHtml(item.address||'')}"></div><div class="field"><label>نوع العضوية المقترح</label><select id="dcType">${devOpts(['عادي','شرفي','كادر'],item.type||'عادي')}</select></div><div class="field"><label>المسؤول عن المتابعة</label><input id="dcOwner" value="${escapeHtml(item.owner||'')}"></div><div class="field"><label>حالة المتابعة</label><select id="dcStatus">${devOpts(DEV_CANDIDATE_STATUS,item.status||'اسم جديد')}</select></div><div class="field full"><label>الملاحظات</label><textarea id="dcNotes" rows="4">${escapeHtml(item.notes||'')}</textarea></div>`,'saveCandidate'):`<button class="btn btn-primary" onclick="devNew()">+ تسجيل اسم جديد</button>`;
  root.innerHTML=form+devToolbar(`<select id="devStatusFilter" onchange="devSetStatus(this.value)"><option value="">كل الحالات</option>${devOpts(DEV_CANDIDATE_STATUS,devStatusQ)}</select>`)+`<div class="dev-list" id="devList"></div>`;const q=devSearchQ.toLowerCase(),st=devStatusQ;const list=memberCandidates.filter(x=>!!x.archived===devShowArchived&&(!q||(x.name+' '+(x.phone||'')+' '+(x.area||'')).toLowerCase().includes(q))&&(!st||x.status===st)).sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''));
  $('#devList').innerHTML=list.length?list.map(x=>`<div class="dev-item"><div class="dev-item-head"><h3>${escapeHtml(x.name)}</h3><span class="dev-badge">${escapeHtml(x.status)}</span></div><div class="dev-meta">${x.phone?`<span dir="ltr">${escapeHtml(x.phone)}</span>`:'بلا رقم هاتف'} · ${escapeHtml(x.area||'المنطقة غير محددة')} · ${escapeHtml(x.type||'نوع العضوية غير محدد')}<br>${x.email?escapeHtml(x.email)+' · ':''}${x.address?escapeHtml(x.address)+'<br>':''}المتابعة: ${escapeHtml(x.owner||'—')} · آخر تعديل: ${devFmt(x.updatedAt)}${x.memberId?`<br>رقم العضو المرتبط: ${escapeHtml(x.memberId)} · التحويل: ${devFmt(x.convertedAt)}`:''}</div>${x.notes?`<div class="dev-notes">${escapeHtml(x.notes)}</div>`:''}<div class="dev-actions"><button class="btn btn-ghost btn-sm" onclick="devEditId='${x.id}';renderDevCenter()">تعديل</button>${x.phone&&x.status!=='تم تحويله إلى عضو'&&!x.archived?`<button class="btn btn-primary btn-sm" onclick="convertCandidate('${x.id}')">استكمال البيانات وإضافته كعضو رسمي</button>`:''}<button class="btn btn-ghost btn-sm" onclick="devArchive('candidate','${x.id}')">${x.archived?'إعادة من الأرشيف':'أرشفة'}</button></div></div>`).join(''):'<div class="empty"><div class="txt">لا توجد أسماء مسجلة</div></div>';
}
async function saveCandidate(){const name=devVal('dcName');if(!name){toast('الاسم مطلوب');return;}const raw=toEnglishDigits(devVal('dcPhone')).replace(/\D/g,'');const phone=raw?'+'+(devVal('dcCode')||'973')+raw:'';if(phone){const dup=members.find(m=>normalizePhone(m.phone)===normalizePhone(phone));if(dup){toast(`الرقم موجود في ملف العضو: ${dup.name}`);return;}const other=memberCandidates.find(x=>x.id!==devEditId&&x.phone&&normalizePhone(x.phone)===normalizePhone(phone));if(other){toast(`الرقم موجود لدى الاسم: ${other.name}`);return;}}const now=new Date().toISOString();let x=memberCandidates.find(v=>v.id===devEditId);if(!x){x={id:devId('candidate'),createdAt:now,archived:false,memberId:null,convertedAt:null};memberCandidates.push(x);}let status=devVal('dcStatus');if(phone&&status==='اسم جديد')status='تم الحصول على الرقم';Object.assign(x,{name,phone,area:devVal('dcArea'),email:devVal('dcEmail'),address:devVal('dcAddress'),type:devVal('dcType')||'عادي',owner:devVal('dcOwner'),notes:devVal('dcNotes'),status,updatedAt:now});await saveMemberCandidates();devEditId=null;renderDevCenter();toast('تم حفظ الاسم والبيانات');}
function convertCandidate(id){const x=memberCandidates.find(v=>v.id===id);if(!x||!x.phone){toast('أضف رقم الهاتف أولاً');return;}const dup=members.find(m=>normalizePhone(m.phone)===normalizePhone(x.phone));if(dup){toast(`الرقم موجود في ملف العضو: ${dup.name}`);return;}openAddMember();pendingCandidateId=id;const f=$('#addForm');if(f){f.elements.name.value=x.name||'';f.elements.area.value=x.area||'';f.elements.email.value=x.email||'';f.elements.address.value=x.address||'';if(x.type)f.elements.type.value=x.type;const p=splitPhone(x.phone);const cc=$('#addCountryCode');if(cc)cc.value=p.code||'973';f.elements.phone.value=p.local||'';}toast('أكمل البيانات ثم احفظ العضو الرسمي');}
async function devArchive(kind,id){let arr,save;if(kind==='idea'){arr=devIdeas;save=saveDevIdeas;}else if(kind==='draft'){arr=devDrafts;save=saveDevDrafts;}else if(kind==='update'){arr=devUpdates;save=saveDevUpdates;}else if(kind==='version'){arr=devVersions;save=saveDevVersions;}else{arr=memberCandidates;save=saveMemberCandidates;}const x=arr.find(v=>v.id===id);if(!x)return;if(kind==='version'&&x.approved&&!x.archived){toast('اعتمد نسخة أخرى قبل أرشفة النسخة الحالية');return;}x.archived=!x.archived;x.updatedAt=new Date().toISOString();await save();renderDevCenter();toast(x.archived?'تمت الأرشفة':'تمت الإعادة من الأرشيف');}

/* ═══════════ Init ═══════════ */
function fillCountrySelects(){
  const opts=countryOptions('');
  const add=$('#addCountryCode'); if(add) add.innerHTML=`<option value="" disabled selected>اختر الدولة</option>`+opts;
  const edit=$('#editCountryCode'); if(edit) edit.innerHTML=opts;
  const fam=$('#famCountryCode'); if(fam){ fam.innerHTML=opts; fam.value='973'; }
}
(async ()=>{
  await loadData();
  if(window.CloudSync) CloudSync.reapply();   // بيانات السحابة لها الأولوية
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
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('service-worker.js').then(reg=>{
      // ابحث عن تحديث عند كل فتح للتطبيق
      reg.update().catch(()=>{});
      document.addEventListener('visibilitychange',()=>{ if(!document.hidden) reg.update().catch(()=>{}); });
      // إذا وصلت نسخة جديدة، فعّلها فوراً
      reg.addEventListener('updatefound',()=>{
        const sw=reg.installing; if(!sw) return;
        sw.addEventListener('statechange',()=>{
          if(sw.state==='installed' && navigator.serviceWorker.controller) sw.postMessage('SKIP_WAITING');
        });
      });
    }).catch(()=>{});
    // أعد تحميل الصفحة مرة واحدة عند تولّي النسخة الجديدة
    let reloaded=false;
    navigator.serviceWorker.addEventListener('controllerchange',()=>{
      if(reloaded) return; reloaded=true; location.reload();
    });
  });
}
