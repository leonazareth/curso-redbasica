# Pasta `gifs/`

Espaço para animações curtas demonstrando passos do curso — por exemplo,
a instalação do plugin ou a exportação do log.

## Como usar

1. Grave a tela e salve o GIF nesta pasta (ex.: `instalar-plugin.gif`).
2. No `index.html`, use a mesma linha de uma imagem normal:

   ```html
   <img src="gifs/instalar-plugin.gif" alt="Instalação do plugin no QGIS">
   ```

## Cuidado com o tamanho

GIF é um formato pesado. Um GIF de 10 segundos em tela cheia passa
facilmente de 10 MB e trava o carregamento no celular.

- Mantenha cada GIF **abaixo de 3 MB**.
- Grave só a parte da tela que interessa (não a tela inteira).
- Se ficar grande demais, grave um `.mp4` em vez de GIF e use:

  ```html
  <video src="gifs/instalar-plugin.mp4" autoplay loop muted playsinline></video>
  ```

Esta pasta pode ficar vazia sem problema nenhum — o site funciona
normalmente sem GIF.
