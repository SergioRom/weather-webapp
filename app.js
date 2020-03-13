addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      let locationTimezone = document.querySelector(".timezone");
      let tempDegree = document.querySelector(".degree");
      let tempDescription = document.querySelector(".temperature-description");
      let tempSpan = document.querySelector(".temperature-section span");
      let degreeSection = document.querySelector(".degree-section");

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/54cf38cd6e0575256526909a4904f9b2/${lat},${lon}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements
          locationTimezone.textContent = data.timezone;
          tempDegree.textContent = Math.floor(temperature);
          tempDescription.textContent = summary;
          setIcons(icon, document.querySelector(".icon"));

          degreeSection.addEventListener("click", () => {
            if (tempSpan.textContent === "°F") {
              tempSpan.textContent = "°C";
              tempDegree.textContent = Math.floor((temperature - 32) * (5 / 9));
            } else {
              tempSpan.textContent = "°F";
              tempDegree.textContent = Math.floor(temperature);
            }
          });
        });
    });
  } else {
    alert(
      "You need to grant location permission in order to know the weather or your browser doesn't support this feature :("
    );
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
