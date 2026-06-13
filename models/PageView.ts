import mongoose from 'mongoose'

const PageViewSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    userId:    { type: String, default: null },
    ip:        { type: String, default: '' },
    path:      { type: String, default: '/' },
    date:      { type: String, required: true }, // 'YYYY-MM-DD'
  },
  { timestamps: true }
)

PageViewSchema.index({ sessionId: 1, date: 1 }, { unique: true })
PageViewSchema.index({ date: 1 })
PageViewSchema.index({ userId: 1, date: 1 })

const PageView = mongoose.models.PageView || mongoose.model('PageView', PageViewSchema)
export default PageView
