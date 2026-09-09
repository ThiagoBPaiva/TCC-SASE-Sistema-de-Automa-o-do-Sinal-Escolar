use SASE;

show tables;

select * from Horarios;

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
    id VARCHAR(26) PRIMARY KEY,
    id_group VARCHAR(26) NOT NULL,
    time VARCHAR(5) NOT NULL,

    FOREIGN KEY (id_group)
        REFERENCES Grupo_de_Horarios(id)
);

*/