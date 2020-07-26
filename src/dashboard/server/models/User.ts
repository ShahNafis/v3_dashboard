/*
    Model for users. Contains a link to each role the user has and what storms they can tag
*/

import { Schema, model, Model } from 'mongoose'
import { UserDocument } from '../../interfaces/models'

const userSchema: Schema = new Schema(
  {},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const UserModel: Model<UserDocument> = model('User', userSchema)
