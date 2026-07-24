/* ==========================================================================
   COFFEE SITES PRO — CONVENIOS.JS
   Template: Clínica Odontológica (adaptado de Restaurante Premium)
   Responsabilidade: renderizar a seção #convenios com um card por convênio
   aceito pela clínica, incluindo a imagem original do convênio e a lista
   de procedimentos cobertos.

   Módulo novo porque o template original (restaurante) não tinha nenhum
   conceito equivalente — "convênio" é uma entidade própria do setor de
   saúde/odontologia, com sua própria fonte de dados
   (assets/data/convenios.json) e não se encaixa em cardapio.json (que
   aqui foi reaproveitado para "Especialidades").
   ========================================================================== */

(() => {
  "use strict";

  const App = window.CoffeeSitesPro;

  if (!App) {
    console.error(
      "[CoffeeSitesPro] main.js não foi carregado antes de convenios.js."
    );
    return;
  }

  const { qs, loadJSON } = App.utils;

  const conveniosModule = {
    data: null,

    buildConvenioCard(convenio) {
      const card = document.createElement("article");
      card.className = "card convenio-card";

      const coberturasHTML = (convenio.coberturas || [])
        .map((c) => `<li><i class="fa-solid fa-check"></i> ${c}</li>`)
        .join("");

      card.innerHTML = `
        <div class="convenio-card-image">
          <img src="${convenio.imagem}" alt="Convênio ${convenio.nome}" loading="lazy" decoding="async">
        </div>
        <div class="convenio-card-body">
          <h3 class="convenio-card-title">${convenio.nome}</h3>
          ${convenio.subtitulo ? `<p class="convenio-card-subtitle">${convenio.subtitulo}</p>` : ""}
          <ul class="convenio-card-list">${coberturasHTML}</ul>
        </div>
      `;

      return card;
    },

    render() {
      const container = qs("#convenios-content");
      if (!container || !this.data) return;

      container.innerHTML = "";
      (this.data.convenios || []).forEach((convenio) => {
        container.appendChild(this.buildConvenioCard(convenio));
      });
    },

    async init() {
      this.data = await loadJSON("assets/data/convenios.json");
      if (!this.data) return;
      this.render();

      const animationsModule = App.modules.animations;
      if (animationsModule && typeof animationsModule.init === "function") {
        animationsModule.init();
      }
    },
  };

  App.modules.convenios = conveniosModule;

  if (document.readyState !== "loading") {
    conveniosModule.init();
  }
})();
