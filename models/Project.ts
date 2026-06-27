import mongoose, { InferSchemaType } from 'mongoose'

const ProjectSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false, index: true },
    name: { type: String, required: true, maxlength: 50 },
    prompt: { type: String, required: true, maxlength: 500 },
    blockData: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
)

export type ProjectDocument = InferSchemaType<typeof ProjectSchema>

const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema)
export default Project
