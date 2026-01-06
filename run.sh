#!/bin/bash

# Analog-Logic Hexo 构建 & 运行脚本

set -e

echo "🎸 Analog-Logic 启动中..."

# 清理旧文件
echo "📦 清理缓存..."
npx hexo clean

# 生成静态文件
echo "⚡ 生成静态文件..."
npx hexo generate

# 启动本地服务器
echo "🚀 启动服务器..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌐 访问地址: http://localhost:4000"
echo "  📁 按 Ctrl+C 停止服务器"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npx hexo server
