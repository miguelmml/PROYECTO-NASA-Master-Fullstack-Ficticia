//reglas css para las animaciones del inicio
window.addEventListener('load', function() {

  document.styleSheets[0].addRule("p.system::after","background-color: rgb(145, 255, 0);box-shadow: 0 0 20px white");
  document.styleSheets[0].addRule("p.fuel::after","width: 3rem");
  document.styleSheets[0].addRule("p.energy::after","width: 5.8rem");
  document.styleSheets[0].addRule("p.shield::after","width: 1.5rem; background-color: crimson");
  document.styleSheets[0].addRule(".content"," width: 80%; height: 30rem;padding: 2%;");
  document.styleSheets[0].addRule("body","color: rgb(114, 243, 114) ");

});
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

var firebaseConfig = {
  // falta api key
  apiKey: "AIzaSyAocTj9tvWhjdUy6EPCjAcWdLeHxCG8T2Q",
  authDomain: "proyecto-nasa-93d77.firebaseapp.com",
  databaseURL: "https://proyecto-nasa-93d77.firebaseio.com",
  projectId: "proyecto-nasa-93d77",
  storageBucket: "proyecto-nasa-93d77.appspot.com",
  messagingSenderId: "255032929039",
  appId: "1:255032929039:web:58da180b05f91282972c7a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//database
const ref = firebase.database().ref(`Users/`);


// SIGN UP
function signUp(email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    let num = email.indexOf("@");
    let id = email.slice(0,num);
    let userRef = firebase.database().ref(`Users/${id}`);
    userRef.set({email:`${email}`});
    document.getElementById('actionInfo').innerHTML = `User ${email} sign up successfully`;
  })
  .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

//LOG IN
function logIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {       
    firebase.auth().currentUser.providerData.forEach(function(profile){
      document.getElementById('actionInfo').innerHTML = `User conected successfully: ${profile.uid}`;
    });  
  })
  .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

//LOG OUT
function logOut(){
  if(firebase.auth().currentUser){
    let user = firebase.auth().currentUser.email;
    firebase.auth().signOut()
    .then(function(){
    document.getElementById('actionInfo').innerHTML = `User ${user}, disconnected`;
    document.getElementById('myData').innerHTML = "";
    })
    .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
    });
  } else {
    document.getElementById('actionInfo').innerHTML = `No users connected`;
  }
}

//DELETE
function borrarUser(){
  if(firebase.auth().currentUser){
    confirm("¿Seguro que quieres borrar tu usuario?");
    if(confirm){
      firebase.auth().currentUser.delete();
      let user = firebase.auth().currentUser.email;
      let id = user.slice(0,user.indexOf("@"));
      let element = firebase.database().ref(`Users/${id}`);
      element.remove();  
      document.getElementById('actionInfo').innerHTML = `User ${user} was deleted.`;
    }
  } else {
    document.getElementById('actionInfo').innerHTML = `No users connected`;
  }
}

