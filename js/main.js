/* ===================================================================
   PORTAL DO CURSO SANIHUB REDBASICA
   -------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar no dia a dia.

   Tudo o que muda (versões, datas, links de download e os dois
   formulários do Tally) está no bloco CONFIGURAÇÃO logo abaixo.

   REGRAS SIMPLES:
     • Só mexa entre as aspas '  '.
     • Não apague as vírgulas do fim das linhas.
     • Link ainda não pronto? Deixe as aspas vazias: ''
       O botão correspondente aparece como "em breve" e não quebra nada.
     • Depois de salvar o arquivo, envie-o ao GitHub. A página no ar
       leva ~1 minuto para atualizar.
=================================================================== */


/* ===================================================================
   ▼▼▼  CONFIGURAÇÃO — EDITE DAQUI...  ▼▼▼
=================================================================== */

var CONFIG = {

  /* -----------------------------------------------------------------
     1) VERSÕES E DATA
     Aparecem no cartão do topo, nos botões e no rodapé.
  ----------------------------------------------------------------- */
  versao: {
    plugin:      '1.9 beta',      // versão do RedBasica distribuída no curso
    qgis:        '3.44',          // versão do QGIS usada nas aulas
    atualizacao: 'Agosto/2026'    // data da última atualização desta página
  },

  /* Texto pequeno que aparece embaixo do logo, no topo da página */
  cursoLabel: 'Curso · Agosto/2026',


  /* -----------------------------------------------------------------
     2) LINKS
     Cole aqui os endereços completos (começando com https://).

     COMO PEGAR O LINK DO PLUGIN:
       GitHub → seu repositório → Releases → clique com o botão
       direito no arquivo .zip → "Copiar endereço do link".
       Fica parecido com:
       https://github.com/leonazareth/red_basica/releases/download/v1.9-beta/red_basica-1.9beta.zip
  ----------------------------------------------------------------- */
  links: {

    /* --- o mais importante: o ZIP do plugin --- */
    download: 'https://github.com/leonazareth/red_basica/releases/download/v1.9-beta/red_basica-1.9beta.zip',

    /* --- instalador do QGIS (link oficial) --- */
    qgis: 'https://download.qgis.org/downloads/QGIS-OSGeo4W-3.44.13-1.msi',

    /* --- materiais do curso --- */
    exercicio01:  '',   // exercicio_dia01.zip  (projeto QGIS do dia 1)
    exercicio02:  '',   // exercicio_dia02.zip  → PREENCHA no fim do dia 1 para liberar o cartão
    apresentacao: '',   // apresentacoes_curso.pdf
    apoio:        '',   // material_apoio.zip (documentos auxiliares, camadas soltas)

    /* --- documentação --- */
    manual:      '',                                  // manual de instalação e uso (PDF)
    site:        'https://sanihub.org',               // site da plataforma
    repositorio: 'https://github.com/leonazareth/red_basica',  // código-fonte

    /* --- simulador hidráulico --- */
    simulador: 'https://leonazareth.github.io/sewerage_hydraulic_simulator/'
  },


  /* -----------------------------------------------------------------
     3) FORMULÁRIOS DO TALLY

     No Tally: abra o formulário → botão "Share" → aba "Embed" →
     copie SOMENTE o endereço que aparece dentro de src="..."
     Ele começa com  https://tally.so/embed/

     Exemplo:
       cadastro: 'https://tally.so/embed/wABC12?hideTitle=1&transparentBackground=1'

     Por segurança, a página só aceita endereços que comecem com
     https://tally.so/ — qualquer outro é ignorado.
  ----------------------------------------------------------------- */
  tally: {
    cadastro: 'https://tally.so/embed/eqOyEk?alignLeft=1&hideTitle=1&transparentBackground=1',   // formulário 1 — receber novidades
    suporte:  'https://tally.so/embed/7R0jvR?alignLeft=1&hideTitle=1&transparentBackground=1'    // formulário 2 — enviar log de suporte
  },

  /* Altura, em pixels, da janela de cada formulário.
     Se aparecer uma barra de rolagem dentro do formulário, aumente o
     número. Se sobrar muito espaço em branco embaixo, diminua. */
  tallyAltura: {
    cadastro: 640,
    suporte:  700
  }

};

/* ===================================================================
   ▲▲▲  ...ATÉ AQUI. Abaixo é o funcionamento da página.  ▲▲▲
   Não é necessário alterar nada daqui para baixo.
=================================================================== */


