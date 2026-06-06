import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
  {
    userId:    { type: String, required: true },
    userEmail: { type: String, required: true },
    userName:  { type: String, required: true, maxlength: 60 },
    avatarUrl: { type: String, default: '' },
    plan:      { type: String, default: 'free' },
    rating:    { type: Number, required: true, min: 1, max: 5 },
    content:   { type: String, required: true, minlength: 10, maxlength: 500 },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true },
)

ReviewSchema.index({ isApproved: 1, createdAt: -1 })
ReviewSchema.index({ userId: 1 }, { unique: true })

if (process.env.NODE_ENV !== 'production') {
  delete (mongoose.models as any).Review
}

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema)
export default Review
