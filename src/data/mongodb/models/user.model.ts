import mongoose, { Schema } from "mongoose";
//El Schema define las reglas de como queremos que este modelo trabaje
//Para interactuaar con la coleccion de User vamos a hacerlo a traves de este modelo
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
    },
    roles: {
        type: [String],    //un array de string, pasa saber mas ver la documentacion para definir esquemas en mongoose
        default: 'USER_ROLE',
        enum: ['USER_ROLE','ADMIN_ROLE']  //Valores posibles que puede tener el rol del usuario
    }
}) 

export const UserModel = mongoose.model('User', userSchema);  // mongoose.model(Nombre que va a tener la coleccion, el schema creado o reglas del modelo);