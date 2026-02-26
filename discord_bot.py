import discord
from discord.ext import commands
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import re
from datetime import datetime

# Discord Bot 设置
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

# Google Sheets 设置
scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']

# 从 Discord 消息中提取商品信息的函数
def parse_item_message(message_content):
    """
    解析 Discord 消息，提取商品信息
    例如: "Seeds - Tomato - $5 - In Stock"
    """
    # 这里根据你的实际消息格式调整正则表达式
    pattern = r'(.+?)\s*-\s*(.+?)\s*-\s*\$?(\d+\.?\d*)\s*-\s*(.+)'
    match = re.match(pattern, message_content)
    
    if match:
        return {
            'Category': match.group(1).strip(),
            'Item': match.group(2).strip(),
            'Price': match.group(3).strip(),
            'Status': match.group(4).strip(),
            'Updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
    return None

@bot.event
async def on_ready():
    print(f'{bot.user} 已连接到 Discord!')
    print('Bot 正在监听消息...')

@bot.event
async def on_message(message):
    # 忽略 bot 自己的消息
    if message.author == bot.user:
        return
    
    # 只监听特定频道（替换为你的频道 ID）
    TARGET_CHANNEL_ID = 1234567890  # 替换为实际频道 ID
    
    if message.channel.id == TARGET_CHANNEL_ID:
        # 解析消息
        item_data = parse_item_message(message.content)
        
        if item_data:
            try:
                # 连接 Google Sheets
                creds = ServiceAccountCredentials.from_json_keyfile_name(
                    'credentials.json', scope)
                client = gspread.authorize(creds)
                
                # 打开工作表（替换为你的表格名称）
                sheet = client.open('Garden Horizons Stock').sheet1
                
                # 添加新行
                sheet.append_row([
                    item_data['Category'],
                    item_data['Item'],
                    item_data['Price'],
                    item_data['Status'],
                    item_data['Updated']
                ])
                
                # 回复确认消息
                await message.add_reaction('✅')
                print(f'已添加: {item_data["Item"]}')
                
            except Exception as e:
                await message.add_reaction('❌')
                print(f'错误: {e}')
    
    await bot.process_commands(message)

# 手动添加命令
@bot.command(name='add')
async def add_item(ctx, category, item, price, status):
    """手动添加商品: !add Seeds Tomato 5 "In Stock" """
    try:
        creds = ServiceAccountCredentials.from_json_keyfile_name(
            'credentials.json', scope)
        client = gspread.authorize(creds)
        sheet = client.open('Garden Horizons Stock').sheet1
        
        sheet.append_row([
            category,
            item,
            price,
            status,
            datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ])
        
        await ctx.send(f'✅ 已添加: {item}')
    except Exception as e:
        await ctx.send(f'❌ 错误: {e}')

# 运行 bot（从环境变量读取 token）
import os
bot.run(os.getenv('DISCORD_BOT_TOKEN'))
