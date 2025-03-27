import type { NextApiRequest, NextApiResponse } from 'next';
import { createCalendarEvent, checkAvailability } from '../../utils/googleCalendar';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '方法不允許' });
  }

  // 驗證請求數據
  const requiredFields = ['name', 'phone', 'email', 'participants', 'date', 'startTime', 'endTime', 'spaceName'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    console.error('缺少必要欄位:', missingFields);
    return res.status(400).json({ 
      message: '缺少必要欄位',
      missingFields 
    });
  }

  // 驗證環境變量
  if (!process.env.GOOGLE_CREDENTIALS) {
    console.error('缺少 GOOGLE_CREDENTIALS 環境變量');
    return res.status(500).json({ 
      message: '系統配置錯誤：缺少 Google 認證信息',
      error: 'Missing credentials'
    });
  }

  if (!process.env.CALENDAR_ID) {
    console.error('缺少 CALENDAR_ID 環境變量');
    return res.status(500).json({ 
      message: '系統配置錯誤：缺少日曆 ID',
      error: 'Missing calendar ID'
    });
  }

  try {
    console.log('收到預約請求:', {
      ...req.body,
      participants: parseInt(req.body.participants)
    });

    // 檢查時段是否已被預約
    const isAvailable = await checkAvailability(
      req.body.date,
      req.body.startTime,
      req.body.endTime,
      req.body.spaceName
    );

    if (!isAvailable) {
      return res.status(400).json({
        message: `${req.body.spaceName} 在該時段已被預約，請選擇其他時間或空間`,
        error: 'Time slot already booked'
      });
    }

    // 創建 Google Calendar 事件
    const event = await createCalendarEvent(req.body);
    console.log('成功創建日曆事件:', event);
    
    res.status(200).json({ 
      message: '預約成功',
      data: {
        ...req.body,
        eventId: event.id
      }
    });
  } catch (error) {
    console.error('預約處理錯誤:', error);
    
    // 根據錯誤類型返回不同的錯誤信息
    if (error instanceof Error) {
      if (error.message.includes('credentials')) {
        return res.status(500).json({ 
          message: '系統配置錯誤，請聯繫管理員',
          error: '認證失敗'
        });
      }
      if (error.message.includes('calendar')) {
        return res.status(500).json({ 
          message: '日曆同步失敗，請稍後再試',
          error: error.message
        });
      }
      if (error.message.includes('無效的日期或時間格式')) {
        return res.status(400).json({ 
          message: '請檢查日期和時間格式是否正確',
          error: error.message
        });
      }
      if (error.message.includes('結束時間必須在開始時間之後')) {
        return res.status(400).json({ 
          message: '結束時間必須在開始時間之後',
          error: error.message
        });
      }
    }

    res.status(500).json({ 
      message: '預約處理失敗',
      error: error instanceof Error ? error.message : '未知錯誤'
    });
  }
} 