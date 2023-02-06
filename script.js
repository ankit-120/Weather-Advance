let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date = () =>{
    const d = new Date();
    const day_date = document.getElementById('day_date');
    day_date.innerText = `${days[d.getMonth()]} ${d.getDate()}, ${months[d.getMonth()]} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    setTimeout(function(){ date() },1000);
    const dTime = document.getElementById('dTime');
    dTime.innerText = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

date();

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '66d2be9238msha4cebd8fecf47eap1cec3bjsnf5ee297abac5',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

const baseurl = "https://weatherapi-com.p.rapidapi.com/forecast.json?q="

const fetchApi = async (cityName) =>{
    const url = `${baseurl}${cityName}&days=3`
    const resp = await fetch(url,options);
    const data = await resp.json();
    console.log(data);
    displayInfo(data);
}

const search_btn = document.getElementById('search_btn');
search_btn.onclick = () =>{
    getWeather();
}

const getWeather = () =>{
    const inputCity = document.getElementById('inputCity').value;
    fetchApi(inputCity);
}

const displayInfo = (data) =>{
    dWindSpeed(data.current);
    dHumidity(data.current);
    dPressure(data.current);
    dUV(data.current);
    dCityName(data.location);
    dCondition(data.current.condition);
    dTemperature(data);
}

const dWindSpeed = (current) =>{
    const windSpeed = document.getElementById('windSpeed');
    windSpeed.innerText = `${current.wind_kph} km/h`;
}
const dHumidity = (current) =>{
    const humidity = document.getElementById("humidity");
    humidity.innerText = `${current.humidity} %`;
}
const dPressure = (current) =>{
    const pressure = document.getElementById('pressure');
    pressure.innerText = `${current.pressure_mb} mb`;
}
const dUV = (current) =>{
    const uvIdx = document.getElementById('uvIdx');
    uvIdx.innerText = `${current.uv}`;
}
const dCityName = (location) =>{
    const dCity = document.getElementById('dCity');
    dCity.innerHTML = `${location.name}<br>${location.region},${location.country}`;
}
const dCondition = (condition) =>{
    const weatherConditionImg = document.getElementById('weatherConditionImg');
    weatherConditionImg.src = condition.icon;
    const weatherConditionText = document.getElementById('weatherConditionText');
    weatherConditionText.innerText = `${condition.text}`;
}
const dTemperature = (data) =>{
    const dTemp = document.getElementById('dTemp');
    dTemp.innerHTML = `${data.current.temp_c} &#176C`;
    const dMinTemp = document.getElementById('dMinTemp');
    dMinTemp.innerHTML = `Min-Temp${data.forecast.forecastday[0].day.mintemp_c} &#176C`;
    const dMaxTemp = document.getElementById('dMaxTemp');
    dMaxTemp.innerHTML = `Max-Temp${data.forecast.forecastday[0].day.maxtemp_c} &#176C`;
}