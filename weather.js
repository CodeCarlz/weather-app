 weather = async (search) => {
  const defaultCountry = 'Manila'
  

  const url = search ? `https://weatherapi-com.p.rapidapi.com/current.json?q=${search}` : `https://weatherapi-com.p.rapidapi.com/current.json?q=${defaultCountry}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b0cbc9dd9emsh3b5b00f6d3497a3p1f8af4jsnc034605e7647',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    weatherData(result)
    weatherIcon(result)
    return result
  } catch (error) {
    console.error(error);
  }
}


  const searchBar = document.getElementById('searchBar')
  searchBar.onkeyup = () => weather(searchBar.value)
  
function weatherIcon(weatherCondition){
  const weather = weatherCondition.current.condition.text
  let iconIndex;
  if(weather == 'Partly cloudy'){
    iconIndex = 'icons/partly-cloud.svg'
  }else if(weather == 'Clear'){
    iconIndex = 'icons/clear.svg'
  }else if(weather == 'Light rain'|| weather == 'Patchy rain possible'){
    iconIndex = 'icons/rainy-outline.svg'
  }else if(weather == 'Sunny'){
    iconIndex = 'icons/sunny.svg'
  }else if(weather == 'Moderate or heavy rain with thunder' || weather == 'Moderate or heavy rain shower'){
    iconIndex = 'icons/thunderstorm-outline.svg'
  }else{
    iconIndex = 'icons/sunny.svg'
  }
  weatherData(weatherCondition,iconIndex)
  return iconIndex
}

function weatherData (data,iconIndex){
const weatherLocation = document.getElementById('weatherLocation')
const Celsius = document.getElementById('Celsius')
const Fahrenheit = document.getElementById('Fahrenheit')
const mainTemperature = document.getElementById('mainTemperature')
const weatherCondition = document.getElementById('weatherCondition')
const weatherIcon = document.querySelector('.weatherIcon')
// console.log(data)
console.log(iconIndex)
weatherIcon.src = `${iconIndex}`
mainTemperature.innerText = `${data.current.cloud}`
weatherCondition.innerText = `${data.current.condition.text}`
weatherLocation.innerText = `${data.location.region}`
Celsius.innerText = `${data.current.temp_c}`
Fahrenheit.innerText = `${data.current.temp_f}`

}

weather()