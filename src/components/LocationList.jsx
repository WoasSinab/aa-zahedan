// src/components/LocationList.jsx

import React, { useState } from 'react';
import LocationItem from '../components/LocationItem.jsx';
import { locations } from '../js/location.js'; 

const LocationList = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  // State برای نگهداری متن جستجو
  const [searchTerm, setSearchTerm] = useState(''); 
  
  const handleToggle = (id) => {
    setSelectedLocationId(prevId => prevId === id ? null : id);
  };
  
  // تابع برای پاک کردن فیلد جستجو
  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedLocationId(null);
  }

  // منطق فیلتر کردن
  const filteredLocations = locations.filter(location => {
    // گارد برای اطمینان از سلامت داده
    if (!location || !location.name) return false;
    
    // اگر فیلد جستجو خالی باشد، همه را برمی‌گرداند
    if (searchTerm.trim() === '') return true;

    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    
    // فیلتر بر اساس نام گروه و آدرس محل برگزاری
    const matchesName = location.name.toLowerCase().includes(lowerCaseSearch);
    const matchesAddress = location.address.toLowerCase().includes(lowerCaseSearch);

    return matchesName || matchesAddress;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10"> 
      <h1 className="text-center text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 border-b-4 border-indigo-600 pb-3">
        📍 لیست گروه‌های زاهدان
      </h1>
      
      {/* بخش جستجو با دکمه پاک کردن */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="جستجو بر اساس نام گروه یا آدرس..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // بستن کارت‌های باز هنگام جستجو
            setSelectedLocationId(null); 
          }}
          className="w-full p-3 pr-10 border-2 border-indigo-300 rounded-xl 
                     focus:outline-none focus:ring-4 focus:ring-indigo-200 
                     text-gray-800 placeholder-gray-500 font-medium text-right transition-all shadow-inner"
        />
        
        {/* آیکون جستجو یا دکمه پاک کردن */}
        {searchTerm ? (
          // دکمه پاک کردن (Clear Button)
          <button 
            onClick={handleClearSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-indigo-600 hover:bg-indigo-100"
            aria-label="Clear Search"
          >
            {/* آیکون X */}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        ) : (
          // آیکون جستجو
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500 pointer-events-none" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>

      {/* رندر لیست فیلتر شده */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <ul className="divide-y divide-gray-100">
          {filteredLocations.map((location) => {
            // گارد برای اطمینان از سلامت داده
            if (!location || !location.name) return null; 
            
            return (
              <LocationItem 
                key={location.id} 
                location={location} 
                isSelected={selectedLocationId === location.id} 
                onToggle={handleToggle} 
              />
            );
          })}
        </ul>
        
        {/* نمایش پیام در صورت عدم یافتن نتیجه */}
        {filteredLocations.length === 0 && searchTerm && (
          <p className="p-6 text-center text-gray-500 italic font-semibold">
             نتیجه‌ای برای "{searchTerm}" پیدا نشد.
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationList;