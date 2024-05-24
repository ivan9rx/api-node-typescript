import prismaClient from "../../prisma";
import {hash} from 'bcryptjs'
import { UserRequest } from "../../models/intefaces/user/UserRequest";

export class CreteUserService {

    async execute({name, email, password}: UserRequest) {
        if(!email) {
            throw new Error("Email incorreto")
        }

        const userExists = await prismaClient.user.findFirst({where: {
            email: email
        }})

        if(userExists) {
            throw new Error("Email já ja existe")
        }
        //Encripitando a senha

        const passwordHash = await hash(password, 8)

        //criando o usuário

        const user = prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}


