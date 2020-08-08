/*
    Model for users. Contains a link to each role the user has and what storms they can tag
*/


import { 
    Schema, model, Model, Types
     //HookNextFunction, SchemaDefinition
    } from 'mongoose'
import {UserDocument}  from '../../interfaces/models'


const userSchema: Schema = new Schema({
    assignedImages:{
        type:Object,
        default: {}
    },
    catalogs:{
        type:[Types.ObjectId]
    },
    dateAdded:{
        type:Date
    },
    imagesTagged: {
        type: Object,
        default: {}
    },
    roles:{
        type:[String],
        default:[]
    },
    userId:{
        required:[true,'UserId not passed'],
        unique: true,
        type:String
    },
    userName: {
        required:[true,'Username not passed'],
        unique: true,
        type:String
    },
    
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

export const UserModel: Model<UserDocument> =  model('User', userSchema);
