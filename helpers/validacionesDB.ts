import Usuario, { IUsuario} from "../models/usuario";
import { sendEmail } from "../mailer/mailer";

export const existEmail = async (email: string):Promise<void> => {
    // Verificar si el correo existe
    const existe: IUsuario | null =   await Usuario.findOne({email});
    if (existe && existe.verified) {
        throw new Error(`El correo ${email} ya está registrado y verificado`);
    }

    if(existe && !existe.verified ){
        await sendEmail(email, existe.code as string);
        throw new Error(`El correo ${email} ya está registrado, pero no ha sido verificado. Se ha enviado un nuevo código de verificación`);
    }    
}
