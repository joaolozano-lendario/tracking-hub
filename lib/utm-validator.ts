import { getAllSources, sourceMediumMap } from '@/data/sources'
import { mediums } from '@/data/mediums'
import { getAllCampaigns } from '@/data/campaigns'

export interface UTMParams {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  parsed: UTMParams
  corrected: UTMParams | null
  correctedUrl: string | null
}

export interface ValidationError {
  field: string
  message: string
  value?: string
}

export interface ValidationWarning {
  field: string
  message: string
  suggestion?: string
}

/**
 * Parse URL and extract UTM parameters
 */
export function parseUTMFromUrl(url: string): { baseUrl: string; params: UTMParams } {
  try {
    const urlObj = new URL(url)
    const params: UTMParams = {}

    params.source = urlObj.searchParams.get('utm_source') || undefined
    params.medium = urlObj.searchParams.get('utm_medium') || undefined
    params.campaign = urlObj.searchParams.get('utm_campaign') || undefined
    params.content = urlObj.searchParams.get('utm_content') || undefined
    params.term = urlObj.searchParams.get('utm_term') || undefined

    // Get base URL without UTM params
    const baseUrl = `${urlObj.origin}${urlObj.pathname}`

    return { baseUrl, params }
  } catch {
    return { baseUrl: url, params: {} }
  }
}

/**
 * Normalize a UTM value (lowercase, replace spaces with hyphens)
 */
export function normalizeUTMValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
}

/**
 * Check if a source is valid
 */
export function isValidSource(source: string): boolean {
  const allSources = getAllSources()
  return allSources.some(s => s.value === source)
}

/**
 * Check if a medium is valid
 */
export function isValidMedium(medium: string): boolean {
  return mediums.some(m => m.value === medium)
}

/**
 * Check if a medium is valid for a given source
 */
export function isValidMediumForSource(source: string, medium: string): boolean {
  const validMediums = sourceMediumMap[source]
  if (!validMediums) return true // Unknown source, allow any medium
  return validMediums.includes(medium)
}

/**
 * Check if a campaign is valid
 */
export function isValidCampaign(campaign: string): boolean {
  const allCampaigns = getAllCampaigns()
  return allCampaigns.some(c => c.value === campaign)
}

/**
 * Find closest matching source
 */
export function findClosestSource(value: string): string | null {
  const normalized = normalizeUTMValue(value)
  const allSources = getAllSources()

  // Exact match
  const exact = allSources.find(s => s.value === normalized)
  if (exact) return exact.value

  // Partial match
  const partial = allSources.find(s =>
    s.value.includes(normalized) || normalized.includes(s.value)
  )
  if (partial) return partial.value

  // Common corrections
  const corrections: Record<string, string> = {
    'fb': 'facebook',
    'ig': 'instagram',
    'insta': 'instagram',
    'goog': 'google',
    'yt': 'youtube',
    'tw': 'twitter',
    'linkedin': 'linkedin',
    'wa': 'whatsapp',
    'wpp': 'whatsapp',
  }

  if (corrections[normalized]) {
    return corrections[normalized]
  }

  return null
}

/**
 * Find closest matching medium
 */
export function findClosestMedium(value: string, source?: string): string | null {
  const normalized = normalizeUTMValue(value)

  // Exact match
  const exact = mediums.find(m => m.value === normalized)
  if (exact) return exact.value

  // Common corrections
  const corrections: Record<string, string> = {
    'ppc': 'cpc',
    'paid': 'cpc',
    'organic': 'organic',
    'email': 'nurture',
    'social': 'organic',
    'referral': 'referral',
  }

  if (corrections[normalized]) {
    // Check if valid for source
    const corrected = corrections[normalized]
    if (!source || isValidMediumForSource(source, corrected)) {
      return corrected
    }
  }

  // If source known, return first valid medium
  if (source && sourceMediumMap[source]) {
    return sourceMediumMap[source][0]
  }

  return null
}

/**
 * Validate UTM parameters
 */
