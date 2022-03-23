import mongoose from 'mongoose';
import type { User } from '../../shared/models/user.model';
const {Schema, model} = mongoose

const userSchema = new Schema<User>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true },
    encryptedPassword: {type: String, required: true },
    points:{type: String, required: true},
    role: {type: String, enum: ['admin', 'restricted'], required: true}
})

export const UserModel = model<User>('User',userSchema)
