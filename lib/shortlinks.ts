import { kv } from '@vercel/kv'

export interface ShortLink {
  slug: string
  url: string
  destination: string // Nome amigável (Imersão, Quiz, etc)
  source: string
  medium: string
  campaign: string
  content?: string
  term?: string
  clicks: number
  createdAt: string
  createdBy?: string
}

const LINKS_PREFIX = 'link:'
const LINKS_INDEX = 'links:all'

// Verificar se KV está disponível
function isKVAvailable(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

// Criar link curto
export async function createShortLink(data: Omit<ShortLink, 'clicks' | 'createdAt'>): Promise<{ success: boolean; error?: string }> {
  if (!isKVAvailable()) {
    return { success: false, error: 'KV não configurado' }
  }

  try {
    // Verificar se slug já existe
    const existing = await kv.get(`${LINKS_PREFIX}${data.slug}`)
    if (existing) {
      return { success: false, error: 'Slug já existe' }
    }

    const link: ShortLink = {
      ...data,
      clicks: 0,
      createdAt: new Date().toISOString(),
    }

    // Salvar link
    await kv.set(`${LINKS_PREFIX}${data.slug}`, link)

    // Adicionar ao índice
    await kv.sadd(LINKS_INDEX, data.slug)

    return { success: true }
  } catch (error) {
    console.error('Erro ao criar link:', error)
    return { success: false, error: 'Erro ao salvar' }
  }
}

// Buscar link por slug
export async function getShortLink(slug: string): Promise<ShortLink | null> {
  if (!isKVAvailable()) return null

  try {
    const link = await kv.get<ShortLink>(`${LINKS_PREFIX}${slug}`)
    return link
  } catch (error) {
    console.error('Erro ao buscar link:', error)
    return null
  }
}

// Incrementar clicks
export async function incrementClicks(slug: string): Promise<void> {
  if (!isKVAvailable()) return

  try {
    const link = await getShortLink(slug)
    if (link) {
      link.clicks += 1
      await kv.set(`${LINKS_PREFIX}${slug}`, link)
    }
  } catch (error) {
    console.error('Erro ao incrementar clicks:', error)
  }
}

// Listar todos os links
export async function listShortLinks(): Promise<ShortLink[]> {
  if (!isKVAvailable()) return []

  try {
    const slugs = await kv.smembers(LINKS_INDEX)
    if (!slugs || slugs.length === 0) return []

    const links: ShortLink[] = []
    for (const slug of slugs) {
      const link = await kv.get<ShortLink>(`${LINKS_PREFIX}${slug}`)
      if (link) links.push(link)
    }

    // Ordenar por data de criação (mais recente primeiro)
    return links.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Erro ao listar links:', error)
    return []
  }
}

// Deletar link
export async function deleteShortLink(slug: string): Promise<boolean> {
  if (!isKVAvailable()) return false

  try {
    await kv.del(`${LINKS_PREFIX}${slug}`)
    await kv.srem(LINKS_INDEX, slug)
    return true
  } catch (error) {
    console.error('Erro ao deletar link:', error)
    return false
  }
}

// Gerar sugestão de slug
export function generateSlugSuggestion(destination: string, source: string, campaign: string): string {
  const destMap: Record<string, string> = {
    'imersao': 'im',
    'calculadora': 'calc',
    'quiz': 'quiz',
    'paradoxo': 'par',
    'guia': 'guia',
  }

  const destKey = Object.keys(destMap).find(k => destination.toLowerCase().includes(k)) || ''
  const destShort = destMap[destKey] || 'link'

  const sourceShort = source.replace('ig-', '').replace('-organic', '').substring(0, 4)
  const campaignShort = campaign.replace(/-/g, '').substring(0, 6)

  return `${destShort}-${sourceShort}-${campaignShort}`.toLowerCase()
}
