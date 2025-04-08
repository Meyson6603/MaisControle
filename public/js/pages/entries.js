export default function entries() {
    const body = document.querySelector("body");
    body.innerHTML = `
        <header class="header">
            <div class="header__logo">+ Controle</div>
            <button class="header__button" id="btnHome">Início</button>
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

    // Botão para voltar à página inicial
    const btnHome = document.getElementById("btnHome");
    btnHome.addEventListener("click", () => {
        history.pushState({}, "", "/general");
        import("./home.js").then((module) => module.default());
    });

    // Botão para adicionar um novo lançamento
    const btnAddEntry = document.getElementById("btnAddEntry");
    btnAddEntry.addEventListener("click", () => {
        alert("Adicionar lançamento clicado!");
        // Aqui você pode abrir um modal ou redirecionar para outra página para adicionar lançamentos
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