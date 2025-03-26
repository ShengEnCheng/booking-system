import express from 'express';
import { addEventToCalendar, checkTimeSlotAvailability } from '../services/googleCalendar';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;

    // 檢查時段是否可用
    const isAvailable = await checkTimeSlotAvailability(
      bookingData.startTime,
      bookingData.endTime,
      bookingData.roomName
    );

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: '該時段已被預約，請選擇其他時段',
      });
    }

    // 新增至 Google Calendar
    const event = await addEventToCalendar(bookingData);

    res.json({
      success: true,
      message: '預約成功',
      eventId: event.id,
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: '預約失敗，請稍後再試',
    });
  }
});

export default router; 