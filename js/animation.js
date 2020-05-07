//reglas css para las animaciones del inicio
window.addEventListener('load', function() {

  document.styleSheets[0].addRule("p.system::after","background-color: rgb(145, 255, 0);box-shadow: 0 0 20px white");
  document.styleSheets[0].addRule("p.fuel::after","width: 3rem");
  document.styleSheets[0].addRule("p.energy::after","width: 5.8rem");
  document.styleSheets[0].addRule("p.shield::after","width: 1.5rem; background-color: crimson");
  document.styleSheets[0].addRule(".content"," width: 80%; height: 30rem;padding: 2%;");
  document.styleSheets[0].addRule("body","color: rgb(114, 243, 114) ");

});