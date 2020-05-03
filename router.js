import templates from '/templates.js';

window.addEventListener('load', () => {
  document.getElementById('cuenta').addEventListener('click', e => {
    let id = e.target.id;
    window.history.pushState({id}, id, `./${id}`)
    renderView(id);
  });
  document.getElementById('datos').addEventListener('click', e => {
    let id = e.target.id;
    window.history.pushState({id}, id, `./${id}`)
    renderView(id);
    dataButtonsListeners();
  });
})

function dataButtonsListeners() {
  document.getElementById('imagenDelDia').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`)
    renderView(id);
  });
  document.getElementById('objetosCercanos').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`)
    renderView(id);
});
  document.getElementById('eventosNaturales').addEventListener('click', function(e){
    let id = e.target.id;
    window.history.pushState({id}, id, `./datos/${id}`)
    renderView(id);
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
    }
    renderView(id);
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