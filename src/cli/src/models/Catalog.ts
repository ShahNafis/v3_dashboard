/*
    Model for storms.
*/

import { Schema, model, Types } from 'mongoose'
import { CatalogModelType } from '../../interfaces/models'
import { ArchiveModel } from './Archive'
const catalogScheme: Schema = new Schema(
  {
    dateAdded: {
      type: Date,
    },
    name: {
      type: String,
      required: [true, 'Please provide storm name'],
      unique: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    path: {
      type: String,
      required: [true, 'Please provide storm path'],
      unique: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    compressedPath: {
      type: String,
      unique: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    catalogInfo: {
      year: {
        type: Number,
        required: false,
      },
      link: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
    taggable: {
      type: Boolean,
      required: [true, 'Please provide if storm is taggable or not.'],
    },
    questionSet: {
      type: Types.ObjectId,
      required: [true, 'Please provide ID of question set'],
    },
    imageServeOrder: {
      type: Object,
      required: false,
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

catalogScheme.statics.updateImageCount = async function (
  archiveId: Types.ObjectId
) {
  const archive = await ArchiveModel.findById(archiveId)
  const catalogId = archive.catalog
  const archives = await ArchiveModel.find({ catalog: catalogId })
  let sum = 0

  for (const arc of archives) {
    sum += arc.totalImages
  }
  //console.log(`Catalog ${catalogId} = ${sum}`)
  try {
    await this.model('Catalog').findByIdAndUpdate(catalogId, {
      totalImages: sum,
    })
  } catch (err) {
    console.error(err)
  }
}

// Reverse populate with virtuals
catalogScheme.virtual('archives', {
  ref: 'Archive',
  localField: '_id',
  foreignField: 'catalog',
  justOne: false,
})

export const CatalogModel: CatalogModelType = model('Catalog', catalogScheme)
