import mongoose from "mongoose";
//al agregar opciones a la clase, nos permite reutilizar y expandir facilmente. Podemos conectarnos a cualquier base de mongo facilmente
//Mientras que en bases relacionales guardamos registros y tablas, en bases de datos no relacionales guardamos documentos y colecciones.
// Para conectarnos a las bases de datos de mongo podemos utilizar mongoose o prisma, que son ORM (Object relational Mapping) que nos sirven para modelar nuestros objetos
interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: Options) {

        const { mongoUrl, dbName } = options;
        try {

            await mongoose.connect(mongoUrl,{
                dbName: dbName,
            });

            console.log('Mongo conectado!');
            return true;   //opcional

        } catch (error) {
          console.log('Mongo conecction Error');
          throw error;
        }
    }
}