import  mongoose from "mongoose";
import { Orders } from './../../shared/models/orders.model.js';


const { Schema, model } = mongoose

const OrdersSchema = new Schema<Orders>({
    
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    
    orderItems: [{
        type: mongoose.Types.ObjectId,
        ref: 'OrderItem', required: true
    }],
    
    totalPrice:{type:Number}
    
})

export const OrdersModel=model('Orders',OrdersSchema)