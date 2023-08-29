window.onload = () => {
    "use string";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
}


const linhaJogos = document.querySelectorAll(".linhaJogo");
let checarVezJogador = true;

const jogadorX = "X";
const jogadorO = "O";

document.addEventListener("click", (event) => {
    if(event.target.matches(".linhaJogo")) {
        jogar(event.target.id);
    }
}); 

function jogar(id) {
    const linhaJogo = document.getElementById(id);
    vezDoJogador = checarVezJogador ? jogadorX : jogadorO;
    linhaJogo.textContent = vezDoJogador;
    checarVezJogador = !checarVezJogador;
}