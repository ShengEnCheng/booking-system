'use client';

import React from 'react';
import Navigation from './Navigation';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8F3F7]">
      <Navigation />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white macaron-shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[#4A4A4A] text-sm">
            © {new Date().getFullYear()} 長庚大學創新育成中心. All rights reserved.
          </p>
        </div>
      </footer>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: '#F9D5E5',
            color: '#4A4A4A',
            borderRadius: '1rem',
          },
          success: {
            duration: 3000,
            style: {
              background: '#A7D7C5',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#E8B4BC',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout; 