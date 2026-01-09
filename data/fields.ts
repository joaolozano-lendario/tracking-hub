export interface Field {
  id: number
  perstag: string
  tipo: 'text' | 'number' | 'date' | 'dropdown'
  isca: 'calculadora' | 'quiz' | 'guia'
  descricao: string
  exemplo?: string
}

export const fields: Field[] = [
  // CALCULADORA (166-170)
  {
    id: 166,
    perstag: 'HORAS_PERDIDAS_SEMANA',
    tipo: 'number',
    isca: 'calculadora',
    descricao: 'Horas perdidas por semana',
    exemplo: '28'
  },
  {
    id: 167,
    perstag: 'CUSTO_ANUAL_ESTIMADO',
    tipo: 'number',
    isca: 'calculadora',
    descricao: 'Custo anual estimado em R$',
    exemplo: '201600'
  },
  {
    id: 168,
    perstag: 'PRINCIPAL_RALO_TEMPO',
    tipo: 'text',
    isca: 'calculadora',
    descricao: 'Principal ralo de tempo',
    exemplo: 'reunioes, duvidas, tarefas, incendios'
  },
  {
    id: 169,
    perstag: 'NIVEL_DOR_TEMPO',
    tipo: 'text',
    isca: 'calculadora',
    descricao: 'Nível de dor (baixa/media/alta)',
    exemplo: 'alto'
  },
  {
    id: 170,
    perstag: 'DATA_CALCULO_TEMPO',
    tipo: 'date',
    isca: 'calculadora',
    descricao: 'Data do cálculo',
    exemplo: '2026-01-09'
  },

  // QUIZ (171-176)
  {
    id: 171,
    perstag: 'QUIZ_PERFIL',
    tipo: 'text',
    isca: 'quiz',
    descricao: 'Perfil resultado do quiz',
    exemplo: 'sobrecarregado, curioso-travado, tecnico-frustrado, lider-isolado'
  },
  {
    id: 172,
    perstag: 'QUIZ_SCORE',
    tipo: 'number',
    isca: 'quiz',
    descricao: 'Score do quiz (0-9)',
    exemplo: '8'
  },
  {
    id: 173,
    perstag: 'QUIZ_TEMPERATURA',
    tipo: 'text',
    isca: 'quiz',
    descricao: 'Temperatura do lead',
    exemplo: 'hot, warm, cold'
  },
  {
    id: 174,
    perstag: 'QUIZ_SITUACAO',
    tipo: 'text',
    isca: 'quiz',
    descricao: 'Situação profissional',
    exemplo: 'empresario-qualificado, gestor, freelancer'
  },
  {
    id: 175,
    perstag: 'QUIZ_DISPONIBILIDADE_EVENTO',
    tipo: 'text',
    isca: 'quiz',
    descricao: 'Disponibilidade para o evento',
    exemplo: 'sim-24-25, talvez, nao'
  },
  {
    id: 176,
    perstag: 'QUIZ_DATA_CAPTURA',
    tipo: 'date',
    isca: 'quiz',
    descricao: 'Data da captura',
    exemplo: '2026-01-09'
  },

  // GUIA (177-178)
  {
    id: 177,
    perstag: 'GUIA_DATA_DOWNLOAD',
    tipo: 'date',
    isca: 'guia',
    descricao: 'Data do download do guia',
    exemplo: '2026-01-09'
  },
  {
    id: 178,
    perstag: 'GUIA_ORIGEM',
    tipo: 'dropdown',
    isca: 'guia',
    descricao: 'De onde veio (standalone, calculadora, quiz, paradoxo)',
    exemplo: 'standalone'
  },
]

export function getFieldsByIsca(isca: Field['isca']): Field[] {
  return fields.filter(f => f.isca === isca)
}

export function findField(id: number): Field | undefined {
  return fields.find(f => f.id === id)
}
