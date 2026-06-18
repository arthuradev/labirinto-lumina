# Game loop

## Objetivo

O game loop controla atualização e renderização do jogo.

## Mecanismo

Usar `requestAnimationFrame`.

Fluxo:

```text
requestAnimationFrame
        ↓
calcular delta time
        ↓
ler input
        ↓
atualizar movimento
        ↓
atualizar inimigos
        ↓
resolver colisões
        ↓
atualizar score/estado
        ↓
renderizar frame
        ↓
repetir
```

## Movimento

O movimento deve ser baseado em grid, com visual suave.

A regra de colisão deve usar grid.

A renderização pode interpolar ou animar suavemente, mas sem mudar a regra central.

## Pausa

Quando o jogo estiver pausado:

- input de pausa deve funcionar;
- entidades não devem atualizar;
- renderização pode continuar para mostrar tela de pausa.

## Delta time

Delta time deve ser limitado para evitar saltos grandes quando a aba fica inativa.

Exemplo conceitual:

```text
delta = min(delta, maxDelta)
```

Na versão `v0.3.0`, `GameLoop` limita o delta time, atualiza a `GameSession` quando o estado é
`playing` e chama o renderizador a cada frame. Movimento e colisão já passam por sistemas próprios.
Pontuação, coleta e sentinelas entram nas próximas etapas.

## Regras

- Game loop não decide regra complexa.
- Game loop chama sistemas.
- Sistemas atualizam estado.
- Renderer desenha estado.
