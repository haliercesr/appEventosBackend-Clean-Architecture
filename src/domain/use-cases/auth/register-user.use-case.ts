import { JwtAdapter, StringValue } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken{  //si lo usamos muchas veces, en la carpeta domain podemos crear otra carpeta que sea de interfaces
    token:string;
    user:{
        id:string;
        name:string;
        email:string;
    };
}

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: StringValue) => Promise<string | null>  //para funciones usamos type y para objetos usamos interfaces

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,  //no usamos la implementacion
        private readonly signToken: SignToken = JwtAdapter.generateToken,  //para que no quede como una dependencia oculta añadimos la funcion en la inyeccion de dependencias y por defecto ponemos la funcion que creamos
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<any> {

        //Crear usuario
        const user = await this.authRepository.register(registerUserDto);

        //Token
        const token = await this.signToken({ id: user.id }, '2h');
        if(!token) throw CustomError.internalServerError('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }

        }

    }
}