let valueOfInput = document.getElementById('inputField')
let todaysWeather = document.getElementById('todaysWeather')
let upcomingWeather = document.getElementById('upcomingWeather')
let weatherPrognos = document.getElementById('weatherPrognos')


valueOfInput.addEventListener('keyup', function (){
    fetchJsonCurrentWeather()
    fetchJsonFutureForecast()
    createFutureForecast()
})

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

function currentWeatherInformation(data) {
    let weatherHTML = `
    <div><h3>Stad: ${data.location.name}</h3>
    <img src='http:${data.current.condition.icon}'></img></div>
    <p>Temperaturen är just nu ${data.current.temp_c} grader, men det känns som ${data.current.feelslike_c} grader</p>
        `    
    return weatherHTML;
}

async function fetchJsonFutureForecast (value) {
    let numberOfDays = value

try {
    let response = await fetch ('http://api.weatherapi.com/v1/forecast.json?key=dc1b9e8c38834cfba91131450212411&q=' + valueOfInput.value + '&days=' + numberOfDays + '&aqi=no&alerts=no')
        if (!response.ok){
            throw new Error ('Network problem')
        }
        futureWeather = await response.json()
console.log(futureWeather)
let futureWeatherHTML = futureWeatherInformation(futureWeather);
weatherPrognos.innerHTML = futureWeatherHTML;
        
            } catch (error){
                console.log(error)
    }
}

function futureWeatherInformation(futureWeather){
    let futureWeatherHTML = ''
    
    for(date of futureWeather.forecast.forecastday){
    futureWeatherHTML += `
    <tr>
    <td><h4>Datum: ${date.date}</h4></td>
<td><p>Soluppgång: ${date.astro.sunrise}</p></td>
<td><p>Solnedgång: ${date.astro.sunset}</p></td>
<td><p>Högsta temperatur: ${date.day.maxtemp_c} grader</p></td>
<td><p>Lägsta temperatur: ${date.day.mintemp_c} grader</p></td>
        </tr>
        <br>
        `
    }

        return futureWeatherHTML;
    }

function createFutureForecast() {
    let futureForecast = `
    <label for="upcomingWeather">Välj antal dagar för att se kommande prognos</label>
    <select name="upcomingWeather" id="upcomingWeather" onchange='fetchJsonFutureForecast(this.value)'>
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    `
    return futureForecast;
}

