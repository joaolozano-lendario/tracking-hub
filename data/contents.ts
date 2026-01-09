export interface ContentOption {
  value: string
  label: string
  category: string
}

export interface ContentCategory {
  id: string
  label: string
  contents: ContentOption[]
}

export const contentCategories: ContentCategory[] = [
  {
    id: 'emails',
    label: 'Emails (Número)',
    contents: [
      { value: 'e1', label: 'Email 1', category: 'emails' },
      { value: 'e2', label: 'Email 2', category: 'emails' },
      { value: 'e3', label: 'Email 3', category: 'emails' },
      { value: 'e4', label: 'Email 4', category: 'emails' },
      { value: 'e5', label: 'Email 5', category: 'emails' },
      { value: 'e6', label: 'Email 6', category: 'emails' },
      { value: 'e7', label: 'Email 7', category: 'emails' },
      { value: 'e8', label: 'Email 8', category: 'emails' },
    ]
  },
  {
    id: 'email-tipo',
    label: 'Emails (Tipo)',
    contents: [
      { value: 'e1-entrega', label: 'E1 - Entrega', category: 'email-tipo' },
      { value: 'e2-problema', label: 'E2 - Problema', category: 'email-tipo' },
      { value: 'e3-framework', label: 'E3 - Framework', category: 'email-tipo' },
      { value: 'e4-case', label: 'E4 - Case', category: 'email-tipo' },
      { value: 'e5-futurepacing', label: 'E5 - Future Pacing', category: 'email-tipo' },
      { value: 'e6-oferta', label: 'E6 - Oferta', category: 'email-tipo' },
      { value: 'e7-objecao', label: 'E7 - Objeção', category: 'email-tipo' },
      { value: 'e8-fechamento', label: 'E8 - Fechamento', category: 'email-tipo' },
      { value: 'e-reforco', label: 'Reforço (Reenvio)', category: 'email-tipo' },
      { value: 'e-versaoB', label: 'Versão B (Teste)', category: 'email-tipo' },
    ]
  },
  {
    id: 'criativos',
    label: 'Criativos (Ângulo)',
    contents: [
      { value: 'dor-v1', label: 'Dor V1', category: 'criativos' },
      { value: 'dor-v2', label: 'Dor V2', category: 'criativos' },
      { value: 'resultado-v1', label: 'Resultado V1', category: 'criativos' },
      { value: 'resultado-v2', label: 'Resultado V2', category: 'criativos' },
      { value: 'mecanismo-v1', label: 'Mecanismo V1', category: 'criativos' },
      { value: 'curiosidade-v1', label: 'Curiosidade V1', category: 'criativos' },
      { value: 'case-v1', label: 'Case V1', category: 'criativos' },
      { value: 'ugc-v1', label: 'UGC V1', category: 'criativos' },
      { value: 'depoimento-v1', label: 'Depoimento V1', category: 'criativos' },
    ]
  },
  {
    id: 'formatos',
    label: 'Formatos',
    contents: [
      { value: 'img-quadrado', label: 'Imagem Quadrado', category: 'formatos' },
      { value: 'img-vertical', label: 'Imagem Vertical', category: 'formatos' },
      { value: 'img-horizontal', label: 'Imagem Horizontal', category: 'formatos' },
      { value: 'video-15s', label: 'Video 15s', category: 'formatos' },
      { value: 'video-30s', label: 'Video 30s', category: 'formatos' },
      { value: 'video-60s', label: 'Video 60s', category: 'formatos' },
      { value: 'carrossel-3', label: 'Carrossel 3 cards', category: 'formatos' },
      { value: 'carrossel-5', label: 'Carrossel 5 cards', category: 'formatos' },
    ]
  },
  {
    id: 'placements',
    label: 'Placements',
    contents: [
      { value: 'feed-fb', label: 'Feed Facebook', category: 'placements' },
      { value: 'feed-ig', label: 'Feed Instagram', category: 'placements' },
      { value: 'stories-fb', label: 'Stories Facebook', category: 'placements' },
      { value: 'stories-ig', label: 'Stories Instagram', category: 'placements' },
      { value: 'reels', label: 'Reels', category: 'placements' },
      { value: 'youtube-instream', label: 'YouTube In-stream', category: 'placements' },
      { value: 'youtube-discovery', label: 'YouTube Discovery', category: 'placements' },
    ]
  },
  {
    id: 'ctas',
    label: 'CTAs / Posição',
    contents: [
      { value: 'cta-hero', label: 'CTA Hero', category: 'ctas' },
      { value: 'cta-meio', label: 'CTA Meio', category: 'ctas' },
      { value: 'cta-footer', label: 'CTA Footer', category: 'ctas' },
      { value: 'cta-saibamais', label: 'Saiba Mais', category: 'ctas' },
      { value: 'cta-baixar', label: 'Baixar', category: 'ctas' },
      { value: 'cta-inscrever', label: 'Inscrever', category: 'ctas' },
      { value: 'cta-participar', label: 'Participar', category: 'ctas' },
    ]
  },
]

export function getAllContents(): ContentOption[] {
  return contentCategories.flatMap(cat => cat.contents)
}

export function findContent(value: string): ContentOption | undefined {
  return getAllContents().find(c => c.value === value)
}
