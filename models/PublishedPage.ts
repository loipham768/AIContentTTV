import mongoose, { InferSchemaType } from 'mongoose'

const PublishedPageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, maxlength: 100 },
    projectId: { type: String, required: true, index: true },
    userId: { type: String, required: false, index: true },
    htmlSnapshot: { type: String, required: true },
    title: { type: String, default: '', maxlength: 200 },
    isActive: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export type PublishedPageDocument = InferSchemaType<typeof PublishedPageSchema>

const PublishedPage =
  mongoose.models.PublishedPage || mongoose.model('PublishedPage', PublishedPageSchema)
export default PublishedPage
