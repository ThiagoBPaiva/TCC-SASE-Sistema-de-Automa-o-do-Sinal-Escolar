const form = document.querySelector("#formLogin");
form.addEventListener("submit", login);

async function login(event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#senha").value;

    const response = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
        alert('deu ruim')
        return;
    }

    // Vai para a página home
    window.location.href = "/auth/home";

}
