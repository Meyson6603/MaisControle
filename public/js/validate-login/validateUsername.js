function validateUsername(username) {
  if (!username || username.trim().length === 0) {
    return "O nome de usuário não pode estar vazio.";
  }
  if (username.length < 3) {
    return "O nome de usuário deve ter pelo menos 3 caracteres.";
  }
  return "Nome de usuário válido.";
}

export { validateUsername };
