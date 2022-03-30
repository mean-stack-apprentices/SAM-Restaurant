import * as mongoose from 'mongoose';
export interface Admin {
    _id?:{type: mongoose.Types.ObjectId}
    firstname: string,
    lastname: string,
    email: string,
    encryptedPassword: string,
    role: string
}