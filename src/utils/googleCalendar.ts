import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// 從環境變量獲取認證信息
let credentials;
try {
  const credentialsStr = process.env.GOOGLE_CREDENTIALS || '{}';
  credentials = JSON.parse(credentialsStr);
  
  // 修復私鑰格式
  if (credentials.private_key) {
    // 確保私鑰的格式正確
    credentials.private_key = credentials.private_key
      .replace(/\\n/g, '\n')
      .replace(/^['"]|['"]$/g, '');
  }

  console.log('成功解析 Google 認證信息:', {
    client_email: credentials.client_email,
    has_private_key: !!credentials.private_key,
    private_key_length: credentials.private_key?.length,
    private_key_start: credentials.private_key?.substring(0, 50)
  });
} catch (error) {
  console.error('解析 Google 認證信息失敗:', error);
  throw new Error('Google 認證配置錯誤');
}

if (!credentials.client_email || !credentials.private_key) {
  console.error('缺少必要的 Google 認證信息:', {
    has_client_email: !!credentials.client_email,
    has_private_key: !!credentials.private_key
  });
  throw new Error('缺少必要的 Google 認證信息');
}

// 創建 JWT 客戶端
const client = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/calendar.events'],
});

// 創建日曆客戶端
const calendar = google.calendar({ version: 'v3', auth: client });

export async function getCalendarEvents(startDate: string, endDate: string) {
  try {
    // 確保客戶端已經認證
    await client.authorize();

    console.log('正在獲取日曆事件:', {
      calendarId: process.env.CALENDAR_ID,
      startDate,
      endDate
    });

    const response = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
      timeMin: startDate,
      timeMax: endDate,
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 2500
    });

    console.log('成功獲取日曆事件:', {
      count: response.data.items?.length || 0,
      nextPageToken: !!response.data.nextPageToken
    });
    
    return response.data.items || [];
  } catch (error) {
    console.error('獲取日曆事件失敗:', error);
    if (error instanceof Error) {
      console.error('錯誤詳情:', {
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

export async function createCalendarEvent(bookingData: any) {
  if (!process.env.CALENDAR_ID) {
    console.error('未設置 CALENDAR_ID 環境變量');
    throw new Error('未設置日曆 ID');
  }

  console.log('準備創建日曆事件，日曆 ID:', process.env.CALENDAR_ID);

  // 格式化日期和時間
  const startDateTime = new Date(`${bookingData.date}T${bookingData.startTime}:00+08:00`);
  const endDateTime = new Date(`${bookingData.date}T${bookingData.endTime}:00+08:00`);

  // 檢查時間是否有效
  if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
    console.error('無效的日期或時間格式:', {
      date: bookingData.date,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime
    });
    throw new Error('無效的日期或時間格式');
  }

  // 檢查結束時間是否在開始時間之後
  if (endDateTime <= startDateTime) {
    console.error('結束時間早於或等於開始時間:', {
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString()
    });
    throw new Error('結束時間必須在開始時間之後');
  }

  const event = {
    summary: `空間預約：${bookingData.spaceName}`,
    description: `
      申請者：${bookingData.name}
      聯繫電話：${bookingData.phone}
      Email：${bookingData.email}
      參加人數：${bookingData.participants}
    `,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Asia/Taipei',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Asia/Taipei',
    },
    colorId: bookingData.colorId,
  };

  try {
    console.log('正在創建日曆事件:', {
      calendarId: process.env.CALENDAR_ID,
      event: {
        ...event,
        start: {
          ...event.start,
          dateTime: new Date(event.start.dateTime).toLocaleString('zh-TW'),
        },
        end: {
          ...event.end,
          dateTime: new Date(event.end.dateTime).toLocaleString('zh-TW'),
        },
      },
    });

    const response = await calendar.events.insert({
      calendarId: process.env.CALENDAR_ID,
      requestBody: event,
    });

    console.log('成功創建日曆事件:', response.data);
    return response.data;
  } catch (error) {
    console.error('創建日曆事件失敗:', error);
    throw error;
  }
}

// 檢查時段是否已被預約
export async function checkAvailability(date: string, startTime: string, endTime: string, spaceName: string) {
  if (!process.env.CALENDAR_ID) {
    throw new Error('未設置日曆 ID');
  }

  try {
    const startDateTime = new Date(`${date}T${startTime}:00+08:00`);
    const endDateTime = new Date(`${date}T${endTime}:00+08:00`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      throw new Error('無效的日期或時間格式');
    }

    const response = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
    });

    // 檢查是否有相同空間的預約
    const hasConflict = response.data.items?.some(event => {
      const eventSummary = event.summary || '';
      return eventSummary.includes(spaceName);
    });

    return !hasConflict;
  } catch (error) {
    console.error('檢查可用性失敗:', error);
    throw error;
  }
} 