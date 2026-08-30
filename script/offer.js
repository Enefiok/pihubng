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
// OFFER TABS
// ============================================================

const optionBtns = document.querySelectorAll(".option-btn");
const offerPanels = document.querySelectorAll(".offer-panel");

optionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-panel");

    optionBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    offerPanels.forEach((panel) => {
      panel.classList.toggle(
        "active",
        panel.getAttribute("data-panel") === target,
      );
    });
  });
});

// ============================================================
// BOOKING FORM — reusable per panel
// ============================================================

function initBookingPanel(panelSelector, formId, defaultTitle, defaultDesc) {
  const panel = document.querySelector(panelSelector);
  if (!panel) return;

  const options3 = panel.querySelector(".options3");
  const bookingForm = document.getElementById(formId);
  const planInput = bookingForm?.querySelector('input[name="plan"]');
  const changePlanLink = bookingForm?.querySelector("[data-change-plan]");
  const title = panel.querySelector(".options2-title") || panel.querySelector("span:first-child");
  const desc = panel.querySelector(".options2-desc") || panel.querySelector("span:nth-child(2)");

  function showForm(planName) {
    if (planInput) planInput.value = planName;
    options3.style.display = "none";
    bookingForm.classList.add("active");
    if (title) title.textContent = `Book your ${defaultTitle}`;
    if (desc) desc.textContent = `You're booking the ${planName} plan. Fill in your details below.`;
  }

  function hideForm() {
    bookingForm.classList.remove("active");
    bookingForm.reset();
    options3.style.display = "flex";
    if (title) title.textContent = defaultTitle;
    if (desc) desc.textContent = defaultDesc;
  }

  panel.querySelectorAll(".planCard .selectBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.closest(".planCard").dataset.plan;
      showForm(plan);
    });
  });

  changePlanLink?.addEventListener("click", hideForm);

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(`Thanks! Your ${planInput.value} plan booking request has been received.`);
    hideForm();
  });
}

// Wire up each panel independently
initBookingPanel(
  '.offer-panel[data-panel="workspace"]',
  "bookingForm",
  "Workspace Plan",
  "Flexible workspace Plans designed to fit your schedule, needs and budget."
);

initBookingPanel(
  '.offer-panel[data-panel="privateRoom"]',
  "privateBookingForm",
  "Private Office",
  "Flexible workspace plans designed to fit your schedule"
);



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
// BOOKING FORM — shake on invalid submit (small delight)
// ============================================================

bookingForm?.addEventListener(
  "invalid",
  () => {
    bookingForm.classList.add("shake");
    setTimeout(() => bookingForm.classList.remove("shake"), 400);
  },
  true,
);
