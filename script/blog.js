

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

  // Button stays visible whenever there's more than the limit —
  // its label/behavior changes instead of hiding it once expanded
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

  // When collapsing, scroll back up to the section so the user
  // isn't left staring at empty space where the hidden cards were
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
    // Make it look clickable
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      // 1. Extract data from the clicked card
      const imgSrc = card.querySelector("img").src;
      const title = card.querySelector(".card-title").textContent;
      const description = card.querySelector(".card-desc").textContent;
      const author = card.querySelector(".author").textContent;
      const date = card.querySelector(".date").textContent;

      // 2. Save data to localStorage as a JSON string
      const articleData = {
        imgSrc,
        title,
        description,
        author,
        date
      };

      localStorage.setItem("currentArticle", JSON.stringify(articleData));

      // 3. Navigate to the read page
      // (Make sure "read.html" is the correct path relative to blog.html)
      window.location.href = "read.html"; 
    });
  });
});