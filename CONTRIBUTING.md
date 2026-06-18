# CONTRIBUTING.md — Contribuição e processo de trabalho

Este projeto é desenvolvido integralmente por IA, mas deve seguir padrões profissionais de contribuição.

## 1. Idioma

Todos os commits, descrições e relatórios principais devem ser em português.

Código pode usar nomes em inglês quando fizer sentido técnico.

Documentação principal deve ser em português.

## 2. Branches

Estratégia simples:

```text
main
feature/etapa-1-fundacao
feature/etapa-2-nucleo
feature/etapa-3-movimento
feature/etapa-4-regras
feature/etapa-5-sentinelas
feature/etapa-6-fases
feature/etapa-7-interface
feature/etapa-8-polimento
feature/etapa-9-release-candidate
release/v1.0.0
```

Para projeto solo, o Codex pode trabalhar diretamente em `main` se o usuário permitir, desde que todas as validações passem antes de tags.

## 3. Commits

Usar Conventional Commits em português.

Formato:

```text
tipo(escopo): descrição curta
```

Tipos permitidos:

```text
feat
fix
docs
test
refactor
style
chore
build
ci
release
```

Exemplos:

```text
docs(planejamento): criar documentação inicial do projeto
chore(projeto): configurar Vite e TypeScript
feat(jogo): implementar loop principal
test(colisao): validar colisões do jogador
ci(github): adicionar validação automática
release: preparar versão v1.0.0
```

## 4. Corpo do commit

Commits importantes devem ter corpo explicativo.

Exemplo:

```text
feat(jogo): implementar loop principal

Cria o GameLoop baseado em requestAnimationFrame e separa
a atualização de estado da renderização.

A mudança prepara o projeto para implementar movimento em grid
sem acoplar lógica de jogo ao Canvas.
```

## 5. Validações antes de commit

Quando disponíveis, rodar:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

Comando agregado planejado:

```bash
npm run check
```

## 6. Tags

Tags seguem SemVer:

```text
vX.Y.Z
```

Exemplos:

```text
v0.1.0
v0.2.0
v1.0.0
```

Tags só devem ser criadas quando:

- etapa correspondente foi concluída;
- validações passaram;
- documentação foi atualizada;
- CHANGELOG foi atualizado;
- release checklist foi revisado quando aplicável.

## 7. Pull requests

Como projeto solo, PRs não são obrigatórios.

Se usados, devem conter:

- resumo;
- arquivos alterados;
- testes executados;
- screenshots ou descrição visual;
- riscos;
- checklist.

## 8. Revisão

Antes de aceitar uma etapa, revisar:

- escopo;
- originalidade;
- arquitetura;
- execução;
- documentação;
- testes;
- build;
- GitHub Pages, quando aplicável.

## 9. Regra final

Não sacrificar clareza por velocidade.

A IA pode escrever rápido, mas o projeto deve permanecer compreensível.
