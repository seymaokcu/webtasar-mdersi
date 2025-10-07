// --- DOM Elementleri ---
const yeniNotBtn = document.getElementById("yeniNot");
const notesContainer = document.getElementById("notes-container");
const searchInput = document.getElementById("search");

// Notları localStorage'dan çekme (Objeler olarak bekliyoruz)
// Örnek not yapısı: { baslik: "...", icerik: "...", renk: "..." }
const notlarDizisi = JSON.parse(localStorage.getItem("notlar")) || [];

// --- Başlangıç Yüklemesi ---
if (notlarDizisi.length > 0) {
    notlarDizisi.forEach((notObj) => {
        ekleYeniNot(notObj.baslik, notObj.icerik, notObj.renk, notObj.tarih);
    });
}


// --- Olay Dinleyicileri ---
yeniNotBtn.addEventListener("click", () => {
    // Yeni not varsayılan boş değerlerle oluşturulur
    ekleYeniNot("Yeni Not Başlığı", "", "yellow");
});

searchInput.addEventListener("input", (e) => {
    filtreleNotlar(e.target.value);
});


// --- Temel Fonksiyonlar ---

/**
 * Yeni bir not elementi oluşturur ve DOM'a ekler.
 */
function ekleYeniNot(baslik = "Yeni Not Başlığı", text = "", renk = "yellow", tarih = new Date().toLocaleDateString()) {
    const not = document.createElement("div");
    not.classList.add("not");
    // Renk sınıfını not container'ına ekle
    not.setAttribute('data-color', renk);
    not.style.backgroundColor = getNoteColor(renk);

    not.innerHTML = `
        <div class="araclar">
            <input type="text" class="not-baslik" value="${baslik}" placeholder="Başlık Giriniz..." />
            <select class="renk-secici">
                <option value="yellow" ${renk === 'yellow' ? 'selected' : ''}>Sarı</option>
                <option value="blue" ${renk === 'blue' ? 'selected' : ''}>Mavi</option>
                <option value="red" ${renk === 'red' ? 'selected' : ''}>Kırmızı</option>
                <option value="green" ${renk === 'green' ? 'selected' : ''}>Yeşil</option>
            </select>
            <button class="duzenle" title="Düzenle/Kaydet"><i class="fas fa-edit"></i></button>
            <button class="sil" title="Sil"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="notSayfa ${text ? "" : "hidden"}">${marked(text)}</div>
        <textarea class="${text ? "hidden" : ""}" placeholder="Notunuzu buraya yazın..."></textarea>
        <div class="tarih-bilgisi">Son Düzenleme: ${tarih}</div>
    `;
    
    // --- DOM Referansları ---
    const baslikInput = not.querySelector(".not-baslik");
    const renkSecici = not.querySelector(".renk-secici");
    const duzenleBtn = not.querySelector(".duzenle");
    const silBtn = not.querySelector(".sil");
    const notSayfa = not.querySelector(".notSayfa");
    const textArea = not.querySelector("textarea");
    const tarihBilgisi = not.querySelector(".tarih-bilgisi");

    // Başlangıç değerlerini ata
    textArea.value = text;

    // --- Olay Dinleyicileri ---
    
    // Düzenle/Kaydet Butonu
    duzenleBtn.addEventListener("click", () => {
        notSayfa.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
        // Düzenleme modunda başlık input'unu aktif yap
        baslikInput.disabled = !textArea.classList.contains("hidden");
        
        // Kaydetme moduna geçiyorsa (yani textarea gizleniyorsa) güncelleme yap
        if (textArea.classList.contains("hidden")) {
            guncelleLocalStorage();
        }
    });
    
    // Sil Butonu
    silBtn.addEventListener("click", () => {
        not.remove();
        guncelleLocalStorage();
    });
    
    // Metin Alanı ve Başlık Güncelleme
    [textArea, baslikInput, renkSecici].forEach(el => {
        el.addEventListener("input", () => {
            // Not içeriğini Markdown ile dönüştür
            notSayfa.innerHTML = marked(textArea.value);
            
            // Renk güncellemeleri
            if(el === renkSecici) {
                const newColor = renkSecici.value;
                not.setAttribute('data-color', newColor);
                not.style.backgroundColor = getNoteColor(newColor);
            }
            
            // Tarih bilgisini güncelle
            tarihBilgisi.textContent = `Son Düzenleme: ${new Date().toLocaleDateString()}`;
            
            guncelleLocalStorage();
        });
    });

    notesContainer.appendChild(not);
}

/**
 * Not objelerini LocalStorage'a kaydeder.
 */
function guncelleLocalStorage() {
    const tumNotlar = document.querySelectorAll(".not");
    const yazilanNotlarDizisi = [];

    tumNotlar.forEach((notElement) => {
        // Notun içindeki gerekli verileri al
        const baslik = notElement.querySelector(".not-baslik").value;
        const icerik = notElement.querySelector("textarea").value;
        const renk = notElement.querySelector(".renk-secici").value;
        const tarih = notElement.querySelector(".tarih-bilgisi").textContent.replace("Son Düzenleme: ", "");
        
        yazilanNotlarDizisi.push({ baslik, icerik, renk, tarih });
    });

    localStorage.setItem("notlar", JSON.stringify(yazilanNotlarDizisi));
}

/**
 * Arama terimine göre notları filtreler.
 */
function filtreleNotlar(searchTerm) {
    const tumNotlar = document.querySelectorAll(".not");
    const term = searchTerm.toLowerCase();

    tumNotlar.forEach((not) => {
        const baslik = not.querySelector(".not-baslik").value.toLowerCase();
        const icerik = not.querySelector("textarea").value.toLowerCase();
        
        // Başlık veya içerik arama terimini içeriyorsa notu göster
        if (baslik.includes(term) || icerik.includes(term)) {
            not.style.display = "block";
        } else {
            not.style.display = "none";
        }
    });
}

/**
 * Renk kodlarını döndürür.
 */
function getNoteColor(colorName) {
    switch (colorName) {
        case 'blue':
            return '#b3e5fc'; // Açık Mavi
        case 'red':
            return '#ffcdd2'; // Açık Kırmızı
        case 'green':
            return '#c8e6c9'; // Açık Yeşil
        case 'yellow':
        default:
            return '#fff9c4'; // Çok Açık Sarı (Varsayılan)
    }
}