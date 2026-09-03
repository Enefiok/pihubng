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
  { threshold: 0.15 },
);

scrollRevealElements.forEach((el) => revealObserver.observe(el));

// ============================================================
// OUR ARTICLES - Separate observer for heading
// ============================================================

const ourArticles = document.querySelector(".ourArticles");
if (ourArticles) {
  const headingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          headingObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  headingObserver.observe(ourArticles);
}

// ============================================================
// SUBSCRIBE SECTION ANIMATION
// ============================================================

const subscribeElement = document.querySelector('.subscribe > div');
if (subscribeElement) {
  const subscribeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
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

// ============================================================
// CATEGORY TABS — animated filtering
// ============================================================

const categoryBtns = document.querySelectorAll(".category-btn");
const articleCards = document.querySelectorAll(".blogArticles > div");
const FILTER_TRANSITION_MS = 300;

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.category;

    categoryBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const toHide = [];
    const toShow = [];

    articleCards.forEach((card) => {
      const matches = selected === "all" || card.dataset.category === selected;
      const isCurrentlyVisible = !card.classList.contains("hidden");

      if (matches && !isCurrentlyVisible) {
        toShow.push(card);
      } else if (!matches && isCurrentlyVisible) {
        toHide.push(card);
      }
    });

    toHide.forEach((card) => card.classList.add("hiding"));

    setTimeout(() => {
      toHide.forEach((card) => {
        card.classList.add("hidden");
        card.classList.remove("hiding");
      });

      toShow.forEach((card) => {
        card.classList.remove("hidden");
        card.classList.add("entering");
      });

      void document.body.offsetHeight;

      toShow.forEach((card) => card.classList.add("show-in"));

      setTimeout(() => {
        toShow.forEach((card) => {
          card.classList.remove("entering", "show-in");
        });
      }, FILTER_TRANSITION_MS);
    }, FILTER_TRANSITION_MS);
  });
});

// ============================================================
// SEE MORE / SEE LESS — blog articles (threshold differs by screen size)
// ============================================================

const seeMoreBtn = document.getElementById("blogSeeMoreBtn");
const SMALL_SCREEN_LIMIT = 3;
const LARGE_SCREEN_LIMIT = 20;
const SMALL_SCREEN_BREAKPOINT = 767;

let seeMoreExpanded = false;

function getCurrentLimit() {
  return window.innerWidth <= SMALL_SCREEN_BREAKPOINT
    ? SMALL_SCREEN_LIMIT
    : LARGE_SCREEN_LIMIT;
}

function applySeeMoreLimit() {
  const visibleCards = Array.from(articleCards).filter(
    (card) => !card.classList.contains("hidden")
  );

  const limit = getCurrentLimit();
  const needsButton = visibleCards.length > limit;

  visibleCards.forEach((card, index) => {
    const overLimit = !seeMoreExpanded && index >= limit;
    card.classList.toggle("overLimit", overLimit);
  });

  seeMoreBtn.classList.toggle("visible", needsButton);
  seeMoreBtn.textContent = seeMoreExpanded ? "See Less" : "See More";
  seeMoreBtn.setAttribute("aria-expanded", seeMoreExpanded);

  if (!needsButton) {
    seeMoreExpanded = false;
  }
}

seeMoreBtn.addEventListener("click", () => {
  seeMoreExpanded = !seeMoreExpanded;
  applySeeMoreLimit();

  if (!seeMoreExpanded) {
    document.querySelector(".blogArticles").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});

window.addEventListener("resize", () => {
  applySeeMoreLimit();
});

applySeeMoreLimit();

// ============================================================
// BLOG ARTICLE CLICK & REDIRECT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const articleCards = document.querySelectorAll(".article-card");

  articleCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      const imgSrc = card.querySelector("img").src;
      const title = card.querySelector(".card-title").textContent;
      const description = card.querySelector(".card-desc").textContent;
      const author = card.querySelector(".author").textContent;
      const date = card.querySelector(".date").textContent;

      const articleData = {
        imgSrc,
        title,
        description,
        author,
        date
      };

      localStorage.setItem("currentArticle", JSON.stringify(articleData));
      window.location.href = "read.html"; 
    });
  });
});

console.log('Blog page animations fully initialized!');