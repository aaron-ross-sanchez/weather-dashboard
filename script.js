//https://www.w3schools.com/js/js_api_fetch.asp
//city will be chosen by the user
const city = ''; 
//apiKey will be deleted after grading is completed
const apiKey = '6b85b5521cb7b577a6e51b36f03923b2';

//this will change the value given by the API to the wanted scale
function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9 / 5) + 32;
}

//this will change the value given by the API to the wanted scale
function metersPerSecondToMilesPerHour(mps) {
  return (mps * 2.23694);
}

//this will change the value given by the API to the wanted date format
function convertUnixtoDateTime(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);

  const year = dateObject.getFullYear();
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
  const day = ('0' + dateObject.getDate()).slice(-2);

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

//This will end up running the program once the submit button is pressed
$('.submit-btn').click(function(event) {
  event.preventDefault();

  //has the value of the input from the user saved as the city
  const cityInput = document.getElementById('city-search').value;
  const city = cityInput;

  //creates the variable/array for the searched cities from local storage
  let savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

  //conditional statement 
  //if the city searched isn't saved to local storage, this will run
  if(!savedCities.includes(city)) {
    //adds the city to the top of local storage
    savedCities.unshift(city);
    //saves localStorage with the new item and updates it to JSON
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
  }

  //test for me
  console.log('Selected city:', city);
  //function to display the weather will start, using the city the user input
  displayWeather(city);
  //function to display the five day forecast will start, using the city the user input
  displayForecast(city);
  //function to display and update the searched cities
  displaySavedCities();
});

//function to display the saved cities
//essentially clears and reupdates with the new city saved from the click event
function displaySavedCities() {
  //if there are no cities in local storage, savedCities will be an empty array
  const savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
  //DOM manipulation with jQuery
  const savedCitiesDiv = $('.search-history-container');
  savedCitiesDiv.empty();

  //for loop to display each item from the savedCities array 
  savedCities.forEach(function(city) {
    //creates the HTML element
    const cityElement = $('<button class="saved-city">' + city + '</button>');
    //click event for when those buttons are pressed
    cityElement.click(function() {
      //will take the value of city from the specific cityElement
      cityElement.val(city);
      //runs that value of city through the two display functions
      displayWeather(city);
      displayForecast(city);
      //test for me
      console.log('Getting Forecast For:', city);
    });
    //each city that is looped through will now appear in the savedCitiesDiv
    savedCitiesDiv.append(cityElement);
  });
}

//called this function so that the cities can be displayed without needing to click the submit button
displaySavedCities();

//This is the function to get the current weather from the api
//It has two parameters, the city and apiKey
function getWeather(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      // don't need to test anymore
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    }) 
}

//This is the function to get the forecast weather from the api
//It has two parameters, the city and apiKey
function getForecast(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      // don't need to test anymore
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    }) 
}

//HTML DOM displayWeather
const currentCity = $('#city');
const currentDate = $('#date');
const currentIcon = $('#icon');
const currentTemperature = $('#currentTemperature');
const currentWind = $('#currentWind');
const currentHumidity = $('#currentHumidity');

//this is the function to displayWeather
//used a async function to use await keyword
async function displayWeather(city) {
  //used await to make sure the getWeather function will finish before assigning its value
  const weatherData = await getWeather(city, apiKey);
  //will log the entire data received from the getWeather function
  console.log(weatherData);

  if (weatherData) {
    //This is object deconstruction and a way to pull out specific values from the weatherData object and is assigning those values to those variables
    const { name, dt, main, weather, wind } = weatherData;
    //saving the Kelvin Temp to a variable
    const temperatureInKelvin = main.temp;
    //saving the converted fahrenheit temp to a variable
    const temperatureToFahrenheit = kelvinToFahrenheit(temperatureInKelvin);
    //same process as temp conversion
    const speedInMetersPerSecond = wind.speed;
    const speedToMilesPerHour = metersPerSecondToMilesPerHour(speedInMetersPerSecond);
    //this saves the specific url of the weather icon to a variable so it can be displayed
    const iconUrl = `http://openweathermap.org/img/w/${weather[0].icon}.png`
    //same process as temp conversion
    const formattedDate = convertUnixtoDateTime(dt);

    //This section is printing to the browser and returning the data to the console for testing purposes
    currentCity.text(name);
    console.log("Name:", name);

    currentDate.text(formattedDate);
    console.log("Date:", dt);

    currentIcon.html(`<img src="${iconUrl}" alt="WeatherIcon">`);
    console.log("Icon:", weather[0].icon);

    currentTemperature.text(temperatureToFahrenheit.toFixed(2));
    console.log("Temperature:", main.temp);
    console.log("Temperature In Kelvin:", temperatureInKelvin);
    console.log("Temperature In Fahrenheit:", temperatureToFahrenheit);

    currentWind.text(speedToMilesPerHour.toFixed(2));
    console.log("Wind Speed:", wind.speed);
    console.log("Speed in Meters Per Second:", speedInMetersPerSecond);
    console.log("Speed in Miles Per Hour:", speedToMilesPerHour);

    currentHumidity.text(main.humidity);
    console.log("Humidity:", main.humidity);
  }
}

