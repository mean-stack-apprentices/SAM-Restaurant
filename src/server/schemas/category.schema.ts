import  mongoose from "mongoose";
import { Category } from './../../shared/models/category.model.js';
const { Schema, model } = mongoose

const CategorySchema = new Schema<Category>({
    
    name: { type: String, required: true},
    
    icon: {
        type: String, required: true
    },
     
})

export const CategoryModel=model('Category',CategorySchema)