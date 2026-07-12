# Estudo+ — Plataforma de Estudos

Site de estudos com categorias, conteúdo explicativo e quizzes interativos, feito em HTML, CSS e JavaScript puro (sem frameworks, sem build, sem instalação).

## Estrutura do projeto

```
/
├── index.html          → estrutura de todas as telas do site
├── css/
│   └── style.css       → todo o visual (cores, layout, animações)
├── js/
│   ├── questions.js    → conteúdo do site: categorias, assuntos, textos e perguntas
│   └── script.js       → lógica do site: navegação, quiz, progresso, busca, tema
├── assets/
│   ├── images/         → reservado para imagens futuras
│   └── icons/          → reservado para ícones futuros
└── README.md
```

## Como executar

Não é preciso instalar nada. Duas formas simples:

**Opção 1 — abrir direto**
Dê duplo clique em `index.html` e ele abre no navegador. (Em alguns navegadores a busca por assuntos pode ter pequenas limitações quando aberto assim, por restrições de segurança do próprio navegador para arquivos locais.)

**Opção 2 — servidor local (recomendado)**
Com Python instalado, abra um terminal na pasta do projeto e rode:

```
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador. Isso evita qualquer limitação de navegador com arquivos locais.

## Como o site funciona

- **Início** → mostra as categorias disponíveis.
- **Categoria** → mostra os assuntos daquela categoria em uma trilha de estudo.
- **Assunto** → mostra o conteúdo explicativo (texto, exemplos e destaques) antes do quiz.
- **Quiz** → uma pergunta de múltipla escolha por vez, com correção automática, feedback e barra de progresso.
- **Resultado** → resumo com acertos, erros, porcentagem e uma mensagem de incentivo.

O progresso de cada assunto (se foi concluído e a melhor nota) fica salvo no navegador via `localStorage` — ou seja, continua lá mesmo se você fechar a aba, mas é local daquele navegador/computador.

## Como adicionar conteúdo novo

Todo o conteúdo do site fica em **`js/questions.js`**. Você não precisa mexer em nenhum outro arquivo para adicionar, remover ou editar categorias, assuntos ou perguntas — o próprio `js/questions.js` tem um comentário no topo explicando o formato, e um resumo rápido está abaixo.

### Adicionar uma pergunta a um assunto existente

Dentro do assunto, no array `questions`, copie um bloco existente e ajuste os textos:

```js
{
  question: "Texto da pergunta",
  options: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
  answer: 1, // índice da alternativa correta (0 = primeira, 1 = segunda, etc.)
  explanation: "Explicação de por que essa é a resposta certa"
}
```

### Adicionar um assunto novo a uma categoria

Copie um bloco de assunto inteiro (de `id` até o fechamento de `questions`) dentro do array `subjects` da categoria desejada, e edite:

```js
{
  id: "novo-assunto",        // único dentro da categoria, sem espaços/acentos
  title: "Nome do Assunto",
  summary: "Frase curta que aparece no card",
  minutes: 6,                 // tempo estimado de leitura
  content: [
    {
      heading: "Subtítulo da seção",
      paragraphs: ["Primeiro parágrafo.", "Segundo parágrafo."],
      example: "Texto de exemplo prático (opcional)",
      highlight: "Informação importante em destaque (opcional)"
    }
  ],
  questions: [ /* mesmo formato do item anterior */ ]
}
```

### Adicionar uma categoria nova

Copie um bloco de categoria inteiro (de `id` até o fechamento de `subjects`) e cole no final do array `CATEGORIES`:

```js
{
  id: "nova-categoria",
  name: "Nome da Categoria",
  description: "Frase curta sobre a categoria",
  icon: "math", // use "math", "language" ou "science" — ou adicione um novo ícone
  subjects: [ /* assuntos, no formato acima */ ]
}
```

Para usar um ícone novo, abra `js/script.js`, procure o objeto `ICONS` no topo do arquivo, e adicione uma nova chave com o SVG desejado (mesmo padrão de traço 2px usado nos ícones existentes).

## Personalização visual

Todas as cores, fontes e espaçamentos do site são controlados por variáveis no topo de `css/style.css` (dentro de `:root` para o modo claro e `[data-theme="dark"]` para o modo escuro). Alterar uma variável ali muda o site inteiro de forma consistente — não é necessário procurar cores espalhadas pelo arquivo.

## Recursos incluídos

- Categorias → assuntos → conteúdo de estudo → quiz, totalmente navegável.
- Quiz de múltipla escolha com correção automática, feedback visual (verde/vermelho) e explicação de cada resposta.
- Barra de progresso e contador de acertos durante o quiz.
- Tela de resultado com acertos, erros, porcentagem e mensagem de incentivo.
- Progresso salvo automaticamente no navegador (localStorage), sem necessidade de login.
- Busca de assuntos pelo cabeçalho.
- Modo claro/escuro, com preferência salva.
- Layout responsivo (celular, tablet e computador).
- Animações leves de transição, sem prejudicar a performance.
