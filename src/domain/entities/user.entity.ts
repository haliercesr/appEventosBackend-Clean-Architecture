//La carpeta de domain contiene las reglas que gobiernan nuestra aplicacion
//Las entidades son bien parecidas a como vamos a trabajar en la base de datos, es decir como lucen nuestros registros en la base de datos
// Esto evitara el efecto domino, al crear esta capa si cambia nuestra base de datos no se cae toda nuestra aplicacion con un efecto domino

export class UserEntity{
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string[],
        public img?: string,
    ){}
}