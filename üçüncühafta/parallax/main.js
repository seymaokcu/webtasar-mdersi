
const title = document.querySelector(".text");
const layer_2 = document.querySelector(".layer-2");
const layer_3 = document.querySelector(".layer-3");
const layer_4 = document.querySelector(".layer-4");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-link");

document.addEventListener("scroll", function(){
    let scroll_value = window.scrollY;
    
    title.style.opacity = 1 - scroll_value / 500;
    title.style.transform = `translate(-50%, calc(-50% + ${scroll_value * 0.5}px))`;

    layer_2.style.transform = `translateY(${scroll_value * 1.8}px)`; 

    layer_3.style.transform = `translateY(${scroll_value * 1.5}px)`;
 
    layer_4.style.transform = `translateY(${scroll_value * 1.2}px)`;
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {
    let current = '';
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100; 
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(current)) {
            link.classList.add('active');
        }
    });
});
