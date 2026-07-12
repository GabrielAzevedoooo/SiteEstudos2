/* ==========================================================================
   questions.js
   ==========================================================================
   Este é o "banco de dados" da plataforma. Tudo o que aparece no site —
   categorias, assuntos, textos de estudo e perguntas do quiz — vem deste
   arquivo. Ele NÃO controla nenhum comportamento do site (isso fica no
   script.js). Você pode editar este arquivo com segurança para adicionar,
   remover ou mudar conteúdo, sem precisar entender o resto do código.

   ESTRUTURA GERAL
   ----------------
   const CATEGORIES = [
     {
       id:          string único (sem espaços/acentos) — usado internamente
       name:        nome exibido na tela
       description: frase curta que aparece no card da categoria
       icon:        um dos ícones definidos em ICONS (veja abaixo)
       subjects: [
         {
           id:            string único dentro da categoria
           title:         nome do assunto
           summary:       frase curta (aparece no card do assunto)
           minutes:       tempo estimado de estudo (só um número, ex: 6)
           content: [                         <- ÁREA DE ESTUDO
             {
               heading:    subtítulo da seção
               paragraphs: [ "texto...", "texto..." ]
               example:    "texto de exemplo prático" (opcional)
               highlight:  "informação importante em destaque" (opcional)
             },
             ...
           ],
           questions: [                       <- QUIZ
             {
               question:    "texto da pergunta",
               options:     ["A", "B", "C", "D"]  <- exatamente 4 itens
               answer:      índice (0, 1, 2 ou 3) da alternativa correta
               explanation: "por que essa é a resposta certa"
             },
             ...
           ]
         },
         ... (mais assuntos)
       ]
     },
     ... (mais categorias)
   ];

   COMO ADICIONAR UMA NOVA PERGUNTA
   ---------------------------------
   Vá até o assunto desejado, entre no array "questions" e copie um bloco
   { question, options, answer, explanation } already existente, ajustando
   os textos. Não precisa mexer em mais nada — o site atualiza sozinho.

   COMO ADICIONAR UM NOVO ASSUNTO
   --------------------------------
   Copie um bloco inteiro de assunto (de "id" até o fechamento de
   "questions") dentro do array "subjects" da categoria desejada, e troque
   o conteúdo. Lembre-se de usar um "id" que não se repita dentro da mesma
   categoria.

   COMO ADICIONAR UMA NOVA CATEGORIA
   ------------------------------------
   Copie um bloco inteiro de categoria (de "id" até o fechamento de
   "subjects") e cole no final do array CATEGORIES, antes do ] final.
   Escolha um "icon" dentre os disponíveis em ICONS (veja js/script.js,
   objeto ICONS, no topo do arquivo) ou adicione um novo ícone SVG lá.
   ========================================================================== */

const CATEGORIES = [
  {
    id: "matematica",
    name: "Matemática",
    description: "Números, operações e lógica do dia a dia.",
    icon: "math",
    subjects: [
      {
        id: "fracoes",
        title: "Frações",
        summary: "Entenda o que são partes de um todo.",
        minutes: 7,
        content: [
          {
            heading: "O que é uma fração?",
            paragraphs: [
              "Uma fração representa uma parte de um todo que foi dividido em partes iguais. Ela é escrita como dois números separados por um traço: o número de cima é o numerador e o número de baixo é o denominador.",
              "O denominador diz em quantas partes iguais o todo foi dividido. O numerador diz quantas dessas partes estamos considerando."
            ],
            example:
              "Se uma pizza é dividida em 8 pedaços iguais e você come 3 pedaços, você comeu 3/8 da pizza. Aqui, 3 é o numerador e 8 é o denominador.",
            highlight:
              "O denominador nunca pode ser zero — dividir algo em \"zero partes\" não faz sentido."
          },
          {
            heading: "Tipos de frações",
            paragraphs: [
              "Fração própria: o numerador é menor que o denominador (ex: 2/5). Representa uma quantidade menor que o inteiro.",
              "Fração imprópria: o numerador é maior ou igual ao denominador (ex: 7/4). Representa uma quantidade igual ou maior que o inteiro.",
              "Fração aparente: o numerador é múltiplo do denominador (ex: 8/4 = 2). Na prática, é um número inteiro escrito como fração."
            ]
          },
          {
            heading: "Simplificando frações",
            paragraphs: [
              "Simplificar uma fração significa reescrevê-la com números menores, sem mudar o valor que ela representa. Para isso, dividimos o numerador e o denominador pelo mesmo número.",
              "O jeito mais rápido é dividir os dois pelo maior divisor comum entre eles (o MDC)."
            ],
            example:
              "Na fração 12/16, o maior número que divide 12 e 16 ao mesmo tempo é 4. Dividindo os dois por 4: 12÷4 = 3 e 16÷4 = 4. Logo, 12/16 simplificada é 3/4."
          },
          {
            heading: "Somando e subtraindo frações",
            paragraphs: [
              "Quando as frações têm o mesmo denominador, basta somar (ou subtrair) os numeradores e manter o denominador.",
              "Quando os denominadores são diferentes, primeiro é preciso igualá-los, encontrando um denominador comum (geralmente o mínimo múltiplo comum, o MMC) antes de somar."
            ],
            example:
              "1/4 + 1/2: como 1/2 equivale a 2/4, a conta fica 1/4 + 2/4 = 3/4.",
            highlight:
              "Dica de ouro: nunca some ou subtraia os denominadores diretamente. Só os numeradores mudam quando o denominador já é igual."
          }
        ],
        questions: [
          {
            question: "Na fração 5/9, o que o número 9 representa?",
            options: [
              "A quantidade de partes que foram escolhidas",
              "Em quantas partes iguais o todo foi dividido",
              "O resultado da divisão de 5 por 9",
              "Um número que não tem função na fração"
            ],
            answer: 1,
            explanation:
              "O número de baixo (denominador) sempre indica em quantas partes iguais o todo foi repartido."
          },
          {
            question: "Qual das frações abaixo é uma fração imprópria?",
            options: ["3/8", "4/4", "9/5", "1/2"],
            answer: 2,
            explanation:
              "Em 9/5 o numerador (9) é maior que o denominador (5), o que caracteriza uma fração imprópria."
          },
          {
            question: "Simplificando a fração 10/15, qual é o resultado?",
            options: ["5/10", "2/3", "1/3", "10/15 já está simplificada"],
            answer: 1,
            explanation:
              "O maior divisor comum entre 10 e 15 é 5. Dividindo os dois números por 5, obtemos 2/3."
          },
          {
            question: "Quanto é 2/6 + 1/6?",
            options: ["3/12", "3/6", "1/2", "As duas últimas alternativas estão certas"],
            answer: 3,
            explanation:
              "Como os denominadores já são iguais, soma-se apenas os numeradores: 2/6 + 1/6 = 3/6, que simplificado é igual a 1/2."
          },
          {
            question: "Para somar 1/3 com 1/4, qual é o primeiro passo correto?",
            options: [
              "Somar 1+1 e 3+4 diretamente",
              "Encontrar um denominador comum entre 3 e 4",
              "Transformar as duas em números decimais",
              "Não é possível somar frações com denominadores diferentes"
            ],
            answer: 1,
            explanation:
              "Frações com denominadores diferentes precisam ser reescritas com um denominador comum (por exemplo, 12) antes de serem somadas."
          }
        ]
      },
      {
        id: "equacoes",
        title: "Equações do 1º grau",
        summary: "Descubra o valor de x passo a passo.",
        minutes: 8,
        content: [
          {
            heading: "O que é uma equação?",
            paragraphs: [
              "Uma equação é uma sentença matemática que afirma que duas expressões são iguais, e que contém uma ou mais letras (chamadas de incógnitas) representando valores desconhecidos.",
              "Uma equação do 1º grau é aquela em que a incógnita aparece apenas elevada ao expoente 1, sem multiplicações entre incógnitas."
            ],
            example: "3x + 5 = 20 é uma equação do 1º grau, onde x é a incógnita."
          },
          {
            heading: "A ideia da balança",
            paragraphs: [
              "Uma boa forma de entender uma equação é imaginar uma balança de dois pratos equilibrada. O sinal de igual (=) é o ponto de equilíbrio.",
              "Tudo o que você faz de um lado da equação (somar, subtrair, multiplicar ou dividir) precisa ser feito também do outro lado, para que a balança continue equilibrada."
            ],
            highlight:
              "Regra de ouro: o que você faz de um lado da equação, tem que fazer do outro lado também."
          },
          {
            heading: "Resolvendo passo a passo",
            paragraphs: [
              "Para descobrir o valor de x, o objetivo é isolá-lo em um dos lados da equação, movendo os demais números para o outro lado."
            ],
            example:
              "2x + 3 = 11 → subtraindo 3 dos dois lados: 2x = 8 → dividindo os dois lados por 2: x = 4."
          },
          {
            heading: "Incógnita nos dois lados",
            paragraphs: [
              "Às vezes a incógnita aparece nos dois lados da equação. Nesse caso, o primeiro passo é juntar todos os termos com x de um lado só, e os números do outro."
            ],
            example:
              "5x - 2 = 2x + 7 → subtraindo 2x dos dois lados: 3x - 2 = 7 → somando 2 nos dois lados: 3x = 9 → dividindo por 3: x = 3."
          }
        ],
        questions: [
          {
            question: "Na equação 4x - 3 = 9, qual é o valor de x?",
            options: ["1", "2", "3", "4"],
            answer: 2,
            explanation:
              "Somando 3 nos dois lados: 4x = 12. Dividindo os dois lados por 4: x = 3."
          },
          {
            question:
              "O que representa a incógnita em uma equação do 1º grau?",
            options: [
              "Um número fixo que nunca muda",
              "Um valor desconhecido que queremos descobrir",
              "O resultado final da conta",
              "Um erro de digitação na equação"
            ],
            answer: 1,
            explanation:
              "A incógnita (geralmente representada por x) é o valor desconhecido que a equação nos ajuda a encontrar."
          },
          {
            question:
              "Ao resolver uma equação, por que é importante fazer a mesma operação nos dois lados?",
            options: [
              "Porque isso deixa a equação mais bonita",
              "Para manter a igualdade (o equilíbrio) entre os dois lados",
              "Não é necessário, é só um costume",
              "Porque assim a equação vira uma multiplicação"
            ],
            answer: 1,
            explanation:
              "Alterar só um dos lados quebraria a igualdade. É preciso manter os dois lados equivalentes, como uma balança equilibrada."
          },
          {
            question: "Resolva: 5x + 2x = 21",
            options: ["x = 2", "x = 3", "x = 7", "x = 21"],
            answer: 1,
            explanation:
              "Somando os termos semelhantes: 7x = 21. Dividindo os dois lados por 7: x = 3."
          },
          {
            question: "Na equação 6x - 4 = 3x + 8, qual é o valor de x?",
            options: ["x = 2", "x = 3", "x = 4", "x = 12"],
            answer: 2,
            explanation:
              "Subtraindo 3x dos dois lados: 3x - 4 = 8. Somando 4: 3x = 12. Dividindo por 3: x = 4."
          }
        ]
      }
    ]
  },
  {
    id: "portugues",
    name: "Português",
    description: "Ortografia, leitura e interpretação de texto.",
    icon: "language",
    subjects: [
      {
        id: "ortografia",
        title: "Ortografia",
        summary: "As regras que evitam erros de escrita comuns.",
        minutes: 6,
        content: [
          {
            heading: "Por que a ortografia importa",
            paragraphs: [
              "Ortografia é o conjunto de regras que define a forma correta de escrever as palavras. Escrever corretamente facilita a leitura e evita mal-entendidos.",
              "A maioria dos erros de ortografia segue padrões — aprendendo esses padrões, fica mais fácil escrever bem sem precisar decorar cada palavra."
            ]
          },
          {
            heading: "Uso do S e do Z",
            paragraphs: [
              "Usa-se Z em palavras derivadas de outras que já têm Z, e em sufixos como -ez e -eza que indicam qualidade (beleza, rigidez).",
              "Usa-se S depois de ditongos e em sufixos que indicam nacionalidade, profissão ou adjetivo, como -ês e -esa (português, francesa)."
            ],
            example:
              "\"Beleza\" vem de \"belo\" + o sufixo -eza, por isso leva Z. Já \"português\" leva S porque indica nacionalidade."
          },
          {
            heading: "Uso do X e do CH",
            paragraphs: [
              "Usa-se X depois de ditongos (caixa, frouxo) e após a sílaba inicial \"en\" na maioria dos casos (enxame, enxugar).",
              "Uma exceção importante: quando a palavra vem de outra que já se escreve com CH, mantém-se o CH mesmo depois de \"en\" (encher, porque vem de cheio)."
            ],
            highlight:
              "Dica: se a palavra de origem tem CH, a palavra derivada também mantém CH — mesmo com \"en\" na frente."
          },
          {
            heading: "Por que, porque, por quê e porquê",
            paragraphs: [
              "\"Por que\" (separado, sem acento) é usado em perguntas ou antes de uma explicação: \"Por que você chegou atrasado?\".",
              "\"Porque\" (junto, sem acento) é usado para dar uma explicação ou resposta: \"Cheguei atrasado porque perdi o ônibus\".",
              "\"Por quê\" (separado, com acento) aparece no final de frases ou sozinho. \"Porquê\" (junto, com acento) é um substantivo, equivalente a \"motivo\": \"Ninguém sabe o porquê da demora\"."
            ]
          }
        ],
        questions: [
          {
            question: "Qual é a forma correta: \"A ___ do vestido era impressionante\"?",
            options: ["beleza", "beleza", "belesa", "belheza"],
            answer: 0,
            explanation:
              "\"Beleza\" vem de \"belo\" mais o sufixo -eza (que indica qualidade), por isso é escrita com Z."
          },
          {
            question: "Qual palavra é escrita corretamente com X?",
            options: ["enchugar", "enxugar", "enxame (com CH)", "chaxa"],
            answer: 1,
            explanation:
              "\"Enxugar\" segue a regra do X após a sílaba \"en\", já que não vem de uma palavra com CH."
          },
          {
            question:
              "Complete: \"Não fui à festa ___ estava doente.\"",
            options: ["por que", "porque", "por quê", "porquê"],
            answer: 1,
            explanation:
              "Quando a frase dá uma explicação (resposta), usa-se \"porque\" junto e sem acento."
          },
          {
            question: "Complete: \"Você não me disse ___ está triste.\"",
            options: ["por que", "porque", "por quê", "porquê"],
            answer: 0,
            explanation:
              "Antes de uma explicação dentro de uma pergunta indireta, usa-se \"por que\" separado e sem acento."
          },
          {
            question:
              "Qual sufixo geralmente indica nacionalidade ou adjetivo, sendo escrito com S?",
            options: ["-eza", "-ez", "-ês/-esa", "-oso"],
            answer: 2,
            explanation:
              "Sufixos como -ês e -esa (ex: português, francesa) indicam nacionalidade ou adjetivo e são escritos com S."
          }
        ]
      },
      {
        id: "interpretacao",
        title: "Interpretação de Texto",
        summary: "Como compreender o que um texto realmente diz.",
        minutes: 7,
        content: [
          {
            heading: "O que é interpretar um texto",
            paragraphs: [
              "Interpretar um texto é compreender não só as palavras escritas, mas também o sentido, a intenção do autor e as ideias que estão por trás delas.",
              "É diferente de apenas \"ler\": ler é decodificar as palavras; interpretar é entender o que elas significam no contexto."
            ]
          },
          {
            heading: "Ideia principal e detalhes",
            paragraphs: [
              "Todo texto costuma ter uma ideia principal — o assunto central que o autor quer transmitir — e ideias secundárias, que complementam ou exemplificam essa ideia principal.",
              "Uma boa estratégia é, ao final da leitura, tentar resumir o texto em uma única frase: essa frase costuma revelar a ideia principal."
            ],
            example:
              "Em um texto sobre os benefícios do sono, a ideia principal pode ser \"dormir bem melhora a saúde\", enquanto os detalhes são os benefícios específicos citados (memória, imunidade, humor)."
          },
          {
            heading: "Inferência",
            paragraphs: [
              "Inferir é concluir uma informação que não está escrita diretamente no texto, mas que pode ser deduzida a partir de pistas que o autor deixou.",
              "Cuidado: uma inferência precisa ser sustentada pelo texto. Não é a mesma coisa que \"imaginar qualquer coisa\" sobre o assunto."
            ],
            highlight:
              "Toda resposta de interpretação deve poder ser justificada com uma parte do texto — mesmo quando a informação está implícita."
          },
          {
            heading: "Tipos de texto",
            paragraphs: [
              "Texto narrativo: conta uma história, com personagens, tempo e espaço (contos, romances, notícias de fatos).",
              "Texto dissertativo-argumentativo: defende um ponto de vista sobre um tema, com argumentos.",
              "Texto descritivo: apresenta características de algo ou alguém, sem necessariamente contar uma ação."
            ]
          }
        ],
        questions: [
          {
            question:
              "Qual é a principal diferença entre \"ler\" e \"interpretar\" um texto?",
            options: [
              "Não existe diferença, são sinônimos",
              "Ler é reconhecer as palavras; interpretar é compreender o sentido delas",
              "Interpretar é só ler mais rápido",
              "Ler exige mais atenção do que interpretar"
            ],
            answer: 1,
            explanation:
              "Ler é decodificar o texto; interpretar vai além, envolvendo a compreensão do sentido e da intenção por trás das palavras."
          },
          {
            question:
              "Uma boa forma de identificar a ideia principal de um texto é:",
            options: [
              "Contar quantas palavras o texto tem",
              "Resumir o texto em uma única frase ao final da leitura",
              "Ler apenas a primeira palavra de cada parágrafo",
              "Ignorar os exemplos citados pelo autor"
            ],
            answer: 1,
            explanation:
              "Resumir o texto em uma frase ajuda a identificar o assunto central, que costuma ser a ideia principal."
          },
          {
            question: "O que caracteriza uma inferência correta?",
            options: [
              "Uma opinião pessoal sem relação com o texto",
              "Uma conclusão que pode ser justificada por pistas do texto",
              "Uma cópia exata de uma frase do texto",
              "Qualquer suposição, mesmo sem provas no texto"
            ],
            answer: 1,
            explanation:
              "Uma inferência válida sempre pode ser sustentada por pistas presentes no próprio texto, mesmo que a informação não esteja escrita diretamente."
          },
          {
            question: "Um texto que conta uma história com personagens e tempo é do tipo:",
            options: ["Descritivo", "Dissertativo-argumentativo", "Narrativo", "Nenhuma das anteriores"],
            answer: 2,
            explanation:
              "Textos narrativos apresentam uma sequência de fatos envolvendo personagens, tempo e espaço, como contos e notícias."
          },
          {
            question:
              "Em um texto dissertativo-argumentativo, o autor geralmente busca:",
            options: [
              "Apenas descrever um lugar ou objeto",
              "Contar uma história de ficção",
              "Defender um ponto de vista com argumentos",
              "Listar instruções passo a passo"
            ],
            answer: 2,
            explanation:
              "O texto dissertativo-argumentativo tem como objetivo defender uma opinião ou tese, sustentada por argumentos."
          }
        ]
      }
    ]
  },
  {
    id: "ciencias",
    name: "Ciências",
    description: "O universo, a matéria e como o mundo funciona.",
    icon: "science",
    subjects: [
      {
        id: "sistema-solar",
        title: "Sistema Solar",
        summary: "O Sol, os planetas e nossa vizinhança no espaço.",
        minutes: 6,
        content: [
          {
            heading: "O que é o Sistema Solar",
            paragraphs: [
              "O Sistema Solar é formado pelo Sol e por todos os corpos celestes que giram ao seu redor por causa da força da gravidade: planetas, luas, asteroides, cometas e planetas anões.",
              "O Sol é o centro do Sistema Solar e concentra mais de 99% de toda a massa do sistema."
            ]
          },
          {
            heading: "O Sol",
            paragraphs: [
              "O Sol é uma estrela — uma enorme esfera de gás em que ocorrem reações nucleares que liberam luz e calor.",
              "É graças à energia do Sol que a vida na Terra é possível, já que ele fornece luz para a fotossíntese e calor para manter temperaturas adequadas."
            ]
          },
          {
            heading: "Planetas rochosos e planetas gasosos",
            paragraphs: [
              "Os quatro planetas mais próximos do Sol — Mercúrio, Vênus, Terra e Marte — são chamados de rochosos ou telúricos, porque têm superfície sólida.",
              "Os quatro planetas mais distantes — Júpiter, Saturno, Urano e Netuno — são gigantes gasosos (ou gelados, no caso de Urano e Netuno), formados principalmente por gases e não possuem uma superfície sólida como a Terra."
            ],
            example:
              "Júpiter, o maior planeta do Sistema Solar, poderia conter mais de 1.300 planetas do tamanho da Terra em seu volume."
          },
          {
            heading: "A ordem dos planetas",
            paragraphs: [
              "A partir do Sol, a ordem dos planetas é: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno."
            ],
            highlight:
              "Dica para memorizar: \"Meu Velho Tio Marcos Já Só Usa Notebook\" — as iniciais seguem a ordem dos planetas."
          }
        ],
        questions: [
          {
            question: "O que está no centro do Sistema Solar?",
            options: ["A Terra", "A Lua", "O Sol", "Júpiter"],
            answer: 2,
            explanation:
              "O Sol é o centro do Sistema Solar, e todos os planetas giram ao seu redor por causa da gravidade."
          },
          {
            question: "Qual característica define um planeta \"rochoso\"?",
            options: [
              "Ser formado principalmente por gases",
              "Ter uma superfície sólida",
              "Estar mais longe do Sol",
              "Não ter gravidade"
            ],
            answer: 1,
            explanation:
              "Planetas rochosos, como a Terra e Marte, possuem uma superfície sólida, ao contrário dos gigantes gasosos."
          },
          {
            question: "Qual é o maior planeta do Sistema Solar?",
            options: ["Saturno", "Netuno", "Júpiter", "Terra"],
            answer: 2,
            explanation:
              "Júpiter é o maior planeta do Sistema Solar, um gigante gasoso muito maior que a Terra."
          },
          {
            question: "Qual planeta vem logo depois da Terra, na ordem a partir do Sol?",
            options: ["Vênus", "Marte", "Mercúrio", "Júpiter"],
            answer: 1,
            explanation:
              "A ordem a partir do Sol é: Mercúrio, Vênus, Terra e depois Marte."
          },
          {
            question: "Por que o Sol é fundamental para a vida na Terra?",
            options: [
              "Porque ele é feito de rocha, como a Terra",
              "Porque fornece luz e calor necessários para a vida",
              "Porque fica muito perto da Terra",
              "Porque é o menor corpo do Sistema Solar"
            ],
            answer: 1,
            explanation:
              "A luz e o calor do Sol são essenciais para a fotossíntese das plantas e para manter temperaturas adequadas à vida."
          }
        ]
      },
      {
        id: "estados-materia",
        title: "Estados da Matéria",
        summary: "Sólido, líquido, gasoso e o que causa essas mudanças.",
        minutes: 6,
        content: [
          {
            heading: "Os três estados físicos",
            paragraphs: [
              "Toda matéria pode existir em três estados físicos principais: sólido, líquido e gasoso.",
              "No estado sólido, as partículas estão bem próximas e organizadas, o que dá forma e volume fixos. No líquido, as partículas têm mais liberdade de movimento, então o volume é fixo, mas a forma se adapta ao recipiente. No gasoso, as partículas se movem livremente e ocupam todo o espaço disponível, sem forma nem volume fixos."
            ]
          },
          {
            heading: "Mudanças de estado",
            paragraphs: [
              "Fusão: passagem do estado sólido para o líquido (o gelo derretendo).",
              "Vaporização: passagem do estado líquido para o gasoso (a água fervendo).",
              "Condensação: passagem do estado gasoso para o líquido (o vapor virando gotas de água).",
              "Solidificação: passagem do estado líquido para o sólido (a água virando gelo).",
              "Sublimação: passagem direta do estado sólido para o gasoso, sem passar pelo estado líquido (o gelo-seco \"fumegando\")."
            ]
          },
          {
            heading: "O que causa essas mudanças",
            paragraphs: [
              "As mudanças de estado acontecem principalmente por variações de temperatura e de pressão.",
              "Ao aumentar a temperatura, geralmente fornecemos energia para as partículas se afastarem umas das outras (por exemplo, de sólido para líquido). Ao diminuir a temperatura, o efeito é o contrário."
            ],
            highlight:
              "A pressão também influencia: em locais de altitude elevada, onde a pressão é menor, a água ferve a uma temperatura mais baixa que 100°C."
          },
          {
            heading: "Exemplos do dia a dia",
            paragraphs: [
              "Perceber essas mudanças no dia a dia ajuda a fixar o conteúdo: o vidro embaçado do banheiro após um banho quente é condensação; o gelo que derrete fora do congelador é fusão."
            ],
            example:
              "Quando uma roupa molhada seca no varal, a água líquida se transforma em vapor (gás) e vai para o ar — isso é vaporização."
          }
        ],
        questions: [
          {
            question:
              "Em qual estado físico a matéria tem forma e volume fixos?",
            options: ["Sólido", "Líquido", "Gasoso", "Nenhum deles"],
            answer: 0,
            explanation:
              "No estado sólido, as partículas estão bem próximas e organizadas, o que garante forma e volume fixos."
          },
          {
            question: "Como se chama a passagem do estado líquido para o gasoso?",
            options: ["Fusão", "Vaporização", "Condensação", "Solidificação"],
            answer: 1,
            explanation:
              "Vaporização é o nome da mudança do estado líquido para o gasoso, como quando a água ferve."
          },
          {
            question:
              "O vidro do banheiro fica embaçado após um banho quente. Que mudança de estado ocorre?",
            options: ["Fusão", "Sublimação", "Condensação", "Vaporização"],
            answer: 2,
            explanation:
              "O vapor de água (gás) presente no ar quente encontra a superfície fria do vidro e se transforma em gotas líquidas — isso é condensação."
          },
          {
            question: "O que é a sublimação?",
            options: [
              "A passagem do líquido direto para o sólido",
              "A passagem do sólido direto para o gasoso, sem virar líquido",
              "O aumento da temperatura de um gás",
              "A mistura de dois líquidos diferentes"
            ],
            answer: 1,
            explanation:
              "Sublimação é a passagem direta do estado sólido para o gasoso, sem passar pelo estado líquido, como no caso do gelo-seco."
          },
          {
            question:
              "Em locais de altitude elevada, a água ferve a uma temperatura mais baixa que 100°C. Isso acontece principalmente por causa de:",
            options: [
              "Uma pressão atmosférica menor",
              "Uma temperatura do ar sempre mais alta",
              "A cor do céu nesses locais",
              "A quantidade de sal presente na água"
            ],
            answer: 0,
            explanation:
              "A pressão atmosférica mais baixa em altitudes elevadas faz com que a água entre em ebulição a uma temperatura menor."
          }
        ]
      }
    ]
  }
];
