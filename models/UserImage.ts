import mongoose, { InferSchemaType } from 'mongoose'

const UserImageSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false, index: true },
    url:    { type: String, required: true },
    name:   { type: String, required: true },
    size:   { type: Number, required: true },
  },
  { timestamps: true }
)

export type UserImageDocument = InferSchemaType<typeof UserImageSchema>

const UserImage =
  mongoose.models.UserImage || mongoose.model('UserImage', UserImageSchema)
export default UserImage
