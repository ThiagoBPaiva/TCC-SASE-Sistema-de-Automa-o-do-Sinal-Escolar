import { Communication } from '../config/communication';
import { User } from '../entites/User';
import { GroupTime } from "../entites/GroupTime"
import { Time } from '../entites/Time';

import { encryptingPassword, decryptPassword } from '../utils/hashPassword'
import { returnFunction } from '../interfaces/interfaceService'

import { Tablas } from "../utils/enum/Tables"
import { Activity } from "../utils/enum/Activity";

import { z } from 'zod'

const validationSignUser = z.object({
    user: z.string().min(2),
    password: z.string().min(6),
    email: z.email()
})

const validationGroupTime = z.object({
    groupTimeName: z.string().min(3),
})

const validationTime = z.object({
    id: z.uuid(),
    time: z.string().min(5)
})

export class AuthUserService extends Communication {
    public async createNewUserService(user: string, password: string, email: string): Promise<returnFunction> {
        try {
            const validation = validationSignUser.safeParse({ user: user, password: password, email: email });
            const userExisting = await this.DBGetDateUser(email);

            if (!validation.success) {
                throw new Error('Erro! Dados invalidos, por favor digite os dados corretamente');
            }
            if (userExisting.length > 0) {
                return { code: 501, error: 'Usuario já cadastrado.' }
            }

            // Criptografando a senha
            const hashPassword = await encryptingPassword(password);
            const newUser = new User(user, email, hashPassword);

            this.DBInsertNewUser(newUser);

            return { code: 201, message: 'User Created.' };
        } catch (error) {
            return { code: 501, error: 'Create User error.' };
        }
    }

    public async createNewGroupTime(groupName: string): Promise<returnFunction> {
        try {
            const validation = validationGroupTime.safeParse({ groupTimeName: groupName });
            const nameExistin = await this.DBGetValues(Tablas.grupoDeHorarios, 'groupName', groupName);

            if (!validation.success) {
                return { code: 400, error: "Nome do grupo invalido ou insuficiente" };
            } if (nameExistin.length >= 1) {
                return { code: 400, error: "Grupo já registraro" };
            }

            const newGroup = new GroupTime(groupName, Activity.off);

            this.DBCreteaNewGroupTime(newGroup);

            return { code: 201, message: 'Group create' }
        } catch (error) {
            return { code: 501, error: `${error}` }
        }
    }

    public async createNewTime(idGroup: string, time: string): Promise<returnFunction> {
        try {
            const validation = validationTime.safeParse({ id: idGroup, time: time });
            const timeExisti = await this.DBGetValues(Tablas.horarios, 'id_group', idGroup);
            const groupTimeExisti = await this.DBGetValues(Tablas.horarios, 'id', idGroup);

            if (!validation.success) {
                return { code: 400, error: "Horário invalido, digite o horário da forma solicitada" };
            } else if (timeExisti.length >= 1) {
                return { code: 406, error: "Horário já cadastrado neste grupo de horário" };
            } else if (groupTimeExisti.length <= 0) {
                return { code: 406, error: "Grupo de horário inexistente, por favor, digite-o corretamente" };
            }

            const newTime = new Time(idGroup, time);
            this.DBCreateNewTime(newTime)

            return { code: 201, message: 'Time create' }
        } catch (error) {
            return { code: 501, error: `${error}` }
        }
    }
}
