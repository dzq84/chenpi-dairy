import 'dotenv/config';
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import chatRouter from "./routes/chat";
import reviewsRouter from "./routes/reviews";
import journalsRouter from "./routes/journals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 9091;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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

// 托管前端静态文件
const clientDist = path.resolve(__dirname, '../../client-dist');
app.use(express.static(clientDist));

// 所有非 API 路由都返回前端 index.html（SPA 路由支持）
app.get('*', (req, res) => {
  const indexPath = path.join(clientDist, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).json({
        name: '陈皮日记 API',
        version: '1.0.0',
        status: 'running',
        message: '前端正在构建中，请稍后访问',
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/`);
});
