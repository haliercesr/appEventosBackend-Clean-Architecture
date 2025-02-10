// Definimos como clase abstracta para que no se puedan crear instancias, estas clases son solo para definir reglas
//En la carpeta de datasources vamos a tener las clases que van a regir las reglas de la obtencion de datos y donde se van a comunicar los repositorios
//datasources y repositories son abtracciones, solo sirven para definir reglas, no son implementaciones
// en register nosotros sabemos que enviamos name,email y password y la comunicacion con la base de datos nos devuelve una promesa con la entidad UserEntity
//Si llega a cambiar un dato o queremos enviar mas datos en nuestro register, aqui entra en juego nuestro RegisterUserDto. Cuando queramos modificar, validar o agregar otro dato solo modificamos el DTO  

import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasources{

    //todo:
    //abstract login( )

    
    //abstract register(name:string, email:string, password:string ):Promise<UserEntity>
    abstract register(registerUserDto: RegisterUserDto ):Promise<UserEntity>

    //abstract login(loginUserDto: LoginUserDto ):Promise<UserEntity>
}