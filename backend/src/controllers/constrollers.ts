import express, { Request, Response } from "express";
import path from "path";
// ---
import { ArduinoConexion } from "../communication"
import { UserService } from "../service/UserService"


/**
 * Classe responsável pela criação e controle das funcionalidades das rotas
 */
export class Controllers {
    // private arduino = new ArduinoConexion();
    private userService = new UserService();
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
        const {email, password} = req.body;

        const resultService = await this.userService.loginUserService(email, password);
        console.log(resultService);

        if (resultService === 'Login') {
            res.status(200).send({email: email, password: password, login: "Ok"});
        } else {
            res.status(400).send({ error: resultService });
        }
    }

    async postSignUp(req: Request, res: Response): Promise<void> {
        const { user, email, password } = req.body;

        const resultService = await this.userService.createNewUserService(user, password, email);

        if (resultService === 'User create') {
            res.status(201).json({ message: "Cadastro feito com sucesso" });
        } else {
            res.status(400).send({ error: resultService });
        }

        // const validadtionResult = signUpUser.safeParse({ user: user, password: password, email: email });
        // if (!validadtionResult.success) {
        //     res.status(400).send({ message: "Erro! Dados invalidos, por favor digite os dados corretamente" });
        // }

        res.status(201).json({
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
