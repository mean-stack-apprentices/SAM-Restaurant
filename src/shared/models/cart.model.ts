import * as mongoose from 'mongoose';
import { MenuItems } from './menuItems.model.js';
import { User } from './user.model.js';
export interface Cart{
    _id?:{type: mongoose.Types.ObjectId}
    user?:User,
    items: {menuItems:MenuItems,quantity:number}[],
    total?: number,
    count:number
    
}