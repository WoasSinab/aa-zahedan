// src/data/locations.js - ساختار نهایی داده‌ها با تمام شهرها و زمان‌بندی دقیق

// --- تعاریف کمکی برای روزها و فصل‌ها ---
const ALL_DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const SIX_DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu']; // شنبه تا پنجشنبه
const FOUR_DAYS_MON_THU = ['Mon', 'Tue', 'Wed', 'Thu']; // دوشنبه تا پنجشنبه
const THREE_DAYS_SAT_MON_WED = ['Sat', 'Mon', 'Wed']; // شنبه، دوشنبه، چهارشنبه
const ODD_DAYS = ['Sat', 'Mon', 'Wed', 'Fri']; // روزهای فرد (شنبه، دوشنبه، چهارشنبه، جمعه)
const HALF_YEAR = 'half-year'; // برای نیمه اول و دوم سال


// --- ۱. داده‌های گروه‌های زاهدان (با زمان‌بندی دقیق) ---
const zahedanLocations = [
  // 1. گروه همدلان
  { id: 1, name: 'گروه همدلان زاهدان', address: 'بلوار شهید رجایی- نبش شهید رجایی ۶٢- فرهنگ سرای انقلاب', url: 'https://nshn.ir/sbgL4U2Vrkst',
    startTime: '18:00', endTime: '19:30', days: ALL_DAYS },
  
  // 2. گروه وحدت
  { id: 2, name: 'گروه وحدت زاهدان', address: 'انتهای خیابان پهلوانی- نبش پهلوانی ٣۵- شهرداری منطقه چهار- فرهنگ سرای وحدت', url: 'https://nshn.ir/7bgv3gPVsBGG', 
    startTime: '19:30', endTime: '21:00', days: ALL_DAYS },
  
  // 3. گروه عصر دانشگاه
  { id: 3, name: 'گروه عصر دانشگاه', address: 'بلوار دانشگاه- روبه روی دانشگاه ٣- مرکز پیشگیری از آسیب‌های اجتماعی', url: 'https://nshn.ir/vbgSBRQVrvuv', 
    startTime: '18:00', endTime: '19:30', days: SIX_DAYS }, // شنبه تا پنجشنبه
  
  // 4. گروه شب دانشگاه
  { id: 4, name: 'گروه شب دانشگاه', address: 'بلوار دانشگاه- روبه روی دانشگاه ٣- مرکز پیشگیری از آسیب‌های اجتماعی', url: 'https://nshn.ir/vbgSBRQVrvuv', 
    startTime: '20:00', endTime: '21:30', days: ALL_DAYS },
  
  // 5. گروه صبح زندگی (صبح آزادگان) - حالت خاص: جمعه و تعطیلات رسمی
  { id: 5, name: 'گروه صبح زندگی', address: 'تقاطع بلوار آزادگان و ثارالله- داخل پارک- ساختمان آجر سفال سه درب', url: 'https://nshn.ir/QbgvjQQV2u9W', 
    startTime: '07:00', endTime: '08:15', days: SIX_DAYS, // شنبه تا پنجشنبه
    specialTimes: [{ days: ['Fri'], startTime: '09:00', endTime: '10:15', note: 'تعطیل رسمی/جمعه' }] },
  
  // 6. گروه ظهر آزادگان
  { id: 6, name: 'گروه ظهر آزادگان', address: 'تقاطع بلوار آزادگان و ثارالله- داخل پارک- ساختمان آجر سفال سه درب', url: 'https://nshn.ir/QbgvjQQV2u9W', 
    startTime: '13:00', endTime: '14:30', days: SIX_DAYS }, // شنبه تا پنجشنبه
  
  // 7. گروه عصر آزادگان
  { id: 7, name: 'گروه عصر آزادگان', address: 'تقاطع بلوار آزادگان و ثارالله- داخل پارک- ساختمان آجر سفال سه درب', url: 'https://nshn.ir/QbgvjQQV2u9W', 
    startTime: '18:00', endTime: '19:30', days: ALL_DAYS },
  
  // 8. گروه شب آزادگان
  { id: 8, name: 'گروه شب آزادگان', address: 'تقاطع بلوار آزادگان و ثارالله- داخل پارک- ساختمان آجر سفال سه درب', url: 'https://nshn.ir/QbgvjQQV2u9W', 
    startTime: '20:00', endTime: '21:30', days: ALL_DAYS },
  
  // 9. گروه آرامش زاهدان
  { id: 9, name: 'گروه آرامش زاهدان', address: 'بلوار شهید مطهری- استادیوم 17 شهریور-زیر پله های سکوی تماشاچیان (هیئت دوچرخه سواران )', url: 'https://nshn.ir/QbgsjjeVsrbc', 
    startTime: '18:30', endTime: '20:00', days: ALL_DAYS },
  
  // 10. گروه ظهر ۱۷ شهریور زاهدان
  { id: 10, name: 'گروه ظهر ۱۷ شهریور زاهدان', address: 'بلوار شهید مطهری- استادیوم 17 شهریور-زیر پله های سکوی تماشاچیان (هیئت دوچرخه سواران )', url: 'https://nshn.ir/QbgsjjeVsrbc', 
    startTime: '13:30', endTime: '15:00', days: ALL_DAYS },
  
  // 11. گروه اتحاد زاهدان
  { id: 11, name: 'گروه اتحاد زاهدان', address: 'خیابان شریعتی شمالی ، کوچه غلام سرور ، کنار مسجد الزهراء (ص) ، ساختمان منبع آب قدیم', url: 'https://nshn.ir/7bg1-52VrmlK', 
    startTime: '18:00', endTime: '19:30', days: ALL_DAYS },
  
  // 12. گروه آزادی شیرآباد زاهدان
  { id: 12, name: 'گروه آزادی شیرآباد زاهدان', address: 'روبروی محله مجدیه ۱۸، سمن سرای سلامت', url: 'https://nshn.ir/QbgfNuWVsCcz', 
    startTime: '18:00', endTime: '19:30', days: ALL_DAYS },
  
  // 13. گروه فرزندان نور بانوان
  { id: 13, name: 'گروه بانوان آزادگان', address: 'تقاطع بلوار آزادگان و ثارالله- داخل پارک- ساختمان آجر سفال سه درب', url: 'https://nshn.ir/QbgvjQQV2u9W', 
    startTime: '15:00', endTime: '17:30', days: THREE_DAYS_SAT_MON_WED }, // شنبه، دوشنبه، چهارشنبه
  
  // 14. گروه رهایی (دایی آباد)
  { id: 14, name: 'گروه رهایی زاهدان', address: 'دایی آباد، فلکه کامبوزیا، مسجد جامع عزیزی', url: 'https://nshn.ir/7bgWNZWV2pR2',
    startTime: '17:00', endTime: '18:30', days: ALL_DAYS },
  
  // 15. گروه رضوان زاهدان (آدرس فاضلی) - گروه جدید
  { id: 15, name: 'گروه رضوان زاهدان', address: 'بلوار شهید فاضلی ، فاضلی 8 ، انتهای میلان سمت چپ ، کنار آپاراتی ، درب آبی و زرد', url: 'https://nshn.ir/7bgWNZWV2pR2',
    startTime: '16:30', endTime: '18:00', days: ALL_DAYS },
];

