# AGENTS.md — Instruções permanentes para IA

Este arquivo é a fonte principal de instruções para qualquer agente de IA que trabalhe no projeto **Labirinto Lumina**.

O projeto é um experimento de desenvolvimento **IA-first**: todo o código e documentação serão criados por IA, usando GPT-5.5, sob direção humana.

## 1. Ordem obrigatória de leitura

Antes de editar qualquer arquivo, a IA deve ler:

1. `AGENTS.md`
2. `SDD.md`
3. `GSD.md`
4. `ARCHITECTURE.md`
5. `ROADMAP.md`
6. `docs/legal/originality-policy.md`
7. `docs/ai/codex-workflow.md`
8. `docs/releases/version-plan.md`

Se houver conflito entre documentos, a prioridade é:

```text
docs/architecture/adr/ > SDD.md > ARCHITECTURE.md > AGENTS.md > GSD.md > prompt do chat
```

## 2. Regra principal

A IA pode trabalhar autonomamente **dentro da etapa atual**, mas deve parar ao fim de cada etapa e perguntar se pode avançar para a próxima.

A única confirmação obrigatória durante o fluxo normal é a troca de etapa.

Exemplo:

```text
Etapa 1 concluída. Posso iniciar a Etapa 2?
```

## 3. Escopo do projeto

O projeto é um jogo web original chamado **Labirinto Lumina**.

O jogo é inspirado apenas em mecânicas genéricas de arcade de labirinto, coleta e perseguição.

É proibido usar:

- nome Pac-Man;
- nomes parecidos ou confundíveis;
- sprites de Pac-Man;
- fantasmas parecidos;
- sons parecidos;
- mapas copiados;
- personagens copiados;
- artes comerciais;
- marcas registradas;
- qualquer material protegido sem licença.

## 4. Stack obrigatória

A stack planejada é:

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

Não adicionar frameworks grandes, engines ou bibliotecas extras sem justificar em ADR.

## 5. Etapa atual

A etapa atual está definida em `GSD.md`.

A IA deve executar **somente** a etapa atual.

Se encontrar algo fora do escopo da etapa, deve registrar como sugestão futura, não implementar.

## 6. Regras de arquitetura

A arquitetura deve ser simples, modular e testável.

Regras:

- lógica de jogo não depende do Canvas;
- renderização não decide regra de jogo;
- input fica isolado;
- colisão fica isolada;
- IA inimiga fica isolada;
- fases ficam em estrutura própria;
- `Game.ts` não deve virar um arquivo gigante;
- código de tela não deve conter regras centrais de jogo;
- cada módulo deve ter responsabilidade clara.

## 7. Comentários no código

O código deve ser bem documentado, mas não poluído.

Comente quando o comentário explicar:

- intenção arquitetural;
- regra de jogo;
- decisão não óbvia;
- limite importante;
- algoritmo;
- formato de fase;
- razão de uma separação;
- risco de manutenção.

Não comente código óbvio.

Comentário ruim:

```ts
// Soma 1
score += 1;
```

Comentário bom:

```ts
// A pontuação fica no ScoreSystem para evitar que entidades simples
// carreguem regras de progressão e bônus.
scoreSystem.addCollectiblePoints();
```

## 8. Commits

Todos os commits devem ser em português.

Use Conventional Commits em português:

```text
docs(planejamento): criar documentação inicial do projeto
chore(projeto): configurar Vite e TypeScript
feat(jogo): implementar loop principal
test(colisao): validar colisões do jogador
ci(github): adicionar validação automática
release: preparar versão v1.0.0
```

Commits devem ser pequenos, claros e relacionados à etapa.

## 9. Validações

Antes de commit, rode as validações possíveis para a etapa.

Quando o setup técnico existir, o comando principal será:

```bash
npm run check
```

Validações planejadas:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run test:e2e
```

Se uma validação falhar, corrija antes de commit. Se não for possível corrigir, explique claramente.

## 10. Git, GitHub, tags e releases

A IA deve:

- inicializar Git se necessário;
- criar o repositório público no GitHub se necessário;
- fazer commits;
- fazer push;
- criar tags planejadas;
- preparar releases quando indicado.

Tags seguem SemVer:

```text
v0.1.0
v0.2.0
v0.3.0
...
v1.0.0
```

Tags só devem ser criadas ao fim de marcos definidos em `docs/releases/version-plan.md`.

## 11. Relatório ao fim de cada etapa

Ao terminar uma etapa, a IA deve informar:

- etapa concluída;
- arquivos criados/modificados;
- comandos executados;
- resultados das validações;
- commit criado;
- push realizado;
- tag criada, se aplicável;
- riscos ou pendências;
- pergunta para avançar à próxima etapa.

## 12. Proibições

A IA não deve:

- implementar gameplay na Etapa 1;
- criar features fora do escopo;
- alterar decisões aceitas sem ADR;
- adicionar dependência desnecessária;
- copiar assets;
- gerar nomes confundíveis com marcas existentes;
- fazer release sem checklist;
- criar tag se validações falharem;
- afirmar que testou sem mostrar comandos;
- modificar arquivos aleatórios sem relação com a etapa.

## 13. Filosofia do projeto

Este projeto deve ser:

- simples de jogar;
- fácil de executar;
- bonito no GitHub;
- bem documentado;
- arquiteturalmente claro;
- pequeno, mas profissional;
- um bom experimento público de IA aplicada a software.

A meta não é criar um clone. A meta é criar um jogo original, fechado em escopo, desenvolvido por IA com disciplina profissional.
