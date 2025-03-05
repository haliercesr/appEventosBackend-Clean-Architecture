//Un mapper es un puente entre las capas de mi aplicacion
// Este mapper es una capa de abstraccion, un puente entre mi modelo de la base de datos (userModel) y la entidad que mi dominio usa (UserEntity)
//con esto podemos cambiar la base de datos y solo deberiamos modificar los mappers y no mi userEntity, el codigo es mas limpio, mas adaptable, escalable, menos repetitivo y reutilizable.

import { CustomError, UserEntity } from "../../domain";

//puede ser una funcion o una clase, cuando mandamos el objeto a userEntityFromObject va a verificar las propiedades del objeto y me va a devolver mi instancia
export class UserMapper {
    static userEntityFromObject(object: { [key: string]: any }) {

        const { id, _id, name, email, password, roles } = object; //podemos poner valores por defecto como roles='asignar_rol'

        if (!_id || !id) throw CustomError.badRequest('Missing id');

        if (!name) throw CustomError.badRequest('Missing name');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!password) throw CustomError.badRequest('Missing password');

        //Una vez que tenemos toda la info necesaria, creamos la entidad en la base de datos
        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            roles
        );
    }
}