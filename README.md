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
