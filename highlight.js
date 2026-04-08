/**
 * Search Highlight - Highlights all matching keywords on the page
 */

(function() {
    'use strict';

    let allMatches = [];
    let currentMatchIndex = 0;

    const styles = `
        .search-highlight-target {
            background: linear-gradient(90deg, rgba(132, 192, 97, 0.3), rgba(132, 192, 97, 0.5), rgba(132, 192, 97, 0.3));
            background-size: 200% 100%;
            animation: highlightGlow 2s ease-in-out infinite;
            border-radius: 4px;
            padding: 2px 4px;
            box-shadow: 0 0 8px rgba(132, 192, 97, 0.5);
        }

        @keyframes highlightGlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .search-highlight-current {
            background: rgba(132, 192, 97, 0.7) !important;
            box-shadow: 0 0 15px rgba(132, 192, 97, 0.8);
        }

        .search-highlight-toast {
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10001;
            background: linear-gradient(135deg, rgba(30, 50, 40, 0.98), rgba(45, 85, 65, 0.98));
            border: 2px solid rgba(132, 192, 97, 0.6);
            border-radius: 12px;
            padding: 12px 20px;
            color: #fff;
            font-size: 0.9rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            animation: toastSlideIn 0.4s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        @keyframes toastSlideIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .search-highlight-toast .icon {
            font-size: 1.2rem;
        }

        .search-highlight-toast .keyword {
            color: var(--clr-green-main);
            font-weight: 700;
        }

        .search-highlight-toast .count {
            background: rgba(132, 192, 97, 0.3);
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 0.8rem;
            margin-left: 4px;
        }

        .search-highlight-nav {
            position: fixed;
            bottom: 100px;
            right: 24px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .search-highlight-nav button {
            background: linear-gradient(135deg, var(--clr-green-main), var(--clr-green-hover));
            border: none;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
            color: #fff;
            font-size: 1.2rem;
        }

        .search-highlight-nav button:hover {
            transform: scale(1.1);
        }

        .search-highlight-nav .nav-count {
            position: fixed;
            bottom: 155px;
            right: 24px;
            z-index: 10000;
            background: rgba(30, 50, 40, 0.95);
            border: 2px solid rgba(132, 192, 97, 0.5);
            border-radius: 20px;
            padding: 6px 14px;
            color: #fff;
            font-size: 0.85rem;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .search-highlight-nav .nav-count .current {
            color: var(--clr-green-main);
            font-weight: 700;
        }
    `;

    function injectStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            highlight: params.get('highlight'),
            q: params.get('q')
        };
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function createNavigationUI(count) {
        // Match counter
        const countEl = document.createElement('div');
        countEl.className = 'nav-count';
        countEl.innerHTML = `<span class="current">1</span> / ${count}`;
        countEl.id = 'matchCounter';
        document.body.appendChild(countEl);

        // Navigation buttons
        const nav = document.createElement('div');
        nav.className = 'search-highlight-nav';
        nav.innerHTML = `
            <button id="prevMatch" title="Previous match (Shift+↑)">↑</button>
            <button id="nextMatch" title="Next match (Shift+↓)">↓</button>
        `;
        document.body.appendChild(nav);

        document.getElementById('prevMatch').addEventListener('click', () => scrollToMatch(-1));
        document.getElementById('nextMatch').addEventListener('click', () => scrollToMatch(1));
    }

    function scrollToMatch(direction) {
        if (allMatches.length === 0) return;

        // Remove current highlight from all
        allMatches.forEach(el => el.classList.remove('search-highlight-current'));

        // Update index
        currentMatchIndex += direction;
        if (currentMatchIndex < 0) currentMatchIndex = allMatches.length - 1;
        if (currentMatchIndex >= allMatches.length) currentMatchIndex = 0;

        // Add current highlight
        const current = allMatches[currentMatchIndex];
        current.classList.add('search-highlight-current');

        // Scroll to it
        current.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Update counter
        const counter = document.getElementById('matchCounter');
        if (counter) {
            counter.innerHTML = `<span class="current">${currentMatchIndex + 1}</span> / ${allMatches.length}`;
        }
    }

    function highlightKeyword(keyword) {
        allMatches = [];
        currentMatchIndex = 0;

        const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');

        // Get all text nodes in the document
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip special elements
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    
                    const tagName = parent.tagName.toLowerCase();
                    const skipTags = ['script', 'style', 'noscript', 'iframe', 'input', 'textarea', 'select'];
                    if (skipTags.includes(tagName)) return NodeFilter.FILTER_REJECT;
                    if (parent.classList.contains('search-highlight-target')) return NodeFilter.FILTER_REJECT;
                    if (parent.id && (parent.id.includes('search') || parent.id.includes('modal'))) return NodeFilter.FILTER_REJECT;
                    
                    if (node.textContent.toLowerCase().includes(keyword.toLowerCase())) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );

        const nodesToProcess = [];
        while (walker.nextNode()) {
            nodesToProcess.push(walker.currentNode);
        }

        // Process nodes in reverse order to avoid index shifting issues
        nodesToProcess.reverse().forEach(node => {
            const text = node.textContent;
            if (regex.test(text)) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = text.replace(regex, (match) => {
                    const mark = document.createElement('mark');
                    mark.className = 'search-highlight-target';
                    mark.textContent = match;
                    return mark.outerHTML;
                });
                node.parentNode.replaceChild(wrapper, node);
            }
        });

        // Collect all highlighted elements
        allMatches = Array.from(document.querySelectorAll('.search-highlight-target'));

        return allMatches.length;
    }

    function showToast(keyword, count) {
        const toast = document.createElement('div');
        toast.className = 'search-highlight-toast';
        toast.innerHTML = `
            <span class="icon">🔍</span>
            <span>Found <span class="keyword">"${keyword}"</span></span>
            <span class="count">${count} matches</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastFadeOut 0.4s ease forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    function init() {
        const params = getUrlParams();
        const keyword = params.q || params.highlight;
        
        if (keyword && keyword.trim().length >= 1) {
            injectStyles();
            const kw = keyword.trim();

            // Wait for DOM to be fully loaded
            function runHighlight() {
                const count = highlightKeyword(kw);
                if (count > 0) {
                    showToast(kw, count);
                    createNavigationUI(count);
                    // Scroll to first match with delay
                    setTimeout(() => scrollToMatch(0), 300);
                } else {
                    // Retry after a short delay in case DOM wasn't ready
                    setTimeout(runHighlight, 100);
                }
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', runHighlight);
            } else {
                runHighlight();
            }

            // Add keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.shiftKey && e.key === 'ArrowDown') {
                    e.preventDefault();
                    scrollToMatch(1);
                } else if (e.shiftKey && e.key === 'ArrowUp') {
                    e.preventDefault();
                    scrollToMatch(-1);
                }
            });
        }
    }

    init();
})();
