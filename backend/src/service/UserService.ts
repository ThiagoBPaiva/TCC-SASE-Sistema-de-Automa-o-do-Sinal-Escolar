import { Communication } from '../config/communication';
import { User } from '../entites/User';
import { encryptingPassword, decryptPassword } from '../utils/hashPassword'

import { z } from 'zod';

export const loginUser = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const signUpUser = z.object({
    user: z.string().min(2),
    password: z.string().min(6),
    email: z.email()
})


export class UserService {
    private communicatrion = new Communication();
    constructor() {}

    public async createNewUserService(user: string, password: string, email: string): Promise<string> {
        try {
            const validation = signUpUser.safeParse({ user: user, password: password, email: email });

            if (!validation.success) {
                throw new Error('Erro! Dados invalidos, por favor digite os dados corretamente');
            }

            // Criptografando a senha
            const hashPassword = await encryptingPassword(password);
            const newUser = new User(user, email, hashPassword);

            this.communicatrion.insertNewUser(newUser);

            return "User create";
        } catch (error) {
            throw new Error(`System error: ${error}`);
        }
    }

    public async loginUserService(email: string, password: string): Promise<string> {
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

            return "Login";
        } catch (error) {
            throw new Error(`System error: ${error}`);
        }
    }
}
