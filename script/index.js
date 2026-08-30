

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

// Close the menu whenever a nav link inside it is tapped
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Keyboard support (Enter/Space) since the icons use role="button"
menuToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") openMenu();
});

menuClose.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") closeMenu();
});


// ============================================================
// OFFER CARDS
// ============================================================

// Note: the original version read `event.currentTarget` without
// receiving `event` as a callback argument. This version keeps
// your corrected implementation.

const offerCards = document.querySelectorAll(".offerCard");
const supportsHover = window.matchMedia("(hover: hover)").matches;

offerCards.forEach((offerCard) => {
  if (supportsHover) {
    // Mouse/trackpad: reveal on hover
    offerCard.addEventListener("mouseenter", (event) => {
      event.currentTarget.classList.add("hovered");
    });

    offerCard.addEventListener("mouseleave", (event) => {
      event.currentTarget.classList.remove("hovered");
    });
  } else {
    // Touch devices have no hover state, so tap toggles the card
    offerCard.addEventListener("click", (event) => {
      const card = event.currentTarget;
      const alreadyOpen = card.classList.contains("hovered");

      offerCards.forEach((c) => c.classList.remove("hovered"));

      if (!alreadyOpen) {
        card.classList.add("hovered");
      }
    });
  }
});

// ============================================================
// OFFER CARD CLICK REDIRECT
// ============================================================
const offerCardq = document.querySelectorAll(".offer3 .offerCard");

offerCardq.forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = "offer.html";
  });
});
// ============================================================
// SEE MORE BUTTON
// ============================================================

const seeMoreBtn = document.getElementById("seeMoreBtn");
const offer3 = document.querySelector(".offer3");

if (seeMoreBtn) {
  seeMoreBtn.addEventListener("click", () => {
    const isExpanded = offer3.classList.toggle("expanded");

    seeMoreBtn.textContent = isExpanded ? "See less" : "See more";

    seeMoreBtn.setAttribute("aria-expanded", isExpanded);
  });
}


// ============================================================
// GALLERY
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
// SCROLL REVEAL
// ============================================================

const scrollRevealElements =
  document.querySelectorAll(".scroll-reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        // Stop watching once the element has appeared
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

scrollRevealElements.forEach((element) => {
  revealObserver.observe(element);
});