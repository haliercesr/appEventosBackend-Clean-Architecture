//Pueden ser clases, funciones, factory functions
//La data que se espera en el servidor para mover de un lado a otro es conocida como un DTO (Data Transfer Object), es decir un objeto de transferencia de informacion
//Vamos a crear tantos dtos como peticiones POST y PUT tengamos
//para evitar que otro desarrollador use nuestro DTO lo ponemos como un constructor privado
export class RegisterUserDto {

    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {

        return[]
    }
}