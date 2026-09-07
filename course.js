
window.COURSE = {
  module: {
    id: "m0",
    title: "Fundamentos da Tecnologia",
    subtitle: "Entender antes de especializar.",
    lessons: [
      {
        id: "m0-a1",
        number: 1,
        title: "O que realmente acontece dentro de um computador?",
        duration: 55,
        status: "available",
        masteryScore: 80,
        sections: [
          {
            eyebrow: "01 · O PROBLEMA ORIGINAL",
            title: "Antes do computador, existia o problema de calcular.",
            paragraphs: [
              "Computadores não surgiram porque alguém quis criar uma máquina “inteligente”. Eles surgiram para resolver um problema muito mais básico: executar operações e instruções de forma rápida, repetível e confiável.",
              "Durante séculos, cálculo significou trabalho humano. Depois vieram máquinas mecânicas e eletromecânicas. No século XX, a necessidade de realizar grandes quantidades de cálculos — científicos, militares, administrativos e industriais — acelerou o desenvolvimento dos computadores eletrônicos.",
              "A ideia central que permanece até hoje é simples: representar informação, armazenar instruções e fazer uma máquina executar essas instruções."
            ]
          },
          {
            eyebrow: "02 · UMA DISTINÇÃO FUNDAMENTAL",
            title: "Guardar informação e trabalhar com informação são problemas diferentes.",
            paragraphs: [
              "Seu SSD é excelente para guardar programas e arquivos por muito tempo. Ele mantém os dados mesmo quando o computador é desligado. Porém, a CPU precisa receber instruções e dados com uma velocidade muito maior do que o armazenamento permanente normalmente oferece.",
              "Por isso existe uma camada intermediária: a memória RAM. Quando você abre um programa, partes necessárias dele são copiadas do armazenamento para a RAM. A CPU acessa essa memória para buscar instruções e dados enquanto trabalha.",
              "Essa separação explica por que um computador pode ter muito espaço em disco e ainda assim ficar lento por falta de RAM, ou ter muita RAM e continuar lento por causa de um processador fraco."
            ]
          },
          {
            eyebrow: "03 · O PROCESSADOR",
            title: "A CPU não 'faz programas'. Ela executa instruções.",
            paragraphs: [
              "O processador recebe instruções extremamente simples, codificadas em linguagem de máquina. Operações maiores — abrir uma planilha, renderizar uma página, calcular uma média — são construídas a partir de enormes sequências dessas instruções.",
              "Uma forma útil de pensar é: a CPU é o componente que executa, a RAM mantém rapidamente disponível aquilo que está sendo usado e o armazenamento preserva os dados por longos períodos.",
              "A velocidade de um computador não depende de uma única peça. Ela emerge da cooperação entre processador, memória, armazenamento, sistema operacional e outros componentes."
            ]
          },
          {
            eyebrow: "04 · O SISTEMA OPERACIONAL",
            title: "Quem coordena tudo isso?",
            paragraphs: [
              "O sistema operacional — como Windows, Linux ou macOS — fica entre os programas e o hardware. Ele administra memória, arquivos, processos, dispositivos, permissões e muitos outros recursos.",
              "Quando você abre um aplicativo, não é o aplicativo que sozinho decide onde colocar cada byte na memória ou como conversar diretamente com todos os componentes físicos. O sistema operacional oferece mecanismos padronizados para isso.",
              "Essa abstração é essencial: sem ela, cada programa precisaria conhecer profundamente cada modelo de hardware e coordenar recursos por conta própria."
            ]
          },
          {
            eyebrow: "05 · QUANDO VOCÊ CLICA",
            title: "Do clique ao programa na tela.",
            paragraphs: [
              "Em uma visão simplificada: você solicita a abertura do programa; o sistema operacional localiza seus arquivos no armazenamento; carrega para a RAM as partes necessárias; cria um processo; a CPU começa a executar as instruções desse processo; e o sistema coordena a saída para a tela e a entrada de teclado, mouse e outros dispositivos.",
              "Essa sequência acontece tão rapidamente que parece instantânea, mas conceitualmente existem várias etapas e responsabilidades diferentes.",
              "Entender esse caminho será importante mais tarde quando estudarmos desempenho, programação, processos, servidores, bancos de dados e sistemas distribuídos."
            ]
          },
          {
            eyebrow: "06 · O QUE CORRIGIMOS DO SEU DIAGNÓSTICO",
            title: "Sua intuição estava parcialmente certa — agora vamos refiná-la.",
            paragraphs: [
              "Você descreveu o processador como responsável pela capacidade da máquina de executar coisas. Essa intuição está no caminho certo, mas 'capacidade' é amplo demais: tecnicamente, o processador executa instruções.",
              "Você associou RAM à execução de ações simultâneas. Mais RAM realmente ajuda a manter mais programas e dados ativos, mas ela não é a responsável direta pela simultaneidade. Ela é memória de trabalho de acesso rápido.",
              "E armazenamento não é simplesmente 'memória da máquina'. É memória persistente: foi projetado para manter dados mesmo sem energia."
            ]
          }
        ],
        writtenPrompt: "Se o SSD já guarda os programas, por que o computador usa RAM em vez de executar tudo diretamente do SSD? Explique com suas palavras, sem copiar uma definição.",
        quiz: [
          {
            q: "Qual alternativa descreve melhor a função principal da CPU?",
            options: [
              "Guardar arquivos permanentemente",
              "Executar instruções",
              "Fornecer conexão com a internet",
              "Armazenar apenas imagens"
            ],
            answer: 1,
            explain: "A CPU executa instruções. Armazenamento persistente é função de SSD/HDD."
          },
          {
            q: "Quando um programa é aberto, qual fluxo simplificado é mais correto?",
            options: [
              "SSD → RAM → CPU",
              "CPU → SSD → RAM",
              "RAM → internet → CPU",
              "Tela → CPU → SSD"
            ],
            answer: 0,
            explain: "Os arquivos estão no armazenamento, partes necessárias são carregadas na RAM e a CPU executa instruções."
          },
          {
            q: "O que diferencia melhor RAM de SSD?",
            options: [
              "RAM é sempre maior",
              "SSD executa instruções e RAM não",
              "RAM é memória de trabalho rápida e volátil; SSD é armazenamento persistente",
              "Não existe diferença funcional"
            ],
            answer: 2,
            explain: "RAM prioriza acesso rápido durante o uso; SSD prioriza persistência."
          },
          {
            q: "Qual é uma função importante do sistema operacional?",
            options: [
              "Substituir fisicamente o processador",
              "Coordenar recursos como memória, processos, arquivos e dispositivos",
              "Guardar todos os dados apenas na internet",
              "Transformar RAM em SSD"
            ],
            answer: 1,
            explain: "O sistema operacional gerencia e abstrai recursos de hardware e fornece serviços aos programas."
          },
          {
            q: "Ter um SSD com muito espaço significa que o computador terá muita memória RAM?",
            options: [
              "Sim, porque armazenamento e RAM são a mesma coisa",
              "Sim, desde que o Windows esteja atualizado",
              "Não; capacidade de armazenamento e quantidade de RAM são recursos diferentes",
              "Somente em notebooks"
            ],
            answer: 2,
            explain: "Armazenamento e RAM são componentes diferentes e medem capacidades diferentes."
          }
        ]
      },

      {id:"m0-a2",number:2,title:"Bits, bytes e como informação vira número",duration:50,status:"locked"},
      {id:"m0-a3",number:3,title:"O que é um programa?",duration:50,status:"locked"},
      {id:"m0-a4",number:4,title:"Algoritmos antes dos computadores",duration:50,status:"locked"},
      {id:"m0-a5",number:5,title:"Variáveis: como um programa guarda valores",duration:55,status:"locked"},
      {id:"m0-a6",number:6,title:"Decisões: como programas escolhem caminhos",duration:55,status:"locked"},
      {id:"m0-a7",number:7,title:"Repetição: por que computadores são bons no trabalho braçal",duration:55,status:"locked"},
      {id:"m0-a8",number:8,title:"Como os dados são organizados",duration:55,status:"locked"},
      {id:"m0-a9",number:9,title:"Planilha x banco de dados",duration:60,status:"locked"},
      {id:"m0-a10",number:10,title:"Cliente, servidor e internet",duration:60,status:"locked"},
      {id:"m0-a11",number:11,title:"Front-end, back-end e APIs",duration:60,status:"locked"},
      {id:"m0-a12",number:12,title:"Como nasce um sistema",duration:65,status:"locked"}
    ]
  }
};
