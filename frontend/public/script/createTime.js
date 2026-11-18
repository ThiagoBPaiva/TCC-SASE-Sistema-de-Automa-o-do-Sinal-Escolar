
const STATUS_URL = "/auth/allTime";
const CREATE_TIME_URL = "/auth/createTime"

const form = document.querySelector("#schedule-form");
const groupSelect = document.querySelector("#group-id");
const timeInput = document.querySelector("#schedule-time");

const groupError = document.querySelector("#group-error");
const timeError = document.querySelector("#time-error");
const feedback = document.querySelector("#form-feedback");
const cancelButton = document.querySelector("#cancel-button");

async function createTime(output) {
     return await fetch(CREATE_TIME_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(output)
    });
}

async function loadGroups() {
    const response = await fetch(STATUS_URL, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Não foi possível carregar os grupos.");
    }

    const groups = await response.json();

    // Agora, percorra os grupos recebidos e crie
    // uma <option> para cada grupo cadastrado.
    groups.forEach(element => {
        console.log(element);
        const option = document.createElement("option");

        option.value = element.id;
        option.textContent = element.groupName;

        groupSelect.appendChild(option);
    });
}

function clearErrors() {
    groupError.textContent = "";
    groupError.hidden = true;
    groupSelect.classList.remove("invalid");
    groupSelect.removeAttribute("aria-invalid");

    timeError.textContent = "";
    timeError.hidden = true;
    timeInput.classList.remove("invalid");
    timeInput.removeAttribute("aria-invalid");

    feedback.textContent = "";
    feedback.hidden = true;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();

    let hasError = false;

    if (!groupSelect.value) {
        groupError.textContent = "Selecione um grupo de horários.";
        groupError.hidden = false;
        groupSelect.classList.add("invalid");
        groupSelect.setAttribute("aria-invalid", "true");
        hasError = true;
    }

    if (!timeInput.value) {
        timeError.textContent = "Informe o horário.";
        timeError.hidden = false;
        timeInput.classList.add("invalid");
        timeInput.setAttribute("aria-invalid", "true");
        hasError = true;
    }

    const schedule = {
        idGroup: groupSelect.value,
        time: timeInput.value
    };

    const respost = await createTime(schedule);

    if (!respost.ok) {
        timeError.textContent = "Horário já cadastrado no grupo.";
        timeError.hidden = false;
        timeInput.classList.add("invalid");
        timeInput.setAttribute("aria-invalid", "true");
        hasError = true;
    }

    if (hasError) {
        return;
    }


    console.log("Dados do horário:", schedule);

    feedback.textContent =
        "Validação concluída. A integração com a API será feita posteriormente.";
    feedback.hidden = false;
});

loadGroups();

groupSelect.addEventListener("change", clearErrors);
timeInput.addEventListener("input", clearErrors);

cancelButton.addEventListener("click", () => {
    form.reset();
    timeInput.value = "07:00";
    clearErrors();
});
