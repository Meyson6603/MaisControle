import { addTransaction } from "./stateManager.js";
import { updateUI } from "./uiUpdate.js";

const TransactionModal = (expense = true) => {
  const bloco = document.createElement("div");
  bloco.classList.add("modal");
  bloco.innerHTML = `
        <div class="modal__dialog">
            <div class="modal__header">
                <h2 class="modal__title">Nova ${
                  expense ? "Despesa" : "Receita"
                }</h2>
                <button class="modal__close" type="button">X</button>
            </div>
            <div class="modal__body">
                <form class="modal__form" id="modal__form">
                    <input type="hidden" name="repetition" id="repetiton" value="false"/>
                    <input type="hidden" name="expense" id="repetiton" value='${expense}'/>
                    <input type="hidden" name="paid" id="paid" value="false"/>
                    <input type="hidden" name="observation" id="observation" value="false"/>
                    <div class="modal__field">
                        <label class="modal__label" for="input-data">Descrição</label>
                        <input class="modal__input" type="text" id="input-data" name="data" />
                    </div>
                    <div class="modal__field">
                        <label class="modal__label" for="input-value">Valor</label>
                        <div class="modal__input-group">
                            <span class="modal__prefix">R$</span>
                            <input class="modal__input" type="number" id="input-value" name="value" />
                        </div>
                    </div>
                    <div class="modal__field">
                        <label class="modal__label" for="input-date">Data</label>
                        <input class="modal__input" type="date" id="input-date" name="date" />
                    </div>
                    <div class="modal__field">
                        <label class="modal__label" for="input-conta">Conta</label>
                        <select class="modal__select" id="input-conta" name="conta">
                            <option class="modal__option" value="default">Conta Inicial</option>
                        </select>
                    </div>
                    <div class="modal__field">
                        <label class="modal__label" for="input-categoria">Categoria</label>
                        <select class="modal__select" id="input-categoria" name="categoria">
                            <option class="modal__option" value="">Buscar</option>
                            <option class="modal__option" value="work">Trabalho</option>
                            <option class="modal__option" value="sales">Vendas</option>
                            <option class="modal__option" value="retirement">Aposentadoria ou Benefício</option>
                            <option class="modal__option" value="rent">Aluguel</option>
                            <option class="modal__option" value="assistance">Assistência ou Presente</option>
                            <option class="modal__option" value="other">Outra Receita</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal__footer">
                <button class="modal__button modal__button--cancel" type="button" id="button-cancel">Cancelar</button>
                <button class="modal__button" type="submit" id="button-save">Salvar</button>
            </div>
        </div>
    `;

  bloco
    .querySelector(".modal__close")
    .addEventListener("click", () => bloco.remove());
  bloco
    .querySelector("#button-cancel")
    .addEventListener("click", () => bloco.remove());

  bloco.querySelector("#button-save").addEventListener("click", (event) => {
    event.preventDefault();
    const form = bloco.querySelector("#modal__form");
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data.entries());
    dataObj.value = parseFloat(dataObj.value) || 0;

    if (!dataObj.data || !dataObj.value || !dataObj.date) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    const type = dataObj.expense === "true" ? "expense" : "income";
    addTransaction(type, dataObj);
    e;
    updateUI();

    bloco.remove();
  });

  return bloco;
};

export { TransactionModal };
