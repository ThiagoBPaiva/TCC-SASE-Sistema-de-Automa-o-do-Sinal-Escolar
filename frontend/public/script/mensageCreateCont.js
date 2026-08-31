const form = document.querySelector("#formCadastro");

form.addEventListener("submit", cadastrarUsuario);

function mostrarMensagem(mensagem) {
    const toast = document.querySelector("#toast");

    toast.textContent = mensagem;
    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 3000);
}


async function cadastrarUsuario(event) {
    event.preventDefault();

    const username = document.querySelector("#usuario").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#senha").value;

    try {
        const response = await fetch("/auth/signUp", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                user: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            mostrarMensagem(data.message);

            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } else {
            mostrarMensagem(data.message);
        }

    } catch (error) {
        console.error(error);
    }
}
