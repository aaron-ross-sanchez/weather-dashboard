//interpolate variables into a string by using ` instead of '
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//https://www.w3schools.com/js/js_api_fetch.asp
const city = 'Austin'; 
const apiKey = '6b85b5521cb7b577a6e51b36f03923b2';


//This is the function to get the weather from the api
//It has two parameters, the city and apiKey
//apiKey will be deleted after grading is completed
//city will be chosen by the user
function getWeather(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
    
}

//this is the function to displayWeather
//used a async function to use await keyword
async function displayWeather() {
  //used await to make sure the getWeather function will finish before assigning its value
  const weatherData = await getWeather(city, apiKey);
  //will log the data from the getWeather function
  console.log(weatherData);

  if (weatherData) {
    const { name, main, coord } = weatherData;
    console.log(name);
  }
}
//this is a checklist of things I need to include in this api display call
//City
//Date
//Current Icon of Weather
//Temperature
//Wind
//Humidity
displayWeather();

getWeather(city, apiKey)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

  //this is a checklist of things I need to include in the forecast api display call
  //Date
  //Current Icon of Weather
  //Temperature
  //Wind
  //Humidity





// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
//   .then(response => response.json())
//   .then(data => {
//     // process the weather data here
//     console.log(data);
//   })
//   .catch(error => {
//     // handle any errors
//     console.error(error);
//   });

