// src/App.jsx

import React, { useState } from 'react';
import { CITIES, CITY_KEYS } from './js/location.js';
import Header from './components/Header';
import CitySwitch from './components/CitySwitch';
import LocationList from './components/LocationList';
import LiveSessionTracker from './components/LiveSessionTracker'; // 💡 ایمپورت جدید

function App() {
  // زاهدان به عنوان شهر پیش فرض انتخاب شده است
  const [currentCityKey, setCurrentCityKey] = useState(CITY_KEYS[0]); 
  const currentCityData = CITIES[currentCityKey];

  const handleCityChange = (cityKey) => {
    setCurrentCityKey(cityKey);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-vazir">
      {/* هدر */}
      <Header 
        currentCityKey={currentCityKey} 
        cities={CITIES} 
        onCityChange={handleCityChange} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* کامپوننت سوییچ شهر */}
        <CitySwitch 
          currentCityKey={currentCityKey} 
          cities={CITIES} 
          onCityChange={handleCityChange} 
        />
        
        {/* 💡 کامپوننت ردیابی جلسات زنده (جدید) */}
        <LiveSessionTracker /> 

        {/* لیست مکان‌ها */}
        <LocationList 
          locations={currentCityData.locations} 
          cityName={currentCityData.name} 
        />
        
      </main>
    </div>
  );
}

export default App;