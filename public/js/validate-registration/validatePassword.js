function validatePassword(password) {
    if (password.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres.";
    }
    if (!/[a-z]/.test(password)) {
        return "A senha deve conter pelo menos uma letra minúscula.";
    }
    if (!/[A-Z]/.test(password)) {
        return "A senha deve conter pelo menos uma letra maiúscula.";
    }
    if (!/\d/.test(password)) {
        return "A senha deve conter pelo menos um número.";
    }
    if (!/[@$!%*?&]/.test(password)) {
        return "A senha deve conter pelo menos um caractere especial (@$!%*?&).";
    }
    return "Senha válida.";
}

export { validatePassword };