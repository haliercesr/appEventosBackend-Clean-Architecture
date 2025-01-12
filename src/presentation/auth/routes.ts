// A menos que usemos inyeccion de dependencias, es recomendable usar static para evitar instancias de sus clases y simplemente llamar los metodos como un agrupador, un beneficio que tenemos.
// Aqui solo tienen que estar la definicion de la ruta, no debe contener lo que hace la ruta.
import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        const controller = new AuthController();

        //Definir todas mis rutas principales
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)


        return router;

    }

}