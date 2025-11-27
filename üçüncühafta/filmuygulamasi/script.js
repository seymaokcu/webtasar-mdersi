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


let currentPage = 1;
let totalPages = 1;
let lastSearchQuery = null; 


filmler(APIURL + currentPage);


async function filmler(url) {
    loadingEl.classList.remove('hidden');
    main.innerHTML = ""; 
    window.scrollTo(0, 0);

    try {
        const response = await fetch(url);
        const responseData = await response.json();
        
        loadingEl.classList.add('hidden'); 

        if (responseData.results.length === 0) {
            main.innerHTML = `<p class="no-results">Aradığınız kritere uygun film bulunamadı.</p>`;
        } else {
            filmleriGoster(responseData.results);
            
            
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


function filmleriGoster(film) {
    main.innerHTML = "";

    film.forEach((item) => {
        const { poster_path, title, vote_average, overview, id } = item;
        
        
        const posterSrc = poster_path 
            ? (IMGPATH + poster_path) 
            : 'https://via.placeholder.com/300x450?text=POSTER+BULUNAMADI'; 

        const filmElement = document.createElement("div");
        filmElement.classList.add("movie");

        
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


function filmOranı(oran) {
    if (oran >= 7.5) {
        return "green";
    } else if (oran >= 6) {
        return "orange";
    } else {
        return "red";
    }
}



function sayfalamaGuncelle() {
    currentPageEl.innerText = currentPage;

    
    if (currentPage <= 1) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    
    if (currentPage >= totalPages) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }
}


prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        sayfaYukle(currentPage);
    }
});


nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        sayfaYukle(currentPage);
    }
});

function sayfaYukle(page) {
    let url;
    if (lastSearchQuery) {
        
        url = SEARCHAPI + lastSearchQuery + `&page=${page}`;
    } else {
        
        url = APIURL + page;
    }
    filmler(url);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const arananFilm = search.value.trim();
    currentPage = 1; 

    if (arananFilm) {
        lastSearchQuery = arananFilm;
        filmler(SEARCHAPI + arananFilm + `&page=${currentPage}`);
    } else {
        lastSearchQuery = null;
        filmler(APIURL + currentPage);
    }
    search.value = "";
});
