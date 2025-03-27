import type { NextApiRequest, NextApiResponse } from 'next';
import { getCalendarEvents } from '../../utils/googleCalendar';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: '缺少必要的日期參數' });
    }

    if (!process.env.CALENDAR_ID) {
      console.error('未設置 CALENDAR_ID 環境變量');
      return res.status(500).json({ error: '未設置日曆 ID' });
    }

    console.log('收到日曆事件請求:', {
      startDate,
      endDate,
      calendarId: process.env.CALENDAR_ID,
      hasCredentials: !!process.env.GOOGLE_CREDENTIALS
    });

    const events = await getCalendarEvents(startDate, endDate);

    console.log('成功獲取日曆事件:', {
      count: events.length,
      firstEvent: events[0] ? {
        summary: events[0].summary,
        start: events[0].start,
        end: events[0].end
      } : null
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error('處理日曆事件請求失敗:', error);
    if (error instanceof Error) {
      return res.status(500).json({ 
        error: '獲取日曆事件失敗',
        details: error.message,
        stack: error.stack,
        calendarId: process.env.CALENDAR_ID,
        hasCredentials: !!process.env.GOOGLE_CREDENTIALS
      });
    }
    return res.status(500).json({ error: '獲取日曆事件失敗' });
  }
} 