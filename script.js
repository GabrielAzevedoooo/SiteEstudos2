/* ==========================================================================
   script.js
   ==========================================================================
   Este arquivo controla TODO o comportamento do site: trocar de tela,
   montar o conteúdo na tela a partir dos dados de js/questions.js, tocar
   o quiz, salvar o progresso no navegador (localStorage), a busca e o
   modo claro/escuro.

   O arquivo está organizado em blocos, na ordem em que o site funciona:

   1. Ícones (SVG usados nas categorias e botões)
   2. Estado da aplicação (o que está acontecendo agora na tela)
   3. Funções de progresso (localStorage)
   4. Navegação entre telas (mostrar/esconder views + breadcrumbs)
   5. Tela inicial (home)
   6. Tela de categoria (trilha de assuntos)
   7. Tela de estudo (conteúdo explicativo)
   8. Quiz (perguntas, respostas, feedback)
   9. Tela de resultado
   10. Busca de assuntos
   11. Modo claro/escuro
   12. Inicialização do site

   NÃO é preciso editar este arquivo para adicionar conteúdo novo — isso é
   feito em js/questions.js. Só mexa aqui se quiser mudar o FUNCIONAMENTO
   do site.
   ========================================================================== */

/* -------------------------------------------------------------------------
   1. Ícones
   ----------------------------------------------------------------------- */
const ICONS = {
  math:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M4 19V6"/><path d="M8 15l4-5 3 3 5-7"/></svg>',
  language:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1-5.5A8.38 8.38 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/><path d="M8 10h8M8 13.5h5"/></svg>',
  science:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M8.5 14h7"/></svg>',
};

const ICON_CHECK =
  '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

/* -------------------------------------------------------------------------
   2. Estado da aplicação
   ----------------------------------------------------------------------- */
const state = {
  categoryId: null,
  subjectId: null,
  quiz: {
    questions: [],
    index: 0,
    correct: 0,
    wrong: 0,
    answered: false,
  },
};

// Referências rápidas para os elementos do DOM usados com frequência
const el = (id) => document.getElementById(id);

/* -------------------------------------------------------------------------
   3. Funções de progresso (localStorage)
   ----------------------------------------------------------------------- */
const PROGRESS_KEY = "estudomais_progress";

function getAllProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function getSubjectProgress(subjectId) {
  const all = getAllProgress();
  return all[subjectId] || null;
}

function saveSubjectProgress(subjectId, data) {
  const all = getAllProgress();
  all[subjectId] = { ...all[subjectId], ...data };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
}

/* -------------------------------------------------------------------------
   4. Navegação entre telas
   ----------------------------------------------------------------------- */
function showView(viewId) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
  el(viewId).classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function findCategory(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId) || null;
}

function findSubject(categoryId, subjectId) {
  const cat = findCategory(categoryId);
  if (!cat) return null;
  return cat.subjects.find((s) => s.id === subjectId) || null;
}

// Monta a trilha de "migalhas de pão" (breadcrumbs) no cabeçalho
function updateBreadcrumbs(crumbs) {
  const wrap = el("breadcrumbs");
  if (!crumbs || crumbs.length === 0) {
    wrap.classList.remove("is-visible");
    wrap.innerHTML = "";
    return;
  }
  wrap.classList.add("is-visible");
  wrap.innerHTML = crumbs
    .map((crumb, i) => {
      const isLast = i === crumbs.length - 1;
      const sep = i > 0 ? '<span aria-hidden="true">/</span>' : "";
      if (isLast) {
        return `${sep}<span>${crumb.label}</span>`;
      }
      return `${sep}<button data-crumb="${i}">${crumb.label}</button>`;
    })
    .join(" ");

  wrap.querySelectorAll("button[data-crumb]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const crumb = crumbs[Number(btn.dataset.crumb)];
      crumb.action();
    });
  });
}

/* -------------------------------------------------------------------------
   5. Tela inicial (home)
   ----------------------------------------------------------------------- */
function goHome() {
  state.categoryId = null;
  state.subjectId = null;
  renderHomeStats();
  renderCategoryGrid();
  updateBreadcrumbs([]);
  showView("view-home");
}

