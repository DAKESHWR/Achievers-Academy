document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle Integration ---
  const themeBtn = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  // Read from localStorage or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeBtn.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateThemeIcons(targetTheme);
  });

  function updateThemeIcons(theme) {
    if(theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  // --- Header Scroll Effect ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Logic ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', openMobileMenu);
  closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  
  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- Hero Carousel ---
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let slideInterval;

  // Initialize dots
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if(idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlides() {
    slides.forEach((slide, idx) => {
      if(idx === currentSlide) {
        slide.classList.add('active');
        dots[idx].classList.add('active');
      } else {
        slide.classList.remove('active');
        dots[idx].classList.remove('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }

  function goToSlide(n) {
    currentSlide = n;
    updateSlides();
    resetInterval();
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Start auto-play
  slideInterval = setInterval(nextSlide, 5000);

  // --- Scroll Animations (IntersectionObserver) ---
  const animTriggers = document.querySelectorAll('.anim-trigger');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Annimate only once
      }
    });
  }, observerOptions);

  animTriggers.forEach(el => observer.observe(el));

  // --- Login Modal Logic ---
  const loginTriggers = document.querySelectorAll('.login-trigger');
  const loginModal = document.getElementById('login-modal');
  const modalClose = document.getElementById('modal-close');
  const modalDismiss = document.getElementById('modal-dismiss');
  const loginForm = document.getElementById('login-form');

  function openModal() {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // if mobile menu is open, close it
    closeMobileMenu();
  }

  function closeModal() {
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  loginTriggers.forEach(btn => btn.addEventListener('click', openModal));
  modalClose.addEventListener('click', closeModal);
  modalDismiss.addEventListener('click', closeModal);
  
  // Close on overlay click
  loginModal.addEventListener('click', (e) => {
    if(e.target === loginModal) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && loginModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Login form submit demo
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login demonstration successful!');
    closeModal();
    loginForm.reset();
  });

  // --- Contact Form Logic ---
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple frontend check
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      if(name && phone) {
        contactSuccess.classList.remove('hidden');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          contactSuccess.classList.add('hidden');
        }, 5000);
      }
    });
  }
  
});
