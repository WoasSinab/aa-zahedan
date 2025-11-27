// src/components/Header.jsx - جایگزینی Dropdown با لوگوی ثابت (نسخه بدون پس‌زمینه)

import React from 'react';

// دریافت props: شهر فعلی، لیست شهرها و تابع تغییر (فقط برای سازگاری با App.jsx)
const Header = ({ currentCityKey, cities, onCityChange }) => {
    
  return (
    <header className="sticky top-0 z-20 shadow-md bg-white/95 backdrop-blur-sm transition-colors border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* 2. 💡 لوگوی سمت چپ (نسخه بدون پس‌زمینه) */}
        <div className="flex items-center">
          <img 
            src="https://s6.uupload.ir/files/photo_2025-11-27_18-52-20-removebg-preview_uqk6.png"
            alt="لوگو انجمن"
            className="h-24 w-auto object-contain" // تنظیم ارتفاع مناسب برای هدر
          />
        </div>
        
        {/* 1. نام اصلی برنامه (سمت راست) */}
        <div className="flex items-center space-x-2 space-x-reverse select-none">
          <h1 className="text-xl md:text-2xl font-black text-gray-900">
            شورای ناحیه ۱۱ ایران
          </h1>
        </div>


      </div>
    </header>
  );
};
export default Header;