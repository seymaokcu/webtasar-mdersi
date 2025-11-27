
const apikey = "8818400a94991b22335b598b510df016";
const container = document.getElementById("container");
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const forecastElement = document.getElementById("forecast");
const currentWeatherUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&lang=tr`;
const forecastUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&lang=tr`;

async function lokasyonBilgisi(city) {
  try {
    const [currentResp, forecastResp] = await Promise.all([
      fetch(currentWeatherUrl(city)),
      fetch(forecastUrl(city)),
    ]);

    const currentData = await currentResp.json();
    const forecastData = await forecastResp.json();

    if (currentData.cod === "404") {
      uyariMesaji("Konum bilgisi bulunamadı!");
    } else {
      havaDurumuBilgisi(currentData);
      havaDurumuTahmini(forecastData);
    }
  } catch (error) {
    console.error("Hata oluştu:", error);
    uyariMesaji("Bir hata oluştu. Lütfen tekrar deneyin.");
  }
}

function dereceCevirme(K) {
  return Math.floor(K - 273.15);
}

function havaDurumuBilgisi(data) {
  const temp = dereceCevirme(data.main.temp);
  const feelsLike = dereceCevirme(data.main.feels_like);

  main.innerHTML = `
        <div class="current-weather">
            <h2 class="city-name">${data.name}, ${data.sys.country}</h2>
            <div class="temp-icon">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}"/>
                <span class="main-temp">${temp}°C</span>
            </div>
            <p class="description">${data.weather[0].description.toUpperCase()}</p>
            <div class="details">
                <p><strong>Hissedilen:</strong> ${feelsLike}°C</p>
                <p><strong>Nem:</strong> ${data.main.humidity}%</p>
                <p><strong>Rüzgar Hızı:</strong> ${data.wind.speed} m/s</p>
            </div>
        </div>
    `;
}

function havaDurumuTahmini(data) {
  forecastElement.innerHTML = ""; 

  const dailyForecasts = data.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  );

  dailyForecasts.forEach((dayData) => {
    const day = new Date(dayData.dt * 1000).toLocaleDateString("tr-TR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const temp = dereceCevirme(dayData.main.temp);
    const icon = dayData.weather[0].icon;
    const description = dayData.weather[0].description;

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = `
            <h3>${day}</h3>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}"/>
            <p class="forecast-temp">${temp}°C</p>
            <small>${description}</small>
        `;
    forecastElement.appendChild(forecastCard);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();

  if (city) {
    lokasyonBilgisi(city);
    search.value = ""; 
  } else {
    uyariMesaji("Lütfen bir şehir adı giriniz.");
  }
});
function uyariMesaji() {
  const notif = document.createElement("div");
  notif.classList.add("mesaj");
  notif.innerText = " Konum bilgisi bulunmamaktadır !!! ";
  container.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 2000);
  main.innerHTML = ""; 
}
