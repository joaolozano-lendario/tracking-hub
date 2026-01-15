'use client'

import { useState } from 'react'
import { CopyButton } from '@/components/CopyButton'
import { validateUTM, ValidationResult } from '@/lib/utm-validator'

export default function AuditPage() {
  const [inputUrl, setInputUrl] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [bulkInput, setBulkInput] = useState('')
  const [bulkResults, setBulkResults] = useState<Array<{ url: string; result: ValidationResult }>>([])
  const [mode, setMode] = useState<'single' | 'bulk'>('single')

  const handleValidate = () => {
    if (!inputUrl.trim()) return
    const validationResult = validateUTM(inputUrl.trim())
    setResult(validationResult)
  }

  const handleBulkValidate = () => {
    if (!bulkInput.trim()) return
    const urls = bulkInput.split('\n').filter(url => url.trim())
    const results = urls.map(url => ({
      url: url.trim(),
      result: validateUTM(url.trim())
    }))
    setBulkResults(results)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (mode === 'single') {
        handleValidate()
      } else {
        handleBulkValidate()
      }
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Audit de Links</h1>
        <p className="text-light-muted dark:text-dark-muted">
          Cole um link para validar UTMs. O sistema verifica e corrige automaticamente.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('single')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'single'
              ? 'bg-accent text-accent-contrast'
              : 'bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted hover:bg-light-border dark:hover:bg-dark-border'
          }`}
        >
          Link Único
        </button>
        <button
          onClick={() => setMode('bulk')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'bulk'
              ? 'bg-accent text-accent-contrast'
              : 'bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted hover:bg-light-border dark:hover:bg-dark-border'
          }`}
        >
          Múltiplos Links
        </button>
      </div>

      {mode === 'single' ? (
        <>
          {/* Single URL Input */}
          <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card mb-6">
            <label className="block text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
              URL para validar
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://site.com/pagina?utm_source=..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                onClick={handleValidate}
                className="px-6 py-2.5 bg-accent text-accent-contrast font-medium rounded-lg hover:opacity-90 transition-colors"
              >
                Validar
              </button>
            </div>
          </div>

          {/* Single Result */}
          {result && (
            <div className="space-y-4">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg ${
                result.isValid && result.warnings.length === 0
                  ? 'bg-green-500/10 border border-green-500/30'
                  : result.isValid
                  ? 'bg-yellow-500/10 border border-yellow-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                <div className="flex items-center gap-3">
                  {result.isValid && result.warnings.length === 0 ? (
                    <>
                      <span className="text-2xl">✅</span>
                      <span className="text-green-400 font-medium">Link válido!</span>
                    </>
                  ) : result.isValid ? (
                    <>
                      <span className="text-2xl">⚠️</span>
                      <span className="text-yellow-400 font-medium">
                        Link válido com sugestões de correção
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">❌</span>
                      <span className="text-red-400 font-medium">
                        Link com erros - UTMs obrigatórios faltando
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Parsed UTMs */}
              <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
                <h3 className="text-lg font-medium mb-4">UTMs Detectados</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {['source', 'medium', 'campaign', 'content', 'term'].map((param) => (
                    <div key={param} className="bg-light-bg dark:bg-dark-bg rounded-lg p-3">
                      <div className="text-xs text-light-muted dark:text-dark-muted mb-1">utm_{param}</div>
                      <div className={`text-sm font-mono ${
                        result.parsed[param as keyof typeof result.parsed]
                          ? ''
                          : 'text-light-muted dark:text-dark-muted'
                      }`}>
                        {result.parsed[param as keyof typeof result.parsed] || '(vazio)'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Errors */}
              {result.errors.length > 0 && (
                <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/10">
                  <h3 className="text-lg font-medium text-red-400 mb-4">
                    Erros ({result.errors.length})
                  </h3>
                  <ul className="space-y-2">
                    {result.errors.map((error, i) => (
                      <li key={i} className="flex items-start gap-2 text-red-300">
                        <span className="text-red-500">•</span>
                        <span>
                          <strong>{error.field}:</strong> {error.message}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <div className="p-5 rounded-xl border border-yellow-500/30 bg-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-400 mb-4">
                    Avisos ({result.warnings.length})
                  </h3>
                  <ul className="space-y-2">
                    {result.warnings.map((warning, i) => (
                      <li key={i} className="flex items-start gap-2 text-yellow-300">
                        <span className="text-yellow-500">•</span>
                        <span>
                          <strong>{warning.field}:</strong> {warning.message}
                          {warning.suggestion && (
                            <span className="text-green-400 ml-2">
                              → Sugestão: {warning.suggestion}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Corrected URL */}
              {result.correctedUrl && (
                <div className="p-5 rounded-xl border border-green-500/30 bg-green-500/10">
                  <h3 className="text-lg font-medium text-green-400 mb-4">
                    URL Corrigida
                  </h3>
                  <div className="flex items-start gap-3">
                    <code className="flex-1 p-3 bg-light-bg dark:bg-dark-bg rounded-lg text-sm text-green-400 font-mono break-all">
                      {result.correctedUrl}
                    </code>
                    <CopyButton text={result.correctedUrl} />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Bulk Input */}
          <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card mb-6">
            <label className="block text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
              URLs para validar (uma por linha)
            </label>
            <textarea
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder="https://site.com/pagina1?utm_source=...&#10;https://site.com/pagina2?utm_source=...&#10;https://site.com/pagina3?utm_source=..."
              rows={8}
              className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg placeholder-light-muted dark:placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
            />
            <button
              onClick={handleBulkValidate}
              className="mt-4 px-6 py-2.5 bg-accent text-accent-contrast font-medium rounded-lg hover:opacity-90 transition-colors"
            >
              Validar Todos
            </button>
          </div>

          {/* Bulk Results */}
          {bulkResults.length > 0 && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
                <h3 className="text-lg font-medium mb-4">Resumo</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {bulkResults.length}
                    </div>
                    <div className="text-sm text-light-muted dark:text-dark-muted">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">
                      {bulkResults.filter(r => r.result.isValid && r.result.warnings.length === 0).length}
                    </div>
                    <div className="text-sm text-light-muted dark:text-dark-muted">OK</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">
                      {bulkResults.filter(r => !r.result.isValid || r.result.warnings.length > 0).length}
                    </div>
                    <div className="text-sm text-light-muted dark:text-dark-muted">Com Issues</div>
                  </div>
                </div>
              </div>

              {/* Individual Results */}
              {bulkResults.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 bg-light-card dark:bg-dark-card ${
                    item.result.isValid && item.result.warnings.length === 0
                      ? 'border-green-500'
                      : item.result.isValid
                      ? 'border-yellow-500'
                      : 'border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">
                      {item.result.isValid && item.result.warnings.length === 0
                        ? '✅'
                        : item.result.isValid
                        ? '⚠️'
                        : '❌'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-light-muted dark:text-dark-muted truncate mb-1">
                        {item.url}
                      </div>
                      {item.result.errors.length > 0 && (
                        <div className="text-sm text-red-400">
                          {item.result.errors.map(e => e.message).join(', ')}
                        </div>
                      )}
                      {item.result.warnings.length > 0 && (
                        <div className="text-sm text-yellow-400">
                          {item.result.warnings.length} aviso(s)
                        </div>
                      )}
                      {item.result.correctedUrl && item.result.correctedUrl !== item.url && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-light-muted dark:text-dark-muted">Corrigido:</span>
                          <code className="text-xs text-green-400 truncate">
                            {item.result.correctedUrl}
                          </code>
                          <CopyButton text={item.result.correctedUrl} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Export Corrected */}
              {bulkResults.some(r => r.result.correctedUrl) && (
                <div className="p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
                  <h3 className="text-lg font-medium mb-4">
                    Exportar URLs Corrigidas
                  </h3>
                  <div className="flex gap-3">
                    <textarea
                      readOnly
                      value={bulkResults
                        .map(r => r.result.correctedUrl || r.url)
                        .join('\n')}
                      rows={4}
                      className="flex-1 px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-green-400 font-mono text-sm"
                    />
                    <CopyButton
                      text={bulkResults
                        .map(r => r.result.correctedUrl || r.url)
                        .join('\n')}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Quick Reference */}
      <div className="mt-8 p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
        <h3 className="text-lg font-medium mb-4">Referência Rápida</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="text-light-muted dark:text-dark-muted font-medium mb-2">UTMs Obrigatórios</h4>
            <ul className="space-y-1">
              <li><code className="text-blue-400">utm_source</code> - De onde vem</li>
              <li><code className="text-blue-400">utm_medium</code> - Como chegou</li>
              <li><code className="text-blue-400">utm_campaign</code> - Qual campanha</li>
            </ul>
          </div>
          <div>
            <h4 className="text-light-muted dark:text-dark-muted font-medium mb-2">UTMs Opcionais</h4>
            <ul className="space-y-1">
              <li><code className="text-light-muted dark:text-dark-muted">utm_content</code> - Qual peça</li>
              <li><code className="text-light-muted dark:text-dark-muted">utm_term</code> - Segmentação</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
