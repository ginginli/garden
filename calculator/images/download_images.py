#!/usr/bin/env python3
"""
Garden Horizons Image Downloader
Downloads plant and seed images from the official Wiki
"""

import requests
import os
import time
from pathlib import Path

# Plant list from official Wiki
PLANTS = [
    'Carrot', 'Corn', 'Dandelion', 'Sunpetal',
    'Onion', 'Strawberry', 'Mushroom', 'Bell_Pepper', 'Goldenberry',
    'Beetroot', 'Tomato', 'Apple', 'Rose', 'Amberpine', 'Birch',
    'Wheat', 'Banana', 'Plum', 'Potato', 'Orange', 'Emberwood',
    'Cabbage', 'Cherry', 'Olive', 'Dawn_Fruit', 'Dawn_Blossom'
]

# Base URL for Wiki
WIKI_BASE = "https://garden-horizons.fandom.com/wiki/"

def download_plant_images(plant_name):
    """
    Download seed and produce images for a plant from Wiki
    
    Note: This is a template script. You'll need to:
    1. Visit each Wiki page manually
    2. Inspect the image URLs
    3. Update this script with actual image URLs
    
    Or use the manual download method from download-list.txt
    """
    print(f"Processing {plant_name}...")
    
    # Wiki page URL
    wiki_url = f"{WIKI_BASE}{plant_name}"
    print(f"  Wiki page: {wiki_url}")
    
    # TODO: Add actual image download logic here
    # The Wiki uses dynamic image URLs that need to be scraped
    # from the HTML page
    
    print(f"  ⚠️  Please visit the Wiki page and download images manually")
    print(f"  Save to: calculator/images/seeds/{plant_name.lower().replace('_', '')}.webp")
    print()

def main():
    print("=" * 60)
    print("Garden Horizons Image Downloader")
    print("=" * 60)
    print()
    print("⚠️  IMPORTANT: This script provides Wiki URLs.")
    print("   You need to download images manually from each page.")
    print()
    print("Recommended approach:")
    print("1. Visit each Wiki URL listed below")
    print("2. Right-click on seed/produce images")
    print("3. Save as WebP format with the specified filename")
    print()
    print("=" * 60)
    print()
    
    # Create directories if they don't exist
    Path("calculator/images/seeds").mkdir(parents=True, exist_ok=True)
    Path("calculator/images/plants").mkdir(parents=True, exist_ok=True)
    
    # List all plants with their Wiki URLs
    for i, plant in enumerate(PLANTS, 1):
        print(f"{i:2d}. {plant}")
        print(f"    URL: {WIKI_BASE}{plant}")
        print(f"    Save as: {plant.lower().replace('_', '')}.webp")
        print()
    
    print("=" * 60)
    print("After downloading, verify images with:")
    print("  ls -la calculator/images/seeds/")
    print("  ls -la calculator/images/plants/")
    print("=" * 60)

if __name__ == "__main__":
    main()