//HTML DOM Forecast
const dayOneDate = $('#dayOneDate');
const dayOneIcon = $('#dayOneIcon');
const dayOneTemp = $('#dayOneTemp');
const dayOneWind = $('#dayOneWind');
const dayOneHumidity = $('#dayOneHumidity');

const dayTwoDate = $('#dayTwoDate');
const dayTwoIcon = $('#dayTwoIcon');
const dayTwoTemp = $('#dayTwoTemp');
const dayTwoWind = $('#dayTwoWind');
const dayTwoHumidity = $('#dayTwoHumidity');

const dayThreeDate = $('#dayThreeDate');
const dayThreeIcon = $('#dayThreeIcon');
const dayThreeTemp = $('#dayThreeTemp');
const dayThreeWind = $('#dayThreeWind');
const dayThreeHumidity = $('#dayThreeHumidity');

const dayFourDate = $('#dayFourDate');
const dayFourIcon = $('#dayFourIcon');
const dayFourTemp = $('#dayFourTemp');
const dayFourWind = $('#dayFourWind');
const dayFourHumidity = $('#dayFourHumidity');

const dayFiveDate = $('#dayFiveDate');
const dayFiveIcon = $('#dayFiveIcon');
const dayFiveTemp = $('#dayFiveTemp');
const dayFiveWind = $('#dayFiveWind');
const dayFiveHumidity = $('#dayFiveHumidity');

//this function displays the five day forecast for the city chosen
async function displayForecast(city) {
  //used await to make sure the getWeather function will finish before assigning its value
  const forecastData = await getForecast(city, apiKey);
  //will log the data from the getWeather function
  //test for me
  console.log(forecastData);
  
  //conditional statement that will only run if there is data returned successfully from the getForecast function
  if (forecastData) {
    //object deconstructuring
    const { list } = forecastData;
    console.log("Name:", city.name);

    //function with the forecast parameters 
    function updateForecast(timeIndex, dateElement, iconElement, tempElement, windElement, humidityElement) {
      
      //this will specific forecast we are pulling from
      //since the API returns forecast in a time-span of 3 hours
      //will use the following timeIndex because they are 24 hours apart from each other:
      //6, 14, 22, 30, 38
      const day = list[timeIndex];
      //this converts Unix time to the wanted format using a globally defined function 
      const formattedDate = convertUnixtoDateTime(day.dt);

      //The following section updates the parameter with these value
      dateElement.text(formattedDate);
      humidityElement.text(day.main.humidity);
      //This is where I found this link: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
      const iconUrl = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`
      iconElement.html(`<img src="${iconUrl}" alt="WeatherIcon">`);

      const forecastTempInKelvin = day.main.temp;
      const forecastTempToFahrenheit = kelvinToFahrenheit(forecastTempInKelvin);
      tempElement.text(forecastTempToFahrenheit.toFixed(2));

      const forecastWindInMts = day.wind.speed;
      const forecastWindToMps = metersPerSecondToMilesPerHour(forecastWindInMts);
      windElement.text(forecastWindToMps.toFixed(2));
    }

    //runs the function to update the specific sections in the HTML code
    updateForecast(6, dayOneDate, dayOneIcon, dayOneTemp, dayOneWind, dayOneHumidity);
    updateForecast(14, dayTwoDate, dayTwoIcon, dayTwoTemp, dayTwoWind, dayTwoHumidity);
    updateForecast(22, dayThreeDate, dayThreeIcon, dayThreeTemp, dayThreeWind, dayThreeHumidity);
    updateForecast(30, dayFourDate, dayFourIcon, dayFourTemp, dayFourWind, dayFourHumidity);
    updateForecast(38, dayFiveDate, dayFiveIcon, dayFiveTemp, dayFiveWind, dayFiveHumidity);

  }
}