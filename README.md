# Portal do Curso SaniHUB RedBasica

Página única para os participantes do curso do **SaniHUB RedBasica**,
plugin do QGIS para traçado e dimensionamento de redes coletoras de
esgoto. Reúne o download do plugin, o roteiro de instalação, os
materiais das aulas, o simulador hidráulico e o canal de suporte.

Site **estático** (HTML + CSS + JavaScript puro), sem build, sem
backend e sem banco de dados. Publicado no GitHub Pages.

> **Primeira vez?** Leia o [GUIA-PASSO-A-PASSO.md](GUIA-PASSO-A-PASSO.md).
> Ele explica, em linguagem simples, como criar o repositório, publicar
> a página, subir o plugin, montar os formulários do Tally e gerar o
> QR Code.

---

## Estrutura

```
/
├── index.html            página (todo o conteúdo em texto)
├── css/style.css         aparência
├── js/main.js            ← O ÚNICO ARQUIVO QUE VOCÊ EDITA NO DIA A DIA
├── images/               ícones, logos e prints de tela
├── gifs/                 animações demonstrativas (opcional)
├── docs/                 materiais do curso (PDF, ZIP pequenos)
├── fonts/                fontes locais (não precisa mexer)
├── .nojekyll             faz o GitHub Pages servir os arquivos como estão
├── .gitignore            impede que arquivos privados subam por engano
└── GUIA-PASSO-A-PASSO.md guia completo, sem termos técnicos
```

---

## O que se muda onde

| Quero mudar… | Arquivo | Onde exatamente |
| --- | --- | --- |
| Versão do RedBasica | `js/main.js` | `CONFIG.versao.plugin` |
| Versão do QGIS | `js/main.js` | `CONFIG.versao.qgis` |
| Data de atualização | `js/main.js` | `CONFIG.versao.atualizacao` |
| Link do plugin (ZIP) | `js/main.js` | `CONFIG.links.download` |
| Links dos materiais | `js/main.js` | `CONFIG.links.exercicio01`, `exercicio02`, `apresentacao`, `apoio` |
| Manual / documentação | `js/main.js` | `CONFIG.links.manual`, `site`, `repositorio` |
| Link do simulador | `js/main.js` | `CONFIG.links.simulador` |
| Formulário de cadastro | `js/main.js` | `CONFIG.tally.cadastro` |
| Formulário de suporte | `js/main.js` | `CONFIG.tally.suporte` |
| Altura dos formulários | `js/main.js` | `CONFIG.tallyAltura` |
| Textos da página | `index.html` | procure por `TROQUE AQUI` |
| Prints de tela | `index.html` + `images/` | procure por `TROQUE AQUI` |
| Cores e tamanhos | `css/style.css` | bloco `02. CORES E MEDIDAS` |

**Link vazio (`''`) não quebra a página**: o botão correspondente
aparece em cinza com a marca *em breve* e não leva a lugar nenhum.
Assim dá para publicar o site antes de ter todos os arquivos prontos.

---

## Publicar no GitHub Pages (resumo)

1. Suba todos os arquivos para a **raiz** do repositório.
2. `Settings` → `Pages` → *Source*: **Deploy from a branch**
3. Branch: `main` · Pasta: **`/ (root)`** — não escolha `/docs`.
4. Aguarde ~1 minuto. A URL publicada é o destino do QR Code.

O passo a passo detalhado, com onde clicar, está no
[GUIA-PASSO-A-PASSO.md](GUIA-PASSO-A-PASSO.md).

---

## Ver a página no seu computador antes de publicar

Basta abrir o `index.html` com duplo clique? **Não** — a página tem uma
regra de segurança que exige um endereço `http://`. Use um servidor
local (o QGIS já traz o Python instalado):

```bash
cd caminho/da/pasta
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador. Para encerrar,
pressione `Ctrl + C`.

---

## Segurança

O site foi montado seguindo estas regras:

- Sem backend, sem banco de dados, sem sistema de login.
- Nenhuma senha, chave de API ou token no código.
- Nenhum dado pessoal de participante fica no repositório.
- Os formulários e os arquivos de log enviados ficam **no Tally**, nunca
  no GitHub.
- A página só embute formulários cujo endereço começa com
  `https://tally.so/` — qualquer outro endereço é ignorado.
- `Content-Security-Policy` restritiva: a página só carrega arquivos
  dela mesma; o único conteúdo externo permitido é o Tally.
- Nenhum conteúdo enviado por usuário é executado ou exibido na página.

Todo o código publicado aqui pode ser considerado público.

---

## Créditos

SaniHUB RedBasica — software livre, desenvolvido com apoio do BID, da
AECID e da União Europeia. Mais informações em
[sanihub.org](https://sanihub.org).
