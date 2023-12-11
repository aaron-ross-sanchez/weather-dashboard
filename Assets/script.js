//https://www.w3schools.com/js/js_api_fetch.asp
//city will be chosen by the user
const city = 'Austin'; 
//apiKey will be deleted after grading is completed
const apiKey = '6b85b5521cb7b577a6e51b36f03923b2';

function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

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
async function displayWeather() {
  //used await to make sure the getWeather function will finish before assigning its value
  const weatherData = await getWeather(city, apiKey);
  //will log the entire data received from the getWeather function
  console.log(weatherData);

  //this is a checklist of things I need to include in this api display call
  //City
  //Date
  //Current Icon of Weather
  //Temperature
  //Wind
  //Humidity

  if (weatherData) {
    //This is object deconstruction and a way to pull out specific values from the weatherData object and is assigning those values to those variables
    const { name, dt, main, weather, wind } = weatherData;
    const temperatureInCelsius = main.temp;
    const temperatureToFahrenheit = celsiusToFahrenheit(temperatureInCelsius);

    //This is a test to the console to pull the data that I need
    currentCity.text(name);
    console.log("Name:", name);
    currentDate.text(dt);
    console.log("Date:", dt);
    currentIcon.text(weather[0].icon);
    console.log("Icon:", weather[0].icon);
    currentTemperature.text(temperatureToFahrenheit);
    console.log("Temperature:", main.temp);
    currentWind.text(wind.speed);
    console.log("Wind Speed:", wind.speed);
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

async function displayForecast() {
  //used await to make sure the getWeather function will finish before assigning its value
  const forecastData = await getForecast(city, apiKey);
  //will log the data from the getWeather function
  console.log(forecastData);

  //this is a checklist of things I need to include in the forecast api display call
  //Date
  //Current Icon of Weather
  //Temperature
  //Wind
  //Humidity

  if (forecastData) {
    const { city, list } = forecastData;
    console.log("Name:", city.name);

    //dayOne
    dayOneDate.text(list[6].dt_txt);
    console.log("Day 1 Forecast:", list[6].dt_txt);
    dayOneIcon.text(list[6].weather[0].icon);
    console.log("Icon:", list[6].weather[0].icon);
    dayOneTemp.text(list[6].main.temp);
    console.log("Temperature:", list[6].main.temp);
    dayOneWind.text(list[6].wind.speed);
    console.log("Wind Speed:", list[6].wind.speed);
    dayOneHumidity.text(list[6].main.humidity);
    console.log("Humidity:", list[6].main.humidity);

    //dayTwo
    dayTwoDate.text(list[14].dt_txt);
    console.log("Day 2 Forecast:", list[14].dt_txt);
    dayTwoIcon.text(list[14].weather[0].icon);
    console.log("Icon:", list[14].weather[0].icon);
    dayTwoTemp.text(list[14].main.temp);
    console.log("Temperature:", list[14].main.temp);
    dayTwoWind.text(list[14].wind.speed);
    console.log("Wind Speed:", list[14].wind.speed);
    dayTwoHumidity.text(list[14].main.humidity);
    console.log("Humidity:", list[14].main.humidity);

    //dayThree
    dayThreeDate.text(list[22].dt_txt);
    console.log("Day 3 Forecast:", list[22].dt_txt);
    dayThreeIcon.text(list[22].weather[0].icon);
    console.log("Icon:", list[22].weather[0].icon);
    dayThreeTemp.text(list[22].main.temp);
    console.log("Temperature:", list[22].main.temp);
    dayThreeWind.text(list[22].wind.speed);
    console.log("Wind Speed:", list[22].wind.speed);
    dayThreeHumidity.text(list[22].main.humidity);
    console.log("Humidity:", list[22].main.humidity);

    //dayFour
    dayFourDate.text(list[30].dt_txt);
    console.log("Day 4 Forecast:", list[30].dt_txt);
    dayFourIcon.text(list[30].weather[0].icon);
    console.log("Icon:", list[30].weather[0].icon);
    dayFourTemp.text(list[30].main.temp);
    console.log("Temperature:", list[30].main.temp);
    dayFourWind.text(list[30].wind.speed);
    console.log("Wind Speed:", list[30].wind.speed);
    dayFourHumidity.text(list[30].main.humidity);
    console.log("Humidity:", list[30].main.humidity);

    //dayFive
    dayFiveDate.text(list[38].dt_txt);

    console.log("Day 5 Forecast:", list[38].dt_txt);
    dayFiveIcon.text(list[38].weather[0].icon);

    console.log("Icon:", list[38].weather[0].icon);
    dayFiveTemp.text(list[38].main.temp);

    console.log("Temperature:", list[38].main.temp);
    dayFiveWind.text(list[38].wind.speed);

    console.log("Wind Speed:", list[38].wind.speed);
    dayFiveHumidity.text(list[38].main.humidity);

    console.log("Humidity:", list[38].main.humidity);
  }
}

// getWeather(city, apiKey)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

displayWeather();


// getForecast(city, apiKey)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

displayForecast();


