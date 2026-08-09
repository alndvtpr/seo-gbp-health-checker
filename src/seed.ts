import { getPayload } from 'payload'
import configPromise from './payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const runSeed = async () => {
  const payload = await getPayload({ config: configPromise })

  const websiteDir = path.resolve(dirname, '../../website')

  const pagesToSeed = [
    { slug: 'index', title: 'Home', file: 'index.html' },
    { slug: 'about', title: 'About', file: 'about.html' },
    { slug: 'services', title: 'Services', file: 'services.html' }
  ]

  for (const pageInfo of pagesToSeed) {
    const filePath = path.join(websiteDir, pageInfo.file)
    if (fs.existsSync(filePath)) {
      const htmlContent = fs.readFileSync(filePath, 'utf-8')
      
      try {
        // Try to find if it exists first
        const existing = await payload.find({
          collection: 'pages',
          where: {
            slug: { equals: pageInfo.slug }
          }
        })

        if (existing.totalDocs > 0) {
           console.log(`Page ${pageInfo.slug} already exists. Skipping.`)
           continue
        }

        await payload.create({
          collection: 'pages',
          data: {
            title: pageInfo.title,
            slug: pageInfo.slug,
            layout: [
              {
                blockType: 'codeInjection',
                language: 'html',
                code: htmlContent,
              }
            ]
          }
        })
        console.log(`Seeded ${pageInfo.slug} successfully.`)
      } catch (err) {
        console.error(`Error seeding ${pageInfo.slug}:`, err)
      }
    } else {
      console.warn(`File not found: ${filePath}`)
    }
  }

  console.log('Seeding completed.')
  process.exit(0)
}

runSeed()
