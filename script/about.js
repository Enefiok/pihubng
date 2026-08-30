

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
  link.addEventListener("click", (event) => {
    // Placeholder links (empty href) shouldn't navigate/reload —
    // that was cutting the close animation off mid-way
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
  {
    threshold: 0.15,
  }
);

scrollRevealElements.forEach((element) => {
  revealObserver.observe(element);
});