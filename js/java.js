import Juego from './juego.js';
const canvas = document.getElementById('pantallaJuego');
let ctxt = canvas.getContext('2d');

// Ajustar el tamaño del canvas al tamaño del contenedor responsivo
const container = document.getElementById('game-container');
const gameWidth = container.clientWidth;
const gameHeight = container.clientHeight;

canvas.width = gameWidth;
canvas.height = gameHeight;

const juego = new Juego(gameWidth, gameHeight);
let tiempo = 0;

function bucleGame(tiempoStamp) {
    let deltaT = tiempoStamp - tiempo;
    tiempo = tiempoStamp;
    ctxt.clearRect(0, 0, gameWidth, gameHeight);
    juego.update(deltaT);
    juego.draw(ctxt);
    requestAnimationFrame(bucleGame);
};
requestAnimationFrame(bucleGame);


