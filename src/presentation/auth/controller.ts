//Aqui si necesito inyeccion de dependencias
//En la documenacion de express las buenas practicas recomiendan que los controladores de ruta no sean asincronos
//En nuestra arquitectura limpia los controladores van a llamar a casos de uso como registrar un usuario y loguear un usuario, esto
// quiere decir que nuestro loginUser si lo movemos a otro lugar tendria que hacer lo mismo y funcionar igual
import { Request, Response } from "express"

export class AuthController {

    constructor() { }

    loginUser = (req: Request, res: Response) => {
        res.json('loginUser controller')
    }

    registerUser = (req: Request, res: Response) => {
        res.json('registerUser controller')
    }


}

