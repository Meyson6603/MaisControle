const TransactionModal = (expense = true) => {
    const bloco = document.createElement('div');
    bloco.classList.add('modal');
    bloco.innerHTML = `
        <div class="modal__dialog">
            <div class="modal__header">
                <h2 class="modal__title">Nova ${expense ? "Despesa" : "Receita"}</h2>
                <button class="modal__close" type="button">X</button>
            </div>
            <div class="modal__body">
                <form class="modal__form">
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
                            <input class="modal__input" type="text" id="input-value" name="value" />
                        </div>
                    </div>
                    <div class="modal__field">
                        <label class="modal__label" for="input-date">Data</label>
                        <input class="modal__input" type="date" id="input-date" name="data" />
                    </div>
                    <div class="modal__field">
                        <label class="modal__label" for="input-conta">Conta</label>
                        <select class="modal__select" id="input-conta" name="conta">
                            <option class="modal__option" value="">Conta Inicial</option>
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
                    <div class="modal__field hidden" id="modal__field-observation">
                        <label class="modal__label" for="input-observation">Observação</label>
                        <textarea class="modal__textarea" id="input-observation" name="observation-content"></textarea>
                    </div>
                    <div class="modal__field hidden" id="modal__field-repeat">
                        <span class="modal__label">Repetir</span>
                        <label class="modal__radio">
                            <input id="recurrent-fixed" class="modal__radio-input" type="radio" name="recurrent" value="fixed" />
                            <span class="modal__radio-label">É uma receita fixa</span>
                        </label>
                        <label id="recurrent-installments" class="modal__radio">
                            <input class="modal__radio-input" type="radio" name="recurrent" value="installments" />
                            <span class="modal__radio-label">É uma receita parcelada</span>
                        </label>
                        <div class="modal__field-group">
                            <div class="modal__field hidden" id="modal__field-number">
                                <label class="modal__label" for="input-number">Parcelas</label>
                                <input class="modal__input" type="number" id="input-number" name="number" />
                            </div>
                            <div class="modal__field hidden" id="modal__field-frequency">
                                <label class="modal__label" for="input-frequency">Período</label>
                                <select class="modal__select" id="input-frequency" name="frequency-installments">
                                    <option class="modal__option" value="annual">Anos</option>
                                    <option class="modal__option" value="semiannual">Semestres</option>
                                    <option class="modal__option" value="quarterly">Trimestres</option>
                                    <option class="modal__option" value="bimonthly">Bimestres</option>
                                    <option class="modal__option" value="monthly">Meses</option>
                                    <option class="modal__option" value="biweekly">Quinzenas</option>
                                    <option class="modal__option" value="weekly">Semanas</option>
                                    <option class="modal__option" value="daily">Dias</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal__field hidden" id="modal__field-frequency-alt">
                            <label class="modal__label" for="input-frequency-alt">Período</label>
                            <select class="modal__select" id="input-frequency-alt" name="frequency-fixed">
                                <option class="modal__option" value="daily">Diário</option>
                                <option class="modal__option" value="weekly">Semanal</option>
                                <option class="modal__option" value="biweekly">Quinzenal</option>
                                <option class="modal__option" value="monthly">Mensal</option>
                                <option class="modal__option" value="bimonthly">Bimestral</option>
                                <option class="modal__option" value="quarterly">Trimestral</option>
                                <option class="modal__option" value="semiannual">Semestral</option>
                                <option class="modal__option" value="annual">Anual</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal__field modal__field--custom">
                        <button class="modal__button modal__button--custom" type="button" id="button-repeat">
                            <div class="modal__button-image">                             
                                <img 
                                    src="../image/repeat.png" 
                                    alt="Botão Repetir"
                                    width="25"
                                    height="25"
                                    id="image-repeat"
                                />
                            </div>
                            <span class="modal__button-text">Repetir</span>
                        </button>
                        <button class="modal__button  modal__button--custom" type="button" id="button-observation">
                            <div class="modal__button-image">                             
                                <img 
                                    src="../image/observation.png" 
                                    alt="Botão Observação"
                                    width="25"
                                    height="25"
                                    id="image-observation"
                                />
                            </div>
                            <span class="modal__button-text">Observação</span>
                        </button>
                        <button class="modal__button  modal__button--custom" type="button" id="button-pay">
                            <div class="modal__button-image">                             
                                <img 
                                    src="../image/pay.png" 
                                    alt="Botão Recebido"
                                    width="25"
                                    height="25"
                                    id="image-pay"
                                />
                            </div>
                            <span class="modal__button-text">${expense ? "Pago" : "Recebido"}</span>
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
                        alt="Botão Salvar"
                        width="50"
                        height="50"   
                    />
                </button>
            </div>
        </div>
    `;

    const radioFixed = bloco.querySelector('#recurrent-fixed');
    const radioInstallments = bloco.querySelector('#recurrent-installments');

    const fieldFrequencyAlt = bloco.querySelector('#modal__field-frequency-alt');
    const fieldFrequency = bloco.querySelector('#modal__field-frequency'); 
    const fieldNumber = bloco.querySelector('#modal__field-number'); 

    radioFixed.addEventListener('change', (event) => {
        fieldFrequencyAlt.classList.remove('hidden');
        fieldFrequency.classList.add('hidden');
        fieldNumber.classList.add('hidden');
    });

    radioInstallments.addEventListener('change', (event) => {
        fieldFrequencyAlt.classList.add('hidden');
        fieldFrequency.classList.remove('hidden');
        fieldNumber.classList.remove('hidden');
    });

    bloco.querySelector('#button-repeat').addEventListener('click', function() {
        const field = bloco.querySelector('#modal__field-repeat');
        const buttonImage = bloco.querySelector('#button-repeat');
        const background = buttonImage.querySelector('.modal__button-image');
        background.classList.toggle('checked');
        const image = buttonImage.querySelector('#image-repeat');
        image.src = image.src.includes('repeat.png') ? '../image/repeat_checked.png' : '../image/repeat.png';
        field.classList.toggle('hidden');
        const input = bloco.querySelector('#repetiton');
        input.value = input.value === "true" ? "false" : "true";
    });

    bloco.querySelector('#button-observation').addEventListener('click', () => {
        const field = bloco.querySelector('#modal__field-observation');
        const buttonObservation = bloco.querySelector('#button-observation');
        const background = buttonObservation.querySelector('.modal__button-image');
        const image = buttonObservation.querySelector('#image-observation');
        image.src = image.src.includes('observation.png') ? '../image/observation_checked.png' : '../image/observation.png';
        background.classList.toggle('checked');
        field.classList.toggle('hidden');
        const input = bloco.querySelector('#observation');
        input.value = input.value === "true" ? "false" : "true";
    });

    bloco.querySelector('#button-pay').addEventListener('click', () => {
        const buttonPaid = bloco.querySelector('#button-pay');
        const background = buttonPaid.querySelector('.modal__button-image');
        const image = buttonPaid.querySelector('#image-pay');
        image.src = image.src.includes('pay.png') ? '../image/pay_checked.png' : '../image/pay.png';
        background.classList.toggle('checked');
        const input = bloco.querySelector('#paid');
        input.value = input.value === "true" ? "false" : "true";
    });

    bloco.querySelector('#button-cancel').addEventListener('click', () => {
        bloco.remove();
    });

    bloco.querySelector('#button-save').addEventListener('click', () => {    
        const form = bloco.querySelector('.modal__form');
        const data = new FormData(form);
        const dataObj = Object.fromEntries(data.entries());
        console.log(dataObj);
    });

    bloco.querySelector('.modal__close').addEventListener('click', () => {
        bloco.remove();
    });

    return bloco;
};

export { TransactionModal };