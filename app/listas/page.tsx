'use client'

import { lists, getListsByTipo } from '@/data/lists'
import { CopyButton } from '@/components/CopyButton'

export default function ListasPage() {
  const compradores = getListsByTipo('compradores')
  const iscasLists = getListsByTipo('iscas')
  const formsLists = getListsByTipo('forms')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Listas do ActiveCampaign</h1>
        <p className="text-light-muted dark:text-dark-muted">
          {lists.length} listas do lançamento
        </p>
      </div>

      {/* Compradores */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="text-yellow-400">⭐</span> Compradores (04_)
        </h2>
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 overflow-hidden">
          <table className="w-full">
            <thead className="bg-yellow-500/10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Propósito</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Significado</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Ação</th>
              </tr>
            </thead>
            <tbody>
              {compradores.map((list) => (
                <tr key={list.id}>
                  <td className="px-4 py-3 font-mono font-bold">{list.id}</td>
                  <td className="px-4 py-3">
                    <code className="text-sm bg-dark-border/50 px-2 py-0.5 rounded">
                      {list.name}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-yellow-400">
                    {list.proposito}
                  </td>
                  <td className="px-4 py-3 text-sm">{list.significado}</td>
                  <td className="px-4 py-3">
                    <CopyButton text={list.id.toString()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Iscas */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="text-blue-400">🎣</span> Iscas (03_)
        </h2>
        <div className="rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
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
                  Propósito
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                  O que significa estar nela?
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border">
              {iscasLists.map((list) => (
                <tr key={list.id} className="hover:bg-light-card/50 dark:hover:bg-dark-card/50">
                  <td className="px-4 py-3 font-mono font-bold">{list.id}</td>
                  <td className="px-4 py-3">
                    <code className="text-sm bg-light-border/50 dark:bg-dark-border/50 px-2 py-0.5 rounded">
                      {list.name}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-accent">
                    {list.proposito}
                  </td>
                  <td className="px-4 py-3 text-sm">{list.significado}</td>
                  <td className="px-4 py-3">
                    <CopyButton text={list.id.toString()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forms */}
      {formsLists.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="text-gray-400">📝</span> Formulários (02_)
          </h2>
          <div className="rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
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
                    Propósito
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                    Significado
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-dark-border">
                {formsLists.map((list) => (
                  <tr key={list.id} className="hover:bg-light-card/50 dark:hover:bg-dark-card/50">
                    <td className="px-4 py-3 font-mono font-bold">{list.id}</td>
                    <td className="px-4 py-3">
                      <code className="text-sm bg-light-border/50 dark:bg-dark-border/50 px-2 py-0.5 rounded">
                        {list.name}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm">{list.proposito}</td>
                    <td className="px-4 py-3 text-sm">{list.significado}</td>
                    <td className="px-4 py-3">
                      <CopyButton text={list.id.toString()} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="mt-8 p-4 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
        <h3 className="font-semibold mb-3">Legenda de Nomenclatura</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <code className="text-accent">02_</code> = Formulários temporários
          </div>
          <div>
            <code className="text-accent">03_</code> = Iscas de captura (campanhas)
          </div>
          <div>
            <code className="text-accent">04_</code> = Produtos/Eventos (compradores)
          </div>
          <div>
            <code className="text-accent">TEMP_JAN26</code> = Temporária para campanha Jan/2026
          </div>
        </div>
      </div>
    </div>
  )
}
