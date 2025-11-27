
const yeniNotBtn = document.getElementById("yeniNot");
const notesContainer = document.getElementById("notes-container");
const searchInput = document.getElementById("search");
const notlarDizisi = JSON.parse(localStorage.getItem("notlar")) || [];

if (notlarDizisi.length > 0) {
    notlarDizisi.forEach((notObj) => {
        ekleYeniNot(notObj.baslik, notObj.icerik, notObj.renk, notObj.tarih);
    });
}
yeniNotBtn.addEventListener("click", () => {
    ekleYeniNot("Yeni Not Başlığı", "", "yellow");
});

searchInput.addEventListener("input", (e) => {
    filtreleNotlar(e.target.value);
});

function ekleYeniNot(baslik = "Yeni Not Başlığı", text = "", renk = "yellow", tarih = new Date().toLocaleDateString()) {
    const not = document.createElement("div");
    not.classList.add("not");
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
    
    const baslikInput = not.querySelector(".not-baslik");
    const renkSecici = not.querySelector(".renk-secici");
    const duzenleBtn = not.querySelector(".duzenle");
    const silBtn = not.querySelector(".sil");
    const notSayfa = not.querySelector(".notSayfa");
    const textArea = not.querySelector("textarea");
    const tarihBilgisi = not.querySelector(".tarih-bilgisi");

   
    textArea.value = text;

    duzenleBtn.addEventListener("click", () => {
        notSayfa.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
        baslikInput.disabled = !textArea.classList.contains("hidden");
        
        if (textArea.classList.contains("hidden")) {
            guncelleLocalStorage();
        }
    });
    
    silBtn.addEventListener("click", () => {
        not.remove();
        guncelleLocalStorage();
    });
    
    [textArea, baslikInput, renkSecici].forEach(el => {
        el.addEventListener("input", () => {
            notSayfa.innerHTML = marked(textArea.value);
            
            if(el === renkSecici) {
                const newColor = renkSecici.value;
                not.setAttribute('data-color', newColor);
                not.style.backgroundColor = getNoteColor(newColor);
            }
            
            tarihBilgisi.textContent = `Son Düzenleme: ${new Date().toLocaleDateString()}`;
            
            guncelleLocalStorage();
        });
    });

    notesContainer.appendChild(not);
}

function guncelleLocalStorage() {
    const tumNotlar = document.querySelectorAll(".not");
    const yazilanNotlarDizisi = [];

    tumNotlar.forEach((notElement) => {
        const baslik = notElement.querySelector(".not-baslik").value;
        const icerik = notElement.querySelector("textarea").value;
        const renk = notElement.querySelector(".renk-secici").value;
        const tarih = notElement.querySelector(".tarih-bilgisi").textContent.replace("Son Düzenleme: ", "");
        
        yazilanNotlarDizisi.push({ baslik, icerik, renk, tarih });
    });

    localStorage.setItem("notlar", JSON.stringify(yazilanNotlarDizisi));
}

function filtreleNotlar(searchTerm) {
    const tumNotlar = document.querySelectorAll(".not");
    const term = searchTerm.toLowerCase();

    tumNotlar.forEach((not) => {
        const baslik = not.querySelector(".not-baslik").value.toLowerCase();
        const icerik = not.querySelector("textarea").value.toLowerCase();
        
        if (baslik.includes(term) || icerik.includes(term)) {
            not.style.display = "block";
        } else {
            not.style.display = "none";
        }
    });
}

function getNoteColor(colorName) {
    switch (colorName) {
        case 'blue':
            return '#b3e5fc'; 
        case 'red':
            return '#ffcdd2'; 
        case 'green':
            return '#c8e6c9'; 
        case 'yellow':
        default:
            return '#fff9c4'; 
    }
}
