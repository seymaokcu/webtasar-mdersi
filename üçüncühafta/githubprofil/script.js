const githubApi = "https://api.github.com/users/";
const sayfa = document.getElementById("sayfa");
const form = document.getElementById("form");
const search = document.getElementById("search");

// --- API Fonksiyonları ---

async function profilBilgisiAl(profil) {
    try {
        const response = await fetch(githubApi + profil);
        
        // Hata kontrolü (Örn: 404 Not Found)
        if (!response.ok) {
            hataGoster(`"${profil}" adlı kullanıcı bulunamadı.`);
            return;
        }
        
        const responseData = await response.json();
        
        profilGoruntule(responseData);
        reposGetir(profil);

    } catch (error) {
        hataGoster("Bir ağ hatası oluştu. Lütfen tekrar deneyin.");
        console.error("API Hatası:", error);
    }
}

async function reposGetir(profil) {
    const response = await fetch(githubApi + profil + "/repos?sort=created&direction=desc");
    const responseData = await response.json();

    reposBilgileriEkle(responseData);
}

// --- Görünüm Fonksiyonları ---

function profilGoruntule(profil) {
    // Bio alanı null veya boş ise yer tutucu metin kullan
    const bio = profil.bio ? profil.bio : "Kullanıcı kendini tanıtmayı unutmuş...";

    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${profil.avatar_url}" alt="${profil.name}"/>
            </div>
            <div class="profil-bilgi">
                <h2>${profil.name || profil.login}</h2>
                <p>${bio}</p>
                
                <ul class="bilgi">
                    <li><strong>${profil.followers}</strong>Takipçi</li>
                    <li><strong>${profil.following}</strong>Takip</li>
                    <li><strong>${profil.public_repos}</strong>Repo</li>
                </ul>
                
                <div id="repos"></div>
            </div>
        </div>
    `;

    sayfa.innerHTML = cardHTML;
}

function reposBilgileriEkle(repos) {
    const reposEl = document.getElementById("repos");
    
    // Repoları en çok yıldız alanlara göre sırala ve ilk 10'u göster
    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            
            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
        
    // Eğer hiç repo yoksa bir mesaj gösterilebilir
    if (repos.length === 0) {
         reposEl.innerHTML = '<span style="color: #4a4a4a; font-style: italic;">Henüz genel reposu yok.</span>';
    }
}

function hataGoster(mesaj) {
    const errorHTML = `<div class="hata-mesaji">${mesaj}</div>`;
    sayfa.innerHTML = errorHTML;
}

// --- Olay Dinleyicisi ---

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const profil = search.value.trim(); // Boşlukları temizle
    
    if (profil) {
        profilBilgisiAl(profil);
        search.value = ""; // Arama çubuğunu temizle
    } else {
        sayfa.innerHTML = ''; // Arama boşsa kartı temizle
    }
});