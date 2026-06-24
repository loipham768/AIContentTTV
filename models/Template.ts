import mongoose, { InferSchemaType } from 'mongoose'

const TemplateSchema = new mongoose.Schema(
  {
    id:          { type: String, required: true, unique: true },
    name:        { type: String, required: true },
    category:    { type: String, required: true, enum: ['landing', 'article', 'ads', 'portfolio', 'cv'] },
    description: { type: String, required: true },
    tags:        [{ type: String }],
    gradient:    { type: String, required: true },
    accentColor: { type: String, required: true },
    image:       { type: String, default: null },
    html:        { type: String, required: true },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

TemplateSchema.index({ id: 1 })
TemplateSchema.index({ category: 1, order: 1 })

export type TemplateDocument = InferSchemaType<typeof TemplateSchema>

const TemplateModel = mongoose.models.Template || mongoose.model('Template', TemplateSchema)
export default TemplateModel
