import Juego from "./juego.js";
//import Paddle from '/paddle.js';
export default class InputHandler {
    constructor(Paddle, Juego) {
        document.addEventListener('keydown', e => {
            switch(e.keyCode) {
                case 37:
                    Paddle.moveLeft();
                    break;
                case 39:
                    Paddle.moveRight();
                    break;
                case 27:
                    Juego.pausa();
                    break
                case 32:
                    Juego.inicio();
            }
        })

        document.addEventListener('keyup', e => {
            switch(e.keyCode) {
                case 37:
                    if(Paddle.speed < 0) Paddle.stop();
                    break;
                 case 39:
                    if(Paddle.speed > 0) Paddle.stop();
                    break;
            }
        })
    }
}

 