//Listener para los botones de cuentas
function accountListeners(){
  document.getElementById("btnSignUp").addEventListener("click", function(){
    console.log('click en registrar');
    let name = document.getElementById("textBox").value;
    let pass = document.getElementById("passBox").value;
    if(/^[A-Za-z]+[A-Za-z0-9-_]*@\w+\.[A-Za-z]+\.*[A-Za-z]*\.*[A-Za-z]*/.test(name)){
     if(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(pass)){
        signUp(name,pass);
     } else {
      document.getElementById('actionInfo').innerHTML = `Invalid pass, the password must contain: <br>- a capital letter <br>- a small letter<br>- a number<br>- 8-16 characters<br>- NO other symbols<br>`;
     }
    } else {
      document.getElementById('actionInfo').innerHTML = `Invalid user name, use an e-mail account => example: name@demo.com`;
    }
  });

  document.getElementById("btnLogIn").addEventListener("click",function(){
    console.log('click en logear');
    let name = document.getElementById("textBox").value;
    let pass = document.getElementById("passBox").value;
    logIn(name,pass);
    });
  
  document.getElementById("btnLogOut").addEventListener("click", logOut);

  document.getElementById("btnRemove").addEventListener("click", borrarUser);

  document.getElementById("btnMyData").addEventListener('click', function() {
    if(firebase.auth().currentUser) {
      let data = firebase.auth().currentUser.providerData[0].email;
      let num = data.indexOf("@");
      let user = data.slice(0,num);
      let userFirebaseRef = firebase.database().ref(`Users/${user}`);
      var content = document.getElementById('myData');
      userFirebaseRef.on("value", snapshot => {
        if(snapshot.val().Images) {
          content.innerHTML = `<h3>Images</h3>`;
          for(let i in snapshot.val().Images){
            content.innerHTML += `<li><a href="${snapshot.val().Images[i].url}" target="_blank">${snapshot.val().Images[i].title}</a></li>`;
          }
        }
        if(snapshot.val().Near_Objects) {
          content.innerHTML += `<h3>Near Objects</h3>`;
          for(let i in snapshot.val().Near_Objects){
            content.innerHTML += `<li><a href="${snapshot.val().Near_Objects[i].url}" target="_blank">${snapshot.val().Near_Objects[i].title}</a></li>`;
          }
        }
        if(snapshot.val().Tech_Transfer) {
          content.innerHTML += `<h3>Tech Transfer</h3>`;
          for(let i in snapshot.val().Tech_Transfer){
            content.innerHTML += `<li><a href="${snapshot.val().Tech_Transfer[i].url}" target="_blank">${snapshot.val().Tech_Transfer[i].title}</a></li>`;
          }
        }
      });
    } else {
      throw new Error('No estas conectado');
    }
  });
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Bienvenido! " + user.email);
    let userName = user.email.split(/@/);
    document.getElementById("titulo").innerText = `${userName[0]}`;
  } else {
    console.log("No hay nadie en el sistema");
    document.getElementById("titulo").innerText = `disconnected`;
  }
});


//pintar lista de usuarios 
//Listener de cambios en la base de datos.
function firebaseUserList() {
  ref.on('value', (snapshot) => {
    if(window.location.pathname == "/cuenta"){
      document.getElementById("userList").innerHTML = "";
      snapshot.forEach((childSnapshot) => {
          let element = childSnapshot.val();
          document.getElementById("userList").innerHTML += `<p>${element.email}<p>`;
      });
    }
  });
}

//funcion para guardar las imagenes en firebase
 function saveImg() {
  if(firebase.auth().currentUser) {
    let imgSrc = document.getElementById('imagenNasa').src;
    let imgTitle = document.getElementById('imagenNasa').dataset.title;
    let data = firebase.auth().currentUser.providerData[0].email;
    let num = data.indexOf("@");
    let user = data.slice(0,num);
    let userFirebaseRef = firebase.database().ref(`Users/${user}/Images/${imgTitle}`);
    userFirebaseRef.set({ title: imgTitle, url: imgSrc});
  } else {
    throw new Error('No estas conectado');
  }
}


//funcion para guardar datos de objetos cercanos en firebase
function listenerNearObjectsTable() {
  document.getElementById('nearObjectTable').addEventListener('click', function(e) {
    if(firebase.auth().currentUser){
      let nearObjectTitle =  e.target.dataset.title;
      let nearObjectLink = e.target.dataset.link;
      let data = firebase.auth().currentUser.providerData[0].email;
      let num = data.indexOf("@");
      let user = data.slice(0,num);
      let userFirebaseRef = firebase.database().ref(`Users/${user}/Near_Objects/${nearObjectTitle}`);
      userFirebaseRef.set({title: nearObjectTitle, url: nearObjectLink});
    } else {
      throw new Error('No estas conectado');
    }
  });
}


//funcion para guardar patentes tecnologicas en firebase
function listenerTechTransferTable() {
  document.getElementById('techTransferTable').addEventListener('click', function(e) {
    if(firebase.auth().currentUser){
      let techTitle =  e.target.dataset.title;
      let techLink = e.target.dataset.link;
      let data = firebase.auth().currentUser.providerData[0].email;
      let num = data.indexOf("@");
      let user = data.slice(0,num);
      let userFirebaseRef = firebase.database().ref(`Users/${user}/Tech_Transfer/${techTitle}`);
      userFirebaseRef.set({title: techTitle, url: techLink});
    } else {
      throw new Error('No estas conectado');
    }
  });
}




