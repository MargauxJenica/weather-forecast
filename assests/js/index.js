// pseudo
// load search history
// store user search
// fetch data
// display on dash
    // current weather 
    // future forecast
        // weather

// html elements
var userInput = document.getElementById("userInput"); 
var currentCity = document.getElementById("userInput"); // display user's input 
var searchBtn = document.getElementById("search-Btn"); // search button for form 
var userHistory = document.getElementById("userHistory"); 

// variables
var city = "San Diego";// default and will hold the value of userInput
var searchHistoryArray = [];
var apiKey = "e03184690f717860154f954a4e25bb32";

// APIs

var geoAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

// functions
function loadPage () { // load default page and search history
    console.log("Default City: " + city);
    getForecast(city); // Should Default to San Diego
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

function getForecast (city) { // take the user's input to get the forecast 

    console.log("Loading Forecast: " + city);

} // end of getForecast

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