// PARALLAX EFEKTİ İÇİN KULLANILAN DOM ELEMANLARI
const title = document.querySelector(".text");
const layer_2 = document.querySelector(".layer-2");
const layer_3 = document.querySelector(".layer-3");
const layer_4 = document.querySelector(".layer-4");

// MOBİL MENÜ İÇİN KULLANILAN DOM ELEMANLARI
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-link");


// 1. PARALLAX HAREKETİ (Transform Kullanarak Performansı Artırıldı)
document.addEventListener("scroll", function(){
    let scroll_value = window.scrollY;
    
    // Başlık: Aşağı kaydırıldıkça daha hızlı yukarı hareket eder ve kaybolur
    title.style.opacity = 1 - scroll_value / 500;
    title.style.transform = `translate(-50%, calc(-50% + ${scroll_value * 0.5}px))`;

    // layer-2 (En Yakın/En Hızlı): 1.8 kat hız
    layer_2.style.transform = `translateY(${scroll_value * 1.8}px)`; 
    
    // layer-3 (Orta Hız): 1.5 kat hız
    layer_3.style.transform = `translateY(${scroll_value * 1.5}px)`;
    
    // layer-4 (En Uzak/En Yavaş): 1.2 kat hız
    layer_4.style.transform = `translateY(${scroll_value * 1.2}px)`;
});


// 2. MOBİL MENÜ İŞLEVİ
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Menü açıldıktan sonra bir linke tıklandığında menüyü kapat
navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// 3. SCROLLSPY İŞLEVİ (Hangi linkin aktif olduğunu belirler)
window.addEventListener("scroll", () => {
    let current = '';
    const scrollPosition = window.scrollY;

    // Her bir bölüm (section) için kontrol
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100; // Header yüksekliğini telafi etmek için
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Aktif sınıfını linklere uygula
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(current)) {
            link.classList.add('active');
        }
    });
});