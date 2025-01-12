//La finalidad de este archivo es adaptar los paquetes o dependencias de terceros a mi proyecto, establecer las configuraciones necesarias
// la ventaja de esto es que al no utilizar los paguetes directamente y establecer la configuracion en un archivo, podemo cambiar el dia de mañana el paquete desde un solo archivo.
import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

PORT: get('PORT').required().asPortNumber(),  //el paguete env-var busca la variable de entorno PORT, required establece que tiene que venir sino tira un error, y asPortNumber lo toma como numero.

}