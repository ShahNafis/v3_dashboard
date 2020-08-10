/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model, Types } from 'mongoose'
import { TagDocument } from '../../interfaces/models'

//import { CatalogModel } from './Catalog'

const TagSchema: Schema = new Schema(
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
    tags: {
      type: Object,
    },
    date: {
      type: Date,
      required: [true, 'Assign Image Id'],
    },
    ignoreFields: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

TagSchema.index({ imageId: 1, userId: 1 }, { unique: true })

export const TagModel: Model<TagDocument> = model('Tag', TagSchema)
