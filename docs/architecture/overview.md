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
  └─ CanvasRenderer
        ↓
      Screens
```

## Regras principais

- `main.ts` inicializa.
- `Game` coordena.
- `GameLoop` controla tempo.
- `GameStateMachine` controla telas/estados.
- `screens/` descreve o conteúdo visual das telas.
- `rendering/` desenha o estado recebido no Canvas.
- `systems/` aplica regras.
- `entities/` guarda estado.
- `levels/` guarda dados de fase.
- `core/` contém tipos e funções puras.

Na versão `v0.2.0`, `systems/`, `entities/` e `levels/` ainda são arquitetura planejada.
Eles entram quando movimento, colisão, coleta, sentinelas e fases forem implementados.

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
