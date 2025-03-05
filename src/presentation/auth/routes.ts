// A menos que usemos inyeccion de dependencias, es recomendable usar static para evitar instancias de sus clases y simplemente llamar los metodos como un agrupador, un beneficio que tenemos.
// Aqui solo tienen que estar la definicion de la ruta, no debe contener lo que hace la ruta.
import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourcesImpl, AuthRepositoryImpl } from '../../infrastructure';

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new AuthDatasourcesImpl(); //por defecto usamos Bcrypt con el patron Adapter para encriptar contraseñas, se puede usar otras funciones
        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        //Definir todas mis rutas principales
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)


        return router;

    }

}