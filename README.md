# Academia Tecnológica — V0.2

Versão funcional da plataforma individual de formação tecnológica.

## O que entrou nesta versão

- Módulo 0 estruturado com 12 aulas;
- Aula 1 completa;
- conteúdo pedagógico com fundamentos e contexto histórico;
- exercício escrito salvo no navegador;
- teste interativo com 5 questões;
- correção e feedback por questão;
- melhor nota persistida;
- critério de domínio: explicação escrita + pelo menos 80%;
- progresso de Fundamentos recalculado automaticamente;
- interface preparada para receber o vídeo da Aula 1;
- PWA/offline atualizado.

## Critério pedagógico

A plataforma não considera uma aula concluída apenas porque foi aberta.
Aula dominada = demonstração de compreensão + avaliação mínima.

## Próxima etapa

1. validar a Aula 1;
2. gerar o vídeo explicativo da Aula 1;
3. criar a Aula 2;
4. implementar revisão espaçada e registro de tempo real de estudo.


## V0.2.1 — Hotfix de cache

- assets versionados;
- catálogo de aulas com fallback HTML;
- remoção temporária do service worker;
- limpeza automática de caches antigos;
- aviso explícito caso course.js não carregue.

Motivo: evitar versões diferentes entre desktop e celular durante o desenvolvimento ativo.

---

## Project overview / Visão do projeto (October 2026)

Academia Tecnológica is a personal learning platform under development. It uses HTML, CSS and vanilla JavaScript; no account or paid service is needed to try the public demo.

- **Live demo:** https://krisleyvz.github.io/academia-tecnologica/
- **Current scope:** the roadmap lists 12 lessons on technology fundamentals. Lesson 1 is available; the other 11 are locked/planned, not completed content.
- **Lesson 1:** explanatory content, a written reflection and a five-question quiz with feedback. Mastery requires a written answer of at least 30 characters and a best quiz score of at least 80%.
- **Progress:** stored only in the browser's `localStorage`; it does not sync across devices and can be lost if browser data is cleared.
- **Offline status:** offline access is not guaranteed; the current service worker unregisters itself and clears old caches.

### Try it locally

From the repository directory, run `python -m http.server 8000` and open `http://localhost:8000/` in your browser. No build step or backend is required for the current public lesson.

### Version labels

The V0.2/V0.2.1 sections above are historical notes preserved from earlier work. The current page title says V0.7, but this is an interface label, **not** a claim that all 12 lessons or offline mode are finished.

### Next improvements

Complete and validate the next lesson; add automated checks for quiz/progress behavior; test the interface on mobile and desktop; then capture a verified screenshot for this README.
