// Garden Horizons Helper - Popup Script

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    initializeQuickActions();
    initializeCodeCopy();
    initializeTimers();
    initializeAdminCountdown();
});

// Quick Actions
function initializeQuickActions() {
    document.getElementById('openCalculator').addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://gardenhorizons.org/calculator/' });
    });

    document.getElementById('openCodes').addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://gardenhorizons.org/codes/' });
    });

    document.getElementById('openStock').addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://gardenhorizons.org/stock/' });
    });
}

// Code Copy Functionality
function initializeCodeCopy() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const code = button.dataset.code;
            
            try {
                await navigator.clipboard.writeText(code);
                
                // Visual feedback
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                button.textContent = 'Failed';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }
        });
    });

    // Refresh codes button
    document.getElementById('refreshCodes').addEventListener('click', () => {
        // In a real implementation, this would fetch from your API
        console.log('Refreshing codes...');
    });
}

// Shop Timers (5-minute cycle)
function initializeTimers() {
    function updateTimers() {
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Calculate time until next 5-minute mark
        const nextRestock = 5 - (minutes % 5);
        const minutesLeft = nextRestock === 5 ? 0 : nextRestock - 1;
        const secondsLeft = 60 - seconds;
        
        const timeString = `${minutesLeft}:${String(secondsLeft).padStart(2, '0')}`;
        
        document.getElementById('seedTimer').textContent = timeString;
        document.getElementById('gearTimer').textContent = timeString;
    }
    
    updateTimers();
    setInterval(updateTimers, 1000);
}

// Admin Abuse Countdown
function initializeAdminCountdown() {
    const eventDate = new Date('2026-03-14T14:00:00Z');
    
    function updateCountdown() {
        const now = new Date();
        const diff = eventDate - now;
        
        if (diff <= 0) {
            document.getElementById('adminCountdown').innerHTML = 
                '<span style="color: #ef4444; font-weight: 700;">Event is Live!</span>';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.querySelector('.countdown-days').textContent = `${days}d`;
        document.querySelector('.countdown-hours').textContent = `${hours}h`;
        document.querySelector('.countdown-mins').textContent = `${minutes}m`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Save user preferences
function savePreference(key, value) {
    chrome.storage.sync.set({ [key]: value });
}

function loadPreference(key, callback) {
    chrome.storage.sync.get([key], (result) => {
        callback(result[key]);
    });
}