function renderHomeStats() {
  const totalSubjects = CATEGORIES.reduce((sum, c) => sum + c.subjects.length, 0);
  const progress = getAllProgress();
  const completed = Object.values(progress).filter((p) => p.completed).length;

  el("stat-categories").textContent = CATEGORIES.length;
  el("stat-subjects").textContent = totalSubjects;
  el("stat-completed").textContent = completed;
}

function renderCategoryGrid() {
  const grid = el("category-grid");
  grid.innerHTML = CATEGORIES.map((cat) => {
    const icon = ICONS[cat.icon] || ICONS.math;
    return `
      <button class="category-card" data-category="${cat.id}">
        <div class="category-card__icon">${icon}</div>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        <div class="category-card__meta">${cat.subjects.length} assunto${cat.subjects.length > 1 ? "s" : ""}</div>
      </button>
    `;
  }).join("");

  grid.querySelectorAll("[data-category]").forEach((card) => {
    card.addEventListener("click", () => goCategory(card.dataset.category));
  });
}

/* -------------------------------------------------------------------------
   6. Tela de categoria (trilha de assuntos)
   ----------------------------------------------------------------------- */
function goCategory(categoryId) {
  const cat = findCategory(categoryId);
  if (!cat) return goHome();

  state.categoryId = categoryId;
  state.subjectId = null;

  el("category-title").textContent = cat.name;
  el("category-description").textContent = cat.description;
  renderTrail(cat);

  updateBreadcrumbs([
    { label: "Início", action: goHome },
    { label: cat.name },
  ]);
  showView("view-category");
}

function renderTrail(cat) {
  const trail = el("trail");
  trail.innerHTML = cat.subjects
    .map((subj, i) => {
      const progress = getSubjectProgress(subj.id);
      const isComplete = !!(progress && progress.completed);
      return `
        <div class="trail-node ${isComplete ? "is-complete" : ""}" style="animation-delay:${i * 70}ms">
          <span class="trail-node__dot"></span>
          <button class="trail-card" data-subject="${subj.id}">
            <div class="trail-card__top">
              <h3>${subj.title}</h3>
              ${isComplete ? `<span class="badge badge-done">${ICON_CHECK} concluído</span>` : ""}
            </div>
            <p>${subj.summary}</p>
            <div class="trail-card__meta">~${subj.minutes} min de leitura ${
        progress ? `· melhor resultado: ${progress.bestPercent}%` : ""
      }</div>
          </button>
        </div>
      `;
    })
    .join("");

  trail.querySelectorAll("[data-subject]").forEach((card) => {
    card.addEventListener("click", () => goStudy(cat.id, card.dataset.subject));
  });
}

/* -------------------------------------------------------------------------
   7. Tela de estudo (conteúdo explicativo)
   ----------------------------------------------------------------------- */
function goStudy(categoryId, subjectId) {
  const cat = findCategory(categoryId);
  const subj = findSubject(categoryId, subjectId);
  if (!cat || !subj) return goHome();

  state.categoryId = categoryId;
  state.subjectId = subjectId;

  el("study-eyebrow").textContent = `${cat.name} · ~${subj.minutes} min de leitura`;
  el("study-title").textContent = subj.title;
  el("study-content").innerHTML = subj.content
    .map(
      (section) => `
      <div class="study-section">
        <h2>${section.heading}</h2>
        ${section.paragraphs.map((p) => `<p>${p}</p>`).join("")}
        ${
          section.example
            ? `<div class="study-example"><span class="study-example__label">Exemplo prático</span>${section.example}</div>`
            : ""
        }
        ${
          section.highlight
            ? `<div class="study-highlight"><span class="study-highlight__label">Importante</span>${section.highlight}</div>`
            : ""
        }
      </div>
    `
    )
    .join("");

  updateBreadcrumbs([
    { label: "Início", action: goHome },
    { label: cat.name, action: () => goCategory(cat.id) },
    { label: subj.title },
  ]);
  showView("view-study");
}

/* -------------------------------------------------------------------------
   8. Quiz
   ----------------------------------------------------------------------- */
