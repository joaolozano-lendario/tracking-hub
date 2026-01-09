'use client'

import { useState, useEffect } from 'react'

interface CreateShortLinkModalProps {
  isOpen: boolean
  onClose: () => void
  linkData: {
    url: string
    baseUrl: string
    source: string
    medium: string
    campaign: string
    content?: string
    term?: string
  }
}

// Gerar sugestão de slug
function generateSlugSuggestion(baseUrl: string, source: string, campaign: string): string {
  const destMap: Record<string, string> = {
    'imersao': 'im',
    'calculadora': 'calc',
    'quiz': 'quiz',
    'paradoxo': 'par',
    'guia': 'guia',
  }

  const destKey = Object.keys(destMap).find(k => baseUrl.toLowerCase().includes(k)) || ''
  const destShort = destMap[destKey] || 'link'

  const sourceShort = source.replace('ig-', '').replace('-organic', '').substring(0, 4)
  const campaignShort = campaign.replace(/-/g, '').substring(0, 8)

  return `${destShort}-${sourceShort}-${campaignShort}`.toLowerCase()
}

// Helper para nome do destino
function getDestinationName(url: string): string {
  if (url.includes('imersao')) return 'Imersão'
  if (url.includes('calculadora')) return 'Calculadora'
  if (url.includes('quiz')) return 'Quiz'
  if (url.includes('paradoxo')) return 'Paradoxo'
  if (url.includes('guia')) return 'Guia'
  return 'Link'
}

export function CreateShortLinkModal({ isOpen, onClose, linkData }: CreateShortLinkModalProps) {
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [copied, setCopied] = useState(false)

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : ''

  useEffect(() => {
    if (isOpen && linkData) {
      setSlug(generateSlugSuggestion(linkData.baseUrl, linkData.source, linkData.campaign))
      setError(null)
      setSuccess(false)
    }
  }, [isOpen, linkData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/shortlinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          url: linkData.url,
          destination: getDestinationName(linkData.baseUrl),
          source: linkData.source,
          medium: linkData.medium,
          campaign: linkData.campaign,
          content: linkData.content,
          term: linkData.term,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao criar link')
        return
      }

      setSuccess(true)
    } catch (err) {
      console.error('Erro:', err)
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    const shortUrl = `${baseUrl}/go/${slug}`
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-light-card dark:bg-dark-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">✂️ Criar Link Curto</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-light-bg dark:hover:bg-dark-bg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          /* Success state */
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✅</div>
            <p className="font-semibold mb-2">Link criado!</p>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4">
              <code className="text-lg font-bold text-green-400 break-all">
                /go/{slug}
              </code>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-accent text-accent-contrast hover:opacity-90'
                }`}
              >
                {copied ? '✓ Copiado!' : '📋 Copiar'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          /* Form state */
          <form onSubmit={handleSubmit}>
            {/* Preview */}
            <div className="mb-4 p-3 rounded-xl bg-light-bg dark:bg-dark-bg">
              <div className="text-xs text-light-muted dark:text-dark-muted mb-1">Link final:</div>
              <code className="text-sm break-all">
                {baseUrl}/go/<span className="text-green-400 font-bold">{slug || '...'}</span>
              </code>
            </div>

            {/* Slug input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Slug (identificador único)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="ex: quiz-fb-jan26"
                className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-accent/50"
                required
              />
              <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
                Apenas letras minúsculas, números e hífens
              </p>
            </div>

            {/* Info */}
            <div className="mb-4 text-xs text-light-muted dark:text-dark-muted">
              <p><strong>Destino:</strong> {getDestinationName(linkData.baseUrl)}</p>
              <p><strong>Source:</strong> {linkData.source} | <strong>Medium:</strong> {linkData.medium}</p>
              <p><strong>Campaign:</strong> {linkData.campaign}</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading || !slug}
                className="flex-1 px-4 py-3 rounded-xl bg-accent text-accent-contrast font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Criando...' : 'Criar Link Curto'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-xl border border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
