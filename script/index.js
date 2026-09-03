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
  link.addEventListener("click", (event) => {
    if (!link.getAttribute("href")) {
      event.preventDefault();
    }
    closeMenu();
  });
});

// ============================================================
// SCROLL REVEAL
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

scrollRevealElements.forEach((el) => revealObserver.observe(el));

// ============================================================
// GALLERY - Infinite scrolling carousel
// ============================================================

function buildSeamlessTrack(track) {
  // Only ever treat the un-cloned elements as the real set
  const originalItems = Array.from(track.children).filter(
    (el) => !el.hasAttribute("data-clone")
  );

  track.querySelectorAll("[data-clone]").forEach((el) => el.remove());

  if (originalItems.length === 0) return;

  const container = track.parentElement;
  const containerWidth = container.clientWidth;

  const trackGap = parseFloat(getComputedStyle(track).gap) || 0;

  const originalSetWidth =
    originalItems.reduce(
      (sum, el) => sum + el.getBoundingClientRect().width,
      0
    ) +
    trackGap * (originalItems.length - 1);

  if (originalSetWidth === 0) return;

  // How many copies of the set are needed so one pass
  // fully covers the container?
  const repeatsNeeded = Math.max(
    1,
    Math.ceil(containerWidth / originalSetWidth)
  );

  const onePass = document.createDocumentFragment();

  for (let r = 0; r < repeatsNeeded; r++) {
    originalItems.forEach((el) => {
      const clone = el.cloneNode(true);

      clone.setAttribute("data-clone", "true");
      clone.setAttribute("aria-hidden", "true");

      clone.querySelectorAll("img").forEach((img) => {
        img.setAttribute("alt", "");
      });

      onePass.appendChild(clone);
    });
  }

  // Append the covering pass twice.
  // This makes translateX(-50%) return exactly to frame 0.
  track.appendChild(onePass.cloneNode(true));
  track.appendChild(onePass);
}

function initGalleryCarousels() {
  document
    .querySelectorAll(".galleryTrack")
    .forEach(buildSeamlessTrack);
}

initGalleryCarousels();

// Rebuild on resize
let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(initGalleryCarousels, 200);
});

// ============================================================
// SUBSCRIBE SECTION ANIMATION
// ============================================================

const subscribeElement = document.querySelector('.subscribe > div');
if (subscribeElement) {
  const subscribeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        subscribeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -30px 0px'
  });
  subscribeObserver.observe(subscribeElement);
}

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

// ============================================================
// OFFER CARD NAVIGATION - Navigate to specific panel on offer page
// ============================================================

const offerCards = document.querySelectorAll('.offerCard');

offerCards.forEach((card) => {
  card.style.cursor = 'pointer';
  
  card.addEventListener('click', function(e) {
    // Get the panel data attribute
    const panel = this.dataset.panel;
    
    if (panel) {
      // Store the target panel in localStorage
      localStorage.setItem('targetPanel', panel);
      
      // Navigate to offer page
      window.location.href = 'offer.html';
    }
  });
  
  // Also handle the "Learn More" span click
  const learnMoreSpan = card.querySelector('span:last-child');
  if (learnMoreSpan) {
    learnMoreSpan.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent double firing
      const parentCard = this.closest('.offerCard');
      const panel = parentCard.dataset.panel;
      
      if (panel) {
        localStorage.setItem('targetPanel', panel);
        window.location.href = 'offer.html';
      }
    });
  }
});




// ============================================================
// LEARN MORE BUTTON
// ============================================================

const aboutBtn = document.querySelector('.about-btn');
if (aboutBtn) {
  aboutBtn.addEventListener('click', () => {
    window.location.href = 'about.html';
  });
}

console.log('Home page animations fully initialized!');


// ============================================================
// OFFER CARDS - Stacked effect on mobile
// ============================================================

function handleCardStacking() {
  const offerCards = document.querySelectorAll('.offer3 .offerCard');
  const isMobile = window.innerWidth <= 767;
  
  // Remove stacked class from all cards
  offerCards.forEach((card) => {
    card.classList.remove('stacked');
  });
  
  // Add stacked class to cards (except first) on mobile
  if (isMobile) {
    offerCards.forEach((card, index) => {
      if (index > 0) {
        card.classList.add('stacked');
      }
    });
  }
}

// Run on load
handleCardStacking();

// Run on resize
let stackResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(stackResizeTimer);
  stackResizeTimer = setTimeout(handleCardStacking, 200);
});

