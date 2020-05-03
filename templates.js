 const templates = [
  {
    idTemp: "/",
    template: ""
  },
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
      <div class="dataButtons">
        <button id="imagenDelDia">Imagen del dia</button>
        <button id="objetosCercanos">Objetos cercanos</button>
        <button id="eventosNaturales">Eventos naturales</button>
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
      <h1>objetos cercanos</h1>
    `
  },
  {
    idTemp: "eventosNaturales",
    template: `
      <h1>eventos naturales</h1>
    `
  },
]

export default templates;