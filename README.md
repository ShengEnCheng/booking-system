## 環境設置

本專案需要以下環境變量：

1. `GOOGLE_CREDENTIALS`: Google Calendar API 服務帳戶認證
2. `CALENDAR_ID`: Google Calendar ID

### 本地開發設置

1. 複製 `.env.example` 到 `.env.local`
2. 填入所需的環境變量
3. 確保 `.env.local` 和 `google-credentials.json` 已添加到 .gitignore

⚠️ 警告：永遠不要提交認證文件或環境變量到版本控制系統！ 