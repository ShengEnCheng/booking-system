import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();
    
    // 发送请求到后端 API
    const response = await fetch('http://localhost:3001/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || '預約失敗' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { success: false, message: '預約失敗，請稍後再試' },
      { status: 500 }
    );
  }
} 