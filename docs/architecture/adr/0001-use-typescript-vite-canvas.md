# ADR 0001 — Usar TypeScript, Vite e HTML5 Canvas

## Status

Aceita.

## Contexto

O projeto precisa ser simples de executar, fácil de publicar no GitHub Pages e adequado para um jogo arcade 2D pequeno.

## Decisão

Usar:

- TypeScript;
- Vite;
- HTML5 Canvas;
- CSS3.

## Consequências positivas

- Roda no navegador.
- Publicação estática simples.
- Boa experiência de desenvolvimento.
- TypeScript ajuda a IA a manter consistência.
- Canvas é suficiente para o escopo.

## Consequências negativas

- É necessário implementar algumas estruturas de jogo manualmente.
- Não haverá recursos prontos de engine como colisão avançada ou cenas complexas.

## Alternativas rejeitadas

### Phaser

Bom para jogos maiores, mas adiciona abstração e dependência que não são necessárias.

### Godot

Excelente engine, mas exagerada para este projeto web simples.

### Python/Pygame

Menos adequado para GitHub Pages e execução casual no navegador.

### React

Desnecessário para um jogo Canvas.
