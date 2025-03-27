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
                      <div class="modal__field">
                          <label class="modal__label" for="input-quantity">Quantidade</label>
                          <input class="modal__input" type="number" id="input-quantity" name="quantity" min="0" />
                      </div>
                      <!-- Campo de Observação -->
                      <div class="modal__field hidden" id="modal__field-observation">
                          <label class="modal__label" for="input-observation">Observação</label>
                          <textarea class="modal__textarea" id="input-observation" name="observation"></textarea>
                      </div>
                      <!-- Campo de Lucro -->
                      <div class="modal__field hidden" id="modal__field-profit">
                          <label class="modal__label" for="input-profit">Lucro</label>
                          <div class="modal__input-group">
                              <span class="modal__prefix">R$</span>
                              <input class="modal__input" type="number" id="input-profit" name="profit" />
                          </div>
                      </div>
                      <div class="modal__field modal__field--custom">
                          <button class="modal__button modal__button--custom" type="button" id="button-stock">
                              <div class="modal__button-image">
                                  <img 
                                      src="../image/stock.svg" 
                                      alt="Adicionar ao Estoque"
                                      width="25"
                                      height="25"
                                      id="image-stock"
                                  />
                              </div>
                              <span class="modal__button-text">Adicionar ao Estoque</span>
                          </button>
                          <button class="modal__button modal__button--custom" type="button" id="button-observation">
                              <div class="modal__button-image">
                                  <img 
                                      src="../image/comentario.svg" 
                                      alt="Adicionar Observação"
                                      width="25"
                                      height="25"
                                      id="image-observation"
                                  />
                              </div>
                              <span class="modal__button-text">Adicionar Observação</span>
                          </button>
                          <button class="modal__button modal__button--custom" type="button" id="button-profit">
                              <div class="modal__button-image">
                                  <img 
                                      src="../image/payment.svg" 
                                      alt="Adicionar Lucro"
                                      width="25"
                                      height="25"
                                      id="image-profit"
                                  />
                              </div>
                              <span class="modal__button-text">Adicionar Lucro</span>
                          </button>
                      </div>
                  </form>
              </div>
              <div class="modal__footer">
                  <button class="modal__button modal__button--cancel" type="button" id="button-cancel">
                      <img 
                          src="../image/cancel.png" 
                          alt="Botão Cancelar"
                          width="30"
                          height="30"   
                      />
                  </button>
                  <button class="modal__button" type="submit" id="button-save">
                      <img 
                          src="../image/right.png" 
                          alt="Botão Concluir"
                          width="50"
                          height="50"   
                      />
                  </button>
              </div>
          </div>
      `;

  bloco.querySelector("#button-stock").addEventListener("click", () => {
    alert("Produto adicionado ao estoque!");
  });

  bloco.querySelector("#button-observation").addEventListener("click", () => {
    const field = bloco.querySelector("#modal__field-observation");
    field.classList.toggle("hidden");
  });

  bloco.querySelector("#button-profit").addEventListener("click", () => {
    const field = bloco.querySelector("#modal__field-profit");
    field.classList.toggle("hidden");
  });

  bloco.querySelector("#button-cancel").addEventListener("click", () => {
    bloco.remove();
  });

  bloco.querySelector(".modal__close").addEventListener("click", () => {
    bloco.remove();
  });

  bloco.querySelector("#button-save").addEventListener("click", () => {
    const form = bloco.querySelector(".modal__form");
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data.entries());
    console.log(dataObj);
    bloco.remove();
  });

  return bloco;
};

export { ProductModal };
