
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
            row.innerHTML = json.list.map((list, idx) => {
                if (idx <= 5) {
                  return `<div class="col">
                      <div class="card">
                        <img
                          src="http://openweathermap.org/img/wn/${json.list[idx].weather[0].icon}@2x.png"
                          class="card-img-top"
                          alt="${json.list[idx].weather[0].description}"/>
                        <div class="card-body">
                          <h3 class="card-title">${json.list[idx].weather[0].main}</h3>
                          <p class="card-text">High ${json.list[idx].main.temp_max}&deg;F Low ${json.list[idx].main.temp_min}&deg;F</p>
                          <p class="card-text">High Feels like ${json.list[idx].main.feels_like}&deg;F</p>
                        </div>
                      </div>
                    </div>
                  </div>`;
                }
              })
            
        })
        
        .catch((err) => {
            console.log(err);    
        })
        
};
