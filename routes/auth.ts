import { Router } from 'express';
import { login, register, verifiyUser } from '../controllers/auth';
import { check } from 'express-validator';
import { existEmail } from '../helpers/validacionesDB';
import { recolectarErrores } from '../middlewares/recolectarErrores';

const router = Router();

router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),

    //Validacion custon
    check('email').custom(existEmail),
    //middleware custon
    recolectarErrores,



], register)                             

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    recolectarErrores
], login)


router.patch('/verify', [  
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('code', 'El codigo es obligatorio').not().isEmpty(),
    recolectarErrores
], verifiyUser
)

export default router;
