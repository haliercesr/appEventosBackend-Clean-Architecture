import { UserModel } from "../../data/mongodb";
import { AuthDatasources, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from "../../config"; //usar el BcryptAdapter de esta forma (ver linea 22), directo en la contraseña, genera una dependencia oculta para la clase authDatasourceImpl y nosotros queremos que sea obvio si se necesita una depencencia, mas adelante lo cambiamos
import { UserMapper } from "../mappers/user.mapper";
//Si usaramos Bcrypt en la forma de la linea 22, al usar mi clase authDatasourcesImpl nadie sabria que estamos usando Bcrypt para encriptar las contraseñas a menos que tenga un problema o vea la clase de authDatasourcesImpl, por eso seria una dependencia oculta
//porque usamos types y no interfaces, porque un type es mas para un tipo de dato y ina interface es mas para un objeto un poco mas elaborado
type hashFunction = (password: string) => string
type comparePassword = (password: string, hashed: string) => boolean

export class AuthDatasourcesImpl implements AuthDatasources {
    constructor(
        private readonly hashPassword: hashFunction = BcryptAdapter.hash,  //Son valores por default, pero las dependencias ya son implicitas y no estan ocultas. Cualquiera puede usar otro tipo de encriptacion en mi authDatasourceImpl o usar las que estan por defecto
        private readonly comparePassword: comparePassword =BcryptAdapter.compare
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {

            //1. Verificar si el correo existe
            const exists = await UserModel.findOne({ email });
            if (exists) throw CustomError.badRequest('User already exists')  //en aplicaciones reales no es bueno dar la pista a alguien que el usuario ya existe en la base de datos, puede intentar bobardear la base de datos o explotar alguna vulnerabilidad con ese usuario. Se debe devolver un mesaje generico como: "intente de nuevo" o "el usuario y/o la contraseña son erroneas",etc.
            //2. Hash de la contraseña


            const user = await UserModel.create({
                name: name,
                email: email,
                //password: BcryptAdapter.hash(password),
                password: this.hashPassword(password)
            })

            await user.save()


            //3. Mapear la respuesta a nuestra entidad

            // return new UserEntity(
            //     //falta un mapper
            //     user.id,
            //     name,
            //     email,
            //     user.password,
            //     user.roles
            // )
            return UserMapper.userEntityFromObject(user);

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError();

        }

    }

}