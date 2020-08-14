import { ArchiveModel } from './Archive'
import { AssignedImageModel } from './AssignedImages'
import { CatalogModel } from './Catalog'
import { ImageModel } from './Image'
import { ImageServeOrderModel } from './ImageServeOrder'
import { TagModel } from './Tag'
import { UserModel } from './User'
import { QuestionSetModel } from './QuestionSet'

export function RegisterModels() {
  const models = [
    ArchiveModel,
    AssignedImageModel,
    CatalogModel,
    ImageModel,
    ImageServeOrderModel,
    TagModel,
    UserModel,
    QuestionSetModel,
  ]
  models.map((model) => console.log(`Model ${model.modelName} registered`))
}