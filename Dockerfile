FROM node:20-slim AS builder

WORKDIR /app

# 只复制 server 目录的依赖文件
COPY server/package.json server/package-lock.json* ./server/
COPY server/build.js ./server/

# 安装依赖
WORKDIR /app/server
RUN npm install

# 复制 server 源码
COPY server/src ./src
COPY server/tsconfig.json ./

# 构建
RUN npm run build

# --- 生产阶段 ---
FROM node:20-slim

WORKDIR /app/server

# 只复制生产所需文件
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/package.json ./

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "dist/index.js"]
