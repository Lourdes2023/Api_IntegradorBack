import { NextFunction, Response, Request } from "express";
import { USER_ROLES } from "../helpers/constants";


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
   const { role } = req.body.usuarioConectado;
    if(role === USER_ROLES.admin){
        res.status(401).json({msg: "No tienes permisos para realizar esta acción"});
        return;
    }
    next();
};