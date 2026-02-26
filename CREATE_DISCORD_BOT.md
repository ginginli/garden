# 创建 Discord Bot 详细步骤

## 第一步：创建 Discord Application

1. 打开浏览器，访问：https://discord.com/developers/applications
2. 用你的 Discord 账号登录
3. 点击右上角蓝色按钮 **"New Application"**
4. 输入名称，例如：`Garden Stock Bot`
5. 点击 **"Create"**

## 第二步：创建 Bot 用户

1. 在左侧菜单中，点击 **"Bot"**
2. 点击右侧的 **"Add Bot"** 按钮
3. 确认弹窗，点击 **"Yes, do it!"**
4. Bot 创建成功！

## 第三步：配置 Bot 权限

在 Bot 设置页面：

1. 找到 **"Privileged Gateway Intents"** 部分
2. 开启以下选项（非常重要！）：
   - ✅ **MESSAGE CONTENT INTENT**
   - ✅ **SERVER MEMBERS INTENT**（可选）
3. 点击 **"Save Changes"**

## 第四步：获取 Bot Token

1. 在 Bot 页面，找到 **"TOKEN"** 部分
2. 点击 **"Reset Token"**（如果是第一次，点击 "Copy"）
3. 复制显示的 Token（一串长字符串）
4. ⚠️ **重要：保存好这个 Token，不要分享给任何人！**

## 第五步：邀请 Bot 到你的服务器

1. 在左侧菜单中，点击 **"OAuth2"** > **"URL Generator"**
2. 在 **"SCOPES"** 部分，勾选：
   - ✅ `bot`
3. 在 **"BOT PERMISSIONS"** 部分，勾选：
   - ✅ Read Messages/View Channels
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ Add Reactions
4. 复制页面底部生成的 URL
5. 在新标签页打开这个 URL
6. 选择你要添加 Bot 的服务器
7. 点击 **"授权"**
8. 完成人机验证

## 第六步：获取频道 ID

1. 打开 Discord 客户端
2. 点击 **用户设置**（齿轮图标）
3. 进入 **高级** > 开启 **"开发者模式"**
4. 关闭设置
5. 右键点击你想监听的频道
6. 点击 **"复制频道 ID"**
7. 你会得到一串数字，例如：`1234567890123456789`

## 第七步：配置 Bot 代码

打开 `discord_bot.py`，修改以下内容：

```python
# 替换为你复制的频道 ID
TARGET_CHANNEL_ID = 1234567890123456789  # 粘贴你的频道 ID
```

创建 `.env` 文件，添加：
```
DISCORD_BOT_TOKEN=你的_Bot_Token_粘贴在这里
```

## 第八步：测试 Bot

在终端运行：
```bash
pip install discord.py
python discord_bot.py
```

如果看到 `Bot 正在监听消息...`，说明成功了！

在 Discord 频道发送测试消息：
```
Seeds - Tomato - $5 - In Stock
```

Bot 应该会回复一个 ✅ 表情。

## 常见问题

**Q: Bot 显示离线？**
A: 检查 Token 是否正确，确保开启了 MESSAGE CONTENT INTENT

**Q: Bot 没有反应？**
A: 确认频道 ID 是否正确，Bot 是否有权限查看该频道

**Q: 提示权限错误？**
A: 在服务器设置中，确保 Bot 角色有足够的权限

## 下一步

配置 Google Sheets API（见 DISCORD_BOT_SETUP.md）
