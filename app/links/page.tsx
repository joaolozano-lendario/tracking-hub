'use client'

import { useState, useEffect } from 'react'
import { baseUrls } from '@/data/urls'
import { getHistory, removeFromHistory, clearHistory, type HistoryItem } from '@/lib/storage'
import { CopyButton } from '@/components/CopyButton'

// Helper para identificar o destino pelo URL
function getDestinationName(url: string): { name: string; emoji: string } {
  if (url.includes('imersao')) return { name: 'Imersão', emoji: '🎯' }
  if (url.includes('calculadora')) return { name: 'Calculadora', emoji: '🧮' }
  if (url.includes('quiz')) return { name: 'Quiz', emoji: '📊' }
  if (url.includes('paradoxo')) return { name: 'Paradoxo', emoji: '🧠' }
  if (url.includes('guia')) return { name: 'Guia', emoji: '📘' }
  return { name: 'Link', emoji: '🔗' }
}

// Helper para formatar source de forma amigável
function formatSource(source: string): string {
  const sourceMap: Record<string, string> = {
    'facebook': 'Facebook',
    'instagram': 'Instagram',
    'google': 'Google',
    'youtube': 'YouTube',
    'email': 'Email',
    'whatsapp': 'WhatsApp',
    'ig-organic': 'IG Orgânico',
    'ig-stories': 'IG Stories',
    'ig-reels': 'IG Reels',
    'manychat': 'ManyChat',
  }
  return sourceMap[source] || source
}

export default function LinksPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setMounted(true)
    setHistory(getHistory())
  }, [])

  const handleRemove = (id: string) => {
    removeFromHistory(id)
    setHistory(getHistory())
  }

  const handleClear = () => {
    if (confirm('Limpar todo o histórico?')) {
      clearHistory()
      setHistory([])
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Agora'
    if (diffMins < 60) return `${diffMins}min atrás`
    if (diffHours < 24) return `${diffHours}h atrás`
    if (diffDays === 1) return 'Ontem'
    if (diffDays < 7) return `${diffDays} dias atrás`

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })
  }

  // Filtrar histórico
  const filteredHistory = history.filter(item => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      item.source.toLowerCase().includes(search) ||
      item.medium.toLowerCase().includes(search) ||
      item.campaign.toLowerCase().includes(search) ||
      item.url.toLowerCase().includes(search)
    )
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Links Rápidos</h1>
        <p className="text-light-muted dark:text-dark-muted">
          URLs base e histórico de links gerados
        </p>
      </div>

      {/* Base URLs */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">URLs Base</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {baseUrls.map((url) => {
            const dest = getDestinationName(url.url)
            return (
              <div
                key={url.id}
                className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{dest.emoji}</span>
                    <span className="font-semibold">{url.label}</span>
                  </div>
                  <CopyButton text={url.url} />
                </div>
                <p className="text-xs text-light-muted dark:text-dark-muted mb-1">
                  {url.description}
                </p>
                <code className="text-xs text-light-muted dark:text-dark-muted break-all">
                  {url.url.replace('https://', '')}
                </code>
              </div>
            )
          })}
        </div>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <h2 className="text-lg font-semibold">
            Histórico
            {history.length > 0 && (
              <span className="text-light-muted dark:text-dark-muted font-normal ml-2">
                ({history.length} links)
              </span>
            )}
          </h2>
          <div className="flex items-center gap-3">
            {history.length > 3 && (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="px-3 py-1.5 text-sm rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:outline-none"
              />
            )}
            {history.length > 0 && (
              <button
                onClick={handleClear}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {!mounted ? (
          <div className="p-8 text-center text-light-muted dark:text-dark-muted">
            Carregando...
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
            <p className="text-light-muted dark:text-dark-muted">
              Nenhum link salvo ainda.
            </p>
            <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
              Use o gerador e clique em &quot;Salvar&quot; para guardar aqui.
            </p>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
            <p className="text-light-muted dark:text-dark-muted">
              Nenhum resultado para &quot;{searchTerm}&quot;
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item) => {
              const dest = getDestinationName(item.baseUrl || item.url)
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{dest.emoji}</span>
                      <div>
                        <div className="font-semibold">{dest.name}</div>
                        <div className="text-xs text-light-muted dark:text-dark-muted">
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CopyButton text={item.url} />
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1.5 rounded text-light-muted dark:text-dark-muted hover:text-red-400 hover:bg-red-500/10"
                        title="Remover"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400 dark:text-blue-300">
                      {formatSource(item.source)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-purple-500/10 text-purple-400 dark:text-purple-300">
                      {item.medium}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 dark:text-green-300">
                      {item.campaign}
                    </span>
                    {item.content && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-orange-500/10 text-orange-400 dark:text-orange-300">
                        {item.content}
                      </span>
                    )}
                    {item.term && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-pink-500/10 text-pink-400 dark:text-pink-300">
                        {item.term}
                      </span>
                    )}
                  </div>

                  {/* URL */}
                  <div className="bg-light-bg dark:bg-dark-bg rounded-lg p-2">
                    <code className="text-xs break-all text-light-muted dark:text-dark-muted">
                      {item.url}
                    </code>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
