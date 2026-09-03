// ============================================================
// MOBILE MENU
// ============================================================
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {
  mobileMenu.classList.add("open");
  menuOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  menuOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

menuToggle.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

menuToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") openMenu();
});

menuClose.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") closeMenu();
});

// ============================================================
// SCROLL REVEAL (Base Elements)
// ============================================================
const scrollRevealElements = document.querySelectorAll(".scroll-reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

scrollRevealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ============================================================
// SUBSCRIBE SECTION ANIMATION - Now uses scroll-reveal system
// ============================================================
// Removed the separate subscribeObserver since we're using scroll-reveal

// ============================================================
// FOOTER ANIMATIONS
// ============================================================
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('show');
      }, index * 100);
      footerObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.footer > div').forEach((el) => {
  footerObserver.observe(el);
});

// ============================================================
// COPYRIGHT ANIMATION
// ============================================================
const copyrightElement = document.querySelector('.copyright');

if (copyrightElement) {
  const copyrightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        copyrightObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
  });

  copyrightObserver.observe(copyrightElement);

  // Fallback force-check for bottom of page
  const forceCheck = () => {
    const rect = copyrightElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      copyrightElement.classList.add('show');
      copyrightObserver.unobserve(copyrightElement);
    }
  };
  
  forceCheck();
  window.addEventListener('scroll', forceCheck, { passive: true });
}

console.log('About page animations fully initialized!');


