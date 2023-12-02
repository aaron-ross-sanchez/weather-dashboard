const lat = 37.7749; // replace with the latitude of the desired location
const lon = -122.4194; // replace with the longitude of the desired location
const apiKey = '6b85b5521cb7b577a6e51b36f03923b2'; // replace with your actual API key

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // process the weather data here
    console.log(data);
  })
  .catch(error => {
    // handle any errors
    console.error(error);
  });