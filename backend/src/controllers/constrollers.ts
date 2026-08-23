import express, { Request, Response } from "express";
import path from "path";
import { ArduinoConexion } from "../communication"
// ---
import { loginUser, signUpUser } from '../validation/ValidationControllers'


/**
 * Classe responsável pela criação e controle das funcionalidades das rotas
 */
export class Controllers {
    // private arduino = new ArduinoConexion();
    constructor () {}

    /**
     * Método responsável por criar a rota de formulário para o cadastro de horários.
     */
    public getLogin(req: Request, res: Response): void {
        res.sendFile(
            path.join(__dirname, "../../../frontend/public/pages/login.html")
        );
    }

    public async getSignUp(req: Request, res: Response): Promise<void> {
        res.sendFile(
            path.join(__dirname, "../../../frontend/public/pages/signUp.html")
        )
    }

    public async postLogin(req: Request, res: Response): Promise<void> {
        const {user, password} = req.body;

        const validationResult = loginUser.safeParse({ user: user, password: password });
        if (!validationResult.success) {
            res.status(400).send({ message: "Erro! Dados invalidos, por favor digite os dados corretamente" });
        }

        res.status(200).send({user: user, password: password, login: "Ok"});
    }

    async postSignUp(req: Request, res: Response) {
        const { user, email, password } = req.body;

        const validadtionResult = signUpUser.safeParse({ user: user, password: password, email: email });
        if (!validadtionResult.success) {
            res.status(400).send({ message: "Erro! Dados invalidos, por favor digite os dados corretamente" });
        }

        return res.status(201).json({
            message: "Cadastro feito com sucesso"
        });
    }

    /**
     * Método responsável por criar o redericionamento da rota inicial "/" à rota "/envio". Ademais, ela ira armazernar o horário informado na rota "
     */
    public async postEnvioHorario(req: Request, res: Response): Promise<void> {
        const resultado = req.body.time;
        // console.log(resultado);

        const [hora, minuto] = resultado.split(":");

        // this.arduino.setTimeList(hora, minuto);

        res.sendFile(
            path.join(__dirname, "../../../frontend/public/pages/message.html")
        );
    }
}
