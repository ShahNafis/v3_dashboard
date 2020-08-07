/*
    Model for images. Contains a link to the archive it falls under
*/


import { Schema, model, Model, Types} from 'mongoose'
import {ImageDocument} from '../../interfaces/models'

const ImageSchema: Schema  = new Schema(
    {
        archive:{
            type:Types.ObjectId,
            required: [true,'Please which archives this image is in'],
        },
        dateAdded:{
            type:Date
        },
        finalTag:{
            type:Object
        },
        name : {
            type: String,
            required: [true,'Please add a name of image with its extension'],
            unique: false,
            trim:true,
            maxlength: [128,'Name can not be longer than 128 characters']
        },
        path : {
            type: String,
            required: [true,'Please provide image path'],
            unique: false,
            maxlength: [128,'Name can not be longer than 128 characters']
        },
        taggable:{
            type: Boolean,
            required: [true,'Please tell if this image is taggable or not'],
          
        },  
        tags: {
            type:[Object]
        },
        numberOfTags: {
            type: Number
        },
        numberOfMatches:{
            type:Number,
            required:[true,'Please tell how many times two or more taggers must agree till complete'],
        } 
       
       
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

//This makes it so that the name and archive pair are unique
ImageSchema.index({ name: 1, archive: 1}, { unique: true });

// ImageSchema.post('save', function(doc) {
//     console.log('%s has been saved', doc._id);
//   });

export const ImageModel: Model<ImageDocument> =  model('Image', ImageSchema);