//AQUI UTILIZAREMOS EL PATRON ADAPTADOR PARA ADAPTAR UN PAQUETE QUE ME SIRVA PARA ENCRIPTAR MIS CONTRASEÑAS
//no utilizaremos inyecccion de dependencias, asi que no necesitamos un contructor, son todos metodos estaticos
import { compareSync, hashSync } from 'bcryptjs';

export class BcryptAdapter {

    static hash(password: string): string {
        return hashSync(password);
    }

    static compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}