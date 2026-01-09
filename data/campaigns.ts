export interface CampaignOption {
  value: string
  label: string
  category: string
}

export interface CampaignCategory {
  id: string
  label: string
  campaigns: CampaignOption[]
}

export const campaignCategories: CampaignCategory[] = [
  {
    id: 'iscas',
    label: 'Iscas',
    campaigns: [
      { value: 'calculadora', label: 'Calculadora', category: 'iscas' },
      { value: 'quiz', label: 'Quiz', category: 'iscas' },
      { value: 'paradoxo', label: 'Paradoxo', category: 'iscas' },
      { value: 'guia', label: 'Guia 5 Auto', category: 'iscas' },
    ]
  },
  {
    id: 'perfil-quiz',
    label: 'Quiz por Perfil',
    campaigns: [
      { value: 'quiz-sobrecarregado', label: 'Quiz Sobrecarregado', category: 'perfil-quiz' },
      { value: 'quiz-curioso', label: 'Quiz Curioso-Travado', category: 'perfil-quiz' },
      { value: 'quiz-frustrado', label: 'Quiz Técnico-Frustrado', category: 'perfil-quiz' },
      { value: 'quiz-isolado', label: 'Quiz Líder-Isolado', category: 'perfil-quiz' },
    ]
  },
  {
    id: 'temperatura',
    label: 'Por Temperatura',
    campaigns: [
      { value: 'paradoxo-quente', label: 'Paradoxo Quente', category: 'temperatura' },
      { value: 'paradoxo-morno', label: 'Paradoxo Morno', category: 'temperatura' },
      { value: 'paradoxo-frio', label: 'Paradoxo Frio', category: 'temperatura' },
      { value: 'calculadora-alta', label: 'Calculadora Dor Alta', category: 'temperatura' },
      { value: 'calculadora-media', label: 'Calculadora Dor Média', category: 'temperatura' },
      { value: 'calculadora-baixa', label: 'Calculadora Dor Baixa', category: 'temperatura' },
    ]
  },
  {
    id: 'fases',
    label: 'Fases do Lançamento',
    campaigns: [
      { value: 'prelancamento-jan26', label: 'Pré-lançamento', category: 'fases' },
      { value: 'captacao-jan26', label: 'Captação', category: 'fases' },
      { value: 'aquecimento-jan26', label: 'Aquecimento', category: 'fases' },
      { value: 'abertura-jan26', label: 'Abertura Carrinho', category: 'fases' },
      { value: 'carrinho-jan26', label: 'Carrinho Aberto', category: 'fases' },
      { value: 'ultimodia-jan26', label: 'Último Dia', category: 'fases' },
      { value: 'encerramento-jan26', label: 'Encerramento', category: 'fases' },
    ]
  },
  {
    id: 'remarketing',
    label: 'Remarketing',
    campaigns: [
      { value: 'rmkt-visitou-lp', label: 'Visitou LP', category: 'remarketing' },
      { value: 'rmkt-iniciou-checkout', label: 'Iniciou Checkout', category: 'remarketing' },
      { value: 'rmkt-abandonou-carrinho', label: 'Abandonou Carrinho', category: 'remarketing' },
      { value: 'rmkt-assistiu-50', label: 'Assistiu 50%', category: 'remarketing' },
      { value: 'rmkt-clicou-preco', label: 'Clicou no Preço', category: 'remarketing' },
    ]
  },
  {
    id: 'crosssell',
    label: 'Cross-sell',
    campaigns: [
      { value: 'cross-calc-quiz', label: 'Calculadora → Quiz', category: 'crosssell' },
      { value: 'cross-quiz-paradoxo', label: 'Quiz → Paradoxo', category: 'crosssell' },
      { value: 'cross-paradoxo-guia', label: 'Paradoxo → Guia', category: 'crosssell' },
      { value: 'cross-guia-evento', label: 'Guia → Evento', category: 'crosssell' },
    ]
  },
  {
    id: 'urgencia',
    label: 'Urgência',
    campaigns: [
      { value: 'urgencia-24h', label: 'Urgência 24h', category: 'urgencia' },
      { value: 'urgencia-12h', label: 'Urgência 12h', category: 'urgencia' },
      { value: 'ultimas-vagas', label: 'Últimas Vagas', category: 'urgencia' },
      { value: 'bonus-expira', label: 'Bônus Expira', category: 'urgencia' },
    ]
  },
  {
    id: 'operador',
    label: 'Por Operador',
    campaigns: [
      { value: 'jose-bucket1', label: 'José - Bucket 1', category: 'operador' },
      { value: 'jose-bucket2', label: 'José - Bucket 2', category: 'operador' },
      { value: 'fran-bucket1', label: 'Fran - Bucket 1', category: 'operador' },
      { value: 'charao-remarketing', label: 'Charão - Remarketing', category: 'operador' },
    ]
  },
]

export function getAllCampaigns(): CampaignOption[] {
  return campaignCategories.flatMap(cat => cat.campaigns)
}

export function findCampaign(value: string): CampaignOption | undefined {
  return getAllCampaigns().find(c => c.value === value)
}
