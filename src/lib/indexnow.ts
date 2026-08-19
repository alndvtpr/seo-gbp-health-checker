/**
 * IndexNow Protocol Client & URL Dispatch Utility
 * 
 * Implements the open standard IndexNow protocol to instantly notify participating
 * search engines (Bing, Yandex, Naver, Seznam) of newly published or updated content.
 * 
 * Spec: https://www.indexnow.org/documentation
 */

export const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'a8f9c1b2d3e4f5061728394a5b6c7d8e'
export const DEFAULT_HOST = 'www.alaintapiru.com'
export const DEFAULT_BASE_URL = `https://${DEFAULT_HOST}`

export interface IndexNowPayload {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

export interface IndexNowResponse {
  success: boolean
  status: number
  message: string
  submittedUrls: string[]
  endpoint: string
}

export function getCanonicalHost(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl && !siteUrl.includes('localhost') && !siteUrl.includes('127.0.0.1')) {
    try {
      return new URL(siteUrl).host
    } catch {}
  }
  return DEFAULT_HOST
}

/**
 * Normalizes a URL to a clean canonical string matching domain standards
 */
export function normalizeUrlForIndexNow(rawUrl: string, host: string = getCanonicalHost()): string {
  if (!rawUrl) return `https://${host}/`
  try {
    const parsed = new URL(rawUrl, `https://${host}`)
    // Retain clean pathname with trailing slash
    let pathname = parsed.pathname
    if (!pathname.endsWith('/')) {
      pathname += '/'
    }
    return `https://${host}${pathname}`
  } catch {
    return rawUrl.startsWith('http') ? rawUrl : `https://${host}/${rawUrl.replace(/^\//, '')}`
  }
}

/**
 * Submits an array of URLs to the IndexNow protocol endpoint.
 * 
 * @param urls Array of relative or absolute URLs to submit
 * @param options Optional overrides for key, host, or endpoint
 */
export async function pingIndexNow(
  urls: string | string[],
  options?: {
    key?: string
    host?: string
    endpoint?: string
  }
): Promise<IndexNowResponse> {
  const host = options?.host || getCanonicalHost()
  const key = options?.key || INDEXNOW_KEY
  const endpoint = options?.endpoint || 'https://api.indexnow.org/indexnow'
  const keyLocation = `https://${host}/${key}.txt`

  const rawUrlList = Array.isArray(urls) ? urls : [urls]
  const cleanedUrls = Array.from(
    new Set(
      rawUrlList
        .filter(Boolean)
        .map((url) => normalizeUrlForIndexNow(url, host))
    )
  )

  if (cleanedUrls.length === 0) {
    return {
      success: false,
      status: 400,
      message: 'No valid URLs provided to submit.',
      submittedUrls: [],
      endpoint,
    }
  }

  const payload: IndexNowPayload = {
    host,
    key,
    keyLocation,
    urlList: cleanedUrls,
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'AlainTapiru-IndexNow-Agent/1.0',
      },
      body: JSON.stringify(payload),
    })

    const status = response.status
    let message = ''

    switch (status) {
      case 200:
        message = `Successfully submitted ${cleanedUrls.length} URL(s) to IndexNow (200 OK).`
        break
      case 202:
        message = `Accepted ${cleanedUrls.length} URL(s). Key verification is in progress (202 Accepted).`
        break
      case 400:
        message = 'Invalid format or parameters in IndexNow payload (400 Bad Request).'
        break
      case 403:
        message = 'Key is invalid or verification file could not be verified at keyLocation (403 Forbidden).'
        break
      case 422:
        message = 'Unprocessable Entity: URLs do not belong to the verified host (422).'
        break
      case 429:
        message = 'Rate limit exceeded: Too many IndexNow submissions (429).'
        break
      default:
        message = `IndexNow endpoint responded with HTTP ${status}: ${response.statusText}`
    }

    const success = status === 200 || status === 202

    if (success) {
      console.log(`[IndexNow] ${message}`, cleanedUrls)
    } else {
      console.warn(`[IndexNow Warning] ${message}`, { status, endpoint, payload })
    }

    return {
      success,
      status,
      message,
      submittedUrls: cleanedUrls,
      endpoint,
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Network error occurred while calling IndexNow API.'
    console.error('[IndexNow Error]', error)

    return {
      success: false,
      status: 500,
      message: errorMessage,
      submittedUrls: cleanedUrls,
      endpoint,
    }
  }
}
