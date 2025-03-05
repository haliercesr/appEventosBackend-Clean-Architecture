//Aqui si necesito inyeccion de dependencias
//En la documenacion de express las buenas practicas recomiendan que los controladores de ruta no sean asincronos

//En nuestra arquitectura limpia los controladores van a llamar a casos de uso como registrar un usuario y loguear un usuario, esto
// quiere decir que nuestro loginUser si lo movemos a otro lugar tendria que hacer lo mismo y funcionar igual

//Al usar los Dtos en los controllers ya savemos que informacion viene y como viene, ejemplo si viene el email y si esta verificado
//El patron de inyeccion de dependencias no es mas que un patron que nos ayuda a nosotros a decir que este AuthController depende de algo, necesita de algo, que nosotros le proporcionemos algo y eso lo hacemos mediante la inyeccion de dependencias


import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";

export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {  // unknow es similar a any pero no es lo mismo, unknow puede ser una excepcion controlada por mi o puede ser un error x, un error que la base de datoslo disparo o puede ser un error propio mio o puede ser un error que yo no sepa que esta pasando
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error) //winston

        return res.status(500).json({ error: 'Internal Server Error' });
    }

    loginUser = (req: Request, res: Response) => {
        res.json('loginUser controller')
    }

    registerUser = (req: Request, res: Response): any => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authRepository.register(registerUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));

    }


}

