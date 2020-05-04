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
      <h1>Objetos Cercanos</h1>
      <select  id="nearObjectSelect"></select>
      <div id="nearObjectChart">
        <canvas id="myChart"></canvas>
      </div>
      <div class="wrapperTable">
        <table id="nearObjectTable">
          <tr>
            <th>ID</th><th>Distance</th><th>Speed (KM/s)</th><th>Diameter(KM)</th><th>Potentially hazardous</th><th>Link</th>
          </tr>
        </table>
      </div>
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