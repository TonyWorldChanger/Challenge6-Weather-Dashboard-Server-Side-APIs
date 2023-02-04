
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
            document.querySelector("#temp").innerHTML = json.list[0].main.temp;
            document.querySelector("#humidity").innerHTML = json.main.temp;
            document.querySelector("#windSpeed").innerHTML = json.weather[0].description;
            document.querySelector("#uv").innerHTML = json.wind.speed;
        })
        .catch((err) => {
            console.log(err.message);
        })

 };

 