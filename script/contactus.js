// Wait for the entire HTML document to be fully loaded before running any JS
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // MOBILE MENU
  // ============================================================
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add("open");
    if (menuOverlay) menuOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove("open");
    if (menuOverlay) menuOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (!link.getAttribute("href")) {
          event.preventDefault();
        }
        closeMenu();
      });
    });
  }

  // ============================================================
  // CONTACT CARDS - Scroll Reveal Observer
  // ============================================================
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        contactObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.contact1, .contact2').forEach(el => {
    el.classList.add('scroll-reveal');
    contactObserver.observe(el);
  });

  // ============================================================
  // FOOTER COLUMNS - Scroll Observer with Stagger
  // ============================================================
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        footerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.footer > div').forEach(el => {
    footerObserver.observe(el);
  });

// ============================================================
// COPYRIGHT - BULLETPROOF Scroll Observer
// ============================================================
const copyrightElement = document.querySelector('.copyright');

if (copyrightElement) {
  const copyrightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // ADD BOTH 'visible' AND 'show' HERE:
        entry.target.classList.add('visible', 'show'); 
        copyrightObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
  });

  copyrightObserver.observe(copyrightElement);

  // Fallback force-check
  const forceCheck = () => {
    const rect = copyrightElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      copyrightElement.classList.add('visible', 'show');
      copyrightObserver.unobserve(copyrightElement);
    }
  };
  
  forceCheck();
  window.addEventListener('scroll', forceCheck, { passive: true });
  window.addEventListener('resize', forceCheck, { passive: true });
}

  // ============================================================
  // CONTACT FORM - Input Focus Animation Enhancement
  // ============================================================
  const contactFormInputs = document.querySelectorAll('.contact2 input, .contact2 textarea');
  contactFormInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });

  // ============================================================
  // CONTACT FORM - Submit Handler
  // ============================================================
  const contactForm = document.querySelector('.contact2 form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const name = formData.get('name') || 'there';
      alert(`Thanks ${name}! Your message has been received. We'll get back to you shortly.`);
      this.reset();
    });
  }

  // ============================================================
  // SMOOTH SCROLL BEHAVIOR - Enhanced
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // ACTIVE NAV LINK - Scroll Spy
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav .links a, .mobileMenu a');

  window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = document.querySelector('nav')?.offsetHeight || 80;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ============================================================
  // NAVBAR SCROLL EFFECT - Add shadow on scroll
  // ============================================================
  const navbar = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (navbar) {
      if (currentScroll > 50) {
        navbar.style.boxShadow = '0px 4px 8px rgba(8, 8, 8, 0.9)';
      } else {
        navbar.style.boxShadow = '0px 2px 4px rgba(8, 8, 8, 0.8)';
      }
    }
    lastScroll = currentScroll;
  });

  console.log('🚀 Contact page animations fully initialized!');
});