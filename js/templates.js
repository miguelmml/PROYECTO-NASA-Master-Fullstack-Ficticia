 const templates = [
  {
    idTemp: "/",
    template: ""
  },
  {
    idTemp: "cuenta",
    template: `
      <h2>Account view</h2>
      <div class="logInWrapper">
        <h3>- Firebase authentication -</h3>      
        <input id="textBox" type="text" placeholder="Email">
        <input id="passBox" type="password" placeholder="Password">
        <button class="btnStandar" id="btnSignUp">Sign Up</button>
        <button class="btnStandar" id="btnLogIn">Log In</button>
        <button class="btnStandar" id="btnLogOut">Log Out</button>
        <button class="btnStandar" id="btnRemove">Delete</button>
        <button class="btnStandar" id="btnGitHub">GitHub</button>
        <div class="actionInfo__wrapper">
          <p id="actionInfo">Info:</p>
        </div>
      </div>
      <div class="sessionWrapper">
        <div class="sessionWrapper__userList">
          <h3>- User list -</h3>
          <div id="userList"></div>
        </div>
        <div class="sessionWrapper__userData">
          <button class="btnStandar" id="btnMyData">My data</button>
          <ul id="myData"></ul>
        </div>
      </div>
    `
  },
  {
    idTemp: "datos",
    template: `
      <h2>Data view</h2>
      <div class="dataButtons">
        <a href="./datos/objetosCercanos" class="dataButtons__a" id="objetosCercanos">Near Objects</a>
        <a href="./datos/imagenDelDia" class="dataButtons__a" id="imagenDelDia"> Astronomy Picture of the Day</a>
        <a href="./datos/transferenciaTecnologica" class="dataButtons__a" id="transferenciaTecnologica">Tech Transfer</a>
      </div>
    `
  },
  {
    idTemp: "imagenDelDia",
    template: `
      <h2>Picture of the day view</h2>
      <div class="imagenDelDia__wrapper">
        <input id="selectorFecha" type="date">
        <button class="btnStandar" id="btnBuscar">Search</button>
        <button class="btnStandar" id="saveImg">Save in Firebase</button>
        <figure id="imagenDelDia"></figure>
      </div>
    `
  },
  {
    idTemp: "objetosCercanos",
    template: `
      <h2>Near Objects view</h2>
      <select  class="nearObjectsSelect" id="nearObjectSelect"></select>
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
      <h2>Tech transfer view</h2>
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
