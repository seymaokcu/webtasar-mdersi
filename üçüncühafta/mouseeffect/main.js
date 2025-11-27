const flagCursor = document.querySelector("[data-flag-cursor]");

window.addEventListener("mousemove", function (e) {
    const pozX = e.clientX;
    const pozY = e.clientY;

    flagCursor.style.left = `${pozX}px`;
    flagCursor.style.top = `${pozY}px`;

    flagCursor.animate({
        left: `${pozX}px`,
        top: `${pozY}px`
    }, { duration: 300, fill: "forwards" }); 
});
