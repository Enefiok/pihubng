// mobilemenu

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
// LOAD ARTICLE DATA FROM LOCALSTORAGE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Get the saved data
  const savedData = localStorage.getItem("currentArticle");

  if (savedData) {
    // 2. Parse it back into a JavaScript object
    const article = JSON.parse(savedData);

    // 3. Target the elements by their new IDs
    const dateEl = document.getElementById("readDate");
    const topicEl = document.getElementById("readTopic");
    const imageEl = document.getElementById("readImage");
    const authorEl = document.getElementById("readAuthor");
    const descEl = document.getElementById("readDescription");

    // 4. Update the HTML with the new data
    if (dateEl) dateEl.textContent = article.date;
    if (topicEl) topicEl.textContent = article.title;
    if (imageEl) imageEl.src = article.imgSrc;
    if (authorEl) authorEl.textContent = `By ${article.author}`;
    if (descEl) descEl.textContent = article.description;

    // 5. Optional: Clear the data so it doesn't persist if they visit read.html directly later
    localStorage.removeItem("currentArticle");
  }
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
  { threshold: 0.1 }
);

scrollRevealElements.forEach((el) => revealObserver.observe(el));