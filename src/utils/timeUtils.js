// src/utils/timeUtils.js
// توابع کمکی برای مدیریت زمان، روزها و وضعیت جلسات

import { DAY_NAMES } from '../js/location';

// تابع کمکی: تبدیل تاریخ و ساعت (HH:MM) به یک آبجکت Date
const createDateTime = (date, timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0); // تنظیم ساعت، دقیقه، ثانیه و میلی‌ثانیه
    return newDate;
};

// -----------------------------------------------------------------------

/**
 * تبدیل آرایه روزهای کوتاه انگلیسی به یک رشته فارسی خوانا.
 * (همان تابع قبلی)
 * ... (کد این تابع بدون تغییر است) ...
 */
export const formatDaysToPersian = (days) => {
    if (!days || days.length === 0) return 'نامشخص';
    
    // کلیدهای روزها برای شناسایی الگوها
    const allDaysKeys = Object.keys(DAY_NAMES);
    
    // 1. هر روز هفته
    if (days.length === allDaysKeys.length) {
        return 'هر روز هفته';
    }
    
    // 2. شنبه تا پنجشنبه (6 روز کاری)
    const sixDaysKeys = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
    if (days.length === 6 && days.every(day => sixDaysKeys.includes(day))) {
        return 'شنبه تا پنج‌شنبه';
    }
    
    // 3. روزهای فرد (شنبه، دوشنبه، چهارشنبه، جمعه)
    const oddDaysKeys = ['Sat', 'Mon', 'Wed', 'Fri'];
    if (days.length === 4 && days.every(day => oddDaysKeys.includes(day))) {
        return 'روزهای فرد';
    }
    
    // 4. لیست کردن روزها در غیر این صورت
    return days.map(day => DAY_NAMES[day] || day).join('، ');
};

/**
 * تعیین زمان شروع و پایان موثر جلسه بر اساس تاریخ فعلی (برای نمایش در لحظه).
 * (همان تابع قبلی)
 * ... (کد این تابع بدون تغییر است) ...
 */
export const getEffectiveTime = (location, date = new Date()) => {
    const currentMonth = date.getMonth() + 1; 
    const currentDayKey = date.toLocaleDateString('en-US', { weekday: 'short' }); 

    let effectiveTime = { 
        startTime: location.startTime, 
        endTime: location.endTime, 
        note: ''
    };
    
    // 1. بررسی زمان‌بندی فصلی (seasonalTimes)
    if (location.seasonalTimes) {
        // ... (منطق فصلی قبلی) ...
        for (const rule of location.seasonalTimes) {
            if (rule.startMonth === 7 && rule.endMonth === 12) {
                if (currentMonth >= rule.startMonth && currentMonth <= rule.endMonth) {
                    effectiveTime.startTime = rule.startTime;
                    effectiveTime.endTime = rule.endTime;
                    effectiveTime.note = ' (نیمه دوم سال)';
                    return effectiveTime; 
                }
            }
        }
        effectiveTime.note = ' (نیمه اول سال)';
    }
    
    // 2. بررسی زمان‌بندی روزهای خاص (specialTimes)
    if (location.specialTimes) {
        for (const rule of location.specialTimes) {
            if (rule.days && rule.days.includes(currentDayKey)) {
                effectiveTime.startTime = rule.startTime;
                effectiveTime.endTime = rule.endTime;
                effectiveTime.note = ` (${rule.note})`; 
                return effectiveTime; 
            }
        }
    }
    
    return effectiveTime;
};


// -----------------------------------------------------------------------

/**
 * 💡 تابع جدید: محاسبه وضعیت یک جلسه امروز
 * وضعیت را به یکی از حالت‌های 'LIVE', 'UPCOMING', 'COMPLETED', 'NONE' تبدیل می‌کند.
 * @param {object} location - آبجکت گروه (شامل days, startTime, endTime).
 * @param {Date} now - تاریخ و زمان جاری.
 * @returns {{status: string, timeDiff: number | null, effectiveStart: Date | null, effectiveEnd: Date | null}} - وضعیت جلسه و اختلاف زمانی (بر حسب دقیقه).
 */
export const getSessionStatus = (location, now) => {
    const todayDayKey = now.toLocaleDateString('en-US', { weekday: 'short' });

    // 1. آیا امروز جلسه برگزار می‌شود؟
    if (!location.days.includes(todayDayKey)) {
        // اگر زمان خاصی برای امروز (جمعه یا تعطیل رسمی) تعریف شده باشد
        if (location.specialTimes) {
            const specialRule = location.specialTimes.find(rule => rule.days.includes(todayDayKey));
            if (!specialRule) {
                 return { status: 'NONE', timeDiff: null, effectiveStart: null, effectiveEnd: null };
            }
        } else {
             return { status: 'NONE', timeDiff: null, effectiveStart: null, effectiveEnd: null };
        }
    }

    // 2. تعیین ساعت شروع و پایان موثر امروز
    const { startTime, endTime } = getEffectiveTime(location, now);

    const sessionStart = createDateTime(now, startTime);
    const sessionEnd = createDateTime(now, endTime);

    // اختلاف زمانی بین الان و شروع جلسه (بر حسب میلی‌ثانیه)
    const diffToStart = sessionStart.getTime() - now.getTime();
    // اختلاف زمانی بین الان و پایان جلسه (بر حسب میلی‌ثانیه)
    const diffToEnd = sessionEnd.getTime() - now.getTime();

    // وضعیت:
    if (diffToStart <= 0 && diffToEnd > 0) {
        // در حال برگزاری (شروع شده و هنوز تمام نشده)
        return { 
            status: 'LIVE', 
            timeDiff: Math.ceil(diffToEnd / (1000 * 60)), // زمان باقی مانده تا پایان (دقیقه)
            effectiveStart: sessionStart, 
            effectiveEnd: sessionEnd 
        };
    } else if (diffToStart > 0) {
        // آینده (هنوز شروع نشده)
        return { 
            status: 'UPCOMING', 
            timeDiff: Math.ceil(diffToStart / (1000 * 60)), // زمان باقی مانده تا شروع (دقیقه)
            effectiveStart: sessionStart, 
            effectiveEnd: sessionEnd 
        };
    } else {
        // تمام شده (گذشته از زمان پایان)
        return { 
            status: 'COMPLETED', 
            timeDiff: null, 
            effectiveStart: sessionStart, 
            effectiveEnd: sessionEnd 
        };
    }
};

/**
 * 💡 تابع جدید: فرمت زمان باقی مانده (دقیقه) به یک رشته خوانا.
 * @param {number} minutes - دقیقه.
 * @returns {string} - رشته (مثلاً "1 ساعت و 30 دقیقه").
 */
export const formatTimeDifference = (minutes) => {
    if (minutes <= 0) return 'همین حالا';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let parts = [];
    if (hours > 0) {
        parts.push(`${hours} ساعت`);
    }
    if (remainingMinutes > 0) {
        parts.push(`${remainingMinutes} دقیقه`);
    }
    
    return parts.length > 0 ? parts.join(' و ') : 'کمتر از 1 دقیقه';
};