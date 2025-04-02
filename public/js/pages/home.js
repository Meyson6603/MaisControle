export default function general() {
    const body = document.querySelector("body");
    body.innerHTML = `<div class="main-container-general">
        <header class="header">
            <div class="header__container">
                <h1 class="header__logo">+ Controle</h1>
                <nav class="header__menu">
                    <a href="#" class="header__link active" data-target="overview">Visão Geral</a>
                    <a href="#" class="header__link" data-target="entries">Lançamentos</a>
                    <a href="#" class="header__link" data-target="reports">Relatórios</a>
                    <a href="#" class="header__link" data-target="management">Gestão</a>
                    <a href="#" class="header__link header__simulator" data-target="simulator">Simulador</a>
                </nav>
                <div class="header__actions">
                    <a href="#" id="settings-button"><img src="../../image/settings.svg" alt="Configurações"
                            class="header__icon"></a>
                    <a href="#"><img src="../../image/notification.svg" alt="Notificações" class="header__icon"></a>
                    <a href="/login"><img src="../../image/exit.svg" alt="Sair" class="header__icon"></a>

                    <div id="settings-menu" class="settings-menu" style="display: none;">
                        <ul class="settings-menu__list">
                            <li><a href="#" class="settings-menu__item">Categorias</a></li>
                            <li><a href="#" class="settings-menu__item">Contas</a></li>
                            <li><a href="#" class="settings-menu__item">Cartões</a></li>
                            <li><a href="#" class="settings-menu__item">Perfil do Usuário</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

        <div class="box">
            <img class="box__calendar" src="../../image/calendar.svg" alt="Calendário">
            <div class="box__line"></div>
            <div class="box__left-section">
                <div class="box__label">
                    <p class="box__greeting">
                        <span class="box__text">Boa tarde</span>
                        <span class="box__span">,<br /></span>
                        <span class="box__text-secondary">Fulano!</span>
                    </p>
                    <img class="box__weather" src="../../image/nebuloso.svg" alt="Nebuloso">
                </div>
                <div class="box__info">
                    <div class="box__group">
                        <div class="box__text">Receita Mensal</div>
                        <div class="box__income">R$ 0,00</div>
                    </div>
                    <div class="box__divider"></div>
                    <div class="box__group-secondary">
                        <div class="box__text-secondary">Despesa Mensal</div>
                        <div class="box__expense">R$ 0,00</div>
                    </div>
                </div>
            </div>
            <div class="box__right-section">
                <div class="box__quick-access">Acesso rápido</div>
                <div class="box__icons">
                    <button><img src="../../image/despesa.png" alt="Despesa"></button>
                    <button><img src="../../image/receita.png" alt="Receita"></button>
                    <button><img src="../../image/relatorio.png" alt="Relatório"></button>
                </div>
            </div>
        </div>

        <div class="cards-container">
            <div class="cards cards--left">
                <div class="card">
                    <div class="card__data">
                        <div class="card__text">Saldo Geral</div>
                        <p class="card__value">
                            <span class="card__currency">R$</span>
                            <span class="card__amount">200</span>
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card__data">
                        <div class="card__text">Faturas de Março</div>
                        <p class="card__value">
                            <span class="card__currency">R$</span>
                            <span class="card__amount">200</span>
                        </p>
                    </div>
                </div>
                <div class="card">
                    <div class="card__data">
                        <div class="card__text">Contas a Receber</div>
                        <p class="card__value">
                            <span class="card__currency">R$</span>
                            <span class="card__amount">200</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="cards cards--right">
                <div class="cards__images">
                    <button class="botao-svg" id="add-product-button"><img
                            src="../../image/svg/adicionarProduto.svg" alt=""></button>
                    <button class="botao-svg"> <img src="../image/svg/registrarVenda.svg" alt=""> </button>
                </div>
                <div class="card">
                    <div class="card__data">
                        <div class="card__text">Contas a Pagar</div>
                        <p class="card__value">
                            <span class="card__currency">R$</span>
                            <span class="card__amount">200</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}
