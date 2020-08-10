/*
    Model for archives. Contains a link to the storm it falls under
*/

import { Schema, model, Types } from 'mongoose'
import { ArchiveModelType, ArchiveDocument } from '../../interfaces/models'
import { CatalogModel } from './Catalog'

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

//updates archives image count
archiveScehma.statics.updateArchiveImageCount = async function (
  archiveId: Types.ObjectId
) {
  const images = await this.model('Image').find({ archive: archiveId })
  await this.model('Archive').updateOne(
    { _id: archiveId },
    { totalImages: images.length }
  )
}

//Runs on 
// const test = await ArchiveModel.findOne({name:'american'})
// await test.updateOne({totalImages:test.totalImages+1})
//Aka query middleware
archiveScehma.post('updateOne', async function (this: ArchiveDocument) {
  //@ts-ignore
  const archive = await ArchiveModel.findOne(this.getQuery())
  await CatalogModel.updateCatalogImageCount(archive.catalog)
})
export const ArchiveModel: ArchiveModelType = model('Archive', archiveScehma)
