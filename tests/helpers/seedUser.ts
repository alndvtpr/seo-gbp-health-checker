import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

export const testUser = {
  email: 'dev@payloadcms.com',
  password: 'test',
}

function assertE2EDatabaseSafety(): void {
  const e2eDbUri = process.env.E2E_DATABASE_URI
  if (!e2eDbUri || !e2eDbUri.trim()) {
    throw new Error(
      '[E2E User Seeding Safety Gate] seedUser refused to execute: E2E_DATABASE_URI is not set. ' +
        'Admin user seeding is prohibited against an unverified or default production database.'
    )
  }
  process.env.DATABASE_URI = e2eDbUri
}

/**
 * Seeds a test user for e2e admin tests.
 */
export async function seedTestUser(): Promise<void> {
  assertE2EDatabaseSafety()
  const payload = await getPayload({ config })

  // Delete existing test user if any
  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })

  // Create fresh test user
  await payload.create({
    collection: 'users',
    data: testUser,
  })
}

/**
 * Cleans up test user after tests
 */
export async function cleanupTestUser(): Promise<void> {
  assertE2EDatabaseSafety()
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
