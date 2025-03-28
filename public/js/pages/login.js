export default function Login() {
    const body = document.querySelector("body");
    body.innerHTML = `<header class="header">
        <div class="header__logo">+Controle</div>
        <button class="header__button" id="btn-home">Início</button>
    </header>

    <main class="main-container">
        <section class="login-container">
            <h2 class="login-container__title">Login</h2>
            <form class="form" id="form-login">
                <input type="email" class="login-container__input" id="input-email" placeholder="Email" required>
                <input type="password" class="login-container__input" id="input-password" placeholder="Senha" required>
                <button type="submit" class="login-container__button login-container__button--submit"
                    id="btn-login">Entrar</button>
                <button type="button" class="login-container__button login-container__button--signup"
                    id="btn-signup-link">Criar conta</button>
            </form>
        </section>

        <section class="image-container">
            <img src="../image/image_man.jpg" alt="Imagem de login" class="image-container__img">
            <div class="image-container__overlay"></div>
            <h2 class="image-container__text">+ Controle</h2>
        </section>
    </main>`
}