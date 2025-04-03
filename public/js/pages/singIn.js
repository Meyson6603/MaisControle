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
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
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
                alert("Cadastro realizado com sucesso!");
                history.pushState({}, "", "/general");
                home();
            } else {
                alert("Erro ao cadastrar!");
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    })

}