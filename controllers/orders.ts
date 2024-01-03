import { Request, Response } from 'express';
import Order, {IOrder} from '../models/order';
import { ObjectId } from 'mongoose';


export const getOrdernes  =async (req: Request, res: Response): Promise<void> => {
  const UsuarioId: ObjectId = req.body.usuarioConectado._id;
  const consulta = { user: UsuarioId }; 

  const orders = await Order.find(consulta)
  res.json({
    data: [...orders]
    });

}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
   const usuario: ObjectId = req.body.usuarioConectado._id;
   const orderData: IOrder = req.body;
   const data = {
        ...orderData,
        user: usuario,
        creattedAT: new Date(),
        status: "Pendiente"
    }
    const order = new Order(data);

    await order.save();
    res.status(201).json({
        msg: "Orden creada correctamente",
        order
    });
    
}