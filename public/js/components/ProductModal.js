const ProductModal = () => {
  const bloco = document.createElement("div");
  bloco.classList.add("modal");
  bloco.innerHTML = `
      <div class="modal__dialog">
        <div class="modal__header">
          <h2 class="modal__title">Novo Produto</h2>
          <button class="modal__close" type="button">X</button>
        </div>
        <div class="modal__body">
          <form class="modal__form">
            ${renderBasicFields()}
            ${renderHiddenFields()}
            ${renderActionButtons()}
          </form>
        </div>
        <div class="modal__footer">
          ${renderFooterButtons()}
        </div>
      </div>
    `;

  attachEventListeners(bloco);

  return bloco;
};

const renderBasicFields = () => `
    <div class="modal__field">
      <label class="modal__label" for="input-name">Nome</label>
      <input class="modal__input" type="text" id="input-name" name="name" />
    </div>
    <div class="modal__field">
      <label class="modal__label" for="input-price">Preço</label>
      <div class="modal__input-group">
        <span class="modal__prefix">R$</span>
        <input class="modal__input" type="number" id="input-price" name="price" />
      </div>
    </div>
    <div class="modal__field">
      <label class="modal__label" for="input-expiry">Data de Vencimento</label>
      <input class="modal__input" type="date" id="input-expiry" name="expiryDate" />
    </div>
    <div class="modal__field">
      <label class="modal__label" for="input-category">Categoria</label>
      <select class="modal__select" id="input-category" name="category">
        <option class="modal__option" value="">Selecionar</option>
        <option class="modal__option" value="electronics">Eletrônicos</option>
        <option class="modal__option" value="clothing">Roupas</option>
        <option class="modal__option" value="food">Alimentos</option>
        <option class="modal__option" value="other">Outros</option>
      </select>
    </div>
    <div class="modal__field">
      <label class="modal__label" for="input-sku">SKU</label>
      <input class="modal__input" type="text" id="input-sku" name="sku" />
    </div>
  `;

const renderHiddenFields = () => `
    <div class="modal__field hidden" id="modal__field-stock">
      <div class="modal__field">
        <label class="modal__label" for="input-quantity">Quantidade</label>
        <input class="modal__input" type="number" id="input-quantity" name="quantity" min="0" />
      </div>
      <div class="modal__field">
        <label class="modal__label" for="input-minimum">Mínimo</label>
        <input class="modal__input" type="number" id="input-minimum" name="minimum" min="0" />
      </div>
      <div class="modal__field">
        <label class="modal__label" for="input-maximum">Máximo</label>
        <input class="modal__input" type="number" id="input-maximum" name="maximum" min="0" />
      </div>
    </div>
    <div class="modal__field hidden" id="modal__field-observation">
      <label class="modal__label" for="input-observation">Observação</label>
      <textarea class="modal__textarea" id="input-observation" name="observation"></textarea>
    </div>
    <div class="modal__field hidden" id="modal__field-profit-cost">
      <label class="modal__label hidden" id="profit-cost-label" for="input-profit-cost">Lucro</label>
      <div class="modal__input-group ">
        <span class="modal__prefix">R$</span>
        <input class="modal__input" type="number" id="input-profit-cost" name="profitCost" />
      </div>
    </div>
  `;

const renderActionButtons = () => `
    <div class="modal__field modal__field--custom">
      <button class="modal__button modal__button--custom" type="button" id="button-stock">
        <div class="modal__button-image">
          <img src="../image/stock.svg" alt="Adicionar ao Estoque" width="25" height="25" />
        </div>
        <span class="modal__button-text">Adicionar ao Estoque</span>
      </button>
      <button class="modal__button modal__button--custom" type="button" id="button-observation">
        <div class="modal__button-image">
          <img src="../image/comentario.svg" alt="Adicionar Observação" width="25" height="25" />
        </div>
        <span class="modal__button-text">Adicionar Observação</span>
      </button>
      <button class="modal__button modal__button--custom" type="button" id="button-profit">
        <div class="modal__button-image">
          <img src="../image/payment.svg" alt="Adicionar Lucro/Custo" width="25" height="25" />
        </div>
        <span class="modal__button-text">Adicionar Lucro/Custo</span>
      </button>
    </div>
  `;

const renderFooterButtons = () => `
    <button class="modal__button modal__button--cancel" type="button" id="button-cancel">
      <img src="../image/cancel.png" alt="Botão Cancelar" width="30" height="30" />
    </button>
    <button class="modal__button" type="submit" id="button-save">
      <img src="../image/right.png" alt="Botão Concluir" width="50" height="50" />
    </button>
  `;

const attachEventListeners = (bloco) => {
  bloco.querySelector("#button-stock").addEventListener("click", () => {
    const stockField = bloco.querySelector("#modal__field-stock");
    stockField.classList.toggle("hidden");
  });

  bloco.querySelector("#button-observation").addEventListener("click", () => {
    const observationField = bloco.querySelector("#modal__field-observation");
    observationField.classList.toggle("hidden");
  });

  bloco.querySelector("#button-profit").addEventListener("click", () => {
    const profitCostField = bloco.querySelector("#modal__field-profit-cost");

    let radioContainer = bloco.querySelector(".modal__radio-group");
    if (!radioContainer) {
      radioContainer = document.createElement("div");
      radioContainer.classList.add("modal__radio-group");
      radioContainer.innerHTML = `
          <label>
            <input type="radio" name="profit-cost-type" value="Lucro" checked /> Lucro
          </label>
          <label>
            <input type="radio" name="profit-cost-type" value="Custo" /> Custo
          </label>
        `;
      const skuField = bloco.querySelector("#input-sku").parentElement;
      skuField.insertAdjacentElement("afterend", radioContainer);

      radioContainer.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        const profitCostLabel = bloco.querySelector("#profit-cost-label");
        profitCostLabel.textContent = selectedValue;
      });
    }

    const isHidden = profitCostField.classList.contains("hidden");
    if (isHidden) {
      profitCostField.classList.remove("hidden");
      radioContainer.style.display = "flex";
    } else {
      profitCostField.classList.add("hidden");
      radioContainer.style.display = "none";
    }
  });

  bloco.querySelector("#button-cancel").addEventListener("click", () => {
    bloco.remove();
  });

  bloco.querySelector(".modal__close").addEventListener("click", () => {
    bloco.remove();
  });

  bloco.querySelector("#button-save").addEventListener("click", (event) => {
    event.preventDefault();
    const form = bloco.querySelector(".modal__form");
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data.entries());
    console.log(dataObj);
    bloco.remove();
  });
};

export { ProductModal };
