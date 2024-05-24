import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";
import { AuthRequest } from "../../models/intefaces/user/auth/AuthRequest";

export class AuthUserController {
    async handle(req: Request, res: Response) {
        const {email, password}: AuthRequest = req.body
        const authUserService = new AuthUserService

        const auth = await authUserService.execute({
            email, password
        })

        return res.json(auth)

    }
}