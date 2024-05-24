import { Request, Response } from "express";
import { CreteUserService, } from "../../services/user/UserServices";
import { UserRequest } from "../../models/intefaces/user/UserRequest";

export class CreateUser {
    async handle(req: Request, res: Response) {
        const{name, email, password}: UserRequest = req.body
        const createUserService = new CreteUserService
        const user = await createUserService.execute({
            name,
            email,
            password
        })

        return res.json(user)
    }
}


