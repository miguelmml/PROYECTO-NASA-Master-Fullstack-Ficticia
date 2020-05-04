//Fetch de los datos
import myKey from '/js/key.js'

const apiKey = myKey;

// fetch para imagen del dia
function obtenerImagen(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let autor = data.copyright ? data.copyright : "";
    document.querySelector('.content').innerHTML = `
      <div class="imagenDelDia__wrapper">
        <input id="selectorFecha" type="date">
        <button id="btnImagenDelDia">Buscar</button>
        <figure id="imagenDelDia">
          <img src="${data.hdurl}" alt="imagen Nasa" style="width:100%">
          <figcaption>${autor} - ${data.title}</figcaption>
        </figure>
      </div>
    `
    addImageListener();
  })
  .catch(err => console.error('Error en fetch obtenerImagen', err))
}
// para primer fetch de imagen (saca la del dia)
// obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

// para sacar la imagen de una fecha en concreto
function addImageListener() {
  document.getElementById('btnImagenDelDia').addEventListener('click', function(){
    let fecha = document.getElementById('selectorFecha').value;
    console.log(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fecha}`)
    obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fecha}`)
  });
}



// fetch para objetos cercanos
var arrObjetosCercanos = [];

function objetosCercanos(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    arrObjetosCercanos = data.near_earth_objects;
    console.log("AQUI:",arrObjetosCercanos)
    for( let i in arrObjetosCercanos){
      let option = `<option value="${i}">${i}</option>`
      document.querySelector('#nearObjectSelect').innerHTML += option;
    }


    renderChart();
    listenerToSelect();


  })
  .catch(err => console.error('Error en fetch objetosCercanos', err))
} 
//                    // cambiar fecha a que siempre sea fecha actual  ⬇⬇⬇⬇
// objetosCercanos(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-04-29&api_key=${apiKey}`);

function listenerToSelect() {
  document.getElementById('nearObjectSelect').addEventListener('change', (e) => {
    document.getElementById("nearObjectChart").innerHTML = `<canvas id="myChart"></canvas>`;
    document.getElementById("nearObjectTable").innerHTML = `<tr>
    <th>ID</th><th>Distance</th><th>Speed (KM/s)</th><th>Diameter(KM)</th><th>Potentially hazardous</th><th>Link</th>
    </tr>`;
    renderChart();
  })
}

function renderChart() {

  let date = document.getElementById("nearObjectSelect").value;

  let currentValues = arrObjetosCercanos[`${date}`];

  console.log(currentValues)
  
  
  let ctx = document.getElementById('myChart').getContext('2d');
  let dataChart = {
      type: 'bar',
      data: {
          labels: [], //IDs
          datasets: [{
              barPercentage: 0.1,
              borderWidth: 4,
              label: 'Distance to earth: ',
              data: [], //valores de cercania
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 132, 1)',
                  'rgba(255, 99, 64, 1)',
                  'rgba(54, 162, 86, 1)',
                  'rgba(255, 206, 235, 1)',
                  'rgba(75, 192, 255, 1)',
                  'rgba(153, 102, 192, 1)',
                  'rgba(255, 99, 64, 1)',
                  'rgba(255, 159, 132, 1)',
                  'rgba(54, 206, 235, 1)',
                  'rgba(255, 162, 86, 1)',
                  'rgba(75, 102, 192, 1)',
                  'rgba(255, 192, 255, 1)',
                  'rgba(153, 159, 64, 1)',
                  'rgba(54, 99, 132, 1)',
                  'rgba(255, 162, 235, 1)',
                  'rgba(75, 206, 86, 1)',
                  'rgba(255, 192, 192, 1)',
                  'rgba(255, 102, 255, 1)',
                  'rgba(153, 159, 64, 1)'
              ],
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  }
  var myChart = new Chart(ctx, dataChart);
  currentValues.forEach(element => {
    document.getElementById("nearObjectTable").innerHTML += `
      <tr>
      <td>${element.name}</td><td>${element.close_approach_data[0].miss_distance.kilometers}</td><td>${element.close_approach_data[0].relative_velocity.kilometers_per_second}</td><td>${element.estimated_diameter.kilometers.estimated_diameter_max}</td><td>${element.is_potentially_hazardous_asteroid}</td><td><a href="${element.nasa_jpl_url}" target="_blank">Read more...</a></td>
      </tr>
    `
    dataChart.data.labels.push(element.name);
    dataChart.data.datasets[0].data.push(element.close_approach_data[0].miss_distance.kilometers);
  });  
}


// fetch de eventos naturales
function eventosNaturales(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  
  })
  .catch(err => console.error('Error en fetch eventos naturales', err))
} 
// eventosNaturales('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?days=10');




export {obtenerImagen, objetosCercanos, eventosNaturales, apiKey, arrObjetosCercanos};