// src/components/LiveSessionTracker.jsx - اصلاح RTL و ریسپانسیو بودن

import React, { useState, useEffect } from 'react';
import { ALL_LOCATIONS, DAY_NAMES } from '../js/location.js';
import { getSessionStatus, formatTimeDifference } from '../utils/timeUtils';
import { FaClock, FaCheckCircle, FaRunning, FaChevronRight } from 'react-icons/fa'; // FaChevronRight برای RTL

// تعداد جلسات آینده برای نمایش
const MAX_UPCOMING_SESSIONS = 3;

// کامپوننت داخلی برای نمایش یک جلسه
const SessionCard = ({ session, status }) => {
    const { timeDiff, effectiveStart, effectiveEnd } = session;

    let cardClasses = "p-3 rounded-lg shadow-md mb-3 flex gap-12 items-center justify-between transition-colors";
    let icon;
    let timeText;
    
    switch (status) {
        case 'LIVE':
            cardClasses += " bg-red-100 border-r-4 border-red-600 animate-pulse";
            icon = <FaRunning className="w-5 h-5 text-red-600 mr-3" />; // 💡 mr-3
            timeText = `پایان: ${effectiveEnd.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}`;
            break;
        case 'UPCOMING':
            cardClasses += " bg-green-100 border-r-4 border-green-600 ";
            icon = <FaClock className="w-5 h-5 text-green-600 mr-3" />; // 💡 mr-3
            timeText = ` شروع در ${formatTimeDifference(timeDiff)}`;
            break;
        case 'COMPLETED':
            cardClasses += " bg-gray-100 border-r-4 border-gray-400 opacity-75";
            icon = <FaCheckCircle className="w-5 h-5 text-gray-500 mr-3" />; // 💡 mr-3
            timeText = 'امروز به پایان رسید';
            break;
        default:
            return null;
    }

    return (
        <div className={cardClasses}>
            {icon}
            <div className="flex-grow text-right"> {/* 💡 text-right */}
                <p className="font-extrabold text-sm text-gray-800">{session.name} ({session.cityName})</p>
                <p className="text-xs text-gray-600 mt-0.5">ساعت: {effectiveStart.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="text-left font-bold text-xs text-gray-700"> {/* 💡 text-left برای نمایش زمان انگلیسی */}
                {timeText}
            </div>
        </div>
    );
};


const LiveSessionTracker = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); 

        return () => clearInterval(timerId);
    }, []);

    const todaySessions = ALL_LOCATIONS
        .map(loc => ({
            ...loc,
            ...getSessionStatus(loc, currentTime)
        }))
        .filter(session => session.status !== 'NONE')
        .sort((a, b) => a.effectiveStart.getTime() - b.effectiveStart.getTime()); 

    const liveSessions = todaySessions.filter(s => s.status === 'LIVE');
    const upcomingSessions = todaySessions.filter(s => s.status === 'UPCOMING').slice(0, MAX_UPCOMING_SESSIONS);
    const completedSessionsCount = todaySessions.filter(s => s.status === 'COMPLETED').length;

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
        <section className="my-6 mb-20 p-4 bg-white rounded-xl shadow-2xl border-t-8 border-indigo-500 text-right"> {/* 💡 text-right */}
            <h3 className="text-2xl font-black text-indigo-700 my-6 mb-12 flex gap-4 items-center justify-end"> {/* 💡 justify-end */}
                <span className='ml-2'>ردیابی جلسات امروز ({persianDayName})</span> {/* 💡 ml-2 */}
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

            {/* 3. جلسات تمام شده */}
            {completedSessionsCount > 0 && (
                <div className="mt-4 flex justify-between items-center text-gray-500">
                    {/* 💡 تغییر چینش متن و آیکون */}
                    <FaChevronRight className="w-4 h-4" /> {/* 💡 FaChevronRight برای RTL */}
                    <p className="font-semibold text-sm">
                        {completedSessionsCount} جلسه امروز به پایان رسیده است.
                    </p>
                </div>
            )}
            
            {/* اگر هیچکدام در حال برگزاری یا آینده نبودند */}
            {liveSessions.length === 0 && upcomingSessions.length === 0 && completedSessionsCount > 0 && (
                <div className="mt-4 text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 font-semibold">
                        تمام جلسات امروز به پایان رسیده‌اند.
                    </p>
                </div>
            )}

        </section>
    );
};

export default LiveSessionTracker;