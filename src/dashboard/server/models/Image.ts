/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model, Types } from 'mongoose'
import { ImageDocument } from '../../interfaces/models'
import { ArchiveModel } from './Archive'
//import { CatalogModel } from './Catalog'

const ImageSchema: Schema = new Schema(
  {
    archive: {
      type: Types.ObjectId,
      required: [true, 'Please which archives this image is in'],
    },
    dateAdded: {
      type: Date,
    },
    finalTag: {
      type: Object,
    },
    name: {
      type: String,
      required: [true, 'Please add a name of image with its extension'],
      unique: false,
      trim: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    path: {
      type: String,
      required: [true, 'Please provide image path'],
      unique: false,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    taggable: {
      type: Boolean,
      required: [true, 'Please tell if this image is taggable or not'],
    },
    tags: {
      type: [Object],
    },
    numberOfTags: {
      type: Number,
    },
    numberOfMatches: {
      type: Number,
      required: [
        true,
        'Please tell how many times two or more taggers must agree till complete',
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ImageSchema.statics.getTotalCount = async function (archiveId: Types.ObjectId) {
  const totalImages = await this.model('Image').find({ archive: archiveId })
  try {
    await ArchiveModel.findByIdAndUpdate(archiveId, {
      totalImages: totalImages.length,
    })
  } catch (err) {
    console.error(err)
  }
}

//runs on image.create()
//this is the doc
ImageSchema.post<ImageDocument>('save', async function (this: ImageDocument) {
  // console.log('SVE HOOK')
  // console.log(Object.keys(this))
  // console.log(this.name)
  await (this.constructor as any).getTotalCount(this.archive)
  const archive = await ArchiveModel.findById(this.archive)
  await ArchiveModel.updateCatalogImageCount(archive.catalog)
})

ImageSchema.pre<ImageDocument>(
  'updateOne',
  //@ts-expect-error
  { document: true, query: false },
  async function (this: ImageDocument) {
    console.log(this.name)
  }
)

//runs on
// imgDoc.remove()
ImageSchema.post<ImageDocument>('remove', async function (this: ImageDocument) {
  console.log(`removing hook <----------`)
  await (this.constructor as any).getTotalCount(this.archive)
  const archive = await ArchiveModel.findById(this.archive)
  await ArchiveModel.updateCatalogImageCount(archive.catalog)
})

//This makes it so that the name and archive pair are unique
ImageSchema.index({ name: 1, archive: 1 }, { unique: true })

export const ImageModel: Model<ImageDocument> = model('Image', ImageSchema)
