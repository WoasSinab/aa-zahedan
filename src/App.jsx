// src/App.jsx

import React from 'react';
import LocationList from '../src/components/LocationList';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Intro from '../src/components/Intro';

function App() {
  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 font-vazir relative overflow-hidden`}>
      {/* پترن متحرک کم‌رنگ */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
        style={{ backgroundImage: `url('/pattern.svg')`, backgroundSize: '200px', animation: 'pattern-slow' }}
      ></div>
      
      <Intro /> 
      <Header />
      
      <main className="relative z-10 p-4 md:p-8"> 
        <LocationList />
      </main>
      
      <Footer />
    </div>
  );
}
export default App;