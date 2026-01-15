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
  {
    id: 'lives',
    label: 'Lives/Eventos',
    campaigns: [
      { value: 'live-imersao-jan26', label: 'Imersão Jan/26', category: 'lives' },
      { value: 'live-hackathon-jan26', label: 'Hackathon Jan/26', category: 'lives' },
      { value: 'live-workshop-ia', label: 'Workshop IA', category: 'lives' },
      { value: 'live-qa-semanal', label: 'Q&A Semanal', category: 'lives' },
      { value: 'live-lancamento-imersao', label: 'Lançamento Imersão', category: 'lives' },
    ]
  },
  {
    id: 'lives-semanais',
    label: '📺 Lives Semanais',
    campaigns: [
      { value: 'livesemanal049', label: 'Live #049', category: 'lives-semanais' },
      { value: 'livesemanal050', label: 'Live #050', category: 'lives-semanais' },
      { value: 'livesemanal051', label: 'Live #051', category: 'lives-semanais' },
      { value: 'livesemanal052', label: 'Live #052', category: 'lives-semanais' },
      { value: 'livesemanal053', label: 'Live #053', category: 'lives-semanais' },
      { value: 'livesemanal054', label: 'Live #054', category: 'lives-semanais' },
      { value: 'livesemanal055', label: 'Live #055', category: 'lives-semanais' },
    ]
  },
  {
    id: 'manychat',
    label: 'Fluxos ManyChat',
    campaigns: [
      { value: 'mc-boas-vindas', label: 'Boas-vindas', category: 'manychat' },
      { value: 'mc-isca-calc', label: 'Isca Calculadora', category: 'manychat' },
      { value: 'mc-isca-quiz', label: 'Isca Quiz', category: 'manychat' },
      { value: 'mc-isca-paradoxo', label: 'Isca Paradoxo', category: 'manychat' },
      { value: 'mc-isca-guia', label: 'Isca Guia', category: 'manychat' },
      { value: 'mc-nurture', label: 'Nurture ManyChat', category: 'manychat' },
      { value: 'mc-venda', label: 'Sequência Venda', category: 'manychat' },
    ]
  },
  {
    id: 'organico',
    label: 'Conteúdo Orgânico',
    campaigns: [
      { value: 'org-educativo', label: 'Conteúdo Educativo', category: 'organico' },
      { value: 'org-case', label: 'Case/Depoimento', category: 'organico' },
      { value: 'org-behind-scenes', label: 'Behind the Scenes', category: 'organico' },
      { value: 'org-tips', label: 'Dicas Rápidas', category: 'organico' },
      { value: 'org-trend', label: 'Trend/Viral', category: 'organico' },
    ]
  },
]

export function getAllCampaigns(): CampaignOption[] {
  return campaignCategories.flatMap(cat => cat.campaigns)
}

export function findCampaign(value: string): CampaignOption | undefined {
  return getAllCampaigns().find(c => c.value === value)
}
