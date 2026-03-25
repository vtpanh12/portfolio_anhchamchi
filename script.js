const hamburger = document.querySelector(".menu");
    const icon = document.querySelector("#menu-icon");
    const navLinks = document.querySelector(".nav-links");
    const overlay = document.querySelector(".overlay-bg");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        overlay.classList.toggle("active")
        
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });