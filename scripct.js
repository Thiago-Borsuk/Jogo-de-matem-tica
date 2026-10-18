
"use strict";

const perguntas = [
  {
    categoria: "ADIÇÃO",
    pergunta: "Quanto é 248 + 137?",
    opcoes: ["375", "385", "395", "415"],
    correta: 1,
    explicacao: "248 + 137 = 385."
  },
  {
    categoria: "SUBTRAÇÃO",
    pergunta: "Quanto é 500 - 276?",
    opcoes: ["214", "234", "224", "244"],
    correta: 2,
    explicacao: "500 - 276 = 224."
  },
  {
    categoria: "MULTIPLICAÇÃO",
    pergunta: "Quanto é 24 × 6?",
    opcoes: ["124", "134", "154", "144"],
    correta: 3,
    explicacao: "24 × 6 = 144."
  },
  {
    categoria: "DIVISÃO",
    pergunta: "Quanto é 144 ÷ 12?",
    opcoes: ["12", "10", "14", "16"],
    correta: 0,
    explicacao: "144 ÷ 12 = 12."
  },
  {
    categoria: "FRAÇÕES",
    pergunta: "Qual fração representa metade de um inteiro?",
    opcoes: ["1/3", "1/2", "1/4", "2/3"],
    correta: 1,
    explicacao: "1/2 representa uma de duas partes iguais."
  },
  {
    categoria: "FRAÇÕES",
    pergunta: "Uma pizza foi dividida em 4 partes iguais. Você comeu 1 parte. Qual fração sobrou?",
    opcoes: ["1/4", "2/4", "3/4", "4/4"],
    correta: 2,
    explicacao: "Três das quatro partes sobraram: 3/4."
  },
  {
    categoria: "NÚMEROS DECIMAIS",
    pergunta: "Quanto é 2,5 + 1,5?",
    opcoes: ["3", "3,5", "4", "4,5"],
    correta: 2,
    explicacao: "2,5 + 1,5 = 4."
  },
  {
    categoria: "NÚMEROS DECIMAIS",
    pergunta: "Qual número é maior?",
    opcoes: ["0,7", "0,5", "0,3", "0,6"],
    correta: 0,
    explicacao: "0,7 é maior que 0,6, 0,5 e 0,3."
  },
  {
    categoria: "RACIOCÍNIO LÓGICO",
    pergunta: "Complete a sequência: 5, 10, 15, 20, ...",
    opcoes: ["22", "24", "30", "25"],
    correta: 3,
    explicacao: "A sequência aumenta de 5 em 5. O próximo número é 25."
  },
  {
    categoria: "PROBLEMAS",
    pergunta: "Ana tem 3 caixas com 8 lápis em cada uma. Quantos lápis ela tem?",
    opcoes: ["11", "24", "21", "32"],
    correta: 1,
    explicacao: "3 × 8 = 24 lápis."
  }
];

// Elementos da página
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const botaoIniciar = document.getElementById("botao-iniciar");
const botaoProxima = document.getElementById("botao-proxima");
const botaoReiniciar = document.getElementById("botao-reiniciar");

const progresso = document.getElementById("progresso");
const pontuacao = document.getElementById("pontuacao");
const barraProgresso = document.getElementById("barra-progresso");
const barraPreenchida = document.getElementById("barra-preenchida");

const categoria = document.getElementById("categoria");
const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const feedback = document.getElementById("feedback");

const pontuacaoFinal = document.getElementById("pontuacao-final");
const acertosFinal = document.getElementById("acertos-final");
const mensagemFinal = document.getElementById("mensagem-final");
const emojiFinal = document.getElementById("emoji-final");
const tituloFinal = document.getElementById("titulo-final");

// Estado do jogo
let indiceAtual = 0;
let pontos = 0;
let acertos = 0;
let respondida = false;

// Mostra somente a tela solicitada
function mostrarTela(telaSelecionada) {
  [telaInicial, telaJogo, telaFinal].forEach((tela) => {
    tela.classList.add("escondido");
  });

  telaSelecionada.classList.remove("escondido");
}

// Começa ou reinicia o jogo
function iniciarJogo() {
  indiceAtual = 0;
  pontos = 0;
  acertos = 0;
  respondida = false;

  atualizarPontuacao();
  mostrarTela(telaJogo);
  mostrarPergunta();
}

// Atualiza a pontuação no topo
function atualizarPontuacao() {
  pontuacao.textContent = `⭐ ${pontos} pontos`;
}

// Carrega a pergunta atual
function mostrarPergunta() {
  respondida = false;

  const atual = perguntas[indiceAtual];

  progresso.textContent =
    `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

  categoria.textContent = atual.categoria;
  pergunta.textContent = atual.pergunta;

  feedback.textContent = "Escolha uma resposta!";
  feedback.className = "feedback";

  barraPreenchida.style.width =
    `${(indiceAtual / perguntas.length) * 100}%`;

  barraProgresso.setAttribute("aria-valuenow", indiceAtual);

  opcoes.replaceChildren();
  botaoProxima.classList.add("escondido");

  atual.opcoes.forEach((texto, indice) => {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "opcao";
    botao.textContent = texto;

    botao.addEventListener("click", function () {
      verificarResposta(indice);
    });

    opcoes.appendChild(botao);
  });
}

// Verifica se a resposta escolhida está correta
function verificarResposta(indiceEscolhido) {
  if (respondida) {
    return;
  }

  respondida = true;

  const atual = perguntas[indiceAtual];
  const botoes = opcoes.querySelectorAll(".opcao");

  const acertou = indiceEscolhido === atual.correta;

  botoes.forEach((botao, indice) => {
    botao.disabled = true;

    if (indice === atual.correta) {
      botao.classList.add("correta");
    }

    if (indice === indiceEscolhido && !acertou) {
      botao.classList.add("errada");
    }
  });

  if (acertou) {
    pontos += 10;
    acertos += 1;

    feedback.textContent = `🎉 Muito bem! ${atual.explicacao}`;
    feedback.className = "feedback acerto";
  } else {
    feedback.textContent = `💡 Não foi dessa vez! ${atual.explicacao}`;
    feedback.className = "feedback erro";
  }

  atualizarPontuacao();

  barraPreenchida.style.width =
    `${((indiceAtual + 1) / perguntas.length) * 100}%`;

  barraProgresso.setAttribute("aria-valuenow", indiceAtual + 1);

  botaoProxima.textContent =
    indiceAtual === perguntas.length - 1
      ? "Ver resultado 🏆"
      : "Próxima pergunta ➜";

  botaoProxima.classList.remove("escondido");
}

// Avança para a próxima pergunta
function proximaPergunta() {
  if (!respondida) {
    return;
  }

  indiceAtual += 1;

  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    finalizarJogo();
  }
}

// Apresenta o resultado final
function finalizarJogo() {
  mostrarTela(telaFinal);

  pontuacaoFinal.textContent = `${pontos} / 100`;
  acertosFinal.textContent =
    `${acertos} de ${perguntas.length} respostas corretas`;

  if (acertos === 10) {
    emojiFinal.textContent = "🏆";
    tituloFinal.textContent = "Explorador extraordinário!";
    mensagemFinal.textContent =
      "Incrível! Você acertou todas as perguntas!";
  } else if (acertos >= 7) {
    emojiFinal.textContent = "🌟";
    tituloFinal.textContent = "Missão quase perfeita!";
    mensagemFinal.textContent =
      "Excelente resultado! Continue praticando!";
  } else if (acertos >= 4) {
    emojiFinal.textContent = "🚀";
    tituloFinal.textContent = "Boa aventura!";
    mensagemFinal.textContent =
      "Você está aprendendo. Tente novamente para melhorar!";
  } else {
    emojiFinal.textContent = "💪";
    tituloFinal.textContent = "Vamos tentar de novo?";
    mensagemFinal.textContent =
      "Pratique mais um pouco. Errar faz parte de aprender!";
  }
}

// Eventos dos botões principais
botaoIniciar.addEventListener("click", iniciarJogo);
botaoProxima.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", iniciarJogo);
