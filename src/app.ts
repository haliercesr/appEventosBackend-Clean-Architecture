//usamos una funcion anonima autoinvocada crea un scope propio, se llama a si misma y la ventaja es que la funcion main puede ser asincrona de entrada,
//ya que por defecto no podemos usar await a menos que este en una funcion asyncrona.

//es buena practica crear variables de entorno explicitas para evitar las dependencias ocultas en las variables de entorno de mi aplicacion,
// la gente ya va a saber que el puesto es opcional pero por defecto arranca en 3100 y lo pueden cambiar si quieren

import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { MongoDatabase } from "./data/mongodb";


(() => {
    main();
})()

async function main() {
    console.log(envs.MONGO_DB_NAME,envs.MONGO_URL)
   // Al querer levantar el servidor, hasta que no tenga una respuesta de la base de datos no va a seguir con ninguna otra ejecucion de codigo
await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
})

    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
        .start();
    console.log("main");
}