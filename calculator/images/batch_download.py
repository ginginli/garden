#!/usr/bin/env python3
"""
批量下载Garden Horizons图片
使用从浏览器Console获取的图片URL列表
"""

import requests
import json
import os
from pathlib import Path
import time

def download_image(url, save_path):
    """下载单个图片"""
    try:
        print(f"下载: {url}")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # 保存图片
        with open(save_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ 保存到: {save_path}")
        return True
    except Exception as e:
        print(f"❌ 下载失败: {e}")
        return False

def main():
    print("=" * 60)
    print("Garden Horizons 图片批量下载工具")
    print("=" * 60)
    print()
    
    # 创建目录
    seeds_dir = Path("calculator/images/seeds")
    plants_dir = Path("calculator/images/plants")
    seeds_dir.mkdir(parents=True, exist_ok=True)
    plants_dir.mkdir(parents=True, exist_ok=True)
    
    print("📋 使用说明：")
    print("1. 打开 https://garden-horizons.fandom.com/wiki/Plants")
    print("2. 按F12打开开发者工具，切换到Console标签")
    print("3. 运行提供的JavaScript代码获取图片URL")
    print("4. 将复制的JSON粘贴到 image_urls.json 文件中")
    print("5. 再次运行此脚本")
    print()
    
    # 检查是否有image_urls.json文件
    json_file = Path("calculator/images/image_urls.json")
    
    if not json_file.exists():
        print("⚠️  未找到 image_urls.json 文件")
        print()
        print("请创建 calculator/images/image_urls.json 文件，内容格式：")
        print("""
[
  {
    "alt": "Carrot",
    "src": "https://static.wikia.nocookie.net/...",
    "type": "seed"
  },
  ...
]
        """)
        print()
        print("或者手动下载图片：")
        print("  访问Wiki页面，右键保存图片到对应文件夹")
        return
    
    # 读取JSON文件
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            images = json.load(f)
        
        print(f"📊 找到 {len(images)} 个图片URL")
        print()
        
        # 下载图片
        success_count = 0
        for i, img in enumerate(images, 1):
            url = img.get('src')
            alt = img.get('alt', f'image_{i}')
            img_type = img.get('type', 'seed')  # seed 或 plant
            
            if not url:
                continue
            
            # 生成文件名
            filename = alt.lower().replace(' ', '_').replace('-', '_') + '.webp'
            
            # 选择保存目录
            if img_type == 'plant':
                save_path = plants_dir / filename
            else:
                save_path = seeds_dir / filename
            
            # 下载
            if download_image(url, save_path):
                success_count += 1
            
            # 避免请求过快
            time.sleep(0.5)
            print()
        
        print("=" * 60)
        print(f"✅ 下载完成！成功: {success_count}/{len(images)}")
        print("=" * 60)
        
    except json.JSONDecodeError:
        print("❌ JSON文件格式错误，请检查文件内容")
    except Exception as e:
        print(f"❌ 发生错误: {e}")

if __name__ == "__main__":
    main()
