export interface MediumOption {
  value: string
  label: string
  description: string
  category: string
}

export const mediums: MediumOption[] = [
  // Modelos de cobrança (Pago)
  { value: 'cpc', label: 'CPC', description: 'Custo por Clique', category: 'pago' },
  { value: 'cpm', label: 'CPM', description: 'Custo por Mil Impressões', category: 'pago' },
  { value: 'cpa', label: 'CPA', description: 'Custo por Aquisição', category: 'pago' },
  { value: 'cpv', label: 'CPV', description: 'Custo por Visualização', category: 'pago' },

  // Formatos social
  { value: 'feed', label: 'Feed', description: 'Post no feed', category: 'formato' },
  { value: 'stories', label: 'Stories', description: 'Stories/Status', category: 'formato' },
  { value: 'reels', label: 'Reels', description: 'Reels/Shorts', category: 'formato' },
  { value: 'video', label: 'Video', description: 'Video longo', category: 'formato' },
  { value: 'carousel', label: 'Carrossel', description: 'Post carrossel', category: 'formato' },
  { value: 'live', label: 'Live', description: 'Transmissão ao vivo', category: 'formato' },

  // Display/Search
  { value: 'display', label: 'Display', description: 'Banner/Display', category: 'pago' },
  { value: 'search', label: 'Search', description: 'Busca paga', category: 'pago' },
  { value: 'discovery', label: 'Discovery', description: 'YouTube Discovery', category: 'pago' },
  { value: 'instream', label: 'In-stream', description: 'Video In-stream', category: 'pago' },
  { value: 'native', label: 'Native', description: 'Native Ads', category: 'pago' },
  { value: 'sponsored', label: 'Sponsored', description: 'Post patrocinado', category: 'pago' },

  // Email
  { value: 'nurture', label: 'Nurture', description: 'Sequência de nutrição', category: 'email' },
  { value: 'broadcast', label: 'Broadcast', description: 'Email pontual', category: 'email' },
  { value: 'transacional', label: 'Transacional', description: 'Email transacional', category: 'email' },
  { value: 'abandoned', label: 'Abandoned', description: 'Carrinho abandonado', category: 'email' },
  { value: 'reengagement', label: 'Reengagement', description: 'Reengajamento', category: 'email' },
  { value: 'welcome', label: 'Welcome', description: 'Boas-vindas', category: 'email' },

  // Mensageria
  { value: 'dm', label: 'DM', description: 'Mensagem direta', category: 'mensagem' },
  { value: 'grupo', label: 'Grupo', description: 'Mensagem em grupo', category: 'mensagem' },
  { value: 'broadcast-wa', label: 'Broadcast WA', description: 'Lista de transmissão', category: 'mensagem' },
  { value: 'fluxo', label: 'Fluxo', description: 'Fluxo automatizado', category: 'mensagem' },

  // Links/Bio
  { value: 'bio', label: 'Bio', description: 'Link na bio', category: 'link' },
  { value: 'linktree', label: 'Linktree', description: 'Via Linktree', category: 'link' },
  { value: 'qrcode', label: 'QR Code', description: 'Via QR Code', category: 'link' },
  { value: 'referral', label: 'Referral', description: 'Indicação', category: 'link' },
  { value: 'affiliate', label: 'Affiliate', description: 'Link de afiliado', category: 'link' },

  // Orgânico
  { value: 'organic', label: 'Orgânico', description: 'Tráfego orgânico', category: 'organico' },
  { value: 'social', label: 'Social', description: 'Social orgânico', category: 'organico' },
  { value: 'seo', label: 'SEO', description: 'Busca orgânica', category: 'organico' },

  // Outros
  { value: 'remarketing', label: 'Remarketing', description: 'Retargeting', category: 'pago' },
  { value: 'crosssell', label: 'Cross-sell', description: 'Cross-sell entre iscas', category: 'outro' },
  { value: 'internal', label: 'Internal', description: 'Link interno', category: 'outro' },
  { value: 'offline', label: 'Offline', description: 'Evento offline', category: 'outro' },
  { value: 'presencial', label: 'Presencial', description: 'Evento presencial', category: 'outro' },
]

export function getMedium(value: string): MediumOption | undefined {
  return mediums.find(m => m.value === value)
}

export function getMediumsByCategory(category: string): MediumOption[] {
  return mediums.filter(m => m.category === category)
}
