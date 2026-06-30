document.addEventListener("DOMContentLoaded", function () {

    // Smooth scroll (ekstra sikkerhed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Fade-in animation når man scroller
    const elements = document.querySelectorAll(".card, .price, .about, h2");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        el.style.transition = "0.6s ease";
        observer.observe(el);
    });

});
