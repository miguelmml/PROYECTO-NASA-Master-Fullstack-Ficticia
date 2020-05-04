import templates from '/templates.js';
import {obtenerImagen, objetosCercanos, transferenciaTecnologica, apiKey} from '/js/fetch.js';

window.addEventListener('load', () => {
  document.getElementById('cuenta').addEventListener('click', e => {
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`)
    renderView(id);
  });
  document.getElementById('datos').addEventListener('click', e => {
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`)
    renderView(id);
    dataButtonsListeners();
  });
})

function dataButtonsListeners() {
  document.getElementById('imagenDelDia').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`)
    renderView(id);
    obtenerImagen(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  });
  document.getElementById('objetosCercanos').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`)
    renderView(id);
    objetosCercanos(`https://api.nasa.gov/neo/rest/v1/feed?&api_key=${apiKey}`);
});
  document.getElementById('transferenciaTecnologica').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`)
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
}

function renderView(id){
  let template;
  templates.filter(function(obj){
    if( obj.idTemp === id){
      return template = obj.template
    }
  })
  document.getElementById('content').innerHTML = template;
}


