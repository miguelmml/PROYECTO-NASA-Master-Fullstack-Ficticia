//FIREBASE DATABASE & AUTHENTICATION
//Configuracion
var firebaseConfig = {
  apiKey: "AIzaSyAocTj9tvWhjdUy6EPCjAcWdLeHxCG8T2Q",
  authDomain: "proyecto-nasa-93d77.firebaseapp.com",
  databaseURL: "https://proyecto-nasa-93d77.firebaseio.com",
  projectId: "proyecto-nasa-93d77",
  storageBucket: "proyecto-nasa-93d77.appspot.com",
  messagingSenderId: "255032929039",
  appId: "1:255032929039:web:58da180b05f91282972c7a"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Referncia al database
const ref = firebase.database().ref(`Users/`);

//Funcion SIGN UP
function signUp(email,password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    let id = email.split(/@/);
    let userRef = firebase.database().ref(`Users/${id[0]}`);
    userRef.set({email:`${email}`});
    document.getElementById('actionInfo').innerHTML = `User ${email} sign up successfully`;
  })
  .catch(function(error) {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

//Funcion LOG IN
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
  if(firebase.auth().currentUser) {
    let user = firebase.auth().currentUser.email;
    firebase.auth().signOut()
    .then(function(){
      document.getElementById('actionInfo').innerHTML = `User ${user}, disconnected`;
      document.getElementById('myData').innerHTML = "";
    })
    .catch(function(error) {
      document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
    });
  }else {
    document.getElementById('actionInfo').innerHTML = `user not connected`;
  }
}

//DELETE
function deleteUser(){
  if(firebase.auth().currentUser){
    confirm("Are you sure to delete your user?");
    if(confirm){
      firebase.auth().currentUser.delete();
      let id = firebase.auth().currentUser.email.split(/@/);
      let element = firebase.database().ref(`Users/${id[0]}`);
      element.remove();  
      document.getElementById('actionInfo').innerHTML = `User ${id[0]} was deleted.`;
    }
  } else {
    document.getElementById('actionInfo').innerHTML = `user not connected`;
  }
}

//LOGIN con GitHub.
function logInWithGithub(){
  let provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    let token = result.credential.accessToken;
    let emailUser = result.user.email;
    let user = emailUser.split(/@/);
    let userRef = firebase.database().ref(`Users/${user[0]}`);
    userRef.set({email:`${emailUser}`});
    document.getElementById('actionInfo').innerHTML = `User ${emailUser} sign up successfully`;
  }).catch((error) => {
    document.getElementById('actionInfo').innerHTML = `ERROR: ${error.code}  ${error.message}`;
  });
}

//Listener para los botones de la seccion account
function accountListeners(){
  //Listener para Sign up
  document.getElementById("btnSignUp").addEventListener("click", function(){
    let name = document.getElementById("textBox").value;
    let pass = document.getElementById("passBox").value;
    if(/^[A-Za-z]+[A-Za-z0-9-_]*@\w+\.[A-Za-z]+\.*[A-Za-z]*\.*[A-Za-z]*/.test(name)){
     if(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(pass)){
        signUp(name,pass);
     } else {
      document.getElementById('actionInfo').innerHTML = `Invalid pass, the password must contain: <br>- a capital letter <br>- a small letter<br>- a number<br>- 8-16 characters<br>- NO other symbols<br>`;
     }
    } else {
      document.getElementById('actionInfo').innerHTML = `Invalid user name, use an e-mail account => example: name@foo.com`;
    }
  });

  //Listener para logIn
  document.getElementById("btnLogIn").addEventListener("click",function(){
    let name = document.getElementById("textBox").value;
    let pass = document.getElementById("passBox").value;
    logIn(name,pass);
    });
  //Listener para logOut
  document.getElementById("btnLogOut").addEventListener("click", logOut);
  //Listener para delete
  document.getElementById("btnRemove").addEventListener("click", deleteUser);
  //Listener para logIn with github
  document.getElementById("btnGitHub").addEventListener("click", logInWithGithub);
  //Listener para obtener los datos guardados por el usuario
  document.getElementById("btnMyData").addEventListener('click', renderUserData);
}

//Listener para deteccion de usuario conectado
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    let userName = user.email.split(/@/);
    document.getElementById("titulo").innerText = `${userName[0]}`;
    document.styleSheets[0].addRule(".title__wrapper::after","background-color: rgb(145, 255, 0);box-shadow: 0 0 20px white");
  } else {
    document.getElementById("titulo").innerText = `disconnected`;
    document.styleSheets[0].addRule(".title__wrapper::after","background-color: crimson; box-shadow: none");
  }
});

//Funcion para renderizar los datos de usuario guardados en firebase
function renderUserData() {
  if(firebase.auth().currentUser) {
    let user = firebase.auth().currentUser.providerData[0].email.split(/@/);
    let userFirebaseRef = firebase.database().ref(`Users/${user[0]}`);
    var content = document.getElementById('myData');

    userFirebaseRef.on("value", snapshot => {
      if(snapshot.val().Images) {
        content.innerHTML = `<h3>-Images-</h3>`;
        for(let i in snapshot.val().Images){
          content.innerHTML += `<li><a href="${snapshot.val().Images[i].url}" target="_blank">${snapshot.val().Images[i].title}</a><button class="btnDelete" data-section="Images" data-title="${snapshot.val().Images[i].title}">✖</button></li>`;
        }
      }
      if(snapshot.val().Near_Objects) {
        content.innerHTML += `<h3>-Near Objects-</h3>`;
        for(let i in snapshot.val().Near_Objects){
          content.innerHTML += `<li><a href="${snapshot.val().Near_Objects[i].url}" target="_blank">${snapshot.val().Near_Objects[i].title}</a><button class="btnDelete" data-section="Near_Objects" data-title="${snapshot.val().Near_Objects[i].title}">✖</button></li>`;
        }
      }
      if(snapshot.val().Tech_Transfer) {
        content.innerHTML += `<h3>-Tech Transfer-</h3>`;
        for(let i in snapshot.val().Tech_Transfer){
          content.innerHTML += `<li><a href="${snapshot.val().Tech_Transfer[i].url}" target="_blank">${snapshot.val().Tech_Transfer[i].title}</a><button class="btnDelete" data-section="Tech_Transfer" data-title="${snapshot.val().Tech_Transfer[i].title}">✖</button></li>`;
        }
      }
    });
    listenerUserDataButtons();
  } else {
    throw new Error('user not connected');
  } 
}
//Listener para los botones de borrar datos guardados por el usuario en firebase
function listenerUserDataButtons() {
  document.getElementById('myData').addEventListener('click', function(e) {
    if(firebase.auth().currentUser){
      let title =  e.target.dataset.title;
      let section = e.target.dataset.section;
      let user = firebase.auth().currentUser.providerData[0].email.split(/@/);
      let element = firebase.database().ref(`Users/${user[0]}/${section}/${title}`);
      element.remove();
    } else {
      throw new Error('user not connected');
    }
  });
}


