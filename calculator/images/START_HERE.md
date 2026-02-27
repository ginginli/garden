# 🚀 立即开始下载图片

## ⚡ 最快方法（5分钟完成）

### 第1步：打开Wiki页面（10秒）

在浏览器中打开这个链接：
```
https://garden-horizons.fandom.com/wiki/Plants
```

### 第2步：打开开发者工具（5秒）

按键盘上的 **F12** 键（Mac用户按 `Cmd + Option + I`）

### 第3步：点击Console（5秒）

在弹出的开发者工具窗口顶部，点击 **Console** 标签

### 第4步：复制粘贴代码（30秒）

**复制下面这段代码**（全选复制）：

```javascript
// Garden Horizons 图片提取器
console.clear();
console.log('🌱 Garden Horizons 图片提取器');
console.log('=' .repeat(50));

// 获取所有图片
const allImages = Array.from(document.querySelectorAll('img'));
const wikiImages = allImages.filter(img => 
  img.src && (
    img.src.includes('static.wikia') || 
    img.src.includes('vignette.wikia')
  )
);

// 提取图片信息
const imageData = wikiImages.map((img, i) => ({
  序号: i + 1,
  名称: img.alt || '未知',
  URL: img.src,
  尺寸: `${img.width}x${img.height}`
}));

// 显示表格
console.table(imageData);

// 复制到剪贴板
const jsonData = JSON.stringify(imageData, null, 2);
copy(jsonData);

console.log('');
console.log('✅ 完成！');
console.log(`📊 找到 ${imageData.length} 张图片`);
console.log('📋 图片信息已复制到剪贴板');
console.log('');
console.log('💡 下一步：');
console.log('1. 在表格中找到你需要的图片');
console.log('2. 复制图片URL');
console.log('3. 在新标签页打开URL');
console.log('4. 右键保存图片');
console.log('');
console.log('=' .repeat(50));
```

**然后：**
1. 在Console中点击一下（确保光标在Console里）
2. 粘贴代码（`Ctrl+V` 或 `Cmd+V`）
3. 按 **Enter** 键

### 第5步：查看结果（10秒）

你会看到：
- ✅ 一个漂亮的表格，显示所有图片
- 📋 图片信息已自动复制到剪贴板

### 第6步：下载图片（每张30秒）

**方法A：直接在浏览器下载（推荐）**

1. 在Console的表格中，找到你要的图片（比如 "Carrot"）
2. 复制该图片的 **URL** 列的内容
3. 在浏览器新标签页中打开这个URL
4. 右键点击图片 → "图片另存为"
5. 保存到：
   - 种子图片：`calculator/images/seeds/carrot.webp`
   - 植物图片：`calculator/images/plants/carrot.webp`

**方法B：使用下载链接**

在Console中运行这个命令来下载单个图片：
```javascript
// 下载Carrot的图片（示例）
const url = '这里粘贴图片URL';
const link = document.createElement('a');
link.href = url;
link.download = 'carrot.webp';
link.click();
```

## 📝 需要下载的26个植物

按优先级排序（建议先下载常用的）：

### 🔥 高优先级（常用植物）
1. Carrot 🥕
2. Corn 🌽
3. Wheat 🌾
4. Potato 🥔
5. Tomato 🍅

### ⭐ 中优先级
6. Onion 🧅
7. Strawberry 🍓
8. Mushroom 🍄
9. Beetroot 🥬
10. Apple 🍎

### 💎 低优先级（稀有植物）
11. Rose 🌹
12. Banana 🍌
13. Plum 🍑
14. Cherry 🍒
15. Cabbage 🥬

### 🎁 特殊植物
16. Dandelion 🌼
17. Sunpetal 🌻
18. Bellpepper 🫑
19. Goldenberry 🫐
20. Amberpine 🌲
21. Birch 🌳
22. Orange 🍊
23. Emberwood 🔥
24. Olive 🫒
25. Dawn Fruit 🌅
26. Dawn Blossom 🌸

## 🎯 命名规则

保存图片时使用这些文件名：

| 植物 | 种子文件名 | 植物文件名 |
|------|-----------|-----------|
| Carrot | carrot.webp | carrot.webp |
| Corn | corn.webp | corn.webp |
| Bell Pepper | bellpepper.webp | bellpepper.webp |
| Dawn Fruit | dawnfruit.webp | dawnfruit.webp |
| Dawn Blossom | dawnblossom.webp | dawnblossom.webp |

**规则：全部小写，空格删除**

## ⏱️ 时间估算

- 提取图片URL：1分钟
- 下载5个常用植物：5分钟
- 下载全部26个植物：15-20分钟

## 💡 小技巧

1. **不需要下载全部**：先下载5-10个常用的，其他的可以后续补充
2. **图片格式**：WebP最好，PNG也可以
3. **图片大小**：建议128x128或256x256像素
4. **没有图片也能用**：计算器会自动显示emoji

## 🆘 遇到问题？

### Q: 按F12没反应？
A: 尝试右键点击页面 → 选择"检查"或"Inspect"

### Q: 找不到Console？
A: 在开发者工具顶部找到"Console"标签，点击它

### Q: 代码粘贴后没反应？
A: 确保按了Enter键执行

### Q: 表格是空的？
A: 刷新Wiki页面，等待完全加载后再试

## ✅ 验证下载

下载几个图片后，检查：

```bash
ls calculator/images/seeds/
ls calculator/images/plants/
```

应该看到你下载的图片文件。

---

**准备好了吗？现在就打开Wiki页面开始吧！** 🚀
