
const groupNameElement = document.querySelector("#group-name");
const activeGroupName = document.querySelector("#active-group-name");
const scheduleList = document.querySelector("#schedules-list");
const feedback = document.querySelector("#schedules-feedback");

const deleteGroupButton = document.querySelector("#delete-group")
    || document.querySelector("#delete-group-btn");

// ID do grupo recebido pela rota /auth/schedules/:id

const currentUrl = new URL(window.location.href);

const groupId =
    currentUrl.searchParams.get("id") ||
    currentUrl.pathname.split("/").filter(Boolean).at(-1);

console.log(groupId)

const STATUS_URL = `http://127.0.0.1:3000/auth/schedules/get/${groupId}`;

let schedules = [];


// Consulta os horários no backend
async function loadSchedules() {
    try {
        if (!groupId) {
            throw new Error("ID do grupo não encontrado.");
        }

        const response = await fetch(STATUS_URL, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Não foi possível carregar os horários.");
        }

        // A resposta é diretamente um array
        const data = await response.json();

        schedules = data;

        renderSchedules();

    } catch (error) {
        console.error("Erro ao consultar horários:", error);

        feedback.textContent = error.message;
    }
}


// Formata o horário para HH:mm
function formatTime(time) {
    const [hours, minutes] = time.split(":");

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}


// Renderiza os horários na interface
function renderSchedules() {
    scheduleList.replaceChildren();

    if (schedules.length === 0) {
        feedback.textContent = "Nenhum horário cadastrado neste grupo.";
        return;
    }

    feedback.textContent = "";

    // Ordena os horários
    const orderedSchedules = [...schedules].sort((a, b) =>
        a.time.localeCompare(b.time)
    );

    orderedSchedules.forEach(schedule => {

        // Cria a linha
        const row = document.createElement("div");
        row.className = "schedule-item";

        // Horário
        const time = document.createElement("span");
        time.className = "schedule-time";
        time.textContent = formatTime(schedule.time);

        // Botão excluir
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-schedule";
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {
            deleteSchedule(schedule.id);
        });

        // Seta
        const arrow = document.createElement("span");
        arrow.className = "schedule-arrow";
        arrow.textContent = "›";

        // Adiciona os elementos à linha
        row.append(time, deleteButton, arrow);

        // Adiciona a linha à lista
        scheduleList.appendChild(row);
    });
}


// Exclusão visual temporária
function deleteSchedule(id) {
    const confirmed = confirm(
        "Deseja realmente excluir este horário?"
    );

    if (!confirmed) return;

    schedules = schedules.filter(schedule => schedule.id !== id);

    renderSchedules();
}


// Excluir grupo
deleteGroupButton?.addEventListener("click", () => {
    const confirmed = confirm(
        "Deseja realmente excluir este grupo?"
    );

    if (!confirmed) return;

    // Integraremos com o backend posteriormente.
});


// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadSchedules();
});
