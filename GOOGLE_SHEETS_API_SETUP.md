# Google Sheets API 设置指南

## 第一步：创建 Google Cloud 项目

1. 访问：https://console.cloud.google.com/
2. 登录你的 Google 账号
3. 点击顶部的项目下拉菜单
4. 点击 **"新建项目"**
5. 输入项目名称：`Garden Stock Bot`
6. 点击 **"创建"**
7. 等待项目创建完成（约 10-30 秒）

## 第二步：启用 API

1. 在左侧菜单中，点击 **"API 和服务"** > **"库"**
2. 搜索 `Google Sheets API`
3. 点击进入，点击 **"启用"**
4. 返回库页面，搜索 `Google Drive API`
5. 点击进入，点击 **"启用"**

## 第三步：创建服务账号

1. 在左侧菜单中，点击 **"API 和服务"** > **"凭据"**
2. 点击顶部 **"创建凭据"** > **"服务账号"**
3. 输入服务账号名称：`garden-bot`
4. 点击 **"创建并继续"**
5. 角色选择：**"编辑者"**（或跳过）
6. 点击 **"完成"**

## 第四步：下载密钥文件

1. 在凭据页面，找到刚创建的服务账号
2. 点击服务账号的邮箱地址
3. 切换到 **"密钥"** 标签
4. 点击 **"添加密钥"** > **"创建新密钥"**
5. 选择 **JSON** 格式
6. 点击 **"创建"**
7. JSON 文件会自动下载到你的电脑
8. 将文件重命名为 `credentials.json`
9. 移动到你的项目文件夹中

## 第五步：共享 Google Sheet

1. 打开 `credentials.json` 文件
2. 找到 `client_email` 字段，复制邮箱地址
   - 类似：`garden-bot@project-id.iam.gserviceaccount.com`
3. 打开你的 Google Sheet
4. 点击右上角 **"共享"** 按钮
5. 粘贴服务账号的邮箱地址
6. 权限设置为 **"编辑者"**
7. 取消勾选 **"通知用户"**
8. 点击 **"共享"**

## 第六步：准备 Google Sheet

确保你的 Sheet 有以下列标题（第一行）：

| Category | Item | Price | Status | Updated |
|----------|------|-------|--------|---------|

## 第七步：更新 Bot 代码

打开 `discord_bot.py`，修改：

```python
# 替换为你的 Google Sheet 名称
sheet = client.open('Garden Horizons Stock').sheet1
```

如果你的 Sheet 名称不同，修改 `'Garden Horizons Stock'` 为你的实际名称。

## 第八步：测试连接

运行测试脚本：

```python
import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']

creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
client = gspread.authorize(creds)

# 替换为你的 Sheet 名称
sheet = client.open('Garden Horizons Stock').sheet1

# 测试写入
sheet.append_row(['Test', 'Item', '10', 'Available', '2024-01-01'])
print("✅ 连接成功！")
```

## 安全提示

⚠️ **不要将 `credentials.json` 提交到 Git！**

确保 `.gitignore` 包含：
```
credentials.json
.env
```

## 常见问题

**Q: 提示 "Spreadsheet not found"？**
A: 检查 Sheet 名称是否正确，确保服务账号有访问权限

**Q: 提示 "Permission denied"？**
A: 确认已将服务账号邮箱添加到 Sheet 的共享列表

**Q: API 配额限制？**
A: 免费版每天有读写限制，通常足够个人使用

## 完成！

现在你可以运行 Discord Bot 了：
```bash
python discord_bot.py
```
