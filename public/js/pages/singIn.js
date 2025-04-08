import home from "./home.js";
import landingPage from "./landingPage.js";
import login from "./login.js";

export default function Signin() {
    const body = document.querySelector("body");
    body.innerHTML = `<header class="header">
        <div class="header__logo">+Controle</div>
        <button class="header__button" id="btnHome">Início</button>
    </header>

    <main class="container">
        <section class="form-section">
            <h2 class="form-section__title">Cadastro</h2>
            <form class="form" id="formSignin">
                <input type="text" class="form__input" id="input-name" placeholder="Nome" required>
                <input type="email" class="form__input" id="input-email" placeholder="Email" required>
                <input type="text" class="form__input" id="input-area" placeholder="Área de Atuação" required>
                <input type="password" class="form__input" id="input-password" placeholder="Senha" required>
                <input type="password" class="form__input" id="input-confirm-password" placeholder="Confirme sua senha"
                    required>
                <button type="submit" class="form__button" id="btnSubmit">Acessar</button>
                <button type="button" class="form__link" id="btnLogin">Já possuo conta</button>
            </form>
        </section>

        <section class="image-section">
            <img src="../image/image.jpg" alt="Imagem de cadastro" class="image-section__img">
            <h2 class="image-section__text">+ Controle</h2>
        </section>
    </main>`

    const btnHome = document.getElementById("btnHome");
    btnHome.addEventListener("click", () => {
        history.pushState({}, "", "/");
        landingPage();
    })
    const btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", () => {
        history.pushState({}, "", "/login");
        login();
    })

    const formSignin = document.getElementById("formSignin");
    formSignin.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("input-name").value;
        const email = document.getElementById("input-email").value;
        const area = document.getElementById("input-area").value;
        const password = document.getElementById("input-password").value;
        const confirmPassword = document.getElementById("input-confirm-password").value;

        // Seleciona ou cria o elemento para exibir mensagens
        let messageBox = document.getElementById("message-box");
        if (!messageBox) {
            messageBox = document.createElement("div");
            messageBox.id = "message-box";
            messageBox.style.marginTop = "10px";
            messageBox.style.padding = "10px";
            messageBox.style.borderRadius = "5px";
            messageBox.style.textAlign = "center";
            formSignin.insertAdjacentElement("beforebegin", messageBox);
        }

        // Limpa mensagens anteriores
        messageBox.textContent = "";
        messageBox.style.display = "none";

        if (password !== confirmPassword) {
            messageBox.textContent = "As senhas não coincidem!";
            messageBox.style.color = "red";
            messageBox.style.backgroundColor = "#ffe5e5";
            messageBox.style.display = "block";
            return;
        }

        const data = {
            name: name,
            email: email,
            area: area,
            password: password,
        };

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                messageBox.textContent = "Cadastro realizado com sucesso!";
                messageBox.style.color = "green";
                messageBox.style.backgroundColor = "#e5ffe5";
                messageBox.style.display = "block";
                history.pushState({}, "", "/general");
                home();
            } else {
                messageBox.textContent = "Erro ao cadastrar!";
                messageBox.style.color = "red";
                messageBox.style.backgroundColor = "#ffe5e5";
                messageBox.style.display = "block";
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            messageBox.textContent = "Erro ao cadastrar. Tente novamente mais tarde.";
            messageBox.style.color = "red";
            messageBox.style.backgroundColor = "#ffe5e5";
            messageBox.style.display = "block";
        }
    })

}