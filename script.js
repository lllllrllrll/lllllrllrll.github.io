const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const modeTabs = document.querySelectorAll(".mode-tab");
const modeLabel = document.querySelector("#mode-label");
const modeStatus = document.querySelector("#mode-status");
const modeCopy = document.querySelector("#mode-copy");
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector("[data-form-note]");

const modes = {
  production: {
    label: "Production room",
    status: "8 sources live",
    copy:
      "Give directors a fast switching surface with source notes, stream health, and share controls in reach.",
  },
  operations: {
    label: "Operations watch",
    status: "14 sites online",
    copy:
      "Monitor distributed teams with location context, feed quality, and escalation notes visible beside the live view.",
  },
  briefing: {
    label: "Briefing room",
    status: "32 viewers invited",
    copy:
      "Create a polished stakeholder view with curated feeds, controlled chat, and a secure link for fast alignment.",
  },
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

modeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const mode = modes[tab.dataset.mode];

    modeTabs.forEach((currentTab) => {
      const isActive = currentTab === tab;
      currentTab.classList.toggle("is-active", isActive);
      currentTab.setAttribute("aria-selected", String(isActive));
    });

    modeLabel.textContent = mode.label;
    modeStatus.textContent = mode.status;
    modeCopy.textContent = mode.copy;
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Thanks. Your walkthrough request is ready to connect to a backend.";
  contactForm.reset();
});
