/**
 * WebSub / PubSubHubbub Protocol Client & Hub Ping Utility
 * 
 * Spec: https://www.w3.org/TR/websub/
 * Standard Google / Superfeedr PubSubHubbub Hub URL: https://pubsubhubbub.appspot.com/
 */

export const WEBSUB_HUB_URL = process.env.WEBSUB_HUB_URL || 'https://pubsubhubbub.appspot.com/'
export const DEFAULT_RSS_URL = 'https://www.alaintapiru.com/rss.xml'

export interface WebSubResponse {
  success: boolean
  status: number
  message: string
  hubUrl: string
  topicUrl: string
}

/**
 * Pings the WebSub / PubSubHubbub hub to notify subscribers of new content published to the RSS / Atom feed.
 * 
 * @param topicUrl The URL of the feed that was updated (defaults to canonical /rss.xml)
 * @param hubUrl The WebSub hub endpoint (defaults to pubsubhubbub.appspot.com)
 */
export async function pingWebSub(
  topicUrl: string = DEFAULT_RSS_URL,
  hubUrl: string = WEBSUB_HUB_URL
): Promise<WebSubResponse> {
  const formData = new URLSearchParams()
  formData.append('hub.mode', 'publish')
  formData.append('hub.url', topicUrl)

  try {
    const response = await fetch(hubUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'AlainTapiru-WebSub-Publisher/1.0',
      },
      body: formData.toString(),
    })

    const status = response.status
    const success = status === 200 || status === 204

    const message = success
      ? `Successfully notified WebSub hub (${hubUrl}) of update to ${topicUrl} (HTTP ${status}).`
      : `WebSub hub responded with HTTP ${status}: ${response.statusText}`

    if (success) {
      console.log(`[WebSub] ${message}`)
    } else {
      console.warn(`[WebSub Warning] ${message}`)
    }

    return {
      success,
      status,
      message,
      hubUrl,
      topicUrl,
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Network error occurred while notifying WebSub hub.'
    console.error('[WebSub Error]', error)

    return {
      success: false,
      status: 500,
      message: errorMessage,
      hubUrl,
      topicUrl,
    }
  }
}
