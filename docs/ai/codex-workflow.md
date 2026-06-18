# Fluxo de trabalho do Codex

## 1. Antes de executar

Ler obrigatoriamente:

1. `AGENTS.md`
2. `SDD.md`
3. `GSD.md`
4. `ARCHITECTURE.md`
5. `ROADMAP.md`
6. `docs/legal/originality-policy.md`
7. `docs/releases/version-plan.md`

## 2. Durante a etapa

O Codex deve:

- trabalhar apenas na etapa atual;
- criar ou modificar apenas arquivos relacionados;
- seguir a arquitetura definida;
- manter documentação atualizada;
- criar comentários úteis no código;
- rodar validações;
- corrigir falhas encontradas;
- fazer commit em português;
- fazer push;
- criar tag se a etapa pedir.

## 3. O que não fazer

O Codex não deve:

- implementar gameplay na Etapa 1;
- copiar assets ou mapas;
- usar referências protegidas;
- adicionar dependências sem justificar;
- criar funcionalidades fora do escopo;
- avançar de etapa sem autorização;
- criar release final antes do checklist.

## 4. Relatório final de etapa

Ao fim de cada etapa, responder com:

```text
Etapa concluída:
Arquivos criados/modificados:
Comandos executados:
Resultados das validações:
Commit:
Push:
Tag:
Release:
Riscos/pendências:
Posso iniciar a próxima etapa?
```

## 5. Falhas

Se algo falhar:

1. diagnosticar;
2. tentar corrigir;
3. repetir validação;
4. se continuar falhando, documentar claramente;
5. não criar tag se o marco estiver quebrado.

## 6. Confirmações

Não pedir confirmação para ações internas da etapa.

Pedir confirmação apenas para:

- avançar para próxima etapa;
- alterar escopo;
- mudar arquitetura aprovada;
- usar asset externo;
- trocar stack;
- criar release final se checklist não estiver completo.
