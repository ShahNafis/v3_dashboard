/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model } from 'mongoose'
import { ImageServeSequenceDocument } from '../../interfaces/models'

//import { CatalogModel } from './Catalog'

const ImageServeSequence: Schema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Assign Image Id'],
      enum: ['random'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const ImageServeSequenceModel: Model<ImageServeSequenceDocument> = model(
  'ImageServeSequence',
  ImageServeSequence
)
