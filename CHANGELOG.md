# CHANGELOG.md

Todas as mudanças relevantes deste projeto serão documentadas aqui.

O formato segue a ideia de manter um histórico legível por humanos, organizado por versão.

## [Não lançado]

### Planejado

- Coleta e pontuação.
- Sentinelas.
- Três fases originais.
- GitHub Pages.
- Release v1.0.0.

## [v0.3.0] — 2026-06-18

### Adicionado

- Entidade inicial do jogador.
- Sistema de input para setas direcionais e WASD.
- Movimento em grid com interpolação visual suave.
- Sistema de colisão com paredes.
- Primeira fase original navegável, `Circuito Aurora`.
- Formato inicial de fase declarativa.
- Renderização do labirinto e da Lumina no Canvas.
- HUD mínimo com nome da fase e controles principais.
- Testes unitários para fase, colisão e movimento.

### Observação

Esta versão ainda não implementa fragmentos de luz, nós de pulso, pontuação, sentinelas,
vitória ou derrota.

## [v0.2.0] — 2026-06-18

### Adicionado

- Estrutura inicial de `src/game/`, `src/core/`, `src/rendering/` e `src/screens/`.
- `Game` como coordenador principal da aplicação.
- `GameLoop` baseado em `requestAnimationFrame`, com delta time limitado.
- `GameStateMachine` com os estados definidos no SDD.
- `CanvasRenderer` separado da lógica central do jogo.
- Tela inicial funcional em Canvas, com transição básica para estado `playing`.
- Pausa técnica básica entre estados `playing` e `paused`.
- Vitest configurado para testes unitários.
- Testes da máquina de estados.

### Observação

Esta versão ainda não implementa movimento, labirinto, colisão, coleta ou sentinelas.

## [v0.1.0] — 2026-06-17

### Adicionado

- Documentação raiz do projeto.
- Metodologia de desenvolvimento com IA.
- Política de originalidade.
- Arquitetura inicial.
- Roadmap até v1.0.0.
- Planejamento de versões.
- Setup técnico mínimo.
- CI inicial.
- Tela provisória.
- Arquivo `LICENSE` com texto MIT completo.
- Inicializador local `Jogar.bat`.

### Observação

Esta versão não implementa gameplay.
