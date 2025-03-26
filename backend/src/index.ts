import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRouter from './routes/booking';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.get('/', (req, res) => {
  res.json({ message: '长庚大学创新育成中心会议室预约系统 API' });
});

// 预约路由
app.use('/api/book', bookingRouter);

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 