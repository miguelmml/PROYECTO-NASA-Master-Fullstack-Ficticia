
const templates = [
  {
    idTemp: "cuenta",
    template: `
      <h1>Vista cuenta</h1>
    `
  },
  {
    idTemp: "datos",
    template: `
      <h1>Vista datos</h1>
    `
  },
  {
    idTemp: "otro",
    template: `
      <h1>Vista otro</h1>
    `
  },
]

window.addEventListener('load', () => {

  document.getElementById('cuenta').addEventListener('click', e => {
    console.log('click en cuenta ')
    let id = e.target.id;
    console.log(id);
    window.history.pushState({id}, id, `/${id}`)

    renderView(id);
  });

  document.getElementById('datos').addEventListener('click', e => {
    console.log('click en datos ')
    let id = e.target.id;
    console.log(id);
    window.history.pushState({id}, id, `/${id}`)

    renderView(id);
  });

  document.getElementById('otro').addEventListener('click', e => {
    console.log('click en otro ')
    let id = e.target.id;
    console.log(id);
    window.history.pushState({id}, id, `/${id}`)

    renderView(id);
  });
})


window.onpopstate = function(e){
  console.log(e);
  console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
  let id = e.state.id;
  renderView(id);
}


window.addEventListener('beforeunload', (e) => {
  console.log("reload", e.cancelable)
  e.preventDefault();
  e.stopPropagation();
  console.log('evento reload detenido')
})



function renderView(id){
   let template;

  templates.filter(function(obj){
    if( obj.idTemp === id){
      return template = obj.template
    }
  })

  console.log(template);

  document.getElementById('content').innerHTML = template;
}