import { validatePassword } from "./validatePassword.js";
import { validateFullName } from "./validateFullName.js";
import { validateEmail } from "./validateEmail.js";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-signin');
    const username = document.getElementById('input-name');
    const email = document.getElementById('input-email');
    const password = document.getElementById('input-password');
    const passwordConfirmation = document.getElementById('input-confirm-password');


    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const data = {
            username: username.value,
            email: email.value,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value
        };

        const errorFullName = validateFullName(data.username);
        if(errorFullName !== 'Nome válido.') {
            alert(errorFullName);
            return;
        };

        const emailIsValid = validateEmail(data.email);
        if(!emailIsValid) {
            alert(errorEmail);
            return;
        };
        
        const errorPassword = validatePassword(data.password);
        if(errorPassword !== 'Senha válida.') {
            alert(errorPassword);
            return;
        };

        if(data.password !== data.passwordConfirmation) {
            alert('As senhas não conferem.');
            return;
        }

    })

});