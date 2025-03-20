function validateFullName(fullName) {
    const re = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!re.test(fullName)) {
        return "O nome completo deve conter apenas letras e espaços.";
    }

    const parts = fullName.trim().split(/\s+/);

    if (parts.length < 2) {
        return "O nome completo deve conter pelo menos um nome e um sobrenome.";
    }

    for (let part of parts) {
        if (part.length < 2) {
            return "Cada parte do nome deve ter pelo menos 2 caracteres.";
        }
    }

    return "Nome válido.";
}

export { validateFullName };