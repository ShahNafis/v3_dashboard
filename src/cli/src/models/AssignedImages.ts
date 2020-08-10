/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model, Types } from 'mongoose'
import { AssingedImageDocument } from '../../interfaces/models'

//import { CatalogModel } from './Catalog'

const AssignedImageSchema: Schema = new Schema(
  {
    imageId: {
      type: Types.ObjectId,
      required: [true, 'Assign Image Id'],
      ref: 'Image',
    },
    userId: {
      type: Types.ObjectId,
      required: [true, 'Assign Image Id'],
      ref: 'User',
    },
    date: {
      type: Date,
      required: [true, 'Assign Image Id'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

AssignedImageSchema.index({ imageId: 1, userId: 1 }, { unique: true })

export const AssignedImageModel: Model<AssingedImageDocument> = model(
  'AssignedImage',
  AssignedImageSchema
)
