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
const darkmode = document.getElementById("dark-mode-checkbox");
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    darkmode.checked = true;
}
darkmode.addEventListener("change", ()=>{
    if(darkmode.checked){
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    }
    else{
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
})
