FROM node:20 AS frontend

WORKDIR /app/client

# 复制前端依赖
COPY client/package.json ./
RUN npm install --legacy-peer-deps

# 复制前端源码
COPY client/ ./

# 设置前端环境变量：API 地址为同源（空字符串表示相对路径）
ENV EXPO_PUBLIC_BACKEND_BASE_URL=""

# 构建前端 Web 版本
RUN npx expo export --platform web

# --- 后端构建 ---
FROM node:20-slim

WORKDIR /app/server

# 安装后端依赖
COPY server/package.json ./
COPY server/build.js ./
COPY server/tsconfig.json ./
RUN npm install --legacy-peer-deps

# 复制后端源码并构建
COPY server/src ./src
RUN node build.js

# 复制前端构建产物到 client-dist
COPY --from=frontend /app/client/dist /app/client-dist

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "dist/index.js"]
