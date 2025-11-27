// src/components/LocationItem.jsx - اصلاح RTL و فواصل آیکون‌ها

import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaRegCalendarAlt } from 'react-icons/fa'; 
import { getEffectiveTime, formatDaysToPersian } from '../utils/timeUtils'; 

// کامپوننت داخلی برای نمایش جزئیات زمان‌بندی
const SessionDetails = ({ location }) => {
    const daysString = formatDaysToPersian(location.days);
    const { startTime, endTime, note } = getEffectiveTime(location);

    let timeTitle = 'ساعت برگزاری:';
    if (location.seasonalTimes) {
        timeTitle = 'ساعت (فصلی):';
    } else if (location.specialTimes) {
        timeTitle = 'ساعت (با زمان‌های خاص):';
    }

    return (
        <div className="mt-2 text-gray-700 text-sm">
            
            {/* روزهای برگزاری */}
            <div className="flex justify-end mb-1 text-sm">
                {/* 💡 آیکون در سمت راست (mr-2) */}
                <FaRegCalendarAlt className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5 mr-2" /> 
                <p className="font-semibold text-gray-800 mr-1">
                    روزهای برگزاری: 
                    <span className="font-normal mr-1">{daysString}</span>
                </p>
            </div>

            {/* ساعت برگزاری */}
            <div className="flex justify-end text-sm">
                {/* 💡 آیکون در سمت راست (mr-2) */}
                <FaRegClock className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5 mr-2" /> 
                <p className="font-semibold text-gray-800 mr-1">
                    {timeTitle}
                    <span className="font-normal mr-1">
                        {startTime} تا {endTime}
                        {note && <span className="text-xs text-gray-500">{note}</span>}
                    </span>
                </p>
            </div>
            
        </div>
    );
};

// کامپوننت اصلی LocationItem
const LocationItem = ({ location }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-r-4 border-indigo-500">
      
      {/* عنوان گروه */}
      <h2 className="text-lg font-extrabold text-gray-800 mb-2 border-b pb-1 text-right">
        {location.name}
      </h2>

      {/* روزها و ساعت‌ها */}
      {(location.days && location.startTime && location.endTime) && (
          <SessionDetails location={location} />
      )}

      {/* آدرس */}
      <div className="flex justify-end mt-3 text-sm text-gray-600 text-right">
        {/* 💡 آیکون در سمت راست (mr-2) */}
        <FaMapMarkerAlt className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5 mr-2" /> 
        <p className="mr-1 leading-relaxed">
          {location.address}
        </p>
      </div>

      {/* دکمه مسیریابی */}
      <div className="mt-4 flex justify-end">
        <a 
          href={location.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
        >
          {/* 💡 آیکون سمت چپ متن (mr-1) */}
          <span className="mr-1">مسیریابی (نشان)</span>
          {/* 💡 تغییر transform برای آیکون جهت */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default LocationItem;