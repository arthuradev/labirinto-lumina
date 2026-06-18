# Labirinto Lumina

> Um jogo arcade original de labirinto, coleta e perseguição, desenvolvido integralmente por IA com GPT-5.5, sob direção humana.

## Visão geral

**Labirinto Lumina** é um experimento público de desenvolvimento de software com IA.

O objetivo do projeto é testar até onde uma IA consegue planejar, estruturar, documentar, implementar, validar, versionar e publicar um jogo completo quando recebe uma arquitetura profissional, escopo fechado, regras claras e checkpoints de qualidade.

O jogo será uma experiência web simples e divertida: o jogador controla uma pequena luz dentro de labirintos escuros, coleta fragmentos luminosos, evita sentinelas, ativa nós de pulso e tenta completar todas as fases.

## Transparência sobre IA

Este projeto foi planejado para ser desenvolvido integralmente por IA, usando **GPT-5.5 em capacidade máxima**, sob direção, revisão e curadoria humana.

A IA será responsável por:

- criar a estrutura do projeto;
- escrever o código;
- escrever e manter a documentação;
- criar testes;
- organizar commits;
- criar tags;
- preparar releases;
- publicar o projeto;
- validar qualidade antes de cada marco.

A direção humana será responsável por:

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

## Stack planejada

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

Quando publicado, o jogo poderá ser jogado via GitHub Pages.

Durante o desenvolvimento, a execução local será feita com:

```bash
npm install
npm run dev
```

Também haverá um inicializador simples para Windows:

```text
Jogar.bat
```

## Status

Status atual planejado:

```text
v0.2.0 — Núcleo técnico do jogo
```

O projeto já possui tela inicial funcional em Canvas, game loop e máquina de estados.
Movimento, labirinto e colisão ainda não foram implementados.

## Documentação principal

- [`AGENTS.md`](AGENTS.md) — regras permanentes para IA
- [`SDD.md`](SDD.md) — especificação do projeto
- [`GSD.md`](GSD.md) — plano operacional por etapas
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — arquitetura técnica
- [`ROADMAP.md`](ROADMAP.md) — caminho até v1.0.0
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — commits, branches e validações
- [`CHANGELOG.md`](CHANGELOG.md) — histórico de versões

## Licença

O código será licenciado sob MIT.

Assets visuais e sonoros deverão ser próprios, gerados para o projeto ou CC0 devidamente documentados. Nenhum asset externo pode ser adicionado sem revisão de origem e licença.
