export function detectaColisiones(balon, objeto) {
    //Detectar Colisiones
    let bolaFondo = balon.position.y + balon.size;
    let bolaSima = balon.position.y;
    let objetoSima = objeto.position.y; 
    let leftObj = objeto.position.x;
    let rightObj = objeto.position.x + objeto.width;
    let fondoObjeto = objeto.position.y + objeto.height;
    if(bolaFondo >= objetoSima
        && bolaSima <= fondoObjeto
        && balon.position.x >= leftObj
        && balon.position.x - balon.size <= rightObj) {
        return true;
    } else {
        return false;
    } 
 }
  