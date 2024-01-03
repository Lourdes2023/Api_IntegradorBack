import { Model, Schema, model } from 'mongoose';
import { USER_ROLES } from '../helpers/constants';  

export interface IUsuario {
    nombre: string;
    email: string;
    password: string;
    role?: string;
    code?: string;
    verified?: boolean;
    
}

const usuarioSchema = new Schema<IUsuario>({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        default: USER_ROLES.user,
    },
    code: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }
});


usuarioSchema.methods.toJSON = function () {
    const { __v, password,_id, code, ...usuario } = this.toObject();
    return usuario;
}

const Usuario: Model<IUsuario> = model<IUsuario>('Usuario', usuarioSchema);

export default Usuario;