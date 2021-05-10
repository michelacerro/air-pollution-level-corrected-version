import 'regenerator-runtime/runtime';
import _ from 'lodash';
import '../css/style.css';
import search from '../img/search.png';
import gps from '../img/gps.png';



const myToken = process.env.MY_TOKEN;


// ______Structure
document.body.setAttribute('class', 'flex-column');

// ---------- INPUT PART ----------
const inputs = document.createElement('div');
document.body.appendChild(inputs);

// 1) h1 - input title
const inputTitle = document.createElement('h1');
inputTitle.setAttribute('class', 'green-font large-cursive-font');
inputTitle.innerHTML = 'Do you want to know the level of air pollution in your city?';
inputs.appendChild(inputTitle);

// 2) p
const inputPara = document.createElement('p');
inputPara.innerHTML = 'Insert the name of your city';
inputs.appendChild(inputPara);

// ----- Search with text input
// 3) div - search input
const searchInput = document.createElement('div');
searchInput.setAttribute('id', 'search-input');
searchInput.setAttribute('class', 'flex-row');
inputs.appendChild(searchInput);

// 3.1) input - search bar (+ event)
const searchBar = document.createElement('input');
searchBar.setAttribute('placeholder', 'City');
searchBar.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {searchButton.click();}
});
searchInput.appendChild(searchBar);

// 3.2) button - search (+ event)
const searchButton = document.createElement('button');
searchButton.setAttribute('id', 'search-button');
searchButton.setAttribute('class', 'white-font');
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchBar.value) {
      const cityName = searchBar.value.toLowerCase();
      searchBar.value = '';
  
      link(`https://api.waqi.info/feed/${cityName}/?token=${myToken}`);
    }
});
searchInput.appendChild(searchButton);

// 3.2.1) img - search img (img fot search button)
const searchImg = new Image();
searchImg.setAttribute('id', 'search-img');
searchImg.src = search;
searchButton.appendChild(searchImg);


// ----- Search with GPS input
// 4) p
const gpsPara = document.createElement('p');
gpsPara.innerHTML = 'or click the bottom to active the GPS reseach';
inputs.appendChild(gpsPara);

