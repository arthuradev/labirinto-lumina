# CHANGELOG.md

Todas as mudanças relevantes deste projeto serão documentadas aqui.

O formato segue a ideia de manter um histórico legível por humanos, organizado por versão.

## [Não lançado]

### Planejado

- GitHub Pages.
- Release v1.0.0.

## [v0.7.0] — 2026-06-18

### Adicionado

- Estado visual `controls` para tela de controles navegável por teclado.
- Ações de input para abrir controles com `C` e voltar/pausar com `Esc` ou `Backspace`.
- Conteúdos de tela separados em `screens/` para início, controles, pausa, conclusão de fase, game over e vitória.
- Renderização de telas com seções informativas e resumo de campanha quando há sessão ativa.
- Overlay de pausa mais completo.
- Overlay de conclusão de fase com pontuação e indicação do próximo passo.
- HUD revisado com altura própria, fase, pontuação, vidas, fragmentos, pulso, sentinelas e atalhos principais.
- Testes unitários para input, conteúdo de telas e fluxo da máquina de estados.

### Observação

Esta versão ainda não implementa áudio, mute real, high score ou publicação via GitHub Pages.

## [v0.6.0] — 2026-06-18

### Adicionado

- Fases originais `Malha Prisma` e `Nucleo Obsidiana`.
- Sequência `LEVELS` com três fases jogáveis: `Circuito Aurora`, `Malha Prisma` e `Nucleo Obsidiana`.
- Progressão entre fases após coletar todos os fragmentos do circuito atual.
- Preservação de pontos e vidas durante a campanha.
- Reinício do contador de fragmentos ao carregar a próxima fase.
- HUD com fase atual e total de fases.
- Testes unitários para validação básica de todos os mapas e progressão de `GameSession`.

### Observação

Esta versão ainda não implementa telas completas, áudio, high score ou publicação via GitHub Pages.

## [v0.5.0] — 2026-06-18

### Adicionado

- Entidade `Sentinel` com tipos originais Vigia, Eco e Rastro.
- Sistema `EnemyAISystem` com perseguição direta, tentativa simples de interceptação e patrulha.
- Modo instável durante pulso, fazendo sentinelas buscarem rotas mais distantes da Lumina.
- Colisão jogador-sentinela com perda de vida fora do pulso.
- Pontuação de `+200` ao atravessar sentinelas durante pulso.
- Renderização geométrica das sentinelas como losangos energéticos, sem aparência de fantasmas.
- HUD atualizado com contagem de sentinelas.
- Testes unitários para IA inimiga, colisão com sentinelas, pontuação e alcance no mapa.

### Observação

Esta versão ainda não implementa múltiplas fases, áudio, high score ou publicação via GitHub Pages.

## [v0.4.0] — 2026-06-18

### Adicionado

- Fragmentos de luz coletáveis na fase `Circuito Aurora`.
- Nós de pulso com duração temporária e pontuação própria.
- Sistema de pontuação com fragmentos, nós de pulso, vidas e bônus por conclusão de fase.
- HUD com pontos, vidas, fragmentos coletados e tempo restante de pulso.
- Estado `level-complete` acionado ao coletar todos os fragmentos.
- Fluxo básico de vitória após conclusão da fase.
- Fluxo de game over/reinício preparado para perda de vidas.
- Testes unitários para coleta, pontuação, alcance de itens e transição para vitória.

### Observação

Esta versão ainda não implementa sentinelas, colisão com inimigos, múltiplas fases, áudio ou high score.

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
