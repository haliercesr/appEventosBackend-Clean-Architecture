//la idea del repositorio es que conozca los metodos que nosotros vamos a llamar del datasource
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository{

    //todo:
    //abstract login( )

    
    //abstract register(name:string, email:string, password:string ):Promise<UserEntity>
    abstract register(registerUserDto: RegisterUserDto ):Promise<UserEntity>

    abstract login(loginUserDto: LoginUserDto ):Promise<UserEntity>
}