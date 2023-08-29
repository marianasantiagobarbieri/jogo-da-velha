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
    verificarVencedor(vezDoJogador);
}

function verificarVencedor(vezDoJogador) {
    const vencedor = chancesVencedor.some((combinacao) =>{
        return combinacao.every((index) => {
            return linhaJogos[index].classList.contains(vezDoJogador);
        })
    });/* início da validação se haverá ou não um vencedor, pois será percorrido o array chancesVencedor e se algum for true já teremos um vencedor a caminho*/

    if (vencedor) {
        fimDeJogo(vezDoJogador); /* se houver um vencedor a função fimDeJogo() será disparada e vai acabar o jogo da velha, ou seja, essa função vai identificar quem foi o vencedor */
    } else if(verificarEmpate()) {
        fimDeJogo(); /*senão houver um vencedor vai retornar um empate */
    } else{
         checarVezJogador = !checarVezJogador; /*se não tiver empate nem  fim de jogo singnifica que o jogo ainda continua e passa a vez p/ o proximo jogador */
    }
}/* o some vai ajudar a percoorer meu array chancesVencedor e se der true el alguma combinação o array inteiro vai estar certo */

function verificarEmpate() {
    let x = 0;
    let o = 0;

    for (index in linhaJogos) {
        if(!isNaN(index)) {
            if(linhaJogos[index].classList.contains(jogadorX)) {
                x++;
            }
            if(linhaJogos[index].classList.contains(jogadorO)) {
                o++;
            }
        }
    }
    return x + o === 9 ? true : false; 
}


function fimDeJogo(vencedor = null) {
    if (vencedor) {
        console.log("O vencedor é:" + vencedor);
    } else {
        console.log("O Jogo Empatou");
    }

    setInterval(() => {
        console.log("O jogo será reinicado em breve");
    }, 1000);

    setTimeout(() => location.reload(), 5000);
}