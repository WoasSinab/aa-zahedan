// src/components/Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-20 shadow-md bg-white/95 backdrop-blur-sm transition-colors border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center space-x-2 space-x-reverse select-none">
          <h1 className="text-xl md:text-2xl font-black text-indigo-600">
            جلسات زاهدان
          </h1>
        </div>
        {/* آیکون مکان */}
        <span className="text-gray-500">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </span>
      </div>
    </header>
  );
};
export default Header;