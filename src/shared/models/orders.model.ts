import * as mongoose from 'mongoose';
import { User } from './user.model.js';

export interface Orders {
    _id?: { type: mongoose.Types.ObjectId },
    user?:User
    orderItems: { orderItems: any }[],
    totalPrice: number
   
}