'use client';

import React from 'react';
import Link from 'next/link';
import Layout from '../../../components/Layout';

export default function BookingSuccess() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-12 w-12 text-[#A7D7C5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#4A4A4A] mb-4">
            預約成功！
          </h2>
          <p className="text-[#6B7280] mb-8">
            您的育成空間預約已提交成功。我們會盡快與您聯繫確認。
          </p>
          <Link
            href="/"
            className="block w-full bg-[#E8B4BC] text-white px-4 py-2 rounded-lg hover:bg-[#E5A1AB] transition-colors duration-300"
          >
            返回首頁
          </Link>
        </div>
      </div>
    </Layout>
  );
} 