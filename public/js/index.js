import home from "./pages/home.js";
import login from "./pages/login.js";
// import signin from "./pages/signIn.js";
import singIn from "./pages/teste.js";
import user from "./pages/user.js";
import general from "./pages/general.js";

window.addEventListener("load", () => {

    const path = window.location.pathname;
    const body = document.querySelector("body");

    if (path === "/") {
        home();
        console.log(path);
    } else if (path === "/login") {
        login();
    } else if (path === "/signIn") {
        singIn();
    } else if (path === "/user") {
        user();
    } else if (path === "/general") {
        general();
    }

    else {
        body.innerHTML = "<h1>Página não encontrada</h1>";
    }
})

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    if (path === "/") {
        home();
    }
    else if (path === "/login") {
        login();
    } else if (path === "/signIn") {
        singIn();
    } else if (path === "/user") {
        user();
    } else if (path === "/general") {
        general();
    }
    else {
        document.querySelector("body").innerHTML = "<h1>Página não encontrada</h1>";
    }

})