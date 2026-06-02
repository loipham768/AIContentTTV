import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // e.g. VCB-20260527-K7X3M
    userId: { type: String, required: true },

    type: { type: String, enum: ["subscription", "credits"], required: true },
    plan: { type: String, enum: ["basic", "pro"], default: null },
    billing: { type: String, enum: ["monthly", "yearly"], default: "monthly" },

    // Credits granted on activation (for credit packs)
    creditsHtml: { type: Number, default: 0 },

    amount: { type: Number, required: true }, // VND

    status: {
      type: String,
      enum: [
        "pending",
        "awaiting_confirmation",
        "paid",
        "cancelled",
        "expired",
      ],
      default: "pending",
    },

    // Payment proof uploaded by user
    paymentProofUrl: { type: String, default: null },

    // Payment window — order expires after 24h if unpaid
    expiresAt: { type: Date, required: true },
    activatedAt: { type: Date, default: null },
    adminNote: { type: String, default: "" },
  },
  { timestamps: true },
);

OrderSchema.index({ userId: 1, status: 1 });
OrderSchema.index({ status: 1, expiresAt: 1 });

// Delete cached model in dev so schema changes take effect on hot-reload
if (process.env.NODE_ENV !== "production") {
  delete (mongoose.models as any).Order;
}

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
