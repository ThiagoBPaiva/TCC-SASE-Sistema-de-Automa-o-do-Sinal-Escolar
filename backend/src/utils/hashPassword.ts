import { hash, compare } from 'bcrypt';
import { randomInt } from 'node:crypto'

export async function encryptingPassword(password: string): Promise<string> {
    const randomSalt = randomInt(10, 16);
    const hashPassword = await hash(String(password), randomSalt);

    return hashPassword;
}

export async function decryptPassword(password: string, passwordEncrypt: string): Promise<boolean> {
    const comparePassword = await compare(password, passwordEncrypt);

    return comparePassword;
}
