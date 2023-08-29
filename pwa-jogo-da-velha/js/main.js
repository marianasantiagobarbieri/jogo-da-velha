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

const chancesVencedor = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]; /* quanridade de combinações possíveis para ganhar o jogo  */

document.addEventListener("click", (event) => {
    if(event.target.matches(".linhaJogo")) {
        jogar(event.target.id);
    }
}); 

function jogar(id) {
    const linhaJogo = document.getElementById(id);
    vezDoJogador = checarVezJogador ? jogadorX : jogadorO;
    linhaJogo.textContent = vezDoJogador;
    linhaJogo.classList.add(vezDoJogador); 
    checarVezJogador = !checarVezJogador;
    verificarVencedor(vezDoJogador);
}

function verificarVencedor(vezDoJogador) {
    const vencedor = chancesVencedor.some((combinacao) =>{
        return combinacao.every((index) => {
            return linhaJogos[index].classList.contains(vezDoJogador);
        })
    });/* início da validação se haverá ou não um vencedor, pois será percorrido o array chancesVencedor e se algum for true já teremos um vencedor a caminho*/
}/* o some vai ajudar a percoorer meu array chancesVencedor e se der true el alguma combinação o array inteiro vai estar certo */