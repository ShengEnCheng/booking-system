import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';

// 載入環境變數
dotenv.config();

async function testCalendarConnection() {
  try {
    console.log('開始測試 Google Calendar API 連接...');
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    console.log('使用的 Calendar ID:', calendarId);

    if (!calendarId) {
      throw new Error('未設置 GOOGLE_CALENDAR_ID 環境變量');
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'credentials.json'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // 測試創建事件
    const testEvent = {
      summary: '測試預約 - 中會議室',
      description: '這是一個測試預約，用於驗證系統功能',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'Asia/Taipei',
      },
      end: {
        dateTime: new Date(Date.now() + 60 * 60000).toISOString(), // 1小時後
        timeZone: 'Asia/Taipei',
      },
      location: '長庚大學創新育成中心 - 中會議室',
    };

    console.log('正在創建測試事件...');
    const createResponse = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: testEvent,
    });

    console.log('測試事件創建成功！');
    console.log('事件連結:', createResponse.data.htmlLink);

    // 列出最近的事件
    console.log('\n正在獲取最近的事件...');
    const listResponse = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.log('找到', listResponse.data.items?.length || 0, '個未來事件');
    
    // 清理測試事件
    console.log('\n正在清理測試事件...');
    await calendar.events.delete({
      calendarId: calendarId,
      eventId: createResponse.data.id!,
    });

    console.log('測試事件已清理');
    console.log('\n測試完成！API 連接正常！');

  } catch (error) {
    console.error('測試失敗:', error);
  }
}

// 執行測試
testCalendarConnection();
