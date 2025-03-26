'use client';

import React from 'react';
import Layout from '../components/Layout';
import RoomList from '../components/RoomList';

export default function Home() {
  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-[#4A4A4A] text-center mb-8">
          育成空間預約
        </h1>
        <RoomList />
      </div>
    </Layout>
  );
}
