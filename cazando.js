let canvas = document.getElementById("juego");
let ctx = canvas.getContext("2d");

const VELOCIDAD = 15;
let gatoX = 0;
let gatoY = 0;
const ANCHOGATO = 50;
const ALTURAGATO = 50;
let comidaX = 50;
let comidaY = 50;
const ANCHOCOMIDA = 30;
const ALTURACOMIDA = 30;
let puntos = 0;
let tiempo = 10;
let intervalo;

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHOGATO, ALTURAGATO, "#000000");
}

function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHOCOMIDA, ALTURACOMIDA, "#ff0000");
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
    limpiarCanvas();
    graficarGato();
    graficarComida();
}
function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoY = (canvas.height / 2) - (ALTURAGATO / 2);
    puntos = 0;
    tiempo = 10;

    actualizarPanel();

    dibujarTodo();

    intervalo = setInterval(actualizarTiempo, 1000);
}

function mover(direccion) {

    if (tiempo <= 0) return; //  no se mueve si terminó

    if (direccion === "arriba" && gatoY > 0) {
        gatoY -= VELOCIDAD;
    }

    if (direccion === "abajo" && gatoY < canvas.height - ALTURAGATO) {
        gatoY += VELOCIDAD;
    }

    if (direccion === "izquierda" && gatoX > 0) {
        gatoX -= VELOCIDAD;
    }

    if (direccion === "derecha" && gatoX < canvas.width - ANCHOGATO) {
        gatoX += VELOCIDAD;
    }

    detectarColision();
    dibujarTodo();
}

function detectarColision() {
    if (
        gatoX < comidaX + ANCHOCOMIDA &&
        gatoX + ANCHOGATO > comidaX &&
        gatoY < comidaY + ALTURACOMIDA &&
        gatoY + ALTURAGATO > comidaY
    ) {
        puntos++;
        moverComida();
        actualizarPanel();
    }
}

function detectarColision() {
    if (
        gatoX < comidaX + ANCHOCOMIDA &&
        gatoX + ANCHOGATO > comidaX &&
        gatoY < comidaY + ALTURACOMIDA &&
        gatoY + ALTURAGATO > comidaY
    ) 
    {
        puntos++;          
        tiempo = 10;       
        moverComida();     
        actualizarPanel();
    }
}       
function detectarColision() {
    if (
        gatoX < comidaX + ANCHOCOMIDA &&
        gatoX + ANCHOGATO > comidaX &&
        gatoY < comidaY + ALTURACOMIDA &&
        gatoY + ALTURAGATO > comidaY
    ) {
        puntos++;          
        tiempo = 10;       
        moverComida();     
        actualizarPanel();
    }
}
function moverComida() {
    comidaX = Math.random() * (canvas.width - ANCHOCOMIDA);
    comidaY = Math.random() * (canvas.height - ALTURACOMIDA);
}

function actualizarTiempo() {
    tiempo--;

    actualizarPanel();

    if (tiempo <= 0) {
        clearInterval(intervalo);
        document.getElementById("mensaje").innerText = "⛔ Tiempo terminado";
    }
}


function actualizarPanel() {
    document.getElementById("puntos").innerText = puntos;
    document.getElementById("tiempo").innerText = tiempo;
}


document.getElementById("btnArriba").onclick = () => mover("arriba");
document.getElementById("btnAbajo").onclick = () => mover("abajo");
document.getElementById("btnIzquierda").onclick = () => mover("izquierda");
document.getElementById("btnDerecha").onclick = () => mover("derecha");

//Iniciar
window.onload = iniciarJuego;
