# GSD.md — Get Stuff Done

Este documento define o plano operacional atual para a IA.

A IA deve seguir a etapa atual, executar tudo de forma autônoma dentro dela e parar ao final perguntando se pode avançar para a próxima etapa.

## Missão atual

Executar a **Etapa 10 — Revisão final e lançamento** do projeto **Labirinto Lumina**.

## Regra de autonomia

O Codex pode executar comandos, criar arquivos, inicializar Git, criar repositório público, fazer commit, push e tag dentro da etapa atual.

A única parada obrigatória é ao final da etapa, antes de avançar para a próxima.

## Etapa 1 — Fundação documental e técnica inicial

### Objetivo

Criar a base profissional do projeto, sem implementar gameplay.

A Etapa 1 deve entregar:

- repositório Git inicializado;
- repositório GitHub público criado;
- documentação raiz criada;
- documentação em `docs/` criada;
- setup mínimo Vite + TypeScript;
- tela provisória simples;
- GitHub Actions inicial;
- `Jogar.bat`;
- commit inicial;
- push;
- tag `v0.1.0`.

### Arquivos raiz esperados

```text
README.md
AGENTS.md
SDD.md
GSD.md
ARCHITECTURE.md
ROADMAP.md
CONTRIBUTING.md
CHANGELOG.md
SECURITY.md
LICENSE
package.json
package-lock.json
tsconfig.json
vite.config.ts
eslint.config.js
prettier.config.js
index.html
Jogar.bat
```

### Pastas esperadas

```text
public/
src/
src/styles/
tests/
docs/
docs/ai/
docs/architecture/
docs/architecture/adr/
docs/legal/
docs/user/
docs/releases/
.github/
.github/workflows/
```

### Arquivos técnicos mínimos esperados

```text
src/main.ts
src/styles/main.css
.github/workflows/ci.yml
```

A tela provisória deve informar:

```text
Labirinto Lumina
Projeto inicializado.
Gameplay ainda não implementado.
Desenvolvido integralmente por IA com GPT-5.5, sob direção humana.
```

### Validações da Etapa 1

Depois de criar o setup técnico, rodar:

```bash
npm install
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Se `npm run check` já existir, rodar também:

```bash
npm run check
```

### Commit esperado

```text
docs(planejamento): criar fundação documental e técnica inicial
```

Corpo recomendado:

```text
Cria a base inicial do projeto Labirinto Lumina.

Inclui documentação principal, metodologia de desenvolvimento com IA,
política de originalidade, planejamento de versões, arquitetura inicial,
setup mínimo com Vite/TypeScript, tela provisória e validação automática.

Esta etapa não implementa gameplay.
```

### Tag esperada

```text
v0.1.0
```

### Release esperada

Título:

```text
v0.1.0 — Fundação documental e técnica inicial
```

Descrição:

```text
Primeiro marco do projeto Labirinto Lumina.

Esta versão estabelece a fundação documental, técnica e metodológica do projeto:
documentação raiz, política de originalidade, arquitetura planejada, metodologia IA-first, setup mínimo com Vite/TypeScript e CI inicial.

