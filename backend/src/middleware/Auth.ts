import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export function AsyncMiddlwares(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { token } = req.cookies;

    if (!token) res.status(401).json(req.cookies);

    // const [, token] = authorization!.split(' ');

    try {
        const decode = verify(token, process.env.SECRET!) as any;

        res.locals.user = {
            id: decode.id,
            name: decode.name,
            email: decode.email
        };

        next();
    } catch (error) {
        res.status(401).json({error: `Seu token de acesso foi espirado, por favor, renove o token logando no sistema`})
    }
}
