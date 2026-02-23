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
       2. FAQ 手风琴展开/收起逻辑
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
            } else {
                item.classList.remove('active');
            }
        });
    });
});
