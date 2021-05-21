import Paddle from '/paddle.js';
import InputHandler from '/input.js'
import Balon from '/balon.js';
import Ladrillo from '/ladrillo.js';
import {crearNivel, nivel1, nivel2, nivel3, nivel4} from '/niveles.js';
const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
  }; 
  let i = 0;
  let song;
export default class Juego {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GAMESTATE.MENU;
        this.balon = new Balon(this);
        this.paddle = new Paddle(this);
        this.juegoObt = []; 
        this.ladrillos = [];
        this.niveles = [nivel1, nivel2, nivel3, nivel4];
        this.nivelActual = 0;
        this.vidas = 4;
        this.body = document.body;
        this.win = document.getElementById('yes');
        this.init = document.getElementById('init');
        this.pink = document.getElementById('pink');
        this.epic = document.getElementById('epic');
        this.rock = document.getElementById('rock');
        this.jungla = document.getElementById('jungla');
        this.luna = document.getElementById('luna');
        this.shot = document.getElementById('shot');
        this.piano = document.getElementById('piano');
        this.hight = document.getElementById('hight');
        this.bad = document.getElementById('bad');
        this.playList = [this.init, this.pink, this.epic, this.rock,
        this.jungla, this.luna, this.shot, this.piano, this.hight];
        this.cancionInicial = this.playList[0];
        //this.playList =  document.querySelectorAll('[data-song]');
        new InputHandler(this.paddle, this);
    } 
    getRandomN() {
        return Math.floor(Math.random()*this.playList.length);
        }
        /*manejadorMusical(e) {
            console.log(e, this.cancionInicial);
            if(this.cancionInicial) {
                this.cancionInicial.removeEventListener('ended', this.inicialBind);
                this.cancionInicial.pause();
                this.cancionInicial.currentTime = 0;
            }
            let ultimaCancion = this.cancionInicial;
            do {
                this.cancionInicial= this.getRandomN();
            } while(ultimaCancion === this.cancionInicial)
            this.inicialBind = this.manejadorMusical.bind(this);
            //this.cancionInicial.playback = 15;
            this.cancionInicial.addEventListener('ended', this.inicialBind);
            this.cancionInicial.play();
        }*/
        musica() {
            for(i ; i < this.playList.length; i++) {
                this.playList[i].addEventListener('ended', () => {
                    song = this.playList[this.getRandomN()];
                    song.play();
                })
        }
            this.cancionInicial.play();
        } 
    inicio() {
        if(this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.NEWLEVEL) return;
        //this.ladrillo = new Ladrillo(this, {x: 20, y: 20});
        this.ladrillos = crearNivel(this, this.niveles[this.nivelActual]);
        this.balon.reseteo();
        this.juegoObt = [this.paddle, this.balon];
        this.gameState = GAMESTATE.RUNNING;
        this.musica();
        this.body;
        //this.manejadorMusical();
    }
    update(deltaT) {
        //this.paddle.update(deltaT);
        //this.update(deltaT);
        /*if(this.gameState === GAMESTATE.PAUSED) {
            this.cancionInicial.pause();
        } else {
            if(this.cancionInicial) {
                this.cancionInicial.play();
            }
        }
        if(this.gameState === GAMESTATE.PAUSED) {
            this.bad.play();
            //console.log(bad.currentTime);
            song.pause();
    }
    if(this.gameState === GAMESTATE.RUNNING) {
        this.bad.pause();
        song.play();
        }*/
        if(this.vidas === 0) this.gameState = GAMESTATE.GAMEOVER;
        if(this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER) return;
        [...this.juegoObt, ...this.ladrillos].forEach(element => element.update(deltaT));
        this.ladrillos = this.ladrillos.filter(obj => !obj.marketForDeletion); 
        if(this.ladrillos.length === 0) {
            console.log('pasaste de nivel');
            this.nivelActual++;
            for(i = 0; i < this.playList.length; i++) {
                if(this.playList[i].play()) {
                    this.playList[i].pause();
                }
        }
            this.gameState = GAMESTATE.NEWLEVEL;
            this.inicio();
        } 
        if(this.body.classList.contains('fail')) {
            setTimeout(() => {
                this.body.classList.remove('fail')
                console.log(this.body)
            }, 5000)
        }
    }
    draw(ctxt) {
        //this.paddle.draw(ctxt);
        //this.balon.draw(ctxt);
        [...this.juegoObt, ...this.ladrillos].forEach(element => element.draw(ctxt));
        if(this.gameState === GAMESTATE.PAUSED) {
                /*this.bad.play();
                    for(i = 0; i < this.playList.length; i++) {
                        if(this.playList[i].play()) {
                            this.playList[i].pause();
                        } 
            }*/
            ctxt.rect(0, 0, this.gameWidth, this.gameHeight);
            ctxt.fillStyle = 'rgba(0, 0, 0, .5)';
            ctxt.fill();
            ctxt.font = '3rem Arial';
            ctxt.fillStyle = 'white';
            ctxt.textAlign='center';
            ctxt.fillText('Pausa', this.gameWidth/2, this.gameHeight/2);          
        }
        if(this.gameState === GAMESTATE.MENU) {
            ctxt.rect(0, 0, this.gameWidth, this.gameHeight);
            ctxt.fillStyle = 'rgba(0, 0, 0)';
            ctxt.fill();
            ctxt.font = '3rem Arial';
            ctxt.fillStyle = 'white';
            ctxt.textAlign='center';
            ctxt.fillText('Toque o Barra', this.gameWidth/2, this.gameHeight/2);          
        }
        if(this.gameState === GAMESTATE.GAMEOVER) {
            ctxt.rect(0, 0, this.gameWidth, this.gameHeight);
            ctxt.fillStyle = 'rgba(0, 0, 0)';
            ctxt.fill();
            ctxt.font = '3rem Arial';
            ctxt.fillStyle = 'white';
            ctxt.textAlign='center';
            ctxt.fillText('Fin del Juego', this.gameWidth/2, this.gameHeight/2);          
        }
    }
    pausa() {
        if(this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else {
            this.gameState = GAMESTATE.PAUSED;
        }
    }
}