# Guia do usuário

## Sobre o jogo

Labirinto Lumina é um jogo arcade de labirinto.

Você controla uma luz dentro de circuitos escuros. O objetivo é coletar fragmentos luminosos, evitar sentinelas e completar todas as fases.

Versão atual: `v1.0.0`.

## Como jogar online

O jogo está disponível via GitHub Pages:

```text
https://arthuradev.github.io/labirinto-lumina/
```

## Como jogar localmente

Modo desenvolvedor:

```bash
npm install
npm run dev
```

Modo usuário Windows:

```text
Jogar.bat
```

## Objetivo

Na versão atual, já é possível navegar por três fases, coletar fragmentos, ativar nós de pulso,
evitar sentinelas e completar a campanha atual ao concluir todos os circuitos.

Objetivo:

- Colete todos os fragmentos de luz em cada fase.
- Evite sentinelas.
- Use nós de pulso para sobreviver.
- Complete as três fases em sequência.

## Movimento

```text
Setas direcionais ou WASD: mover
Enter ou Espaço: iniciar/confirmar
C: abrir/fechar controles na tela inicial
P: pausar/despausar
M: mutar/desmutar sons originais
Esc ou Backspace: voltar dos controles ou pausar/despausar durante o jogo
R: reiniciar após vitória, conclusão de fase ou game over
```

## Pontuação

Atual:

```text
Fragmento de luz: +10
Nó de pulso: +50
Sentinela atravessada durante pulso: +200
Conclusão de fase: bônus por vida restante
Recorde local: salvo no navegador quando a pontuação supera o melhor resultado anterior
```

## Estados

- início;
- controles;
- jogando;
- pausado;
- fase concluída;
- game over;
- vitória.

## Observação

Este jogo é um experimento desenvolvido integralmente por IA com GPT-5.5, sob direção humana.
