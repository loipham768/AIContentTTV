import mongoose from 'mongoose'

const PendingRegistrationSchema = new mongoose.Schema({
  email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash:  { type: String, required: true },
  otp:           { type: String, required: true },
  attempts:      { type: Number, default: 0 },
  expiresAt:     { type: Date,   required: true },
  sentAt:        { type: Date,   required: true },
  referralEmail: { type: String, default: '' },
})

// TTL index: MongoDB auto-deletes expired documents
PendingRegistrationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const PendingRegistration =
  mongoose.models.PendingRegistration ||
  mongoose.model('PendingRegistration', PendingRegistrationSchema)

export default PendingRegistration
