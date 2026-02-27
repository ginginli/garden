# 图片下载指南

## 推荐方法：手动下载（最可靠）

### 步骤：

1. **打开Wiki植物列表页面**
   ```
   https://garden-horizons.fandom.com/wiki/Plants
   ```

2. **查看表格中的图片**
   - 表格中有 "Produce Image" 和 "Seed Image" 两列
   - 每个植物都有对应的图片

3. **下载图片**
   - 右键点击图片 → "在新标签页中打开图片"
   - 右键 → "图片另存为"
   - 保存为 WebP 格式（如果浏览器支持）

4. **命名规则**
   - 种子图片：`calculator/images/seeds/carrot.webp`
   - 植物图片：`calculator/images/plants/carrot.webp`
   - 使用小写字母，与 plant ID 一致

### 植物ID对照表：

| 植物名称 | ID | 文件名 |
|---------|-----|--------|
| Carrot | carrot | carrot.webp |
| Corn | corn | corn.webp |
| Dandelion | dandelion | dandelion.webp |
| Sunpetal | sunpetal | sunpetal.webp |
| Onion | onion | onion.webp |
| Strawberry | strawberry | strawberry.webp |
| Mushroom | mushroom | mushroom.webp |
| Bell Pepper | bellpepper | bellpepper.webp |
| Goldenberry | goldenberry | goldenberry.webp |
| Beetroot | beetroot | beetroot.webp |
| Tomato | tomato | tomato.webp |
| Apple | apple | apple.webp |
| Rose | rose | rose.webp |
| Amberpine | amberpine | amberpine.webp |
| Birch | birch | birch.webp |
| Wheat | wheat | wheat.webp |
| Banana | banana | banana.webp |
| Plum | plum | plum.webp |
| Potato | potato | potato.webp |
| Orange | orange | orange.webp |
| Emberwood | emberwood | emberwood.webp |
| Cabbage | cabbage | cabbage.webp |
| Cherry | cherry | cherry.webp |
| Olive | olive | olive.webp |
| Dawn Fruit | dawnfruit | dawnfruit.webp |
| Dawn Blossom | dawnblossom | dawnblossom.webp |

## 方法2：使用浏览器开发者工具

### Chrome/Edge/Firefox：

1. 打开 https://garden-horizons.fandom.com/wiki/Plants
2. 按 F12 打开开发者工具
3. 切换到 Console 标签
4. 粘贴以下代码：

```javascript
// 获取所有图片URL
const images = Array.from(document.querySelectorAll('img'))
  .filter(img => img.src.includes('static.wikia'))
  .map(img => ({
    src: img.src,
    alt: img.alt
  }));

console.table(images);

// 复制到剪贴板
copy(JSON.stringify(images, null, 2));
```

5. 这会将所有图片URL复制到剪贴板
6. 然后你可以使用下载工具批量下载

## 方法3：使用wget/curl批量下载

如果你有图片URL列表，可以使用命令行工具：

```bash
# 示例：下载单个图片
wget -O calculator/images/seeds/carrot.webp "https://图片URL"

# 或使用curl
curl -o calculator/images/seeds/carrot.webp "https://图片URL"
```

## 验证下载

下载完成后，检查文件：

```bash
# 查看种子图片
ls -la calculator/images/seeds/

# 查看植物图片
ls -la calculator/images/plants/

# 统计数量（应该是26个）
ls calculator/images/seeds/ | wc -l
ls calculator/images/plants/ | wc -l
```

## 图片要求

- **格式**: WebP（推荐）或 PNG
- **尺寸**: 128x128px 或 256x256px
- **背景**: 透明背景最佳
- **质量**: 清晰可见

## 如果图片缺失

计算器会自动回退到emoji显示，所以即使没有图片也能正常工作。你可以：
1. 先下载常用植物的图片（Carrot, Corn, Wheat等）
2. 稀有植物的图片可以后续补充

## 需要帮助？

如果遇到问题，可以：
1. 检查 `download-list.txt` 文件中的Wiki链接
2. 查看 `IMAGE_SOURCES.md` 了解详细信息
3. 运行 `python3 download_images.py` 查看所有Wiki链接
