
  // city search

  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} | ${hours}:${minutes}`;
  }
  
  function getWeather(response) {
    let temperature = document.querySelector("#currentTemp");
    celsiusTemperature = response.data.main.temp;
    temperature.innerHTML = Math.round(celsiusTemperature);
    let cityName = document.querySelector("h1");
    cityName.innerHTML = response.data.name;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity} %`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed} km/h`;
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.weather[0].main;
    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    let destinationTime = document.querySelector("#day")
    destinationTime.innerHTML = formatDate(response.data.dt * 1000);
  }
  
  function getTemp(city) {
    let apiKey = "9aef592de78a13851ffe5a565ea13c5f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
  }
  
  function getInfo(event) {
    event.preventDefault();
    let city = document.querySelector("#yourCity").value;
    getTemp(city);
  }
  
  
  let searchCity = document.querySelector("form");
  searchCity.addEventListener("submit", getInfo);
  
  let celsiusTemperature = null;
  
  // convert celsius to Fahrenheit and vice versa
  
  function convertToFahrenheit (event) {
    event.preventDefault();
    convertFahrenheit.classList.add("active");
    convertCelsius.classList.remove("active");
    let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
    let fahrenheitTemperature = document.querySelector("#currentTemp");
    fahrenheitTemperature.innerHTML = Math.round(fahrenheit);
  }
  
  
  function convertToCelsius (event) {
    event.preventDefault();
    convertFahrenheit.classList.remove("active");
    convertCelsius.classList.add("active");
    let celsius = document.querySelector("#currentTemp");
    celsius.innerHTML = Math.round(celsiusTemperature);
  }
  
  let convertFahrenheit = document.querySelector("#convertFahrenheit")
  convertFahrenheit.addEventListener("click", convertToFahrenheit);
  
  let convertCelsius = document.querySelector("#convertCelsius");
  convertCelsius.addEventListener("click", convertToCelsius);
  
    
    // currentLocation
    
    function showTemp(response) {
      let currentTemp = document.querySelector("#currentTemp");
      currentTemp.innerHTML = Math.round(response.data.main.temp);
      let currentCity = document.querySelector("h1");
      currentCity.innerHTML = response.data.name;
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `${response.data.main.humidity} %`;
      let wind = document.querySelector("#wind");
      wind.innerHTML = `${response.data.wind.speed} km/h`;
      let weatherDescription = document.querySelector("#weather-description");
      weatherDescription.innerHTML = response.data.weather[0].main;
      let weatherIcon = document.querySelector("#weather-icon");
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      let destinationTime = document.querySelector("#day")
      destinationTime.innerHTML = formatDate(response.data.dt * 1000);
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
    
  
    // forecast
  
    