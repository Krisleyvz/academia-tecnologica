
const navItems = [...document.querySelectorAll('.nav-item')];
const views = [...document.querySelectorAll('.view')];
const title = document.getElementById('page-title');
let lastView = localStorage.getItem('academia:lastView') || 'overview';
let activeLessonId = localStorage.getItem('academia:activeLesson') || 'm0-a1';

const labels = {
  overview:'Visão geral',
  trail:'Trilha',
  lessons:'Aulas',
  projects:'Projetos',
  progress:'Progresso',
  library:'Biblioteca'
};

function showView(id){
  if(id !== 'lesson'){
    lastView = id;
    localStorage.setItem('academia:lastView', id);
  }
  views.forEach(v => v.classList.toggle('active', v.id === id));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.view === id));
  title.textContent = id === 'lesson' ? 'Aula' : (labels[id] || 'Academia');
  window.scrollTo({top:0,behavior:'smooth'});
}

navItems.forEach(item => item.addEventListener('click', () => showView(item.dataset.view)));
document.querySelectorAll('[data-view-target]').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.viewTarget)));
document.querySelector('[data-back]')?.addEventListener('click', () => showView(lastView));

// Data atual
(function(){
  const el = document.getElementById('today-label');
  if(!el) return;
  const now = new Date();
  const weekday = new Intl.DateTimeFormat('pt-BR',{weekday:'long'}).format(now).replace('-feira','');
  const day = String(now.getDate()).padStart(2,'0');
  const month = new Intl.DateTimeFormat('pt-BR',{month:'short'}).format(now).replace('.','');
  const year = now.getFullYear();
  el.textContent = `${weekday.toUpperCase()} · ${day} ${month.toUpperCase()} ${year}`;
})();


