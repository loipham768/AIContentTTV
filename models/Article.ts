import mongoose, { InferSchemaType } from 'mongoose'

const ArticleSchema = new mongoose.Schema(
  {
    slug:          { type: String, required: true, unique: true },
    title:         { type: String, required: true },
    description:   { type: String, required: true },
    category:      { type: String, required: true },
    readTime:      { type: String, required: true },
    publishedDate: { type: String, required: true },
    author:        { type: String, required: true, default: 'TaoPage' },
    keywords:      [{ type: String }],
    content:       { type: String, required: true },
    image:         { type: String, default: null },
  },
  { timestamps: true }
)

ArticleSchema.index({ slug: 1 })
ArticleSchema.index({ category: 1, publishedDate: -1 })

export type ArticleDocument = InferSchemaType<typeof ArticleSchema>

const ArticleModel = mongoose.models.Article || mongoose.model('Article', ArticleSchema)
export default ArticleModel
