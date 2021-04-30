"use strict";

window.onload = function () {
  const iconElement = document.querySelector(".weather-icon");
  const tempElement = document.querySelector(".temperature-value h3");
  const descElement = document.querySelector(".temperature-description h3");
  const locationElement = document.querySelector(".location h3");
  // Weather
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=Gothenburg&units=metric&APPID=7084c9feecad4a0e88495a33c655f226`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network Response ERROR Try Again!");
      }
    })
    .then((data) => {
      let iconElementValue = data["weather"][0]["icon"];
      let tempElementValue = Math.floor(data["main"]["temp"]);
      let descElementValue = data["weather"][0]["description"];
      let locationValue = data["name"];

      tempElement.innerHTML = tempElementValue + "°C";
      descElement.innerHTML = descElementValue;
      locationElement.innerHTML = locationValue;
      iconElement.innerHTML = `<img src="img/icons/${iconElementValue}.png"/>`;
    })
    .catch((err) => {
      alert(err);
    });
};