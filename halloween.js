const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tabuleiro = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let jogadorAtual = "🎃";

function mostrarTabuleiro() {
    console.log(`${tabuleiro[0]} | ${tabuleiro[1]} | ${tabuleiro[2]}`);
    console.log("---------");
    console.log(`${tabuleiro[3]} | ${tabuleiro[4]} | ${tabuleiro[5]}`);
    console.log("---------");
    console.log(`${tabuleiro[6]} | ${tabuleiro[7]} | ${tabuleiro[8]}`);
}

function verificarVitoria() {
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] === jogadorAtual && tabuleiro[b] === jogadorAtual && tabuleiro[c] === jogadorAtual) {
            return true;
        }
    }
    return false;
}

function verificarEmpate() {
    return tabuleiro.every(celula => celula !== " ");
}

function jogar() {
    console.log("Bem-vindo ao Jogo da Velha Assombrado! 🎃👻");

    function jogarRodada() {
        mostrarTabuleiro();
        rl.question(`Jogador ${jogadorAtual}, escolha uma posição de 1 a 9... se tiver coragem! `, (input) => {
            const posicao = parseInt(input) - 1;

            if (posicao < 0 || posicao > 8 || tabuleiro[posicao] !== " ") {
                console.log("Posição mal-assombrada! Tente outra...");
                jogarRodada();
                return;
            }

            tabuleiro[posicao] = jogadorAtual;

            if (verificarVitoria()) {
                mostrarTabuleiro();
                console.log(`A noite das trevas trouxe a vitória para o jogador ${jogadorAtual}!`);
                rl.close();
                return;
            }

            if (verificarEmpate()) {
                mostrarTabuleiro();
                console.log("O jogo terminou em um empate assustador!");
                rl.close();
                return;
            }

            jogadorAtual = jogadorAtual === "🎃" ? "👻" : "🎃";
            jogarRodada();
        });
    }

    jogarRodada();
}

jogar();
