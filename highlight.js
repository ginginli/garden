/**
 * Search Highlight - Highlights search keywords when page is opened from search results
 */

(function() {
    'use strict';

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

        .search-highlight-toast {
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10001;
            background: linear-gradient(135deg, rgba(30, 50, 40, 0.98), rgba(45, 85, 65, 0.98));
            border: 2px solid rgba(132, 192, 97, 0.6);
            border-radius: 12px;
            padding: 12px 24px;
            color: #fff;
            font-size: 0.95rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            animation: toastSlideIn 0.4s ease, toastFadeOut 0.4s ease 3s forwards;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        @keyframes toastSlideIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes toastFadeOut {
            from { opacity: 1; }
            to { opacity: 0; pointer-events: none; }
        }

        .search-highlight-toast .icon {
            font-size: 1.2rem;
        }

        .search-highlight-toast .keyword {
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
            scrollTo: params.get('scrollTo')
        };
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlightText(element, keyword) {
        const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
        
        // Walk through text nodes
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip already highlighted, script, style, and input elements
                    if (node.parentElement.closest('.search-highlight-target, script, style, input, textarea')) {
                        return NodeFilter.FILTER_REJECT;
                    }
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

        nodesToProcess.forEach(node => {
            const text = node.textContent;
            if (regex.test(text)) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = text.replace(regex, '<mark class="search-highlight-target">$1</mark>');
                node.parentNode.replaceChild(wrapper, node);
            }
        });
    }

    function findAndHighlight(keyword) {
        // First try to find elements with matching text
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, span, div');
        let found = false;
        let firstMatch = null;

        headings.forEach(el => {
            const text = el.textContent.toLowerCase();
            if (text.includes(keyword.toLowerCase())) {
                highlightText(el, keyword);
                if (!firstMatch) firstMatch = el;
                found = true;
            }
        });

        if (firstMatch) {
            // Scroll to first match with offset for header
            setTimeout(() => {
                const headerOffset = 100;
                const elementPosition = firstMatch.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: 'smooth'
                });
            }, 100);
        }

        return found;
    }

    function showToast(keyword) {
        const toast = document.createElement('div');
        toast.className = 'search-highlight-toast';
        toast.innerHTML = `
            <span class="icon">🔍</span>
            <span>Showing results for: <span class="keyword">"${keyword}"</span></span>
        `;
        document.body.appendChild(toast);

        // Remove toast after animation
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    function init() {
        const params = getUrlParams();
        
        if (params.highlight && params.highlight.trim().length >= 2) {
            injectStyles();
            const keyword = params.highlight.trim();
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    findAndHighlight(keyword);
                    showToast(keyword);
                });
            } else {
                findAndHighlight(keyword);
                showToast(keyword);
            }
        }
    }

    init();
})();
