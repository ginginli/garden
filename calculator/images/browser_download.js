// ============================================
// Garden Horizons 图片批量下载脚本
// 在浏览器Console中运行此脚本
// ============================================

// 第一步：获取所有图片URL
function getPlantImages() {
    console.log('🔍 正在扫描页面图片...');
    
    const allImages = Array.from(document.querySelectorAll('img'));
    
    // 过滤出Wiki的植物图片
    const plantImages = allImages
        .filter(img => img.src && (
            img.src.includes('static.wikia') || 
            img.src.includes('vignette.wikia')
        ))
        .map((img, index) => ({
            index: index + 1,
            alt: img.alt || `image_${index + 1}`,
            src: img.src,
            width: img.width,
            height: img.height
        }));
    
    console.log(`✅ 找到 ${plantImages.length} 张图片`);
    console.table(plantImages);
    
    return plantImages;
}

// 第二步：下载单个图片
function downloadImage(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            console.log(`✅ 下载: ${filename}`);
        })
        .catch(error => {
            console.error(`❌ 下载失败 ${filename}:`, error);
        });
}

// 第三步：批量下载所有图片
async function downloadAllImages() {
    const images = getPlantImages();
    
    console.log('⏳ 开始批量下载...');
    console.log('⚠️  注意：浏览器可能会询问是否允许多个下载');
    
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const filename = `${img.alt.toLowerCase().replace(/\s+/g, '_')}_${i + 1}.webp`;
        
        // 延迟下载，避免浏览器阻止
        await new Promise(resolve => setTimeout(resolve, 500));
        downloadImage(img.src, filename);
    }
    
    console.log('✅ 下载任务已发送！');
}

// 第四步：导出图片URL为JSON
function exportImageURLs() {
    const images = getPlantImages();
    const json = JSON.stringify(images, null, 2);
    
    // 复制到剪贴板
    copy(json);
    
    console.log('✅ 图片URL已复制到剪贴板！');
    console.log('📋 你可以粘贴到 image_urls.json 文件中');
    
    return images;
}

// ============================================
// 使用说明
// ============================================
console.log('');
console.log('=' .repeat(60));
console.log('🌱 Garden Horizons 图片下载工具');
console.log('=' .repeat(60));
console.log('');
console.log('📖 可用命令：');
console.log('');
console.log('1️⃣  getPlantImages()');
console.log('   查看页面上所有植物图片');
console.log('');
console.log('2️⃣  exportImageURLs()');
console.log('   导出图片URL到剪贴板（推荐）');
console.log('');
console.log('3️⃣  downloadAllImages()');
console.log('   批量下载所有图片（可能被浏览器阻止）');
console.log('');
console.log('4️⃣  downloadImage(url, filename)');
console.log('   下载单个图片');
console.log('   例如: downloadImage("https://...", "carrot.webp")');
console.log('');
console.log('=' .repeat(60));
console.log('');
console.log('💡 推荐流程：');
console.log('1. 运行 exportImageURLs() 获取所有图片URL');
console.log('2. 将JSON保存到 image_urls.json');
console.log('3. 使用 Python 脚本批量下载');
console.log('   或手动下载需要的图片');
console.log('');
console.log('=' .repeat(60));
