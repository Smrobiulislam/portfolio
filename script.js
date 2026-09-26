"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const header = document.getElementById("header");
    const themeBtn = document.getElementById("themeBtn");
    const scrollTopBtn = document.getElementById("scrollTop");
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const codeBackground = document.getElementById("codeBackground");
    const particles = document.getElementById("particles");
    const typingText = document.getElementById("typingText");


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    function closeMenu() {
        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    }

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                navMenu.classList.toggle("active");

            menuBtn.classList.toggle("active", isOpen);

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.textContent =
                isOpen ? "✕" : "☰";
        });
    }


    /* =========================================
       NAVIGATION
    ========================================= */

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const target =
                document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            closeMenu();
        });
    });


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("main section[id]");

    function updateActiveNav() {

        if (!sections.length) return;

        let current = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 220;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                current =
                    section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                current &&
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateActiveNav
    );

    updateActiveNav();


    /* =========================================
       TYPING ANIMATION
    ========================================= */

    if (typingText) {

        const words = [
            "Creative Web Developer",
            "UI / UX Designer",
            "Frontend Developer",
            "Web Designer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord =
                words[wordIndex];

            if (!deleting) {

                charIndex++;

                typingText.textContent =
                    currentWord.substring(
                        0,
                        charIndex
                    );

                if (
                    charIndex >=
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1800
                    );

                    return;
                }

            } else {

                charIndex--;

                typingText.textContent =
                    currentWord.substring(
                        0,
                        charIndex
                    );

                if (charIndex <= 0) {

                    charIndex = 0;
                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 55 : 90
            );
        }

        typeEffect();
    }


    /* =========================================
       PROJECT FILTER
    ========================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");

            projectCards.forEach((card) => {

                const category =
                    card.getAttribute("data-category");

                const show =
                    filter === "all" ||
                    filter === category;

                if (show) {

                    card.style.display = "block";

                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                        card.style.transform =
                            "translateY(0)";
                    });

                } else {

                    card.style.opacity = "0";
                    card.style.transform =
                        "translateY(15px)";

                    setTimeout(() => {

                        if (
                            card.style.opacity === "0"
                        ) {
                            card.style.display = "none";
                        }

                    }, 250);
                }
            });
        });
    });


    /* =========================================
       ANIMATED SKILLS
    ========================================= */

    const skillBars =
        document.querySelectorAll(".skill-bar span");

    let skillsAnimated = false;

    function animateSkills() {

        if (skillsAnimated || !skillBars.length) {
            return;
        }

        const skillsSection =
            document.getElementById("skills");

        if (!skillsSection) {
            return;
        }

        const sectionTop =
            skillsSection.getBoundingClientRect().top;

        if (
            sectionTop <
            window.innerHeight * 0.8
        ) {

            skillBars.forEach((bar) => {

                const width =
                    bar.getAttribute("data-width");

                if (width) {
                    bar.style.width = width;
                }
            });

            skillsAnimated = true;
        }
    }

    window.addEventListener(
        "scroll",
        animateSkills,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        animateSkills
    );

    animateSkills();


    /* =========================================
   CONTACT FORM - FORMSPREE
========================================= */

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (formMessage) {
            formMessage.textContent = "Sending message...";
            formMessage.style.color = "#d4af37";
        }

        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {

            const formData =
                new FormData(contactForm);

            const response =
                await fetch(
                    contactForm.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );

            if (response.ok) {

                if (formMessage) {

                    formMessage.textContent =
                        "Message sent successfully! ✅";

                    formMessage.style.color =
                        "#7ee787";
                }

                contactForm.reset();

            } else {

                const data =
                    await response.json();

                if (formMessage) {

                    formMessage.textContent =
                        data?.errors?.length
                            ? data.errors
                                .map(error => error.message)
                                .join(", ")
                            : "Failed to send message. Please try again.";

                    formMessage.style.color =
                        "#ff6b6b";
                }
            }

        } catch (error) {

            console.error(
                "Formspree Error:",
                error
            );

            if (formMessage) {

                formMessage.textContent =
                    "Failed to send message. Please check your internet connection.";

                formMessage.style.color =
                    "#ff6b6b";
            }

        } finally {

            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent =
                    "Send Message";
            }
        }

    });

}
    /* =========================================
       SCROLL TO TOP
    ========================================= */

    function updateScrollTop() {

        if (!scrollTopBtn) return;

        scrollTopBtn.classList.toggle(
            "show",
            window.scrollY > 500
        );
    }

    window.addEventListener(
        "scroll",
        updateScrollTop,
        { passive: true }
    );

    updateScrollTop();

    if (scrollTopBtn) {

        scrollTopBtn.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }


    /* =========================================
       DARK / LIGHT THEME
    ========================================= */

    if (themeBtn) {

        const savedTheme =
            localStorage.getItem(
                "portfolio-theme"
            );

        if (savedTheme === "light") {

            document.body.classList.add(
                "light-theme"
            );

            themeBtn.textContent = "🌙";

        } else {

            document.body.classList.remove(
                "light-theme"
            );

            themeBtn.textContent = "☀️";
        }


        themeBtn.addEventListener(
            "click",
            () => {

                const isLight =
                    document.body.classList.toggle(
                        "light-theme"
                    );

                if (isLight) {

                    themeBtn.textContent = "🌙";

                    localStorage.setItem(
                        "portfolio-theme",
                        "light"
                    );

                } else {

                    themeBtn.textContent = "☀️";

                    localStorage.setItem(
                        "portfolio-theme",
                        "dark"
                    );
                }
            }
        );
    }


    /* =========================================
       CODE BACKGROUND
    ========================================= */

    const codeTexts = [

        "<html>",
        "</div>",
        "const developer = true;",
        "function createWebsite() {}",
        "display: flex;",
        "color: #d4af37;",
        "JavaScript();",
        "HTML5",
        "CSS3",
        "UI / UX",
        "Web Developer",
        "{ Rabiul }",
        "responsive: true;",
        "if (creative) { code(); }",
        "</section>",
        "margin: auto;",
        "padding: 20px;",
        "document.querySelector();",
        "Creative Design",
        "Frontend Development"
    ];

    if (codeBackground) {

        /* Prevent duplicate background text */
        codeBackground.innerHTML = "";

        for (let i = 0; i < 22; i++) {

            const line =
                document.createElement("div");

            line.className = "code-line";

            line.textContent =
                codeTexts[
                    Math.floor(
                        Math.random() *
                        codeTexts.length
                    )
                ];

            line.style.left =
                Math.random() * 100 + "%";

            line.style.animationDuration =
                12 +
                Math.random() * 15 +
                "s";

            line.style.animationDelay =
                Math.random() * 10 +
                "s";

            codeBackground.appendChild(line);
        }
    }


    /* =========================================
       GOLD PARTICLES
    ========================================= */

    if (particles) {

        /* Prevent duplicate particles */
        particles.innerHTML = "";

        for (let i = 0; i < 35; i++) {

            const particle =
                document.createElement("span");

            particle.className = "particle";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.animationDuration =
                8 +
                Math.random() * 12 +
                "s";

            particle.style.animationDelay =
                Math.random() * 10 +
                "s";

            particle.style.opacity =
                0.2 +
                Math.random() * 0.8;

            particles.appendChild(particle);
        }
    }


    /* =========================================
       CLOSE MENU
    ========================================= */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navMenu ||
                !menuBtn ||
                !navMenu.classList.contains("active")
            ) {
                return;
            }

            if (
                !navMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                closeMenu();
            }
        }
    );


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }
        }
    );


    /* =========================================
       PREVENT EMPTY SOCIAL LINKS
    ========================================= */

    const socialLinks =
        document.querySelectorAll(
            ".hero-social a, .contact-social a"
        );

    socialLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    event.preventDefault();
                }
            }
        );
    });


    /* =========================================
       IMAGE ERROR CHECK
    ========================================= */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image could not be loaded:",
                    image.getAttribute("src")
                );

                image.classList.add(
                    "image-error"
                );
            }
        );
    });


    /* =========================================
       FINAL MESSAGE
    ========================================= */

    console.log(
        "Rabiul Sardar Portfolio Loaded Successfully."
    );

});