# ADR 0004 — Desenvolvimento integral com IA

## Status

Aceita.

## Contexto

Este projeto é um teste prático para avaliar a capacidade de uma IA de desenvolver um projeto estruturado profissionalmente.

## Decisão

O projeto será desenvolvido integralmente por IA, usando GPT-5.5, sob direção humana.

A IA será autorizada a:

- criar estrutura;
- escrever código;
- escrever documentação;
- criar testes;
- executar validações;
- criar commits;
- criar tags;
- preparar releases;
- publicar no GitHub.

A IA deve parar apenas ao final de cada etapa para pedir autorização antes de avançar.

## Consequências positivas

- Testa capacidade real de IA em projeto estruturado.
- Gera histórico público interessante.
- Permite avaliar qualidade, criatividade e disciplina do agente.

## Consequências negativas

- Exige documentação forte.
- Exige validações automáticas.
- Exige revisão humana por etapa.
- Pode produzir soluções improvisadas se os arquivos-guia forem ignorados.

## Regra

A IA deve sempre seguir:

- `AGENTS.md`;
- `SDD.md`;
- `GSD.md`;
- `ARCHITECTURE.md`;
- `docs/legal/originality-policy.md`.
