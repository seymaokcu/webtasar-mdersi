const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page="; 
const IMGPATH = "https://image.themoviedb.org/t/p/w500";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const MOVIELINK = "https://www.themoviedb.org/movie/"; 

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const loadingEl = document.getElementById("loading");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentPageEl = document.getElementById("current-page");

// Sayfalama Yönetimi
let currentPage = 1;
let totalPages = 1;
let lastSearchQuery = null; 

// İlk Yüklemede Popüler Filmleri Getir
filmler(APIURL + currentPage);

// Film Bilgilerini API'den Çekme
async function filmler(url) {
    loadingEl.classList.remove('hidden'); // Yükleniyor mesajını göster
    main.innerHTML = ""; 
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır

    try {
        const response = await fetch(url);
        const responseData = await response.json();
        
        loadingEl.classList.add('hidden'); // Yükleniyor mesajını gizle

        if (responseData.results.length === 0) {
            main.innerHTML = `<p class="no-results">Aradığınız kritere uygun film bulunamadı.</p>`;
        } else {
            filmleriGoster(responseData.results);
            
            // Sayfalama bilgilerini güncelle
            currentPage = responseData.page;
            totalPages = responseData.total_pages > 500 ? 500 : responseData.total_pages; 
            sayfalamaGuncelle();
        }
    } catch (error) {
        loadingEl.classList.add('hidden');
        main.innerHTML = `<p class="error-message">Hata oluştu: Film verileri yüklenemedi. Lütfen internet bağlantınızı kontrol edin.</p>`;
        console.error("API Fetch Hatası:", error);
    }
}

// Film Kartlarını Ekrana Basma
function filmleriGoster(film) {
    main.innerHTML = "";

    film.forEach((item) => {
        const { poster_path, title, vote_average, overview, id } = item;
        
        // Poster yoksa, yerine yer tutucu kullan
        const posterSrc = poster_path 
            ? (IMGPATH + poster_path) 
            : 'https://via.placeholder.com/300x450?text=POSTER+BULUNAMADI'; 

        const filmElement = document.createElement("div");
        filmElement.classList.add("movie");

        // Kartın tamamını TMDb sayfasına yönlendir
        filmElement.onclick = () => {
            window.open(MOVIELINK + id, '_blank');
        };

        filmElement.innerHTML = `
            <img
                src="${posterSrc}"
                alt="${title}"
                onerror="this.src='https://via.placeholder.com/300x450?text=YUKLENEMEDI';" 
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${filmOranı(vote_average)}">${vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>Açıklama</h3>
                ${overview ? overview : 'Bu film için kısa bir açıklama bulunmamaktadır.'}
                <br><br>
                <a href="${MOVIELINK + id}" target="_blank">Detayları Gör...</a>
            </div>
        `;

        main.appendChild(filmElement);
    });
}

// Film Oranına Göre Renk Belirleme
function filmOranı(oran) {
    if (oran >= 7.5) {
        return "green";
    } else if (oran >= 6) {
        return "orange";
    } else {
        return "red";
    }
}

// === Sayfalama (Pagination) Fonksiyonları ===

function sayfalamaGuncelle() {
    currentPageEl.innerText = currentPage;

    // Önceki Butonu Kontrolü
    if (currentPage <= 1) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    // Sonraki Butonu Kontrolü
    if (currentPage >= totalPages) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }
}

// Önceki Sayfaya Git
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        sayfaYukle(currentPage);
    }
});

// Sonraki Sayfaya Git
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        sayfaYukle(currentPage);
    }
});

function sayfaYukle(page) {
    let url;
    if (lastSearchQuery) {
        // Arama yapılmışsa, arama sonuçlarının sonraki sayfasına git
        url = SEARCHAPI + lastSearchQuery + `&page=${page}`;
    } else {
        // Normal popüler filmlerin sonraki sayfasına git
        url = APIURL + page;
    }
    filmler(url);
}

// Arama Formu Gönderimi
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const arananFilm = search.value.trim();
    currentPage = 1; // Yeni aramada sayfayı 1'e sıfırla

    if (arananFilm) {
        lastSearchQuery = arananFilm;
        filmler(SEARCHAPI + arananFilm + `&page=${currentPage}`);
    } else {
        lastSearchQuery = null;
        filmler(APIURL + currentPage);
    }
    search.value = "";
});