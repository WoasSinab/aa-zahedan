// src/components/Intro.jsx - نسخه پیشرفته اینترو

import React, { useState, useEffect } from 'react';

const Intro = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true); // برای مدیریت کلاس‌های انیمیشن

  useEffect(() => {
    // جلوگیری از نمایش مجدد بعد از یک بار دیدن در همان سشن
    if (sessionStorage.getItem('hasSeenIntro')) {
        setIsVisible(false);
        return;
    }
    
    // مدت زمان کل انیمیشن (مثلاً 5 ثانیه)
    const animationDuration = 5000; 

    // محو شدن کامل اینترو پس از پایان انیمیشن
    const timer = setTimeout(() => {
      setIsAnimating(false); // انیمیشن‌ها را خاموش می‌کند (برای opacity-0)
      setTimeout(() => setIsVisible(false), 1000); // 1 ثانیه زمان برای محو شدن کلی
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, animationDuration); 

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null; // اگر کاملا محو شده باشد، رندر نمی‌شود

  return (
    // پوشش دهنده کل صفحه با انیمیشن محو شدن نهایی
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white 
      transition-opacity duration-1000 ease-out 
      ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div className="flex flex-col items-center">
        {/* لوگو - دایره مرکزی و دایره متحرک اطراف */}
        <div className="relative w-28 h-28 mb-4"> {/* اندازه بزرگتر */}
          {/* دایره بیرونی با پالس ملایم */}
          <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse-slow-intro"></div>
          
          {/* دایره مرکزی با انیمیشن Scale و Bounce */}
          <div className="absolute inset-0 bg-indigo-600 rounded-full flex items-center justify-center 
                        transform scale-0 animate-scale-bounce-in shadow-lg">
            <span className="text-5xl font-black text-white">AA</span> {/* فونت بزرگتر */}
          </div>
        </div>
        
        {/* متن "جلسات زاهدان" با انیمیشن Fade In و Slide Up */}
        <p className="mt-8 text-gray-800 text-3xl font-bold animate-fade-slide-in-intro">
          جلسات زاهدان
        </p>
      </div>
    </div>
  );
};
export default Intro;