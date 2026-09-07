const navItems = [...document.querySelectorAll('.nav-item')];
const views = [...document.querySelectorAll('.view')];
const title = document.getElementById('page-title');
let lastView = 'overview';

const labels = {
  overview:'Visão geral',
  trail:'Trilha',
  lessons:'Aulas',
  projects:'Projetos',
  progress:'Progresso',
  library:'Biblioteca'
};

function showView(id){
  if(id !== 'lesson') lastView = id;
  views.forEach(v => v.classList.toggle('active', v.id === id));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.view === id));
  title.textContent = id === 'lesson' ? 'Aula' : (labels[id] || 'Academia');
  window.scrollTo({top:0,behavior:'smooth'});
}

navItems.forEach(item => item.addEventListener('click', () => showView(item.dataset.view)));
document.querySelectorAll('[data-view-target]').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.viewTarget)));
document.querySelectorAll('[data-open-lesson]').forEach(btn => btn.addEventListener('click', () => showView('lesson')));
document.querySelector('[data-back]').addEventListener('click', () => showView(lastView));


// Data local dinâmica
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

// Persistência local da primeira resposta
(function(){
  const box = document.querySelector('.lesson-section textarea');
  if(!box) return;
  const key='academia:m0:a1:resposta1';
  box.value = localStorage.getItem(key) || '';
  const save = box.parentElement.querySelector('.primary.small');
  if(save){
    save.addEventListener('click',()=>{
      localStorage.setItem(key,box.value);
      const original=save.textContent;
      save.textContent='Resposta salva';
      setTimeout(()=>save.textContent=original,1200);
    });
  }
})();

// Lembra a última tela acessada
(function(){
  const originalShow = showView;
  window.showView = function(id){
    originalShow(id);
    if(id!=='lesson') localStorage.setItem('academia:lastView',id);
  };
})();

// PWA/offline
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
