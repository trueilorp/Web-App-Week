const htmlElement = document.documentElement();
const suggestion = document.querySelector('.suggestion');
const weatherIcon = document.querySelector('.weather-location');
const weatherLocation = document.querySelector('.weather-temperature');
const weatherTemperature = document.querySelector('.weather-temperature');

navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onError(){
    // Preparo elementi in pagina per far capire che devo aggiungerla
    weatherLocation.innerText = '';
    weatherIcon.alt = "Geolocation disattivata";
    weatherIcon.src = "images/www.png"; 
    suggestion.innerText = 'Attiva la geolocalizzazione';

    //Disattivare js-loading
    htmlElement.className = '';
}

async function onSuccess(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitud;

    //Prepariamoci a chiamare l'API di open weather
    const API_KEY = '';
    const nits = 'metric';
    const lang = 'it';
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;

    // Chiamo API
    const response = await fetch(endpoint); //await mi fa aspettare, funziona solo se c'è async prima di function
    const data = await response.json();

    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;

    //Riempio gli elementi della pagina 
    weatherLocation.innerText = data.name;
    weatherIcon.alt = description;
    weatherIcon.src = `images/${iconCode}.png`;
    weatherTemperature.innerText = Math.floor(data.main.temp);
    
    htmlElement.className = '';
}