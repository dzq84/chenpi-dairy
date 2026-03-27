FROM node:20-slim

WORKDIR /app

# 复制 server 依赖清单
COPY server/package.json ./server/package.json
COPY server/build.js ./server/build.js
COPY server/tsconfig.json ./server/tsconfig.json

# 安装依赖
WORKDIR /app/server
RUN npm install --legacy-peer-deps

# 复制 server 源码
COPY server/src /app/server/src

# 构建
RUN node build.js

# 设置环境
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "dist/index.js"]
