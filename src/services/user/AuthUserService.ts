import { compare } from "bcryptjs";
import {sign} from 'jsonwebtoken'
import prismaClient from "../../prisma"
import { AuthRequest } from "../../models/intefaces/user/auth/AuthRequest";

export class AuthUserService {
    async execute({email, password}: AuthRequest) {

        if(!email) {
            throw new Error("Email precisa ser enviado");
            
        }
        if(!password) {
            throw new Error("Senha precisa ser enviada");
            
        }
        //verifica no banco de dados se existe um usuário com o email passado
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user) {
            throw new Error("Email ou senha incorretos")
        }

        //verifica se a senha esta correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email ou senha estão incorretos");
            
        }

        const id = user.id


        const token = sign( 
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id.toString(),
                expiresIn: "30d"
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}