/**
 * Upsert a single article directly to MongoDB.
 * Usage: pnpm add-article <path-to-json>
 *
 * The JSON file must match the Article interface.
 * After running, the JSON file is deleted automatically.
 */
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI not set in .env.local')
  process.exit(1)
}

const jsonPath = process.argv[2]
if (!jsonPath) {
  console.error('❌  Usage: pnpm add-article <path-to-json>')
  process.exit(1)
}

const ArticleSchema = new mongoose.Schema({
  slug:          { type: String, required: true, unique: true },
  title:         String,
  description:   String,
  category:      String,
  readTime:      String,
  publishedDate: String,
  author:        String,
  keywords:      [String],
  content:       String,
  image:         String,
}, { timestamps: true })

async function run() {
  const article = JSON.parse(fs.readFileSync(path.resolve(jsonPath), 'utf-8'))

  await mongoose.connect(MONGODB_URI!)
  const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema)

  const result = await Article.updateOne({ slug: article.slug }, { $set: article }, { upsert: true })

  if (result.upsertedCount) {
    console.log(`✅  Inserted: ${article.slug}`)
  } else {
    console.log(`✅  Updated: ${article.slug}`)
  }

  await mongoose.disconnect()

  // Clean up temp file
  fs.unlinkSync(path.resolve(jsonPath))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
