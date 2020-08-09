/*
    Model for archives. Contains a link to the storm it falls under
*/

import { Schema, model, Types } from 'mongoose'
import { ArchiveModelType } from '../../interfaces/models'

const archiveScehma: Schema = new Schema(
  {
    dateAdded: {
      type: Date,
    },
    description: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Please provide archive name'],
      unique: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    path: {
      type: String,
      required: [true, 'Please provide archive path'],
      unique: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    compressedPath: {
      type: String,
      unique: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    catalog: {
      type: Types.ObjectId,
      required: true,
      ref: 'Catalog',
    },
    taggable: {
      type: Boolean,
      required: [true, 'Please provide if archive is taggable or not.'],
    },
    totalImages: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

archiveScehma.virtual('getCatalog', {
  ref: 'Catalog',
  localField: 'catalog',
  foreignField: '_id',
  justOne: false,
})

archiveScehma.statics.updateCatalogImageCount = async function (
  catalogId: Types.ObjectId
) {

  const obj = await this.aggregate([
    {
      $match: { catalog: new Types.ObjectId(catalogId) },
    },
    {
      $group: {
        _id: '$catalog',
        totalImages: { $sum: '$totalImages' },
      },
    },
  ])
  //console.log(obj,catalogId)
  try {
    await this.model('Catalog').findByIdAndUpdate(catalogId, {
      totalImages: obj[0]?.totalImages,
    })
  } catch (err) {
    console.error(err)
  }
}

export const ArchiveModel: ArchiveModelType = model('Archive', archiveScehma)
