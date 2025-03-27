import { ProductModal } from "../components/ProductModal.js";

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".header__link");
  const sections = document.querySelectorAll(".content-section");
  const settingsButton = document.getElementById("settings-button");
  const settingsMenu = document.getElementById("settings-menu");

  const addProductButton = document.getElementById("add-product-button");
  if (addProductButton) {
    addProductButton.addEventListener("click", () => {
      const modal = ProductModal();
      document.body.appendChild(modal);
    });
  } else {
    console.error("Botão 'Adicionar Produto' não encontrado!");
  }

  function hideAllSections() {
    sections.forEach((section) => {
      section.style.display = "none";
    });
  }

  function showSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = "block";
    }
  }

  function updateActiveLink(targetLink) {
    links.forEach((link) => link.classList.remove("active"));
    targetLink.classList.add("active");
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("data-target");
      hideAllSections();
      showSection(targetId);
      updateActiveLink(link);
      settingsMenu.style.display = "none";
    });
  });

  settingsButton.addEventListener("click", (event) => {
    event.preventDefault();
    const isMenuVisible = settingsMenu.style.display === "block";
    settingsMenu.style.display = isMenuVisible ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
    if (
      !settingsMenu.contains(event.target) &&
      event.target !== settingsButton &&
      !settingsButton.contains(event.target)
    ) {
      settingsMenu.style.display = "none";
    }
  });

  hideAllSections();
  showSection("overview");
});
