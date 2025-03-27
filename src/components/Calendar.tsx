import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { zhTW } from 'date-fns/locale';

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  colorId?: string;
}

interface CalendarProps {
  className?: string;
}

export default function Calendar({ className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const startDate = startOfMonth(currentDate).toISOString();
        const endDate = endOfMonth(currentDate).toISOString();

        console.log('正在請求日曆事件:', {
          startDate,
          endDate,
          currentDate: currentDate.toISOString()
        });

        const response = await fetch('/api/calendar-events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate, endDate }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.error('獲取日曆事件失敗:', {
            status: response.status,
            statusText: response.statusText,
            error: responseData
          });
          setEvents([]);
          return;
        }

        console.log('成功獲取日曆事件:', {
          count: responseData.length,
          events: responseData
        });
        
        setEvents(responseData || []);
      } catch (error) {
        console.error('日曆事件獲取錯誤:', error);
        if (error instanceof Error) {
          console.error('錯誤詳情:', {
            message: error.message,
            stack: error.stack
          });
        }
        setEvents([]);
      }
    };

    fetchEvents();
  }, [currentDate]);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start.dateTime);
      return isSameDay(eventDate, day);
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {format(currentDate, 'yyyy年 MM月', { locale: zhTW })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="p-2 text-sm text-gray-600 hover:text-gray-900"
            >
              今天
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-[100px] p-2 border rounded ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className={`text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                  {format(day, 'd')}
                </div>
                <div className="mt-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-800 truncate"
                      title={event.summary}
                    >
                      {event.summary}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 