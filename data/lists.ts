export interface List {
  id: number
  name: string
  tipo: 'compradores' | 'iscas' | 'forms'
  proposito: string
  significado: string
}

export const lists: List[] = [
  {
    id: 54,
    name: '04_MKT_Lista_ImersaoNegocios',
    tipo: 'compradores',
    proposito: 'COMPRADORES',
    significado: 'COMPROU a Imersão. Lista de clientes. Goal de todas automações.'
  },
  {
    id: 55,
    name: '02_MKT_Lista_ImersaoNegocios_Forms_TEMP_JAN26',
    tipo: 'forms',
    proposito: 'Forms avulsos',
    significado: 'Lead capturado por form genérico da Imersão (não veio por isca específica)'
  },
  {
    id: 56,
    name: '03_MKT_Lista_IscaCalculadoraTempo_TEMP_JAN26',
    tipo: 'iscas',
    proposito: 'Isca Calculadora',
    significado: 'Lead usou a calculadora de tempo perdido. Conhece seu custo em R$/hora.'
  },
  {
    id: 59,
    name: '03_MKT_Lista_IscaQuizDiagnosticoIA_TEMP_JAN26',
    tipo: 'iscas',
    proposito: 'Isca Quiz',
    significado: 'Lead fez diagnóstico de perfil. Sabe se é Sobrecarregado/Curioso/Frustrado/Isolado.'
  },
  {
    id: 60,
    name: '03_MKT_Lista_IscaParadoxoIA_TEMP_JAN26',
    tipo: 'iscas',
    proposito: 'Isca Paradoxo',
    significado: 'Lead recebeu o Framework P.I.V.O. Entende a metodologia.'
  },
  {
    id: 63,
    name: '03_MKT_Lista_IscaGuia5Automacoes_TEMP_JAN26',
    tipo: 'iscas',
    proposito: 'Isca Guia 5 Auto',
    significado: 'Lead baixou o guia de automações. Tem mentalidade de IMPLEMENTADOR.'
  },
]

export function getListsByTipo(tipo: List['tipo']): List[] {
  return lists.filter(l => l.tipo === tipo)
}

export function findList(id: number): List | undefined {
  return lists.find(l => l.id === id)
}