// --- ۲. داده‌های گروه‌های خاش ---
const khashLocations = [
  // 201. گروه اتحاد خاش (آدرس جدید)
  { id: 201, name: 'گروه اتحاد خاش', address: 'بلوار شهید سلیمانی، نبش خیابان مکی', url: 'https://nshn.ir/samplekhash1', 
    startTime: '15:00', endTime: '16:00', days: ODD_DAYS }, // روزهای فرد
    
  // 202. گروه رهایی خاش (دو زمان متفاوت برای دو نیمه سال)
  { id: 202, name: 'گروه رهایی خاش', address: 'شهید سلیمانی، نبش خیابان مکی', url: 'https://nshn.ir/samplekhash2', 
    startTime: '19:00', endTime: '20:30', days: ALL_DAYS, // نیمه اول سال (پیش‌فرض)
    seasonalTimes: [
        { season: HALF_YEAR, startMonth: 7, endMonth: 12, startTime: '18:00', endTime: '19:30' } // نیمه دوم سال (مهر تا اسفند)
    ]
  },
];

// --- ۳. داده‌های گروه‌های زابل ---
const zabolLocations = [
  // 301. گروه امید زابل (دو زمان متفاوت برای دو نیمه سال)
  { id: 301, name: 'گروه امید زابل', address: 'خیابان بهداشت، روبروی چاپ پاپیروس، مجمع معلولین، درب آبی رنگ', url: 'https://nshn.ir/samplezabol1', 
    startTime: '19:00', endTime: '20:30', days: ALL_DAYS, // نیمه اول سال (پیش‌فرض)
    seasonalTimes: [
        { season: HALF_YEAR, startMonth: 7, endMonth: 12, startTime: '18:00', endTime: '19:30' } // نیمه دوم سال (مهر تا اسفند)
    ]
  },
  
  // 302. گروه ندای باران بانوان زابل
  { id: 302, name: 'گروه ندای باران بانوان زابل', address: 'خیابان بهداشت، روبروی چاپ پاپیروس، مجمع معلولین، درب آبی رنگ', url: 'https://nshn.ir/samplezabol2', 
    startTime: '15:30', endTime: '17:00', days: ODD_DAYS }, // روزهای فرد
];

