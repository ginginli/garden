document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. 商店 5 分钟刷新倒计时逻辑
       ========================================= */
    let seedTimeLeft = 5 * 60; // Bill: 5分钟
    let gearTimeLeft = 3 * 60 + 15; // Molly: 错开时间

    const seedTimerElement = document.getElementById('seed-timer');
    const gearTimerElement = document.getElementById('gear-timer');

    function updateTimer(timeLeft, element) {
        if (!element) return; // 容错处理
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        element.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }

    setInterval(() => {
        // 更新种子店
        seedTimeLeft = seedTimeLeft > 0 ? seedTimeLeft - 1 : 5 * 60;
        updateTimer(seedTimeLeft, seedTimerElement);

        // 更新装备店
        gearTimeLeft = gearTimeLeft > 0 ? gearTimeLeft - 1 : 5 * 60;
        updateTimer(gearTimeLeft, gearTimerElement);
    }, 1000);

    /* =========================================
       2. Live Tracker 倒计时逻辑
       ========================================= */
    let trackerSeedTime = 5 * 60;
    let trackerGearTime = 3 * 60 + 15;
    let weatherTime = 15 * 60;

    const trackerSeedTimer = document.getElementById('tracker-seed-timer');
    const trackerGearTimer = document.getElementById('tracker-gear-timer');
    const weatherTimer = document.getElementById('weather-timer');

    // 天气系统
    const weathers = [
        { icon: '☀️', name: 'Sunny', effect: 'Normal growth rate' },
        { icon: '🌫️', name: 'Fog', effect: '+1x Growth Boost, FOGGY mutations' },
        { icon: '🌧️', name: 'Rain', effect: '+0.5x Growth Boost, auto-watering' },
        { icon: '⛈️', name: 'Storm', effect: '+2x Growth Boost, rare mutations' },
        { icon: '❄️', name: 'Snow', effect: '-0.5x Growth, FROZEN mutations' }
    ];

    let currentWeatherIndex = 0;

    function updateWeather() {
        currentWeatherIndex = (currentWeatherIndex + 1) % weathers.length;
        const weather = weathers[currentWeatherIndex];
        
        const weatherIcon = document.getElementById('current-weather-icon');
        const weatherName = document.getElementById('current-weather-name');
        const weatherEffect = document.getElementById('weather-effect');
        
        if (weatherIcon) weatherIcon.textContent = weather.icon;
        if (weatherName) weatherName.textContent = weather.name;
        if (weatherEffect) weatherEffect.textContent = weather.effect;
    }

    // 模拟库存刷新
    function refreshStock(stockGridId) {
        const stockGrid = document.getElementById(stockGridId);
        if (!stockGrid) return;

        const items = stockGrid.querySelectorAll('.stock-item');
        items.forEach(item => {
            const stockSpan = item.querySelector('.item-stock');
            if (stockSpan) {
                // 随机生成新的库存数量
                const rarityClass = item.classList.contains('epic') ? 1 :
                                   item.classList.contains('rare') ? 3 :
                                   item.classList.contains('uncommon') ? 6 : 15;
                const newStock = Math.floor(Math.random() * rarityClass) + 1;
                stockSpan.textContent = `x${newStock}`;
                
                // 添加刷新动画
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'pulse 0.5s ease';
                }, 10);
            }
        });
    }

    setInterval(() => {
        // 更新追踪器种子店倒计时
        if (trackerSeedTime > 0) {
            trackerSeedTime--;
        } else {
            trackerSeedTime = 5 * 60;
            refreshStock('seed-stock');
        }
        updateTimer(trackerSeedTime, trackerSeedTimer);

        // 更新追踪器装备店倒计时
        if (trackerGearTime > 0) {
            trackerGearTime--;
        } else {
            trackerGearTime = 5 * 60;
            refreshStock('gear-stock');
        }
        updateTimer(trackerGearTime, trackerGearTimer);

        // 更新天气倒计时
        if (weatherTime > 0) {
            weatherTime--;
        } else {
            weatherTime = 15 * 60;
            updateWeather();
        }
        updateTimer(weatherTime, weatherTimer);
    }, 1000);

    /* =========================================
       3. FAQ 手风琴展开/收起逻辑
       ========================================= */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            // 切换当前点击项的状态
            const isActive = item.classList.contains('active');

            // 如果你希望每次只展开一个问题,取消下面这两行的注释:
            // faqItems.forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                questionBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /* =========================================
       4. Mobile Menu Toggle
       ========================================= */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
