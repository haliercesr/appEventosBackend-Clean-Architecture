//Aqui recibimos la implementacion de un datasource
//Tenemos que implementar todos los metodos que tenga AuthRepository o cualquier otra interface que implementemos
//En el constructor deminimos las variables con las clases abstractas, esto permite poder mandarle a una clase AuthRepositoryImpl un datasource que tenga esos metodos que define AuthDatasource en la carpeta de Domain
//Nuestro repositorio recibe datasources y nosotros interactuamos con nuestro repositorio,no interactuamos directamente con el datasource

//Si se puede interactuar directamente con el datasource, pero la idea del repositorio es que nos sirva como una capa para que podamos usar el mismo repositorio
//en todo su codigo y cambiar facilmente un origen de datos, otro origen de datos, pero el codigo en repositorio no se va a ver afectado a pesar de que usemos el repositorio A,B,C,D y apesar de que usemos Mongo, Oracle, SQL Server, lo que sea.

//El repositorio se va a quedar igual, si cambio de base de datos lo que voy a estar cambiando en solo el Datasource.
// En el constructor hacemos una inyeccion de dependencias

import { AuthDatasources, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {

constructor (
    private readonly authDatasource: AuthDatasources  
) {}
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register( registerUserDto )
    }
    
}