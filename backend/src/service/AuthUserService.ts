import { Communication } from '../config/communication';
import { User } from '../entites/User';
import { GroupTime } from "../entites/GroupTime"
import { Time } from '../entites/Time';

import { encryptingPassword, decryptPassword } from '../utils/hashPassword'
import { returnFunction } from '../interfaces/interfaceService'

import { Tables } from "../utils/enum/Tables"
import { Activity } from "../utils/enum/Activity";

import { z } from 'zod'
import { RowDataPacket } from 'mysql2';

const validationSignUser = z.object({
    user: z.string().min(2),
    password: z.string().min(6),
    email: z.email()
})

const validationGroupTime = z.object({
    groupTimeName: z.string().min(3),
})

const validationTime = z.object({
    id: z.string(),
    time: z.string().min(3).max(5)
})

const validationActivity = z.object({
    name: z.string().min(3),
    activity: z.enum(['on', 'off'])
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
                return { code: 500, error: 'Usuario já cadastrado.' };
            }

            // Criptografando a senha
            const hashPassword = await encryptingPassword(password);
            const newUser = new User(user, email, hashPassword);

            this.DBInsertNewUser(newUser);

            return { code: 201, message: 'User Created.' };
        } catch (error) {
            return { code: 500, error: 'Create User error.' };
        }
    }

    public async createNewGroupTime(groupName: string): Promise<returnFunction> {
        try {
            const validation = validationGroupTime.safeParse({ groupTimeName: groupName });
            const nameExistin = await this.DBGetValues(Tables.grupoDeHorarios, 'groupName', groupName);

            if (!validation.success) {
                return { code: 400, error: "Nome do grupo invalido ou insuficiente" };
            } if (nameExistin.length >= 1) {
                return { code: 400, error: "Grupo já registraro" };
            }

            const newGroup = new GroupTime(groupName, Activity.off);

            this.DBCreteaNewGroupTime(newGroup);

            return { code: 201, message: 'Group create' };
        } catch (error) {
            return { code: 500, error: `${error}` };
        }
    }

    public async activityGroupTime(groupName: string, activity: string): Promise<returnFunction> {
        try {
            const validation = validationActivity.safeParse({ name: groupName, activity: activity });
            console.log(groupName, activity)
            const groupExisting = await this.DBGetValues(Tables.grupoDeHorarios, 'groupName', groupName);

            if (!validation.success) {
                return { code: 400, error: "Requisição negada, preenche as informações de forma correta!" };
            } if (groupExisting.length <= 0) {
                return { code: 404, error: "Grupo não encontrado" };
            } if (activity === 'on') {
                const vaidationGroupsStatus = await this.DBGetValues(Tables.grupoDeHorarios, 'activity', activity);

                if (vaidationGroupsStatus.length > 0) return { code: 403, error: "Já tem um grupo de horários acionado" }
            }

            await this.DBActivityUpdate(groupName, activity);

            return { code: 200, message: `Group ${activity}` };
        } catch (error) {
            return { code: 500, error: `${error}` };
        }
    }

    public async createNewTime(idGroup: string, time: string): Promise<returnFunction> {
        try {
            const newDate = new Date();
            const [hora, minute] = time.split(":");
            newDate.setHours(
                Number(hora),
                Number(minute),
                0,
                0
            );
            const horarioArual = `${newDate.getHours()}:${newDate.getMinutes()}`;

            const validation = validationTime.safeParse({ id: idGroup, time: horarioArual });
            const timeExisti = await this.DBGetValues(Tables.horarios, 'id_group', idGroup);
            const groupTimeExisti = await this.DBGetValues(Tables.grupoDeHorarios, 'id', idGroup);

            if (!validation.success) {
                return { code: 400, error: "Horário invalido, digite o horário da forma solicitada" };
            } else if (timeExisti.length >= 1) {
                return { code: 406, error: "Horário já cadastrado neste grupo de horário" };
            } else if (groupTimeExisti.length <= 0) {
                return { code: 406, error: "Grupo de horário inexistente, por favor, digite-o corretamente" };
            }

            const newTime = new Time(horarioArual, idGroup);
            console.log(newTime.getGroup(), newTime.getTime());
            this.DBCreateNewTime(newTime);

            return { code: 201, message: 'Time create' };
        } catch (error) {
            return { code: 500, error: `${error}` };
        }
    }

    public async getAllGroupTime(): Promise<returnFunction> {
        try {
            const getAllInfo = await this.DBGetAll(Tables.grupoDeHorarios);

            return { code: 200, group: getAllInfo }
        } catch (error) {
            return { code: 500, error: "Erro ao encontrar os grupos de horários" }
        }
    }

    public async getActivvvityGroup(): Promise<returnFunction> {
        try {
            const getActivityInfo = await this.DBGetValues(Tables.grupoDeHorarios, 'activity', 'on');

            return { code: 200, group: getActivityInfo };
        } catch (error) {
            return { code: 500, error: "Erro ao encontrar o grupo de horário ativo" }
        }
    }
}
