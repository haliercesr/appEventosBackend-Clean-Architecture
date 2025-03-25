import jwt from 'jsonwebtoken';  //al instalar el paquete, como no fue echo en typescript tenemos que importar los types que son las declaraciones de los tipos de datos
import { envs } from './envs';

const JWT_SEED=envs.JWT_SEED;  //para generar un secret mas seguro se puede hacer con: "openssl rand -hex 32" o "openssl rand -hex 12", en windows se debe configurar la variable de entorno pero se puede usar en git bash
type Unit =
    | "Years"
    | "Year"
    | "Yrs"
    | "Yr"
    | "Y"
    | "Weeks"
    | "Week"
    | "W"
    | "Days"
    | "Day"
    | "D"
    | "Hours"
    | "Hour"
    | "Hrs"
    | "Hr"
    | "H"
    | "Minutes"
    | "Minute"
    | "Mins"
    | "Min"
    | "M"
    | "Seconds"
    | "Second"
    | "Secs"
    | "Sec"
    | "s"
    | "Milliseconds"
    | "Millisecond"
    | "Msecs"
    | "Msec"
    | "Ms";

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue =
    | `${number}`
    | `${number}${UnitAnyCase}`
    | `${number} ${UnitAnyCase}`;

export class JwtAdapter {

    //en este caso no necesito inyeccion de dependencias entonces no pongo un constructor, me manejo con metodos estaticos
    static async generateToken(
        payload: Object,
        duration: StringValue = '2d'): Promise<string | null> {  // lo malo de jsonwebtiken es que se maneja con callbacks y no con promesas

        return new Promise((resolve) => {

            //todo: generacion del SEED
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);

                resolve(token!);
            })
        }
        )
    }

    static validateToken<T>(token:string):Promise<T|null>{   //el T hace referencia a un Type, esto me permite usar validatetoken y en el tipado de las props ponerle lo que necesite y el payload queda con el tipado correcto.

        return new Promise((resolve)=>{
            jwt.verify(token,JWT_SEED, (err,decoded)=>{
                if(err) return resolve(null);
                resolve(decoded as T);
            });
        })
    }

}