import 'dotenv/config';
import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat";
import reviewsRouter from "./routes/reviews";
import journalsRouter from "./routes/journals";

const app = express();
const port = process.env.PORT || 9091;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 根路径
app.get('/', (req, res) => {
  res.json({
    name: '陈皮日记 API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/v1/health',
      chat: 'POST /api/v1/chat',
      chatStream: 'POST /api/v1/chat/stream',
      journals: '/api/v1/journals',
      reviews: '/api/v1/reviews',
    }
  });
});

app.get('/api/v1/health', (req, res) => {
  console.log('Health check success');
  res.status(200).json({ status: 'ok' });
});

// 聊天路由
app.use('/api/v1/chat', chatRouter);

// 回顾路由
app.use('/api/v1/reviews', reviewsRouter);

// 日记路由
app.use('/api/v1/journals', journalsRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});
