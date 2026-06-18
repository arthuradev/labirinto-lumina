# Controles

Controles atuais e planejados.

## Movimento

```text
Setas direcionais ou WASD
```

Status: implementado desde `v0.3.0`.

## Ações

```text
Enter ou Espaço: iniciar/confirmar
P: pausar/despausar
M: mutar/desmutar
R: reiniciar após game over
Esc: voltar/pausar, se aplicável
```

Status atual:

- `Enter` ou `Espaço`: implementado para iniciar.
- `P`: implementado para pausar/despausar.
- `R`: implementado para reiniciar após vitória, conclusão de fase ou game over.
- `M` e `Esc`: planejados para etapas futuras.

## Requisitos de UX

Os controles devem:

- aparecer na tela inicial;
- aparecer no guia do usuário;
- funcionar sem mouse;
- ser simples para qualquer pessoa testar.

## Observação

A implementação pode ajustar teclas se houver conflito, mas qualquer mudança deve atualizar este arquivo e o README.
