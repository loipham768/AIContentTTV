import { dbConnect } from './mongodb'
import TemplateModel from '@/models/Template'

export type TemplateCategory = 'landing' | 'article' | 'ads'

export interface TemplateMeta {
  id: string
  name: string
  category: TemplateCategory
  description: string
  tags: string[]
  gradient: string
  accentColor: string
}

export interface Template extends TemplateMeta {
  html: string
}

const META_PROJ = { html: 0, __v: 0, _id: 0 }
const FULL_PROJ = { __v: 0, _id: 0 }

export async function getTemplatesByCategory(
  category: string,
  page: number,
  limit: number,
): Promise<{ templates: TemplateMeta[]; total: number }> {
  await dbConnect()
  const [docs, total] = await Promise.all([
    TemplateModel.find({ category }, META_PROJ)
      .sort({ order: 1, _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    TemplateModel.countDocuments({ category }),
  ])
  return { templates: docs as unknown as TemplateMeta[], total }
}

export async function getInitialTemplateGroups(
  categories: TemplateCategory[],
  pageSize: number,
): Promise<Record<string, { templates: TemplateMeta[]; total: number }>> {
  await dbConnect()
  const entries = await Promise.all(
    categories.map(async (cat) => {
      const [docs, total] = await Promise.all([
        TemplateModel.find({ category: cat }, META_PROJ)
          .sort({ order: 1, _id: 1 })
          .limit(pageSize)
          .lean(),
        TemplateModel.countDocuments({ category: cat }),
      ])
      return [cat, { templates: docs as unknown as TemplateMeta[], total }] as const
    }),
  )
  return Object.fromEntries(entries)
}

export async function getTemplateById(id: string): Promise<Template | null> {
  await dbConnect()
  const doc = await TemplateModel.findOne({ id }, FULL_PROJ).lean()
  return doc as unknown as Template | null
}

export async function getFirstTemplateHtml(category: TemplateCategory): Promise<{ id: string; html: string } | null> {
  await dbConnect()
  const doc = await TemplateModel
    .findOne({ category }, { id: 1, html: 1, _id: 0 })
    .sort({ order: 1, _id: 1 })
    .lean() as unknown as { id: string; html: string } | null
  return doc
}

export async function seedTemplates(
  templates: Array<{ id: string; name: string; category: string; description: string; tags: string[]; gradient: string; accentColor: string; html: string }>,
): Promise<void> {
  await dbConnect()
  await Promise.all(
    templates.map((t, i) =>
      TemplateModel.updateOne({ id: t.id }, { ...t, order: i }, { upsert: true }),
    ),
  )
}
