import landingPage from "./pages/landingPage.js";
import login from "./pages/login.js";
// import signin from "./pages/signIn.js";
import singIn from "./pages/singIn.js";
import user from "./pages/user.js";
import home from "./pages/home.js";

window.addEventListener("load", () => {

    const path = window.location.pathname;
    const body = document.querySelector("body");

    if (path === "/") {
        landingPage();
    }
    else if (path === "/login") {
        login();
    } else if (path === "/signIn") {
        singIn();
    } else if (path === "/user") {
        user();
    } else if (path === "/general") {
        home();
    }

    else {
        body.innerHTML = "<h1>Página não encontrada</h1>";
    }
})

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    if (path === "/") {
        landingPage();
    }
    else if (path === "/login") {
        login();
    } else if (path === "/signIn") {
        singIn();
    } else if (path === "/user") {
        user();
    } else if (path === "/general") {
        home();
    }
    else {
        document.querySelector("body").innerHTML = "<h1>Página não encontrada</h1>";
    }

})