window.addEventListener('load', () => {
  document.getElementById('cuenta').addEventListener('click', e => {
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
    accountListeners();
    firebaseUserList();
  });
  document.getElementById('datos').addEventListener('click', e => {
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
    dataButtonsListeners();
  });
});

function dataButtonsListeners() {
  document.getElementById('imagenDelDia').addEventListener('click', function(e){
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`);
    renderView(id);
    obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  });
  document.getElementById('objetosCercanos').addEventListener('click', function(e){
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`);
    renderView(id);
    objetosCercanos(`https://api.nasa.gov/neo/rest/v1/feed?&api_key=${apiKey}`);
});
  document.getElementById('transferenciaTecnologica').addEventListener('click', function(e){
    e.preventDefault();
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
    }else if(id == 'cuenta'){
      (async function (){
        await renderView(id);
        accountListeners();
        firebaseUserList();
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
      <h2>Account view</h2>
      <div class="logInWrapper">
        <h3>- Firebase authentication -</h3>      
        <input id="textBox" type="text" placeholder="Email">
        <input id="passBox" type="password" placeholder="Password">
        <button class="btnStandar" id="btnSignUp">Sign Up</button>
        <button class="btnStandar" id="btnLogIn">Log In</button>
        <button class="btnStandar" id="btnLogOut">Log Out</button>
        <button class="btnStandar" id="btnRemove">Delete</button>
        <button class="btnStandar" id="btnGitHub">GitHub</button>
        <div class="actionInfo__wrapper">
          <p id="actionInfo">Info:</p>
        </div>
      </div>
      <div class="sessionWrapper">
        <div class="sessionWrapper__userList">
          <h3>- User list -</h3>
          <div id="userList"></div>
        </div>
        <div class="sessionWrapper__userData">
          <button class="btnStandar" id="btnMyData">My data</button>
          <ul id="myData"></ul>
        </div>
      </div>
    `
  },
  {
    idTemp: "datos",
    template: `
      <h2>Data view</h2>
      <div class="dataButtons">
        <a href="./datos/objetosCercanos" class="dataButtons__a" id="objetosCercanos">Near Objects</a>
        <a href="./datos/imagenDelDia" class="dataButtons__a" id="imagenDelDia"> Astronomy Picture of the Day</a>
        <a href="./datos/transferenciaTecnologica" class="dataButtons__a" id="transferenciaTecnologica">Tech Transfer</a>
      </div>
    `
  },
  {
    idTemp: "imagenDelDia",
    template: `
      <h2>Picture of the day view</h2>
      <div class="imagenDelDia__wrapper">
        <div class="imgDayButtons">
          <input class="dateSelect" id="dateSelect" type="date">
          <button class="btnStandar" id="btnBuscar">Search</button>
          <button class="btnStandar" id="saveImg">Save in Firebase</button>
        </div>
        <figure id="imagenDelDia"></figure>
      </div>
    `
  },
  {
    idTemp: "objetosCercanos",
    template: `
      <h2>Near Objects view</h2>
      <select  class="nearObjectsSelect" id="nearObjectSelect"></select>
      <div class="wrapperChart" id="nearObjectChart">
        <canvas id="myChart"></canvas>
      </div>
      <div class="wrapperTable">
        <table id="nearObjectTable">
          <tr>
            <th>ID</th><th>Distance(Km)</th><th>Speed(Km/s)</th><th>Diameter(Km)</th><th>Potentially hazardous</th><th>Link</th><th>Firebase</th>
          </tr>
        </table>
      </div>
    `
  },
  {
    idTemp: "transferenciaTecnologica",
    template: `
      <h2>Tech transfer view</h2>
      <div class="wrapperTable">
      <table id="techTransferTable">
        <tr>
          <th>ID</th><th>Description</th><th>Type</th><th>Image</th><th>Link</th><th>Firebase</th>
        </tr>
      </table>
    </div>
    `
  }
];
