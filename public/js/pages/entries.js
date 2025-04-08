import home from "./home.js"; // Importa a página Visão Geral

export default function entries() {
    const body = document.querySelector("body");
    body.innerHTML = `
        <header class="header">
            <div class="header__container">
                <h1 class="header__logo">+ Controle</h1>
                <nav class="header__menu">
                    <a href="#" class="header__link" data-target="overview">Visão Geral</a>
                    <a href="#" class="header__link active" data-target="entries">Lançamentos</a>
                    <a href="#" class="header__link" data-target="reports">Relatórios</a>
                    <a href="#" class="header__link" data-target="management">Gestão</a>
                    <a href="#" class="header__link header__simulator" data-target="simulator">Simulador</a>
                </nav>
                <div class="header__actions">
                    <a href="#" id="settings-button"><img src="../../image/settings.svg" alt="Configurações" class="header__icon"></a>
                    <a href="#"><img src="../../image/notification.svg" alt="Notificações" class="header__icon"></a>
                    <a href="/login"><img src="../../image/exit.svg" alt="Sair" class="header__icon"></a>
                </div>
            </div>
        </header>

        <main class="container">
            <section class="entries-section">
                <h2 class="entries-section__title">Lançamentos</h2>
                <button class="entries-section__button" id="btnAddEntry">Adicionar Lançamento</button>
                <div class="entries-list" id="entriesList">
                    <!-- Lista de lançamentos será renderizada aqui -->
                </div>
            </section>
        </main>
    `;

    // Adiciona evento ao link de Visão Geral
    const overviewLink = document.querySelector('[data-target="overview"]');
    overviewLink.addEventListener("click", (e) => {
        e.preventDefault();
        history.pushState({}, "", "/general"); // Atualiza a URL
        home(); // Carrega a página Visão Geral
    });

    // Botão para adicionar um novo lançamento
    const btnAddEntry = document.getElementById("btnAddEntry");
    btnAddEntry.addEventListener("click", () => {
        alert("Adicionar lançamento clicado!");
    });

    // Função para carregar lançamentos (exemplo)
    const loadEntries = async () => {
        try {
            const response = await fetch("/api/entries");
            if (response.ok) {
                const entries = await response.json();
                const entriesList = document.getElementById("entriesList");
                entriesList.innerHTML = entries.map(entry => `
                    <div class="entry-item">
                        <p><strong>${entry.title}</strong></p>
                        <p>${entry.description}</p>
                        <p>Valor: R$ ${entry.amount}</p>
                    </div>
                `).join("");
            } else {
                console.error("Erro ao carregar lançamentos.");
            }
        } catch (error) {
            console.error("Erro ao carregar lançamentos:", error);
        }
    };

    // Carregar lançamentos ao carregar a página
    loadEntries();
}