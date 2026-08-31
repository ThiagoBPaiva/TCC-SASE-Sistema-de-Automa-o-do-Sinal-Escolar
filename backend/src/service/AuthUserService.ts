import { Communication } from '../config/communication';
import { User } from '../entites/User';
import { encryptingPassword, decryptPassword } from '../utils/hashPassword'
import { returnFunction } from '../interfaces/interfaceService'
import { z } from 'zod'

const signUser = z.object({
    user: z.string().min(2),
    password: z.string().min(6),
    email: z.email()
})

export class AuthUserService {
    private communicatrion = new Communication();
    constructor() { }

    public async createNewUserService(user: string, password: string, email: string): Promise<returnFunction> {
        try {
            const validation = signUser.safeParse({ user: user, password: password, email: email });
            const userExisting = await this.communicatrion.getDateUser(email);

            if (!validation.success) {
                throw new Error('Erro! Dados invalidos, por favor digite os dados corretamente');
            }
            if (userExisting.length > 0) {
                return {code: 501, error: 'Usuario já cadastrado.'}
            }

            // Criptografando a senha
            const hashPassword = await encryptingPassword(password);
            const newUser = new User(user, email, hashPassword);

            this.communicatrion.insertNewUser(newUser);

            return { code: 201, message: 'User Created.' };
        } catch (error) {
            return { code: 501, error: 'Create User error.' };
            // throw new Error(`System error: ${error}`);
        }
    }
}
