if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
  requestAnimationFrame(() => window.scrollTo(0, 0));
});

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const modeTabList = document.querySelector(".mode-tabs");
const modeTabs = document.querySelectorAll(".mode-tab");
const modeLabel = document.querySelector("#mode-label");
const modeStatus = document.querySelector("#mode-status");
const modeCopy = document.querySelector("#mode-copy");
const modeShots = document.querySelectorAll("[data-shot]");
const modeStats = document.querySelector("#mode-stats");
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector("[data-form-note]");
const imageFallbacks = document.querySelectorAll("img[data-fallback]");

const modes = {
  overview: {
    label: "Creator Analytics",
    status: "128.4K views",
    stats: [
      ["28-day views", "128.4K"],
      ["Watch hours", "9.8K"],
      ["Next move", "Improve intros"],
    ],
    copy:
      "The overview introduces the command center, 28-day health, traffic sources, and video opportunity placeholders before a channel is fully populated.",
  },
  video: {
    label: "Video Analyzer",
    status: "4 uploads ready",
    stats: [
      ["Sample URL", "Ready"],
      ["Uploads loaded", "4"],
      ["AI edits", "7 ideas"],
    ],
    copy:
      "The analyzer screen is ready for pasted video URLs or refreshed linked uploads, then can show retention, pacing, and AI edit recommendations.",
  },
  channel: {
    label: "My Channel",
    status: "Connected profile",
    stats: [
      ["Total subs", "42.8K"],
      ["Total views", "1.9M"],
      ["Videos", "186"],
    ],
    copy:
      "The channel page shows the YouTube connection, account identity, subscriber trend, upload frequency, and core channel health placeholders.",
  },
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const applyImageFallback = (image) => {
  const fallbackText = image.dataset.fallback || "Image unavailable";
  const wrapper = image.closest(".app-shot-wrap");

  if (wrapper) {
    wrapper.dataset.fallback = fallbackText;
    wrapper.classList.add("is-missing");
    return;
  }

  const hero = image.closest(".hero");
  if (hero) {
    hero.classList.add("has-missing-image");
  }
};

imageFallbacks.forEach((image) => {
  image.addEventListener("error", () => applyImageFallback(image));
  if (image.complete && image.naturalWidth === 0) {
    applyImageFallback(image);
  }
});

const preloadModeImages = () => {
  modeShots.forEach((shot) => {
    const image = new Image();
    image.src = shot.currentSrc || shot.src;
  });
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(preloadModeImages);
} else {
  window.addEventListener("load", preloadModeImages, { once: true });
}

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

const setMode = (modeId) => {
  const mode = modes[modeId];
  if (!mode) return;

  modeTabs.forEach((currentTab) => {
    const isActive = currentTab.dataset.mode === modeId;
    currentTab.classList.toggle("is-active", isActive);
    currentTab.setAttribute("aria-selected", String(isActive));
  });

  modeLabel.textContent = mode.label;
  modeStatus.textContent = mode.status;
  modeShots.forEach((shot) => {
    shot.classList.toggle("is-active", shot.dataset.shot === modeId);
    shot.closest(".app-shot-wrap")?.classList.remove("is-missing");
  });
  modeStats.innerHTML = mode.stats
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");
  modeCopy.textContent = mode.copy;
};

modeTabList.addEventListener("click", (event) => {
  const tab = event.target.closest(".mode-tab");
  if (!tab) return;
  event.preventDefault();
  setMode(tab.dataset.mode);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Account creation prompt ready. Next step: connect YouTube inside ViewCast.";
  contactForm.reset();
});
