# Formato de fases

## Objetivo

As fases devem ser dados declarativos, fáceis de revisar e impossíveis de confundir com mapas comerciais existentes.

## Formato atual

Cada fase deve conter:

```ts
{
  id: "level-01",
  name: "Circuito Aurora",
  width: 19,
  height: 13,
  tileSize: 32,
  tiles: [...],
  playerStart: { x: 1, y: 1 },
  collectibles: [...],
  powerNodes: [...],
  sentinels: [...],
}
```

## Tiles atuais

```text
# parede
. caminho
P jogador inicial
L fragmento de luz
N nó de pulso
V sentinela Vigia
E sentinela Eco
R sentinela Rastro
```

Durante o parsing, `P`, `L`, `N`, `V`, `E` e `R` viram caminho livre. `P` registra
`playerStart`, `L` gera fragmentos de luz, `N` gera nós de pulso e `V`/`E`/`R` geram sentinelas
com tipos próprios.

## Regras de originalidade

- Nenhum layout deve copiar mapa conhecido.
- Os mapas devem ser criados do zero.
- Os mapas devem ter tema próprio.
- Evitar silhuetas, corredores e padrões icônicos de jogos comerciais.

## Regras de jogabilidade

Toda fase deve:

- ter início claro;
- ter todos os caminhos alcançáveis;
- ter todos os fragmentos e nós alcançáveis;
- ter sentinelas em caminhos livres e alcançáveis;
- ser navegável sem atravessar paredes;
- ter dificuldade progressiva.

## Validação planejada

Testes devem verificar:

- tiles válidos;
- jogador posicionado em tile livre;
- todos os caminhos alcançáveis;
- fragmentos alcançáveis;
- nós de pulso alcançáveis;
- sentinelas em tiles livres e alcançáveis;
- mapa retangular;

Validações planejadas para etapas futuras:

- quantidade mínima de fragmentos;
- nenhuma linha com largura incorreta.
