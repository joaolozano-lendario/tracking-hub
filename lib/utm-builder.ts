export interface UTMParams {
  baseUrl: string
  source: string
  medium: string
  campaign: string
  content?: string
  term?: string
}

export function buildUTMUrl(params: UTMParams): string {
  const { baseUrl, source, medium, campaign, content, term } = params

  // Ensure base URL doesn't have trailing slash
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')

  // Build query params
  const queryParams = new URLSearchParams()

  if (source) queryParams.set('utm_source', source)
  if (medium) queryParams.set('utm_medium', medium)
  if (campaign) queryParams.set('utm_campaign', campaign)
  if (content) queryParams.set('utm_content', content)
  if (term) queryParams.set('utm_term', term)

  const queryString = queryParams.toString()

  if (!queryString) return cleanBaseUrl

  // Check if base URL already has query params
  const separator = cleanBaseUrl.includes('?') ? '&' : '?'

  return `${cleanBaseUrl}${separator}${queryString}`
}

export function parseUTMUrl(url: string): Partial<UTMParams> {
  try {
    const urlObj = new URL(url)
    return {
      baseUrl: `${urlObj.origin}${urlObj.pathname}`,
      source: urlObj.searchParams.get('utm_source') || undefined,
      medium: urlObj.searchParams.get('utm_medium') || undefined,
      campaign: urlObj.searchParams.get('utm_campaign') || undefined,
      content: urlObj.searchParams.get('utm_content') || undefined,
      term: urlObj.searchParams.get('utm_term') || undefined,
    }
  } catch {
    return {}
  }
}

export function validateUTMParams(params: UTMParams): string[] {
  const errors: string[] = []

  if (!params.baseUrl) {
    errors.push('URL de destino é obrigatória')
  } else {
    try {
      new URL(params.baseUrl)
    } catch {
      errors.push('URL de destino inválida')
    }
  }

  if (!params.source) {
    errors.push('Source é obrigatório')
  }

  if (!params.medium) {
    errors.push('Medium é obrigatório')
  }

  if (!params.campaign) {
    errors.push('Campaign é obrigatória')
  }

  return errors
}

export function formatUTMForDisplay(url: string, maxLength: number = 60): string {
  if (url.length <= maxLength) return url

  const start = url.substring(0, maxLength / 2)
  const end = url.substring(url.length - maxLength / 2)

  return `${start}...${end}`
}
