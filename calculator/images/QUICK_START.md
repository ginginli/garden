# 🚀 快速开始：使用浏览器下载图片

## 方法：使用浏览器开发者工具

### 📋 步骤1：打开Wiki页面

1. 打开浏览器（Chrome、Edge、Firefox）
2. 访问：https://garden-horizons.fandom.com/wiki/Plants
3. 等待页面完全加载

### 🔧 步骤2：打开开发者工具

**Windows/Linux:**
- 按 `F12` 键
- 或按 `Ctrl + Shift + I`

**Mac:**
- 按 `Cmd + Option + I`

**或者：**
- 右键点击页面 → 选择"检查"或"Inspect"

### 💻 步骤3：切换到Console标签

在开发者工具窗口顶部，点击 **Console** 标签

### 📝 步骤4：复制并运行代码

**选项A：简单版（推荐）**

复制下面的代码，粘贴到Console中，按 `Enter`：

```javascript
// 获取所有图片URL
const images = Array.from(document.querySelectorAll('img'))
  .filter(img => img.src && img.src.includes('static.wikia'))
  .map(img => ({ alt: img.alt, src: img.src }));

// 显示结果
console.table(images);

// 复制到剪贴板
copy(JSON.stringify(images, null, 2));

console.log(`✅ 找到 ${images.length} 张图片，URL已复制到剪贴板！`);
```

**选项B：完整版（更多功能）**

1. 打开文件：`calculator/images/browser_download.js`
2. 复制全部内容
3. 粘贴到Console中，按 `Enter`
4. 然后运行命令：
   ```javascript
   exportImageURLs()
   ```

### 📊 步骤5：查看结果

Console会显示：
- ✅ 找到的图片数量
- 📋 图片列表（表格形式）
- 📎 URL已复制到剪贴板

### 💾 步骤6：保存图片URL

1. 打开文本编辑器（记事本、VS Code等）
2. 粘贴（`Ctrl+V` 或 `Cmd+V`）
3. 保存为：`calculator/images/image_urls.json`

### ⬇️ 步骤7：下载图片

**方法A：手动下载（最简单）**

1. 在Console的表格中，找到你需要的图片
2. 复制图片的 `src` URL
3. 在新标签页打开这个URL
4. 右键 → "图片另存为"
5. 保存到：
   - 种子图片：`calculator/images/seeds/carrot.webp`
   - 植物图片：`calculator/images/plants/carrot.webp`

**方法B：使用Python脚本批量下载**

```bash
# 确保已保存 image_urls.json
python3 calculator/images/batch_download.py
```

**方法C：浏览器批量下载（可能被阻止）**

在Console中运行：
```javascript
downloadAllImages()
```

注意：浏览器可能会询问是否允许多个下载。

## 🎯 命名规则

下载的图片必须按照以下规则命名：

| 植物名称 | 文件名 |
|---------|--------|
| Carrot | carrot.webp |
| Corn | corn.webp |
| Bell Pepper | bellpepper.webp |
| Dawn Fruit | dawnfruit.webp |
| Dawn Blossom | dawnblossom.webp |

**规则：**
- 全部小写
- 空格删除或用下划线替换
- 使用 `.webp` 扩展名（或 `.png`）

## ✅ 验证下载

下载完成后，检查文件：

```bash
# 查看种子图片
ls calculator/images/seeds/

# 查看植物图片
ls calculator/images/plants/

# 统计数量（应该是26个）
ls calculator/images/seeds/ | wc -l
```

## 🆘 常见问题

### Q: Console在哪里？
A: 按F12打开开发者工具，点击顶部的"Console"标签

### Q: 代码粘贴后没反应？
A: 确保按了 `Enter` 键执行代码

### Q: 找不到图片？
A: 确保Wiki页面完全加载，可以尝试刷新页面

### Q: 下载的图片格式不对？
A: 可以使用在线工具转换为WebP格式，或直接使用PNG

### Q: 不想下载所有图片？
A: 可以只下载常用植物的图片，计算器会自动回退到emoji显示

## 📚 相关文件

- `browser_download.js` - 完整的浏览器下载脚本
- `batch_download.py` - Python批量下载脚本
- `DOWNLOAD_GUIDE.md` - 详细下载指南
- `download-list.txt` - 所有Wiki页面链接

## 💡 提示

- 即使没有图片，计算器也能正常工作（显示emoji）
- 可以先下载几个测试，确认效果后再下载全部
- 图片文件大小建议控制在50KB以内
