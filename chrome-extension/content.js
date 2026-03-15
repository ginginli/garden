// Garden Horizons Helper - Content Script
// This script runs on Roblox game pages

// Check if we're on the Garden Horizons game page
if (window.location.href.includes('130594398886540')) {
    console.log('Garden Horizons Helper: Detected Garden Horizons game page');
    
    // Add floating helper button
    addFloatingButton();
}

function addFloatingButton() {
    // Create floating button
    const button = document.createElement('div');
    button.id = 'gh-helper-button';
    button.innerHTML = '🌱';
    button.title = 'Garden Horizons Helper';
    
    // Add styles
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #84C061, #6fa84e);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(132, 192, 97, 0.4);
        z-index: 999999;
        transition: all 0.3s ease;
    `;
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 20px rgba(132, 192, 97, 0.6)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 12px rgba(132, 192, 97, 0.4)';
    });
    
    // Click to open popup menu
    button.addEventListener('click', () => {
        toggleQuickMenu();
    });
    
    document.body.appendChild(button);
}

function toggleQuickMenu() {
    let menu = document.getElementById('gh-helper-menu');
    
    if (menu) {
        menu.remove();
        return;
    }
    
    // Create quick menu
    menu = document.createElement('div');
    menu.id = 'gh-helper-menu';
    menu.innerHTML = `
        <div class="gh-menu-header">
            <span>🌱 Quick Access</span>
            <button class="gh-close-btn">×</button>
        </div>
        <div class="gh-menu-content">
            <a href="https://gardenhorizons.org/calculator/" target="_blank" class="gh-menu-item">
                💰 Calculator
            </a>
            <a href="https://gardenhorizons.org/codes/" target="_blank" class="gh-menu-item">
                🎁 Codes
            </a>
            <a href="https://gardenhorizons.org/stock/" target="_blank" class="gh-menu-item">
                📊 Live Stock
            </a>
            <a href="https://gardenhorizons.org/adminabuse/" target="_blank" class="gh-menu-item">
                ⚡ Admin Abuse
            </a>
        </div>
    `;
    
    menu.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 220px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 999999;
        overflow: hidden;
        animation: slideIn 0.3s ease;
    `;
    
    // Add styles for menu items
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .gh-menu-header {
            background: linear-gradient(135deg, #84C061, #6fa84e);
            color: white;
            padding: 12px 16px;
            font-weight: 700;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .gh-close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            line-height: 1;
            padding: 0;
            width: 24px;
            height: 24px;
        }
        
        .gh-menu-content {
            padding: 8px;
        }
        
        .gh-menu-item {
            display: block;
            padding: 12px 16px;
            margin: 4px 0;
            background: #f8f9fa;
            border-radius: 8px;
            text-decoration: none;
            color: #333;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        
        .gh-menu-item:hover {
            background: #84C061;
            color: white;
            transform: translateX(4px);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(menu);
    
    // Close button
    menu.querySelector('.gh-close-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        menu.remove();
    });
    
    // Close when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && e.target.id !== 'gh-helper-button') {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}
