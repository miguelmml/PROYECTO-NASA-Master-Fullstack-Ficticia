 const templates = [
  {
    idTemp: "/",
    template: ""
  },
  {
    idTemp: "cuenta",
    template: `
      <h1>Vista cuenta</h1>
      <div class="logIn__wrapper">
        <h1>Autenticación con Firebase</h1>      
        <input id="textBox" type="text" placeholder="Email">
        <input id="passBox" type="password" placeholder="Password">
        <button id="btnSignUp">Sign Up</button>
        <button id="btnLogIn">Log In</button>
        <button id="btnLogOut">Log Out</button>
        <button id="btnRemove">Delete</button>
        <button id="btnGitHub">GitHub</button>
      </div>
      <div class="session__wrapper">
        <div class="actionInfo__wrapper">
          <p id="actionInfo"></p>
        </div>
        <div class="userList__wrapper">
          <h2>Lista de Usuarios</h2>
          <div id="userList"></div>
        </div>
      </div>
      <div class="dbContent__wrapper">
        <button id="myData">My data</button>
      </div>
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
      <h1>Imagen del dia</h1>
      <div class="imagenDelDia__wrapper">
        <input id="selectorFecha" type="date">
        <button id="btnBuscar">Search</button>
        <button id="saveImg">Save in Firebase</button>
        <figure id="imagenDelDia"></figure>
      </div>
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
            <th>ID</th><th>Distance(Km)</th><th>Speed(Km/s)</th><th>Diameter(Km)</th><th>Potentially hazardous</th><th>Link</th><th>Firebase</th>
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
      <table id="techTransferTable">
        <tr>
          <th>ID</th><th>Description</th><th>Type</th><th>Image</th><th>Link</th><th>Firebase</th>
        </tr>
      </table>
    </div>
    `
  }
];
