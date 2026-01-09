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
    id: 'publicos',
    label: 'Públicos',
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
    id: 'keywords',
    label: 'Keywords',
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
