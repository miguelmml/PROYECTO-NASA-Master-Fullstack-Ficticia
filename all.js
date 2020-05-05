// //Fetch de los datos 
import myKey from './key.js';

const apiKey = myKey;

// fetch para imagen del dia
function obtenerImagen(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    let template = templates[6].template;
    document.querySelector('.content').innerHTML = template;
    if(data.media_type == "image"){
      let autor = data.copyright ? data.copyright : "";
      document.querySelector('#imagenDelDia').innerHTML = `<img class="imagenNasa" src="${data.url}" alt="imagen Nasa" ><figcaption>${autor} - ${data.title}</figcaption>`;
    } else {
      document.querySelector('#imagenDelDia').innerHTML = `<p>Imagen no disponible, pruebe con otro dia.</p>`;
    }
    addImageListener();
  })
  .catch(err => console.error('Error en fetch obtenerImagen', err));
}

// para sacar la imagen de una fecha en concreto
function addImageListener() {
  document.getElementById('btnBuscar').addEventListener('click', function(){
    let fecha = document.getElementById('selectorFecha').value;
    obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fecha}`);
  });
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
    renderChart();
    listenersToSelect();
  })
  .catch(err => console.error('Error en fetch objetosCercanos', err));
} 

function listenersToSelect() {
  document.getElementById('nearObjectSelect').addEventListener('change', () => {
    document.getElementById("nearObjectChart").innerHTML = `<canvas id="myChart"></canvas>`;
    document.getElementById("nearObjectTable").innerHTML = `
      <tr>
      <th>ID</th><th>Distance</th><th>Speed (KM/s)</th><th>Diameter(KM)</th><th>Potentially hazardous</th><th>Link</th>
      </tr>
    `;
    renderChart();
  });
}

function renderChart() {
  let currentValues = arrObjetosCercanos[`${document.getElementById("nearObjectSelect").value}`];
  let ctx = document.getElementById('myChart').getContext('2d');
  let dataChart = {
  type: 'bar',
  data: {
    labels: [], //IDs
    datasets: [{
      margin: "0 auto",
      barPercentage: 0.3,
      borderWidth: 4,
      label: 'Distance to earth(km): ',
      data: [], //valores de cercania
      backgroundColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 132, 1)','rgba(255, 99, 64, 1)','rgba(54, 162, 86, 1)','rgba(255, 206, 235, 1)','rgba(75, 192, 255, 1)','rgba(153, 102, 192, 1)','rgba(255, 99, 64, 1)','rgba(255, 159, 132, 1)','rgba(54, 206, 235, 1)','rgba(255, 162, 86, 1)','rgba(75, 102, 192, 1)','rgba(255, 192, 255, 1)','rgba(153, 159, 64, 1)','rgba(54, 99, 132, 1)','rgba(255, 162, 235, 1)','rgba(75, 206, 86, 1)','rgba(255, 192, 192, 1)','rgba(255, 102, 255, 1)','rgba(153, 159, 64, 1)'
      ],
    }]
  },
  options: {scales: { yAxes: [ {ticks: {beginAtZero: true}}]}
  }
};
  var myChart = new Chart(ctx, dataChart);
  currentValues.forEach(element => {
    document.getElementById("nearObjectTable").innerHTML += `
      <tr>
      <td>${element.name}</td><td>${element.close_approach_data[0].miss_distance.kilometers}</td><td>${element.close_approach_data[0].relative_velocity.kilometers_per_second}</td><td>${element.estimated_diameter.kilometers.estimated_diameter_max}</td><td>${element.is_potentially_hazardous_asteroid}</td><td><a href="${element.nasa_jpl_url}" target="_blank">Read more...</a></td>
      </tr>
    `;
    dataChart.data.labels.push(element.name);
    dataChart.data.datasets[0].data.push(element.close_approach_data[0].miss_distance.kilometers);
  });  
  myChart.update(); 
}

// fetch de tech transfer
function transferenciaTecnologica(url,obj) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    data.results.forEach(element => {
      document.getElementById('techTrasferTable').innerHTML += `
      <tr>
        <td>${element[4]}</td><td>${element[3]}</td><td>${element[5]}</td><td><a href="${element[10]}" target="_blank">IMG</a></td><td><a href="https://technology.nasa.gov/patent/${element[4]}" target="_blank">Read more...</a></td>
      </tr>
      `;
    });
  })
  .catch(err => console.error('Error en fetch tech transfer', err));
} 
// var firebaseConfig = {
//   apiKey: "AIzaSyAocTj9tvWhjdUy6EPCjAcWdLeHxCG8T2Q",
//   authDomain: "proyecto-nasa-93d77.firebaseapp.com",
//   databaseURL: "https://proyecto-nasa-93d77.firebaseio.com",
//   projectId: "proyecto-nasa-93d77",
//   storageBucket: "proyecto-nasa-93d77.appspot.com",
//   messagingSenderId: "255032929039",
//   appId: "1:255032929039:web:58da180b05f91282972c7a"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);



// // SIGN UP
// function signUp(email,password){
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then(res => {
//     let num = email.indexOf("@");
//     let id = email.slice(0,num);
//   // let userRef = firebase.database().ref(`Usuarios/${id}`);
//   // userRef.set({User:`${email}`});
//   // console.log(`Agregado usuario ${email} a Realtime Database`);
//   })
//   .catch(function(error) {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode);
//     console.log(errorMessage);
//   });
// };
// //Listener para el boton de "REGISTRARSE".
// document.getElementById("btnSignUp").addEventListener("click",function(){
//   let name = document.getElementById("textBox").value;
//   let pass = document.getElementById("passBox").value;
//   signUp(name,pass);
// });




window.addEventListener('load', () => {
  document.getElementById('cuenta').addEventListener('click', e => {
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
  });
  document.getElementById('datos').addEventListener('click', e => {
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
    dataButtonsListeners();
  });
});

function dataButtonsListeners() {
  document.getElementById('imagenDelDia').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`);
    renderView(id);
    obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  });
  document.getElementById('objetosCercanos').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`);
    renderView(id);
    objetosCercanos(`https://api.nasa.gov/neo/rest/v1/feed?&api_key=${apiKey}`);
});
  document.getElementById('transferenciaTecnologica').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`);
    renderView(id);
    transferenciaTecnologica(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`);
  });
}

