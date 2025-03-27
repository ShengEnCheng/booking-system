import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAvailability } from '../../utils/googleCalendar';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '方法不允許' });
  }

  try {
    // 測試檢查明天上午的可用性
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = tomorrow.toISOString().split('T')[0];
    
    const isAvailable = await checkAvailability(date, '09:00', '10:00', '測試空間');
    
    res.status(200).json({ 
      message: '連接成功',
      isAvailable,
      date
    });
  } catch (error) {
    console.error('測試錯誤:', error);
    res.status(500).json({ 
      message: '連接失敗',
      error: error instanceof Error ? error.message : '未知錯誤'
    });
  }
} 