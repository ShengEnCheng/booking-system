import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// 從環境變量獲取認證信息
let credentials;
try {
  credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
} catch (error) {
  console.error('解析 Google 認證信息失敗:', error);
  throw new Error('Google 認證配置錯誤');
}

if (!credentials.client_email || !credentials.private_key) {
  throw new Error('缺少必要的 Google 認證信息');
}

const client = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
});

const calendar = google.calendar({ version: 'v3', auth: client });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '方法不允許' });
  }

  const { timeMin, timeMax } = req.body;

  if (!timeMin || !timeMax) {
    return res.status(400).json({ message: '缺少必要的時間參數' });
  }

  try {
    const response = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.status(200).json({ events: response.data.items });
  } catch (error) {
    console.error('獲取日曆事件失敗:', error);
    res.status(500).json({ message: '獲取日曆事件失敗' });
  }
} 