import Paddle from './paddle.js';
import InputHandler from './input.js'
import Balon from './balon.js';
import Ladrillo from './ladrillo.js';
import {crearNivel, nivel1, nivel2, nivel3, nivel4} from './niveles.js';
import Sector1 from './sectores.js';
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
        this.sector1 = new Sector1(this);
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
        
        this.soundEnabled = true;
        this.menus = {
            start: document.getElementById('start-menu'),
            pause: document.getElementById('pause-menu'),
            gameover: document.getElementById('gameover-menu')
        };
        this.buttons = {
            start: document.getElementById('start-button'),
            resume: document.getElementById('resume-button'),
            restart: document.getElementById('restart-button'),
            soundStart: document.getElementById('sound-toggle-start'),
            soundPause: document.getElementById('sound-toggle-pause')
        };

        this.setupEventListeners();
        new InputHandler(this.paddle, this);
    } 

    setupEventListeners() {
        this.buttons.start.addEventListener('click', () => this.inicio());
        this.buttons.resume.addEventListener('click', () => this.pausa());
        this.buttons.restart.addEventListener('click', () => this.reiniciar());
        this.buttons.soundStart.addEventListener('click', () => this.toggleSound('start'));
        this.buttons.soundPause.addEventListener('click', () => this.toggleSound('pause'));
    }

    toggleSound(menuType) {
        this.soundEnabled = !this.soundEnabled;
        const btn = menuType === 'start' ? this.buttons.soundStart : this.buttons.soundPause;
        btn.textContent = `Sonido: ${this.soundEnabled ? 'ON' : 'OFF'}`;
    }

    updateMenuVisibility() {
        if (this.menus.start) this.menus.start.style.display = this.gameState === GAMESTATE.MENU ? 'flex' : 'none';
        if (this.menus.pause) this.menus.pause.style.display = this.gameState === GAMESTATE.PAUSED ? 'flex' : 'none';
        if (this.menus.gameover) this.menus.gameover.style.display = this.gameState === GAMESTATE.GAMEOVER ? 'flex' : 'none';
    }

    reiniciar() {
        this.nivelActual = 0;
        this.vidas = 4;
        this.gameState = GAMESTATE.MENU;
        this.updateMenuVisibility();
        this.inicio();
    }

    playSound(element) {
        if (this.soundEnabled) {
            element.play();
        }
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
                    this.playSound(song);
                })
            }
            this.playSound(this.cancionInicial);
        } 
    inicio() {
        if(this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.NEWLEVEL) return;
        this.ladrillos = crearNivel(this, this.niveles[this.nivelActual]);
        this.balon.reseteo();
        this.juegoObt = [this.paddle, this.balon, this.sector1];
        this.gameState = GAMESTATE.RUNNING;
        this.musica();
        this.updateMenuVisibility();
    }
    update(deltaT) {
        if(this.vidas === 0) {
            this.gameState = GAMESTATE.GAMEOVER;
            this.updateMenuVisibility();
        }
        if(this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER) return;
        [...this.juegoObt, ...this.ladrillos].forEach(element => element.update(deltaT));
        this.ladrillos = this.ladrillos.filter(obj => !obj.marketForDeletion); 
        if(this.ladrillos.length === 0) {
            console.log('pasaste de nivel');
            this.nivelActual++;
            for(i = 0; i < this.playList.length; i++) {
                if(this.playList[i].paused === false) {
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
        [...this.juegoObt, ...this.ladrillos].forEach(element => element.draw(ctxt));
        // Canvas based text drawing removed for MENU and PAUSED as we use HTML overlays
    }
    pausa() {
        if(this.gameState == GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else {
            this.gameState = GAMESTATE.PAUSED;
        }
        this.updateMenuVisibility();
    }
}
