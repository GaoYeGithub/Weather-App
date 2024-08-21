const api = {
    key: "71a09d53fe1618ac338bda7325e7f5e1",
    base: "https://api.openweathermap.org/data/2.5/weather?",
};

const input = document.getElementById('input');

input.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getWeather(input.value);
        const date = moment();
        document.getElementById("date").innerHTML = date.format("Mo MMM YYYY dddd, h:mm:ss");
    }
});

function getWeather(city) {
    fetch(`${api.base}q=${city}&appid=${api.key}&units=metric`)
    .then(details => details.json())
    .then(showWeather)
    .catch(error => {
        showError();
        console.error("Error fetching the weather data:", error);
    });
}

function showWeather(details) {
    if (details.cod !== 200) {
        showError();
        return;
    }

    document.querySelector('.main-weather').style.display = "block";
    document.getElementById('error-message').style.display = "none";

    let city = document.getElementById('city');
    city.innerHTML = `${details.name}, ${details.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(details.main.temp)}&deg;C`;

    let feelsLike = document.getElementById('feels-like');
    feelsLike.innerHTML = `Feels Like: ${Math.round(details.main.feels_like)}&deg;C`;

    let minMax = document.getElementById('min-max');
    minMax.innerHTML = `Min: ${Math.round(details.main.temp_min)}&deg;C, Max: ${Math.round(details.main.temp_max)}&deg;C`;

    let weatherType = document.getElementById('weather-type');
    weatherType.innerHTML = `${details.weather[0].main}`;

    let weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = `http://openweathermap.org/img/wn/${details.weather[0].icon}.png`;

    let pressure = document.getElementById('pressure');
    pressure.innerHTML = `Pressure: ${details.main.pressure} hPa`;

    let humidity = document.getElementById('humidity');
    humidity.innerHTML = `Humidity: ${details.main.humidity}%`;

    let sunrise = document.getElementById('sunrise');
    sunrise.innerHTML = `Sunrise: ${formatTime(details.sys.sunrise, details.timezone)}`;

    let sunset = document.getElementById('sunset');
    sunset.innerHTML = `Sunset: ${formatTime(details.sys.sunset, details.timezone)}`;

    let timezone = document.getElementById('timezone');
    timezone.innerHTML = `Time Zone: ${formatTimeZone(details.timezone)}`;
}

function formatTime(unixTime, timezone) {
    return moment.unix(unixTime).utcOffset(timezone / 60).format('h:mm A');
}

function formatTimeZone(timezoneOffset) {
    let hours = timezoneOffset / 3600;
    let sign = hours >= 0 ? "+" : "-";
    return `UTC ${sign}${Math.abs(hours)}`;
}

function showError() {
    document.querySelector('.main-weather').style.display = "none";
    document.getElementById('error-message').style.display = "block";
}
