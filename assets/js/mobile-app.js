/**
 * MOBILE APP INTERFACE FUNCTIONALITY
 * Provides native app-like experience on mobile devices
 */

'use strict';

// ========== MOBILE APP CONTROLLER ==========
class MobileAppController {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.drawer = null;
    this.drawerOverlay = null;
    this.bottomNav = null;
    this.currentSection = 'home';
    
    if (this.isMobile) {
      this.init();
    }
    
    // Re-check on resize
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      
      if (this.isMobile && !wasMobile) {
        this.init();
      }
    });
  }
  
  init() {
    this.createMobileElements();
    this.setupDrawer();
    this.setupBottomNavigation();
    this.setupPageTransitions();
    this.setupScrollAnimations();
    this.setupTouchFeedback();
    this.observeSections();
  }
  
  // ========== CREATE MOBILE UI ELEMENTS ==========
  createMobileElements() {
    // Create mobile app header
    const header = document.createElement('div');
    header.className = 'mobile-app-header';
    header.innerHTML = `
      <div class="mobile-header-left">
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <img src="./assets/images/f&k.png" alt="Fork & Knife" class="mobile-header-logo">
      </div>
      <div class="mobile-header-actions">
        <button class="mobile-icon-btn" aria-label="Search">
          <ion-icon name="search-outline"></ion-icon>
        </button>
        <button class="mobile-icon-btn" aria-label="Notifications">
          <ion-icon name="notifications-outline"></ion-icon>
        </button>
      </div>
    `;
    
    // Create drawer menu
    const drawer = document.createElement('nav');
    drawer.className = 'mobile-drawer';
    drawer.id = 'mobileDrawer';
    drawer.innerHTML = `
      <div class="mobile-drawer-header">
        <img src="./assets/images/f&k.png" alt="Fork & Knife" class="mobile-drawer-logo">
        <p class="mobile-drawer-subtitle">Amazing & Delicious Food</p>
      </div>
      
      <div class="mobile-drawer-nav">
        <a href="#home" class="mobile-drawer-link active" data-section="home">
          <ion-icon name="home-outline" class="mobile-drawer-icon"></ion-icon>
          <span>Home</span>
        </a>
        <a href="#menu" class="mobile-drawer-link" data-section="menu">
          <ion-icon name="restaurant-outline" class="mobile-drawer-icon"></ion-icon>
          <span>Menu</span>
        </a>
        <a href="#about" class="mobile-drawer-link" data-section="about">
          <ion-icon name="information-circle-outline" class="mobile-drawer-icon"></ion-icon>
          <span>About Us</span>
        </a>
        <a href="#" class="mobile-drawer-link" data-section="chefs">
          <ion-icon name="people-outline" class="mobile-drawer-icon"></ion-icon>
          <span>Our Chefs</span>
        </a>
        <a href="#" class="mobile-drawer-link" data-section="contact">
          <ion-icon name="mail-outline" class="mobile-drawer-icon"></ion-icon>
          <span>Contact</span>
        </a>
        
        <div class="mobile-drawer-separator"></div>
        
        <a href="#" class="mobile-drawer-link" data-section="reservation">
          <ion-icon name="calendar-outline" class="mobile-drawer-icon"></ion-icon>
          <span>Book a Table</span>
        </a>
      </div>
      
      <div class="mobile-drawer-footer">
        <a href="tel:+919585555486" class="mobile-drawer-contact">
          <ion-icon name="call-outline"></ion-icon>
          <span>+91 95855 55486</span>
        </a>
        <a href="mailto:fork&knife@gmail.com" class="mobile-drawer-contact">
          <ion-icon name="mail-outline"></ion-icon>
          <span>fork&knife@gmail.com</span>
        </a>
        <a href="#" class="mobile-drawer-contact">
          <ion-icon name="location-outline"></ion-icon>
          <span>Anna Nagar, Coimbatore</span>
        </a>
      </div>
    `;
    
    // Create drawer overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-drawer-overlay';
    overlay.id = 'mobileDrawerOverlay';
    
    // Create bottom navigation
    const bottomNav = document.createElement('nav');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.innerHTML = `
      <a href="#home" class="mobile-nav-item active ripple" data-nav="home">
        <ion-icon name="home" class="mobile-nav-icon"></ion-icon>
        <span>Home</span>
      </a>
      <a href="#menu" class="mobile-nav-item ripple" data-nav="menu">
        <ion-icon name="restaurant" class="mobile-nav-icon"></ion-icon>
        <span>Menu</span>
      </a>
      <a href="#" class="mobile-nav-item ripple" data-nav="reservation">
        <ion-icon name="calendar" class="mobile-nav-icon"></ion-icon>
        <span>Book</span>
      </a>
      <a href="#about" class="mobile-nav-item ripple" data-nav="about">
        <ion-icon name="information-circle" class="mobile-nav-icon"></ion-icon>
        <span>About</span>
      </a>
      <a href="#" class="mobile-nav-item ripple" data-nav="more">
        <ion-icon name="ellipsis-horizontal" class="mobile-nav-icon"></ion-icon>
        <span>More</span>
      </a>
    `;
    
    // Create FAB
    const fab = document.createElement('button');
    fab.className = 'mobile-fab';
    fab.setAttribute('aria-label', 'Quick actions');
    fab.innerHTML = '<ion-icon name="add"></ion-icon>';
    
    // Insert elements into DOM
    document.body.insertBefore(header, document.body.firstChild);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    document.body.appendChild(bottomNav);
    document.body.appendChild(fab);
    
    // Store references
    this.drawer = drawer;
    this.drawerOverlay = overlay;
    this.bottomNav = bottomNav;
  }
  
  // ========== DRAWER MENU FUNCTIONALITY ==========
  setupDrawer() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const drawer = this.drawer;
    const overlay = this.drawerOverlay;
    
    // Open drawer
    const openDrawer = () => {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.hapticFeedback('light');
    };
    
    // Close drawer
    const closeDrawer = () => {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      this.hapticFeedback('light');
    };
    
    // Event listeners
    menuBtn?.addEventListener('click', openDrawer);
    overlay?.addEventListener('click', closeDrawer);
    
    // Close drawer when clicking links
    const drawerLinks = drawer.querySelectorAll('.mobile-drawer-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Update active state
        drawerLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close drawer after short delay
        setTimeout(closeDrawer, 200);
        this.hapticFeedback('medium');
      });
    });
    
    // Swipe to close drawer
    let touchStartX = 0;
    let touchEndX = 0;
    
    drawer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    drawer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        closeDrawer();
      }
    });
  }
  
  // ========== BOTTOM NAVIGATION ==========
  setupBottomNavigation() {
    const navItems = this.bottomNav.querySelectorAll('.mobile-nav-item');
    
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Update active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Haptic feedback
        this.hapticFeedback('light');
        
        // Smooth scroll to section
        const target = item.getAttribute('href');
        if (target && target.startsWith('#') && target !== '#') {
          e.preventDefault();
          const section = document.querySelector(target);
          if (section) {
            const offset = 70; // Account for mobile header
            const targetPosition = section.offsetTop - offset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
  
  // ========== PAGE TRANSITIONS ==========
  setupPageTransitions() {
    // Observe all sections for transition effects
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('page-transition-enter');
          entry.target.classList.remove('page-transition-exit');
        }
      });
    }, {
      threshold: 0.1
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  // ========== SCROLL ANIMATIONS ==========
  setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .menu-card, .event-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 100); // Stagger animation
        }
      });
    }, {
      threshold: 0.2
    });
    
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }
  
  // ========== TOUCH FEEDBACK ==========
  setupTouchFeedback() {
    // Add ripple effect to buttons
    const rippleElements = document.querySelectorAll('.ripple, .btn, .service-card, .menu-card');
    
    rippleElements.forEach(el => {
      el.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.98)';
      });
      
      el.addEventListener('touchend', function(e) {
        this.style.transform = '';
      });
    });
  }
  
  // ========== SECTION OBSERVER ==========
  observeSections() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = this.bottomNav.querySelectorAll('.mobile-nav-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          
          // Update bottom nav
          navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${sectionId}`) {
              navItems.forEach(nav => nav.classList.remove('active'));
              item.classList.add('active');
            }
          });
          
          // Update drawer links
          const drawerLinks = this.drawer.querySelectorAll('.mobile-drawer-link');
          drawerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
              drawerLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  // ========== HAPTIC FEEDBACK ==========
  hapticFeedback(intensity = 'light') {
    // Vibration API for haptic feedback
    if ('vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 30
      };
      navigator.vibrate(patterns[intensity] || 10);
    }
  }
  
  // ========== FAB ACTIONS ==========
  setupFAB() {
    const fab = document.querySelector('.mobile-fab');
    
    fab?.addEventListener('click', () => {
      // Scroll to reservation section or show quick actions
      const reservationSection = document.querySelector('.reservation');
      if (reservationSection) {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
        this.hapticFeedback('medium');
      }
    });
  }
}

// ========== INITIALIZE ON DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
  const mobileApp = new MobileAppController();
  mobileApp.setupFAB();
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Prevent over-scroll on iOS
  document.body.addEventListener('touchmove', (e) => {
    if (e.target === document.body) {
      e.preventDefault();
    }
  }, { passive: false });
});

// ========== SERVICE WORKER (for PWA capabilities - optional) ==========
if ('serviceWorker' in navigator && window.innerWidth <= 768) {
  window.addEventListener('load', () => {
    // You can register a service worker here for offline capabilities
    // navigator.serviceWorker.register('/sw.js');
    console.log('Mobile app mode activated');
  });
}

// ========== EXPORT FOR EXTERNAL USE ==========
window.MobileAppController = MobileAppController;
