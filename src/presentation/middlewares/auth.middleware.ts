//Los middlewares no son mas que funciones que se ejecutan antes de otras rutas,funciones y otros middlewares
//Este controlador sera un controlador comun y corriente

import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";


export class AuthMiddleware{
    
    static validateJWT = async (req:Request, res:Response, next:NextFunction):Promise<any> => {

        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({error:'Invalid Bearer token'});
     
        const token = authorization.split(" ").at(1) || "";
        try{
           
            //Todo:
            const payload = await JwtAdapter.validateToken<{id:string}>(token);  //siempre se resuelve de manera exitosa, si no hay respuesta envio un null para no agrandar mi catch con otro tipo de error
            if(!payload) return res.status(401).json({error:'invalid token'});  //Estas respuestas deben ser mas genericas en casos reales para evitar dar informacion a usuarios no deseados.

            //Esto despues lo quitamos, porque iria dentro de nuestro datasource. 
            const user = await UserModel.findById(payload.id);
            if(!user) return res.status(500).json({error: 'invalid token - user not found'}) // Se envia un status 500 porque se busco el usuario en la BD pero no se encontro, un error 500 significa que nosotros debemos ver que pasa. Puede que el usuario cambio de id o se borro.
            

            //Aqui podriamos validar otras propiedades del usuario, como verificar la sesion de usuario con una prop de la base de datos
            //EJ:  if(user.invalidToken) return res.status(401).json({error: 'sesion finalizada'})

            req.body.user = user
            next();  // Si no lo pasamos el next se corta la ruta y no se llega a ejecutar el controlador en routes
        } catch(error){

            console.log(error);
            res.status(500).json({error:'Internal server error'});
        }
    }

}