// ============================================
// Garden Horizons 图片提取器 - 改进版
// 专门提取植物图片（包含 "render" 关键词）
// ============================================

console.clear();
console.log('🌱 Garden Horizons 图片提取器 v2.0');
console.log('=' .repeat(60));

// 获取所有图片
const allImages = Array.from(document.querySelectorAll('img'));

// 筛选条件：
// 1. 包含 wikia 域名
// 2. 包含 "render" 关键词（植物图片特征）
const plantImages = allImages
  .filter(img => 
    img.src && 
    (img.src.includes('static.wikia') || img.src.includes('vignette.wikia')) &&
    img.src.toLowerCase().includes('render')
  )
  .map((img, i) => {
    // 尝试从alt或周围文本识别植物名称
    const alt = img.alt || '';
    const title = img.title || '';
    
    // 从URL中提取文件名
    const urlParts = img.src.split('/');
    const filename = urlParts[urlParts.length - 1].split('?')[0];
    
    return {
      序号: i + 1,
      植物名称: alt || title || '未知',
      文件名: filename,
      URL: img.src,
      尺寸: `${img.width}x${img.height}`,
      类型: img.src.includes('Seed') ? '种子' : '植物'
    };
  });

// 显示结果
console.log(`✅ 找到 ${plantImages.length} 张植物图片（包含 render）`);
console.log('');
console.table(plantImages);

// 复制到剪贴板
const jsonData = JSON.stringify(plantImages, null, 2);
copy(jsonData);

console.log('');
console.log('📋 图片信息已复制到剪贴板！');
console.log('');
console.log('💡 下一步操作：');
console.log('1. 在上面的表格中找到你需要的图片');
console.log('2. 复制 URL 列的内容');
console.log('3. 在新标签页打开URL');
console.log('4. 右键保存图片');
console.log('');
console.log('📁 保存位置：');
console.log('   种子图片 → calculator/images/seeds/');
console.log('   植物图片 → calculator/images/plants/');
console.log('');
console.log('=' .repeat(60));

// 额外功能：按类型分组
console.log('');
console.log('📊 图片分类统计：');
const seeds = plantImages.filter(img => img.类型 === '种子');
const plants = plantImages.filter(img => img.类型 === '植物');
console.log(`   种子图片: ${seeds.length} 张`);
console.log(`   植物图片: ${plants.length} 张`);

// 返回数据供进一步使用
window.plantImagesData = plantImages;
console.log('');
console.log('💾 数据已保存到 window.plantImagesData');
console.log('   可以使用 plantImagesData 变量访问');
