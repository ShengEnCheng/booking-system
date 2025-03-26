'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  roomId: string;
  roomName: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ roomId, roomName }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    startDate: new Date(),
    startTime: '09:00',
    endDate: new Date(),
    endTime: '10:00',
    purpose: '',
    attendees: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }
    if (!formData.company.trim()) {
      newErrors.company = '請輸入公司名稱';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '請輸入聯絡電話';
    }
    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件地址';
    }
    if (!formData.purpose.trim()) {
      newErrors.purpose = '請輸入使用目的';
    }
    if (!formData.attendees || parseInt(formData.attendees) < 1) {
      newErrors.attendees = '請輸入有效的參加人數';
    }

    // 檢查日期時間
    const startDateTime = new Date(`${formData.startDate.toISOString().split('T')[0]}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate.toISOString().split('T')[0]}T${formData.endTime}`);
    
    if (endDateTime <= startDateTime) {
      newErrors.endTime = '結束時間必須晚於開始時間';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('請檢查表單填寫是否正確');
      return;
    }

    setIsSubmitting(true);
    try {
      const startDateTime = new Date(`${formData.startDate.toISOString().split('T')[0]}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate.toISOString().split('T')[0]}T${formData.endTime}`);

      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          roomName,
          roomId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('預約成功！');
        router.push('/booking/success');
      } else {
        toast.error(data.message || '預約失敗');
      }
    } catch (error) {
      console.error('預約失敗:', error);
      toast.error('預約失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除該欄位的錯誤
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 生成時間選項（每半小時）
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2).toString().padStart(2, '0');
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl macaron-shadow">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">預約{roomName}</h2>
        <p className="text-[#6B7280]">請填寫以下資訊完成育成空間預約</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#4A4A4A] mb-1">
              預約人姓名 <span className="text-[#E8B4BC]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full rounded-lg border ${
                errors.name ? 'border-[#E8B4BC]' : 'border-[#E8B4BC]/30'
              } shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white`}
              placeholder="請輸入姓名"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[#E8B4BC]">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-[#4A4A4A] mb-1">
              公司名稱 <span className="text-[#E8B4BC]">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`block w-full rounded-lg border ${
                errors.company ? 'border-[#E8B4BC]' : 'border-[#E8B4BC]/30'
              } shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white`}
              placeholder="請輸入公司名稱"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-[#E8B4BC]">{errors.company}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#4A4A4A] mb-1">
              聯絡電話 <span className="text-[#E8B4BC]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`block w-full rounded-lg border ${
                errors.phone ? 'border-[#E8B4BC]' : 'border-[#E8B4BC]/30'
              } shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white`}
              placeholder="請輸入聯絡電話"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-[#E8B4BC]">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#4A4A4A] mb-1">
              電子郵件 <span className="text-[#E8B4BC]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full rounded-lg border ${
                errors.email ? 'border-[#E8B4BC]' : 'border-[#E8B4BC]/30'
              } shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white`}
              placeholder="請輸入電子郵件"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-[#E8B4BC]">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
              開始時間 <span className="text-[#E8B4BC]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date: Date | null) => date && setFormData(prev => ({ ...prev, startDate: date }))}
                  dateFormat="yyyy/MM/dd"
                  minDate={new Date()}
                  className="block w-full rounded-lg border border-[#E8B4BC]/30 shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white"
                />
              </div>
              <div>
                <select
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[#E8B4BC]/30 shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white"
                >
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-1">
              結束時間 <span className="text-[#E8B4BC]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date: Date | null) => date && setFormData(prev => ({ ...prev, endDate: date }))}
                  dateFormat="yyyy/MM/dd"
                  minDate={formData.startDate}
                  className="block w-full rounded-lg border border-[#E8B4BC]/30 shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white"
                />
              </div>
              <div>
                <select
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`block w-full rounded-lg border ${
                    errors.endTime ? 'border-[#E8B4BC]' : 'border-[#E8B4BC]/30'
                  } shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white`}
                >
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            {errors.endTime && (
              <p className="mt-1 text-sm text-[#E8B4BC]">{errors.endTime}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-[#4A4A4A] mb-1">
            使用目的 <span className="text-[#E8B4BC]">*</span>
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows={3}
            className={`block w-full rounded-lg border ${
              errors.purpose ? 'border-[#E8B4BC]' : 'border-[#E8B4BC]/30'
            } shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white`}
            placeholder="請簡述使用目的"
          />
          {errors.purpose && (
            <p className="mt-1 text-sm text-[#E8B4BC]">{errors.purpose}</p>
          )}
        </div>

        <div>
          <label htmlFor="attendees" className="block text-sm font-medium text-[#4A4A4A] mb-1">
            參加人數 <span className="text-[#E8B4BC]">*</span>
          </label>
          <input
            type="number"
            id="attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            min="1"
            className={`block w-full rounded-lg border ${
              errors.attendees ? 'border-[#E8B4BC]' : 'border-[#E8B4BC]/30'
            } shadow-sm focus:border-[#E8B4BC] focus:ring-[#E8B4BC] sm:text-sm p-2.5 bg-white`}
            placeholder="請輸入參加人數"
          />
          {errors.attendees && (
            <p className="mt-1 text-sm text-[#E8B4BC]">{errors.attendees}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-[#E8B4BC]/30 rounded-lg text-[#4A4A4A] bg-white hover:bg-[#F9D5E5]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E8B4BC] transition-colors duration-300"
            disabled={isSubmitting}
          >
            取消
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-[#E8B4BC] text-white rounded-lg hover:bg-[#E5A1AB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E8B4BC] transition-colors duration-300 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? '提交中...' : '確認預約'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm; 