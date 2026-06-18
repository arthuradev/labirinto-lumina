# ARCHITECTURE.md — Arquitetura do Labirinto Lumina

## 1. Filosofia arquitetural

Labirinto Lumina deve ser um jogo pequeno, mas organizado com disciplina profissional.

A arquitetura deve seguir três princípios:

1. núcleo simples;
2. responsabilidades claras;
3. validação por etapa.

O objetivo não é criar uma arquitetura exagerada. O objetivo é evitar que o projeto vire um arquivo gigante cheio de regras misturadas.

## 2. Visão em camadas

```text
Browser / Canvas / DOM
        ↓
Screens + Input
        ↓
Game Application
        ↓
Game Systems
        ↓
Entities + Level Data
        ↓
Core Types and Rules
```

## 3. Regra central

A lógica do jogo não deve depender diretamente do Canvas.

Isso permite testar regras principais sem navegador e evita acoplamento entre renderização e gameplay.

## 4. Estrutura final de código

```text
src/
├── main.ts
├── game/
│   ├── Game.ts
│   ├── GameLoop.ts
│   ├── GameStateMachine.ts
│   └── GameConfig.ts
├── core/
│   ├── types.ts
│   ├── grid.ts
│   ├── direction.ts
│   └── vector.ts
├── entities/
│   ├── Player.ts
│   ├── Sentinel.ts
│   ├── Collectible.ts
│   └── PowerNode.ts
├── systems/
│   ├── InputSystem.ts
│   ├── MovementSystem.ts
│   ├── CollisionSystem.ts
│   ├── ScoreSystem.ts
│   ├── EnemyAISystem.ts
│   ├── SentinelCollisionSystem.ts
│   ├── HighScoreSystem.ts
│   └── AudioSystem.ts
├── rendering/
│   ├── CanvasRenderer.ts
│   ├── RendererTypes.ts
│   ├── drawMaze.ts
│   ├── drawEntities.ts
│   └── drawHud.ts
├── levels/
│   ├── levelTypes.ts
│   ├── level-01.ts
│   ├── level-02.ts
│   ├── level-03.ts
│   └── index.ts
├── screens/
│   ├── StartScreen.ts
│   ├── ControlsScreen.ts
│   ├── PauseScreen.ts
│   ├── GameOverScreen.ts
│   ├── VictoryScreen.ts
│   └── index.ts
└── styles/
    └── main.css
```

## 5. Responsabilidades por módulo

### `main.ts`

Ponto de entrada.

Responsabilidades:

- carregar CSS;
- localizar elemento raiz/canvas;
- criar instância de `Game`;
- iniciar o jogo.

Não deve conter regra de gameplay.

### `game/`

Coordenação principal.

Responsabilidades:

- iniciar jogo;
- controlar game loop;
- gerenciar estados;
- chamar sistemas;
- trocar fases;
- detectar transições globais.

### `core/`

Tipos e funções puras.

Responsabilidades:

- grid;
- direção;
- vetores;
- tipos compartilhados;
- constantes;
- helpers puros.

Não deve importar `rendering/`, `screens/` ou DOM.

### `entities/`

Representação do estado das entidades.

Responsabilidades:

- jogador;
- sentinelas;
- coletáveis;
- power-ups.

Entidades devem ser simples e previsíveis. Evitar colocar regras globais complexas dentro delas.

### `systems/`

Regras que transformam estado.

Responsabilidades:

- entrada;
- movimento;
- colisão;
- pontuação;
- IA de inimigos;
- colisão com sentinelas;
- high score local;
- áudio.

Sistemas devem ser testáveis isoladamente quando possível.

### `rendering/`

Desenho no Canvas.

Responsabilidades:

- limpar canvas;
- desenhar labirinto;
- desenhar entidades;
- desenhar HUD;
- aplicar efeitos visuais simples.

Renderização não decide vitória, derrota, pontuação ou colisão.

### `levels/`

Dados de fases.

Responsabilidades:

- formato das fases;
- mapas originais;
- posições iniciais;
- quantidade de fragmentos;
- dificuldade.

Nenhuma fase pode copiar mapa comercial.

### `screens/`

Telas e estados visuais.

Responsabilidades:

- tela inicial;
- pausa;
- game over;
- vitória;
- instruções.

## 6. Game loop

```text
requestAnimationFrame
        ↓
calcular delta time
        ↓
processar input
        ↓
atualizar sistemas
        ↓
resolver colisões
        ↓
atualizar pontuação/estado
        ↓
renderizar
        ↓
repetir
```

O movimento deve ser baseado em grid, com animação visual suave.

## 7. Estados do jogo

```text
boot
start
playing
paused
level-complete
game-over
victory
```

Transições devem ficar centralizadas em `GameStateMachine`.

## 8. Regras de dependência

Permitido:

```text
game → systems
game → rendering
game → screens
systems → core
systems → entities
systems → levels
rendering → core
rendering → entities
```

Evitar:

```text
core → rendering
core → screens
core → DOM
entities → rendering
levels → rendering
```

Proibido:

```text
core importar Canvas
core acessar document/window
sistemas manipularem DOM diretamente
renderização alterar regra de jogo
```

## 9. Testes

```text
tests/unit/level.test.ts
tests/unit/collision.test.ts
tests/unit/scoring.test.ts
tests/unit/enemy-ai.test.ts
tests/unit/sentinel-collision.test.ts
tests/unit/game-session.test.ts
tests/unit/audio.test.ts
tests/unit/high-score.test.ts
tests/e2e/game-smoke.spec.ts
```

Prioridade:

1. regras puras;
2. colisão;
3. pontuação;
4. IA inimiga;
5. smoke test do jogo rodando.

## 10. Critérios arquiteturais de qualidade

Antes de cada tag, verificar:

- `Game.ts` não concentra lógica demais;
- sistemas continuam separados;
- renderização não contém regra central;
- fases são dados, não lógica espalhada;
- testes cobrem comportamento crítico;
- documentação acompanha mudanças relevantes.

## 11. Antiobjetivos

Evitar:

- engine complexa;
- overengineering;
- múltiplos padrões competindo;
- arquivos gigantes;
- classes abstratas desnecessárias;
- backend;
- dependências sem motivo;
- arquitetura “bonita no nome” e ruim na prática.
