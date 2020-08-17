import { TagModel } from '../models/Tag'

interface Params {
  userId?: string
  catalogId?: string
  imageId?: string
  archiveId?: string
}

async function tagModelAggregate(query: Params) {
  const data = await TagModel.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: '$catalogId',
        numTagsInCatalog: { $sum: 1 },
        doc: { $push: '$$ROOT' },
      },
    },
  ])
  return data
}

export { tagModelAggregate }
