import { Request, Response } from 'express'
import path from 'path'
// ------
import { AuthUserService } from "../service/AuthUserService"


export class AuthConstrollers {
    private authUserService = new AuthUserService();
    constructor(){}

    public async homePage(req: Request, res: Response): Promise<void> {
        res.status(200).sendFile(
            path.join(__dirname, "../../../frontend/public/pages/home.html")
        )
    }

    public async getSignUp(req: Request, res: Response): Promise<void> {
        res.sendFile(
            path.join(__dirname, "../../../frontend/public/pages/signUp.html")
        )
    }

    // POST METHODES ----------------------

    async postSignUp(req: Request, res: Response): Promise<void> {
        const { user, email, password } = req.body;

        const resultService = await this.authUserService.createNewUserService(user, password, email);
        if (resultService.code !== 200) {
            res.status(resultService.code).send(
                resultService.error
            );
        }
        res.status(resultService.code).send(
              resultService.message
        );
    }
}
