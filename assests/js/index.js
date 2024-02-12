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
var currentCity = document.getElementById("city"); // display user's input 
var searchBtn = document.getElementById("search-Btn"); // search button for form
var searchHistory = document.getElementById("searchHistory"); //

// variables
var city = "San Diego" // default and will hold the value of userInput
var searchHistoryArray = [];

// APIs
// const weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e03184690f717860154f954a4e25bb32";
// const geoAPI = "api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid=e03184690f717860154f954a4e25bb32";

// functions
function loadPage () { // load default and local storage search history 

    var searchedCity = localStorage.getItem("city");

    if (searchedCity != null) {
        searchHistory.textContent = searchedCity;
        console.log("User's previous search: " + searchHistory);
    }
    
    

}
function findCity () { // take the user's input to find the city they are looking for



}

// event listeners and initial function calls
loadPage();

searchBtn.addEventListener("click", function (event) { // save to local storage and call to findCity or alert user
   
    event.preventDefault(); // prevent refresh after form submitted
    city = userInput.value.trim(); // cut any leading or trailing whitespce 

    // checking that the trigger was set off by a button
    if (event.target.tagName === "BUTTON") {
        // checks that the user inputs a city
        if (city !== "") {
            console.log("User input " + city);
            localStorage.setItem("city", city); // saving user's search

            findCity(city); 
        }else{
            alert("Please Enter in City Name (i.e., San Diego)");
        }
    }
})