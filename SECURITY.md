# SECURITY.md — Segurança e uso responsável

## 1. Escopo

Labirinto Lumina é um jogo web local/estático, sem backend e sem coleta intencional de dados pessoais.

## 2. Dados locais

A versão final pode usar `localStorage` apenas para salvar high score local.

Não deve armazenar:

- nome real;
- e-mail;
- tokens;
- credenciais;
- dados sensíveis;
- telemetria externa.

## 3. Dependências

Dependências devem ser mantidas mínimas.

Antes de adicionar uma nova dependência, a IA deve justificar:

- por que ela é necessária;
- qual problema resolve;
- por que não implementar internamente;
- impacto no bundle;
- risco de manutenção.

## 4. Assets

Assets externos só podem ser usados se:

- forem próprios;
- forem CC0;
- tiverem licença clara;
- forem documentados;
- não imitarem jogos comerciais.

## 5. Relato de problemas

Como projeto experimental solo, problemas podem ser relatados via GitHub Issues.

Tipos de problema:

- bug;
- asset com licença duvidosa;
- problema de originalidade;
- falha de execução;
- comportamento inesperado.

## 6. GitHub Pages

O deploy deve ser estático.

Não deve haver servidor próprio, banco de dados ou execução remota de código do usuário.
