// src/components/LiveSessionTracker.jsx - اصلاح نمایش لیست جلسات تمام شده

import React, { useState, useEffect } from 'react';
import { ALL_LOCATIONS, DAY_NAMES } from '../js/location.js';
import { getSessionStatus, formatTimeDifference } from '../utils/timeUtils';
// استفاده از FaChevronDown برای نمایش وضعیت باز و بسته شدن
import { FaClock, FaCheckCircle, FaRunning, FaChevronDown } from 'react-icons/fa'; 

// تعداد جلسات آینده برای نمایش
const MAX_UPCOMING_SESSIONS = 3;

// کامپوننت داخلی برای نمایش یک جلسه
const SessionCard = ({ session, status }) => {
    const { timeDiff, effectiveStart, effectiveEnd } = session;

    let cardClasses = "p-3 rounded-lg shadow-md mb-3 flex items-center justify-between transition-colors gap-6";
    let icon;
    let timeText;
    
    switch (status) {
        case 'LIVE':
            cardClasses += " bg-red-100 border-r-4 border-red-600 animate-pulse";
            icon = <FaRunning className="w-5 h-5 text-red-600 mr-3" />;
            // نمایش زمان پایان به جای زمان باقی‌مانده (برای سادگی)
            timeText = `پایان: ${effectiveEnd.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}`;
            break;
        case 'UPCOMING':
            cardClasses += " bg-green-100 border-r-4 border-green-600";
            icon = <FaClock className="w-5 h-5 text-green-600 mr-3" />;
            timeText = `شروع در ${formatTimeDifference(timeDiff)}`;
            break;
        case 'COMPLETED':
            cardClasses += " bg-gray-100 border-r-4 border-gray-400 opacity-75";
            icon = <FaCheckCircle className="w-5 h-5 text-gray-500 mr-3" />;
            // نمایش زمان پایان جلسه تمام شده
            timeText = `ساعت پایان: ${effectiveEnd.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}`;
            break;
        default:
            return null;
    }

    return (
        <div className={cardClasses}>
            {icon}
            <div className="flex-grow text-right">
                <p className="font-extrabold text-sm text-gray-800">{session.name} ({session.cityName})</p>
                <p className="text-xs text-gray-600 mt-0.5">ساعت شروع: {effectiveStart.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="text-left font-bold text-xs text-gray-700 flex-shrink-0">
                {timeText}
            </div>
        </div>
    );
};


const LiveSessionTracker = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    // 💡 وضعیت جدید: برای کنترل نمایش لیست جلسات تمام شده
    const [showCompleted, setShowCompleted] = useState(false); 

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); 

        return () => clearInterval(timerId);
    }, []);

    // 1. محاسبه وضعیت تمام جلسات امروز
    const todaySessions = ALL_LOCATIONS
        .map(loc => ({
            ...loc,
            ...getSessionStatus(loc, currentTime)
        }))
        .filter(session => session.status !== 'NONE')
        .sort((a, b) => a.effectiveStart.getTime() - b.effectiveStart.getTime()); 

    // 2. فیلتر کردن بر اساس وضعیت
    const liveSessions = todaySessions.filter(s => s.status === 'LIVE');
    const upcomingSessions = todaySessions.filter(s => s.status === 'UPCOMING').slice(0, MAX_UPCOMING_SESSIONS);
    // 💡 لیست کامل جلسات تمام شده
    const completedSessions = todaySessions.filter(s => s.status === 'COMPLETED');
    const completedSessionsCount = completedSessions.length;

    // عنوان روز امروز
    const todayDayKey = currentTime.toLocaleDateString('en-US', { weekday: 'short' });
    const persianDayName = DAY_NAMES[todayDayKey];

    if (todaySessions.length === 0) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg my-6 text-center text-gray-500">
                <p>امروز {persianDayName} هیچ جلسه‌ای در لیست ثبت نشده است.</p>
            </div>
        );
    }
    
    return (
        <section className="my-6 p-4 bg-white rounded-xl shadow-2xl border-t-8 border-indigo-500 text-right">
            <h3 className="text-2xl font-black text-indigo-700 mb-4 flex items-center justify-end">
                <span className='ml-2 my-6'>ردیابی جلسات امروز ({persianDayName})</span>
                <FaClock className="w-6 h-6" />
            </h3>
            
            {/* 1. جلسات در حال برگزاری */}
            {liveSessions.length > 0 && (
                <div className="mt-4 border-b pb-2">
                    <h4 className="font-extrabold text-lg text-red-600 mb-2 text-right">🔴 در حال برگزاری ({liveSessions.length})</h4>
                    {liveSessions.map(s => (
                        <SessionCard key={s.id} session={s} status="LIVE" />
                    ))}
                </div>
            )}

            {/* 2. جلسات آینده */}
            {upcomingSessions.length > 0 && (
                <div className="mt-4 border-b pb-2">
                    <h4 className="font-extrabold text-lg text-green-600 mb-2 text-right">🟢 جلسات آینده ({upcomingSessions.length})</h4>
                    {upcomingSessions.map(s => (
                        <SessionCard key={s.id} session={s} status="UPCOMING" />
                    ))}
                </div>
            )}

            {/* 3. جلسات تمام شده (بخش قابل باز و بسته شدن) */}
            {completedSessionsCount > 0 && (
                <div className="mt-4">
                    {/* 💡 تبدیل نمایش به دکمه برای باز و بسته شدن */}
                    <button 
                        onClick={() => setShowCompleted(!showCompleted)} 
                        className="gap-4 w-full flex justify-end items-center text-gray-500 hover:text-gray-700 transition-colors p-2 -mx-2 rounded-lg hover:bg-gray-100"
                    >
                        <p className="font-semibold text-sm">
                            {completedSessionsCount}  لیست جلسات به پایان رسیده - تعداد
                        </p>
                        {/* 💡 تغییر آیکون بر اساس وضعیت باز و بسته شدن */}
                        <FaChevronDown className={`w-4 h-4 transition-transform ${showCompleted ? 'rotate-180' : 'rotate-0'}`} />
                    </button>

                    {/* 💡 نمایش لیست کامل جلسات تمام شده */}
                    {showCompleted && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                            {completedSessions.map(s => (
                                <SessionCard key={s.id} session={s} status="COMPLETED" />
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            {/* اگر هیچکدام در حال برگزاری یا آینده نبودند */}
            {liveSessions.length === 0 && upcomingSessions.length === 0 && completedSessionsCount > 0 && (
                <div className="mt-4 text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 font-semibold">
                        تمام جلسات مهم امروز نمایش داده شده‌اند. برای مشاهده لیست کامل، بخش "جلسات تمام شده" را باز کنید.
                    </p>
                </div>
            )}
        </section>
    );
};

export default LiveSessionTracker;