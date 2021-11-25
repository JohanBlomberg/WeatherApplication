let searchButton = document.getElementById('searchButton')
let valueOfInput = document.getElementById('inputField').value
let todaysWeather = document.getElementById('todaysWeather')
let upcomingWeather = document.getElementById('upcomingWeather')


searchButton.addEventListener('click', function (){
    fetchJsonCurrentWeather()
    fetchJsonFutureForecast()
    createFutureForecast()
})

function createFutureForecast() {
    let futureForecast = `
    <label for="upcomingWeather">Choose future forecast:</label>
    <select name="upcomingWeather" id="upcomingWeather">
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    `
    return futureForecast;
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
        let response = await fetch ('http://api.weatherapi.com/v1/current.json?key=dc1b9e8c38834cfba91131450212411&q=' + valueOfInput)

        if (!response.ok){
            throw new Error ('Network problem')
        }
        let data = await response.json();
console.log(data)
       let weatherHTML = currentWeatherInformation(data);
       let futureForecast = createFutureForecast();

       todaysWeather.innerHTML = weatherHTML;
       upcomingWeather.innerHTML = futureForecast;
    }catch (error){
        console.log(error)
    }
}

async function fetchJsonFutureForecast () {
    try {
        let response = await fetch ('http://api.weatherapi.com/v1/forecast.json?key=dc1b9e8c38834cfba91131450212411&q=' + valueOfInput + '&days=3&aqi=no&alerts=no')
        if (!response.ok){
            throw new Error ('Network problem')
        }
        data = await response.json()

        console.log(data.location.name)
    } catch (error){
        console.log(error)
    }
}

