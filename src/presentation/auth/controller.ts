//Aqui si necesito inyeccion de dependencias
//En la documenacion de express las buenas practicas recomiendan que los controladores de ruta no sean asincronos

//En nuestra arquitectura limpia los controladores van a llamar a casos de uso como registrar un usuario y loguear un usuario, esto
// quiere decir que nuestro loginUser si lo movemos a otro lugar tendria que hacer lo mismo y funcionar igual

//Al usar los Dtos en los controllers ya savemos que informacion viene y como viene, ejemplo si viene el email y si esta verificado
//El patron de inyeccion de dependencias no es mas que un patron que nos ayuda a nosotros a decir que este AuthController depende de algo, necesita de algo, que nosotros le proporcionemos algo y eso lo hacemos mediante la inyeccion de dependencias


import { Request, Response } from "express"
import { AuthRepository, CustomError, LoginUserDto,LoginUser, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

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

    registerUser = (req: Request, res: Response): any => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))

    }

    loginUser = (req: Request, res: Response):any => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new LoginUser(this.authRepository)
        .execute(loginUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res))
    }

    getUser = (req: Request, res: Response) => {
        UserModel.find()
            .then(users =>
                res.json({
                    users,
                    token: req.body.payload
                }))
            .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
    }


}

