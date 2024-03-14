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


// variables
var city = "San Diego";// default and will hold the value of userInput
var searchHistoryArray = [];
var apiKey = "e03184690f717860154f954a4e25bb32";

// functions
function loadPage () { // load default page and search history
    console.log("Default City: " + city);
    currentCity.textContent = city;
    getForecast(city); // Should Default to San Diego
    // getFutureForecast(city); 
   // searchHistory();
}
function searchHistory (historyItem) { // load and save to local storage for search history 

    if (historyItem !== undefined) {
        localStorage.setItem("city", historyItem);
        console.log("Saved to local storage: " + historyItem);
    
                
        var searchedCity = localStorage.getItem("city");
        console.log("Retreived from local storage: " + searchedCity);

        searchHistoryArray.push(searchedCity);
        console.log("Search History: " + searchHistoryArray);

    }
} // end of loadPage()

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
            // displayFutureForecast(data);
        })
}

function displayForecast(weatherData) {
    console.log("Displaying forecast for: ", weatherData.name);
    // Select the current weather container
    var currentWeatherContainer = document.querySelector(".currentWeather");
    // Clear previous current weather details
    currentWeatherContainer.innerHTML = "";

    // Display current city name
    currentCity.textContent = weatherData.name;

    // Display current weather details
    var currentWeatherElement = document.createElement("div");
    currentWeatherElement.innerHTML = `
        <p>Temperature: ${weatherData.main.temp} K</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        <img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].main}">
    `;
    currentWeatherContainer.appendChild(currentWeatherElement);
} // end of displayForecast


// function displayFiveDayForecast(forecastData) {

// }


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
    getForecast(city);
   }else {
    alert('Please enter a city name.');
   }
});

// searchedCity.addEventListener("click", function() {

// });
});