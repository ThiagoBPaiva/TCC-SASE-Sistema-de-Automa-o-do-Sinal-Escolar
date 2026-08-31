async function carregarHome() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:3000/auth/home", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        console.log(data);
        return;
    }

    console.log(data);
}

carregarHome();
