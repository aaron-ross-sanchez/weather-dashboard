//interpolate variables into a string by using ` instead of '
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//https://www.w3schools.com/js/js_api_fetch.asp

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

const city = 'Austin'; 
const apiKey = '6b85b5521cb7b577a6e51b36f03923b2';

getWeather(city, apiKey)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });


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

