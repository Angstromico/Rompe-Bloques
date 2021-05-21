import Juego from '/juego.js';
const canvas = document.getElementById('pantallaJuego');
let ctxt = canvas.getContext('2d');
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const gameWidth = 0.8*windowWidth;
const gameHeight = 1.2*windowHeight;
//ctxt.fillStyle = '#538dfb'
//ctxt.fillRect(300, 200, 200, 200);
const juego = new Juego(gameWidth, gameHeight);
//juego.inicio();
let tiempo = 0;
//img
//const balon = document.getElementById('balon');
function bucleGame(tiempoStamp) {
    let deltaT = tiempoStamp - tiempo;
    tiempo = tiempoStamp;
    ctxt.clearRect(0, 0, gameWidth, gameHeight);
    juego.update(deltaT);
    juego.draw(ctxt);
    requestAnimationFrame(bucleGame);
};
requestAnimationFrame(bucleGame);