Gameplay ainda não foi implementado.
```

### Relatório final obrigatório

Ao terminar, informar:

- arquivos criados;
- comandos executados;
- resultado das validações;
- commit criado;
- push realizado;
- tag criada;
- release criada, se criada;
- link do repositório;
- link do GitHub Pages, se já estiver disponível;
- pendências;
- pergunta: `Posso iniciar a Etapa 2?`

## Próximas etapas planejadas

### Etapa 2 — Núcleo técnico do jogo

Criar estrutura interna, game loop, estado do jogo, canvas renderer e tela inicial funcional.

Tag: `v0.2.0`

Entregas esperadas:

- estrutura inicial de `src/game/`;
- estrutura inicial de `src/core/`;
- estrutura inicial de `src/rendering/`;
- estrutura inicial de `src/screens/`;
- `Game` coordenando aplicação;
- `GameLoop` baseado em `requestAnimationFrame`;
- `GameStateMachine` com estados definidos no SDD;
- `CanvasRenderer` separado das regras;
- tela inicial funcional no Canvas;
- teste unitário básico da máquina de estados.

Fora do escopo desta etapa:

- movimento do jogador;
- labirinto jogável;
- colisão;
- coleta;
- sentinelas;
- fases completas.

### Etapa 3 — Movimento, labirinto e colisão

Implementar jogador, input, movimento em grid, paredes e colisão.

Tag: `v0.3.0`

Entregas esperadas:

- jogador representado como entidade própria;
- input isolado para setas e WASD;
- movimento em grid com animação suave;
- colisão com paredes isolada em sistema próprio;
- primeira fase original navegável;
- renderização do labirinto e do jogador no Canvas;
- testes unitários de fase, colisão e movimento.

Fora do escopo desta etapa:

- fragmentos de luz;
- nós de pulso;
- pontuação;
- sentinelas;
- condições reais de vitória ou derrota.

### Etapa 4 — Coleta, pontuação e fim de fase

Implementar fragmentos de luz, nós de pulso, pontuação, vitória e derrota básica.

Tag: `v0.4.0`

Entregas esperadas:

- fragmentos de luz coletáveis;
- nós de pulso temporários;
- sistema de pontuação;
- HUD com pontos, vidas, fragmentos e pulso;
- conclusão de fase ao coletar todos os fragmentos;
- estado de vitória básico após conclusão da fase;
- fluxo de game over/reinício preparado para perda de vidas;
- testes unitários de coleta, pontuação e regras de fim.

Fora do escopo desta etapa:

- sentinelas;
- colisão com inimigos;
- avanço entre múltiplas fases;
- áudio;
- high score local.

### Etapa 5 — Sentinelas

Implementar inimigos originais com comportamentos simples.

Tag: `v0.5.0`

Entregas esperadas:

- entidade própria de sentinela;
- dados de sentinelas na primeira fase;
- comportamentos simples para Vigia, Eco e Rastro;
- modo instável durante pulso;
- colisão jogador-sentinela com perda de vida;
- pontuação ao atravessar sentinela durante pulso;
- renderização original das sentinelas sem aparência de fantasmas;
- testes unitários de IA e colisão.

Fora do escopo desta etapa:

- múltiplas fases;
- balanceamento final de dificuldade;
- áudio;
- high score local;
- publicação via GitHub Pages.

### Etapa 6 — Fases completas

Criar três fases originais e progressão de dificuldade.

Tag: `v0.6.0`

Entregas esperadas:

- três fases originais declaradas em `src/levels/`;
- sequência de fases registrada em estrutura própria;
- progressão entre fases após conclusão;
- pontuação e vidas preservadas durante a campanha;
- HUD indicando fase atual e total de fases;
- validação básica de mapas para todas as fases;
- documentação do formato de fase atualizada.

Fora do escopo desta etapa:

- telas completas e fluxo visual final;
- áudio;
- high score local;
- publicação via GitHub Pages;
- release candidate.

### Etapa 7 — Telas, HUD e UX

Adicionar telas completas, pausa, HUD, instruções e fluxo visual.

Tag: `v0.7.0`

Entregas esperadas:

- tela inicial com instruções claras;
- tela de controles navegável por teclado;
- pausa com overlay informativo;
- tela de game over com fluxo de reinício;
- tela de vitória com fechamento da campanha atual;
- HUD revisado com fase, pontuação, vidas, fragmentos, pulso, sentinelas e atalhos;
- testes unitários de estados, input e conteúdo de telas.

Fora do escopo desta etapa:

- áudio;
- mute real;
- high score local;
- publicação via GitHub Pages;
- release candidate.

### Etapa 8 — Áudio, polimento e high score

Adicionar sons originais/CC0, mute, high score local e polimento visual.

Tag: `v0.8.0`

Entregas esperadas:

- sistema de áudio isolado usando sons originais;
- efeitos sonoros para início, coleta, pulso, sentinelas, dano, conclusão de fase, game over e vitória;
- tecla `M` para mutar/desmutar;
- high score local persistido no navegador;
- exibição de recorde e estado de som no HUD/telas;
- polimento visual pontual sem alterar regras centrais;
- testes unitários para áudio, high score, input e eventos de sessão.

Fora do escopo desta etapa:

- publicação via GitHub Pages;
- testes end-to-end completos;
- release candidate;
- novas fases;
- novas regras de gameplay.

### Etapa 9 — Testes, CI, GitHub Pages e release candidate

Fortalecer testes, publicar via GitHub Pages e criar release candidate.

Tag: `v0.9.0`

Entregas esperadas:

- Playwright configurado para smoke test no navegador;
- comando `npm run test:e2e`;
- `npm run check` incluindo teste end-to-end;
- GitHub Actions fortalecida com validações e deploy para GitHub Pages;
- build com base correta para Pages;
- README praticamente final com link para jogar;
- revisão de originalidade para o release candidate;
- notas de release candidate;
- tag `v0.9.0`;
- release candidate no GitHub.

Fora do escopo desta etapa:

- novas regras de gameplay;
- novas fases;
- assets externos;
- release final `v1.0.0`;
- alterações de arquitetura sem ADR.

### Etapa 10 — Revisão final e lançamento

Revisar tudo, fechar documentação, criar release final.

Tag: `v1.0.0`

Entregas esperadas:

- documentação final revisada;
- README em estado final;
- CHANGELOG atualizado com `v1.0.0`;
- checklist final registrado;
- revisão final de originalidade registrada;
- validações locais completas;
- GitHub Actions passando;
- GitHub Pages funcionando;
- tag `v1.0.0`;
- release final pública no GitHub.

Fora do escopo desta etapa:

- novas features;
- novas fases;
- novos assets;
- mudanças de gameplay não exigidas por falha crítica;
- mudança de stack.
