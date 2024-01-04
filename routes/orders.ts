import { Router } from "express";
import { createOrder, getOrdernes } from "../controllers/orders";
import validarJWT  from "../middlewares/validarJWT";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { isVerified } from "../middlewares/validarVerificacion";
import { check } from "express-validator";

const router = Router();

router.get("/",[validarJWT, recolectarErrores], getOrdernes);

router.post("/",
[
    validarJWT, 
    isVerified,
    check( "price", "El precio es obligatorio" ).not().isEmpty(),
    check( "shippingCost", "El costo de envio es obligatorio" ).not().isEmpty(),
    check( "total", "El total es obligatorio" ).not().isEmpty(),
    check( "shippingDetails", "Los detalles de envio son obligatorios" ).not().isEmpty(),
    check( "items", "El array del producto son obligatorios" ).not().isEmpty(),
    recolectarErrores
] , createOrder);


export default router;