const search = document.getElementById('search');

// fetching data based on IP;
const API_KEY = config.API_KEY;
let IP = '';

const getUserInfo = (IP) => {
   if(validateIP(search.value)){
      IP = search.value;//if format is correct OR empty;
   }
   let URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${IP}`;
      fetch(URL)
      .then(res => res.json())
      .then(data => {
         displayUserInfo(data);
         displayMap(data);
      });   
}
getUserInfo('');//default empty IP address;

function validateIP(IP){//function to validate the user IP input;
   var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
     if(IP.match(ipformat) || IP==''){
        return true;
     }
     else {
        alert("Wrong or invalid IP, please try again");
        return false;
     }
  }

// info to be displayed;
const userIP = document.getElementById('ip');
const userLoaction = document.getElementById('location');
const userTimeZone = document.getElementById('timezone');
const userISP = document.getElementById('isp');

const displayUserInfo = (data) => {
   userIP.innerText = data.ip;
   userLoaction.innerText = `${data.location.city}, ${data.location.country}`;
   userTimeZone.innerText = `UTC${data.location.timezone}`;
   userISP.innerText = data.isp;
}

// displaying the map
const accessToken = config.ACCESS_TOKEN;
let myMap = L.map('mapid');

const displayMap = (data) => {
   let lat = data.location.lat;
   let lng = data.location.lng;

   // rendering appropriate location;
   myMap.setView([lat,lng], 13);

   // displaying marker on the map;
   let myIcon = L.icon({
      iconUrl: "./images/icon-location.svg",
      iconSize: [46,56],
   });
   const marker = L.marker([lat,lng], {icon: myIcon}).addTo(myMap);

   L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
   }).addTo(myMap);
}