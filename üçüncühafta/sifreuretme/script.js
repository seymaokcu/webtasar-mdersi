// --- Sabitler ve DOM Elementleri ---
const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const lenValueEl = document.getElementById("len-value"); // Yeni: Uzunluk değerini göstermek için
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const strengthIndicatorEl = document.getElementById("strength-indicator"); // Yeni: Güvenlik göstergesi
const alertContainer = document.getElementById("alert-container"); // Yeni: Uyarı kutusu

// Şifre karakter setleri
const buyukHarfler = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const kucukHarfler = "abcdefghijklmnopqrstuvwxyz";
const rakamlar = "0123456789";
const semboller = "!@#$%^&*()_+=-[]{};:<>,.?/|"; // Daha fazla sembol eklendi

// --- Karakter Getirme Fonksiyonları ---

function kucukHarfGetir() {
    return kucukHarfler[Math.floor(Math.random() * kucukHarfler.length)];
}

function buyukHarfGetir() {
    return buyukHarfler[Math.floor(Math.random() * buyukHarfler.length)];
}

function sayiGetir() {
    return rakamlar[Math.floor(Math.random() * rakamlar.length)];
}

function sembolGetir() {
    return semboller[Math.floor(Math.random() * semboller.length)];
}

// --- Ana Şifre Üretme Fonksiyonu ---

function sifreUret() {
    const len = parseInt(lenEl.value);
    let sifre = "";

    // Seçili kriterler
    const kriterler = [];
    if (upperEl.checked) kriterler.push(buyukHarfGetir);
    if (lowerEl.checked) kriterler.push(kucukHarfGetir);
    if (numberEl.checked) kriterler.push(sayiGetir);
    if (symbolEl.checked) kriterler.push(sembolGetir);

    // Minimum kriter kontrolü
    if (kriterler.length === 0) {
        uyariGoster("Lütfen en az bir şifre kriteri (harf, sayı veya sembol) seçin!", "error");
        pwEl.innerText = "Kriter Seçin";
        guncelleSifreGucu(0, 0); // Gücü sıfırla
        return;
    }
    
    // Şifre uzunluğu kontrolü (HTML input range ile kontrol ediliyor, ancak ekstra güvenlik)
    if (len < 8 || len > 25) {
        uyariGoster("Şifre uzunluğu 8 ile 25 arasında olmalıdır!", "error");
        return;
    }

    // 1. Aşama: Her seçilen kriterden en az bir karakter ekle
    kriterler.forEach(kriterFn => {
        sifre += kriterFn();
    });

    // 2. Aşama: Kalan uzunluğu rastgele seçilen kriterlerle doldur
    for (let i = sifre.length; i < len; i++) {
        // Kriterler dizisinden rastgele bir fonksiyon seç
        const rastgeleKriter = kriterler[Math.floor(Math.random() * kriterler.length)];
        sifre += rastgeleKriter();
    }
    
    // Şifreyi karıştır (Daha rastgele görünmesi için)
    sifre = karistirSifre(sifre);

    pwEl.innerText = sifre;
    guncelleSifreGucu(len, kriterler.length);
    uyariGoster("Yeni şifre başarıyla üretildi!", "success");
}

// Şifreyi Karıştırma Fonksiyonu (Fisher-Yates Algoritması)
function karistirSifre(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
    return arr.join('');
}


// --- Şifre Gücü Hesaplama ve Güncelleme Fonksiyonu ---

function guncelleSifreGucu(uzunluk, kriterSayisi) {
    let guc = "";
    let sinif = "";

    if (uzunluk < 10) {
        guc = "Çok Zayıf";
        sinif = "strength-weak";
    } else if (uzunluk < 14 && kriterSayisi < 3) {
        guc = "Zayıf";
        sinif = "strength-weak";
    } else if (uzunluk >= 14 && kriterSayisi >= 3) {
        guc = "Orta";
        sinif = "strength-medium";
    } else if (uzunluk >= 18 && kriterSayisi === 4) {
        guc = "Güçlü";
        sinif = "strength-strong";
    } else {
        guc = "Zayıf";
        sinif = "strength-weak"; // Varsayılan
    }
    
    // HTML'i ve sınıfı güncelle
    strengthIndicatorEl.textContent = guc;
    strengthIndicatorEl.className = ""; // Eski sınıfları temizle
    strengthIndicatorEl.classList.add(sinif);
}

// --- Uyarı Mesajı Gösterme Fonksiyonu ---
function uyariGoster(mesaj, tip) {
    const notif = document.createElement("div");
    notif.classList.add("alert", `alert-${tip}`);
    notif.innerText = mesaj;
    alertContainer.appendChild(notif);
    
    setTimeout(() => {
        notif.remove();
    }, 3500);
}


// --- Olay Dinleyicileri ---

// Şifre Üret Butonu
generateEl.addEventListener("click", sifreUret);

// Uzunluk Kaydırıcısı
lenEl.addEventListener("input", () => {
    lenValueEl.textContent = lenEl.value;
    guncelleSifreGucu(parseInt(lenEl.value), 0); // Sadece uzunluğa göre başlangıç gücünü güncelle
});

// Kopyalama Butonu
copyEl.addEventListener("click", () => {
    const sifre = pwEl.innerText.trim();

    if (sifre && sifre !== "Kriter Seçin" && sifre !== "Üretmek için tıklayın") {
        navigator.clipboard.writeText(sifre)
            .then(() => {
                uyariGoster("Şifre başarıyla panoya kopyalandı!", "success");
            })
            .catch(err => {
                // Tarayıcı desteklemiyorsa veya hata olursa eski yöntemi kullan
                const textarea = document.createElement("textarea");
                textarea.value = sifre;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                textarea.remove();
                uyariGoster("Şifre panoya kopyalandı!", "success");
            });
    } else {
        uyariGoster("Önce bir şifre üretmelisiniz!", "error");
    }
});


// Uygulama yüklendiğinde başlangıç değerlerini ayarla
document.addEventListener("DOMContentLoaded", () => {
    lenValueEl.textContent = lenEl.value;
    guncelleSifreGucu(parseInt(lenEl.value), 0);
});