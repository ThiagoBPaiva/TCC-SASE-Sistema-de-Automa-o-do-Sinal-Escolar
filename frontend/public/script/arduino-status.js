
const STATUS_URL = "/auth/arduino/status";
const INTERVALO_ATUALIZACAO = 5000;

const elementos = {
    resumo: document.getElementById("connection-summary"),
    icone: document.getElementById("connection-icon"),
    titulo: document.getElementById("connection-title"),
    descricao: document.getElementById("connection-description"),

    porta: document.getElementById("serial-port"),
    ultimaComunicacao: document.getElementById("last-communication"),
    status: document.getElementById("connection-status"),

    banner: document.getElementById("connection-banner"),
    mensagem: document.getElementById("connection-message")
};

let requisicaoEmAndamento = false;

function formatarData(data) {
    if (!data) {
        return "Nenhuma comunicação registrada";
    }

    const dataConvertida = new Date(data);

    if (Number.isNaN(dataConvertida.getTime())) {
        return "Data indisponível";
    }

    return dataConvertida.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

function atualizarInterface(estado, dados = {}) {
    const conectado = estado === "conectado";
    const desconectado = estado === "desconectado";
    const carregando = estado === "carregando";
    const erro = estado === "erro";

    // Classes do estado atual.
    elementos.resumo.classList.toggle("is-connected", conectado);
    elementos.resumo.classList.toggle("is-disconnected", desconectado);
    elementos.resumo.classList.toggle("is-loading", carregando);
    elementos.resumo.classList.toggle("has-error", erro);

    elementos.banner.classList.toggle("is-connected", conectado);
    elementos.banner.classList.toggle("is-disconnected", desconectado);
    elementos.banner.classList.toggle("is-loading", carregando);
    elementos.banner.classList.toggle("has-error", erro);

    // Ícone.
    if (conectado) {
        elementos.icone.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 4 4L19 6"/>
            </svg>`;
    } else if (desconectado) {
        elementos.icone.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M9 9l6 6m0-6-6 6"/>
            </svg>`;
    } else {
        elementos.icone.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 8v5m0 4h.01"/>
            </svg>`;
    }

    // Título e descrição.
    if (conectado) {
        elementos.titulo.textContent = "Conectado";
        elementos.descricao.textContent =
            "O sistema está se comunicando corretamente com o Arduino.";
    } else if (desconectado) {
        elementos.titulo.textContent = "Desconectado";
        elementos.descricao.textContent =
            "Não foi possível estabelecer comunicação com o Arduino.";
    } else if (carregando) {
        elementos.titulo.textContent = "Verificando conexão...";
        elementos.descricao.textContent =
            "Consultando o estado da comunicação com o Arduino.";
    } else {
        elementos.titulo.textContent = "Status indisponível";
        elementos.descricao.textContent =
            "Não foi possível consultar o servidor.";
    }

    // Informações recebidas da API.
    elementos.porta.textContent = dados.port || "--";

    elementos.ultimaComunicacao.textContent =
        formatarData(dados.lastCommunication);

    elementos.status.textContent =
        conectado ? "Online" :
        desconectado ? "Offline" :
        carregando ? "Verificando..." :
        "Indisponível";

    elementos.status.classList.toggle("online-text", conectado);

    // Mensagem inferior.
    if (conectado) {
        elementos.mensagem.textContent =
            "Sinal pronto para acionamento";
    } else if (desconectado) {
        elementos.mensagem.textContent =
            "Arduino desconectado — verifique a conexão";
    } else if (carregando) {
        elementos.mensagem.textContent =
            "Verificando comunicação com o Arduino...";
    } else {
        elementos.mensagem.textContent =
            "Não foi possível consultar o servidor";
    }
}

async function consultarStatusArduino() {
    if (requisicaoEmAndamento) {
        return;
    }

    requisicaoEmAndamento = true;

    try {
        const resposta = await fetch(STATUS_URL, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (typeof dados.connected !== "boolean") {
            throw new Error(
                "A API precisa retornar connected como booleano."
            );
        }

        atualizarInterface(
            dados.connected ? "conectado" : "desconectado",
            dados
        );

    } catch (erro) {
        console.error("Erro ao consultar o status do Arduino:", erro);

        atualizarInterface("erro");

    } finally {
        requisicaoEmAndamento = false;
    }
}

// Estado inicial enquanto a API não responde.
atualizarInterface("carregando");

// Primeira consulta e atualização periódica.
consultarStatusArduino();

setInterval(
    consultarStatusArduino,
    5000
);
