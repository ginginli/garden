// Garden Horizons Helper - Background Service Worker

// Install event
chrome.runtime.onInstalled.addListener(() => {
    console.log('Garden Horizons Helper installed');
    
    // Set up alarms for shop restock notifications
    chrome.alarms.create('shopRestock', {
        periodInMinutes: 5
    });
});

// Alarm listener for shop restock
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'shopRestock') {
        // Optional: Show notification
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title: 'Garden Horizons',
            message: 'Shops have restocked! 🌱',
            priority: 1
        });
    }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getCodes') {
        // Fetch codes from your website
        fetch('https://gardenhorizons.org/api/codes')
            .then(response => response.json())
            .then(data => sendResponse({ codes: data }))
            .catch(error => sendResponse({ error: error.message }));
        return true; // Keep message channel open for async response
    }
    
    if (request.action === 'getStockData') {
        // Fetch stock data
        fetch('https://gardenhorizons.org/api/stock')
            .then(response => response.json())
            .then(data => sendResponse({ stock: data }))
            .catch(error => sendResponse({ error: error.message }));
        return true;
    }
});
