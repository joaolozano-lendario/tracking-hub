'use client'

import { useState } from 'react'
import { tags, tagTypes, iscas, type Tag } from '@/data/tags'
import { CopyButton } from '@/components/CopyButton'

export default function TagsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('')
  const [filterIsca, setFilterIsca] = useState<string>('')

  const filteredTags = tags.filter((tag) => {
    const matchesSearch =
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.rastreia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.id.toString().includes(searchTerm)

    const matchesType = !filterType || tag.type === filterType
    const matchesIsca = !filterIsca || tag.isca === filterIsca || tag.isca === 'todas'

    return matchesSearch && matchesType && matchesIsca
  })

  const getTypeColor = (type: Tag['type']) => {
    const colors: Record<string, string> = {
      goal: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      origem: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      trigger: 'bg-green-500/20 text-green-400 border-green-500/30',
      temperatura: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      perfil: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      evento: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      fase: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    }
    return colors[type] || 'bg-gray-500/20 text-gray-400'
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Tags do ActiveCampaign</h1>
        <p className="text-light-muted dark:text-dark-muted">
          {tags.length} tags documentadas
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por ID, nome ou descrição..."
          className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border focus:border-accent outline-none"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border focus:border-accent outline-none"
        >
          <option value="">Todos os tipos</option>
          {tagTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <select
          value={filterIsca}
          onChange={(e) => setFilterIsca(e.target.value)}
          className="px-4 py-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border focus:border-accent outline-none"
        >
          <option value="">Todas as iscas</option>
          {iscas.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tags table */}
      <div className="overflow-x-auto rounded-xl border border-light-border dark:border-dark-border">
        <table className="w-full">
          <thead className="bg-light-card dark:bg-dark-card">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                Nome
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                O que rastreia
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-border dark:divide-dark-border">
            {filteredTags.map((tag) => (
              <tr
                key={tag.id}
                className={`hover:bg-light-card/50 dark:hover:bg-dark-card/50 ${
                  tag.destaque ? 'bg-accent/5' : ''
                }`}
              >
                <td className="px-4 py-3 text-sm font-mono font-bold">
                  {tag.id}
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm bg-light-border/50 dark:bg-dark-border/50 px-2 py-0.5 rounded">
                    {tag.name}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(
                      tag.type
                    )}`}
                  >
                    {tag.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  {tag.destaque && <span className="mr-1">⭐</span>}
                  {tag.rastreia}
                </td>
                <td className="px-4 py-3">
                  <CopyButton text={tag.id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTags.length === 0 && (
        <div className="text-center py-8 text-light-muted dark:text-dark-muted">
          Nenhuma tag encontrada com os filtros selecionados
        </div>
      )}
    </div>
  )
}
