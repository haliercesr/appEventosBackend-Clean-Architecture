//Pueden ser clases, funciones, factory functions
//La data que se espera en el servidor para mover de un lado a otro es conocida como un DTO (Data Transfer Object), es decir un objeto de transferencia de informacion
//Vamos a crear tantos dtos como peticiones POST y PUT tengamos

import { Validators } from "../../../config";

//para evitar que otro desarrollador use nuestro DTO lo ponemos como un constructor privado
export class RegisterUserDto {

    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const {name, email, password}= object;

        if( !name ) return ['Missing name'];
        if( !email ) return ['Missing email'];
        if( !Validators.email.test(email) ) return ['Email is not valid'];
        if( !password ) return ['Missing password'];
        
        if( password.length < 6 ) return ['Password too short'];
        
        return[
            undefined,
            //new RegisterUserDto(name, email.toLowerCase(), password)  //Tamien podemos asegurarnos que email venga todo en minusculas
            new RegisterUserDto(name, email, password)
        ]
    }
}