export interface SourceOption {
  value: string
  label: string
  icon?: string
}

export interface SourceCategory {
  id: string
  label: string
  icon: string
  sources: SourceOption[]
}

export const sourceCategories: SourceCategory[] = [
  {
    id: 'paid',
    label: 'Pago',
    icon: '💰',
    sources: [
      { value: 'facebook', label: 'Facebook Ads' },
      { value: 'instagram', label: 'Instagram Ads' },
      { value: 'google', label: 'Google Ads' },
      { value: 'youtube', label: 'YouTube Ads' },
      { value: 'tiktok', label: 'TikTok Ads' },
      { value: 'linkedin', label: 'LinkedIn Ads' },
      { value: 'twitter', label: 'Twitter/X Ads' },
      { value: 'taboola', label: 'Taboola' },
      { value: 'outbrain', label: 'Outbrain' },
    ]
  },
  {
    id: 'organic',
    label: 'Orgânico',
    icon: '🌱',
    sources: [
      { value: 'ig-organic', label: 'Instagram Orgânico' },
      { value: 'ig-stories', label: 'IG Stories' },
      { value: 'ig-reels', label: 'IG Reels' },
      { value: 'ig-bio', label: 'Link na Bio' },
      { value: 'ig-dm', label: 'DM Instagram' },
      { value: 'linkedin-organic', label: 'LinkedIn Orgânico' },
      { value: 'youtube-organic', label: 'YouTube Orgânico' },
      { value: 'youtube-desc', label: 'Descrição YouTube' },
      { value: 'tiktok-organic', label: 'TikTok Orgânico' },
      { value: 'twitter-organic', label: 'Twitter/X Orgânico' },
    ]
  },
  {
    id: 'email',
    label: 'Email',
    icon: '📧',
    sources: [
      { value: 'email', label: 'Email Marketing' },
    ]
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: '📱',
    sources: [
      { value: 'whatsapp', label: 'WhatsApp' },
      { value: 'wa-grupo', label: 'Grupo WhatsApp' },
      { value: 'wa-broadcast', label: 'Lista Transmissão' },
      { value: 'manychat', label: 'ManyChat' },
      { value: 'telegram', label: 'Telegram' },
    ]
  },
  {
    id: 'parceiros',
    label: 'Parcerias',
    icon: '🤝',
    sources: [
      { value: 'afiliado', label: 'Afiliado' },
      { value: 'influencer', label: 'Influencer' },
      { value: 'parceiro', label: 'Parceiro' },
    ]
  },
  {
    id: 'seo',
    label: 'SEO/Conteúdo',
    icon: '🔍',
    sources: [
      { value: 'seo', label: 'Busca Orgânica' },
      { value: 'blog', label: 'Blog' },
      { value: 'podcast', label: 'Podcast' },
      { value: 'guest-post', label: 'Guest Post' },
    ]
  },
  {
    id: 'offline',
    label: 'Offline',
    icon: '📍',
    sources: [
      { value: 'qrcode', label: 'QR Code' },
      { value: 'evento', label: 'Evento Presencial' },
      { value: 'live', label: 'Live/Webinar' },
      { value: 'palestra', label: 'Palestra' },
      { value: 'material-impresso', label: 'Material Impresso' },
    ]
  },
  {
    id: 'remarketing',
    label: 'Remarketing',
    icon: '🔄',
    sources: [
      { value: 'rmkt-fb', label: 'Remarketing FB' },
      { value: 'rmkt-google', label: 'Remarketing Google' },
      { value: 'rmkt-yt', label: 'Remarketing YouTube' },
      { value: 'rmkt-email', label: 'Reengajamento Email' },
    ]
  },
  {
    id: 'crosssell',
    label: 'Cross-sell',
    icon: '↔️',
    sources: [
      { value: 'crosssell', label: 'Cross-sell Entre Iscas' },
      { value: 'internal', label: 'Link Interno' },
    ]
  },
  {
    id: 'time',
    label: 'Time Ads',
    icon: '👤',
    sources: [
      { value: 'jose', label: 'José' },
      { value: 'fran', label: 'Fran' },
      { value: 'charao', label: 'Charão' },
      { value: 'marcondes', label: 'Marcondes' },
      { value: 'alan', label: 'Alan' },
    ]
  },
]

// Map source -> valid mediums
export const sourceMediumMap: Record<string, string[]> = {
  // Paid
  facebook: ['cpc', 'cpm', 'cpa', 'feed', 'stories', 'reels', 'video', 'carousel'],
  instagram: ['cpc', 'cpm', 'feed', 'stories', 'reels', 'carousel'],
  google: ['cpc', 'cpm', 'display', 'video', 'search'],
  youtube: ['cpv', 'cpm', 'video', 'discovery', 'instream'],
  tiktok: ['cpc', 'cpm', 'video', 'feed'],
  linkedin: ['cpc', 'cpm', 'feed', 'sponsored'],
  twitter: ['cpc', 'cpm', 'feed'],
  taboola: ['cpc', 'native'],
  outbrain: ['cpc', 'native'],

  // Organic social
  'ig-organic': ['organic', 'feed', 'stories', 'reels'],
  'ig-stories': ['stories'],
  'ig-reels': ['reels'],
  'ig-bio': ['bio'],
  'ig-dm': ['dm'],
  'linkedin-organic': ['organic', 'feed'],
  'youtube-organic': ['organic', 'video'],
  'youtube-desc': ['organic', 'video'],
  'tiktok-organic': ['organic', 'video'],
  'twitter-organic': ['organic', 'feed'],

  // Email
  email: ['nurture', 'broadcast', 'transacional', 'abandoned', 'reengagement', 'welcome'],

  // WhatsApp
  whatsapp: ['dm', 'grupo', 'broadcast-wa'],
  'wa-grupo': ['grupo'],
  'wa-broadcast': ['broadcast-wa'],
  manychat: ['fluxo', 'dm'],
  telegram: ['dm', 'grupo'],

  // Parceiros
  afiliado: ['affiliate', 'referral'],
  influencer: ['social', 'video', 'stories'],
  parceiro: ['referral'],

  // SEO
  seo: ['seo', 'organic'],
  blog: ['organic', 'seo'],
  podcast: ['organic'],
  'guest-post': ['organic', 'referral'],

  // Offline
  qrcode: ['qrcode'],
  evento: ['offline', 'presencial'],
  live: ['live', 'video'],
  palestra: ['offline', 'presencial'],
  'material-impresso': ['qrcode', 'offline'],

  // Remarketing
  'rmkt-fb': ['cpc', 'cpm', 'remarketing'],
  'rmkt-google': ['cpc', 'cpm', 'remarketing'],
  'rmkt-yt': ['cpv', 'remarketing'],
  'rmkt-email': ['reengagement'],

  // Cross-sell
  crosssell: ['crosssell', 'email', 'nurture'],
  internal: ['internal'],

  // Time
  jose: ['cpc', 'cpm', 'feed', 'stories', 'video'],
  fran: ['cpc', 'cpm', 'feed', 'stories', 'video'],
  charao: ['cpc', 'cpm', 'feed', 'stories', 'video'],
  marcondes: ['cpc', 'cpm', 'feed', 'stories', 'video'],
  alan: ['organic', 'video', 'live'],
}

// Helper to get all sources flat
export function getAllSources(): SourceOption[] {
  return sourceCategories.flatMap(cat => cat.sources)
}

// Helper to find source by value
export function findSource(value: string): SourceOption | undefined {
  return getAllSources().find(s => s.value === value)
}
