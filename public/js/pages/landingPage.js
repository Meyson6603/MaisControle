import login from "./login.js";

export default function landingPage() {

    const body = document.querySelector("body");

    body.innerHTML = `<header class="cabecalho">
        <div class="cabecalho__container">
            <h1 class="cabecalho__logo">+Controle</h1>
            <button class="cabecalho__botao-login" id="btnLogin">Acesso</button>
        </div>
    </header>

    <div class="main-content">
        <div class="paragrafo">
            <h1>
                Guiando <span>Você</span>,<br>
                Transformando <span>Seu</span> Futuro
            </h1>
            <p>
                Uma plataforma de gestão financeira inclusiva e intuitiva, projetada especialmente para pessoas em
                situação de vulnerabilidade. Simplifique sua vida financeira, tome decisões informadas e alcance seus
                objetivos com uma interface amigável e acessível para todos.
            </p>
        </div>
        <div class="imagem">
            <img src="../image/union.png" alt="Imagem principal" />
        </div>
    </div>


    <div class="frames-container">
        <div class="frame frame--cadastro">
            <div class="frame__text-wrapper">Cadastro Simplificado</div>
            <p class="frame__descricao">Insira seus dados básicos, escolha uma senha segura e pronto!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quae neque debitis qui, placeat nobis
                eveniet reiciendis numquam quas fugit delectus id officiis laboriosam maxime aut ducimus alias, ipsum
                magni.
            </p>
        </div>
        <div class="frame frame--receita">
            <div class="frame__text-wrapper">Gestão Financeira</div>
            <p class="frame__descricao">Registre suas receitas e despesas de forma simples e organizada. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Doloribus pariatur tempore, dolorem, mollitia minus nihil
                praesentium laudantium eos veniam quae rem molestiae, tempora voluptatibus perspiciatis sapiente
                corrupti ea distinctio nam?</p>
        </div>
        <div class="frame frame--interface">
            <div class="frame__text-wrapper">Interface Acessível</div>
            <p class="frame__descricao"> Interface intuitiva, garantindo que qualquer pessoa possa usá-la com
                facilidade. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facilis minima architecto!
                Ratione blanditiis, tempora culpa sequi necessitatibus eligendi ab, earum placeat sapiente reiciendis
                quo voluptates dolores beatae expedita pariatur.</p>
        </div>
    </div>`

    const btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", () => {
        login();
        history.pushState({}, "", "/login");
    });
}
