document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".header__link"); // Seleciona os links do menu
  const sections = document.querySelectorAll(".content-section"); // Seleciona todas as seções
  const settingsButton = document.getElementById("settings-button"); // Botão de configurações
  const settingsMenu = document.getElementById("settings-menu"); // Menu de configurações

  // Função para ocultar todas as seções
  function hideAllSections() {
    sections.forEach((section) => {
      section.style.display = "none";
    });
  }

  // Função para mostrar a seção correspondente
  function showSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = "block";
    }
  }

  // Função para atualizar o link ativo
  function updateActiveLink(targetLink) {
    links.forEach((link) => link.classList.remove("active")); // Remove a classe 'active' de todos os links
    targetLink.classList.add("active"); // Adiciona a classe 'active' ao link clicado
  }

  // Adiciona evento de clique aos links
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Evita o comportamento padrão do link
      const targetId = link.getAttribute("data-target"); // Obtém o ID da seção alvo
      hideAllSections(); // Oculta todas as seções
      showSection(targetId); // Mostra a seção correspondente
      updateActiveLink(link); // Atualiza o link ativo
      settingsMenu.style.display = "none"; // Garante que o menu de configurações seja fechado
    });
  });

  // Alterna a visibilidade do menu de configurações
  settingsButton.addEventListener("click", (event) => {
    event.preventDefault(); // Evita o comportamento padrão do link
    const isMenuVisible = settingsMenu.style.display === "block";
    settingsMenu.style.display = isMenuVisible ? "none" : "block";
  });

  // Fecha o menu de configurações ao clicar fora dele
  document.addEventListener("click", (event) => {
    if (
      !settingsMenu.contains(event.target) && // Verifica se o clique não foi dentro do menu
      event.target !== settingsButton && // Verifica se o clique não foi no botão de configurações
      !settingsButton.contains(event.target) // Verifica se o clique não foi em um filho do botão
    ) {
      settingsMenu.style.display = "none";
    }
  });

  // Mostra a seção inicial (Visão Geral)
  hideAllSections();
  showSection("overview");
});
