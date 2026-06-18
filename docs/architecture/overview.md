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
  ├─ GameLoop
  ├─ GameStateMachine
  ├─ GameSession
  │    ├─ InputSystem
  │    ├─ MovementSystem
  │    ├─ CollisionSystem
  │    ├─ CollectionSystem
  │    └─ ScoreSystem
  └─ CanvasRenderer
        ↓
      Screens
```

## Regras principais

- `main.ts` inicializa.
- `Game` coordena.
- `GameLoop` controla tempo.
- `GameStateMachine` controla telas/estados.
- `GameSession` mantém o estado da fase atual.
- `InputSystem` traduz teclas em intenções de jogo.
- `MovementSystem` move o jogador em grid.
- `CollisionSystem` bloqueia paredes e limites.
- `CollectionSystem` detecta fragmentos e nós de pulso no tile atual.
- `ScoreSystem` concentra pontuação, vidas e bônus.
- `screens/` descreve o conteúdo visual das telas.
- `rendering/` desenha o estado recebido no Canvas.
- `systems/` aplica regras.
- `entities/` guarda estado.
- `levels/` guarda dados de fase.
- `core/` contém tipos e funções puras.

Na versão `v0.4.0`, jogador, input, movimento, colisão, primeira fase navegável, coleta,
pontuação e fim de fase básico já existem. Sentinelas, áudio, high score e progressão real entre
múltiplas fases permanecem planejados para etapas futuras.

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
