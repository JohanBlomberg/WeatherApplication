async function fetchJson () {
    try {
        let response = await fetch ('https://www.metaweather.com/api/location/search/?query=')
        let data = await response.json();

        console.log(data)
    }catch (error){
        console.log(error)
    }
}

fetchJson();