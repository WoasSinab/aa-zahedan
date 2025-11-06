// src/components/Footer.jsx - کد نهایی و صحیح

import React from 'react';

const Footer = () => {
  return (
    // ... محتوای فوتر ...
    <footer className="mt-12 py-6 border-t border-gray-200 bg-gray-100 transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <p className="text-sm text-gray-600 font-medium">
          طراحی و توسعه برای جامعه AA
        </p>
        
        <p className="text-xs text-gray-500 mt-1">
          اطلاعات مکان‌ها بر اساس داده‌های عمومی نشان (Neshan)
        </p>
      </div>
    </footer>
  );
};
// 💡 خط حیاتی برای رفع خطا: صادرات پیش‌فرض (Default Export)
export default Footer;