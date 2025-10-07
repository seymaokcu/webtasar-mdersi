const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ciz2d = canvas.getContext("2d"); // 2D çizim bağlamı

// Başlangıç değerleri
let size = 30;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;

// Renk seçiciden başlangıç rengini al
color = colorEl.value;
boyutBilgisi(); // Başlangıç boyutunu göster

// === Olay Dinleyicileri (Event Listeners) ===

// Fareye Basma (Çizime Başla)
canvas.addEventListener("mousedown", (e) => { // 'e' objesini ekledik
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

// Fareden Elini Çekme (Çizimi Bitir)
canvas.addEventListener("mouseup", () => {
    isPressed = false;

    // Koordinatları sıfırla
    x = undefined;
    y = undefined;
});

// Fareyi Hareket Ettirme
canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        // Çizimi daha akıcı yapmak için hem daire hem de çizgi kullanıyoruz
        daireCiz(x2, y2);
        cizgiCiz(x, y, x2, y2);
        
        // Yeni başlangıç noktasını güncelle
        x = x2;
        y = y2;
    }
});

// === Çizim Fonksiyonları ===

// Nokta/Daire Çizimi
function daireCiz(x, y) {
    ciz2d.beginPath();
    ciz2d.arc(x, y, size, 0, Math.PI * 2);
    ciz2d.fillStyle = color;
    ciz2d.fill();
}

// İki nokta arasına çizgi çekme
function cizgiCiz(x1, y1, x2, y2) {
    ciz2d.beginPath();
    ciz2d.moveTo(x1, y1);
    ciz2d.lineTo(x2, y2);
    ciz2d.strokeStyle = color;
    ciz2d.lineWidth = size * 2; // Çizgi kalınlığını fırça boyutunun iki katı yap
    ciz2d.stroke();
}

// === Araç Kutusu Fonksiyonları ===

// Boyutu Artırma
increaseBtn.addEventListener("click", () => {
    size += 5;

    if (size > 50) { // Maksimum boyutu 50'de tut
        size = 50;
    }
    boyutBilgisi();
});

// Boyutu Azaltma
decreaseBtn.addEventListener("click", () => {
    size -= 5;

    if (size < 5) { // Minimum boyutu 5'te tut
        size = 5;
    }
    boyutBilgisi();
});

// Renk Değişikliği
colorEl.addEventListener("input", (e) => { // 'change' yerine 'input' kullandık
    color = e.target.value;
});

// Temizle Butonu
clearEl.addEventListener("click", () => {
    // Kanvasın tamamını temizler
    ciz2d.clearRect(0, 0, canvas.width, canvas.height);
});

// Boyut Bilgisini Güncelleme
function boyutBilgisi() {
    sizeEl.innerText = size;
}