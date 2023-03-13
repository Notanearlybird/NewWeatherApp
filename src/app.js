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
let today = document.querySelector("#day");
today.innerHTML = `${day}`;
let next = document.querySelector("#next");
next.innerHTML = `${day2}`;
let next2 = document.querySelector("#next2");
next2.innerHTML = `${day3}`;
let next3 = document.querySelector("#next3");
next3.innerHTML = `${day4}`;
let next4 = document.querySelector("#next4");
next4.innerHTML = `${day5}`;
let next5 = document.querySelector("#next5");
next5.innerHTML = `${day6}`;
let next6 = document.querySelector("#next6");
next6.innerHTML = `${day7}`;

function getForecast(coordinates) {
  console.log(coordinates);
  let apikeyForecast = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apikeyForecast}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}
//let apiURLtest = `https://api.shecodes.io/weather/v1/forecast?lat=38.71667&lon=-9.13333&key=ot4d0ae9450339eb25164b5a104c010f&units=metric`;
//console.log(apiURLtest);

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
  //let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`;
  //let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&appid=${apiKey}`;
  //let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;
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

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#nextWeek");
  forecastEl.innerHTML = "Next week forecast";
  let Wdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="week" id="next">${forecastDay.dt}:</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.icon_url
            }.png" alt="" id="icon2"/>
            <div class="MaxMin"> 
            <span class ="forecast-min"> ${Math.round(
              forecastDay.temperature.minimum
            )}°</span> 
            <span class ="forecast-max">${Math.round(
              forecastDay.temperature.maximum
            )}° </span>
           </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
console.log(displayForecast);
