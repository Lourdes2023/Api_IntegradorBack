import jwt from "jsonwebtoken";

export const generarJWT = (id: string = ""):  Promise<string> => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: '24h'
        }, (err: Error| null,  token: string | undefined) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token JWT');
            } else {
                resolve(token as string);
            }
        });

    });

}

