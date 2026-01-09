export interface Tag {
  id: number
  name: string
  type: 'goal' | 'origem' | 'trigger' | 'temperatura' | 'perfil' | 'evento' | 'fase'
  isca: 'todas' | 'calculadora' | 'quiz' | 'paradoxo' | 'guia' | 'evento'
  rastreia: string
  destaque?: boolean
}

export const tags: Tag[] = [
  // GOAL - Tag mais importante
  {
    id: 192,
    name: '04_MKT_Tag_ImersaoNegocios_Aprovado',
    type: 'goal',
    isca: 'todas',
    rastreia: 'Lead COMPROU a Imersão - GOAL de todas automações',
    destaque: true
  },

  // ORIGEM - Por qual isca entrou
  {
    id: 230,
    name: 'MKT_Tag_IscaCalculadoraTempo',
    type: 'origem',
    isca: 'calculadora',
    rastreia: 'Veio pela Calculadora de Tempo'
  },
  {
    id: 235,
    name: 'MKT_Tag_IscaQuizDiagnosticoIA',
    type: 'origem',
    isca: 'quiz',
    rastreia: 'Veio pelo Quiz Diagnóstico'
  },
  {
    id: 244,
    name: 'MKT_Tag_IscaParadoxoIA',
    type: 'origem',
    isca: 'paradoxo',
    rastreia: 'Veio pelo Paradoxo da IA'
  },
  {
    id: 260,
    name: 'MKT_Tag_IscaGuia5Automacoes',
    type: 'origem',
    isca: 'guia',
    rastreia: 'Veio pelo Guia 5 Automações'
  },

  // TRIGGER - Completou a ação principal
  {
    id: 231,
    name: 'MKT_Tag_CompletouCalculadora',
    type: 'trigger',
    isca: 'calculadora',
    rastreia: 'Completou o cálculo de tempo perdido'
  },
  {
    id: 236,
    name: 'MKT_Tag_CompletouQuizIA',
    type: 'trigger',
    isca: 'quiz',
    rastreia: 'Completou o quiz diagnóstico'
  },
  {
    id: 245,
    name: 'MKT_Tag_ParadoxoFormPreenchido',
    type: 'trigger',
    isca: 'paradoxo',
    rastreia: 'Preencheu form e recebeu Framework P.I.V.O.'
  },
  {
    id: 261,
    name: 'MKT_Tag_BaixouGuia5Automacoes',
    type: 'trigger',
    isca: 'guia',
    rastreia: 'Baixou o PDF do Guia'
  },

  // TEMPERATURA - CALCULADORA
  {
    id: 232,
    name: 'MKT_Tag_QualDorBaixa',
    type: 'temperatura',
    isca: 'calculadora',
    rastreia: 'Dor BAIXA: menos de 10h/semana perdidas (COLD)'
  },
  {
    id: 233,
    name: 'MKT_Tag_QualDorMedia',
    type: 'temperatura',
    isca: 'calculadora',
    rastreia: 'Dor MÉDIA: 10-20h/semana perdidas (WARM)'
  },
  {
    id: 234,
    name: 'MKT_Tag_QualDorAlta',
    type: 'temperatura',
    isca: 'calculadora',
    rastreia: 'Dor ALTA: mais de 20h/semana perdidas (HOT)'
  },

  // TEMPERATURA - QUIZ
  {
    id: 241,
    name: 'MKT_Tag_QuizLeadHot',
    type: 'temperatura',
    isca: 'quiz',
    rastreia: 'HOT: Score 7-9 - Alta intenção + disponibilidade'
  },
  {
    id: 242,
    name: 'MKT_Tag_QuizLeadWarm',
    type: 'temperatura',
    isca: 'quiz',
    rastreia: 'WARM: Score 4-6 - Interesse moderado'
  },
  {
    id: 243,
    name: 'MKT_Tag_QuizLeadCold',
    type: 'temperatura',
    isca: 'quiz',
    rastreia: 'COLD: Score 0-3 - Baixa intenção'
  },

  // TEMPERATURA - PARADOXO
  {
    id: 257,
    name: 'MKT_Tag_ParadoxoLeadQuente',
    type: 'temperatura',
    isca: 'paradoxo',
    rastreia: 'QUENTE: Score 9-12 - Pronto para comprar'
  },
  {
    id: 258,
    name: 'MKT_Tag_ParadoxoLeadMorno',
    type: 'temperatura',
    isca: 'paradoxo',
    rastreia: 'MORNO: Score 5-8 - Precisa mais nurture'
  },
  {
    id: 259,
    name: 'MKT_Tag_ParadoxoLeadFrio',
    type: 'temperatura',
    isca: 'paradoxo',
    rastreia: 'FRIO: Score 0-4 - Muito cedo para oferta'
  },

  // TEMPERATURA - GUIA
  {
    id: 262,
    name: 'MKT_Tag_GuiaTestouPrompt',
    type: 'temperatura',
    isca: 'guia',
    rastreia: 'TESTOU prompt - Respondeu "TESTEI" - TAG MAIS VALIOSA',
    destaque: true
  },
  {
    id: 263,
    name: 'MKT_Tag_GuiaEngajadoAlto',
    type: 'temperatura',
    isca: 'guia',
    rastreia: 'Abriu 3+ emails - Alto engajamento'
  },
  {
    id: 264,
    name: 'MKT_Tag_GuiaLeadQuente',
    type: 'temperatura',
    isca: 'guia',
    rastreia: 'QUENTE: Testou prompt + engajou'
  },
  {
    id: 265,
    name: 'MKT_Tag_GuiaLeadMorno',
    type: 'temperatura',
    isca: 'guia',
    rastreia: 'MORNO: Baixou mas não testou prompts'
  },
  {
    id: 266,
    name: 'MKT_Tag_GuiaLeadFrio',
    type: 'temperatura',
    isca: 'guia',
    rastreia: 'FRIO: Não engajou com sequência'
  },

  // PERFIL - QUIZ
  {
    id: 237,
    name: 'MKT_Tag_QuizPerfilSobrecarregado',
    type: 'perfil',
    isca: 'quiz',
    rastreia: 'Perfil: Sobrecarregado - Trabalha demais, sem tempo para IA'
  },
  {
    id: 238,
    name: 'MKT_Tag_QuizPerfilCuriosoTravado',
    type: 'perfil',
    isca: 'quiz',
    rastreia: 'Perfil: Curioso-Travado - Quer começar mas não sabe por onde'
  },
  {
    id: 239,
    name: 'MKT_Tag_QuizPerfilTecnicoFrustrado',
    type: 'perfil',
    isca: 'quiz',
    rastreia: 'Perfil: Técnico-Frustrado - Já tentou IA e não funcionou'
  },
  {
    id: 240,
    name: 'MKT_Tag_QuizPerfilLiderIsolado',
    type: 'perfil',
    isca: 'quiz',
    rastreia: 'Perfil: Líder-Isolado - Precisa levar equipe junto'
  },

  // PARADOXO - Extras
  {
    id: 246,
    name: 'MKT_Tag_ParadoxoRecebeuFramework',
    type: 'trigger',
    isca: 'paradoxo',
    rastreia: 'Recebeu o Framework P.I.V.O. por email'
  },

  // EVENTO/IMERSÃO
  {
    id: 190,
    name: 'Imersao Janeiro 26',
    type: 'evento',
    isca: 'evento',
    rastreia: 'Lead da campanha Imersão Jan/26'
  },
  {
    id: 193,
    name: '04_MKT_Tag_ImersaoNegocios_Reembolsado',
    type: 'evento',
    isca: 'evento',
    rastreia: 'Comprou mas pediu reembolso'
  },
  {
    id: 195,
    name: '04_MKT_Tag_ImersaoNegocios_PixGerado',
    type: 'evento',
    isca: 'evento',
    rastreia: 'Gerou Pix mas ainda não pagou'
  },
  {
    id: 197,
    name: '04_MKT_Tag_ImersaoNegocios_AguardandoPagamento',
    type: 'evento',
    isca: 'evento',
    rastreia: 'Aguardando confirmação de pagamento'
  },
  {
    id: 200,
    name: '04_MKT_Tag_ImersaoNegocios_CarrinhoAbandonado',
    type: 'evento',
    isca: 'evento',
    rastreia: 'Abandonou o carrinho'
  },

  // FASE DO LANÇAMENTO
  {
    id: 247,
    name: '[JAN26_WARMED]',
    type: 'fase',
    isca: 'evento',
    rastreia: 'Lead aquecido - passou pelo pré-lançamento'
  },
  {
    id: 250,
    name: '[JAN26_INSCRITO]',
    type: 'fase',
    isca: 'evento',
    rastreia: 'Inscrito para o evento - confirmou participação'
  },
  {
    id: 255,
    name: '[JAN26_FORMACAO_COMPROU]',
    type: 'fase',
    isca: 'evento',
    rastreia: 'Comprou a Formação 2.0 (backend R$12k)'
  },
]

export function getTagsByType(type: Tag['type']): Tag[] {
  return tags.filter(t => t.type === type)
}

export function getTagsByIsca(isca: Tag['isca']): Tag[] {
  return tags.filter(t => t.isca === isca || t.isca === 'todas')
}

export function findTag(id: number): Tag | undefined {
  return tags.find(t => t.id === id)
}

export const tagTypes = [
  { value: 'goal', label: 'Goal' },
  { value: 'origem', label: 'Origem' },
  { value: 'trigger', label: 'Trigger' },
  { value: 'temperatura', label: 'Temperatura' },
  { value: 'perfil', label: 'Perfil' },
  { value: 'evento', label: 'Evento' },
  { value: 'fase', label: 'Fase' },
]

export const iscas = [
  { value: 'todas', label: 'Todas' },
  { value: 'calculadora', label: 'Calculadora' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'paradoxo', label: 'Paradoxo' },
  { value: 'guia', label: 'Guia' },
  { value: 'evento', label: 'Evento' },
]
