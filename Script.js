// script.js
const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const navPanel = document.querySelector(".nav-panel");
const revealElements = document.querySelectorAll(".reveal");
const year = document.querySelector("#year");
const form = document.querySelector(".booking-form");
const formStatus = document.querySelector(".form-status");
const cursorGlow = document.querySelector(".cursor-glow");

year.textContent = new Date().getFullYear();

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 32);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState);

menuBtn.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");

  menuBtn.classList.toggle("active", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navPanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("open");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  revealObserver.observe(element);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.querySelector("[name='name']").value.trim();

  formStatus.textContent = name
    ? `Tak, ${name}. Din forespørgsel er registreret.`
    : "Tak. Din forespørgsel er registreret.";

  form.reset();
});

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  navPanel.classList.remove("open");
  menuBtn.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
});
