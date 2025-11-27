
const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const lenValueEl = document.getElementById("len-value"); 
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const strengthIndicatorEl = document.getElementById("strength-indicator"); 
const alertContainer = document.getElementById("alert-container"); 
const buyukHarfler = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const kucukHarfler = "abcdefghijklmnopqrstuvwxyz";
const rakamlar = "0123456789";
const semboller = "!@#$%^&*()_+=-[]{};:<>,.?/|"; 

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

function sifreUret() {
    const len = parseInt(lenEl.value);
    let sifre = "";
    const kriterler = [];
    if (upperEl.checked) kriterler.push(buyukHarfGetir);
    if (lowerEl.checked) kriterler.push(kucukHarfGetir);
    if (numberEl.checked) kriterler.push(sayiGetir);
    if (symbolEl.checked) kriterler.push(sembolGetir);

    if (kriterler.length === 0) {
        uyariGoster("Lütfen en az bir şifre kriteri (harf, sayı veya sembol) seçin!", "error");
        pwEl.innerText = "Kriter Seçin";
        guncelleSifreGucu(0, 0); 
        return;
    }
    if (len < 8 || len > 25) {
        uyariGoster("Şifre uzunluğu 8 ile 25 arasında olmalıdır!", "error");
        return;
    }
    kriterler.forEach(kriterFn => {
        sifre += kriterFn();
    });

    for (let i = sifre.length; i < len; i++) {
        const rastgeleKriter = kriterler[Math.floor(Math.random() * kriterler.length)];
        sifre += rastgeleKriter();
    }
    sifre = karistirSifre(sifre);

    pwEl.innerText = sifre;
    guncelleSifreGucu(len, kriterler.length);
    uyariGoster("Yeni şifre başarıyla üretildi!", "success");
}
function karistirSifre(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
    return arr.join('');
}
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
        sinif = "strength-weak"; 
    }
    strengthIndicatorEl.textContent = guc;
    strengthIndicatorEl.className = ""; 
    strengthIndicatorEl.classList.add(sinif);
}

function uyariGoster(mesaj, tip) {
    const notif = document.createElement("div");
    notif.classList.add("alert", `alert-${tip}`);
    notif.innerText = mesaj;
    alertContainer.appendChild(notif);
    
    setTimeout(() => {
        notif.remove();
    }, 3500);
}
generateEl.addEventListener("click", sifreUret);

lenEl.addEventListener("input", () => {
    lenValueEl.textContent = lenEl.value;
    guncelleSifreGucu(parseInt(lenEl.value), 0); 
});

copyEl.addEventListener("click", () => {
    const sifre = pwEl.innerText.trim();

    if (sifre && sifre !== "Kriter Seçin" && sifre !== "Üretmek için tıklayın") {
        navigator.clipboard.writeText(sifre)
            .then(() => {
                uyariGoster("Şifre başarıyla panoya kopyalandı!", "success");
            })
            .catch(err => {
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
document.addEventListener("DOMContentLoaded", () => {
    lenValueEl.textContent = lenEl.value;
    guncelleSifreGucu(parseInt(lenEl.value), 0);
});
