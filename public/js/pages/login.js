import landingPage from "./landingPage.js";
import signIn from "./singIn.js";

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

        // Seleciona ou cria o elemento para exibir mensagens
        let messageBox = document.getElementById("message-box");
        if (!messageBox) {
            messageBox = document.createElement("div");
            messageBox.id = "message-box";
            messageBox.style.marginTop = "10px";
            messageBox.style.padding = "10px";
            messageBox.style.borderRadius = "5px";
            messageBox.style.textAlign = "center";
            login.insertAdjacentElement("beforebegin", messageBox);
        }

        // Limpa mensagens anteriores
        messageBox.textContent = "";
        messageBox.style.display = "none";

        if (emailValue === "" || passwordValue === "") {
            messageBox.textContent = "Preencha todos os campos!";
            messageBox.style.color = "red";
            messageBox.style.backgroundColor = "#ffe5e5";
            messageBox.style.display = "block";
            return;
        }

        // Aqui você pode adicionar a lógica de autenticação, como enviar os dados para o servidor
        console.log(`Email: ${emailValue}, Senha: ${passwordValue}`);

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                }),
            });

            if (response.ok) {
                messageBox.textContent = "Login realizado com sucesso!";
                messageBox.style.color = "green";
                messageBox.style.backgroundColor = "#e5ffe5";
                messageBox.style.display = "block";
                history.pushState({}, "", "/general");
                // Aqui você pode chamar a função que carrega a página pós-login
            } else {
                messageBox.textContent = "Erro ao realizar login. Verifique suas credenciais.";
                messageBox.style.color = "red";
                messageBox.style.backgroundColor = "#ffe5e5";
                messageBox.style.display = "block";
            }
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            messageBox.textContent = "Erro ao realizar login. Tente novamente mais tarde.";
            messageBox.style.color = "red";
            messageBox.style.backgroundColor = "#ffe5e5";
            messageBox.style.display = "block";
        }
    })


    const btnHome = document.getElementById("btnHome");

    btnHome.addEventListener("click", () => {
        history.pushState({}, "", "/");
        landingPage();
    })

    const btnSignup = document.getElementById("btnSignup");

    btnSignup.addEventListener("click", () => {
        history.pushState({}, "", "/signIn");
        signIn();
    })

}