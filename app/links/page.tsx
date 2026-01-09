'use client'

import { useState, useEffect } from 'react'
import { baseUrls } from '@/data/urls'
import { getHistory, removeFromHistory, clearHistory, type HistoryItem } from '@/lib/storage'
import { CopyButton } from '@/components/CopyButton'

export default function LinksPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [mounted, setMounted] = useState(false)

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
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

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
        <div className="rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-light-card dark:bg-dark-card">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                  Página
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                  URL
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                  Descrição
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border">
              {baseUrls.map((url) => (
                <tr key={url.id} className="hover:bg-light-card/50 dark:hover:bg-dark-card/50">
                  <td className="px-4 py-3 font-medium">{url.label}</td>
                  <td className="px-4 py-3">
                    <a
                      href={url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-sm"
                    >
                      {url.url}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-light-muted dark:text-dark-muted">
                    {url.description}
                  </td>
                  <td className="px-4 py-3">
                    <CopyButton text={url.url} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Histórico de Links Gerados</h2>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Limpar histórico
            </button>
          )}
        </div>

        {!mounted ? (
          <div className="p-8 text-center text-light-muted dark:text-dark-muted">
            Carregando...
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
            <p className="text-light-muted dark:text-dark-muted">
              Nenhum link gerado ainda.
            </p>
            <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
              Use o gerador de UTMs e clique em &quot;Salvar&quot; para adicionar ao histórico.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-light-muted dark:text-dark-muted">
                        {formatDate(item.createdAt)}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                        {item.source}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-light-border dark:bg-dark-border">
                        {item.medium}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-light-border dark:bg-dark-border">
                        {item.campaign}
                      </span>
                    </div>
                    <code className="text-sm break-all block text-light-muted dark:text-dark-muted">
                      {item.url}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <CopyButton text={item.url} />
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 rounded text-red-400 hover:bg-red-500/10"
                      title="Remover"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
