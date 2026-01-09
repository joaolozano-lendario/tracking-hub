'use client'

import { fields, getFieldsByIsca } from '@/data/fields'
import { CopyButton } from '@/components/CopyButton'

export default function CamposPage() {
  const calculadoraFields = getFieldsByIsca('calculadora')
  const quizFields = getFieldsByIsca('quiz')
  const guiaFields = getFieldsByIsca('guia')

  const renderTable = (fieldsList: typeof fields, title: string, icon: string, idRange: string) => (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <span>{icon}</span> {title} ({idRange})
      </h2>
      <div className="rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-light-card dark:bg-dark-card">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                Perstag
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                Descrição
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                Exemplo
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-light-muted dark:text-dark-muted">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-border dark:divide-dark-border">
            {fieldsList.map((field) => (
              <tr key={field.id} className="hover:bg-light-card/50 dark:hover:bg-dark-card/50">
                <td className="px-4 py-3 font-mono font-bold">{field.id}</td>
                <td className="px-4 py-3">
                  <code className="text-sm bg-accent/10 text-accent px-2 py-0.5 rounded">
                    %{field.perstag}%
                  </code>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-light-border dark:bg-dark-border">
                    {field.tipo}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{field.descricao}</td>
                <td className="px-4 py-3 text-sm font-mono text-light-muted dark:text-dark-muted">
                  {field.exemplo}
                </td>
                <td className="px-4 py-3">
                  <CopyButton text={`%${field.perstag}%`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Campos Customizados</h1>
        <p className="text-light-muted dark:text-dark-muted">
          {fields.length} campos customizados do ActiveCampaign
        </p>
      </div>

      {renderTable(calculadoraFields, 'Calculadora', '🧮', '166-170')}
      {renderTable(quizFields, 'Quiz', '📊', '171-176')}
      {renderTable(guiaFields, 'Guia 5 Automações', '📚', '177-178')}

      {/* Uso nos emails */}
      <div className="mt-8 p-4 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
        <h3 className="font-semibold mb-3">Como usar nos emails do ActiveCampaign</h3>
        <div className="space-y-3 text-sm">
          <p>
            Use a sintaxe <code className="bg-accent/10 text-accent px-1 rounded">%NOME_DO_CAMPO%</code> para
            inserir o valor do campo no email.
          </p>
          <div className="p-3 rounded-lg bg-light-bg dark:bg-dark-bg font-mono text-sm">
            <p className="text-light-muted dark:text-dark-muted mb-2">Exemplo:</p>
            <code>
              Olá %FIRSTNAME%,<br /><br />
              Você perde <strong>%HORAS_PERDIDAS_SEMANA%h</strong> por semana.<br />
              Isso custa <strong>R$ %CUSTO_ANUAL_ESTIMADO%</strong> por ano.
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
