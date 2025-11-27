/**
 * MENU PAGE FUNCTIONALITY
 * Category filtering and interactions
 */

'use strict';

// ========== MENU FILTER FUNCTIONALITY ==========
class MenuController {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.menuCategories = document.querySelectorAll('.menu-category');
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupScrollAnimations();
        this.setupMenuItemInteractions();
    }

    // ========== CATEGORY FILTERING ==========
    setupFilters() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Update active button
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter categories
                this.filterCategories(filter);

                // Haptic feedback (mobile)
                if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                }
            });
        });
    }

    filterCategories(filter) {
        this.menuCategories.forEach(category => {
            const categoryType = category.getAttribute('data-category');

            if (filter === 'all') {
                // Show all categories with stagger animation
                category.classList.remove('hidden');
                this.animateIn(category);
            } else if (categoryType === filter) {
                // Show matching category
                category.classList.remove('hidden');
                this.animateIn(category);
            } else {
                // Hide non-matching categories
                category.classList.add('hidden');
            }
        });

        // Smooth scroll to first visible category
        const firstVisible = document.querySelector('.menu-category:not(.hidden)');
        if (firstVisible && filter !== 'all') {
            setTimeout(() => {
                firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    animateIn(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'fadeInUp 0.6s ease';
        }, 10);
    }

    // ========== SCROLL ANIMATIONS ==========
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe menu item cards
        const menuCards = document.querySelectorAll('.menu-item-card');
        menuCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            observer.observe(card);
        });
    }

    // ========== MENU ITEM INTERACTIONS ==========
    setupMenuItemInteractions() {
        const menuItems = document.querySelectorAll('.menu-item-card');

        menuItems.forEach(item => {
            // Add ripple effect on touch/click
            item.addEventListener('click', function (e) {
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.classList.add('menu-ripple');

                // Position ripple at click point
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                this.appendChild(ripple);

                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });

            // Touch feedback for mobile
            item.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
            });

            item.addEventListener('touchend', function () {
                this.style.transform = '';
            });
        });
    }
}

// ========== URL HASH NAVIGATION ==========
function handleHashNavigation() {
    const hash = window.location.hash.substring(1);

    if (hash) {
        // Map hash to filter
        const filterMap = {
            'soup': 'soup',
            'quick-bites': 'quickbites',
            'salad': 'salad',
            'breads': 'breads',
            'pizza': 'pizza'
        };

        const filter = filterMap[hash];
        if (filter) {
            const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
            if (filterBtn) {
                filterBtn.click();
            }
        }
    }
}

// ========== SEARCH FUNCTIONALITY (Optional Enhancement) ==========
function setupSearch() {
    const searchInput = document.getElementById('menuSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item-card');

        menuItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const description = item.querySelector('.card-text').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = '';
                item.style.animation = 'fadeInUp 0.3s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// ========== INITIALIZE ON DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize menu controller
    const menuController = new MenuController();

    // Handle URL hash navigation
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    // Setup search if element exists
    setupSearch();

    // Add CSS for ripple effect dynamically
    const style = document.createElement('style');
    style.textContent = `
    .menu-item-card {
      position: relative;
      overflow: hidden;
    }

    .menu-ripple {
      position: absolute;
      width: 20px;
      height: 20px;
      background: rgba(201, 171, 129, 0.4);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }

    @keyframes ripple-animation {
      to {
        transform: translate(-50%, -50%) scale(20);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#top') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========== PRINT MENU FUNCTIONALITY ==========
function printMenu() {
    window.print();
}

// ========== SHARE MENU FUNCTIONALITY ==========
async function shareMenu() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Fork & Knife Menu',
                text: 'Check out the delicious menu at Fork & Knife!',
                url: window.location.href
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback: Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Menu link copied to clipboard!');
    }
}

// ========== EXPORT FUNCTIONS ==========
window.MenuController = MenuController;
window.printMenu = printMenu;
window.shareMenu = shareMenu;

// ========== PERFORMANCE OPTIMIZATION ==========
// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== ANALYTICS (if needed) ==========
function trackMenuView(category) {
    // Add analytics tracking here
    // Example: gtag('event', 'view_menu_category', { category: category });
    console.log(`Viewing category: ${category}`);
}
