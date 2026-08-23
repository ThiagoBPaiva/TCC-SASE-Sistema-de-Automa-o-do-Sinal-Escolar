import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';


dotenv.config();

export const partDataBase = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),

    ssl: {
        ca: fs.readFileSync(
            path.join(process.cwd(), 'certs', 'ca.pem')
        )
    },
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0
});

export async function conexion(): Promise<void>{
    try {
        const conexion = await partDataBase.getConnection();
        console.log("✅ A conexão foi feita com o banco de dados ✅");
        conexion.release();
    } catch (error) {
        throw new Error(`ERRO NO BANCO DE DADOS ${error}`);
    }
}
