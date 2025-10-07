// --- DOM Elementleri ---
const yemekler = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

// --- Başlangıç Yüklemeleri ---
rastgeleYemekGetir();
fetchFavYemekler();

// --- API İşlevleri ---

async function rastgeleYemekGetir() {
    const sonuc = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const sonucBilgisi = await sonuc.json();
    const rastgeleYemek = sonucBilgisi.meals[0];

    yemekEkle(rastgeleYemek, true);
}

async function yemekIdGetir(id) {
    const sonuc = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );

    const sonucBilgisi = await sonuc.json();
    const yemek = sonucBilgisi.meals[0];

    return yemek;
}

async function arananYemek(gelen) {
    const sonuc = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + gelen
    );

    const sonucBilgisi = await sonuc.json();
    const yemekler = sonucBilgisi.meals;

    return yemekler;
}

// --- DOM Ekleme İşlevleri ---

function yemekEkle(yemekBilgi, random = false) {
    const yemek = document.createElement("div");
    yemek.classList.add("meal");

    // Favorilerde olup olmadığını kontrol et
    const mealIds = LocalYemekGetir();
    const isFav = mealIds.includes(yemekBilgi.idMeal);
    
    // Yemek kartı yapısı Türkçe'ye çevrildi
    yemek.innerHTML = `
        <div class="meal-header">
            ${
                random
                    ? `<span class="random"> Rastgele Tarif </span>`
                    : ""
            }
            <img
                src="${yemekBilgi.strMealThumb}"
                alt="${yemekBilgi.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${yemekBilgi.strMeal}</h4>
            <button class="fav-btn ${isFav ? 'active' : ''}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn = yemek.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Pop-up açılmasını engelle
        if (btn.classList.contains("active")) {
            LocalYemekSil(yemekBilgi.idMeal);
            btn.classList.remove("active");
        } else {
            LocalFavYemek(yemekBilgi.idMeal);
            btn.classList.add("active");
        }
        fetchFavYemekler();
    });

    yemek.addEventListener("click", () => {
        YemekBilgileriniGoster(yemekBilgi);
    });

    yemekler.appendChild(yemek);
}

async function fetchFavYemekler() {
    favoriteContainer.innerHTML = ""; // Favoriler listesini temizle

    const mealIds = LocalYemekGetir();

    if (mealIds.length === 0) {
        favoriteContainer.innerHTML = `<li class="no-fav">Henüz favori yemeğiniz yok.</li>`;
        return;
    }

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        const yemek = await yemekIdGetir(mealId);

        if (yemek) { // Hata durumuna karşı kontrol
             FavYemekEkle(yemek);
        }
    }
}

function FavYemekEkle(mealData) {
    const favYemek = document.createElement("li");

    // Fav yemek yapısı Türkçe'ye çevrildi
    favYemek.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <span>${mealData.strMeal}</span>
        <button class="clear" title="Favorilerden Sil"><i class="fas fa-times-circle"></i></button>
    `;

    const btn = favYemek.querySelector(".clear");

    btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Üst elemanın click olayını engelle (pop-up açılmasını)
        LocalYemekSil(mealData.idMeal);
        
        // Ana yemek listesindeki kalp ikonunu güncelle
        const favBtnInMain = yemekler.querySelector(`.meal-body button.active[data-meal-id="${mealData.idMeal}"]`);
        if(favBtnInMain) {
            favBtnInMain.classList.remove('active');
        }

        fetchFavYemekler();
    });

    favYemek.addEventListener("click", () => {
        YemekBilgileriniGoster(mealData);
    });

    favoriteContainer.appendChild(favYemek);
}

// --- Detay Pop-up İşlevi ---

function YemekBilgileriniGoster(yemekBilgi) {
    mealInfoEl.innerHTML = "";

    const mealEl = document.createElement("div");

    const ingredients = [];

    // Malzemeleri al
    for (let i = 1; i <= 20; i++) {
        if (yemekBilgi["strIngredient" + i]) {
            ingredients.push(
                `${yemekBilgi["strIngredient" + i]} - ${
                    yemekBilgi["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    // Yemek bilgileri pop-up içeriği (Türkçe)
    mealEl.innerHTML = `
        <h1>${yemekBilgi.strMeal}</h1>
        
        <div class="meal-meta">
            ${yemekBilgi.strArea ? `<span><strong>Ülke:</strong> ${yemekBilgisi.strArea}</span>` : ''}
            ${yemekBilgi.strCategory ? `<span><strong>Kategori:</strong> ${yemekBilgi.strCategory}</span>` : ''}
            ${yemekBilgi.strTags ? `<span class="tags"><strong>Etiketler:</strong> ${yemekBilgi.strTags.split(',').join(', ')}</span>` : ''}
        </div>
        
        <img
            src="${yemekBilgisi.strMealThumb}"
            alt="${yemekBilgisi.strMeal}"
        />
        
        <h3>Hazırlanışı:</h3>
        <p>${yemekBilgi.strInstructions}</p>
        
        <h3>Malzemeler:</h3>
        <ul class="ingredients-list">
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
        </ul>
        
        ${yemekBilgi.strYoutube ? `<a href="${yemekBilgi.strYoutube}" target="_blank" class="youtube-btn"><i class="fab fa-youtube"></i> Video Tarifi İzle</a>` : ''}
    `;

    mealInfoEl.appendChild(mealEl);
    mealPopup.classList.remove("hidden");
}

// --- LocalStorage İşlevleri ---

function LocalFavYemek(mealId) {
    const mealIds = LocalYemekGetir();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function LocalYemekSil(mealId) {
    const mealIds = LocalYemekGetir();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function LocalYemekGetir() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}


// --- Olay Dinleyicileri ---

/* Arama butonuna tıklandığında */
searchBtn.addEventListener("click", async () => {
    yemekler.innerHTML = ""; // Önceki yemekleri temizle

    const search = searchTerm.value.trim();
    if (!search) {
        yemekler.innerHTML = `<p class="no-result">Lütfen aramak istediğiniz yemeğin adını giriniz.</p>`;
        return;
    }
    
    const yemeks = await arananYemek(search);

    if (yemeks) {
        yemeks.forEach((item) => {
            yemekEkle(item);
        });
    } else {
        yemekler.innerHTML = `<p class="no-result">"${search}" araması için hiçbir sonuç bulunamadı. Lütfen farklı bir terim deneyin.</p>`;
    }
});

popupCloseBtn.addEventListener("click", () => {
    alert("Kapatma butonu çalışıyor!");
    
    // Pop-up'ı gizle
    mealPopup.classList.add("hidden");
});

// Pop-up dışına tıklayınca kapatma
mealPopup.addEventListener('click', (e) => {
    if(e.target.id === 'meal-popup') {
        mealPopup.classList.add('hidden');
    }
});
// script.js dosyanızın en alt kısmı (veya hemen olay dinleyicilerinden önce)

console.log("mealPopup elementi:", document.getElementById("meal-popup"));
console.log("popupCloseBtn elementi:", document.getElementById("close-popup"));

// Eğer bu çıktıların herhangi birinde 'null' görüyorsanız, ID adını yanlış yazmışsınız demektir.
// Bu kontrolü yaptıktan sonra, tarayıcınızın Console sekmesini kontrol edin.