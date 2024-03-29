import { Model, Schema, Types, model } from "mongoose";

interface isShippingDetails {
    name: string;
    cellphone: string;
    location: string;
    address: string;
}

interface ITtem{
    desc: string;
    id: number;
    price: number;
    quantity: number;
    title: string;

}

export interface IOrder {
    createdAt: Date;
    user: Types.ObjectId;
    price: number;
    items: ITtem[];
    shippingDetails: isShippingDetails;
    status: string;
    total: number;

}

const OrderSchema = new Schema<IOrder>({
    createdAt: { 
        type: Date, 
        default: Date.now },
    user: {
         type: Schema.Types.ObjectId,
          ref: "Usuario",
          required: true
        },
          
    price: { 
        type: Number,
         required: true
         },
    items: { 
        type: [
            {
                desc: { type: String, required: true },
                id: { type: Number, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                title: { type: String, required: true },
            }
        
        ],
         required: true
         },
    shippingDetails: { 
        type: {
            name: { type: String, required: true },
            cellphone: { type: String, required: true },
            location: { type: String, required: true },
            address: { type: String, required: true },
        
        }, 
        required: true },
    status: {
         type: String, 
         required: true 
        },
    total: {
         type: Number,
         required: true 
        },
});

const Order: Model<IOrder> = model<IOrder> ("Order", OrderSchema);

export default Order;