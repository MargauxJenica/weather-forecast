// pseudo
// load search history
// store user search
// fetch data
// display on dash
    // current weather 
    // future forecast
        // weather

// html elements
document.addEventListener("DOMContentLoaded", function() {
var userInput = document.getElementById("userInput"); 
var userInput = document.getElementById("userInput"); // display user's input 
var searchBtn = document.getElementById("search-Btn"); // search button for form 
var userHistory = document.getElementById("userHistory"); 
var currentCity = document.getElementById("currentCity");
var currentWeatherContainer = document.querySelector(".currentWeather");

// variables
var city = "San Diego";// default and will hold the value of userInput
var searchHistoryArray = [];
var apiKey = "e03184690f717860154f954a4e25bb32";

// functions
function loadPage () { // load default page and search history
    console.log("Default City: " + city);
    currentCity.textContent = city;
    getForecast(city); // Should Default to San Diego
    getFutureForecast(city); 
    sear
    chHistory();
}
function searchHistory(historyItem) { 
    if (historyItem !== undefined) {
        localStorage.setItem("city", historyItem);
        console.log("Saved to local storage: " + historyItem);
        
        var searchedCity = localStorage.getItem("city");
        console.log("Retrieved from local storage: " + searchedCity);

        searchHistoryArray.push(searchedCity);
        console.log("Search History: " + searchHistoryArray);

        // Create a button for the historyItem
        var historyButton = document.createElement("button");
        historyButton.textContent = searchedCity;
        historyButton.addEventListener("click", function() {
            // Clear previous weather details
            currentCity.textContent = ""; // Clear the city name
            getForecast(searchedCity);
            getFutureForecast(searchedCity);
        });

        // Append the button to the userHistory list
        var historyItemElement = document.createElement("li");
        historyItemElement.appendChild(historyButton);

        // Add the list item to the beginning of the userHistory list
        userHistory.prepend(historyItemElement);
    }
}

function getForecast(city) { // current forecast
    // API URL for current weather
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    console.log("Loading Current Weather: " + city);

    fetch(currentWeatherURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
}

function getFutureForecast(city) { // five day forecast
    // API URL for 5-day forecast
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    console.log("Loading 5-Day Forecast: " + city);

    fetch(forecastURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayFutureForecast(data);
        })
}

function displayForecast(weatherData) { // display current forecast
    // Clear previous current weather details
    currentWeatherContainer.innerHTML = "";
    console.log("Displaying forecast for: ", weatherData.name);

    // Display current city name
    currentCity.textContent = weatherData.name;

    // Display current weather details
    var currentWeatherElement = document.createElement("div");
    currentWeatherElement.innerHTML= "";
    currentWeatherElement.innerHTML = `
        <p>Temperature: ${weatherData.main.temp} K</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        <img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].main}">
    `;
    currentWeatherContainer.appendChild(currentWeatherElement);
} // end of displayForecast

function displayFutureForecast(forecastData) { // display 5 day forecast
    console.log("Five day forecast: " + forecastData);

    // Clear previous forecast cards
    var forecastCardsElement = document.getElementById("forecastCards");
    forecastCardsElement.innerHTML = "";

    // Loop through the forecast list and display each day's forecast
    for (var i = 0; i < forecastData.list.length; i++) {
        // Extract the forecast for the current day
        var forecast = forecastData.list[i];

        // Check if the forecast is for a new day
        if (i === 0 || forecast.dt_txt.includes("00:00:00")) {
            // Create HTML elements for the forecast
            var forecastCard = document.createElement("li");
            forecastCard.innerHTML = `
                <h4>${new Date(forecast.dt * 1000).toDateString()}</h4>
                <p>Temperature: ${forecast.main.temp} K</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
                <p>Wind Speed: ${forecast.wind.speed} m/s</p>
                <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].main}">
            `;
            forecastCardsElement.appendChild(forecastCard);
        }
    }
}

// event listeners and initial function calls
loadPage();

searchBtn.addEventListener("click", function (event) { // save to local storage and call to findCity or alert user
   event.preventDefault();

   var userCity = userInput.value.trim(); // remove any leading/trailing whitespace from the value of userInput 
   console.log("User city input: " + userCity); 

   if (userCity !==''){ 
    city = userCity;
    console.log("City: " + city);
    searchHistory(city);
    // Clear previous weather details
    currentCity.textContent = ""; // Clear the city name

    getForecast(city);
   }else {
    alert('Please enter a city name.');
   }
});

// searchedCity.addEventListener("click", function() {

// });
});