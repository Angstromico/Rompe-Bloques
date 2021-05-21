import {detectaColisiones} from '/colisionador.js';
export default class Ladrillo {
    constructor(Juego, position) {
        this.image = document.getElementById('ladrillo'); 
        this.Juego = Juego;
        this.position = position;
        this.gameWidth = Juego.gameWidth;
        this.gameHeight = Juego.gameHeight;
        this.width = 0.1*this.gameWidth;
        this.height = 0.04*this.gameHeight;
        this.marketForDeletion = false;
        this.coin = document.getElementById('coin');
    }
    update() {
        if(detectaColisiones(this.Juego.balon, this)) {
            this.Juego.balon.speed.y = -this.Juego.balon.speed.y;
            this.marketForDeletion = true;
            this.coin.play();
        }
    }
    draw(ctxt) {
        ctxt.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
     }
}