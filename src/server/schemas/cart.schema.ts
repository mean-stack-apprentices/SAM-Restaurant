import { MenuItems } from './../../shared/models/menuItems.model';
import mongoose from 'mongoose';
import { Cart } from './../../shared/models/cart.model.js';

const {Schema, model} = mongoose

const cartSchema = new mongoose.Schema<Cart>({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    items: [{
        menuItems: { type: mongoose.Types.ObjectId, ref: 'MenuItems' },
        quantity:Number
    }] 
});
cartSchema.virtual('total').get(function (this: Cart) {
    return this.items.reduce((amount: number, item:{menuItems:MenuItems,quantity:number}) => {
        return ((item.menuItems.price*item.quantity)) + amount
    },0).toFixed(2)
})
cartSchema.set(`toObject`, {virtuals:true});
cartSchema.set(`toJSON`, {virtuals:true});


export const CartModel = model<Cart>('Cart',cartSchema)