if(!window.COURSE || !window.COURSE.module || !Array.isArray(window.COURSE.module.lessons)){
  console.error('Academia: course.js não carregou.');
  const list = document.getElementById('lesson-list');
  if(list){
    const notice = document.createElement('div');
    notice.className = 'load-warning';
    notice.innerHTML = '<strong>O conteúdo não carregou por completo.</strong><span>Atualize a página para buscar a versão mais recente.</span>';
    list.prepend(notice);
  }
} else {
function getLesson(id){
  return window.COURSE.module.lessons.find(l => l.id === id);
}

function storageKey(lessonId, kind){
  return `academia:${lessonId}:${kind}`;
}

function getLessonState(id){
  return {
    written: localStorage.getItem(storageKey(id,'written')) || '',
    bestScore: Number(localStorage.getItem(storageKey(id,'bestScore')) || 0),
    mastered: localStorage.getItem(storageKey(id,'mastered')) === 'true'
  };
}

function renderLessonList(){
  const list = document.getElementById('lesson-list');
  if(!list) return;
  list.innerHTML = '';

  window.COURSE.module.lessons.forEach(lesson => {
    const st = getLessonState(lesson.id);
    const isA1 = lesson.id === 'm0-a1';
    const row = document.createElement(isA1 ? 'button' : 'div');
    row.className = 'lesson-row ' + (st.mastered ? 'mastered' : (isA1 ? 'current' : 'locked'));

    if(isA1){
      row.innerHTML = `
        <span>${String(lesson.number).padStart(2,'0')}</span>
        <div>
          <small>${st.mastered ? 'DOMINADA' : 'EM ANDAMENTO'}</small>
          <b>${lesson.title}</b>
        </div>
        <span>${st.mastered ? '' : '→'}</span>
      `;
      row.addEventListener('click', () => openLesson(lesson.id));
    } else {
      row.innerHTML = `
        <span>${String(lesson.number).padStart(2,'0')}</span>
        <div>
          <small>EM CONSTRUÇÃO</small>
          <b>${lesson.title}</b>
        </div>
        <span>—</span>
      `;
    }
    list.appendChild(row);
  });
}

function renderSections(lesson){
  const container = document.getElementById('lesson-sections');
  container.innerHTML = '';
  lesson.sections.forEach((section, idx) => {
    const div = document.createElement('div');
    div.className = 'lesson-section';
    div.innerHTML = `
      <small>${section.eyebrow}</small>
      <h3>${section.title}</h3>
      ${section.paragraphs.map(p => `<p>${p}</p>`).join('')}
    `;
    container.appendChild(div);

    if(idx === 0){
      const note = document.createElement('div');
      note.className = 'history-note';
      note.textContent = 'Ideia-chave: estudamos a história apenas quando ela explica por que a tecnologia assumiu a forma que tem hoje.';
      div.appendChild(note);
    }
  });
}

function renderQuiz(lesson){
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  lesson.quiz.forEach((item, idx) => {
    const block = document.createElement('div');
    block.className = 'quiz-question';
    block.dataset.q = idx;
    block.innerHTML = `
      <h4>${idx+1}. ${item.q}</h4>
      ${item.options.map((op, oi) => `
        <label class="quiz-option">
          <input type="radio" name="q${idx}" value="${oi}">
          <span>${op}</span>
        </label>
      `).join('')}
      <div class="quiz-feedback"></div>
    `;
    container.appendChild(block);
  });
}

function updateLessonStatus(lesson){
  const st = getLessonState(lesson.id);
  const writtenOk = st.written.trim().length >= 30;
  document.getElementById('side-written').textContent = writtenOk ? 'registrada' : 'pendente';
  document.getElementById('side-score').textContent = st.bestScore ? `${st.bestScore}%` : '—';
  document.getElementById('side-mastery').textContent = st.mastered ? 'dominada' : 'em estudo';

  const box = document.getElementById('mastery-box');
  if(st.mastered){
    box.classList.add('mastered');
    box.innerHTML = `
      <small>DOMÍNIO CONFIRMADO</small>
      <h3>Aula 1 dominada.</h3>
      <p>Você registrou sua explicação e alcançou a nota mínima. O próximo conteúdo será liberado quando a Aula 2 entrar na plataforma.</p>
    `;
  }else{
    box.classList.remove('mastered');
    box.innerHTML = `
      <small>DOMÍNIO</small>
      <h3>Aula ainda não dominada.</h3>
      <p>Complete a explicação escrita e alcance pelo menos ${lesson.masteryScore}% no teste.</p>
    `;
  }
  renderLessonList();
  updateDashboard();
}

function openLesson(id){
  activeLessonId = id;
  localStorage.setItem('academia:activeLesson',id);
  const lesson = getLesson(id);
  if(!lesson || !lesson.sections) return;

  document.getElementById('lesson-eyebrow').textContent = `MÓDULO 0 · AULA ${String(lesson.number).padStart(2,'0')}`;
  document.getElementById('lesson-title').textContent = lesson.title;
  document.getElementById('lesson-summary').textContent = 'Compreensão conceitual antes de ferramentas e comandos.';
  document.getElementById('written-prompt').textContent = lesson.writtenPrompt;

  renderSections(lesson);
  renderQuiz(lesson);

  const st = getLessonState(id);
  const textarea = document.getElementById('written-answer');
  textarea.value = st.written;

  const status = document.getElementById('answer-status');
  status.textContent = st.written ? 'Resposta salva neste navegador.' : '';

  document.getElementById('save-written').onclick = () => {
    const val = textarea.value.trim();
    localStorage.setItem(storageKey(id,'written'), val);
    status.textContent = val.length >= 30
      ? 'Resposta registrada.'
      : 'Resposta salva, mas ainda está curta para contar como explicação de domínio.';
    checkMastery(lesson);
  };

  document.getElementById('submit-quiz').onclick = () => submitQuiz(lesson);
  document.getElementById('quiz-result').className = 'quiz-result';
  document.getElementById('quiz-result').innerHTML = '';

  updateLessonStatus(lesson);
  showView('lesson');
}

function submitQuiz(lesson){
  let correct = 0;
  let answered = 0;

  lesson.quiz.forEach((item, idx) => {
    const block = document.querySelector(`.quiz-question[data-q="${idx}"]`);
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    const feedback = block.querySelector('.quiz-feedback');

    block.classList.remove('correct','wrong');
    if(!selected){
      feedback.textContent = 'Questão não respondida.';
      block.classList.add('wrong');
      return;
    }

    answered++;
    const val = Number(selected.value);
    if(val === item.answer){
      correct++;
      block.classList.add('correct');
      feedback.textContent = `Correto. ${item.explain}`;
    }else{
      block.classList.add('wrong');
      feedback.textContent = `Ainda não. ${item.explain}`;
    }
  });

  const score = Math.round((correct / lesson.quiz.length) * 100);
  const key = storageKey(lesson.id,'bestScore');
  const currentBest = Number(localStorage.getItem(key) || 0);
  if(score > currentBest) localStorage.setItem(key, String(score));

  const result = document.getElementById('quiz-result');
  result.className = 'quiz-result visible';
  result.innerHTML = answered < lesson.quiz.length
    ? `<strong>${score}%</strong> — você deixou ${lesson.quiz.length-answered} questão(ões) sem resposta.`
    : `<strong>${score}%</strong> — ${score >= lesson.masteryScore ? 'nota mínima alcançada.' : 'ainda abaixo da nota mínima de domínio.'}`;

  checkMastery(lesson);
}

function checkMastery(lesson){
  const st = getLessonState(lesson.id);
  const writtenOk = st.written.trim().length >= 30;
  const scoreOk = st.bestScore >= lesson.masteryScore;
  if(writtenOk && scoreOk){
    localStorage.setItem(storageKey(lesson.id,'mastered'),'true');
    if(!localStorage.getItem(storageKey(lesson.id,'masteredAt'))){
      localStorage.setItem(storageKey(lesson.id,'masteredAt'), new Date().toISOString());
    }
  }
  updateLessonStatus(lesson);
}

function updateDashboard(){
  const mastered = window.COURSE.module.lessons.filter(l => getLessonState(l.id).mastered).length;
  const percent = Math.round((mastered / window.COURSE.module.lessons.length) * 100);

  document.querySelectorAll('.progress-line i').forEach(el => el.style.width = `${percent}%`);

  const skill = document.querySelector('.active-skill strong');
  if(skill) skill.textContent = `${String(percent).padStart(2,'0')}%`;

  const masteryRow = [...document.querySelectorAll('.mastery-row')].find(r => r.querySelector('span')?.textContent === 'Fundamentos');
  if(masteryRow){
    masteryRow.querySelector('i').style.width = `${percent}%`;
    masteryRow.querySelector('b').textContent = `${String(percent).padStart(2,'0')}%`;
  }

  const lessonMetric = [...document.querySelectorAll('.metric')].find(m => m.querySelector('small')?.textContent === 'AULAS');
  if(lessonMetric) lessonMetric.querySelector('strong').textContent = mastered;

  const sidebarMuted = document.querySelector('.sidebar-foot .muted');
  if(sidebarMuted) sidebarMuted.textContent = `Módulo 0 · ${mastered}/12`;
}

// Continue button
document.querySelectorAll('[data-open-lesson]').forEach(btn => {
  btn.addEventListener('click', () => openLesson(activeLessonId));
});

renderLessonList();
updateDashboard();

}

document.getElementById('fallback-a1')?.addEventListener('click', () => {
  if(window.COURSE) openLesson('m0-a1');
});
