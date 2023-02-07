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
    displayForecastInfo(data);
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
    dWindSpeed(data.current,'windSpeed');
    dHumidity(data.current,'humidity');
    dPressure(data.current,'pressure');
    dUV(data.current,'uvIdx');
    dCityName(data.location,'dCity');
    dCondition(data.current.condition,'weatherConditionImg','weatherConditionText');
    dTemperature(data,'dTemp','dMinTemp','dMaxTemp');
}

const dWindSpeed = (current,id) =>{
    const windSpeed = document.getElementById(id);
    windSpeed.innerText = `${current.wind_kph} km/h`;
}
const dHumidity = (current,id) =>{
    const humidity = document.getElementById(id);
    humidity.innerText = `${current.humidity} %`;
}
const dPressure = (current,id) =>{
    const pressure = document.getElementById(id);
    pressure.innerText = `${current.pressure_mb} mb`;
}
const dUV = (current,id) =>{
    const uvIdx = document.getElementById(id);
    uvIdx.innerText = `${current.uv}`;
}
const dCityName = (location,id) =>{
    const dCity = document.getElementById(id);
    dCity.innerHTML = `${location.name}<br>${location.region},${location.country}`;
}
const dCondition = (condition,id1,id2) =>{
    const weatherConditionImg = document.getElementById(id1);
    weatherConditionImg.src = condition.icon;
    const weatherConditionText = document.getElementById(id2);
    weatherConditionText.innerText = `${condition.text}`;
}
const dTemperature = (data,id1,id2,id3) =>{
    const dTemp = document.getElementById(id1);
    dTemp.innerHTML = `${data.current.temp_c} &#176C`;
    const dMinTemp = document.getElementById(id2);
    dMinTemp.innerHTML = `Min-Temp${data.forecast.forecastday[0].day.mintemp_c} &#176C`;
    const dMaxTemp = document.getElementById(id3);
    dMaxTemp.innerHTML = `Max-Temp${data.forecast.forecastday[0].day.maxtemp_c} &#176C`;
}

// hour update js

const dTempAndFeel = (current,id1,id2) =>{
    const dTemp = document.getElementById(id1);
    dTemp.innerHTML = `${current.temp_c} &#176C`;
    const feels = document.getElementById(id2);
    feels.innerHTML = `${current.feelslike_c} &#176C`;
}

const cardHeading = (condition,id1,id2) =>{
    const img = document.getElementById(id1);
    img.src = condition.icon;
    const text = document.getElementById(id2);
    text.innerText = condition.text;
}
const displayForecastInfo = (data) =>{
    const hourId = [[0,'00'],[4,'04'],[8,'08'],[12,'12'],[16,'16'],[20,'20']];
    hourId.forEach((element) =>{
        cardHeading(data.forecast.forecastday[0].hour[element[0]].condition,`cardHeadImg${element[1]}`,`cardHeadText${element[1]}`);
        dWindSpeed(data.forecast.forecastday[0].hour[element[0]],`windSpeed${element[1]}`);
        dHumidity(data.forecast.forecastday[0].hour[element[0]],`humidity${element[1]}`)
        dPressure(data.forecast.forecastday[0].hour[element[0]],`pressure${element[1]}`)
        dUV(data.forecast.forecastday[0].hour[element[0]],`uvIdx${element[1]}`)
        dUV(data.forecast.forecastday[0].hour[element[0]],`uvIdx${element[1]}`)
        dTempAndFeel(data.forecast.forecastday[0].hour[element[0]],`temp${element[1]}`,`feels${element[1]}`);
    });
}
