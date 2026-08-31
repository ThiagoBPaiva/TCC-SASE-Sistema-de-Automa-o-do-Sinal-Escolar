import { Communication } from '../config/communication';
import { User } from '../entites/User';
import { encryptingPassword, decryptPassword } from '../utils/hashPassword'
import { returnFunction } from '../interfaces/interfaceService'

import { sign } from "jsonwebtoken" // Gerar o Token

import { z } from 'zod';

const loginUser = z.object({
    email: z.email(),
    password: z.string().min(6)
})


export class UserService {
    private communicatrion = new Communication();
    private JWT_TOKEN = process.env.SECRET!;
    constructor() {}

    public async loginUserService(email: string, password: string): Promise<returnFunction> {
        try {

            const validationLoginUser = loginUser.safeParse({ email: email, password: password });
            const validationEmailUser = await this.communicatrion.getDateUser(email);

            if (!validationLoginUser.success) {
                throw new Error('Erro! Dados invalidos, por favor digite os dados corretamente');
            }

            const passwordCompare = await decryptPassword(password, validationEmailUser![0].password_hash);
            if (validationEmailUser.length <= 0 || !passwordCompare) {
                throw new Error("Erro, senha ou email invalida.");
            }

            // criação do token
            const token = sign({ id: validationEmailUser![0].id }, this.JWT_TOKEN, { expiresIn: "30s" });

            return {code: 200, token: token};
        } catch (error) {
            return {code: 501, error: 'System Error in Login User'};
            // throw new Error(`System error: ${error}`);
        }
    }
}