export function validateUTM(url: string): ValidationResult {
  const { baseUrl, params } = parseUTMFromUrl(url)
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []
  let corrected: UTMParams | null = null

  // Check required fields
  if (!params.source) {
    errors.push({ field: 'source', message: 'utm_source é obrigatório' })
  }
  if (!params.medium) {
    errors.push({ field: 'medium', message: 'utm_medium é obrigatório' })
  }
  if (!params.campaign) {
    errors.push({ field: 'campaign', message: 'utm_campaign é obrigatório' })
  }

  // Initialize corrected params
  corrected = { ...params }
  let needsCorrection = false

  // Validate and correct source
  if (params.source) {
    const normalized = normalizeUTMValue(params.source)
    if (normalized !== params.source) {
      corrected.source = normalized
      needsCorrection = true
      warnings.push({
        field: 'source',
        message: 'Source normalizado',
        suggestion: normalized
      })
    }

    if (!isValidSource(normalized)) {
      const closest = findClosestSource(params.source)
      if (closest) {
        corrected.source = closest
        needsCorrection = true
        warnings.push({
          field: 'source',
          message: `Source "${params.source}" não reconhecido`,
          suggestion: closest
        })
      } else {
        warnings.push({
          field: 'source',
          message: `Source "${params.source}" não está na lista padrão`
        })
      }
    }
  }

  // Validate and correct medium
  if (params.medium) {
    const normalized = normalizeUTMValue(params.medium)
    if (normalized !== params.medium) {
      corrected.medium = normalized
      needsCorrection = true
      warnings.push({
        field: 'medium',
        message: 'Medium normalizado',
        suggestion: normalized
      })
    }

    if (!isValidMedium(normalized)) {
      const closest = findClosestMedium(params.medium, corrected.source)
      if (closest) {
        corrected.medium = closest
        needsCorrection = true
        warnings.push({
          field: 'medium',
          message: `Medium "${params.medium}" não reconhecido`,
          suggestion: closest
        })
      } else {
        warnings.push({
          field: 'medium',
          message: `Medium "${params.medium}" não está na lista padrão`
        })
      }
    }

    // Check source-medium compatibility
    if (corrected.source && corrected.medium) {
      if (!isValidMediumForSource(corrected.source, corrected.medium)) {
        const validMediums = sourceMediumMap[corrected.source]
        if (validMediums && validMediums.length > 0) {
          warnings.push({
            field: 'medium',
            message: `Medium "${corrected.medium}" não é compatível com source "${corrected.source}"`,
            suggestion: validMediums[0]
          })
        }
      }
    }
  }

  // Validate and correct campaign
  if (params.campaign) {
    const normalized = normalizeUTMValue(params.campaign)
    if (normalized !== params.campaign) {
      corrected.campaign = normalized
      needsCorrection = true
      warnings.push({
        field: 'campaign',
        message: 'Campaign normalizado',
        suggestion: normalized
      })
    }

    if (!isValidCampaign(normalized)) {
      warnings.push({
        field: 'campaign',
        message: `Campaign "${params.campaign}" não está na lista padrão (pode ser customizado)`
      })
    }
  }

  // Normalize content and term
  if (params.content) {
    const normalized = normalizeUTMValue(params.content)
    if (normalized !== params.content) {
      corrected.content = normalized
      needsCorrection = true
      warnings.push({
        field: 'content',
        message: 'Content normalizado',
        suggestion: normalized
      })
    }
  }

  if (params.term) {
    const normalized = normalizeUTMValue(params.term)
    if (normalized !== params.term) {
      corrected.term = normalized
      needsCorrection = true
      warnings.push({
        field: 'term',
        message: 'Term normalizado',
        suggestion: normalized
      })
    }
  }

  // Build corrected URL if needed
  let correctedUrl: string | null = null
  if (needsCorrection || errors.length === 0) {
    const urlParams = new URLSearchParams()
    if (corrected.source) urlParams.set('utm_source', corrected.source)
    if (corrected.medium) urlParams.set('utm_medium', corrected.medium)
    if (corrected.campaign) urlParams.set('utm_campaign', corrected.campaign)
    if (corrected.content) urlParams.set('utm_content', corrected.content)
    if (corrected.term) urlParams.set('utm_term', corrected.term)

    correctedUrl = `${baseUrl}?${urlParams.toString()}`
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    parsed: params,
    corrected: needsCorrection ? corrected : null,
    correctedUrl
  }
}

/**
 * Quick validation - returns true/false only
 */
export function isValidUTMUrl(url: string): boolean {
  const result = validateUTM(url)
  return result.isValid
}
