/*
    Model for storms.
*/


import { Schema, model, Model,Types} from 'mongoose'
import {CatalogDocument} from '../../interfaces/models'

const catalogScheme: Schema = new Schema({
        dateAdded:{
            type: Date
        },
        name : {
            type: String,
            required: [true,'Please provide storm name'],
            unique: true,
            maxlength: [128,'Name can not be longer than 128 characters']
        },
        path : {
            type: String,
            required: [true,'Please provide storm path'],
            unique: true,
            maxlength: [128,'Name can not be longer than 128 characters']
        },
        compressedPath : {
            type: String,
            unique: true,
            maxlength: [128,'Name can not be longer than 128 characters']
        },
        catalogInfo:{
            year:{
                type: Number,
                required:false
            },
            link:{
                type: String,
                required:false,
            },
            description:{
                type: String,
                required:false
            },

        },
        taggable: {
            type: Boolean,
            required: [true,'Please provide if storm is taggable or not.'],
        },
        questionSet:{
            type: Types.ObjectId,
            required: [true,'Please provide ID of question set'],
        },
        imageServeOrder:{
            type: Object,
            required:false
        },
        totalImages: {
            type: Number
        }

        
    },{
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

)

// Reverse populate with virtuals
catalogScheme.virtual('archives', {
    ref: 'Archive',
    localField: '_id',
    foreignField: 'catalog',
    justOne: false
});


export const CatalogModel: Model<CatalogDocument> =  model('Catalog', catalogScheme);