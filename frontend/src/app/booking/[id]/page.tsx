'use client';

import React from 'react';
import Layout from '../../../components/Layout';
import BookingForm from '../../../components/BookingForm';

const rooms = {
  '1': '創新發想基地',
  '2': '共創空間',
  '3': '中會議室',
  '4': '小會議室'
};

interface Props {
  params: {
    id: string;
  };
}

export default function BookingPage({ params }: Props) {
  const roomInfo = {
    id: params.id,
    name: rooms[params.id as keyof typeof rooms] || '未知空間'
  };

  return (
    <Layout>
      <BookingForm roomId={roomInfo.id} roomName={roomInfo.name} />
    </Layout>
  );
} 