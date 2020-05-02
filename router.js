const vistas = [
  {
    id: "cuenta",
    template: `
      <h1>${this.id}</h1>
    `
  },
  {
    id: "datos",
    template: `
      <h1>${this.id}</h1>
    `
  },
  {
    id: "otro",
    template: `
      <h1>${this.id}</h1>
    `
  },
]

window.addEventListener('load', () => {

  document.getElementById('cuenta').addEventListener('click', e => {
    console.log('click en cuenta ')
    let id = e.target.id;
    console.log(id);
    window.history.pushState({id}, id, `/${id}`)
  });

  document.getElementById('datos').addEventListener('click', e => {
    console.log('click en datos ')
    let id = e.target.id;
    console.log(id);
    window.history.pushState({id}, id, `/${id}`)
  });

  document.getElementById('otro').addEventListener('click', e => {
    console.log('click en otro ')
    let id = e.target.id;
    console.log(id);
    window.history.pushState({id}, id, `/${id}`)
  });
})


window.onpopstate = function(e){
  console.log(e);
  console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
}


function renderView(id){

}