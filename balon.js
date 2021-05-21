import {detectaColisiones} from '/colisionador.js';
export default class Balon {
    constructor(Juego) {
        this.gameWidth = Juego.gameWidth;
        this.gameHeight = Juego.gameHeight;
        this.image = document.getElementById('balon'); 
        this.Juego = Juego;
        this.size = 16;
        this.reseteo();
        this.beaker = document.getElementById('beaker');
        this.body = document.getElementById('body');
        this.alert = document.getElementById('siren');
        this.laser = document.getElementById('laser');
 }
 reseteo() {
    this.position = {x: 0.0125*this.gameWidth, y: 0.5*this.gameHeight};
    this.speed = {x: 4, y: 2};
 }
 draw(ctxt) {
    ctxt.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
 }
 update(deltaT) {
    //console.log(this.Juego.paddle.position.x);
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    //Rebote de Pelota en las paredes izquierda y derecha
    if(this.position.x + this.size > this.gameWidth || this.position.x < 0) {
        this.speed.x = -this.speed.x;
        this.laser.play();
    }
    //Rebote de Pelota en la pared de arriba.
    if(this.position.y < 0) {
        this.speed.y = -this.speed.y;
        this.laser.play();
    }
    //bola toca el fondo.
    if(this.position.y + this.size > this.gameHeight) {
        this.Juego.vidas--;
        this.reseteo();
        this.body.classList.add('fail');
        this.alert.play();
        console.log(this.body);
    }
    //Detectar Colisiones on paddle
    if(detectaColisiones(this, this.Juego.paddle)) {
        this.speed.y = -this.speed.y;
        this.position.y = this.Juego.paddle.position.y - this.size;
        this.beaker.play();
    }
  }
}