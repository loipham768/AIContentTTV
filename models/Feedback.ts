import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    userId: { type: String, default: null },
    userEmail: { type: String, default: null },
    category: {
      type: String,
      enum: ["feature", "bug", "improvement", "other"],
      required: true,
    },
    title: { type: String, required: true, maxlength: 100 },
    content: { type: String, required: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "reviewed", "archived"],
      default: "new",
    },
    adminNote: { type: String, default: "" },
  },
  { timestamps: true },
);

FeedbackSchema.index({ status: 1, createdAt: -1 });

if (process.env.NODE_ENV !== "production") {
  delete (mongoose.models as any).Feedback;
}

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
