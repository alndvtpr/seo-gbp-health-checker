import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(
  req: Request,
) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const url = searchParams.get('url')

  if (!url) {
    return new Response('No URL provided', { status: 404 })
  }

  if (!secret) {
    return new Response('No secret provided', { status: 401 })
  }

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(url)
}
