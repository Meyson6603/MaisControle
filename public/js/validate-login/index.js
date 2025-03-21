import { validateUsername } from "./validateUsername.js";
import { validatePassword } from "../validate-registration/validatePassword.js";
import { loginAPI } from "./loginApi.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-container__form");
  const usernameInput = document.querySelector("input[name='username']");
  const passwordInput = document.querySelector("input[name='password']");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = {
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    const usernameError = validateUsername(data.username);
    if (usernameError !== "Nome de usuário válido.") {
      alert(usernameError);
      return;
    }

    const passwordError = validatePassword(data.password);
    if (passwordError !== "Senha válida.") {
      alert(passwordError);
      return;
    }

    const result = await loginAPI(data);

    if (result.success) {
      alert(result.message);
      const destination = result.user.isAdmin
        ? "/html/admin.html"
        : "/html/user.html";
      window.location.href = destination;
    } else {
      alert(result.message);
    }
  });
});
