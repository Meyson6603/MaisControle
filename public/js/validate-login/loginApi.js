const loginAPI = async (data) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      return { success: true, message: json.message, user: json.user };
    } else {
      return { success: false, message: json.message };
    }
  } catch (err) {
    console.error("Erro ao autenticar:", err);
    return {
      success: false,
      message: "Erro ao autenticar. Tente novamente mais tarde.",
    };
  }
};

export { loginAPI };
