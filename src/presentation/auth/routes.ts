// A menos que usemos inyeccion de dependencias, es recomendable usar static para evitar instancias de sus clases y simplemente llamar los metodos como un agrupador, un beneficio que tenemos.
// Aqui solo tienen que estar la definicion de la ruta, no debe contener lo que hace la ruta.
import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourcesImpl, AuthRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new AuthDatasourcesImpl(); //por defecto usamos Bcrypt con el patron Adapter para encriptar contraseñas, se puede usar otras funciones
        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        //Definir todas mis rutas principales
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)
        router.get('/', [AuthMiddleware.validateJWT] , controller.getUser) // Para poner mas de un middleware se usan corchetes y segun el orden en el array se van ejecutando de izquierda a derecha

        return router;

    }

}