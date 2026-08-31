import { Request, Response } from "express";
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

    public async postLogin(req: Request, res: Response): Promise<void> {
        const {email, password} = req.body;

        const resultService = await this.userService.loginUserService(email, password);
        if (resultService.code !== 200) {
            res.status(resultService.code).send(resultService.error);
        }
        res.cookie("token", resultService.token, {
            maxAge: 360000,
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })
        res.status(200).json({email, token: resultService.token});
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
