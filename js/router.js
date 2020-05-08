//FRONT END ROUTER
//Listeners para los enlaces del menu
window.addEventListener('load', () => {
  document.getElementById('account').addEventListener('click', e => {
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
    accountListeners();
    firebaseUserList();
  });
  document.getElementById('data').addEventListener('click', e => {
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `/${id}`);
    renderView(id);
    dataButtonsListeners();
  });
});

//Listener para los botones de la seccion de datos
function dataButtonsListeners() {
  document.getElementById('pictureOfTheDay').addEventListener('click', function(e){
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `./data/${id}`);
    renderView(id);
    getImage(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  });
  document.getElementById('nearObjects').addEventListener('click', function(e){
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `./data/${id}`);
    renderView(id);
    getNearObjects(`https://api.nasa.gov/neo/rest/v1/feed?&api_key=${apiKey}`);
});
  document.getElementById('techTransfer').addEventListener('click', function(e){
    e.preventDefault();
    let id = e.target.id;
    window.history.pushState({id}, id, `./data/${id}`);
    renderView(id);
    getTechTransfer(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`);
  });
}

//Listener para el cambio de estado en historial con los botones atras y adelante
window.onpopstate = function(e){
  if(e.state){
    let id = e.state.id;
    if(id == 'data'){
      (async function (){
        await renderView(id);
        dataButtonsListeners();
      })();
    } else if(id == 'pictureOfTheDay'){
      (async function (){
        await renderView(id);
        getImage(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
      })();
    } else if(id == 'nearObjects'){
      (async function (){
        await renderView(id);
        getNearObjects(`https://api.nasa.gov/neo/rest/v1/feed?&api_key=${apiKey}`);
      })();
    } else if(id == 'techTransfer'){
      (async function (){
        await renderView(id);
        getTechTransfer(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${apiKey}`);
      })();
    }else if(id == 'account'){
      (async function (){
        await renderView(id);
        accountListeners();
        firebaseUserList();
      })();
    } 
  }else{
    renderView('/');
  }
};

//Funcion para renderizar la vista de la ruta tomando la plantilla adecuada
function renderView(id){
  let template;
  templates.filter(function(obj){
    if( obj.idTemp === id){
      template = obj.template;
    }
  });
  document.getElementById('content').innerHTML = template;
}

//Listener de cambios en la base de datos y pintar la lista de usuarios registrados
//Es llamada en router.js
function firebaseUserList() {
  ref.on('value', (snapshot) => {
    if(window.location.pathname == "/account"){
      document.getElementById("userList").innerHTML = "";
      snapshot.forEach((childSnapshot) => {
          let element = childSnapshot.val();
          document.getElementById("userList").innerHTML += `<p>${element.email}<p>`;
      });
    }
  });
}