//usamos una funcion anonima autoinvocada crea un scope propio, se llama a si misma y la ventaja es que la funcion main puede ser asincrona de entrada,
//ya que por defecto no podemos usar await a menos que este en una funcion asyncrona.

//es buena practica crear variables de entorno explicitas para evitar las dependencias ocultas en las variables de entorno de mi aplicacion,
// la gente ya va a saber que el puesto es opcional pero por defecto arranca en 3100 y lo pueden cambiar si quieren

import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(() => {
    main();
})()

async function main() {
    //todo: await base de datos

    //todo: inicio de nuestro server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
        .start();
    console.log("main");
}