const hamburger = document.querySelector(".menu");
    const icon = document.querySelector("#menu-icon"); // Tìm cái icon
    const navLinks = document.querySelector(".nav-links");
    const overlay = document.querySelector(".overlay-bg");

    hamburger.addEventListener("click", () => {
        // 1. Trượt rèm ra/vào
        navLinks.classList.toggle("active");
        overlay.classList.toggle("active")
        
        // 2. Đổi icon từ 3 gạch (bars) sang chữ X (xmark)
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });