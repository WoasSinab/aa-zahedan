// src/components/LocationList.jsx

import React from 'react';
import LocationItem from './LocationItem'; 

const LocationList = ({ locations, cityName }) => {
    
    // 💡 مهم: چک کردن اینکه آیا locations یک آرایه معتبر است
    if (!locations || !Array.isArray(locations) || locations.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg my-6 text-center text-gray-500">
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {cityName}
                </h3>
                <p>
                    در حال حاضر هیچ گروهی برای شهر {cityName} در لیست ثبت نشده است.
                </p>
            </div>
        );
    }

    return (
        <section className="my-6">
            <h3 className="text-2xl font-black text-gray-800 mb-6 border-b-2 pb-1 flex justify-end">
                گروه‌های فعال در {cityName} ({locations.length} گروه)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 💡 اجرای map به صورت ایمن */}
                {locations.map((location) => (
                    <LocationItem 
                        key={location.id} 
                        location={location} 
                    />
                ))}

            </div>
        </section>
    );
};

export default LocationList;