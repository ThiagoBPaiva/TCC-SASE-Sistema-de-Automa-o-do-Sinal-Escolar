import { Request, Response } from 'express'
import path from 'path'
// ------
import { AuthUserService } from "../service/AuthUserService"


export class AuthConstrollers {
    private authUserService: AuthUserService;
    constructor() {
        this.authUserService = new AuthUserService();
    }

    // PRIVATE METHODES ------------------

    // LAYOUT ----------------------------

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
            return
        }
        res.status(resultService.code).send(
            resultService.message
        );
    }

    async postCreateGroupTime(req: Request, res: Response): Promise<void> {
        const { nameGroup } = req.body;

        const resultService = await this.authUserService.createNewGroupTime(nameGroup);
        if (resultService.code !== 200) {
            res.status(resultService.code).send(
                resultService.error
            )
            return
        }
        res.status(resultService.code).send(
            resultService.message
        );
    }

    async postCreateTime(req: Request, res: Response): Promise<void> {
        const { idGroup, time } = req.body;

        const resultService = await this.authUserService.createNewTime(idGroup, time);
        if (resultService.code !== 200) {
            res.status(resultService.code).send(
                resultService.error
            )
            return
        }
        res.status(resultService.code).send(
            resultService.message
        )
    }

    async postUpdatGroupTimeeActivity(req: Request, res: Response): Promise<void> {
        const { groupName, activity } = req.body;

        const resultService = await this.authUserService.activityGroupTime(groupName, activity);
        if (resultService.code !== 200) {
            res.status(resultService.code).send(
                resultService.error
            )
            return
        }

        res.status(resultService.code).send(
            resultService.message
        );
    }

    async getAllGroupTime(req: Request, res: Response): Promise<void> {
        const resultService = await this.authUserService.getAllGroupTime();
        if (resultService.code !== 200) {
            res.status(resultService.code).send(
                resultService.error
            )
            return
        }

        res.status(resultService.code).json(
            resultService.group
        );
    }

    async getActivityGroupTime(req: Request, res: Response): Promise<void> {
        const resultService = await this.authUserService.getActivvvityGroup();
        if (resultService.code !== 200) {
            res.status(resultService.code).send(
                resultService.error
            )
            return
        }

        res.status(resultService.code).json(
            resultService.group
        );
    }
}
