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
    <label for="upcomingWeather">Välj antal dagar för att se kommande prognos</label>
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
    <td><h3>Datum: ${date.date}</h3></td>
<td><p>Soluppgång: ${date.astro.sunrise}</p></td>
<td><p>Solnedgång: ${date.astro.sunset}</p></td>
<td><p>Högsta temperatur: ${date.day.maxtemp_c} grader</p></td>
<td><p>Lägsta temperatur: ${date.day.mintemp_c} grader</p></td>
        </tr>
        `
    }

        return futureWeatherHTML;
    }


function currentWeatherInformation(data) {
    let weatherHTML = `
    <h2>Stad: ${data.location.name}</h2>
    <p>Temperaturen är just nu ${data.current.temp_c} grader, men det känns som ${data.current.feelslike_c} grader</p>
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


