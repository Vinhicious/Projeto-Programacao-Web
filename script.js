const personagens = {
    "Chaves": 0,
    "Quico": 0,
    "Chiquinha": 0,
    "Florinda": 0,
    "Clotilde": 0,
    "Madruga": 0
};

const perguntas = [
    {
        enunciado: "Quanto você gosta de sanduíche?",
        opcoes: [
            { texto: "Muito", valor: { "Chaves": 1, "Quico": 2 } },
            { texto: "Pouco", valor: { "Chaves": 0, "Quico": 1 } },
            { texto: "Pouco", valor: { "Chaves": 0, "Quico": 1 } }
        ]
    },
    {
        enunciado: "Você gosta de suco?",
        opcoes: [
            { texto: "Sim", valor: { "Chiquinha": 1 } },
            { texto: "Não", valor: { "Florinda": 1 } },
            { texto: "Pouco", valor: { "Chaves": 0, "Quico": 1 } }
        ]
    }
];

let estadoPerguntas = [];
let confirmar;

document.getElementById("inicio").addEventListener("click", exibirQuiz);

function exibirQuiz() {
    let container = document.getElementById("quiz");
    container.innerHTML = "";

    perguntas.forEach((pergunta, i) => {
        estadoPerguntas[i] = {
            botaoAtual: null,
            pontosAtuais: null
        };

        let titulo = document.createElement("h2");
        titulo.textContent = pergunta.enunciado;
        container.appendChild(titulo);

        const grupo = document.createElement("div");
        grupo.classList.add("grupo-opcoes");
        container.appendChild(grupo);

        pergunta.opcoes.forEach((opcao) => {
            let botao = document.createElement("button");
            botao.textContent = opcao.texto;
            grupo.appendChild(botao);
            botao.classList.add("botao-opcao");

            botao.addEventListener("click", () => {
                selecionarOpcao(botao, opcao, i);
            });
        });
    });

    confirmar = document.createElement("button");
    confirmar.textContent = "Confirmar";
    confirmar.disabled = true;
    container.appendChild(confirmar);
    confirmar.classList.add("botao-confirmar");


    confirmar.addEventListener("click", exibirResultado);
}

function selecionarOpcao(botao, opcao, i) {
    const { botaoAtual, pontosAtuais } = estadoPerguntas[i];

    if (botaoAtual) {
        restaurarBotao(botaoAtual, pontosAtuais);
    }

    adicionarPontos(opcao.valor);
    botao.disabled = true;

    estadoPerguntas[i].botaoAtual = botao;
    estadoPerguntas[i].pontosAtuais = opcao.valor;

    const tudoRespondido = estadoPerguntas.every(est => est.botaoAtual !== null);
    confirmar.disabled = !tudoRespondido;
}

function exibirResultado() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    let personagemComMaisPontos = "";
    let maisPontos = 0;

    for (let personagem in personagens) {
        if (personagens[personagem] > maisPontos) {
            maisPontos = personagens[personagem];
            personagemComMaisPontos = personagem;
        }
    }

    const titulo = document.createElement("h2");
    titulo.textContent = "Sua Personalidade é:";
    resultado.appendChild(titulo);

    const nome = document.createElement("p");
    nome.textContent = personagemComMaisPontos;
    resultado.appendChild(nome);

    /*Parte para mostrar a imagem do personagem
    const imagem = document.createElement("img");
    imagem.src = `imagens/${personagemComMaisPontos.toLowerCase()}.jpg`;
    imagem.id = "imagem-personagem";
    resultado.appendChild(imagem);*/

    const reset = document.createElement("button");
    reset.textContent = "Resetar Quiz";
    resultado.appendChild(reset);
    reset.classList.add("botao-resetar");

    reset.addEventListener("click", () => {
        resetarQuiz();
    });
}

function resetarQuiz(){
    for(let personagem in personagens){
        personagens[personagem] = 0;
    }

    document.getElementById("quiz").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    estadoPerguntas = [];

    exibirQuiz()
}


function adicionarPontos(valor) {
    for (let nome in valor) {
        personagens[nome] += valor[nome];
    }
}

function removerPontos(valor) {
    for (let nome in valor) {
        personagens[nome] -= valor[nome];
    }
}

function restaurarBotao(botao, pontos) {
    botao.disabled = false;
    removerPontos(pontos);
}