function goQuiz(categoryId, subjectId) {
  const subj = findSubject(categoryId, subjectId);
  if (!subj) return goHome();

  state.categoryId = categoryId;
  state.subjectId = subjectId;
  state.quiz = {
    questions: subj.questions,
    index: 0,
    correct: 0,
    wrong: 0,
    answered: false,
  };

  el("quiz-title").textContent = subj.title;
  renderQuestion();
  showView("view-quiz");
}

function renderQuestion() {
  const { questions, index } = state.quiz;
  const q = questions[index];
  const letters = ["A", "B", "C", "D"];

  // Barra de progresso e placar
  const progressPercent = Math.round((index / questions.length) * 100);
  el("quiz-progress-fill").style.width = `${progressPercent}%`;
  el("quiz-progress-caption").textContent = `Pergunta ${index + 1} de ${questions.length}`;
  el("quiz-score").textContent = `${state.quiz.correct} acerto${state.quiz.correct === 1 ? "" : "s"}`;

  const card = el("question-card");
  card.innerHTML = `
    <h2>${q.question}</h2>
    <ul class="options-list">
      ${q.options
        .map(
          (opt, i) => `
        <li>
          <button class="option" data-index="${i}">
            <span class="option__letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>
        </li>
      `
        )
        .join("")}
    </ul>
    <div id="feedback-slot"></div>
    <div class="quiz-footer" id="quiz-footer-slot"></div>
  `;

  card.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(Number(btn.dataset.index)));
  });
}

function handleAnswer(chosenIndex) {
  if (state.quiz.answered) return; // evita clicar duas vezes
  state.quiz.answered = true;

  const q = state.quiz.questions[state.quiz.index];
  const isCorrect = chosenIndex === q.answer;

  if (isCorrect) {
    state.quiz.correct += 1;
  } else {
    state.quiz.wrong += 1;
  }

  // Colore as alternativas e desabilita os cliques
  document.querySelectorAll(".option").forEach((btn) => {
    const i = Number(btn.dataset.index);
    btn.disabled = true;

    if (i === q.answer) {
      btn.classList.add("is-correct");
    } else if (i === chosenIndex) {
      btn.classList.add("is-wrong");
    } else {
      btn.classList.add("is-faded");
    }
  });

  // Mostra a mensagem de acerto/erro com a explicação
  const feedback = isCorrect
    ? `<div class="feedback is-correct"><strong>Muito bem, você acertou! 🎉</strong>${q.explanation}</div>`
    : `<div class="feedback is-wrong"><strong>Não foi dessa vez.</strong>A alternativa correta é "${
        q.options[q.answer]
      }". ${q.explanation}</div>`;
  el("feedback-slot").innerHTML = feedback;

  const isLast = state.quiz.index === state.quiz.questions.length - 1;
  el("quiz-footer-slot").innerHTML = `
    <button class="btn btn-primary" id="btn-next-question">
      ${isLast ? "Ver resultado" : "Próxima pergunta"}
    </button>
  `;
  el("btn-next-question").addEventListener("click", nextQuestion);

  // Atualiza o placar e a barra de progresso imediatamente
  el("quiz-score").textContent = `${state.quiz.correct} acerto${state.quiz.correct === 1 ? "" : "s"}`;
  const progressPercent = Math.round(((state.quiz.index + 1) / state.quiz.questions.length) * 100);
  el("quiz-progress-fill").style.width = `${progressPercent}%`;
}

