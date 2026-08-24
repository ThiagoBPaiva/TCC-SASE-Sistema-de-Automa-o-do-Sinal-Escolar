import { partDataBase } from "./db";
import { RowDataPacket, ResultSetHeader } from 'mysql2'
import { User } from "../entites/User";
import { ulid } from "ulid"

export class Communication {
    private id = ulid();
    constructor() {}

    public async insertNewUser(user: User): Promise<ResultSetHeader> {
        try {
            const codeDb: string = "INSERT INTO Usuarios (id, username, email, password_hash) VALUES (?, ?, ?, ?)"
            const valeus: Array<string> = [this.id, user.getName(), user.getEmail(), user.getPassword()];

            const [rows] = await partDataBase.execute<ResultSetHeader>(codeDb, valeus);

            return rows;
        } catch (error) {
            throw new Error(`Erro encontrado ao inserir um usuario ao banco de dados: ${error}`);
        }
    }

    public async selectUser(email: string, password: string): Promise<RowDataPacket[]> {
        try {
            const codeDb: string = "select * from Usuarios where email = ?, password = ?";
            const values: Array<string> = [email, password];

            const [rows] = await partDataBase.execute<RowDataPacket[]>(codeDb, values);

            return rows;
        } catch (error) {
            throw new Error(`Erro encontrado ao buscar por um usuario no banco de dados: ${error}`);
        }
    }

    public async getDateUser(email: string): Promise<RowDataPacket[]> {
        try {
            const codeDb: string = "SELECT * FROM Usuarios WHERE email = ?";

            const [rows] = await partDataBase.execute<RowDataPacket[]>(codeDb, [email]);

            return rows;
        } catch (error) {
            throw new Error(`Erro ao puxar os dados do usuario: ${error}`);
        }
    }
}
