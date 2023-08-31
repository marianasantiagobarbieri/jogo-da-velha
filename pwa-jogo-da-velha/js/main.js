window.onload = () => {
    "use string";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
}


const linhaJogos = document.querySelectorAll(".linhaJogo"); /*tenho todos os linhaJogo selecionado */
let checarVezJogador = true;

const jogadorX = "X";
const jogadorO = "O";
let exibirVencedor = document.getElementById('exibirVencedor');
let exibirEmpate = document.getElementById('exibirEmpate');
let exibirTimer = document.getElementById('exibirTimer');

const chancesVencedor = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]; /* quantidade de combinações possíveis para ganhar o jogo  */

document.addEventListener("click", (event) => {
    if(event.target.matches(".linhaJogo")) {
        jogar(event.target.id);/*clica somente no quadrado estilizado, impedindo que qualquer outra parte do jogo da velha seja clicado e seja adicionado */
    }/*evento de interação do click do botão */
}); 

function jogar(id) { /*a função será pegada pelo id único definido no html nas divs*/
    const linhaJogo = document.getElementById(id);
    vezDoJogador = checarVezJogador ? jogadorX : jogadorO; /*se o checarVezJogador for true então é a vez do jogador X jogar, senão é a vez do jogador O */
    linhaJogo.textContent = vezDoJogador;
    linhaJogo.classList.add(vezDoJogador); 
    verificarVencedor(vezDoJogador);
} /*identifica de quem é a vez de jogoar - jogador X ou O - e quando tu clica mostra o X ou O, sendo o X sempre o primeiro */

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
    return x + o === 9 ? true : false; /*se x+0 deu 9 é para ser retornado o empate, senão continua o jogo */
}/* verificar se há empate no jogo com if */


function fimDeJogo(vencedor = null) {
    if (vencedor) {
        exibirVencedor.innerHTML = "O vencedor é: " + vencedor;
    } else {
        exibirEmpate.innerHTML = "O Jogo Empatou";
    }

    setInterval(() => {
        exibirTimer.innerHTML = "O jogo será reiniciado em 5 segundos";
    }, 1000);

    setTimeout(() => location.reload(), 5000);
}
/* função de finaliza o jogo, então se haver um vencedor vai aparecer a seguinte mensagem de texto: O vencedor é X, 
por exemplo, e tudo isso é pego pelo exibirVencedor que está dentro do um <p></p> no html, e eu peguei do
 index pelo document.getElementByID
 */
/* a partir disso, depois que houver um jogador vencedor ou se houve empate o jogo será  reiniciado depois de 5 segundos pelas 
funções da linha 83 a 87, onde faço todas essas funcionalidades acontecerem*/