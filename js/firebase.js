
var firebaseConfig = {
  // falta api key
  apiKey: "AIzaSyAocTj9tvWhjdUy6EPCjAcWdLeHxCG8T2Q",
  authDomain: "proyecto-nasa-93d77.firebaseapp.com",
  databaseURL: "https://proyecto-nasa-93d77.firebaseio.com",
  projectId: "proyecto-nasa-93d77",
  storageBucket: "proyecto-nasa-93d77.appspot.com",
  messagingSenderId: "255032929039",
  appId: "1:255032929039:web:58da180b05f91282972c7a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//database
const ref = firebase.database().ref(`Users/`);


// SIGN UP
function signUp(email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    let num = email.indexOf("@");
    let id = email.slice(0,num);
    let userRef = firebase.database().ref(`Users/${id}`);
    userRef.set({email:`${email}`});
    document.getElementById('actionInfo').innerHTML = `User ${email} sign up successfully`;
  })
  .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

//LOG IN
function logIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {       
    firebase.auth().currentUser.providerData.forEach(function(profile){
      document.getElementById('actionInfo').innerHTML = `User conected successfully: ${profile.uid}`;
    });  
  })
  .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

//LOG OUT
function logOut(){
  if(firebase.auth().currentUser){
    let user = firebase.auth().currentUser.email;
    firebase.auth().signOut()
    .then(function(){
    document.getElementById('actionInfo').innerHTML = `User ${user}, disconnected`;
    document.getElementById('myData').innerHTML = "";
    })
    .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
    });
  } else {
    document.getElementById('actionInfo').innerHTML = `No users connected`;
  }
}

//DELETE
function borrarUser(){
  if(firebase.auth().currentUser){
    confirm("¿Seguro que quieres borrar tu usuario?");
    if(confirm){
      firebase.auth().currentUser.delete();
      let user = firebase.auth().currentUser.email;
      let id = user.slice(0,user.indexOf("@"));
      let element = firebase.database().ref(`Users/${id}`);
      element.remove();  
      document.getElementById('actionInfo').innerHTML = `User ${user} was deleted.`;
    }
  } else {
    document.getElementById('actionInfo').innerHTML = `No users connected`;
  }
}

//Listener para los botones de cuentas
function accountListeners(){
  document.getElementById("btnSignUp").addEventListener("click", function(){
    console.log('click en registrar');
    let name = document.getElementById("textBox").value;
    let pass = document.getElementById("passBox").value;
    if(/^[A-Za-z]+[A-Za-z0-9-_]*@\w+\.[A-Za-z]+\.*[A-Za-z]*\.*[A-Za-z]*/.test(name)){
     if(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(pass)){
        signUp(name,pass);
     } else {
      document.getElementById('actionInfo').innerHTML = `Invalid pass, the password must contain: <br>- a capital letter <br>- a small letter<br>- a number<br>- 8-16 characters<br>- NO other symbols<br>`;
     }
    } else {
      document.getElementById('actionInfo').innerHTML = `Invalid user name, use an e-mail account => example: name@demo.com`;
    }
  });

  document.getElementById("btnLogIn").addEventListener("click",function(){
    console.log('click en logear');
    let name = document.getElementById("textBox").value;
    let pass = document.getElementById("passBox").value;
    logIn(name,pass);
    });
  
  document.getElementById("btnLogOut").addEventListener("click", logOut);

  document.getElementById("btnRemove").addEventListener("click", borrarUser);

  document.getElementById("btnGitHub").addEventListener("click", logInWithGithub);


  document.getElementById("btnMyData").addEventListener('click', function() {
    if(firebase.auth().currentUser) {
      let data = firebase.auth().currentUser.providerData[0].email;
      let num = data.indexOf("@");
      let user = data.slice(0,num);
      let userFirebaseRef = firebase.database().ref(`Users/${user}`);
      var content = document.getElementById('myData');
      userFirebaseRef.on("value", snapshot => {
        if(snapshot.val().Images) {
          content.innerHTML = `<h3>Images</h3>`;
          for(let i in snapshot.val().Images){
            content.innerHTML += `<li><a href="${snapshot.val().Images[i].url}" target="_blank">${snapshot.val().Images[i].title}</a></li>`;
          }
        }
        if(snapshot.val().Near_Objects) {
          content.innerHTML += `<h3>Near Objects</h3>`;
          for(let i in snapshot.val().Near_Objects){
            content.innerHTML += `<li><a href="${snapshot.val().Near_Objects[i].url}" target="_blank">${snapshot.val().Near_Objects[i].title}</a></li>`;
          }
        }
        if(snapshot.val().Tech_Transfer) {
          content.innerHTML += `<h3>Tech Transfer</h3>`;
          for(let i in snapshot.val().Tech_Transfer){
            content.innerHTML += `<li><a href="${snapshot.val().Tech_Transfer[i].url}" target="_blank">${snapshot.val().Tech_Transfer[i].title}</a></li>`;
          }
        }
      });
    } else {
      throw new Error('No estas conectado');
    }
  });
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Bienvenido! " + user.email);
    let userName = user.email.split(/@/);
    document.getElementById("titulo").innerText = `${userName[0]}`;
  } else {
    console.log("No hay nadie en el sistema");
    document.getElementById("titulo").innerText = `disconnected`;
  }
});


