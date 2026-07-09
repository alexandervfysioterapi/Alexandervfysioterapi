const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealElements = document.querySelectorAll(".reveal");
const bookingForm = document.querySelector("#booking-form");
const formStatus = document.querySelector("#form-status");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

function handleHeaderScroll() {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll);
handleHeaderScroll();

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

if (bookingForm && formStatus) {
  bookingForm.addEventListener("submit", (event) => {
    const requiredFields = bookingForm.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (field.type === "checkbox") {
        if (!field.checked) isValid = false;
      } else if (!field.value.trim()) {
        isValid = false;
      }
    });

    if (!isValid) {
      event.preventDefault();
      formStatus.textContent = "Udfyld venligst alle felter, før du sender formularen.";
      formStatus.style.color = "#9b7634";
      return;
    }

    formStatus.textContent = "Tak. Din mailklient åbnes nu, så du kan sende din forespørgsel.";
    formStatus.style.color = "#1e293b";
  });
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });
    }
  });
});

let ticking = false;

function parallaxHero() {
  const heroCard = document.querySelector(".hero-card");
  const hero = document.querySelector(".hero");

  if (!heroCard || !hero) return;

  const heroBounds = hero.getBoundingClientRect();

  if (heroBounds.bottom < 0 || heroBounds.top > window.innerHeight) return;

  const movement = window.scrollY * 0.04;
  heroCard.style.transform = `translateY(${movement}px)`;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      parallaxHero();
      ticking = false;
    });

    ticking = true;
  }
});

const cards = document.querySelectorAll(".service-card, .price-card, .contact-card");

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});
