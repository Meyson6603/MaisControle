export default function Signin() {
    const body = document.querySelector("body");
    body.innerHTML = `<header class="header">
        <div class="header__logo">+Controle</div>
        <button class="header__button" id="btn-home">Início</button>
    </header>

    <main class="container">
        <section class="form-section">
            <h2 class="form-section__title">Cadastro</h2>
            <form class="form" id="form-signin">
                <input type="text" class="form__input" id="input-name" placeholder="Nome" required>
                <input type="email" class="form__input" id="input-email" placeholder="Email" required>
                <input type="text" class="form__input" id="input-area" placeholder="Área de Atuação" required>
                <input type="password" class="form__input" id="input-password" placeholder="Senha" required>
                <input type="password" class="form__input" id="input-confirm-password" placeholder="Confirme sua senha"
                    required>
                <button type="submit" class="form__button" id="btn-submit">Acessar</button>
                <button type="button" class="form__link" id="btn-login-link">Já possuo conta</button>
            </form>
        </section>

        <section class="image-section">
            <img src="../image/image.jpg" alt="Imagem de cadastro" class="image-section__img">
            <h2 class="image-section__text">+ Controle</h2>
        </section>
    </main>`
}