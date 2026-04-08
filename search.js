/**
 * Garden Horizons Site Search
 * Full-site search using H1-H6 headings as search index
 */

(function() {
    'use strict';

    // Search Component Styles
    const styles = `
        /* Search Modal */
        .search-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 10000;
            justify-content: center;
            align-items: flex-start;
            padding-top: 10vh;
        }

        .search-modal.active {
            display: flex;
        }

        .search-container {
            width: 90%;
            max-width: 700px;
            background: linear-gradient(135deg, rgba(30, 50, 40, 0.98), rgba(45, 85, 65, 0.98));
            border: 2px solid rgba(132, 192, 97, 0.5);
            border-radius: 20px;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
            overflow: hidden;
            animation: searchSlideIn 0.3s ease;
        }

        @keyframes searchSlideIn {
            from {
                opacity: 0;
                transform: translateY(-30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .search-header {
            display: flex;
            align-items: center;
            padding: 20px 24px;
            border-bottom: 2px solid rgba(132, 192, 97, 0.3);
            gap: 16px;
        }

        .search-icon {
            font-size: 1.5rem;
            color: var(--clr-green-main);
        }

        .search-input-wrapper {
            flex: 1;
            position: relative;
        }

        .search-input {
            width: 100%;
            background: rgba(0, 0, 0, 0.3);
            border: 2px solid rgba(132, 192, 97, 0.3);
            border-radius: 12px;
            padding: 14px 20px;
            font-size: 1.125rem;
            color: #fff;
            font-family: var(--font-main);
            transition: all 0.3s ease;
        }

        .search-input:focus {
            outline: none;
            border-color: rgba(132, 192, 97, 0.8);
            box-shadow: 0 0 20px rgba(132, 192, 97, 0.3);
        }

        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .search-close {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 10px 16px;
            color: #fff;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 600;
            transition: all 0.3s ease;
            font-family: var(--font-main);
        }

        .search-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        }

        .search-results {
            max-height: 60vh;
            overflow-y: auto;
            padding: 16px;
        }

        .search-results::-webkit-scrollbar {
            width: 8px;
        }

        .search-results::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
        }

        .search-results::-webkit-scrollbar-thumb {
            background: rgba(132, 192, 97, 0.5);
            border-radius: 4px;
        }

        .search-results::-webkit-scrollbar-thumb:hover {
            background: rgba(132, 192, 97, 0.7);
        }

        .search-result-item {
            display: block;
            background: rgba(0, 0, 0, 0.25);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            padding: 18px 20px;
            margin-bottom: 12px;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .search-result-item:hover {
            background: rgba(132, 192, 97, 0.15);
            border-color: rgba(132, 192, 97, 0.5);
            transform: translateX(8px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .search-result-item:last-child {
            margin-bottom: 0;
        }

        .result-page-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
        }

        .result-page-title .page-icon {
            font-size: 1.25rem;
        }

        .result-page-title .page-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--clr-green-main);
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .result-headings {
            padding-left: 34px;
        }

        .result-heading {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            color: rgba(255, 255, 255, 0.85);
            font-size: 0.95rem;
        }

        .result-heading:last-child {
            margin-bottom: 0;
        }

        .heading-level {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            background: rgba(132, 192, 97, 0.25);
            border: 1px solid rgba(132, 192, 97, 0.4);
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--clr-green-main);
        }

        .heading-text {
            flex: 1;
        }

        .search-empty {
            text-align: center;
            padding: 60px 20px;
            color: rgba(255, 255, 255, 0.6);
        }

        .search-empty-icon {
            font-size: 3rem;
            margin-bottom: 16px;
            opacity: 0.5;
        }

        .search-empty-text {
            font-size: 1.125rem;
            margin-bottom: 8px;
        }

        .search-empty-hint {
            font-size: 0.9rem;
            opacity: 0.7;
        }

        .search-footer {
            display: flex;
            justify-content: center;
            gap: 24px;
            padding: 16px 24px;
            border-top: 2px solid rgba(132, 192, 97, 0.3);
            background: rgba(0, 0, 0, 0.2);
        }

        .search-shortcut {
            display: flex;
            align-items: center;
            gap: 8px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.85rem;
        }

        .search-shortcut kbd {
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.25);
            border-radius: 6px;
            padding: 4px 10px;
            font-family: monospace;
            font-size: 0.8rem;
        }

        /* Search Button */
        .search-toggle-btn {
            position: fixed;
            bottom: 24px;
            left: 24px;
            z-index: 9999;
            background: linear-gradient(135deg, var(--clr-green-main), var(--clr-green-hover));
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
        }

        .search-toggle-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 32px rgba(132, 192, 97, 0.5);
        }

        .search-toggle-btn svg {
            width: 24px;
            height: 24px;
            fill: #fff;
        }

        .search-toggle-btn .search-hint {
            position: absolute;
            top: -32px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: #fff;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.8rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .search-toggle-btn:hover .search-hint {
            opacity: 1;
        }

        /* Highlight matched text */
        .search-highlight {
            background: rgba(132, 192, 97, 0.4);
            color: var(--clr-green-main);
            padding: 0 4px;
            border-radius: 4px;
        }

        /* Loading state */
        .search-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            color: rgba(255, 255, 255, 0.6);
        }

        .search-spinner {
            width: 24px;
            height: 24px;
            border: 3px solid rgba(132, 192, 97, 0.3);
            border-top-color: var(--clr-green-main);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-right: 12px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Navigation Search Bar - Prominent Green Style */
        .nav-search-wrapper {
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, rgba(132, 192, 97, 0.15), rgba(132, 192, 97, 0.08));
            border: 2px solid rgba(132, 192, 97, 0.4);
            border-radius: 10px;
            padding: 8px 14px;
            gap: 10px;
            transition: all 0.3s ease;
            cursor: pointer;
            margin-left: 16px;
        }

        .nav-search-wrapper:hover {
            background: linear-gradient(135deg, rgba(132, 192, 97, 0.25), rgba(132, 192, 97, 0.15));
            border-color: rgba(132, 192, 97, 0.7);
            box-shadow: 0 0 20px rgba(132, 192, 97, 0.25);
        }

        .nav-search-wrapper:focus-within {
            background: linear-gradient(135deg, rgba(132, 192, 97, 0.3), rgba(132, 192, 97, 0.18));
            border-color: var(--clr-green-main);
            box-shadow: 0 0 25px rgba(132, 192, 97, 0.4);
        }

        .nav-search-icon {
            color: var(--clr-green-main);
            flex-shrink: 0;
        }

        .nav-search-input {
            background: transparent;
            border: none;
            outline: none;
            color: #fff;
            font-size: 0.95rem;
            font-family: var(--font-main);
            width: 120px;
            transition: width 0.3s ease;
        }

        .nav-search-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }

        .nav-search-input:focus {
            width: 160px;
        }

        .nav-search-kbd {
            background: rgba(132, 192, 97, 0.2);
            border: 1px solid rgba(132, 192, 97, 0.35);
            border-radius: 5px;
            padding: 2px 8px;
            font-size: 0.7rem;
            color: var(--clr-green-main);
            font-family: monospace;
            white-space: nowrap;
        }

        /* Mobile FAB - Larger and more prominent */
        .search-fab-mobile {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            background: linear-gradient(135deg, var(--clr-green-main), var(--clr-green-hover));
            border: none;
            border-radius: 50%;
            width: 64px;
            height: 64px;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(132, 192, 97, 0.4), 0 0 30px rgba(132, 192, 97, 0.3);
            transition: all 0.3s ease;
            animation: fabGlow 2s ease-in-out infinite;
        }

        @keyframes fabGlow {
            0%, 100% { box-shadow: 0 8px 32px rgba(132, 192, 97, 0.4), 0 0 30px rgba(132, 192, 97, 0.3); }
            50% { box-shadow: 0 8px 32px rgba(132, 192, 97, 0.5), 0 0 45px rgba(132, 192, 97, 0.4); }
        }

        .search-fab-mobile:hover {
            transform: scale(1.1);
        }

        .search-fab-mobile svg {
            width: 30px;
            height: 30px;
            fill: #fff;
        }

        @media (max-width: 768px) {
            .nav-search-wrapper {
                display: none;
            }

            .search-fab-mobile {
                display: flex;
            }
        }

        @media (max-width: 768px) {
            .search-modal {
                padding-top: 5vh;
                align-items: flex-start;
            }

            .search-container {
                width: 95%;
                border-radius: 16px;
            }

            .search-header {
                padding: 16px;
            }

            .search-input {
                font-size: 1rem;
                padding: 12px 16px;
            }

            .search-results {
                max-height: 55vh;
                padding: 12px;
            }

            .search-result-item {
                padding: 14px 16px;
            }

            .result-page-title .page-name {
                font-size: 1rem;
            }

            .result-headings {
                padding-left: 28px;
            }

            .result-heading {
                font-size: 0.9rem;
            }

            .search-footer {
                flex-wrap: wrap;
                gap: 12px;
                padding: 12px 16px;
            }

            .search-toggle-btn {
                width: 50px;
                height: 50px;
                bottom: 20px;
                left: 20px;
            }

            .search-toggle-btn svg {
                width: 20px;
                height: 20px;
            }
        }
    `;

    // Inject styles
    function injectStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Create search modal HTML
    function createSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.id = 'searchModal';
        modal.innerHTML = `
            <div class="search-container">
                <div class="search-header">
                    <span class="search-icon">🔍</span>
                    <div class="search-input-wrapper">
                        <input type="text" 
                               class="search-input" 
                               id="searchInput" 
                               placeholder="Search Garden Horizons..."
                               autocomplete="off"
                               spellcheck="false">
                    </div>
                    <button class="search-close" id="searchClose">ESC</button>
                </div>
                <div class="search-results" id="searchResults">
                    <div class="search-empty">
                        <div class="search-empty-icon">🔎</div>
                        <div class="search-empty-text">Search for anything</div>
                        <div class="search-empty-hint">Try "mutations", "codes", "weather" or "calculator"</div>
                    </div>
                </div>
                <div class="search-footer">
                    <div class="search-shortcut">
                        <kbd>ESC</kbd>
                        <span>to close</span>
                    </div>
                    <div class="search-shortcut">
                        <kbd>Enter</kbd>
                        <span>to select</span>
                    </div>
                    <div class="search-shortcut">
                        <kbd>↑</kbd><kbd>↓</kbd>
                        <span>to navigate</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Create search elements
    function createSearchElements() {
        // Mobile FAB button
        const fabButton = document.createElement('button');
        fabButton.className = 'search-fab-mobile';
        fabButton.id = 'searchFabMobile';
        fabButton.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
        `;
        document.body.appendChild(fabButton);
        fabButton.addEventListener('click', () => openModalFn());
        
        return fabButton;
    }

    let openModalFn = null;

    // Search functionality
    class SiteSearch {
        constructor() {
            this.searchData = null;
            this.modal = null;
            this.searchInput = null;
            this.resultsContainer = null;
            this.selectedIndex = -1;
            this.currentResults = [];
            this.debounceTimer = null;
        }

        async init() {
            injectStyles();
            this.modal = createSearchModal();
            this.fabButton = createSearchElements();
            this.searchInput = document.getElementById('searchInput');
            this.resultsContainer = document.getElementById('searchResults');

            // Set up open modal function for buttons
            openModalFn = () => this.openModal();

            // Bind nav search input
            const navSearchInput = document.getElementById('navSearchInput');
            if (navSearchInput) {
                navSearchInput.addEventListener('focus', () => this.openModal());
                navSearchInput.addEventListener('input', (e) => {
                    if (this.modal.classList.contains('active')) {
                        this.searchInput.value = e.target.value;
                        this.performSearch(e.target.value);
                    }
                });
            }

            // Load search index
            try {
                const response = await fetch('/search-index.json');
                if (response.ok) {
                    this.searchData = await response.json();
                } else {
                    console.warn('Search index not found, using fallback data');
                    this.searchData = this.getFallbackData();
                }
            } catch (e) {
                console.warn('Could not load search index, using fallback:', e);
                this.searchData = this.getFallbackData();
            }

            this.bindEvents();
        }

        getFallbackData() {
            return {
                pages: [
                    { url: '/', title: 'Home - Garden Horizons', headings: [] },
                    { url: '/calculator/', title: 'Calculator', headings: [] },
                    { url: '/stock/', title: 'Live Stock', headings: [] },
                    { url: '/codes/', title: 'Codes', headings: [] },
                    { url: '/adminabuse/', title: 'Admin Abuse', headings: [] },
                    { url: '/updates/', title: 'Updates', headings: [] },
                    { url: '/mutations/', title: 'Mutations', headings: [] },
                    { url: '/secrets/', title: 'Secrets', headings: [] },
                    { url: '/feedback/', title: 'Feedback', headings: [] },
                    { url: '/ph/', title: 'Filipino (Philippines)', headings: [] },
                    { url: '/vn/', title: 'Vietnamese (Việt Nam)', headings: [] }
                ]
            };
        }

        bindEvents() {
            // Toggle search modal (for any remaining references)
            if (this.searchButton && this.searchButton.addEventListener) {
                this.searchButton.addEventListener('click', () => this.openModal());
            }

            // Close modal
            document.getElementById('searchClose').addEventListener('click', () => this.closeModal());
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });

            // Search input
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 150);
            });

            // Keyboard navigation
            this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));

            // Global keyboard shortcut
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + K
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    this.openModal();
                }
                // Escape
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }

        openModal() {
            this.modal.classList.add('active');
            this.searchInput.value = '';
            this.searchInput.focus();
            this.resultsContainer.innerHTML = `
                <div class="search-empty">
                    <div class="search-empty-icon">🔎</div>
                    <div class="search-empty-text">Search for anything</div>
                    <div class="search-empty-hint">Try "mutations", "codes", "weather" or "calculator"</div>
                </div>
            `;
            this.currentResults = [];
            this.selectedIndex = -1;
        }

        closeModal() {
            this.modal.classList.remove('active');
            this.searchInput.blur();
        }

        performSearch(query) {
            if (!query || query.trim().length < 2) {
                this.resultsContainer.innerHTML = `
                    <div class="search-empty">
                        <div class="search-empty-icon">🔎</div>
                        <div class="search-empty-text">Search for anything</div>
                        <div class="search-empty-hint">Try "mutations", "codes", "weather" or "calculator"</div>
                    </div>
                `;
                this.currentResults = [];
                return;
            }

            const normalizedQuery = query.toLowerCase().trim();
            const results = [];

            this.searchData.pages.forEach(page => {
                const matchedHeadings = [];
                let pageTitleMatched = this.fuzzyMatch(page.title.toLowerCase(), normalizedQuery);

                // Search in headings
                if (page.headings) {
                    page.headings.forEach(heading => {
                        if (this.fuzzyMatch(heading.text.toLowerCase(), normalizedQuery)) {
                            matchedHeadings.push(heading);
                        }
                    });
                }

                // If page title matches or has matching headings
                if (pageTitleMatched || matchedHeadings.length > 0) {
                    results.push({
                        url: page.url,
                        title: page.title,
                        pageMatch: pageTitleMatched,
                        headings: matchedHeadings.slice(0, 5) // Limit to 5 headings per page
                    });
                }
            });

            // Sort results: pages with title match first, then by number of heading matches
            results.sort((a, b) => {
                if (a.pageMatch && !b.pageMatch) return -1;
                if (!a.pageMatch && b.pageMatch) return 1;
                return b.headings.length - a.headings.length;
            });

            this.currentResults = results.slice(0, 10); // Limit to 10 results
            this.renderResults(this.currentResults, query);
        }

        fuzzyMatch(text, query) {
            return text.includes(query);
        }

        highlightMatch(text, query) {
            if (!query) return text;
            const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
            return text.replace(regex, '<span class="search-highlight">$1</span>');
        }

        escapeRegex(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        renderResults(results, query) {
            if (results.length === 0) {
                this.resultsContainer.innerHTML = `
                    <div class="search-empty">
                        <div class="search-empty-icon">😕</div>
                        <div class="search-empty-text">No results found</div>
                        <div class="search-empty-hint">Try different keywords or check spelling</div>
                    </div>
                `;
                return;
            }

            const html = results.map((result, index) => {
                const pageIcon = this.getPageIcon(result.url);
                const highlightedTitle = this.highlightMatch(result.title, query);

                let headingsHtml = '';
                if (result.headings.length > 0) {
                    headingsHtml = `
                        <div class="result-headings">
                            ${result.headings.map(h => `
                                <div class="result-heading">
                                    <span class="heading-level">H${h.level}</span>
                                    <span class="heading-text">${this.highlightMatch(h.text, query)}</span>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }

                return `
                    <a href="${result.url}" class="search-result-item" data-index="${index}">
                        <div class="result-page-title">
                            <span class="page-icon">${pageIcon}</span>
                            <span class="page-name">${highlightedTitle}</span>
                        </div>
                        ${headingsHtml}
                    </a>
                `;
            }).join('');

            this.resultsContainer.innerHTML = html;
            this.selectedIndex = -1;

            // Add click handlers for results - open in new tab
            this.resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const url = item.href;
                    // Pass only the user's search query for highlighting
                    const searchUrl = url + (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(query);
                    window.open(searchUrl, '_blank');
                    this.closeModal();
                });
            });
        }

        getPageIcon(url) {
            const icons = {
                '/': '🏠',
                '/calculator/': '🧮',
                '/stock/': '📊',
                '/codes/': '🎁',
                '/adminabuse/': '⚡',
                '/updates/': '📢',
                '/mutations/': '🧬',
                '/secrets/': '🔍',
                '/feedback/': '💬',
                '/ph/': '🇵🇭',
                '/vn/': '🇻🇳'
            };
            return icons[url] || '📄';
        }

        handleKeydown(e) {
            const items = this.resultsContainer.querySelectorAll('.search-result-item');

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
                this.updateSelection(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection(items);
            } else if (e.key === 'Enter' && this.selectedIndex >= 0) {
                e.preventDefault();
                const selectedItem = items[this.selectedIndex];
                if (selectedItem) {
                    window.location.href = selectedItem.href;
                }
            }
        }

        updateSelection(items) {
            items.forEach((item, index) => {
                if (index === this.selectedIndex) {
                    item.style.background = 'rgba(132, 192, 97, 0.25)';
                    item.style.borderColor = 'rgba(132, 192, 97, 0.6)';
                    item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                } else {
                    item.style.background = '';
                    item.style.borderColor = '';
                }
            });
        }
    }

    // Initialize search when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const search = new SiteSearch();
            search.init();
        });
    } else {
        const search = new SiteSearch();
        search.init();
    }
})();
