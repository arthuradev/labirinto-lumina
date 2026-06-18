# Visão geral da arquitetura

Labirinto Lumina usa uma arquitetura simples de jogo web modular.

## Objetivo

Separar claramente:

- entrada;
- estado;
- regras;
- entidades;
- fases;
- renderização;
- áudio;
- telas.

## Mapa mental

```text
main.ts
  ↓
Game
  ↓
GameLoop + GameStateMachine
  ↓
Systems
  ↓
Entities + Levels + Core
  ↓
CanvasRenderer
```

## Regras principais

- `main.ts` inicializa.
- `Game` coordena.
- `GameLoop` controla tempo.
- `GameStateMachine` controla telas/estados.
- `systems/` aplica regras.
- `entities/` guarda estado.
- `levels/` guarda dados de fase.
- `rendering/` desenha.
- `core/` contém tipos e funções puras.

## O que deve permanecer simples

Este projeto não precisa de:

- ECS completo;
- engine própria complexa;
- injeção de dependência avançada;
- estado global complexo;
- backend;
- framework de UI.

## Ponto de atenção

Se `Game.ts` começar a concentrar todas as regras, a arquitetura deve ser revisada.
