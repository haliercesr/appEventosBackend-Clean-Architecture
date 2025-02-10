import { UserModel } from "../../data/mongodb";
import { AuthDatasources, CustomError, RegisterUserDto, UserEntity } from "../../domain";


export class AuthDatasourcesImpl implements AuthDatasources {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {

            //1. Verificar si el correo existe
            const exists = await UserModel.findOne({ email });
            if (exists) throw CustomError.badRequest('User already exists')
            //2. Hash de la contraseña


            const user = await UserModel.create({
                name: name,
                email: email,
                password: password,
            })

            await user.save()


            //3. Mapear la respuesta a nuestra entidad

            return new UserEntity(
                //falta un mapper
                user.id,
                name,
                email,
                password,
                user.roles
            )
        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError();

        }

    }

}