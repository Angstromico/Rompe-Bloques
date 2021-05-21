import Ladrillo from '/ladrillo.js';
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const gameWidth = 0.8*windowWidth;
const gameHeight = 1.2*windowHeight;
export function crearNivel(Juego, nivel) {
    let ladrillos = [];
    nivel.forEach((row, rowIndex) => {
      row.forEach((ladrillo, ladrilloIndex) => {
        if (ladrillo === 1) {
          let position = {
            x: 0.1*gameWidth * ladrilloIndex,
            y: 0.03*gameHeight + 0.04*gameHeight * rowIndex
          };
          ladrillos.push(new Ladrillo(Juego, position));
        }
      });
    });
  
    return ladrillos;
  }
export const nivel1 = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
];
export const nivel2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
export const nivel3 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
const ra = [0, 1];
    function r() {
    return Math.floor(Math.random()*ra.length);
}
export const nivel4 = [
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
  [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
]

