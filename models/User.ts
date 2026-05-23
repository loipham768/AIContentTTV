import mongoose, { InferSchemaType } from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export type UserDocument = InferSchemaType<typeof UserSchema>

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User
