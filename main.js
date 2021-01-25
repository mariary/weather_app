const api = {
    key: "3079dacf2f22621fe2936cb654d93328",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector('.weather-app__search_input');
search.addEventListener('keypress', Show);

const btn_search = document.querySelector('.weather-app__search-btn');

btn_search.addEventListener('click', Show1);
btn_search.addEventListener('touchstart', handleInteraction);

function Show(button) {
    if (button.keyCode === 13) {
        GetResult(search.value);
    }
}
function Show1() {
    GetResult(search.value);
}

function handleInteraction(evt) {
    evt.preventDefault()
    GetResult(search.value);
}

function GetResult(name) {
    fetch(`${api.base}weather?q=${name}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(DisplayResult);
}

function DisplayResult(weather) {
    console.log(weather);

    Background(weather);

    let city = document.querySelector('.weather-app__content_location');
    city.innerHTML = `${weather.name}  , ${weather.sys.country}`;

    let date = document.querySelector('.weather-app__content_date');
    let now = new Date();
    date.innerHTML = GetData(now);

    let temp = document.querySelector('.weather-app__content_temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let type = document.querySelector('.weather-app__content_type');
    type.innerHTML = `${weather.weather[0].main}`;

    // let diff = document.querySelector('.weather-app__content_diff');
    // diff.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`

    let feel = document.querySelector('.weather-app__content_feel');
    feel.innerHTML = `Feels like ${Math.round(weather.main.feels_like)} °C`;
}

function GetData(now) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function Background(weather) {
    let back = document.querySelector('.weather-app')
    if (weather.weather[0].main==='Drizzle') {
        back.style.background = 'url("content/drizzle.jpg")'
    }
    else if (weather.weather[0].main==='Rain') {
        back.style.background = 'url("content/rain.jpg")'
    }
    else if (weather.weather[0].main==='Mist') {
        back.style.background = 'url("content/mist.jpg")'
    }
    else if (weather.weather[0].main==='Sunny') {
        back.style.background = 'url("content/sunny.jpg")'
    }
    else if (weather.weather[0].main==='Clouds') {
        back.style.background = 'url("content/clouds.jpg")'
    }
    else if (weather.weather[0].main==='Snow') {
        back.style.background = 'url("content/snow.jpg")'
    }
    else if (weather.weather[0].main==='Clear') {
        back.style.background = 'url("content/clear.jpg")'
    }
}