/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model, Types, HookNextFunction } from 'mongoose'
import { AssingedImageDocument } from '../../interfaces/models'
import { ImageModel } from './Image'
//import { CatalogModel } from './Catalog'

const AssignedImageSchema: Schema = new Schema(
  {
    imageId: {
      type: Types.ObjectId,
      required: [true, 'Assign Image Id'],
      ref: 'Image',
    },
    archiveId: {
      type: Types.ObjectId,
      ref: 'Archive',
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

AssignedImageSchema.pre<AssingedImageDocument>('save', async function (
  next: HookNextFunction
) {
  //if there is no archiveId, add one
  if (!this.archiveId) {
    const image = await ImageModel.findOne({ _id: this.imageId })
    this.archiveId = image.archive
  }

  next()
})

AssignedImageSchema.index(
  { imageId: 1, userId: 1, archiveId: 1 },
  { unique: true }
)

export const AssignedImageModel: Model<AssingedImageDocument> = model(
  'AssignedImage',
  AssignedImageSchema
)
