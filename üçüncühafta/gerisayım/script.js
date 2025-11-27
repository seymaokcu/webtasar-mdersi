
function guncelTarih(currentDate) {
    var time = (currentDate - new Date()) / 1000;
    
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

function animasyon(span) {
    span.className = "flip";
    setTimeout(function () {
        span.className = "";
    }, 700); 
}

function baslat(id, newYear) {
    var timerInterval = setInterval(function () {
        var zamanEl = document.getElementById(id); 
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

        var spans = zamanEl.getElementsByTagName("span");
        
        if (spans[3].innerHTML != zamanlayıcı.saniye) {
            animasyon(spans[3]);
        }
        
        if (zamanlayıcı.saniye == 59) animasyon(spans[2]);
        
        if (zamanlayıcı.dakika == 59 && zamanlayıcı.saniye == 59)
            animasyon(spans[1]);
        
        if (
            zamanlayıcı.saat == 23 &&
            zamanlayıcı.dakika == 59 &&
            zamanlayıcı.saniye == 59
        )
            animasyon(spans[0]);

        if (zamanlayıcı.total < 1) {
            clearInterval(timerInterval);
            zamanEl.innerHTML =
                "<span>0</span><span>0</span><span>0</span><span>0</span>";
            document.querySelector("h1").innerText = "MUTLU YILLAR!";
        }
    }, 1000);
}

window.onload = function () {
    const nextYear = new Date().getFullYear() + 1;
    var newYear = new Date(`1 Jan ${nextYear}`);
    
    
    if (newYear < new Date()) {
        newYear = new Date(`1 Jan ${nextYear + 1}`);
    }

    baslat("clock", newYear);
};