// --- ۴. داده‌های گروه‌های چابهار ---
const chabaharLocations = [
  // 401. گروه معجزه صبح (حالت خاص: جمعه)
  { id: 401, name: 'گروه معجزه صبح', address: 'چابهار، چهارراه یخسازی، جمهوری جنوبی ۲۴، پارک صداقت', url: 'https://nshn.ir/samplechabahar1', 
    startTime: '08:00', endTime: '09:00', days: SIX_DAYS, // هر روز صبح (شنبه تا پنجشنبه)
    specialTimes: [{ days: ['Fri'], startTime: '10:00', endTime: '11:00', note: 'جمعه‌ها' }] },

  // 402. گروه ندای آرامش
  { id: 402, name: 'گروه ندای آرامش', address: 'چابهار، چهارراه یخسازی، جمهوری جنوبی ۲۴، پارک صداقت', url: 'https://nshn.ir/samplechabahar2', 
    startTime: '18:00', endTime: '19:30', days: ALL_DAYS },
    
  // 403. گروه هشیاران
  { id: 403, name: 'گروه هشیاران', address: 'چابهار، چهارراه یخسازی، جمهوری جنوبی ۲۴، پارک صداقت', url: 'https://nshn.ir/samplechabahar3', 
    startTime: '20:00', endTime: '21:30', days: ALL_DAYS },
    
  // 404. گروه مهر کلوه
  { id: 404, name: 'گروه مهر کلوه', address: 'بخش پیر سهراب، روستای بنارو، روبروی مدرسه شهید قاسم سلیمانی', url: 'https://nshn.ir/samplechabahar4', 
    startTime: '18:00', endTime: '19:30', days: ALL_DAYS },
];


// ساختار اصلی داده‌ها
export const CITIES = {
  'zahedan': { name: 'زاهدان', locations: zahedanLocations },
  'khash': { name: 'خاش', locations: khashLocations },
  'zabol': { name: 'زابل', locations: zabolLocations },
  'chabahar': { name: 'چابهار', locations: chabaharLocations }
};

// ترتیب کلیدهای شهرها: زاهدان به عنوان اولین (راست‌ترین) دکمه
export const CITY_KEYS = ['zahedan', 'khash', 'zabol', 'chabahar'];

// نگاشت انگلیسی به فارسی برای نمایش روزها
export const DAY_NAMES = {
  'Sat': 'شنبه',
  'Sun': 'یکشنبه',
  'Mon': 'دوشنبه',
  'Tue': 'سه‌شنبه',
  'Wed': 'چهارشنبه',
  'Thu': 'پنج‌شنبه',
  'Fri': 'جمعه',
};

// لیست کامل تمام مکان‌ها (برای استفاده در LiveSessionTracker)
export const ALL_LOCATIONS = [
  ...zahedanLocations.map(loc => ({ ...loc, cityKey: 'zahedan', cityName: 'زاهدان' })),
  ...khashLocations.map(loc => ({ ...loc, cityKey: 'khash', cityName: 'خاش' })),
  ...zabolLocations.map(loc => ({ ...loc, cityKey: 'zabol', cityName: 'زابل' })),
  ...chabaharLocations.map(loc => ({ ...loc, cityKey: 'chabahar', cityName: 'چابهار' })),
];