'use client';

import React from 'react';
import Link from 'next/link';

interface Room {
  id: string;
  name: string;
  capacity: {
    min: number;
    max: number;
  };
  description: string;
  equipment: string[];
  isAvailable: boolean;
}

const rooms: Room[] = [
  {
    id: '1',
    name: '創新發想基地',
    capacity: {
      min: 50,
      max: 70
    },
    description: '寬敞的創新空間，適合舉辦大型研討會、創新工作坊和團隊活動',
    equipment: ['投影機', '音響系統', '白板', '視訊會議設備', '活動式桌椅'],
    isAvailable: true
  },
  {
    id: '2',
    name: '共創空間',
    capacity: {
      min: 20,
      max: 30
    },
    description: '彈性的多功能空間，適合團隊協作、小型講座和創意討論',
    equipment: ['投影機', '音響系統', '白板', '視訊會議設備', '模組化傢俱'],
    isAvailable: true
  },
  {
    id: '3',
    name: '中會議室',
    capacity: {
      min: 12,
      max: 16
    },
    description: '專業會議空間，適合商務會議、專案討論和小組簡報',
    equipment: ['投影機', '音響系統', '白板', '視訊會議設備'],
    isAvailable: true
  },
  {
    id: '4',
    name: '小會議室',
    capacity: {
      min: 4,
      max: 6
    },
    description: '溫馨靜謐的空間，適合小組討論、面談和遠端會議',
    equipment: ['電視螢幕', '白板', '視訊會議設備'],
    isAvailable: true
  }
];

const RoomList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl macaron-shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-semibold text-[#4A4A4A]">{room.name}</h3>
                <span className="text-sm font-medium text-[#6B7280] bg-[#F8F3F7] px-3 py-1 rounded-full">
                  {room.capacity.min}-{room.capacity.max}人
                </span>
              </div>
              <p className="text-[#6B7280] mb-4">{room.description}</p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {room.equipment.map((item, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F9D5E5]/20 text-[#4A4A4A]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#E8B4BC]/10">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  room.isAvailable 
                    ? 'bg-[#A7D7C5]/20 text-[#2D6A4F]' 
                    : 'bg-[#E8B4BC]/20 text-[#9D174D]'
                }`}>
                  {room.isAvailable ? '可預約' : '已預約'}
                </span>
                <Link
                  href={`/booking/${room.id}`}
                  className="bg-[#E8B4BC] text-white px-4 py-2 rounded-lg hover:bg-[#E5A1AB] transition-colors duration-300"
                >
                  立即預約
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList; 