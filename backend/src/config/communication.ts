import { partDataBase } from "./db";
import { RowDataPacket, ResultSetHeader } from 'mysql2'

import { User } from "../entites/User";
import { GroupTime } from "../entites/GroupTime";
import { Time } from "../entites/Time";
import { Tables } from "../utils/enum/Tables"

import { ulid } from "ulid"


export class Communication {
    private id = ulid();
    constructor() { }

    //--------------------------------------------------------------
    // -------------------- Pesquisa universal ---------------------
    //--------------------------------------------------------------

    protected async DBGetAll(table: Tables): Promise<RowDataPacket[]>{
        try {
            const codeDb: string = `SELECT * FROM ${table}`;

            const [rows] = await partDataBase.execute<RowDataPacket[]>(codeDb);

            return rows;
        } catch (error) {
            throw new Error(`Erro ao encontrar a informação pedida: ${error}`);
        }
    }
    
    protected async DBGetValues(table: Tables, coluns: string, value: string): Promise<RowDataPacket[]> {
        try {
            const codeDb: string = `SELECT * FROM ${table} WHERE ${coluns} = ?`;

            const [rows] = await partDataBase.execute<RowDataPacket[]>(codeDb, [value]);

            return rows;
        } catch (error) {
            throw new Error(`Erro ao encontrar a informação pedida: ${error}`);
        }
    }

    //------------------------------------------------------------
    // -------------------- PARTE DO USUÁRIO ---------------------
    //------------------------------------------------------------

    // Criar um novo usuário
    public async DBInsertNewUser(user: User): Promise<ResultSetHeader> {
        try {
            const codeDb: string = "INSERT INTO Usuarios (id, username, email, password_hash) VALUES (?, ?, ?, ?)"
            const valeus: Array<string> = [this.id, user.getName(), user.getEmail(), user.getPassword()];

            const [rows] = await partDataBase.execute<ResultSetHeader>(codeDb, valeus);

            return rows;
        } catch (error) {
            throw new Error(`Erro encontrado ao inserir um usuario ao banco de dados: ${error}`);
        }
    }

    // Buscar por usuario em login
    public async DBSelectUser(email: string, password: string): Promise<RowDataPacket[]> {
        try {
            const codeDb: string = "select * from Usuarios where email = ?, password = ?";
            const values: Array<string> = [email, password];

            const [rows] = await partDataBase.execute<RowDataPacket[]>(codeDb, values);

            return rows;
        } catch (error) {
            throw new Error(`Erro encontrado ao buscar por um usuario no banco de dados: ${error}`);
        }
    }

    // Buscar por usuário validação
    public async DBGetDateUser(email: string): Promise<RowDataPacket[]> {
        try {
            const codeDb: string = "SELECT * FROM Usuarios WHERE email = ?";

            const [rows] = await partDataBase.execute<RowDataPacket[]>(codeDb, [email]);

            return rows;
        } catch (error) {
            throw new Error(`Erro ao puxar os dados do usuario: ${error}`);
        }
    }


    // ----------------------------------------------------------------------
    //-------------------- PARTE DOS GRUPOS DE HORÁRIOS ---------------------
    // ----------------------------------------------------------------------

    public async DBCreteaNewGroupTime(group: GroupTime): Promise<ResultSetHeader> {
        try {
            const codeDb: string = "INSERT INTO Grupo_de_Horarios (id, groupName, activity) VALUES (?, ?, ?)";
            const result: Array<string> = [this.id, group.getNameGroup(), group.getActivity()];

            const [rows] = await partDataBase.execute<ResultSetHeader>(codeDb, result);

            return rows;
        } catch (error) {
            throw new Error(`Erro encontrado ao inserir um grupo de horarios ao banco de dados: ${error}`);
        }
    }

    public async DBActivityUpdate(groupName: string, activity: string): Promise<ResultSetHeader> {
        try {
            const codeDb: string = "UPDATE Grupo_de_Horarios SET activity = ? WHERE groupName = ?";
            const values: Array<string> = [activity, groupName];

            const [rows] = await partDataBase.execute<ResultSetHeader>(codeDb, values);

            return rows;
        } catch (error) {
            throw new Error(`Erro encontrado ao ativar/desativar o grupo. ${error}`);
        }
    }

    public async DBDeleteGroup(groupName: string): Promise<ResultSetHeader> {
        try {
            const codeDb: string = "DELETE FROM Grupo_de_Horarios  WHERE groupName = ?";

            const [rows] = await partDataBase.execute<ResultSetHeader>(codeDb, [groupName]);

            return rows;
        } catch (error) {
            throw new Error(`Erro ao deletar o grupo de horários. ${error}`);
        }
    }

    // ------------------------------------------------------------
    //-------------------- PARTE DOS HORÁRIOS ---------------------
    // ------------------------------------------------------------

    public async DBCreateNewTime(time: Time): Promise<ResultSetHeader> {
        try {
            const codeDb: string = "INSERT INTO Horarios (id, id_group, time) VALUES (?, ?, ?)";
            const values: Array<string> = [this.id, time.getGroup(), time.getTime()];

            const [rows] = await partDataBase.execute<ResultSetHeader>(codeDb, values);

            return rows;
        } catch (error) {
            throw new Error(`Erro ao criar um novo horario: ${error}`);
        }
    }
}
