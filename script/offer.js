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

if (menuToggle) menuToggle.addEventListener("click", openMenu);
if (menuClose) menuClose.addEventListener("click", closeMenu);
if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

if (menuToggle) {
  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openMenu();
  });
}

if (menuClose) {
  menuClose.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") closeMenu();
  });
}

// ============================================================
// SCROLL REVEAL (Base Elements)
// ============================================================
const scrollRevealElements = document.querySelectorAll(".scroll-reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
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
// SUBSCRIBE & FOOTER ANIMATIONS
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
  }, { threshold: 0.3, rootMargin: '0px 0px -30px 0px' });
  subscribeObserver.observe(subscribeElement);
}

document.querySelectorAll('.footer > div').forEach((el) => {
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        footerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  footerObserver.observe(el);
});

// ============================================================
// COPYRIGHT ANIMATION (Simplified)
// ============================================================
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
  const copyrightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        copyrightObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  copyrightObserver.observe(copyrightElement);
}

// ============================================================
// PANEL SWITCHING
// ============================================================
const optionBtns = document.querySelectorAll(".option-btn");
const panels = {
  workspace: document.querySelector('.offer-panel[data-panel="workspace"]'),
  privateRoom: document.querySelector('.offer-panel[data-panel="privateRoom"]'),
  conferenceRoom: document.querySelector('.offer-panel[data-panel="conferenceRoom"]'),
  podcast: document.querySelector('.offer-panel[data-panel="podcast"]'),
  courses: document.querySelector('.offer-panel[data-panel="courses"]')
};
const heroSection = document.querySelector('.heronav');

function switchToPanel(panelId) {
  optionBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.panel === panelId);
  });

  // Hide all panels first
  Object.values(panels).forEach(panel => {
    if (panel) {
      panel.classList.remove("active", "visible");
      // Reset any scroll-reveal elements inside
      panel.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.remove('visible');
      });
      // Reset course cards visibility
      panel.querySelectorAll('.courseCard').forEach(el => {
        el.classList.remove('visible');
      });
    }
  });

  // Show the target panel
  const targetPanel = panels[panelId];
  if (targetPanel) {
    targetPanel.classList.add("active");
    
    // DO NOT add visible class here - let the Intersection Observer handle it
    // The observer will detect when the panel scrolls into view
    
    // For workspace panel, we need to trigger the scroll-reveal for cards
    // when they come into view naturally
    if (panelId === 'workspace') {
      // Re-initialize observers for workspace cards
      setTimeout(() => {
        initWorkspaceObservers();
      }, 100);
    }
  }

  if (heroSection) {
    heroSection.classList.remove("panel-workspace", "panel-other");
    heroSection.classList.add(panelId === "workspace" ? "panel-workspace" : "panel-other");
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm && panelId !== 'workspace') {
    bookingForm.classList.remove('active');
  }
}

// ============================================================
// INITIALIZE OBSERVERS FOR WORKSPACE CARDS
// ============================================================
function initWorkspaceObservers() {
  const workspacePanel = panels.workspace;
  if (!workspacePanel) return;
  
  // Observe plan cards within workspace
  const planCards = workspacePanel.querySelectorAll('.planCard.scroll-reveal');
  planCards.forEach((card, index) => {
    // Remove existing visible class
    card.classList.remove('visible');
    
    // Create observer for each card
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add delay based on card position for staggered effect
          const delay = index * 150;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
    
    observer.observe(card);
  });
  
  // Observe the options2-title and options2-desc
  const title = workspacePanel.querySelector('.options2-title');
  const desc = workspacePanel.querySelector('.options2-desc');
  
  if (title) {
    title.classList.remove('visible');
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    titleObserver.observe(title);
  }
  
  if (desc) {
    desc.classList.remove('visible');
    const descObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          descObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    descObserver.observe(desc);
  }
}

// ============================================================
// INITIALIZE OBSERVERS FOR ALL PANELS (Private, Conference, Showroom, Courses)
// ============================================================
function initPanelObservers() {
  const panelIds = ['privateRoom', 'conferenceRoom', 'podcast', 'courses'];
  
  panelIds.forEach(panelId => {
    const panel = panels[panelId];
    if (!panel) return;
    
    // Create an observer for the entire panel
    const panelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Panel is visible - add visible class
          panel.classList.add('visible');
          panelObserver.unobserve(entry.target);
          
          // For courses, also animate the cards
          if (panelId === 'courses') {
            const cards = panel.querySelectorAll('.courseCard');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible');
              }, index * 150 + 200);
            });
          }
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // Only observe if panel is not already visible
    if (!panel.classList.contains('visible')) {
      panelObserver.observe(panel);
    }
  });
}

