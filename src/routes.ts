import { Router, Request, Response } from "express"
import { CreateUser, } from "./controllers/user/UserController"
import { AuthUserController } from "./controllers/user/AuthUserController"

const router = Router()

router.get('/teste', (req: Request, res: Response) => {
    res.json({msg: "ok"})
})


//rotas do usuario
router.post('/user', new CreateUser().handle)
router.post('/session', new AuthUserController().handle)


export {router}