import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';

// 確保環境變量被載入
dotenv.config();

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

if (!CALENDAR_ID) {
  throw new Error('GOOGLE_CALENDAR_ID environment variable is not set');
}

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

export async function addEventToCalendar(bookingData: {
  name: string;
  company: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendees: number;
  roomName: string;
  email: string;
  phone: string;
}) {
  try {
    const event = {
      summary: `${bookingData.roomName} - ${bookingData.company}`,
      description: `
預約人：${bookingData.name}
公司：${bookingData.company}
聯絡電話：${bookingData.phone}
電子郵件：${bookingData.email}
使用目的：${bookingData.purpose}
參加人數：${bookingData.attendees}人
      `.trim(),
      start: {
        dateTime: new Date(bookingData.startTime).toISOString(),
        timeZone: 'Asia/Taipei',
      },
      end: {
        dateTime: new Date(bookingData.endTime).toISOString(),
        timeZone: 'Asia/Taipei',
      }
    };

    console.log('Using Calendar ID:', CALENDAR_ID);
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding event to calendar:', error);
    throw error;
  }
}

// 檢查時段是否已被預約
export async function checkTimeSlotAvailability(startTime: string, endTime: string, roomName: string) {
  try {
    console.log('Checking availability for:', {
      calendarId: CALENDAR_ID,
      startTime,
      endTime,
      roomName
    });
    
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date(startTime).toISOString(),
      timeMax: new Date(endTime).toISOString(),
      q: roomName, // 搜尋特定會議室的預約
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items?.length === 0;
  } catch (error) {
    console.error('Error checking calendar availability:', error);
    throw error;
  }
} 