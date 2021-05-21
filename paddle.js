export default class Paddle {
    constructor(Juego) {
        this.gameWidth = Juego.gameWidth;
        this.gameHeight = Juego.gameHeight;
        this.width = 0.18*this.gameWidth;
        this.height = 0.065*this.gameHeight;
        this.maxSpeed = 7;
        this.speed = 0;
        this.position = { 
            x: Juego.gameWidth/2 - this.width/2,
            y: Juego.gameHeight - this.height,
        }
} 
moveLeft() {
    this.speed = -this.maxSpeed;
}
moveRight() {
    this.speed = this.maxSpeed;
}
stop() {
    this.speed = 0;
}
draw(ctxt) {
    ctxt.fillStyle = '#8a0303';
    ctxt.fillRect(this.position.x, this.position.y, this.width, this.height)
}
update(deltaT) {
    //if(!deltaT) return;
    //this.position.x += 5 / deltaT;
    this.position.x += this.speed; 
    if(this.position.x < 0) this.position.x = 0;
    if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
}
} 
