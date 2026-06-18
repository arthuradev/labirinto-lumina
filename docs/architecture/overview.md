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
  │    ├─ ScoreSystem
  │    ├─ EnemyAISystem
  │    └─ SentinelCollisionSystem
  ├─ AudioSystem
  ├─ HighScoreSystem
  └─ CanvasRenderer
        ↓
      Screens
```

## Regras principais

- `main.ts` inicializa.
- `Game` coordena.
- `GameLoop` controla tempo.
- `GameStateMachine` controla telas/estados.
- `GameSession` mantém o estado da campanha e da fase atual.
- `InputSystem` traduz teclas em intenções de jogo.
- `MovementSystem` move o jogador em grid.
- `CollisionSystem` bloqueia paredes e limites.
- `CollectionSystem` detecta fragmentos e nós de pulso no tile atual.
- `ScoreSystem` concentra pontuação, vidas e bônus.
- `EnemyAISystem` move sentinelas com comportamentos simples e modo instável durante pulso.
- `SentinelCollisionSystem` resolve perda de vida ou travessia pontuada durante pulso.
- `AudioSystem` sintetiza efeitos sonoros originais e controla mute sem depender de regras centrais.
- `HighScoreSystem` persiste o recorde local sem acoplar pontuação ao navegador.
- `screens/` descreve o conteúdo visual das telas por estado.
- `rendering/` desenha o estado recebido no Canvas.
- `systems/` aplica regras.
- `entities/` guarda estado.
- `levels/` guarda dados de fase.
- `core/` contém tipos e funções puras.

Na versão `v0.9.0`, jogador, input, movimento, colisão, três fases navegáveis, coleta, pontuação,
sentinelas, progressão real entre fases, tela de controles, pausa, game over, vitória e HUD revisado
já existem. Áudio original via Web Audio, mute com `M` e high score local também estão implementados.
O projeto também possui smoke test end-to-end com Playwright, CI fortalecida e publicação via GitHub
Pages.

## Publicação e testes de navegador

- `npm run test:e2e` roda um smoke test em Chromium via Playwright.
- `npm run check` inclui o teste end-to-end além de typecheck, lint, format check, unit tests e build.
- O workflow de GitHub Actions valida o projeto e, em pushes para `main`, publica o build estático em GitHub Pages.
- O modo `pages` do Vite usa a base `/labirinto-lumina/` para servir assets corretamente no Pages.

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