// 5) button - gps (+ event)
const gpsButton = document.createElement('button');
gpsButton.setAttribute('id', 'gps-button');
gpsButton.addEventListener('click', () => {
    const successCallback = async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        link(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${myToken}`)
    };
    const errorCallback = function (error) {
        alert(error.message);
    }
    const options = {enableHighAccuracy: true, timeout: 5000};
      
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
});
inputs.appendChild(gpsButton);

// 5.1) img - gps (img for gps button)
const gpsImg = new Image();
gpsImg.setAttribute('id', 'gps-img');
gpsImg.src = gps;
gpsButton.appendChild(gpsImg);


// ---------- OUTPUT PART ----------
const outputs = document.createElement('div');
outputs.setAttribute('id', 'outputs');
document.body.appendChild(outputs);

// 1) p - output title
const outputTitle = document.createElement('p');
outputTitle.setAttribute('class', 'small-font light-blue-font left-font');
outputs.appendChild(outputTitle);

// ----- Pollution level visualisation
// 2) div - output view
const outputView = document.createElement('div');
outputView.setAttribute('id', 'output-view');
outputView.setAttribute('class', 'flex-row');
outputs.appendChild(outputView);

// 2.1) div - output value
const outputValue = document.createElement('div');
outputValue.setAttribute('id', 'output-value');
outputValue.setAttribute('class', 'white-font large-cursive-font flex-row');
outputView.appendChild(outputValue);


// 2.2) div - output level
const outputLevel = document.createElement('div');
outputLevel.setAttribute('id', 'output-level');
outputLevel.setAttribute('class', 'flex-column');
outputView.appendChild(outputLevel);

// 2.2.1) p - apl title
const aplTitle = document.createElement('p');
aplTitle.setAttribute('class', 'small-font');
aplTitle.innerHTML = 'Air Pollution Level';
outputLevel.appendChild(aplTitle);

// 2.2.2= p - apl level
const aplLevel = document.createElement('p');
aplLevel.setAttribute('class', 'medium-font');
outputLevel.appendChild(aplLevel);


// ----- Details visualisation
// 3) details - more details
const detailsMore = document.createElement('details');
outputs.appendChild(detailsMore);

// 3.1) summary - details button
const detailsButton = document.createElement('summary');
detailsButton.setAttribute('class', 'small-font left-font open-button');
detailsButton.innerHTML = 'More details';
detailsMore.appendChild(detailsButton);

// 3.2) div - details list
const detailsList = document.createElement('ul');
detailsList.setAttribute('id', 'details-list');
detailsList.setAttribute('class', 'xsmall-font');
detailsMore.appendChild(detailsList);


// ----- Stations visualisation
// 4) details - nearby station
const detailsStations = document.createElement('details');
outputs.appendChild(detailsStations);

// 4.1) summary - station button
const stationsButton = document.createElement('summary');
stationsButton.setAttribute('class', 'small-font left-font open-button');
stationsButton.innerHTML = 'More stations';
detailsStations.appendChild(stationsButton);

// 4.2.1) p - station description
const stationsDescription = document.createElement('p');
stationsDescription.setAttribute('class', 'small-font');
detailsStations.appendChild(stationsDescription);

// 4.2.2) div - station list
const stationsList = document.createElement('ul');
stationsList.setAttribute('id', 'stations-list');
stationsList.setAttribute('class', 'xsmall-font');
detailsStations.appendChild(stationsList);

// ----- Initial output display
outputs.style.display = 'none';


// ______Request
// ---------- API axios ----------
function link(url) {
  const axios = require('axios');
  axios.get(url)
    .then(function(response) {
      const result = response.data;

      //  ----- Variables from JSON
      const aqi = _.get(result.data, "aqi", "-");
      const cityAqi = _.get(result.data.city, "name", "-")

      const pm25 = _.get(result.data.iaqi.pm25, "v", "-");
      const pm10 = _.get(result.data.iaqi.pm10, "v", "-");
      const o3 = _.get(result.data.iaqi.o3, "v", "-");
      const no2 = _.get(result.data.iaqi.no2, "v", "-");
      const so2 = _.get(result.data.iaqi.so2, "v", "-");
      const co = _.get(result.data.iaqi.co, "v", "-");

      const temp = _.get(result.data.iaqi.t, "v", "-");
      const pressure = _.get(result.data.iaqi.p, "v", "-");
      const humidity = _.get(result.data.iaqi.h, "v", "-");
      const wind = _.get(result.data.iaqi.w, "v", "-");

      // ----- Output section
      outputValue.innerHTML = `${aqi}`;
      outputTitle.innerHTML = `${cityAqi}`;

      // Color and text changes based on the value of aqi
      if (aqi >= 0 && aqi <= 50) {
        outputValue.style.backgroundColor = '#038C5A';
        aplLevel.innerHTML = 'Good';
        aplLevel.style.color = '#038C5A';
      } else if (aqi >= 51 && aqi <= 100) {
        outputValue.style.backgroundColor = '#F2C230';
        aplLevel.innerHTML = 'Moderate';
        aplLevel.style.color = '#F2C230';
      } else if (aqi >= 101 && aqi <= 150) {
        outputValue.style.backgroundColor = '#F28B30';
        aplLevel.innerHTML = 'Unhealthy for sensitive groups';
        aplLevel.style.color = '#F28B30';
      } else if (aqi >= 151 && aqi <= 200) {
        outputValue.style.backgroundColor = '#CC0033';
        aplLevel.innerHTML = 'Unhealthy';
        aplLevel.style.color = '#CC0033';
      } else if (aqi >= 201 && aqi <= 300) {
        outputValue.style.backgroundColor = '#55038C';
        aplLevel.innerHTML = 'Very unhealthy';
        aplLevel.style.color = '#55038C';
      } else if (aqi >= 300) {
        outputValue.style.backgroundColor = '#73022C';
        aplLevel.innerHTML = 'Hazardous';
        aplLevel.style.color = '#73022C';
      } else {
        outputValue.style.backgroundColor = '#A6A6A6';
        aplLevel.innerHTML = '-';
        aplLevel.style.color = '#A6A6A6';
      };

      // ------ Details section
      detailsList.innerHTML = `
        <li><b>PM2.5</b> ${pm25} μg/m³</li>
        <li><b>PM10</b> ${pm10} μg/m³</li>
        <li><b>O3</b> ${o3} μg/m³</li>
        <li><b>NO2</b> ${no2} μg/m³</li>
        <li><b>SO2</b> ${so2} μg/m³</li>
        <li><b>CO</b> ${co} μg/m³</li>
        <br/>
        <li><b>Temperture</b> ${temp}°C</li>
        <li><b>Pressure</b> ${pressure} g/cm²</li>
        <li><b>Humidity</b> ${humidity} %</li>
        <li><b>Wind</b> ${wind} m/s</li>
      `;

      // ----- Stations section
      const latJson = parseFloat(result.data.city.geo[0]);
      const lngJson = parseFloat(result.data.city.geo[1]);
      const latBL = latJson - 0.2;
      const lngBL = lngJson - 0.2;
      const latTR = latJson + 0.2;
      const lngTR = lngJson + 0.2;

      const axiosStations = require('axios');
      axiosStations.get(`https://api.waqi.info/map/bounds/?latlng=${latBL},${lngBL},${latTR},${lngTR}&token=${myToken}`)
        .then(function (response) {
          const resultStations = response.data; 
          
          stationsDescription.innerHTML = `${resultStations.data.length} stations in this area`;
          stationsList.innerHTML = '';
          for (let i = 0; i < resultStations.data.length; i++) {
              stationsList.innerHTML += `
                  <li>${resultStations.data[i].station.name}
                  <br/>
                  <b>aqi: ${resultStations.data[i].aqi}</b></li>
              `;
          };
        })
        .catch(function(error) {
          console.log(error);
        });
    
      // ----- Output box visualisation
      outputs.style.display = 'block';

    })  //closing then
    .catch(function() {
      alert(`Town not found. Please insert the name of another city.`);
    });
};  // closing link