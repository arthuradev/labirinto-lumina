# Guia do usuário

## Sobre o jogo

Labirinto Lumina é um jogo arcade de labirinto.

Você controla uma luz dentro de circuitos escuros. O objetivo é coletar fragmentos luminosos, evitar sentinelas e completar todas as fases.

## Como jogar online

Quando publicado, o jogo estará disponível via GitHub Pages.

O link será adicionado ao README.

## Como jogar localmente

Modo desenvolvedor:

```bash
npm install
npm run dev
```

Modo usuário Windows planejado:

```text
Jogar.bat
```

## Objetivo

Na versão atual, já é possível navegar pela primeira fase e testar colisão com paredes.

Objetivo planejado para a versão final:

- Colete todos os fragmentos de luz.
- Evite sentinelas.
- Use nós de pulso para sobreviver.
- Complete as três fases.

## Movimento

```text
Setas direcionais ou WASD: mover
P: pausar/despausar
```

## Pontuação

Planejada:

```text
Fragmento de luz: +10
Nó de pulso: +50
Sentinela atravessada durante pulso: +200
Conclusão de fase: bônus
```

## Estados

- início;
- jogando;
- pausado;
- game over;
- vitória.

## Observação

Este jogo é um experimento desenvolvido integralmente por IA com GPT-5.5, sob direção humana.
