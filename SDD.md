# SDD.md — Spec-Driven Design Document

## 1. Identidade

Nome do projeto: **Labirinto Lumina**

Nome do repositório: `labirinto-lumina`

Tipo: jogo web arcade de labirinto

Linguagem principal: TypeScript

Renderização: HTML5 Canvas

Plataforma principal: navegador moderno

Publicação: GitHub Pages

Desenvolvimento: integralmente por IA com GPT-5.5, sob direção humana.

## 2. Descrição curta

Labirinto Lumina é um jogo arcade original em que o jogador controla uma pequena luz dentro de labirintos escuros, coleta fragmentos luminosos, evita sentinelas instáveis, ativa nós de pulso e tenta completar todas as fases.

## 3. Objetivo do projeto

Criar um jogo pequeno, completo, público, bem documentado e profissionalmente estruturado para testar a capacidade de uma IA de desenvolver um projeto de software com:

- planejamento;
- arquitetura;
- documentação;
- implementação;
- testes;
- commits;
- tags;
- releases;
- publicação.

## 4. Objetivo do jogo

O jogador deve:

1. entrar em um labirinto;
2. coletar todos os fragmentos de luz;
3. evitar sentinelas;
4. usar nós de pulso para sobreviver;
5. completar três fases;
6. alcançar a tela de vitória.

## 5. Inspiração permitida

É permitido usar mecânicas genéricas de jogos arcade:

- labirinto;
- coleta;
- perseguição;
- inimigos;
- pontuação;
- power-up temporário;
- fases;
- vitória;
- derrota.

## 6. Proibições de originalidade

É proibido usar:

- nome Pac-Man;
- qualquer variação confundível;
- personagens similares;
- sprites semelhantes;
- fantasmas similares;
- sons parecidos;
- mapas copiados;
- fonte visual associada;
- paleta que tente imitar identidade protegida;
- nomes comerciais de terceiros;
- assets sem licença.

O jogo deve ter identidade própria baseada em luz, energia, circuitos, ruído e sentinelas.

## 7. Escopo fechado da v1.0.0

A versão `v1.0.0` contém:

- tela inicial;
- tela de controles;
- canvas responsivo simples;
- jogador controlável pelo teclado;
- movimento em grid com animação suave;
- 3 fases originais;
- fragmentos de luz coletáveis;
- nós de pulso temporários;
- sentinelas com comportamentos simples;
- colisão com paredes;
- colisão com inimigos;
- pontuação;
- vidas;
- pausa;
- game over;
- tela de vitória;
- HUD;
- high score local via `localStorage`;
- áudio simples original ou CC0;
- botão/tecla de mute;
- README completo;
- documentação técnica;
- GitHub Actions;
- GitHub Pages;
- release `v1.0.0`.

## 8. Fora de escopo

Não entra na v1.0.0:

- multiplayer;
- backend;
- login;
- ranking online;
- editor de fases;
- mobile perfeito;
- suporte avançado a gamepad;
- loja;
- skins desbloqueáveis complexas;
- sistema de save complexo;
- PWA;
- engine externa grande;
- Phaser;
- Godot;
- React;
- servidor próprio;
- assets comerciais.

## 9. Estados do jogo

Estados obrigatórios:

```text
boot
start
playing
paused
level-complete
game-over
victory
```

## 10. Entidades principais

### Jogador

Representa a luz controlada pelo usuário.

Responsabilidades:

- posição;
- direção atual;
- próxima direção desejada;
- vidas;
- estado temporário de pulso, se aplicável.

### Fragmento de luz

Coletável principal.

Responsabilidades:

- posição;
- valor de pontos;
- estado coletado/não coletado.

### Nó de pulso

Power-up temporário.

Responsabilidades:

- posição;
- duração de efeito;
- ativação de modo instável nas sentinelas.

### Sentinela

Inimigo original.

Tipos:

- Vigia: persegue diretamente;
- Eco: tenta interceptar;
- Rastro: patrulha rotas.

## 11. Regras de pontuação

Pontuação:

```text
Fragmento de luz: +10
Nó de pulso: +50
Sentinela atravessada durante pulso: +200
Conclusão de fase: bônus por vida restante
```

Os valores podem ser ajustados durante balanceamento, mas devem permanecer documentados.

## 12. Requisitos técnicos

O jogo deve:

- rodar em navegador moderno;
- funcionar em build estático;
- ser publicável no GitHub Pages;
- não depender de backend;
- ter lógica testável sem Canvas;
- ter código organizado por responsabilidade;
- ter comentários úteis;
- ter testes unitários para regras principais;
- ter smoke test no navegador;
- passar em CI.

## 13. Requisitos de UX

O jogo deve ser:

- simples de iniciar;
- claro visualmente;
- jogável com teclado;
- compreensível sem tutorial longo;
- leve;
- bonito o suficiente para GitHub/portfólio.

Controles:

```text
Setas ou WASD: mover
Enter/Espaço: iniciar/confirmar
P: pausar
M: mutar/desmutar
R: reiniciar após game over
```

## 14. Critérios de conclusão v1.0.0

A versão `v1.0.0` só pode ser criada quando:

- todas as fases forem jogáveis do início ao fim;
- todas as condições de vitória/derrota funcionarem;
- `npm run check` passar;
- smoke test do navegador passar;
- GitHub Pages estiver funcionando;
- README estiver completo;
- CHANGELOG estiver atualizado;
- política de originalidade estiver revisada;
- release notes estiverem prontas;
- nenhum asset protegido tiver sido usado.

## 15. Princípio final

O projeto deve ser pequeno o bastante para ser concluído e bem feito o bastante para ser apresentado publicamente.
