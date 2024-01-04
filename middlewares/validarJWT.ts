import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario, { IUsuario } from "../models/usuario";

const validarJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const token = req.headers["x-token"] as string;
   if (!token) {
         res.status(401).json({
         msg: 'No hay token en la petición'
      });
   }
    try {
       const  claveSecreta = process.env.JWT_SECRET as string;
       const payload = jwt.verify(token, claveSecreta) as JwtPayload;
       const {id} = payload;
       const usuarioConectado: IUsuario | null = await Usuario.findById(id);
       if (!usuarioConectado) {
          res.status(401).json({
             msg: 'Token no válido - usuario no existe en DB'
          });

          return;
       }

     req.body.usuarioConectado = usuarioConectado;
     req.body.id = id;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}


export default validarJWT;