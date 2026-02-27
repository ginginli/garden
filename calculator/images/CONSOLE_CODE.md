# 🚀 Console代码 - 提取植物图片

## 方法1：简洁版（推荐）

复制粘贴到Console，按Enter：

```javascript
// 提取包含 "render" 的植物图片
const images = Array.from(document.querySelectorAll('img'))
  .filter(img => img.src && img.src.includes('render'))
  .map((img, i) => ({
    序号: i + 1,
    名称: img.alt || '未知',
    URL: img.src,
    尺寸: `${img.width}x${img.height}`
  }));

console.table(images);
copy(JSON.stringify(images, null, 2));
console.log(`✅ 找到 ${images.length} 张图片，已复制到剪贴板！`);
```

---

## 方法2：详细版（更多信息）

```javascript
// 详细版 - 区分种子和植物图片
const allImages = Array.from(document.querySelectorAll('img'))
  .filter(img => img.src && img.src.includes('render'))
  .map((img, i) => {
    const isSeed = img.src.toLowerCase().includes('seed');
    const filename = img.src.split('/').pop().split('?')[0];
    
    return {
      序号: i + 1,
      植物: img.alt || filename.replace(/\.(png|jpg|webp|gif)/i, ''),
      类型: isSeed ? '🌱种子' : '🌿植物',
      URL: img.src,
      文件名: filename
    };
  });

console.clear();
console.log('🌱 Garden Horizons 图片提取器');
console.log('='.repeat(50));
console.table(allImages);
console.log(`\n✅ 共找到 ${allImages.length} 张图片`);
console.log(`   种子: ${allImages.filter(i => i.类型.includes('种子')).length} 张`);
console.log(`   植物: ${allImages.filter(i => i.类型.includes('植物')).length} 张`);

copy(JSON.stringify(allImages, null, 2));
console.log('\n📋 数据已复制到剪贴板！');
```

---

## 方法3：批量下载版（实验性）

```javascript
// 批量下载图片（浏览器可能会阻止）
const images = Array.from(document.querySelectorAll('img'))
  .filter(img => img.src && img.src.includes('render'));

console.log(`准备下载 ${images.length} 张图片...`);

images.forEach((img, i) => {
  setTimeout(() => {
    const link = document.createElement('a');
    link.href = img.src;
    link.download = `plant_${i + 1}_${img.alt || 'unknown'}.webp`;
    link.click();
    console.log(`✅ 下载 ${i + 1}/${images.length}: ${img.alt}`);
  }, i * 500); // 每张图片间隔500ms
});

console.log('⚠️  浏览器可能会询问是否允许多个下载');
```

---

## 方法4：只提取URL列表

```javascript
// 只获取URL列表，方便复制
const urls = Array.from(document.querySelectorAll('img'))
  .filter(img => img.src && img.src.includes('render'))
  .map(img => img.src);

console.log('找到的图片URL：');
urls.forEach((url, i) => console.log(`${i + 1}. ${url}`));

copy(urls.join('\n'));
console.log(`\n✅ ${urls.length} 个URL已复制到剪贴板（每行一个）`);
```

---

## 方法5：智能识别植物名称

```javascript
// 智能识别植物名称并分类
const plantData = Array.from(document.querySelectorAll('img'))
  .filter(img => img.src && img.src.includes('render'))
  .map(img => {
    // 从alt或URL中提取植物名称
    let plantName = img.alt || '';
    if (!plantName) {
      const filename = img.src.split('/').pop();
      plantName = filename.replace(/[_-]/g, ' ').replace(/\.(png|jpg|webp|gif).*/i, '');
    }
    
    // 判断是种子还是植物
    const isSeed = img.src.toLowerCase().includes('seed') || 
                   img.alt.toLowerCase().includes('seed');
    
    return {
      植物: plantName,
      类型: isSeed ? 'seed' : 'plant',
      URL: img.src,
      建议文件名: `${plantName.toLowerCase().replace(/\s+/g, '')}.webp`
    };
  });

// 按植物名称分组
const grouped = {};
plantData.forEach(item => {
  if (!grouped[item.植物]) {
    grouped[item.植物] = { seed: null, plant: null };
  }
  grouped[item.植物][item.类型] = item.URL;
});

console.clear();
console.log('🌱 植物图片分组结果：');
console.log('='.repeat(60));
Object.entries(grouped).forEach(([name, urls]) => {
  console.log(`\n${name}:`);
  if (urls.seed) console.log(`  🌱 种子: ${urls.seed}`);
  if (urls.plant) console.log(`  🌿 植物: ${urls.plant}`);
});

copy(JSON.stringify(grouped, null, 2));
console.log('\n✅ 分组数据已复制到剪贴板！');
```

---

## 使用建议：

1. **新手推荐**：使用方法1（简洁版）
2. **需要详细信息**：使用方法2（详细版）
3. **想批量下载**：使用方法3（可能被浏览器阻止）
4. **只要URL**：使用方法4
5. **需要分类整理**：使用方法5（智能识别）

---

## 下载后的文件命名：

| 植物名称 | 种子文件名 | 植物文件名 |
|---------|-----------|-----------|
| Carrot | carrot.webp | carrot.webp |
| Corn | corn.webp | corn.webp |
| Bell Pepper | bellpepper.webp | bellpepper.webp |
| Dawn Fruit | dawnfruit.webp | dawnfruit.webp |

**规则：全部小写，删除空格**
