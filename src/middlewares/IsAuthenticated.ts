import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../models/intefaces/user/auth/Payload";

export function isAuthenticated (req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")

    try {
        //validar o token
        const {sub} = verify(token, process.env.JWT_SECRET) as Payload
        req.user_id = sub
        return next()
    } catch (error) {
        return res.send(401).end()
    }
}