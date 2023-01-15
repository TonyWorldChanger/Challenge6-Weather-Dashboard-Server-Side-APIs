var zipCode = "75019";
var apiKey = "9245a40f3fa9510a8e08caac843d31d3";
var apiPath = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`;



function getForecast() {
    fetch(apiPath).then((res) => {
        return res.json()
    }).then((json) => {
        console.log(json);
    }).catch((err) => {
        console.log(err.message)
    })

}
getForecast(zipCode, apiKey);
