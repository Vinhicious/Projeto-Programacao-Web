const personagens = {
    "Chaves": 0,
    "Quico": 0,
    "Chiquinha": 0,
    "Dona Florinda": 0,
    "Bruxa do 71": 0,
    "Seu Madruga": 0
};

const perguntas = [
    {
        enunciado: "Qual é o seu maior desejo na vila",
        opcoes: [
            { texto: "Ter sempre um sanduíche de presunto para comer e um canto para dormir 🥪", valor: { "Chaves": 3, "Quico": 2, "Seu Madruga": 1} },
            { texto: "Ser respeitado por todos como o mais importante da vila", valor: { "Dona Florinda": 3, "Quico": 2, "Bruxa do 71": 1} },
            { texto: "Bolar uma travessura que faça todos falarem de você", valor: { "Chiquinha": 3, "Chaves": 2, "Seu Madruga": 1 } }
        ]
    },
    {
        enunciado: "Como você lida com a chegada do Seu Barriga cobrando o aluguel?",
        opcoes: [
            { texto: "Tento explicar que não tenho dinheiro, com cara de inocente", valor: { "Chiquinha": 2, "Chaves": 3, "Seu Madruga": 1 } },
            { texto: "Ofereço um café e converso para ganhar tempo", valor: { "Dona Florinda": 3, "Quico": 1, "Bruxa do 71": 2 } },
            { texto: "Sumo correndo antes que ele me veja", valor: { "Chiquinha": 2, "Chaves": 1, "Seu Madruga": 3 } }
        ]
    },
    {
        enunciado: "O que te faz sentir vivo na vila?",
        opcoes: [
            { texto: "Fazer os vizinhos rirem, mesmo sem querer querendo", valor: { "Chiquinha": 1, "Chaves": 3, "Quico": 2 } },
            { texto: "Ser admirado por sua postura e maneiras refinadas", valor: { "Dona Florinda": 3, "Quico": 2, "Bruxa do 71": 1 } },
            { texto: "Criar um plano esperto que surpreenda a todos", valor: { "Chiquinha": 3, "Chaves": 1, "Seu Madruga": 2 } }
        ]
    },
    {
        enunciado: "Como você reage quando alguém te irrita no pátio?",
        opcoes: [
            { texto: "Fico triste, mas logo perdoo e tento ser amigo", valor: { "Dona Florinda": 1, "Chaves": 3, "Quico": 2 } },
            { texto: "Respondo com um tapa ou uma bronca bem dada", valor: { "Dona Florinda": 3, "Seu Madruga": 2, "Chiquinha": 1 } },
            { texto: "Penso em uma vingança misteriosa para mais tarde", valor: { "Bruxa do 71": 3, "Quico": 1, "Chiquinha": 2 } }
        ]
    },
    {
        enunciado: "O que te anima nas tardes da vila?",
        opcoes: [
            { texto: "Brincar no pátio com os amigos, nem que seja com uma bola murcha", valor: { "Quico": 1, "Chiquinha": 3, "Chaves": 2 } },
            { texto: "Servir um chá com bolinhos e conversar com classe", valor: { "Dona Florinda": 3, "Bruxa do 71": 2, "Quico": 1 } },
            { texto: "Tirar uma soneca sem ninguém te incomodar", valor: { "Seu Madruga": 3, "Chaves": 2, "Bruxa do 71": 1 } }
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

    console.log(personagens)

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
