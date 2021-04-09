// city search

function getWeather(response) {
    let temperature = document.querySelector("#currentTemp");
    temperature.innerHTML = Math.round(response.data.main.temp);
    let cityName = document.querySelector("h1");
    cityName.innerHTML = response.data.name;
  }
  
  function getTemp(city) {
    let apiKey = "9aef592de78a13851ffe5a565ea13c5f";
    let input = document.querySelector("#yourCity").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
  }
  
  function getInfo(event) {
    event.preventDefault();
    let city = document.querySelector("#yourCity").value;
    getTemp(city);
  }
  
  let searchCity = document.querySelector("form");
  searchCity.addEventListener("submit", getInfo);
  
  // day and time
  
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  
  let todayDay = document.querySelector("#day");
  todayDay.innerHTML = `${day}`;
  
  let timeToday = document.querySelector("#time");
  timeToday.innerHTML = `${hours}:${minutes}`;
  
  // currentLocation
  
  function showTemp(response) {
    let currentTemp = document.querySelector("#currentTemp");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    let currentCity = document.querySelector("h1");
    currentCity.innerHTML = response.data.name;
  }
  
  function getCurrent(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKeyPos = "9aef592de78a13851ffe5a565ea13c5f";
    let apiUrlPos = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKeyPos}`;
    axios.get(apiUrlPos).then(showTemp);
  }
  
  function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrent);
  }
  
  let button = document.querySelector("button");
  button.addEventListener("click", getLocation);
  