const apiKey = "f5dbb24e97328295dab3428e5aa3212f";

const consoleBox = document.getElementById("console");

function log(msg){
consoleBox.innerHTML += msg + "<br>";
}


async function getWeather(){

const city = document.getElementById("cityInput").value;

log("Sync Start");

try{

log("ASYNC Start fetching");

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

const data = await response.json();

log("Promise.then (Microtask)");

displayWeather(data);

saveHistory(city);

log("ASYNC Data received");

}
catch{

document.getElementById("weather").innerHTML =
"<span style='color:red'>City not found</span>";

}

log("Sync End");

}



function displayWeather(data){

document.getElementById("weather").innerHTML =

`
<table>
<tr><td>City</td><td>${data.name}</td></tr>
<tr><td>Temp</td><td>${data.main.temp} °C</td></tr>
<tr><td>Weather</td><td>${data.weather[0].main}</td></tr>
<tr><td>Humidity</td><td>${data.main.humidity}%</td></tr>
<tr><td>Wind</td><td>${data.wind.speed} m/s</td></tr>
</table>

`;

}



function saveHistory(city){

let cities = JSON.parse(localStorage.getItem("cities")) || [];

if(!cities.includes(city)){
cities.push(city);
localStorage.setItem("cities",JSON.stringify(cities));
}

loadHistory();

}



function loadHistory(){

let cities = JSON.parse(localStorage.getItem("cities")) || [];

const historyDiv = document.getElementById("history");

historyDiv.innerHTML="";

cities.forEach(city=>{

let btn = document.createElement("span");

btn.innerText = city;

btn.onclick = () => {

document.getElementById("cityInput").value = city;

getWeather();

};

historyDiv.appendChild(btn);

});

}


window.onload = loadHistory;
