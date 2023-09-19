let lat;
let lon;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Browser dont suport geolocation!");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3068f5fc24ae8ae6d7ebee42e2b41a6e&units=metric&lang=pt`;
  getWeather(url);
}

async function getWeather(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const weather = `Temperature: ${data.main.temp}°C </br> Max: ${data.main.temp_max}°C </br> Mix: ${data.main.temp_min}°C`;
    document.getElementById("weather").innerHTML = weather;

    const info = `Weather in ${data.name} (${data.weather[0].description})`;
    document.getElementById("info").innerHTML = info;

    const humd = `Humidity: ${data.main.humidity}%`;
    document.getElementById("humd").innerHTML = humd;

    const wind = `Wind: ${data.wind.speed}m/s`;
    document.getElementById("wind").innerHTML = wind;
  } catch (error) {
    console.error("Error:", error);
  }
}

getLocation();

document.addEventListener("DOMContentLoaded", function () {
  const citySelected = document.getElementById("citySelected");

  citySelected.addEventListener("change", function () {
    const optionSelected = citySelected.options[citySelected.selectedIndex];

    if (optionSelected.textContent == "Current") {
      getLocation();
    } else {
      let city;
      switch (optionSelected.textContent) {
        case "Lisboa":
          city = "2267057";
          break;
        case "Porto":
          city = "2735943";
          break;
        case "Faro":
          city = "8010516";
          break;
        default:
          console.error("Error:", error);
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=3068f5fc24ae8ae6d7ebee42e2b41a6e&units=metric&lang=pt`;
      getWeather(url);
    }
  });
});
