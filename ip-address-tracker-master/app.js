const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

// icon
var comIcon = L.icon({
  iconUrl: "./images/computer.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const list = {
  ip: document.getElementById("ip"),
  loc: document.getElementById("loc"),
  time: document.getElementById("time"),
  isp: document.getElementById("isp"),
};

const loader = document.querySelector(".loader");

const ipMap = L.map("map");

const appMap = (lat, lng, zoom) => {
  ipMap.setView([lat, lng], zoom);
  L.tileLayer(tileUrl, { attribution }).addTo(ipMap);

  // marker and a pop up
  const marker = L.marker([lat, lng], { icon: comIcon }).addTo(ipMap);
  marker.bindPopup("The device is located here.").openPopup();

  // Circle around the device
  L.circle([lat, lng], {
    color: "#0000",
    fillColor: "#00",
    fillOpacity: 0.5,
    radius: 300,
  }).addTo(ipMap);
};

const initLat = 37.4223;
const initLng = -122.085;

appMap(initLat, initLng, 13);

const searchBtn = document.querySelector(".search-btn");
const ipAddrs = document.querySelector("#ip-address");

const url =
  "https://geo.ipify.org/api/v1?apiKey=at_wK2xe8s7vhqPYmO57Gbz2YyWXWAkc&ipAddress=";

searchBtn.addEventListener("click", () => {
  loader.style.visibility = "visible";
  const regExp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (regExp.test(ipAddrs.value)) {
    fetch(url + ipAddrs.value)
      .then((res) => {
        res.json().then((data) => {
          list.ip.innerText = data.ip;
          list.loc.innerText = data.location.city;
          list.time.innerText = data.location.timezone;
          list.isp.innerText = data.isp;
          appMap(data.location.lat, data.location.lng, 15);
          loader.style.visibility = "hidden";
        });
      })
      .catch((err) => {
        console.log(err);
        loader.style.visibility = "hidden";
      });
  } else {
    console.log("Enter correct ip address");
    loader.style.visibility = "hidden";
  }
});
