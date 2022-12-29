'use strict';

window.onload = function () {
  const iconElement = document.querySelector('.weather-icon');
  const tempElement = document.querySelector('.temperature-value h3');
  const descElement = document.querySelector('.temperature-description h3');
  const locationElement = document.querySelector('.location h3');
  const searchCity = document.getElementById('searchBar');
  const searchButton = document.getElementById('btnClick');
  const letters = /^[a-zöäå/s]+$/;
  // Search click
  searchButton.addEventListener('click', function () {
    
    if (searchCity.value.toLowerCase().match(letters)) {
      getWeatherInfo(searchCity.value);
    } else {
      alert('Check your city name.');
    }
  });
  
  // Weather
  function getWeatherInfo(value){
    fetch( `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=7084c9feecad4a0e88495a33c655f226`)
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network Response ERROR Try Again!');
        }
    })
    .then((data) => {
        let iconElementValue = data['weather'][0]['icon'];
        let tempElementValue = Math.floor(data['main']['temp']);
        let descElementValue = data['weather'][0]['description'];
        let locationValue = data['name'];

        tempElement.innerHTML = tempElementValue + '°C';
        descElement.innerHTML = descElementValue;
        locationElement.innerHTML = locationValue;
        iconElement.innerHTML = `<img src="img/icons/${iconElementValue}.png"/>`;
    })
    .catch((err) => {
      alert(err);
    });
  };
  searchCity.value == ''? getWeatherInfo('Gothenburg') : ''
// Days-date and Time
setInterval(Clock, 1000);

function Clock() {
  const date = new Date();
  let weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  let d = weekday[date.getDay()];
  document.getElementById('showDay').innerHTML = d;
  document.getElementById('showDate').innerHTML = date.toLocaleDateString();
  document.getElementById('tm').innerHTML = date.toLocaleTimeString();

  const hrHand = document.querySelector('#hours');
  const mnHand = document.querySelector('#minutes');
  const scHand = document.querySelector('#seconds');
  // Getting the time values
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  // hands positions
  let hrPosition = (hr * 360) / 12 + (min * 360) / 60 / 12;
  let minPosition = (min * 360) / 60 + (sec * 360) / 60 / 60;
  let secPosition = (sec * 360) / 60;

  hrHand.style.transform = `rotate(${hrPosition}deg)`;
  mnHand.style.transform = `rotate(${minPosition}deg)`;
  scHand.style.transform = `rotate(${secPosition}deg)`;
}

}