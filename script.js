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
  overview: {
    label: "Insight hub",
    status: "Channel connected",
    copy:
      "See verified channel momentum, discovery sources, watch time, and the AI signals that shape your next upload plan.",
  },
  video: {
    label: "Video AI",
    status: "1 upload selected",
    copy:
      "Break down a single upload by retention, engagement, search intent, and AI-recommended edits.",
  },
  strategy: {
    label: "AI strategy",
    status: "3 ideas ranked",
    copy:
      "Ask ViewCast what to make next, when to publish it, and how to package the idea for your audience.",
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
  formNote.textContent = "Thanks. Your early access request is ready to connect to a backend.";
  contactForm.reset();
});
