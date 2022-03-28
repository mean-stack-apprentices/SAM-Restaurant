import mongoose from "mongoose";
import { Ingredients } from './../../shared/models/ingredients.model.js';

const { Schema, model } = mongoose

const IngredientsSchema = new Schema<Ingredients>({
    
    name: { type: String },
    
    imgUrl: {
        type: String, required: true
    },    
})

export const IngredientsModel=model('Ingredients',IngredientsSchema)