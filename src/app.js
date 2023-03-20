let now = new Date();
let day0 = now.getDay();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = week[now.getDay()];
let day2 = week[day0 + 1];
let day3 = week[day0 + 2];
let day4 = week[day0 + 3];
let day5 = week[day0 + 4];
let day6 = week[day0 + 5];
let day7 = week[day0 + 6];
console.log(day7);
//shows current time
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}
timeNow = `${hours}:${minutes}`;
console.log(timeNow);

let time = document.querySelector("#time");
time.innerHTML = `${timeNow}`;
//
let today = document.querySelector("#day1");
today.innerHTML = `${day}`;
let next = document.querySelector("#day2");
next.innerHTML = `${week[day0 + 1]}`;
let next2 = document.querySelector("#day3");
next2.innerHTML = `${day3}`;
let next3 = document.querySelector("#day4");
next3.innerHTML = `${day4}`;
let next4 = document.querySelector("#day5");
next4.innerHTML = `${day5}`;
let next5 = document.querySelector("#day6");
next5.innerHTML = `${day6}`;
let next6 = document.querySelector("#day7");
next6.innerHTML = `${day7}`;

function getForecast(coordinates) {
  console.log(coordinates);
  let apikeyForecast = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apikeyForecast}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "f5029b784306910c19746e40c14d6cd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("New York");

function showFtemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let tempElem = document.querySelector("#temperature");
  tempElem.innerHTML = fahrenheitTemperature;
}
function showCtemp(event) {
  event.preventDefault();
  let tempElem = document.querySelector("#temperature");
  tempElem.innerHTML = celsiusTemp;
}
let Flink = document.querySelector("#CtoF");
Flink.addEventListener("click", showFtemp);

let celsiusTemp = null;
let Clink = document.querySelector("#Celsius");
Clink.addEventListener("click", showCtemp);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let currentDay = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[currentDay];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#nextWeek");
  forecastEl.innerHTML = "Next week forecast";
  let Wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  console.log(Wdays);
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="week" id="next">${formatDay(forecastDay.time)}:</div>
            <div> <img class= "iconForecast" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png" 
            alt=${forecastDay.condition.description}
            width="42"/></div>
           
            <div class="MaxMin"> 
            <span class ="forecast-min"> ${Math.round(
              forecastDay.temperature.minimum
            )}°</span> 
            <span class ="forecast-max">${Math.round(
              forecastDay.temperature.maximum
            )}° </span>
           </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
console.log(displayForecast);
