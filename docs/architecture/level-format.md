# Formato de fases

## Objetivo

As fases devem ser dados declarativos, fáceis de revisar e impossíveis de confundir com mapas comerciais existentes.

## Formato planejado

Cada fase deve conter:

```ts
{
  id: "level-01",
  name: "Circuito Inicial",
  width: 19,
  height: 15,
  tiles: [...],
  playerStart: { x: 1, y: 1 },
  sentinels: [...],
  collectibles: [...],
  powerNodes: [...]
}
```

## Tiles planejados

```text
# parede
. caminho
L fragmento de luz
P jogador inicial
N nó de pulso
S sentinela
```

O formato exato pode ser ajustado durante implementação, mas deve permanecer documentado.

## Regras de originalidade

- Nenhum layout deve copiar mapa conhecido.
- Os mapas devem ser criados do zero.
- Os mapas devem ter tema próprio.
- Evitar silhuetas, corredores e padrões icônicos de jogos comerciais.

## Regras de jogabilidade

Toda fase deve:

- ter início claro;
- ter saída/condição de conclusão;
- ter todos os fragmentos alcançáveis;
- ter sentinelas posicionadas de forma justa;
- ser vencível;
- ter dificuldade progressiva.

## Validação planejada

Testes devem verificar:

- tiles válidos;
- jogador posicionado em tile livre;
- sentinelas em tiles livres;
- coletáveis alcançáveis;
- quantidade mínima de fragmentos;
- mapa retangular;
- nenhuma linha com largura incorreta.
