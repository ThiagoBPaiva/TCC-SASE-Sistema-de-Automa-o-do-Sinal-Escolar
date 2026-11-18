const groupsList = document.querySelector("#groups-list");
const activeGroupName = document.querySelector("#active-group-name");
const feedback = document.querySelector("#groups-feedback");

const STATUS_URL = "http://127.0.0.1:3000/auth/allTime";


// Busca os grupos cadastrados no banco
async function renderGroup() {
    try {
        groupsList.innerHTML = `
            <p class="loading-message">Carregando grupos...</p>
        `;

        feedback.hidden = true;

        const response = await fetch(STATUS_URL, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Não foi possível carregar os grupos.");
        }

        const groups = await response.json();

        console.log("Grupos recebidos:", groups);

        if (!Array.isArray(groups)) {
            throw new Error("Formato de dados inválido.");
        }

        renderGroups(groups);

    } catch (error) {
        console.error("Erro ao carregar grupos:", error);

        groupsList.innerHTML = `
            <p class="empty-message">
                Não foi possível carregar os grupos.
            </p>
        `;

        activeGroupName.textContent = "Indisponível";

        feedback.textContent = error.message;
        feedback.hidden = false;
    }
}


// Renderiza os grupos na página
function renderGroups(data) {
    groupsList.replaceChildren();

    // Identifica o grupo ativo
    const activeGroup = data.find(group =>
        String(group.activity).toLowerCase() === "on"
    );

    activeGroupName.textContent = activeGroup
        ? activeGroup.groupName
        : "Nenhum grupo ativo";

    // Verifica se existem grupos cadastrados
    if (data.length === 0) {
        groupsList.innerHTML = `
            <p class="empty-message">
                Nenhum grupo de horários cadastrado.
            </p>
        `;
        return;
    }

    // Percorre os grupos
    data.forEach(group => {
        const isActive =
            String(group.activity).toLowerCase() === "on";

        // Cria o link do grupo
        const card = document.createElement("a");

        card.className = `group-card ${isActive ? "is-active" : ""}`;

        // Envia o ID do grupo para a página de horários
        card.href = `/auth/schedules?id=${encodeURIComponent(group.id)}`;

        // Área do nome
        const nameArea = document.createElement("div");
        nameArea.className = "group-name-area";

        const name = document.createElement("h2");
        name.className = "group-name";
        name.textContent = group.groupName;

        nameArea.appendChild(name);

        // Selo de grupo ativo
        if (isActive) {
            const badge = document.createElement("span");
            badge.className = "active-badge";
            badge.textContent = "Ativo";

            nameArea.appendChild(badge);
        }

        // Informações e seta
        const details = document.createElement("div");
        details.className = "group-details";

        const status = document.createElement("span");
        status.textContent = isActive ? "Ativo" : "Inativo";

        const arrow = document.createElement("span");
        arrow.className = "group-arrow";
        arrow.textContent = "›";

        details.append(status, arrow);

        // Monta o cartão
        card.append(nameArea, details);

        groupsList.appendChild(card);
    });
}


// Executa ao carregar a página
document.addEventListener("DOMContentLoaded", renderGroup);
