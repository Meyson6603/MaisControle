import home from "./home.js";
import signIn from "./teste.js";

export default function Login() {
    const body = document.querySelector("body");
    body.innerHTML = `<header class="header">
        <div class="header__logo">+Controle</div>
        <button class="header__button" id="btnHome">Início</button>
    </header>

    <main class="main-container">
        <section class="login-container">
            <h2 class="login-container__title">Login</h2>
            <form class="form" id="form-login">
                <input type="email" class="login-container__input" id="inputEmail" placeholder="Email" required>
                <input type="password" class="login-container__input" id="inputPassword" placeholder="Senha" required>
                <button type="submit" class="login-container__button login-container__button--submit"
                    id="btnLogin">Entrar</button>
                <button type="button" class="login-container__button login-container__button--signup"
                    id="btnSignup">Criar conta</button>
            </form>
        </section>

        <section class="image-container">
            <img src="../image/image_man.jpg" alt="Imagem de login" class="image-container__img">
            <div class="image-container__overlay"></div>
            <h2 class="image-container__text">+ Controle</h2>
        </section>
    </main>`

    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");

    const login = document.getElementById("form-login");
    login.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o envio do formulário padrão
        const emailValue = email.value;
        const passwordValue = password.value;

        if (emailValue === "" || passwordValue === "") {
            alert("Preencha todos os campos!");
            return;
        }

        // Aqui você pode adicionar a lógica de autenticação, como enviar os dados para o servidor
        console.log(`Email: ${emailValue}, Senha: ${passwordValue}`);

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            });

            console.log(response);
        } catch (error) {

        }
    })


    const btnHome = document.getElementById("btnHome");

    btnHome.addEventListener("click", () => {
        history.pushState({}, "", "/");
        home();
    })

    const btnSignup = document.getElementById("btnSignup");

    btnSignup.addEventListener("click", () => {
        history.pushState({}, "", "/signIn");
        signIn();
    })

}