function nextQuestion() {
  if (state.quiz.index < state.quiz.questions.length - 1) {
    state.quiz.index += 1;
    state.quiz.answered = false;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

/* -------------------------------------------------------------------------
   9. Tela de resultado
   ----------------------------------------------------------------------- */
function finishQuiz() {
  const { correct, wrong, questions } = state.quiz;
  const total = questions.length;
  const percent = Math.round((correct / total) * 100);

  // Salva o progresso deste assunto
  saveSubjectProgress(state.subjectId, {
    completed: true,
    bestPercent: Math.max(percent, (getSubjectProgress(state.subjectId) || {}).bestPercent || 0),
    lastCorrect: correct,
    lastTotal: total,
  });

  el("results-correct").textContent = correct;
  el("results-wrong").textContent = wrong;
  el("results-percent").textContent = `${percent}%`;

  // Anima o anel de progresso (circunferência = 2 * pi * raio, raio = 52)
  const circumference = 2 * Math.PI * 52;
  const ring = el("ring-value");
  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference}`;
  // pequeno delay para a transição CSS ser percebida
  requestAnimationFrame(() => {
    setTimeout(() => {
      ring.style.strokeDashoffset = `${circumference - (percent / 100) * circumference}`;
    }, 80);
  });

  let message;
  if (percent === 100) {
    message = `Perfeito! Você acertou todas as ${total} perguntas. Esse assunto já está dominado.`;
  } else if (percent >= 70) {
    message = `Muito bom! Você acertou ${correct} de ${total} perguntas (${percent}%). Reveja os pontos que errou e continue estudando.`;
  } else if (percent >= 40) {
    message = `Você acertou ${correct} de ${total} perguntas (${percent}%). Vale a pena reler o conteúdo antes de tentar novamente.`;
  } else {
    message = `Você acertou ${correct} de ${total} perguntas (${percent}%). Sem problemas — volte ao conteúdo e tente de novo, o progresso vem com a prática.`;
  }
  el("results-message").textContent = message;

  updateBreadcrumbs([
    { label: "Início", action: goHome },
    { label: findCategory(state.categoryId).name, action: () => goCategory(state.categoryId) },
    { label: "Resultado" },
  ]);
  showView("view-results");
}

/* -------------------------------------------------------------------------
   10. Busca de assuntos
   ----------------------------------------------------------------------- */
function buildSearchIndex() {
  const index = [];
  CATEGORIES.forEach((cat) => {
    cat.subjects.forEach((subj) => {
      index.push({
        categoryId: cat.id,
        categoryName: cat.name,
        subjectId: subj.id,
        title: subj.title,
        summary: subj.summary,
      });
    });
  });
  return index;
}

function initSearch() {
  const searchIndex = buildSearchIndex();
  const input = el("search-input");
  const results = el("search-results");

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      results.classList.add("hidden");
      results.innerHTML = "";
      return;
    }

    const matches = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = `<div class="result-empty">Nenhum assunto encontrado para "${query}".</div>`;
    } else {
      results.innerHTML = matches
        .map(
          (m) => `
        <button data-category="${m.categoryId}" data-subject="${m.subjectId}">
          ${m.title}
          <span class="result-path">${m.categoryName}</span>
        </button>
      `
        )
        .join("");
    }
    results.classList.remove("hidden");
  }

  input.addEventListener("input", (e) => renderResults(e.target.value));
  input.addEventListener("focus", (e) => {
    if (e.target.value.trim()) renderResults(e.target.value);
  });

  results.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-subject]");
    if (!btn) return;
    goStudy(btn.dataset.category, btn.dataset.subject);
    input.value = "";
    results.classList.add("hidden");
  });

  // Fecha o dropdown ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) {
      results.classList.add("hidden");
    }
  });
}

/* -------------------------------------------------------------------------
   11. Modo claro/escuro
   ----------------------------------------------------------------------- */
const THEME_KEY = "estudomais_theme";

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  el("btn-theme-toggle").addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  });
}

/* -------------------------------------------------------------------------
   12. Inicialização do site
   ----------------------------------------------------------------------- */
function bindStaticButtons() {
  el("btn-go-home").addEventListener("click", goHome);
  el("btn-back-to-home").addEventListener("click", goHome);
  el("btn-back-to-category").addEventListener("click", () => goCategory(state.categoryId));
  el("btn-start-quiz").addEventListener("click", () => goQuiz(state.categoryId, state.subjectId));
  el("btn-retry-quiz").addEventListener("click", () => goQuiz(state.categoryId, state.subjectId));
  el("btn-results-continue").addEventListener("click", () => goCategory(state.categoryId));
}

function hideLoadingScreen() {
  const screen = el("loading-screen");
  // pequeno atraso proposital para a transição não parecer um "piscar" abrupto
  setTimeout(() => screen.classList.add("is-hidden"), 350);
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  bindStaticButtons();
  initSearch();
  goHome();
  hideLoadingScreen();
});
