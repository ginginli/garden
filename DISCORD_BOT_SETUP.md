# Discord Bot 设置指南

## 步骤 1：创建 Discord Bot

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 "New Application"，输入名称（如 "Garden Stock Bot"）
3. 进入 "Bot" 标签页
4. 点击 "Add Bot"
5. 开启以下权限：
   - MESSAGE CONTENT INTENT（重要！）
   - Send Messages
   - Read Message History
6. 复制 Bot Token（保密！）

## 步骤 2：邀请 Bot 到服务器

1. 进入 "OAuth2" > "URL Generator"
2. 选择 Scopes：`bot`
3. 选择 Bot Permissions：
   - Read Messages/View Channels
   - Send Messages
   - Add Reactions
4. 复制生成的 URL，在浏览器中打开
5. 选择你的服务器并授权

## 步骤 3：获取频道 ID

1. 在 Discord 中开启开发者模式：
   - 用户设置 > 高级 > 开发者模式
2. 右键点击你要监听的频道
3. 点击 "复制频道 ID"
4. 在 `discord_bot.py` 中替换 `TARGET_CHANNEL_ID`

## 步骤 4：设置 Google Sheets API

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google Sheets API 和 Google Drive API
4. 创建服务账号：
   - IAM & Admin > Service Accounts > Create Service Account
   - 下载 JSON 密钥文件，重命名为 `credentials.json`
5. 打开你的 Google Sheet
6. 点击 "共享"，添加服务账号的邮箱（在 JSON 文件中的 `client_email`）
7. 给予"编辑者"权限

## 步骤 5：配置环境变量

创建 `.env` 文件：
```
DISCORD_BOT_TOKEN=你的_Bot_Token
```

## 步骤 6：运行 Bot

```bash
# 安装依赖
pip install -r requirements-bot.txt

# 运行 bot
python discord_bot.py
```

## 消息格式示例

Bot 会自动解析以下格式的消息：
```
Seeds - Tomato - $5 - In Stock
Gear - Shovel - $25 - Out of Stock
```

或使用命令手动添加：
```
!add Seeds Tomato 5 "In Stock"
```

## 部署到云端（可选）

可以部署到：
- Heroku
- Railway
- Replit
- 自己的服务器

确保在部署平台设置环境变量和上传 `credentials.json`。
