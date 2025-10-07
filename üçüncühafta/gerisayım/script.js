// Güncel Tarih ile Hedef Tarih arasındaki farkı hesaplar
function guncelTarih(currentDate) {
    var time = (currentDate - new Date()) / 1000;
    
    // Total süre 0'dan küçükse 0 döndür
    if (time < 0) {
        return {
            gun: 0,
            saat: 0,
            dakika: 0,
            saniye: 0,
            total: 0
        };
    }
    
    return {
        gun: Math.floor(time / 3600 / 24),
        saat: Math.floor((time / 3600) % 24),
        dakika: Math.floor((time / 60) % 60),
        saniye: Math.floor(time % 60),
        total: time,
    };
}

// Çevirme animasyonunu başlatır
function animasyon(span) {
    span.className = "flip";
    setTimeout(function () {
        span.className = "";
    }, 700); // CSS animasyon süresiyle aynı (0.7s)
}

function baslat(id, newYear) {
    var timerInterval = setInterval(function () {
        var zamanEl = document.getElementById(id); // zaman yerine zamanEl kullanıldı
        var zamanlayıcı = guncelTarih(newYear);

        zamanEl.innerHTML =
            "<span>" +
            zamanlayıcı.gun +
            "</span>" +
            "<span>" +
            zamanlayıcı.saat +
            "</span>" +
            "<span>" +
            zamanlayıcı.dakika +
            "</span>" +
            "<span>" +
            zamanlayıcı.saniye +
            "</span>";

        // Animasyon kontrolü ve düzeltmeler
        var spans = zamanEl.getElementsByTagName("span");
        
        // Saniye animasyonu
        if (spans[3].innerHTML != zamanlayıcı.saniye) {
            animasyon(spans[3]);
        }
        
        // Dakika animasyonu (Saniye 59'dan 0'a geçtiğinde)
        if (zamanlayıcı.saniye == 59) animasyon(spans[2]);
        
        // Saat animasyonu (Dakika 59'dan 0'a geçtiğinde)
        if (zamanlayıcı.dakika == 59 && zamanlayıcı.saniye == 59)
            animasyon(spans[1]);
        
        // Gün animasyonu (Saat 23, Dakika 59, Saniye 59'dan 0'a geçtiğinde)
        if (
            zamanlayıcı.saat == 23 &&
            zamanlayıcı.dakika == 59 &&
            zamanlayıcı.saniye == 59
        )
            animasyon(spans[0]);

        // Tarih kontrolü: Zaman bitti mi?
        if (zamanlayıcı.total < 1) {
            clearInterval(timerInterval);
            zamanEl.innerHTML =
                "<span>0</span><span>0</span><span>0</span><span>0</span>";
            document.querySelector("h1").innerText = "MUTLU YILLAR!";
        }
    }, 1000);
}

window.onload = function () {
    // Dinamik olarak bir sonraki yılın 1 Ocak'ını hedefle
    const nextYear = new Date().getFullYear() + 1;
    var newYear = new Date(`1 Jan ${nextYear}`);
    
    // Eğer hedef tarih geçmişte kalmışsa (normalde olmamalı), mevcut yılın sonuna say.
    if (newYear < new Date()) {
        newYear = new Date(`1 Jan ${nextYear + 1}`);
    }

    baslat("clock", newYear);
};