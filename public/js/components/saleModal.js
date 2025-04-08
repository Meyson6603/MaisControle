const addSaleToLocalStorage = (sale) => {
  const existingSales = JSON.parse(localStorage.getItem("sales")) || [];
  existingSales.push(sale);
  localStorage.setItem("sales", JSON.stringify(existingSales));
};

const SaleModal = () => {
  const bloco = document.createElement("div");
  bloco.classList.add("modal");
  bloco.innerHTML = `
      <div class="modal__dialog">
        <div class="modal__header">
          <h2 class="modal__title">Nova Venda</h2>
          <button class="modal__close" type="button">X</button>
        </div>
        <div class="modal__body">
          <form class="modal__form">
            ${renderSaleFields()}
            ${renderProductsSection()}
          </form>
        </div>
        <div class="modal__footer">
          ${renderFooterButtons()}
        </div>
      </div>
    `;

  attachSaleListeners(bloco);
  return bloco;
};

const renderSaleFields = () => `
    <div class="modal__field">
      <label class="modal__label" for="input-customer-name">Cliente</label>
      <input class="modal__input" type="text" id="input-customer-name" name="customerName" />
    </div>
    <div class="modal__field">
      <label class="modal__label" for="input-customer-contact">Contato</label>
      <input class="modal__input" type="text" id="input-customer-contact" name="customerContact" />
    </div>
    <div class="modal__field">
      <label class="modal__label" for="input-status">Status</label>
      <select class="modal__select" id="input-status" name="status">
        <option value="pending">Pendente</option>
        <option value="paid">Pago</option>
        <option value="cancelled">Cancelado</option>
      </select>
    </div>
    <div class="modal__field">
      <label class="modal__label" for="input-sale-type">Tipo de Venda</label>
      <select class="modal__select" id="input-sale-type" name="saleType">
        <option value="avista">À Vista</option>
        <option value="parcelado">Parcelado</option>
      </select>
    </div>
    <div class="modal__field" id="field-installments" style="display:none;">
      <label class="modal__label" for="input-installments">Parcelas</label>
      <input class="modal__input" type="number" id="input-installments" name="installments" min="1" />
    </div>
  `;

const renderProductsSection = () => `
    <div class="modal__field">
      <label class="modal__label">Produtos</label>
      <div id="products-container"></div>
      <button class="modal__button modal__button--custom" type="button" id="add-product-button">
        <span class="modal__button-text">Adicionar Produto</span>
      </button>
    </div>
    <div class="modal__field">
      <label class="modal__label">Total da Venda: R$ <span id="sale-total">0.00</span></label>
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

const attachSaleListeners = (bloco) => {
  const productsContainer = bloco.querySelector("#products-container");
  const saleTotalEl = bloco.querySelector("#sale-total");
  const saleTypeSelect = bloco.querySelector("#input-sale-type");
  const fieldInstallments = bloco.querySelector("#field-installments");

  let saleProducts = [];

  const getStoredProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
  };

  saleTypeSelect.addEventListener("change", () => {
    fieldInstallments.style.display =
      saleTypeSelect.value === "parcelado" ? "block" : "none";
  });

  bloco.querySelector("#add-product-button").addEventListener("click", () => {
    const storedProducts = getStoredProducts();
    if (storedProducts.length === 0) {
      alert("Nenhum produto cadastrado.");
      return;
    }

    const select = document.createElement("select");
    select.classList.add("modal__select");

    storedProducts.forEach((prod) => {
      const option = document.createElement("option");
      option.value = prod.sku;
      option.textContent = `${prod.name} - R$${Number(prod.price).toFixed(2)}`;
      select.appendChild(option);
    });

    const priceDisplay = document.createElement("div");
    priceDisplay.classList.add("modal__label");

    const updatePriceDisplay = () => {
      const selectedSku = select.value;
      const selectedProduct = storedProducts.find((p) => p.sku == selectedSku);
      priceDisplay.textContent = selectedProduct
        ? `Preço: R$ ${Number(selectedProduct.price).toFixed(2)}`
        : "Preço: R$ 0.00";
    };

    updatePriceDisplay();
    select.addEventListener("change", updatePriceDisplay);

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.placeholder = "Quantidade";
    quantityInput.classList.add("modal__input");

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Adicionar";
    confirmButton.type = "button";
    confirmButton.classList.add("modal__button");

    const inputGroup = document.createElement("div");
    inputGroup.classList.add("modal__field");
    inputGroup.appendChild(select);
    inputGroup.appendChild(priceDisplay);
    inputGroup.appendChild(quantityInput);
    inputGroup.appendChild(confirmButton);
    productsContainer.appendChild(inputGroup);

    confirmButton.addEventListener("click", () => {
      const selectedSku = select.value;
      const quantity = parseInt(quantityInput.value);

      if (!selectedSku || isNaN(quantity) || quantity < 1) {
        alert("Selecione um produto e informe uma quantidade válida.");
        return;
      }

      const selectedProduct = storedProducts.find((p) => p.sku == selectedSku);
      const productPrice = Number(selectedProduct.price);
      const total = productPrice * quantity;

      saleProducts.push({
        product_sku: selectedProduct.sku,
        product_name: selectedProduct.name,
        price: productPrice,
        quantity,
      });

      const item = document.createElement("div");
      item.classList.add("product-summary");
      item.innerHTML = `
  <span class="product-name">${selectedProduct.name}</span>
  <span class="product-qty">${quantity} x R$${productPrice.toFixed(2)}</span>
  <span class="product-total">= R$${total.toFixed(2)}</span>
`;
      productsContainer.appendChild(item);

      inputGroup.remove();

      const totalSaleValue = saleProducts.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
      );
      saleTotalEl.textContent = `${totalSaleValue.toFixed(2)}`;
    });
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
    const saleData = Object.fromEntries(data.entries());

    const total = saleProducts.reduce(
      (acc, p) => acc + Number(p.price) * p.quantity,
      0
    );

    const fullSale = {
      ...saleData,
      userId: 1,
      total,
      products: saleProducts,
    };

    addSaleToLocalStorage(fullSale);
    bloco.remove();
  });
};

export { SaleModal };
