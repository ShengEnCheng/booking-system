# 长庚大学创新育成中心会议室预约系统

这是一个用于长庚大学创新育成中心会议室预约的网站系统。

## 功能特点

- 两个会议室（中会议室和小会议室）的在线预约
- 实时查看会议室可用时间
- 用户认证系统
- 管理员后台管理
- 预约历史记录查看

## 技术栈

- 前端：Next.js + React + TypeScript + Tailwind CSS
- 后端：Node.js + Express + TypeScript
- 数据库：MongoDB

## 开发环境设置

1. 安装依赖
```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd backend
npm install
```

2. 环境变量设置
- 在 frontend 目录下创建 .env.local 文件
- 在 backend 目录下创建 .env 文件

3. 启动开发服务器
```bash
# 启动前端开发服务器
cd frontend
npm run dev

# 启动后端开发服务器
cd backend
npm run dev
```

## 项目结构

```
booking-system/
├── frontend/          # 前端项目
├── backend/           # 后端项目
└── README.md          # 项目说明文档
``` 