//https://www.w3schools.com/js/js_api_fetch.asp
//city will be chosen by the user
const city = 'Austin'; 
//apiKey will be deleted after grading is completed
const apiKey = '6b85b5521cb7b577a6e51b36f03923b2';

function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9 / 5) + 32;
}

function metersPerSecondToMilesPerHour(mps) {
  return (mps * 2.23694);
}

function convertUnixtoDateTime(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);

  const year = dateObject.getFullYear();
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
  const day = ('0' + dateObject.getDate()).slice(-2);

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

// function getCitySuggestions(inputValue) {
//   return fetch(`https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&appid=${apiKey}`)
//     .then(response => {
//       if(!response.ok) {
//         throw new Error('Error');
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data.list.map(city => city.name);
//     })
//     .catch(error => {
//       console.error(error);
//       return [];
//     });
// }

// $('#city-search').on('input', function() {
//   city = $(this).val().trim();
//   console.log('City:', city);
// })


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

  if (weatherData) {
    //This is object deconstruction and a way to pull out specific values from the weatherData object and is assigning those values to those variables
    const { name, dt, main, weather, wind } = weatherData;
    const temperatureInKelvin = main.temp;
    const temperatureToFahrenheit = kelvinToFahrenheit(temperatureInKelvin);
    const speedInMetersPerSecond = wind.speed;
    const speedToMilesPerHour = metersPerSecondToMilesPerHour(speedInMetersPerSecond);
    const iconUrl = `http://openweathermap.org/img/w/${weather[0].icon}.png`
    const formattedDate = convertUnixtoDateTime(dt);

    //This is a test to the console to pull the data that I need
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

async function displayForecast() {
  //used await to make sure the getWeather function will finish before assigning its value
  const forecastData = await getForecast(city, apiKey);
  //will log the data from the getWeather function
  console.log(forecastData);
  
  if (forecastData) {
    const { list } = forecastData;
    console.log("Name:", city.name);

    function updateForecast(timeIndex, dateElement, iconElement, tempElement, windElement, humidityElement) {
      const day = list[timeIndex];
      const formattedDate = convertUnixtoDateTime(day.dt);

      dateElement.text(formattedDate);
      // iconElement.text(day.weather[0].icon);
      // tempElement.text(day.main.temp);
      // windElement.text(day.wind.speed);
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

    updateForecast(6, dayOneDate, dayOneIcon, dayOneTemp, dayOneWind, dayOneHumidity);
    updateForecast(14, dayTwoDate, dayTwoIcon, dayTwoTemp, dayTwoWind, dayTwoHumidity);
    updateForecast(22, dayThreeDate, dayThreeIcon, dayThreeTemp, dayThreeWind, dayThreeHumidity);
    updateForecast(30, dayFourDate, dayFourIcon, dayFourTemp, dayFourWind, dayFourHumidity);
    updateForecast(38, dayFiveDate, dayFiveIcon, dayFiveTemp, dayFiveWind, dayFiveHumidity);

  }
}

displayWeather();

displayForecast();

// getWeather(city, apiKey)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   });



// getForecast(city, apiKey)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   });



