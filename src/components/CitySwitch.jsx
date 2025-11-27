// src/components/CitySwitch.jsx - اصلاح RTL

import React from 'react';
import { CITY_KEYS } from '../js/location.js';

const CitySwitch = ({ currentCityKey, cities, onCityChange }) => {
    return (
        // 💡 justify-end برای چینش در سمت راست
        <div className="flex justify-center mb-6 "> 
            {/* 💡 space-x-2 space-x-reverse برای چینش دکمه‌ها از راست به چپ */}
            <div className="bg-white p-2 rounded-xl shadow-lg flex space-x-2  border border-gray-200">
                {CITY_KEYS.map((key) => (
                    <button
                        key={key}
                        onClick={() => onCityChange(key)}
                        className={`
                            px-4 py-2 text-sm font-bold rounded-lg transition-colors duration-200
                            ${currentCityKey === key
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-gray-700 hover:bg-gray-100'
                            }
                        `}
                    >
                        {cities[key].name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CitySwitch;