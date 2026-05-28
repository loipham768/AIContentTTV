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
    isActive:   { type: Boolean, default: true },
    isAdmin:    { type: Boolean, default: false },
    paidUntil:  { type: Date, default: null },

    // Profile
    fullName:   { type: String, default: '' },
    phone:      { type: String, default: '' },
    avatarUrl:  { type: String, default: '' },

    // ── Plan & billing ──────────────────────────────────────────────
    plan:          { type: String, enum: ['free', 'basic', 'pro'], default: 'free' },
    planExpiresAt: { type: Date, default: null },

    // Pay-as-you-go credits (never expire)
    credits:              { type: Number, default: 0 },   // HTML block credits
    creditsLandingPages:  { type: Number, default: 0 },   // Landing page credits

    // Monthly usage counters — reset lazily when usageMonth changes
    usageMonth:         { type: String, default: '' },    // 'YYYY-MM'
    htmlBlocksUsed:     { type: Number, default: 0 },
    landingPagesUsed:   { type: Number, default: 0 },
  },
  { timestamps: true }
)

export type UserDocument = InferSchemaType<typeof UserSchema>

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User
