import { NextFunction, Request,Response } from "express";

export const isVerified = (req: Request, res: Response, next: NextFunction) => {
    const { verified } = req.body.usuarioConectado;

    if(!verified){
        res.status(401).json({msg: 'Usuario no verificado'});
        return;
    }
    next();
}

