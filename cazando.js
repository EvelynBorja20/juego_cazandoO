let canvas = document.getElementById("juego");
let ctx = canvas.getContext("2d");

const VELOCIDAD = 15;

let gatoX = 0;
let gatoY = 0;

const ANCHOGATO = 60;
const ALTURAGATO = 60;

let comidaX = 50;
let comidaY = 50;

const ANCHOCOMIDA = 30;
const ALTURACOMIDA = 30;

let puntos = 0;
let tiempo = 15;
let tiempoMaximo = 15;
let intervalo;

// 🐱 IMAGEN DEL GATO (ARREGLADO)
let imagenGato = new Image();
imagenGato.src ="garfield.png"
imagenGato.onload = function () {
    iniciarJuego();
};



// 🔴 RECTÁNGULO (comida)
let comidaImg = new Image();
comidaImg.src = "lasaña.png"; // lasaña


// 🐱 DIBUJAR GATO
function graficarGato() {
    ctx.drawImage(imagenGato, gatoX, gatoY, ANCHOGATO, ALTURAGATO);
}

// 🍎 COMIDA
function graficarComida() {
    ctx.drawImage(comidaImg, comidaX, comidaY, ANCHOCOMIDA, ALTURACOMIDA);
}

// 🧹 LIMPIAR
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 🎮 DIBUJAR TODO
function dibujarTodo() {
    limpiarCanvas();
    graficarGato();
    graficarComida();
}

// 🔥 INICIAR / REINICIAR
function iniciarJuego() {
    clearInterval(intervalo);

    gatoX = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoY = (canvas.height / 2) - (ALTURAGATO / 2);

    puntos = 0;
    tiempo = tiempoMaximo;

    moverComida();
    actualizarPanel();
    dibujarTodo();

    intervalo = setInterval(actualizarTiempo, 1000);

    document.getElementById("mensaje").innerText = "";
}

// 🎯 MOVIMIENTO
function mover(direccion) {
    if (tiempo <= 0) return;

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

// 💥 COLISIÓN
function detectarColision() {
    if (
        gatoX < comidaX + ANCHOCOMIDA &&
        gatoX + ANCHOGATO > comidaX &&
        gatoY < comidaY + ALTURACOMIDA &&
        gatoY + ALTURAGATO > comidaY
    ) {
        puntos++;
        tiempo = tiempoMaximo;

        moverComida();
        actualizarPanel();

        if (puntos >= 6) {
            clearInterval(intervalo);
            alert("🎉 GANASTE 🎉");
        }
    }
}

// 📍 NUEVA COMIDA
function moverComida() {
    comidaX = Math.random() * (canvas.width - ANCHOCOMIDA);
    comidaY = Math.random() * (canvas.height - ALTURACOMIDA);
}

// ⏱ TIEMPO
function actualizarTiempo() {
    tiempo--;
    actualizarPanel();

    if (tiempo <= 0) {
        clearInterval(intervalo);
        alert("💀 GAME OVER");
        document.getElementById("mensaje").innerText = "⛔ Tiempo terminado";
    }
}

// 📊 PANEL
function actualizarPanel() {
    document.getElementById("puntos").innerText = puntos;
    document.getElementById("tiempo").innerText = tiempo;
}

// 🎮 BOTONES
document.getElementById("btnArriba").onclick = () => mover("arriba");
document.getElementById("btnAbajo").onclick = () => mover("abajo");
document.getElementById("btnIzquierda").onclick = () => mover("izquierda");
document.getElementById("btnDerecha").onclick = () => mover("derecha");
document.getElementById("btnReiniciar").onclick = iniciarJuego;