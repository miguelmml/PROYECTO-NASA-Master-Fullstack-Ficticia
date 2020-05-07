// //Fetch de los datos 
import myKey from './key.js';

const apiKey = myKey;

// fetch para imagen del dia
function obtenerImagen(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    let template = templates[3].template;
    document.querySelector('.content').innerHTML = template;
    if(data.media_type == "image"){
      let autor = data.copyright ? data.copyright : "";
      document.querySelector('#imagenDelDia').innerHTML = `<img class="imagenNasa" id="imagenNasa" src="${data.url}" data-title="${data.title}" alt="imagen Nasa" ><figcaption>${autor} - ${data.title}</figcaption>`;
    } else {
      document.querySelector('#imagenDelDia').innerHTML = `<p>Image not available or wrong date, try another date.</p>`;
    }
    addImageListeners();
  })
  .catch(err => console.error('Error en fetch obtenerImagen', err));
}

// para sacar la imagen de una fecha en concreto
function addImageListeners() {
  document.getElementById('btnBuscar').addEventListener('click', function(){
    let fecha = document.getElementById('dateSelect').value;
    obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fecha}`);
  });
  document.getElementById('saveImg').addEventListener('click', saveImg);
}

// fetch para objetos cercanos
var arrObjetosCercanos = [];

function objetosCercanos(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    arrObjetosCercanos = data.near_earth_objects;
    for( let i in arrObjetosCercanos){
      let option = `<option value="${i}">${i}</option>`;
      document.querySelector('#nearObjectSelect').innerHTML += option;
    }
    renderChartAndTable();
    listenersToSelect();
  })
  .catch(err => console.error('Error en fetch objetosCercanos', err));
} 

function listenersToSelect() {
  document.getElementById('nearObjectSelect').addEventListener('change', () => {
    document.getElementById("nearObjectChart").innerHTML = `<canvas id="myChart"></canvas>`;
    document.getElementById("nearObjectTable").innerHTML = `
      <tr>
      <th>ID</th><th>Distance</th><th>Speed (KM/s)</th><th>Diameter(KM)</th><th>Potentially hazardous</th><th>Link</th><th>Firebase</th>
      </tr>
    `;
    renderChartAndTable();
  });
}

function renderChartAndTable() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let dataChart = {
    type: 'bar',
    data: {
      labels: [], //IDs
      datasets: [{
        hoverBackgroundColor: "white",
        margin: "0 auto",
        barPercentage: 0.3,
        borderWidth: 4,
        label: 'Distance to earth (km): ',
        data: [], //valores de cercania
        backgroundColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 132, 1)','rgba(255, 99, 64, 1)','rgba(54, 162, 86, 1)','rgba(255, 206, 235, 1)','rgba(75, 192, 255, 1)','rgba(153, 102, 192, 1)','rgba(255, 99, 64, 1)','rgba(255, 159, 132, 1)','rgba(54, 206, 235, 1)','rgba(255, 162, 86, 1)','rgba(75, 102, 192, 1)','rgba(255, 192, 255, 1)','rgba(153, 159, 64, 1)','rgba(54, 99, 132, 1)','rgba(255, 162, 235, 1)','rgba(75, 206, 86, 1)','rgba(255, 192, 192, 1)','rgba(255, 102, 255, 1)','rgba(153, 159, 64, 1)'
        ],
      }]
    },
    options: {legend: {
      labels: {
          fontColor: "white",
          fontSize: 18
      }
      },scales: { yAxes: [ {ticks: {beginAtZero: true}}]}}
  };
  var myChart = new Chart(ctx, dataChart);

  let currentValues = arrObjetosCercanos[`${document.getElementById("nearObjectSelect").value}`];
  currentValues.forEach(element => {
    document.getElementById("nearObjectTable").innerHTML += `
      <tr>
      <td>${element.name}</td><td>${element.close_approach_data[0].miss_distance.kilometers}</td><td>${element.close_approach_data[0].relative_velocity.kilometers_per_second}</td><td>${element.estimated_diameter.kilometers.estimated_diameter_max}</td><td>${element.is_potentially_hazardous_asteroid}</td><td><a href="${element.nasa_jpl_url}" target="_blank">Read more...</a></td><td><button class="btnStandar" data-title="${element.name}" data-link="${element.nasa_jpl_url}">Save</button></td>
      </tr>
    `;
    dataChart.data.labels.push(element.name);
    dataChart.data.datasets[0].data.push(element.close_approach_data[0].miss_distance.kilometers);
  });  
  listenerNearObjectsTable();
  myChart.update(); 
}


// fetch de tech transfer
function transferenciaTecnologica(url,obj) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    data.results.forEach(element => {
      document.getElementById('techTransferTable').innerHTML += `
      <tr>
        <td>${element[4]}</td><td>${element[3]}</td><td>${element[5]}</td><td><a href="${element[10]}" target="_blank">IMG</a></td><td><a href="https://technology.nasa.gov/patent/${element[4]}" target="_blank">Read more...</a></td><td><button class="btnStandar" data-title="${element[4]}" data-link="https://technology.nasa.gov/patent/${element[4]}">Save</button></td>
      </tr>
      `;
    });
    
  })
  .then(() => listenerTechTransferTable())
  .catch(err => console.error('Error en fetch tech transfer', err));
} 