// ============================================================
// CHECK FOR TARGET PANEL FROM HOME PAGE
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  const targetPanel = localStorage.getItem('targetPanel');
  
  // Initialize all panel observers
  initPanelObservers();
  
  if (targetPanel && panels[targetPanel]) {
    localStorage.removeItem('targetPanel');
    setTimeout(() => {
      switchToPanel(targetPanel);
      
      // After switching, scroll to the offer section
      const offerSection = document.querySelector('.offer');
      if (offerSection) {
        const top = offerSection.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      
      // After scrolling, the Intersection Observer will trigger animations
      // For courses, we need to re-initialize observers after scroll
      setTimeout(() => {
        if (targetPanel === 'courses') {
          const coursesPanel = panels.courses;
          if (coursesPanel) {
            const cards = coursesPanel.querySelectorAll('.courseCard');
            cards.forEach((card, index) => {
              card.classList.remove('visible');
              const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    setTimeout(() => {
                      entry.target.classList.add('visible');
                    }, index * 150 + 200);
                    cardObserver.unobserve(entry.target);
                  }
                });
              }, { threshold: 0.15 });
              cardObserver.observe(card);
            });
          }
        }
      }, 800);
      
    }, 400);
  } else {
    // Default to workspace
    switchToPanel('workspace');
    
    // Initialize workspace observers
    setTimeout(() => {
      initWorkspaceObservers();
    }, 300);
  }
});

// ============================================================
// BUTTON CLICK HANDLER - Switch panels without forcing animations
// ============================================================
optionBtns.forEach((btn) => {
  btn.addEventListener("click", function() {
    const panelId = this.dataset.panel;
    switchToPanel(panelId);
    
    // After switching, re-initialize observers for the new panel
    setTimeout(() => {
      if (panelId === 'workspace') {
        initWorkspaceObservers();
      } else {
        // For other panels, re-initialize their observers
        const panel = panels[panelId];
        if (panel) {
          panel.classList.remove('visible');
          
          // Re-observe the panel
          const panelObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                panel.classList.add('visible');
                panelObserver.unobserve(entry.target);
                
                // For courses, animate cards
                if (panelId === 'courses') {
                  const cards = panel.querySelectorAll('.courseCard');
                  cards.forEach((card, index) => {
                    setTimeout(() => {
                      card.classList.add('visible');
                    }, index * 150 + 200);
                  });
                }
              }
            });
          }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
          
          panelObserver.observe(panel);
        }
      }
    }, 100);
  });
});
// ============================================================
// CHECK FOR TARGET PANEL FROM HOME PAGE
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  const targetPanel = localStorage.getItem('targetPanel');
  
  if (targetPanel && panels[targetPanel]) {
    localStorage.removeItem('targetPanel');
    setTimeout(() => {
      switchToPanel(targetPanel);
      const offerSection = document.querySelector('.offer');
      if (offerSection) {
        const top = offerSection.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 400);
  } else {
    switchToPanel('workspace');
  }
});

optionBtns.forEach((btn) => {
  btn.addEventListener("click", function() {
    switchToPanel(this.dataset.panel);
  });
});

// ============================================================
// COUNTER ANIMATION (Added)
// ============================================================
const counterElements = document.querySelectorAll(".counter-number");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        const duration = 1500; 
        const totalFrames = Math.round(duration / (1000 / 60)); // 60fps
        const increment = target / totalFrames;
        let current = 0;

        const animateCounter = () => {
          current += increment;
          if (current < target) {
            counter.innerText = Math.ceil(current).toLocaleString();
            requestAnimationFrame(animateCounter);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        
        animateCounter();
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 }
);
counterElements.forEach((el) => counterObserver.observe(el));

// ============================================================
// PLAN CARD SELECTION (Workspace)
// ============================================================
const selectBtns = document.querySelectorAll(".selectBtn");
const bookingForm = document.getElementById("bookingForm");
const planInput = document.getElementById("planInput");
const changePlanLink = document.getElementById("changePlan");
let selectedPlan = null;

selectBtns.forEach((btn) => {
  btn.addEventListener("click", function(e) {
    e.stopPropagation();
    const planCard = this.closest(".planCard");
    if (!planCard) return;
    
    selectedPlan = planCard.dataset.plan;
    if (bookingForm) {
      bookingForm.classList.add("active");
      if (planInput) planInput.value = selectedPlan;
    }
  });
});

