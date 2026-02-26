# Streamlit Cloud 配置指南

## 在 Streamlit Cloud 中配置 Secrets

1. 打开你的 Streamlit Cloud 应用设置
2. 找到 "Secrets" 部分
3. 输入以下配置（替换成你的 Google Sheet URL）：

```toml
[connections.gsheets]
spreadsheet = "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit"
```

## 如何获取 Sheet ID

从你的 Google Sheet URL 中提取：
```
https://docs.google.com/spreadsheets/d/1ABC123xyz456/edit#gid=0
                                        ↑这部分就是 Sheet ID↑
```

## Google Sheet 权限设置

1. 打开你的 Google Sheet
2. 点击右上角 "共享" 按钮
3. 设置为 "任何拥有链接的人都可以查看"
4. 点击 "完成"

## 测试配置

保存 Secrets 后，点击 "Reboot app" 重启应用。
