export interface TermOption {
  value: string
  label: string
  category: string
}

export interface TermCategory {
  id: string
  label: string
  terms: TermOption[]
}

export const termCategories: TermCategory[] = [
  {
    id: 'grupos-wa',
    label: '💬 Grupos WhatsApp',
    terms: [
      { value: 'chatgeral01', label: 'Chat Geral #01', category: 'grupos-wa' },
      { value: 'chatgeral02', label: 'Chat Geral #02', category: 'grupos-wa' },
      { value: 'chatgeral03', label: 'Chat Geral #03', category: 'grupos-wa' },
      { value: 'clubelivro', label: 'Clube do Livro', category: 'grupos-wa' },
      { value: 'vipformacao', label: 'VIP Formação', category: 'grupos-wa' },
      { value: 'vipcomunidade', label: 'VIP Comunidade', category: 'grupos-wa' },
      { value: 'grupoalunos', label: 'Grupo Alunos', category: 'grupos-wa' },
    ]
  },
  {
    id: 'momentos-live',
    label: '⏱️ Momentos de Live',
    terms: [
      { value: 'min15', label: 'Minuto 15', category: 'momentos-live' },
      { value: 'min30', label: 'Minuto 30', category: 'momentos-live' },
      { value: 'min45', label: 'Minuto 45', category: 'momentos-live' },
      { value: 'min60', label: 'Minuto 60', category: 'momentos-live' },
      { value: 'min90', label: 'Minuto 90', category: 'momentos-live' },
      { value: 'qa', label: 'Durante Q&A', category: 'momentos-live' },
      { value: 'oferta', label: 'Durante Oferta', category: 'momentos-live' },
    ]
  },
  {
    id: 'dias-evento',
    label: '📅 Dias de Evento',
    terms: [
      { value: 'dia1', label: 'Dia 1', category: 'dias-evento' },
      { value: 'dia2', label: 'Dia 2', category: 'dias-evento' },
      { value: 'dia3', label: 'Dia 3', category: 'dias-evento' },
      { value: 'dia4', label: 'Dia 4', category: 'dias-evento' },
    ]
  },
  {
    id: 'podcast-eps',
    label: '🎙️ Episódios Podcast',
    terms: [
      { value: 'ep040', label: 'Episódio 40', category: 'podcast-eps' },
      { value: 'ep041', label: 'Episódio 41', category: 'podcast-eps' },
      { value: 'ep042', label: 'Episódio 42', category: 'podcast-eps' },
      { value: 'ep043', label: 'Episódio 43', category: 'podcast-eps' },
      { value: 'ep044', label: 'Episódio 44', category: 'podcast-eps' },
      { value: 'ep045', label: 'Episódio 45', category: 'podcast-eps' },
    ]
  },
  {
    id: 'email-timing',
    label: '📧 Horário/Segmento',
    terms: [
      { value: 'am-todos', label: 'Manhã - Todos', category: 'email-timing' },
      { value: 'am-engajados', label: 'Manhã - Engajados', category: 'email-timing' },
      { value: 'am-quentes', label: 'Manhã - Quentes', category: 'email-timing' },
      { value: 'pm-todos', label: 'Tarde - Todos', category: 'email-timing' },
      { value: 'pm-engajados', label: 'Tarde - Engajados', category: 'email-timing' },
      { value: 'pm-quentes', label: 'Tarde - Quentes', category: 'email-timing' },
    ]
  },
  {
    id: 'publicos',
    label: '🎯 Públicos (Ads)',
    terms: [
      { value: 'pub-lookalike-1', label: 'Lookalike 1%', category: 'publicos' },
      { value: 'pub-lookalike-3', label: 'Lookalike 3%', category: 'publicos' },
      { value: 'pub-lookalike-5', label: 'Lookalike 5%', category: 'publicos' },
      { value: 'pub-remarketing-7d', label: 'Remarketing 7 dias', category: 'publicos' },
      { value: 'pub-remarketing-30d', label: 'Remarketing 30 dias', category: 'publicos' },
      { value: 'pub-remarketing-90d', label: 'Remarketing 90 dias', category: 'publicos' },
      { value: 'pub-engajados-ig', label: 'Engajados IG', category: 'publicos' },
      { value: 'pub-engajados-fb', label: 'Engajados FB', category: 'publicos' },
      { value: 'pub-video-viewers', label: 'Video Viewers', category: 'publicos' },
      { value: 'pub-compradores', label: 'Compradores', category: 'publicos' },
      { value: 'pub-lista-fria', label: 'Lista Fria', category: 'publicos' },
    ]
  },
  {
    id: 'interesses',
    label: 'Interesses',
    terms: [
      { value: 'int-empreendedorismo', label: 'Empreendedorismo', category: 'interesses' },
      { value: 'int-automacao', label: 'Automação', category: 'interesses' },
      { value: 'int-ia', label: 'Inteligência Artificial', category: 'interesses' },
      { value: 'int-gestao', label: 'Gestão de Negócios', category: 'interesses' },
      { value: 'int-produtividade', label: 'Produtividade', category: 'interesses' },
      { value: 'int-marketing', label: 'Marketing Digital', category: 'interesses' },
      { value: 'int-tecnologia', label: 'Tecnologia', category: 'interesses' },
      { value: 'int-startups', label: 'Startups', category: 'interesses' },
    ]
  },
  {
    id: 'demografia',
    label: 'Demografia',
    terms: [
      { value: 'demo-1824', label: '18-24 anos', category: 'demografia' },
      { value: 'demo-2534', label: '25-34 anos', category: 'demografia' },
      { value: 'demo-3544', label: '35-44 anos', category: 'demografia' },
      { value: 'demo-4554', label: '45-54 anos', category: 'demografia' },
      { value: 'demo-55plus', label: '55+ anos', category: 'demografia' },
      { value: 'demo-homens', label: 'Homens', category: 'demografia' },
      { value: 'demo-mulheres', label: 'Mulheres', category: 'demografia' },
    ]
  },
  {
    id: 'geo',
    label: 'Geografia',
    terms: [
      { value: 'geo-sp', label: 'São Paulo', category: 'geo' },
      { value: 'geo-rj', label: 'Rio de Janeiro', category: 'geo' },
      { value: 'geo-mg', label: 'Minas Gerais', category: 'geo' },
      { value: 'geo-sul', label: 'Sul', category: 'geo' },
      { value: 'geo-nordeste', label: 'Nordeste', category: 'geo' },
      { value: 'geo-centro', label: 'Centro-Oeste', category: 'geo' },
      { value: 'geo-norte', label: 'Norte', category: 'geo' },
      { value: 'geo-capitais', label: 'Capitais', category: 'geo' },
    ]
  },
  {
    id: 'mc-keywords',
    label: '🤖 Keywords ManyChat',
    terms: [
      { value: 'IA', label: 'IA', category: 'mc-keywords' },
      { value: 'QUIZ', label: 'QUIZ', category: 'mc-keywords' },
      { value: 'QUERO', label: 'QUERO', category: 'mc-keywords' },
      { value: 'LINK', label: 'LINK', category: 'mc-keywords' },
      { value: 'BAIXAR', label: 'BAIXAR', category: 'mc-keywords' },
      { value: 'CALCULADORA', label: 'CALCULADORA', category: 'mc-keywords' },
      { value: 'GUIA', label: 'GUIA', category: 'mc-keywords' },
    ]
  },
  {
    id: 'keywords',
    label: '🔍 Keywords (Google Ads)',
    terms: [
      { value: 'automacao-negocios', label: 'automação negócios', category: 'keywords' },
      { value: 'chatgpt-empresa', label: 'chatgpt empresa', category: 'keywords' },
      { value: 'produtividade-ia', label: 'produtividade ia', category: 'keywords' },
      { value: 'como-usar-ia', label: 'como usar ia', category: 'keywords' },
      { value: 'ia-para-empresarios', label: 'ia para empresários', category: 'keywords' },
    ]
  },
]

export function getAllTerms(): TermOption[] {
  return termCategories.flatMap(cat => cat.terms)
}

export function findTerm(value: string): TermOption | undefined {
  return getAllTerms().find(t => t.value === value)
}