//pintar lista de usuarios 
//Listener de cambios en la base de datos.
function firebaseUserList() {
  ref.on('value', (snapshot) => {
    if(window.location.pathname == "/cuenta"){
      document.getElementById("userList").innerHTML = "";
      snapshot.forEach((childSnapshot) => {
          let element = childSnapshot.val();
          document.getElementById("userList").innerHTML += `<p>${element.email}<p>`;
      });
    }
  });
}

//funcion para guardar las imagenes en firebase
 function saveImg() {
  if(firebase.auth().currentUser) {
    let imgSrc = document.getElementById('imagenNasa').src;
    let imgTitle = document.getElementById('imagenNasa').dataset.title;
    let data = firebase.auth().currentUser.providerData[0].email;
    let num = data.indexOf("@");
    let user = data.slice(0,num);
    let userFirebaseRef = firebase.database().ref(`Users/${user}/Images/${imgTitle}`);
    userFirebaseRef.set({ title: imgTitle, url: imgSrc});
  } else {
    throw new Error('No estas conectado');
  }
}


//funcion para guardar datos de objetos cercanos en firebase
function listenerNearObjectsTable() {
  document.getElementById('nearObjectTable').addEventListener('click', function(e) {
    if(firebase.auth().currentUser){
      let nearObjectTitle =  e.target.dataset.title;
      let nearObjectLink = e.target.dataset.link;
      let data = firebase.auth().currentUser.providerData[0].email;
      let num = data.indexOf("@");
      let user = data.slice(0,num);
      let userFirebaseRef = firebase.database().ref(`Users/${user}/Near_Objects/${nearObjectTitle}`);
      userFirebaseRef.set({title: nearObjectTitle, url: nearObjectLink});
    } else {
      throw new Error('No estas conectado');
    }
  });
}


//funcion para guardar patentes tecnologicas en firebase
function listenerTechTransferTable() {
  document.getElementById('techTransferTable').addEventListener('click', function(e) {
    if(firebase.auth().currentUser){
      let techTitle =  e.target.dataset.title;
      let techLink = e.target.dataset.link;
      let data = firebase.auth().currentUser.providerData[0].email;
      let num = data.indexOf("@");
      let user = data.slice(0,num);
      let userFirebaseRef = firebase.database().ref(`Users/${user}/Tech_Transfer/${techTitle}`);
      userFirebaseRef.set({title: techTitle, url: techLink});
    } else {
      throw new Error('No estas conectado');
    }
  });
}




//Registro via GitHub.
function logInWithGithub(){
  let provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    var token = result.credential.accessToken;
    var user = result.user;
    // let email = result.user.providerData[0].email;
    // let id = email.slice(0,email.indexOf("@"));
    // let userRef = firebase.database().ref(`Usuarios/${id}`);
    // userRef.set({User:`${email}`, Img:`${result.user.providerData[0].photoURL}`});
  }).catch((error) => {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}