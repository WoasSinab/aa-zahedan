// src/components/LocationItem.jsx - به‌روزرسانی نهایی برای راست‌چین و جابجایی فلش

import React from 'react';

const LocationItem = ({ location, isSelected, onToggle }) => {
  
  const buttonClasses = `
    // w-full و پدینگ باقی می‌ماند
    w-full p-4 rounded-xl transition duration-300 
    // 💡 تغییر کلیدی: flex-row-reverse برای جابجایی فلش به سمت چپ
    flex flex-row-reverse justify-between items-center 
    font-extrabold text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-opacity-50 shadow-md hover:shadow-lg
    ${isSelected
      ? 'bg-indigo-600 text-white focus:ring-indigo-400' 
      : 'bg-white hover:bg-indigo-50 text-gray-800 focus:ring-indigo-300'
    }
  `;

  const arrowClasses = `
    w-5 h-5 transition-transform duration-300 
    ${isSelected ? 'rotate-180 text-white' : 'rotate-0 text-gray-500'}
  `;
  
  const contentClasses = `
    mt-2 overflow-hidden transition-all duration-500 ease-in-out
    ${isSelected ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
  `;

  return (
    <li className="py-2 border-b border-gray-100 last:border-b-0">
      
      <button
        onClick={() => onToggle(location.id)}
        className={buttonClasses}
      >
        {/* 1. نام گروه: در سمت راست قرار می‌گیرد */}
        <span className="text-right flex-grow pr-2"> 
            {location.name}
        </span>

        {/* 2. آیکون فلش: به دلیل flex-row-reverse در سمت چپ قرار می‌گیرد */}
        <svg 
          className={arrowClasses} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* قسمت نمایش جزئیات */}
      <div className={contentClasses}>
        {/* 💡 text-right برای راست‌چین کردن محتوای داخلی */}
        <div className="p-4 bg-indigo-50 rounded-b-xl border border-indigo-200 border-t-0 shadow-inner text-right">
          
          <p className="text-xs font-semibold text-indigo-700 mb-1">
            **آدرس محل برگزاری:**
          </p>
          {/* 💡 text-right برای راست‌چین کردن متن آدرس */}
          <p className="text-sm text-gray-800 mb-4 leading-6 text-right"> 
            {location.address}
          </p>
          
          {/* دکمه مشاهده در نشان - همچنان وسط چین می‌ماند */}
          <a 
            href={location.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-bold text-sm shadow-md"
          >
            مشاهده موقعیت دقیق در نقشه نشان
          </a>
          
        </div>
      </div>
    </li>
  );
};

export default LocationItem;