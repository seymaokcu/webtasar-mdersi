const flagCursor = document.querySelector("[data-flag-cursor]");

window.addEventListener("mousemove", function (e) {
    const pozX = e.clientX;
    const pozY = e.clientY;

    // Bayrağı doğrudan fare konumuna ayarla
    flagCursor.style.left = `${pozX}px`;
    flagCursor.style.top = `${pozY}px`;

    // Animasyon efekti için
    flagCursor.animate({
        left: `${pozX}px`,
        top: `${pozY}px`
    }, { duration: 300, fill: "forwards" }); // Animasyon süresi 300ms, daha hızlı tepki için
});