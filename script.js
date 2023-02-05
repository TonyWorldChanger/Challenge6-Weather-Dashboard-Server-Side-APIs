
var apiKey = "9245a40f3fa9510a8e08caac843d31d3";
var searchButton = document.querySelector("#searchBtn");
const currentDate = dayjs();




$("#cityNameDate").text(currentDate.format("MMMM DD,YYYY HH:mm A"));


$("#searchBtn").on("click", searchCity);
    console.log("I work");
    function searchCity() {
        var userInput = $(this).parent().attr("id");
        var userValue = $(this).parent().children().eq(1).val();
        getCityName(userValue);
        localStorage.setItem(userInput, userValue);
        console.log("search");
    };




function getCityName(cityName) {
    var apiPath = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
      fetch(apiPath).then((res) => {
          return res.json()
      }).then((json) => {
          console.log(json);
          let lat = json[0].lat;
          let lon = json[0].lon;
          getweather(lat, lon);
          fiveDayForecast(lat, lon);
      }).catch((err) => {
          console.log(err.message);
      })
  
  
  };


 function getweather(lat, lon) {
    var apiPath =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        fetch(apiPath).then((res) => {
            return res.json()  
        }).then((json) => {
            console.log(json);
            document.querySelector("#cityNameDate").innerHTML = "City: " + json.city.name + "  " +  (currentDate.format("MM/DD/YYYY"));
            document.querySelector("#temp").innerHTML = "Temperature: " + json.list[0].main.temp + "\xB0";
            document.querySelector("#humidity").innerHTML = "Humidity: " + json.list[0].main.humidity;
            document.querySelector("#windSpeed").innerHTML = "Wind Speed: " +  json.list[0].wind.speed + " MPH ";
            document.querySelector("#weather").innerHTML = "Description: " + json.list[0].weather[0].description;
        })
        .catch((err) => {
            console.log(err.message);
        })

 };



function fiveDayForecast(lat, lon) {
    var apiPath =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        fetch(apiPath).then((res) => {
            return res.json()
        }).then((json) => {
            console.log(json);
            var row = document.querySelector('.weather.row');
            //clear out the old weather and add the new
            // row.innerHTML = '';
            row.innerHTML = res.daily
              .map((day, idx) => {
                if (idx <= 5) {
                  let dt = new Date(json.list[0].clouds.dt * 1000); //timestamp * 1000
                  let sr = new Date(json.city.sunrise * 1000).toTimeString();
                  let ss = new Date(json.city.sunset * 1000).toTimeString();
                  return `<div class="col">
                      <div class="card">
                      <h5 class="card-title p-2">${dt.toDateString()}</h5>
                        <img
                          src="http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png"
                          class="card-img-top"
                          alt="${json.list[0].weather[0].description}"/>
                        <div class="card-body">
                          <h3 class="card-title">${json.list[0].weather[0].main}</h3>
                          <p class="card-text">High ${json.list[0].main.temp_max}&deg;F Low ${day.temp_min}&deg;F</p>
                          <p class="card-text">High Feels like ${day.feels_like.day}&deg;F</p>
                          <p class="card-text">Pressure ${day.pressure}mb</p>
                          <p class="card-text">Humidity ${day.humidity}%</p>
                          <p class="card-text">UV Index ${day.uvi}</p>
                          <p class="card-text">Precipitation ${day.pop * 100}%</p>
                          <p class="card-text">Dewpoint ${day.dew_point}</p>
                          <p class="card-text">Wind ${day.wind_speed}m/s, ${day.wind_deg}&deg;</p>
                          <p class="card-text">Sunrise ${sr}</p>
                          <p class="card-text">Sunset ${ss}</p>
                        </div>
                      </div>
                    </div>
                  </div>`;
                }
              })
              .join(' ');
            })
        
            .catch((err) => {
            console.log(err.message);
            })
        
}
