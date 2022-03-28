import * as mongoose from 'mongoose';
import { Category } from './category.model.js';
import { Ingredients } from './ingredients.model.js';


export interface MenuItems {
    _id?: { type: mongoose.Types.ObjectId },
    name:string,
    description: string,
    image: string,
    images: string[],
    category: [
        { category: Category }] 
    ingredients: [
        { ingredients:Ingredients }],
    isFeatured :Boolean
    
}


