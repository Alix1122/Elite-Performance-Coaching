// CURSOR
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mx = 0,
    my = 0,
    fx = 0,
    fy = 0;
document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
});
function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animateFollower);
}
animateFollower();
document
    .querySelectorAll("a, button, .service-card, .program-card, .result-photo")
    .forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hover");
            follower.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
            follower.classList.remove("hover");
        });
    });

// NAVBAR SCROLL
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// HAMBURGER
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
});
document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
    });
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
revealEls.forEach((el) => revealObserver.observe(el));

// COUNTER ANIMATION
function animateCounter(el, target, duration) {
    let start = 0;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const val = Math.floor(progress * target);
        el.textContent = el.dataset.suffix
            ? val + el.dataset.suffix
            : val + (el.dataset.plus ? "+" : "");
        if (progress < 1) requestAnimationFrame(step);
        else
            el.textContent =
                target + (el.dataset.plus ? "+" : el.dataset.suffix || "");
    };
    requestAnimationFrame(step);
}
const statNums = document.querySelectorAll(".stat-num");
const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const raw = el.textContent;
                const num = parseInt(raw);
                el.dataset.plus = raw.includes("+") ? "1" : "";
                el.dataset.suffix = raw.includes("%") ? "%" : "";
                animateCounter(el, num, 1400);
                statsObserver.unobserve(el);
            }
        });
    },
    { threshold: 0.5 },
);
statNums.forEach((el) => statsObserver.observe(el));

// FORM SUBMIT
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target;
    btn.textContent = "Sending...";
    btn.style.opacity = "0.7";
    setTimeout(() => {
        btn.textContent = "✓ Message Sent!";
        btn.style.background = "#27ae60";
        btn.style.opacity = "1";
    }, 1500);
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
