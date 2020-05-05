// var firebaseConfig = {
//   apiKey: "AIzaSyAocTj9tvWhjdUy6EPCjAcWdLeHxCG8T2Q",
//   authDomain: "proyecto-nasa-93d77.firebaseapp.com",
//   databaseURL: "https://proyecto-nasa-93d77.firebaseio.com",
//   projectId: "proyecto-nasa-93d77",
//   storageBucket: "proyecto-nasa-93d77.appspot.com",
//   messagingSenderId: "255032929039",
//   appId: "1:255032929039:web:58da180b05f91282972c7a"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);



// // SIGN UP
// function signUp(email,password){
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then(res => {
//     let num = email.indexOf("@");
//     let id = email.slice(0,num);
//   // let userRef = firebase.database().ref(`Usuarios/${id}`);
//   // userRef.set({User:`${email}`});
//   // console.log(`Agregado usuario ${email} a Realtime Database`);
//   })
//   .catch(function(error) {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode);
//     console.log(errorMessage);
//   });
// };
// //Listener para el boton de "REGISTRARSE".
// document.getElementById("btnSignUp").addEventListener("click",function(){
//   let name = document.getElementById("textBox").value;
//   let pass = document.getElementById("passBox").value;
//   signUp(name,pass);
// });

