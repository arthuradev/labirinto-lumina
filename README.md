# Labirinto Lumina

> Um jogo arcade original de labirinto, coleta e perseguição, desenvolvido integralmente por IA com GPT-5.5, sob direção humana.

## Visão geral

**Labirinto Lumina** é um experimento público de desenvolvimento de software com IA.

O objetivo do projeto é testar até onde uma IA consegue planejar, estruturar, documentar, implementar, validar, versionar e publicar um jogo completo quando recebe uma arquitetura profissional, escopo fechado, regras claras e checkpoints de qualidade.

O jogo é uma experiência web simples e divertida: o jogador controla uma pequena luz dentro de labirintos escuros, coleta fragmentos luminosos, evita sentinelas, ativa nós de pulso e tenta completar todas as fases.

## Transparência sobre IA

Este projeto foi planejado para ser desenvolvido integralmente por IA, usando **GPT-5.5 em capacidade máxima**, sob direção, revisão e curadoria humana.

A IA foi responsável por:

- criar a estrutura do projeto;
- escrever o código;
- escrever e manter a documentação;
- criar testes;
- organizar commits;
- criar tags;
- preparar releases;
- publicar o projeto;
- validar qualidade antes de cada marco.

A direção humana foi responsável por:

- definir intenção criativa;
- aprovar troca de etapas;
- revisar o resultado final;
- garantir que o projeto siga o escopo;
- garantir que a identidade do jogo permaneça original.

## Originalidade e segurança jurídica

Este projeto **não usa** nome, marca, sprites, sons, mapas, personagens, artes, logotipos ou qualquer material protegido de Pac-Man ou de qualquer outro jogo comercial.

A inspiração é limitada a mecânicas genéricas de jogos arcade de labirinto:

- movimentação em labirinto;
- coleta de itens;
- inimigos perseguindo;
- pontuação;
- fases;
- vitória;
- derrota.

A identidade visual, nomes, mapas, personagens, sons e apresentação devem ser originais.

Consulte:

- [`docs/legal/originality-policy.md`](docs/legal/originality-policy.md)
- [`docs/architecture/adr/0002-original-ip-policy.md`](docs/architecture/adr/0002-original-ip-policy.md)

## Stack

- TypeScript
- Vite
- HTML5 Canvas
- CSS3
- Vitest
- Playwright
- ESLint
- Prettier
- GitHub Actions
- GitHub Pages

## Como jogar

Online:

[Jogar Labirinto Lumina](https://arthuradev.github.io/labirinto-lumina/)

Durante o desenvolvimento, a execução local pode ser feita com:

```bash
npm install
npm run dev
```

Também há um inicializador simples para Windows:

```text
Jogar.bat
```

## Controles

```text
Setas direcionais ou WASD: mover
Enter ou Espaço: iniciar/confirmar
C: abrir/fechar controles na tela inicial
P: pausar/despausar
M: mutar/desmutar sons originais
Esc ou Backspace: voltar ou pausar
R: reiniciar após vitória, fase concluída ou game over
```

## Validação

```bash
npm run check
```

O comando principal executa typecheck, lint, verificação de formatação, testes unitários, build e smoke test end-to-end com Playwright.

## Status

Status atual:

```text
v1.0.0 — Versão final
```

O projeto já possui tela inicial funcional em Canvas, game loop, máquina de estados,
três fases originais navegáveis, movimento em grid, colisão com paredes, fragmentos de luz,
nós de pulso, pontuação, progressão entre fases, sentinelas originais com comportamentos simples,
tela de controles, pausa, game over, vitória, HUD revisado, sons originais via Web Audio,
mute com `M`, high score local, CI fortalecida, smoke test no navegador, deploy via GitHub Pages e
release pública `v1.0.0`.

O escopo fechado da versão `v1.0.0` está concluído.

## Documentação principal

- [`AGENTS.md`](AGENTS.md) — regras permanentes para IA
- [`SDD.md`](SDD.md) — especificação do projeto
- [`GSD.md`](GSD.md) — plano operacional por etapas
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — arquitetura técnica
- [`ROADMAP.md`](ROADMAP.md) — caminho até v1.0.0
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — commits, branches e validações
- [`CHANGELOG.md`](CHANGELOG.md) — histórico de versões
- [`docs/releases/v1.0.0.md`](docs/releases/v1.0.0.md) — notas da versão final
- [`docs/releases/final-checklist-v1.0.0.md`](docs/releases/final-checklist-v1.0.0.md) — checklist final
- [`docs/legal/originality-review-v1.0.0.md`](docs/legal/originality-review-v1.0.0.md) — revisão final de originalidade

## Licença

O código é licenciado sob MIT.

Os recursos visuais são desenhados em Canvas e os sons são sintetizados em código via Web Audio.
Nenhum asset externo foi adicionado ao projeto.
