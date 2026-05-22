import { z } from 'zod'

// Recursive component schema — matches GrapesJS project data structure
// Using 'any' annotation to allow z.lazy() recursive self-reference without TypeScript cycle errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GrapesComponentSchema: z.ZodType<any, any, any> = z.lazy(() =>
  z.object({
    tagName: z.string().optional(),
    type: z.string().optional(),
    draggable: z.boolean().optional(),
    droppable: z.boolean().optional(),
    // Zod v4: z.record requires both key and value types
    style: z.record(z.string(), z.string()).optional(),
    components: z.array(GrapesComponentSchema).optional(),
    content: z.string().optional(),
  })
)

export const GrapesBlockSchema = z.object({
  assets: z.array(z.any()),
  styles: z.array(z.any()),
  pages: z.array(
    z.object({
      frames: z.array(
        z.object({
          component: GrapesComponentSchema,
        })
      ),
    })
  ),
})

export type GrapesBlock = z.infer<typeof GrapesBlockSchema>
