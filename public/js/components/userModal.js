export default function renderUserModal() {
    // Cria o container do modal principal
    const modal = document.createElement("div");
    modal.id = "userModal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" id="closeModal">&times;</span>
            <div class="profile-picture">
                <img src="default-profile.png" alt="User Photo" id="userPhoto">
            </div>
            <h2 id="userName">Nome do Usuário</h2>
            <p id="userEmail">email@usuario.com</p>
            <button id="updateProfileBtn">Atualizar Perfil</button>
            <button id="backBtn" class="back-btn">Voltar</button>
        </div>
    `;

    // Adiciona o modal ao body
    document.body.appendChild(modal);

    // Cria o modal de "Atualizar Perfil"
    const updateModal = document.createElement("div");
    updateModal.id = "updateModal";
    updateModal.className = "modal";
    updateModal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" id="closeUpdateModal">&times;</span>
            <div class="profile-picture">
                <img src="default-profile.png" alt="User Photo" id="updateUserPhoto">
                <button id="changePhotoBtn">Alterar Foto</button>
            </div>
            <input type="text" id="updateName" placeholder="Nome">
            <input type="email" id="updateEmail" placeholder="Email">
            <input type="text" id="updateArea" placeholder="Área de Atuação">
            <button id="changePasswordBtn">Alterar Senha</button>
            <button id="saveBtn">Salvar</button>
            <button id="exitBtn" class="back-btn">Sair</button>
        </div>
    `;

    // Adiciona o modal de "Atualizar Perfil" ao body
    document.body.appendChild(updateModal);

    // Adiciona os estilos do modal
    const style = document.createElement("style");
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            background-color: #fff;
            margin: 10% auto;
            padding: 20px;
            border-radius: 10px;
            width: 80%;
            max-width: 400px;
            text-align: center;
            position: relative;
        }

        .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;
        }

        .profile-picture {
            margin: 20px auto;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #ccc;
            position: relative;
        }

        .profile-picture img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .profile-picture button {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }

        input {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            color: #16a34a;
            font-size: 16px;
            cursor: pointer;
        }

        button.back-btn {
            background-color:rgb(255, 0, 0);
            color: #fff;
            font-weight: bold;
            position: absolute;
            bottom: 10px;
            right: 10px;
            width: auto;
            padding: 5px 15px;
        }

        button:hover {
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);

    // Lógica para abrir e fechar o modal principal
    const closeModal = modal.querySelector("#closeModal");
    const backBtn = modal.querySelector("#backBtn");
    const updateProfileBtn = modal.querySelector("#updateProfileBtn");

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    backBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    updateProfileBtn.addEventListener("click", () => {
        modal.style.display = "none";
        updateModal.style.display = "block";
    });

    // Lógica para abrir e fechar o modal de "Atualizar Perfil"
    const closeUpdateModal = updateModal.querySelector("#closeUpdateModal");
    const exitBtn = updateModal.querySelector("#exitBtn");

    closeUpdateModal.addEventListener("click", () => {
        updateModal.style.display = "none";
    });

    exitBtn.addEventListener("click", () => {
        updateModal.style.display = "none";
    });

    // Função para abrir o modal principal
    return {
        open: () => {
            modal.style.display = "block";
        },
        close: () => {
            modal.style.display = "none";
        },
    };
}