// script.js
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const reveals = document.querySelectorAll(".reveal");
const year = document.querySelector("#year");
const form = document.querySelector(".booking-form");
const formMessage = document.querySelector(".form-message");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

reveals.forEach((element) => observer.observe(element));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent = "Tak for din besked. Du bliver kontaktet hurtigst muligt.";
  form.reset();
});
