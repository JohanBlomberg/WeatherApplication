let valueOfInput = document.getElementById('inputField')
let todaysWeather = document.getElementById('todaysWeather')
let upcomingWeather = document.getElementById('upcomingWeather')
let weatherPrognos = document.getElementById('weatherPrognos')


valueOfInput.addEventListener('keyup', function (){
    fetchJsonCurrentWeather()
    fetchJsonFutureForecast()
    createFutureForecast()

})
function createFutureForecast() {
    let futureForecast = `
    <label for="upcomingWeather">Choose future forecast:</label>
    <select name="upcomingWeather" id="upcomingWeather" onchange='fetchJsonFutureForecast(this.value)'>
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    `
    return futureForecast;
}

async function fetchJsonFutureForecast (value) {
    let numberOfDays = value

try {
    let response = await fetch ('http://api.weatherapi.com/v1/forecast.json?key=dc1b9e8c38834cfba91131450212411&q=' + valueOfInput.value + '&days=' + numberOfDays + '&aqi=no&alerts=no')
        if (!response.ok){
            throw new Error ('Network problem')
        }
        futureWeather = await response.json()
console.log(futureWeather.forecast.forecastday)
let futureWeatherHTML = futureWeatherInformation(futureWeather);
weatherPrognos.innerHTML = futureWeatherHTML;
        
            } catch (error){
                console.log(error)
    }
}

function futureWeatherInformation(futureWeather){
    let futureWeatherHTML = `
        <h3>Date: ${futureWeather.forecast.forecastday}</h3>
        `

        return futureWeatherHTML;
    }


function currentWeatherInformation(data) {
    let weatherHTML = `
    <h2>City: ${data.location.name}</h2>
    <p>The temperature right now is ${data.current.temp_c} degrees, but it feels like ${data.current.feelslike_c} degrees</p>
    <img src='http:${data.current.condition.icon}'></img>
        `    
    return weatherHTML;
}

async function fetchJsonCurrentWeather () {
    try {
        let response = await fetch ('http://api.weatherapi.com/v1/current.json?key=dc1b9e8c38834cfba91131450212411&q=' + valueOfInput.value)

        if (!response.ok){
            throw new Error ('Network problem')
        }
        let data = await response.json();
       let weatherHTML = currentWeatherInformation(data);
       let futureForecast = createFutureForecast();

       todaysWeather.innerHTML = weatherHTML;
       upcomingWeather.innerHTML = futureForecast;
    }catch (error){
        console.log(error)
    }
}


