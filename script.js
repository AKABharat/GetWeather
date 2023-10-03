document.addEventListener("DOMContentLoaded", () => {

  let displayCity = document.querySelector("#displayCity");
  let cityName = document.querySelector("#cityName");
  let SubmitButton = document.querySelector("#submit_button");
  // let cloud_pct = document.querySelector("#cloud_pct");
  let temp = document.querySelector(".temp");
  let feels_like = document.querySelector("#feels_like");
  let humidity = document.querySelector(".humidity");
  let min_temp = document.querySelector("#min_temp");
  let max_temp = document.querySelector("#max_temp");
  let wind_speed = document.querySelector(".wind_speed");
  let wind_degrees = document.querySelector("#wind_degrees");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let rain_update = document.querySelector(".rain_update");
  let Small_temp = document.querySelector(".Small_temp");
  let year = document.querySelector(".year");

  // let cityName = "";
  // document.querySelector("button").addEventListener("click", () => {
  //   cityName = document.querySelector(".searchInput").value;


  // });

  // let url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
  // let url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=jaipur`;

  // displayCity.innerHTML = "jaipur"

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2374255a59mshc5cd5bc26e33aedp1fe8afjsnfc671e58b302',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };
  // getWeatherMethod();

  function checkRain(humidity) {
    if (humidity >= 70) {
      return "<h1>🌧️⛈️</h1> High chance of rain and thunderstorms.";
    } else if (humidity >= 50) {
      return "<h1>🌦️</h1> Moderate chance of rain with some clouds.";
    } else {
      return "<h1>☀️</h1> Clear skies, low chance of rain.";
    }
  }

  function covertingTime(time) {
    const unixTimestamp = time; // Replace with your actual Unix timestamp

    // Convert Unix timestamp to milliseconds
    const timestampInMilliseconds = unixTimestamp * 1000;

    // Create a new Date object using the converted timestamp
    const sunriseDate = new Date(timestampInMilliseconds);

    // Get the individual components of the time
    const hours = sunriseDate.getHours();
    const minutes = sunriseDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour time
    const hours12 = hours % 12 || 12;

    // Format the components into a 12-hour time string (hh:mm AM/PM)
    return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  }


  function update_year() {
    let time = new Date();
    year.innerHTML = time.getFullYear();
  }
  update_year();

  const getWeatherMethod = (cityName) => {

    displayCity.innerHTML = cityName;
    fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`, options)
      .then(response => response.json())
      .then((result) => {
        console.log(result);

        // cloud_pct.innerHTML = result.cloud_pct;
        temp.innerHTML = result.temp;
        Small_temp.innerHTML = result.temp;
        // feels_like.innerHTML = result.feels_like;
        humidity.innerHTML = result.humidity;
        rain_update.innerHTML = checkRain(result.humidity);
        min_temp.innerHTML = result.min_temp;
        wind_degrees.innerHTML = result.wind_degrees;
        max_temp.innerHTML = result.max_temp;
        wind_speed.innerHTML = result.wind_speed;
        wind_degrees.innerHTML = result.wind_degrees;
        sunrise.innerHTML = covertingTime(result.sunrise);
        sunset.innerHTML = covertingTime(result.sunset);
        // sunrise.innerHTML = result.sunrise;
        // sunset.innerHTML = result.sunset;
        console.log(humidity.innerHTML);
        console.log(rain_update.innerHTML);


      }
      )
      .catch(err => console.error(err));
  }

  SubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    // displayCity.innerHTML = cityName.value;

    getWeatherMethod(cityName.value);
  });


  getWeatherMethod("jaipur")


});

