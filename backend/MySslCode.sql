use SASE;

/*CREATE TABLE Usuario (
    id VARCHAR(26) PRIMARY KEY,
    username VARCHAR(155) NOT NULL,
    email VARCHAR(155) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE Grupo_de_Horarios (
    id VARCHAR(26) PRIMARY KEY,
    groupName VARCHAR(155) NOT NULL UNIQUE,
    activity ENUM('on', 'off') NOT NULL
);

CREATE TABLE Horarios (
    id INT PRIMARY KEY,
    id_group VARCHAR(26) NOT NULL,
    time VARCHAR(5) NOT NULL,

    FOREIGN KEY (id_group)
        REFERENCES Grupo_de_Horarios(id)
);

CREATE TABLE Relatorios (
    id VARCHAR(26) PRIMARY KEY,
    Grupo_de_Horarios_id VARCHAR(26) NOT NULL,
    Usuario_id VARCHAR(26) NOT NULL,
    alteration ENUM('create', 'update', 'delete') NOT NULL,
    description VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (Grupo_de_Horarios_id)
        REFERENCES Grupo_de_Horarios(id),

    FOREIGN KEY (Usuario_id)
        REFERENCES Usuario(id)
);*/