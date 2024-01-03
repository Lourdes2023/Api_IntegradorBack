import { Request, Response } from 'express';
import Usuario, {IUsuario} from '../models/usuario';
import bcryptjs from 'bcryptjs';
import { USER_ROLES } from '../helpers/constants';
import randomstring from 'randomstring';
import { sendEmail } from '../mailer/mailer';
import { generarJWT } from '../helpers/generar.JWT';




export const  register =async (req: Request, res: Response): Promise<void> => {

      const { nombre, email, password, role}: IUsuario = req.body;
      const usuario = new Usuario({nombre, email, password, role});

      // Encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);

      const adminKey = req.headers['admin-key'];
 
      if(adminKey === process.env.ADMIN_KEY){
        usuario.role = USER_ROLES.admin;
      }     

      const newCode = randomstring.generate(6); 
      usuario.code = newCode;

      await usuario.save();

      await sendEmail(email, newCode);

      res.status(201).json({usuario});

}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUsuario = req.body;

  try{

    const usuario = await Usuario.findOne({email})
    if(!usuario){
      res.status(400).json({msg: 'Email no registrado'});
      return;
    }

    //Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validPassword){
      res.status(400).json({msg: 'Contraseña incorrecta'});
      return;
    }
    
    //Verificar si el usuario esta verificado
    const Token = await generarJWT(usuario.id)
    res.status(200).json({usuario, Token});

  }catch(error){
    res.status(500).json({msg: 'Error en el servidor'});
  }
}

export const verifiyUser = async (req: Request, res: Response): Promise<void> => {
  const {email, code} = req.body;
  try {

    const usuario = await Usuario.findOne({email})

    if(!usuario){
      res.status(400).json({msg: 'No se encontros el email en la base de datos'});
      return;
    }
    if(usuario.verified){
      res.status(400).json({msg: 'Usuario ya esta verificado'});
      return;
    }

    if(usuario.code !== code){
      res.status(401).json({msg: 'Codigo incorrecto'});
      return;
    }

    const usuarioActualizado = await Usuario.findOneAndUpdate({email}, {verified: true});
    res.status(200).json({ msg: 'Usuario verificado con éxito',});
  
    
  }catch(error){
    res.status(500).json({msg: 'Error en el servidor'});
  } 
}