window.onpopstate = function(e){
  if(e.state){
    let id = e.state.id;
    if(id == 'datos'){
      (async function (){
        await renderView(id);
        dataButtonsListeners();
      })();
    } else if(id == 'imagenDelDia'){
      (async function (){
        await renderView(id);
        obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
      })();
    } else if(id == 'objetosCercanos'){
      (async function (){
        await renderView(id);
        objetosCercanos(`https://api.nasa.gov/neo/rest/v1/feed?&api_key=${apiKey}`);
      })();
    } else if(id == 'transferenciaTecnologica'){
      (async function (){
        await renderView(id);
        transferenciaTecnologica(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`);
      })();
    } else {
      renderView(id);
    }
  }else{
    renderView('/');
  }
};

function renderView(id){
  let template;
  templates.filter(function(obj){
    if( obj.idTemp === id){
      template = obj.template;
    }
  });
  document.getElementById('content').innerHTML = template;
}
/********SERVICE WORKER********/
// if('serviceWorker' in navigator){
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('./sw.js', {scope: './'})
//     .then(() => console.log('Service Worker registrado'))
//     .catch((err) => console.error('Error en registro de SW: ', err))
//   })
// }else {
//   console.warn('Service Worker no soportado por el navegador.')
// }

// var CACHE_NAME = 'nasa-app-cache';
// var urlsToCache = [
//   '/index.html',
//   '/css/styles.css',
//   '/js/main.js'
// ];

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// // self.addEventListener('fetch', function(event) {
// //   console.log('fetch a : ', event)
// //   event.respondWith(
// //     caches.match(event.request)
// //       .then(function(response) {
// //         if (response) {
// //           console.log('encontrado: ',response)
// //           return response;
// //         }
// //         console.log('no encontrado')
// //         return fetch(event.request);
// //       }
// //     )
// //   );
// // });
 const templates = [
  {
    idTemp: "/",
    template: ""
  },
  {
    idTemp: "cuenta",
    template: `
      <h1>Vista cuenta</h1>
      <div class="logIn__wrapper">
        <h1>Autenticación con Firebase</h1>      
        <input id="textBox" type="text" placeholder="Email">
        <input id="passBox" type="password" placeholder="Password">
        <button id="btnSignUp">Sign Up</button>
        <button id="btnLogIn">Log In</button>
        <button id="btnLogOut">Log Out</button>
        <button id="btnRemove">Delete</button>
        <button id="btnGitHub">GitHub</button>
      </div>
      <div class="session__wrapper">
        <div class="actionInfo__wrapper">
          <p id="actionInfo"></p>
        </div>
        <div class="userList__wrapper">
          <h2>Lista de Usuarios</h2>
          <div id="userList"></div>
        </div>
      </div>
    `
  },
  {
    idTemp: "datos",
    template: `
      <h1>Vista datos</h1>
      <div class="dataButtons">
        <button id="imagenDelDia">Imagen del dia</button>
        <button id="objetosCercanos">Objetos cercanos</button>
        <button id="transferenciaTecnologica">Transferencia Tecnologica</button>
      </div>
    `
  },
  {
    idTemp: "imagenDelDia",
    template: `
      <h1>imagen del dia</h1>
    `
  },
  {
    idTemp: "objetosCercanos",
    template: `
      <h1>Objetos Cercanos</h1>
      <select  id="nearObjectSelect"></select>
      <div class="wrapperChart" id="nearObjectChart">
        <canvas id="myChart"></canvas>
      </div>
      <div class="wrapperTable">
        <table id="nearObjectTable">
          <tr>
            <th>ID</th><th>Distance(Km)</th><th>Speed(Km/s)</th><th>Diameter(Km)</th><th>Potentially hazardous</th><th>Link</th>
          </tr>
        </table>
      </div>
    `
  },
  {
    idTemp: "transferenciaTecnologica",
    template: `
      <h1>Transferencia Tecnologica</h1>
      <div class="wrapperTable">
      <table id="techTrasferTable">
        <tr>
          <th>ID</th><th>Description</th><th>Type</th><th>Image</th><th>Link</th>
        </tr>
      </table>
    </div>
    `
  },
  {
    idTemp: "obtenerImagen",
    template: `
    <div class="imagenDelDia__wrapper">
      <input id="selectorFecha" type="date">
      <button id="btnBuscar">Buscar</button>
      <figure id="imagenDelDia"></figure>
    </div>
  `
  },
];
