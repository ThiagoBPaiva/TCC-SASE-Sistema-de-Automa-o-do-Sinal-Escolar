const STATUS_URL = "/auth/createGroup";

const form = document.querySelector("#group-form");
const nameInput = document.querySelector("#group-name");
const errorMessage = document.querySelector("#group-error");
const feedback = document.querySelector("#form-feedback");
const cancelButton = document.querySelector("#cancel-button");

function showFieldError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    nameInput.classList.add("invalid");
    nameInput.setAttribute("aria-invalid", "true");
}

function clearFieldError() {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
    nameInput.classList.remove("invalid");
    nameInput.removeAttribute("aria-invalid");
}

function hideFeedback() {
    feedback.textContent = "";
    feedback.hidden = true;
}

async function createGroup(name) {
     return await fetch(STATUS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nameGroup: name
        })
    });
}

nameInput.addEventListener("input", () => {
    clearFieldError();
    hideFeedback();
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearFieldError();
    hideFeedback();

    const groupName = nameInput.value.trim();

    if (!groupName) {
        showFieldError("Informe o nome do grupo de horários.");
        nameInput.focus();
        return;
    }

    if (groupName.length < 2) {
        showFieldError("O nome do grupo deve ter pelo menos 2 caracteres.");
        nameInput.focus();
        return;
    }

    const respost = await createGroup(groupName);

    if (!respost.ok) {
        showFieldError(`O grupo com o nome ${groupName} já existe, por favor, tente novamente.`);
        nameInput.focus();
        return;
    }

    feedback.textContent =
        "Validação concluída. A integração para salvar o grupo será implementada posteriormente.";

    feedback.hidden = false;

});

cancelButton.addEventListener("click", () => {
    form.reset();
    clearFieldError();
    hideFeedback();
    nameInput.focus();
});
