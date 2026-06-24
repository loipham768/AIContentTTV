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
    plan:          { type: String, enum: ['free', 'designer', 'basic', 'pro'], default: 'free' },
    planExpiresAt: { type: Date, default: null },

    // Pay-as-you-go credits (never expire)
    credits:      { type: Number, default: 0 },
    creditsTotal: { type: Number, default: 0 },

    // Deprecated: merged into credits via one-time migration in planGate
    creditsLandingPages: { type: Number, default: 0 },

    // Monthly usage counter — reset lazily when usageMonth changes
    usageMonth:      { type: String, default: '' },  // 'YYYY-MM'
    generationsUsed: { type: Number, default: 0 },

    // Referral
    referredBy:      { type: String, default: '' },  // email of referrer
    referralCount:   { type: Number, default: 0 },   // how many users this user has referred

    // Activity tracking
    lastActiveAt: { type: Date, default: null },

    // Registration location (for marketing analytics)
    registrationIp:          { type: String, default: '' },
    registrationCountry:     { type: String, default: '' },
    registrationCountryCode: { type: String, default: '' },
    registrationRegion:      { type: String, default: '' },
    registrationCity:        { type: String, default: '' },
  },
  { timestamps: true }
)

export type UserDocument = InferSchemaType<typeof UserSchema>

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User
