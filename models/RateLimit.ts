import mongoose, { InferSchemaType } from 'mongoose'

const RateLimitSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 10 },
})

export type RateLimitDocument = InferSchemaType<typeof RateLimitSchema>

const RateLimit =
  mongoose.models.RateLimit || mongoose.model('RateLimit', RateLimitSchema)
export default RateLimit
