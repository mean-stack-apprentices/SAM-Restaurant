import mongoose from "mongoose";

import { orderItems } from './../../shared/models/orderItems.model.js';

const { Schema, model } = mongoose

const orderItemSchema = new Schema<orderItems>({
    name: {
        type:String,required:true
    },
    quantity: {
        type:Number,required:true
    },
    price:
        { type: Number, required: true }
})

export const OrderItemModel=model('OrderItem',orderItemSchema)