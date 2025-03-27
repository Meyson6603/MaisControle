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

    // Cache selectors for radio options and related fields
    const radioFixed = bloco.querySelector('#recurrent-fixed');
    const radioInstallments = bloco.querySelector('#recurrent-installments');
    const fieldFrequencyAlt = bloco.querySelector('#modal__field-frequency-alt');
    const fieldFrequency = bloco.querySelector('#modal__field-frequency'); 
    const fieldNumber = bloco.querySelector('#modal__field-number'); 

    radioFixed.addEventListener('change', () => {
        fieldFrequencyAlt.classList.remove('hidden');
        fieldFrequency.classList.add('hidden');
        fieldNumber.classList.add('hidden');
    });

    radioInstallments.addEventListener('change', () => {
        fieldFrequencyAlt.classList.add('hidden');
        fieldFrequency.classList.remove('hidden');
        fieldNumber.classList.remove('hidden');
    });


    const toggleButtonState = (buttonSelector, imgSelector, imageName, checkedImageName, inputSelector) => {
        const button = bloco.querySelector(buttonSelector);
        const image = bloco.querySelector(imgSelector);
        const background = button.querySelector('.modal__button-image');
        background.classList.toggle('checked');
        image.src = image.src.includes(imageName)
            ? `../image/${checkedImageName}`
            : `../image/${imageName}`;
        const input = bloco.querySelector(inputSelector);
        input.value = input.value === "true" ? "false" : "true";
    };

    bloco.querySelector('#button-repeat').addEventListener('click', () => {
        bloco.querySelector('#modal__field-repeat').classList.toggle('hidden');
        toggleButtonState('#button-repeat', '#image-repeat', 'repeat.png', 'repeat_checked.png', '#repetiton');
    });


    bloco.querySelector('#button-observation').addEventListener('click', () => {
        bloco.querySelector('#modal__field-observation').classList.toggle('hidden');
        toggleButtonState('#button-observation', '#image-observation', 'observation.png', 'observation_checked.png', '#observation');
    });

    bloco.querySelector('#button-pay').addEventListener('click', () => {
        toggleButtonState('#button-pay', '#image-pay', 'pay.png', 'pay_checked.png', '#paid');
    });


    bloco.querySelector('#button-cancel').addEventListener('click', () => {
        bloco.remove();
    });

    bloco.querySelector('.modal__close').addEventListener('click', () => {
        bloco.remove();
    });


    bloco.querySelector('#button-save').addEventListener('click', () => {
        const form = bloco.querySelector('#modal__form');
        form.querySelectorAll('.error-message').forEach(el => el.remove());

        let hasErrors = false;

        const displayError = (inputSelector, message) => {
            const field = form.querySelector(inputSelector);
            if (field) {
                const errorElem = document.createElement('div');
                errorElem.classList.add('error-message');
                errorElem.style.color = 'red';
                errorElem.style.fontSize = '0.65em';
                errorElem.textContent = message;
                field.parentElement.appendChild(errorElem);
                hasErrors = true;
            }
        };

        const descriptionInput = form.querySelector('#input-data');
        const valueInput = form.querySelector('#input-value');
        const dateInput = form.querySelector('#input-date');

        const description = descriptionInput.value.trim();
        const value = valueInput.value.trim();
        const date = dateInput.value.trim();

        if (!description) {
            displayError('#input-data', 'A descrição é obrigatória.');
        }
        if (!value) {
            displayError('.modal__input-group', 'O valor é obrigatório.');
        }
        if (!date) {
            displayError('#input-date', 'A data é obrigatória.');
        }

        const repetitionActive = form.querySelector('#repetiton').value === "true";
        if (repetitionActive) {
            const radioFixed = form.querySelector('input[name="recurrent"][value="fixed"]');
            const radioInstallments = form.querySelector('input[name="recurrent"][value="installments"]');

            if (radioFixed.checked) {
                const frequencyAlt = form.querySelector('#input-frequency-alt').value;
                if (!frequencyAlt) {
                    displayError('#input-frequency-alt', 'O período para receita fixa é obrigatório.');
                }
            } else if (radioInstallments.checked) {
                const frequencyInstallments = form.querySelector('#input-frequency').value;
                const numberValue = form.querySelector('#input-number').value;
                if (!frequencyInstallments) {
                    displayError('#input-frequency', 'O período para receita parcelada é obrigatório.');
                }
                if (!numberValue) {
                    displayError('#input-number', 'Campo obrigatório.');
                }
            } else {
                displayError('#recurrent-installments', 'Selecione o tipo de repetição desejado.');
            }
        }

        const observationActive = form.querySelector('#observation').value === "true";
        if (observationActive) {
            const observationContent = form.querySelector('#input-observation').value.trim();
            if (!observationContent) {
                displayError('#input-observation', 'A observação é obrigatória.');
            }
        }

        const inputCategoria = form.querySelector('#input-categoria');
        if (!inputCategoria.value) {
            displayError('#input-categoria', 'Categoria é obrigatória.');
        }

        if (hasErrors) {
            return;
        }

        const data = new FormData(form);
        for (const key of [...data.keys()]) {
            let value = data.get(key);
            if (typeof value === 'string') {
            value = value.trim();
            data.set(key, value);
            }
            // Para o campo de observação, remove se estiver vazio
            if (!value && key === 'observation-content') {
            data.delete(key);
            }
            // Se a repetição não estiver ativa, remove os campos de frequência e número, mesmo que tenham valor
            if (!repetitionActive && ['number', 'frequency-installments', 'frequency-fixed'].includes(key)) {
            data.delete(key);
            }
        }

        data.set('expense', JSON.stringify(expense));

        // Converter FormData para um objeto para envio à API
        const dataObj = Object.fromEntries(data.entries());
        console.log(dataObj);
    });

    const form = bloco.querySelector('#modal__form');

    const removeError = (element) => {
        const errorElem = element.parentElement.querySelector('.error-message');
        if (errorElem) {
            errorElem.remove();
        }
    };

    form.querySelectorAll('input[name="recurrent"]').forEach(radio => {
        radio.addEventListener('change', () => {
            removeError(form.querySelector('#recurrent-installments'));
        });
    });

    const inputData = form.querySelector('#input-data');
    inputData.addEventListener('input', () => {
        removeError(inputData);
    });

    const inputValue = form.querySelector('#input-value');
    inputValue.addEventListener('input', () => {
        removeError(inputValue.parentElement)
    });

    const inputDate = form.querySelector('#input-date');
    inputDate.addEventListener('input', () => {
        removeError(inputDate);
    });

    const inputConta = form.querySelector('#input-conta');
    inputConta.addEventListener('change', () => {
        removeError(inputConta);
    });

    const inputCategoria = form.querySelector('#input-categoria');
    inputCategoria.addEventListener('change', () => {
        removeError(inputCategoria);
    });

    const inputFrequencyAlt = form.querySelector('#input-frequency-alt');
    if (inputFrequencyAlt) {
        inputFrequencyAlt.addEventListener('change', () => {
            removeError(inputFrequencyAlt);
        });
    }

    const inputFrequency = form.querySelector('#input-frequency');
    if (inputFrequency) {
        inputFrequency.addEventListener('change', () => {
            removeError(inputFrequency);
        });
    }

    const inputNumber = form.querySelector('#input-number');
    if (inputNumber) {
        inputNumber.addEventListener('input', () => {
            removeError(inputNumber);
        });
    }

    const inputObservation = form.querySelector('#input-observation');
    if (inputObservation) {
        inputObservation.addEventListener('input', () => {
            removeError(inputObservation);
        });
    }

    return bloco;
};

export { TransactionModal };