export default class Sector1 {
    constructor(Juego) {
        this.cuadro = document.getElementById('cuadro');
        this.juego = Juego;
        this.gameWidth = Juego.gameWidth;
        this.gameHeight = Juego.gameHeight;
        this.width = 0.5*this.gameWidth;
        this.height = this.gameHeight;
        this.position = {
            x: 0,
            y: 0
        }
        this.canvas = document.getElementById('pantallaJuego');
    }
    getMousePosition(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        console.log("Coordenada x: " + x, 
                    "Coordenada y: " + y);
    }
    draw(ctxt) {
        ctxt.globalAlpha = 0;
        ctxt.drawImage(this.cuadro ,this.position.x, this.position.y, this.width, this.height);
        ctxt.globalAlpha = 1;
    }
    update(deltaT) {
        this.canvas.addEventListener('click', e => {
            this.getMousePosition(this.canvas, e)
        })
    } 
} 