# 長庚大學創新育成中心育成空間預約系統

## 專案說明
這是一個專為長庚大學創新育成中心開發的育成空間預約系統，提供簡單直觀的預約介面，整合 Google Calendar 進行空間管理。

## 功能特點
- 即時查看空間可用狀態
- 線上預約系統
- Google Calendar 整合
- 自動化郵件通知
- 響應式設計，支援各種裝置

## 可預約空間
1. 創新發想基地（50-70人）
   - 適合：大型研討會、創新工作坊和團隊活動
   - 設備：投影機、音響系統、白板、視訊會議設備、活動式桌椅

2. 共創空間（20-30人）
   - 適合：團隊協作、小型講座和創意討論
   - 設備：投影機、音響系統、白板、視訊會議設備、模組化傢俱

3. 中會議室（12-16人）
   - 適合：商務會議、專案討論和小組簡報
   - 設備：投影機、音響系統、白板、視訊會議設備

4. 小會議室（4-6人）
   - 適合：小組討論、面談和遠端會議
   - 設備：電視螢幕、白板、視訊會議設備

## 使用技術
- Frontend: Next.js, TypeScript, Tailwind CSS
- 部署平台: Netlify
- 日曆整合: Google Calendar API

## 安裝說明
1. 複製專案
```bash
git clone https://github.com/ShengEnCheng/booking-system.git
cd booking-system
```

2. 安裝相依套件
```bash
npm install
```

3. 設定環境變數
建立 `.env` 檔案並設定以下變數：
```env
NEXT_PUBLIC_API_URL=您的API網址
GOOGLE_CALENDAR_ID=您的Google日曆ID
```

4. 啟動開發伺服器
```bash
npm run dev
```

## 使用說明
1. 進入系統首頁
2. 選擇欲預約的空間
3. 填寫預約表單
4. 送出預約申請
5. 等待系統確認郵件

## 注意事項
- 預約時段以小時為單位
- 逾時 15 分鐘未到則取消預約
- 如需使用無線網路，請於一週前向資訊中心申請臨時帳號
- 使用前後須至育成中心辦公室確認場地狀況

## 聯絡資訊
- 地址：第二醫學大樓 B2 F / 工學大樓 1 F
- 電話：(03)2118800 轉 3900/5505
- 電子郵件：incubator@gap.cgu.edu.tw

## 授權說明
本專案為長庚大學創新育成中心所有，未經允許請勿轉載或使用。 

## 網站標題
title="長庚大學創新育成中心育成空間預約系統"
description="長庚大學創新育成中心育成空間線上預約系統" 

// 表單標籤和提示文字
const labels = {
  name: '預約人姓名',
  company: '單位名稱',
  email: '電子郵件',
  phone: '聯絡電話',
  purpose: '使用目的',
  attendees: '參加人數',
  date: '預約日期',
  time: '預約時段'
};

const messages = {
  success: '預約成功！',
  error: '預約失敗，請稍後再試',
  required: '此欄位為必填',
  invalidEmail: '請輸入有效的電子郵件地址',
  invalidPhone: '請輸入有效的電話號碼',
  submit: '確認預約',
  loading: '處理中...'
}; 

const rooms = [
  {
    id: '1',
    name: '創新發想基地',
    capacity: {
      min: 50,
      max: 70
    },
    description: '寬敞的創新空間，適合舉辦大型研討會、創新工作坊和團隊活動',
    equipment: ['投影機', '音響系統', '白板', '視訊會議設備', '活動式桌椅'],
    isAvailable: true
  },
  {
    id: '2',
    name: '共創空間',
    capacity: {
      min: 20,
      max: 30
    },
    description: '彈性的多功能空間，適合團隊協作、小型講座和創意討論',
    equipment: ['投影機', '音響系統', '白板', '視訊會議設備', '模組化傢俱'],
    isAvailable: true
  },
  {
    id: '3',
    name: '中會議室',
    capacity: {
      min: 12,
      max: 16
    },
    description: '專業會議空間，適合商務會議、專案討論和小組簡報',
    equipment: ['投影機', '音響系統', '白板', '視訊會議設備'],
    isAvailable: true
  },
  {
    id: '4',
    name: '小會議室',
    capacity: {
      min: 4,
      max: 6
    },
    description: '溫馨靜謐的空間，適合小組討論、面談和遠端會議',
    equipment: ['電視螢幕', '白板', '視訊會議設備'],
    isAvailable: true
  }
];

// 狀態文字
const statusText = {
  available: '可預約',
  booked: '已預約'
};

// 按鈕文字
const buttonText = '立即預約'; 

// 成功頁面文字
const successMessages = {
  title: '預約成功！',
  message: '您的育成空間預約已提交成功。我們會盡快與您聯繫確認。',
  button: '返回首頁'
}; 

// 導航文字
const navItems = [
  { href: '/', text: '育成空間預約' },
  // 其他導航項目...
]; 