(function () {
  'use strict';

  var TALLY_ORIGEM_PERMITIDA = 'https://tally.so/';

  /* ---------------------------------------------------------------
     Lê um caminho como 'versao.plugin' dentro do CONFIG.
     Devolve string vazia se não existir.
  --------------------------------------------------------------- */
  function valorDe(caminho) {
    var partes = String(caminho).split('.');
    var atual = CONFIG;
    for (var i = 0; i < partes.length; i++) {
      if (atual === null || typeof atual !== 'object' || !(partes[i] in atual)) return '';
      atual = atual[partes[i]];
    }
    return typeof atual === 'string' ? atual.trim() : '';
  }

  /* ---------------------------------------------------------------
     Aceita apenas endereços http(s) — evita que um erro de digitação
     na configuração vire um link perigoso (ex.: javascript:...).
  --------------------------------------------------------------- */
  function linkSeguro(url) {
    if (!url) return '';
    try {
      var u = new URL(url, window.location.href);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : '';
    } catch (e) {
      return '';
    }
  }

  /* ---------------------------------------------------------------
     1. Preenche os textos marcados com data-txt="..."
        (versões, data de atualização, rótulo do curso)
  --------------------------------------------------------------- */
  function aplicarTextos() {
    var alvos = document.querySelectorAll('[data-txt]');
    for (var i = 0; i < alvos.length; i++) {
      var valor = valorDe(alvos[i].getAttribute('data-txt'));
      if (valor) alvos[i].textContent = valor;
    }
  }

  /* ---------------------------------------------------------------
     2. Aplica os links marcados com data-link="..."
        Link vazio  → botão fica cinza, com "em breve", e não navega.
  --------------------------------------------------------------- */
  function aplicarLinks() {
    var faltando = [];
    var alvos = document.querySelectorAll('[data-link]');

    for (var i = 0; i < alvos.length; i++) {
      var el = alvos[i];
      var chave = el.getAttribute('data-link');
      var url = linkSeguro(valorDe('links.' + chave));

      if (url) {
        el.setAttribute('href', url);
        el.classList.remove('is-pending');
        el.removeAttribute('aria-disabled');
        // download direto de arquivo: abre em nova aba para não perder a página
        if (/\.(zip|pdf)(\?|$)/i.test(url)) {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      } else {
        if (faltando.indexOf(chave) === -1) faltando.push(chave);
        el.classList.add('is-pending');
        el.setAttribute('aria-disabled', 'true');
        el.setAttribute('href', '#' + (el.closest('section') ? el.closest('section').id : ''));
        el.addEventListener('click', function (ev) { ev.preventDefault(); });
      }
    }

    if (faltando.length) {
      console.info(
        '[Portal RedBasica] Links ainda não preenchidos em js/main.js → CONFIG.links: ' +
        faltando.join(', ')
      );
    }
  }

  /* ---------------------------------------------------------------
     3. Cartões de material: mostra a versão "pronta" ou "bloqueada"
        conforme o link estiver preenchido ou não em CONFIG.links.
  --------------------------------------------------------------- */
  function aplicarMateriais() {
    var cartoes = document.querySelectorAll('[data-material]');
    for (var i = 0; i < cartoes.length; i++) {
      var pronto = !!linkSeguro(valorDe('links.' + cartoes[i].getAttribute('data-material')));
      var partes = cartoes[i].querySelectorAll('[data-when]');
      for (var j = 0; j < partes.length; j++) {
        var mostrar = (partes[j].getAttribute('data-when') === (pronto ? 'ready' : 'pending'));
        partes[j].hidden = !mostrar;
      }
    }
  }

  /* ---------------------------------------------------------------
     4. Formulários do Tally
        Só embute se o endereço começar com https://tally.so/
        Também acrescenta um link para abrir o formulário em nova aba,
        útil no celular.
  --------------------------------------------------------------- */
  function aplicarTally() {
    var caixas = document.querySelectorAll('[data-tally]');

    for (var i = 0; i < caixas.length; i++) {
      var caixa = caixas[i];
      var chave = caixa.getAttribute('data-tally');
      var url = valorDe('tally.' + chave);

      if (url.indexOf(TALLY_ORIGEM_PERMITIDA) !== 0) {
        if (url) {
          console.warn('[Portal RedBasica] CONFIG.tally.' + chave +
            ' foi ignorado: o endereço precisa começar com ' + TALLY_ORIGEM_PERMITIDA);
        }
        continue;  // mantém o bloco "espaço reservado"
      }

      var altura = parseInt(CONFIG.tallyAltura && CONFIG.tallyAltura[chave], 10) ||
                   parseInt(caixa.getAttribute('data-altura'), 10) || 640;

      var iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.title = (chave === 'suporte')
        ? 'Formulário de suporte do curso'
        : 'Formulário de cadastro';
      iframe.loading = 'lazy';
      iframe.height = altura;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('referrerpolicy', 'no-referrer');

      caixa.textContent = '';                    // remove o espaço reservado
      caixa.classList.add('tally-slot--filled');
      caixa.appendChild(iframe);

      // link alternativo, fora do quadro
      var aviso = document.createElement('p');
      aviso.className = 'form-fallback';
      aviso.appendChild(document.createTextNode('O formulário não carregou? '));
      var link = document.createElement('a');
      link.href = url.replace('/embed/', '/r/').split('?')[0];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Abrir em nova aba';
      aviso.appendChild(link);
      caixa.parentNode.insertBefore(aviso, caixa.nextSibling);
    }
  }

  /* ---------------------------------------------------------------
     5. Botão flutuante: some enquanto a seção de suporte estiver
        visível na tela (não faz sentido cobrir o próprio formulário).
  --------------------------------------------------------------- */
  function ajustarBotaoFlutuante() {
    var fab = document.querySelector('.fab');
    var alvo = document.getElementById('suporte');
    if (!fab || !alvo || !('IntersectionObserver' in window)) return;

    var observador = new IntersectionObserver(function (entradas) {
      fab.hidden = entradas[0].isIntersecting;
    }, { threshold: 0.12 });

    observador.observe(alvo);
  }

  /* --------------------------------------------------------------- */
  function iniciar() {
    aplicarTextos();
    aplicarLinks();
    aplicarMateriais();
    aplicarTally();
    ajustarBotaoFlutuante();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
