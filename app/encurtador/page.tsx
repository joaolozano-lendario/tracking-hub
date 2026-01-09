'use client'

import { useState, useEffect } from 'react'
import { CopyButton } from '@/components/CopyButton'

interface ShortLink {
  slug: string
  url: string
  destination: string
  source: string
  medium: string
  campaign: string
  content?: string
  term?: string
  clicks: number
  createdAt: string
}

// Helper para identificar destino pelo URL
function getDestinationInfo(url: string): { name: string; emoji: string } {
  if (url.includes('imersao')) return { name: 'Imersão', emoji: '🎯' }
  if (url.includes('calculadora')) return { name: 'Calculadora', emoji: '🧮' }
  if (url.includes('quiz')) return { name: 'Quiz', emoji: '📊' }
  if (url.includes('paradoxo')) return { name: 'Paradoxo', emoji: '🧠' }
  if (url.includes('guia')) return { name: 'Guia', emoji: '📘' }
  return { name: 'Link', emoji: '🔗' }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function EncurtadorPage() {
  const [links, setLinks] = useState<ShortLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Form manual
  const [manualUrl, setManualUrl] = useState('')
  const [manualSlug, setManualSlug] = useState('')
  const [manualName, setManualName] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [createSuccess, setCreateSuccess] = useState(false)

  // Domínio fixo do encurtador
  const shortenerDomain = 'https://go.lendario.ai'

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/shortlinks')
      const data = await res.json()
      if (data.links) {
        setLinks(data.links)
      }
      setError(null)
    } catch (err) {
      console.error('Erro ao carregar links:', err)
      setError('Erro ao carregar links. Verifique se o Vercel KV está configurado.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleDelete = async (slug: string) => {
    if (!confirm(`Deletar o link /${slug}?`)) return

    setDeleting(slug)
    try {
      const res = await fetch(`/api/shortlinks?slug=${slug}`, { method: 'DELETE' })
      if (res.ok) {
        setLinks(links.filter(l => l.slug !== slug))
      }
    } catch (err) {
      console.error('Erro ao deletar:', err)
    } finally {
      setDeleting(null)
    }
  }

  const handleCreateManual = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualUrl || !manualSlug) return

    setCreating(true)
    setCreateError(null)
    setCreateSuccess(false)

    try {
      const res = await fetch('/api/shortlinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: manualSlug,
          url: manualUrl,
          destination: manualName || 'Link externo',
          source: 'manual',
          medium: 'link',
          campaign: 'externo',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setCreateError(data.error || 'Erro ao criar')
        return
      }

      setCreateSuccess(true)
      setManualUrl('')
      setManualSlug('')
      setManualName('')
      fetchLinks()

      setTimeout(() => setCreateSuccess(false), 3000)
    } catch (err) {
      console.error('Erro:', err)
      setCreateError('Erro de conexão')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Encurtador de Links</h1>
        <p className="text-light-muted dark:text-dark-muted">
          Links curtos para compartilhar. Use <code className="bg-light-border dark:bg-dark-border px-1 rounded">go.lendario.ai/slug</code>
        </p>
      </div>

      {/* Criar link manual */}
      <div className="mb-6 p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
        <h2 className="font-semibold mb-4">Encurtar qualquer link</h2>
        <form onSubmit={handleCreateManual} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-light-muted dark:text-dark-muted mb-1">
              URL de destino *
            </label>
            <input
              type="url"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="https://exemplo.com/pagina-longa"
              className="w-full px-4 py-2.5 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-light-muted dark:text-dark-muted mb-1">
                Slug *
              </label>
              <input
                type="text"
                value={manualSlug}
                onChange={(e) => setManualSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="meu-link"
                className="w-full px-4 py-2.5 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-light-muted dark:text-dark-muted mb-1">
                Nome (opcional)
              </label>
              <input
                type="text"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="Ex: Live Janeiro"
                className="w-full px-4 py-2.5 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:outline-none"
              />
            </div>
          </div>

          {/* Preview */}
          {manualSlug && (
            <div className="text-sm text-light-muted dark:text-dark-muted">
              Link: <code className="text-green-400">{shortenerDomain}/{manualSlug}</code>
            </div>
          )}

          {createError && (
            <div className="text-sm text-red-400">{createError}</div>
          )}

          {createSuccess && (
            <div className="text-sm text-green-400">Link criado com sucesso!</div>
          )}

          <button
            type="submit"
            disabled={creating || !manualUrl || !manualSlug}
            className="w-full px-4 py-2.5 rounded-lg bg-accent text-accent-contrast font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? 'Criando...' : 'Criar Link Curto'}
          </button>
        </form>
      </div>

      {/* Separador */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
        <span className="text-xs text-light-muted dark:text-dark-muted">Links criados</span>
        <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2 text-red-400/70">
            Para configurar: Dashboard Vercel → Storage → Create Database → KV
          </p>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="p-8 text-center text-light-muted dark:text-dark-muted">
          Carregando...
        </div>
      ) : links.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
          <p className="text-light-muted dark:text-dark-muted">
            Nenhum link curto criado ainda.
          </p>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Crie links no Gerador de UTMs.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => {
            const dest = getDestinationInfo(link.url)
            const shortUrl = `${shortenerDomain}/${link.slug}`

            return (
              <div
                key={link.slug}
                className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.emoji}</span>
                    <div>
                      <div className="font-semibold">{link.destination || dest.name}</div>
                      <div className="text-xs text-light-muted dark:text-dark-muted">
                        {formatDate(link.createdAt)} • {link.clicks} cliques
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CopyButton text={shortUrl} />
                    <button
                      onClick={() => handleDelete(link.slug)}
                      disabled={deleting === link.slug}
                      className="p-1.5 rounded text-light-muted dark:text-dark-muted hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                      title="Deletar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Short URL */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-semibold text-green-400">
                      go.lendario.ai/{link.slug}
                    </code>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-400 hover:underline"
                    >
                      Testar →
                    </a>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400">
                    {link.source}
                  </span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-500/10 text-purple-400">
                    {link.medium}
                  </span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400">
                    {link.campaign}
                  </span>
                </div>

                {/* Full URL */}
                <div className="bg-light-bg dark:bg-dark-bg rounded-lg p-2">
                  <code className="text-xs break-all text-light-muted dark:text-dark-muted">
                    {link.url}
                  </code>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