if (changePlanLink) {
  changePlanLink.addEventListener("click", function(e) {
    e.preventDefault();
    if (bookingForm) {
      bookingForm.classList.remove("active");
      selectedPlan = null;
      if (planInput) planInput.value = "";
    }
  });
}

// ============================================================
// BOOKING FORM SUBMISSION
// ============================================================
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById("firstName")?.value.trim();
    const lastName = document.getElementById("lastName")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const startDate = document.getElementById("startDate")?.value;
    
    if (!firstName || !lastName || !email || !phone || !startDate) {
      alert("Please fill in all required fields.");
      return;
    }
    
    alert(`Thank you for booking the ${selectedPlan} plan! We will contact you shortly.`);
    this.reset();
    this.classList.remove("active");
    selectedPlan = null;
    if (planInput) planInput.value = "";
  });
}

// ============================================================
// WHATSAPP ENQUIRY BUTTONS
// ============================================================
// Private/Conference/Showroom Enquiry
document.querySelectorAll(".privateEnquiry-btn").forEach((btn) => {
  btn.addEventListener("click", function() {
    const message = encodeURIComponent("Hello, I'm interested in booking a space at PIHUB. Can you provide more information?");
    window.open(`https://wa.me/2348088349833?text=${message}`, "_blank");
  });
});

// Course Enquiry (Excludes 'unavailable' cards)
document.querySelectorAll(".courseCard:not(.unavailable) .course-enquiry-btn").forEach((btn) => {
  btn.addEventListener("click", function(e) {
    e.stopPropagation();
    const courseCard = this.closest(".courseCard");
    const courseName = courseCard?.querySelector("div:nth-child(2)")?.textContent.trim() || "a course";
    const message = encodeURIComponent(`Hello, I'm interested in the ${courseName} course at PIHUB. Can you provide more information?`);
    window.open(`https://wa.me/2348088349833?text=${message}`, "_blank");
  });
});

console.log('Offer page animations fully initialized!');

// ============================================================
// WORD-BY-WORD PROCESSION SPLIT
// ============================================================
function splitIntoWords(el) {
  if (!el || el.dataset.split === "true") return;
  
  const text = el.textContent.trim();
  const words = text.split(/\s+/);
  
  // Use non-breaking space or margin for spacing
  let html = '';
  words.forEach((word, index) => {
    html += `<span class="word">${word}</span>`;
    if (index < words.length - 1) {
      html += '&nbsp;'; // Use non-breaking space instead of regular space
    }
  });
  
  el.innerHTML = html;
  el.dataset.split = "true";
}


// ============================================================
// HANDLE HASH LINKS FOR FOOTER NAVIGATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Check if there's a hash in the URL
  const hash = window.location.hash.replace('#', '');
  
  if (hash && panels[hash]) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      switchToPanel(hash);
      
      // Scroll to the offer section
      const offerSection = document.querySelector('.offer');
      if (offerSection) {
        const top = offerSection.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 400);
  }
});

// ============================================================
// HANDLE CLICK ON FOOTER SERVICE LINKS (for same page navigation)
// ============================================================
document.querySelectorAll('.footer a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const panelId = this.getAttribute('href').replace('#', '');
    
    if (panels[panelId]) {
      // Switch to the panel
      switchToPanel(panelId);
      
      // Update URL without reloading
      history.pushState(null, '', `#${panelId}`);
      
      // Scroll to offer section
      const offerSection = document.querySelector('.offer');
      if (offerSection) {
        const top = offerSection.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      
      // Re-initialize observers
      setTimeout(() => {
        if (panelId === 'workspace') {
          initWorkspaceObservers();
        } else {
          const panel = panels[panelId];
          if (panel) {
            panel.classList.remove('visible');
            
            const panelObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  panel.classList.add('visible');
                  panelObserver.unobserve(entry.target);
                  
                  if (panelId === 'courses') {
                    const cards = panel.querySelectorAll('.courseCard');
                    cards.forEach((card, index) => {
                      setTimeout(() => {
                        card.classList.add('visible');
                      }, index * 150 + 200);
                    });
                  }
                }
              });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            
            panelObserver.observe(panel);
          }
        }
      }, 100);
    }
  });
});

// ============================================================
// HANDLE BROWSER BACK/FORWARD BUTTONS
// ============================================================
window.addEventListener('hashchange', function() {
  const hash = window.location.hash.replace('#', '');
  
  if (hash && panels[hash]) {
    switchToPanel(hash);
    
    setTimeout(() => {
      if (hash === 'workspace') {
        initWorkspaceObservers();
      }
    }, 100);
  }
});