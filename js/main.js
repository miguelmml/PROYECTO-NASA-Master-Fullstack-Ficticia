//Fetch de los datos

const apiKey = myKey;

// fetch para imagen del dia
// function obtenerImagen(url) {
//   fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//     let autor = data.copyright ? data.copyright : "";
//     document.querySelector('.content').innerHTML = `
//       <div class="imagenDelDia__wrapper">
//         <input id="selectorFecha" type="date">
//         <button id="btnImagenDelDia">Buscar</button>
//         <figure id="imagenDelDia">
//           <img src="${data.hdurl}" alt="imagen Nasa" style="width:100%">
//           <figcaption>${autor} - ${data.title}</figcaption>
//         </figure>
//       </div>
//     `
//     addImageListenerd();
//   })
//   .catch(err => console.error('Error en fetch obtenerImagen', err))
// }
// // para primer fetch de imagen (saca la del dia)
// obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

// // para sacar la imagen de una fecha en concreto
// function addImageListenerd() {
//   document.getElementById('btnImagenDelDia').addEventListener('click', function(){
//     let fecha = document.getElementById('selectorFecha').value;
//     console.log(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fecha}`)
//     obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${fecha}`)
//   });
// }

// fetch para objetos cercanos
// function objetosCercanos(url) {
//   fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
  
//   })
//   .catch(err => console.error('Error en fetch objetosCercanos', err))
// } 
//                    // cambiar fecha a que siempre sea fecha actual  ⬇⬇⬇⬇
// objetosCercanos(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-04-29&api_key=${apiKey}`);



// // fetch para tech trasnfer  ****CORS*****
// function transferenciaTecnologias(url) {
//   fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
  
//   })
//   .catch(err => console.error('Error en fetch transferencia tecnologias', err))
// } 
// transferenciaTecnologias(`https://api.nasa.gov/techtransfer/patent/?software&api_key=${apiKey}`);


// fetch de eventos naturales
// function eventosNaturales(url) {
//   fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
  
//   })
//   .catch(err => console.error('Error en fetch eventos naturales', err))
// } 
// eventosNaturales('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?days=10');





