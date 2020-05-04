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
  }
]

export default templates;