window.onload = () => {
    "use string";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
}


const QuadradoJogos = document.querySelectorAll(".QuadradoJogo");
let checarVezJogador = true;

const jogadorX = "X";
const jogadorO = "O";

document.addEventListener("click", (event) => {
    if(event.target.matches(".QuadradoJogo")) {
        jogar(event.target.id);
    }
}); 

function jogar(id) {
    const QuadradoJogo = document.getElementById(id);
    vezDoJogador = checarVezJogador ? jogadorX : jogadorO;
    QuadradoJogo.textContent = vezDoJogador;
    checarVezJogador = !checarVezJogador;
}