'use client'

import { useState } from 'react'
import { CopyButton } from '@/components/CopyButton'

const iscas = [
  {
    id: 'calculadora',
    nome: 'Calculadora',
    url: 'https://calculadora.academialendaria.ai',
    promessa: 'Quanto tempo você perde?',
    entrega: 'Número em R$/hora',
    lista: 56,
    tags: '230-234',
    emails: 8,
    cor: 'bg-blue-500'
  },
  {
    id: 'quiz',
    nome: 'Quiz',
    url: 'https://quiz.academialendaria.ai',
    promessa: 'Qual seu perfil?',
    entrega: '4 perfis + score',
    lista: 59,
    tags: '235-243',
    emails: 32,
    cor: 'bg-purple-500'
  },
  {
    id: 'paradoxo',
    nome: 'Paradoxo',
    url: 'https://paradoxo.academialendaria.ai',
    promessa: 'Por que 90% erram?',
    entrega: 'Framework P.I.V.O.',
    lista: 60,
    tags: '244-259',
    emails: 21,
    cor: 'bg-orange-500'
  },
  {
    id: 'guia',
    nome: 'Guia 5 Auto',
    url: 'https://guia.academialendaria.ai',
    promessa: '5 Automações + Prompts',
    entrega: 'PDF prático',
    lista: 63,
    tags: '260-266',
    emails: 8,
    cor: 'bg-green-500'
  },
]

const destino = {
  nome: 'Imersão',
  url: 'https://imersao.academialendaria.ai',
  data: '24-25/Jan/2026',
  preco: 'R$ 348-388',
  lista: 54,
  tagCompra: 192
}

const temperaturas = [
  { nivel: 'HOT', cor: 'text-red-500', acao: 'Oferta direta' },
  { nivel: 'WARM', cor: 'text-yellow-500', acao: 'Educar + oferta' },
  { nivel: 'COLD', cor: 'text-blue-400', acao: 'Nutrir mais' },
]

export default function OverviewPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Sistema de Iscas</h1>
        <p className="text-light-muted dark:text-dark-muted">
          Imersão Prática de IA | Jan/2026 | 4 iscas, 69 emails, 1 destino
        </p>
      </div>

      {/* Fluxo Visual */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-lg font-semibold mb-4">Fluxo de Captação</h2>

        {/* Iscas Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {iscas.map((isca) => (
            <div
              key={isca.id}
              className="bg-light-bg dark:bg-dark-bg rounded-lg p-4 border border-light-border dark:border-dark-border"
            >
              <div className={`w-3 h-3 rounded-full ${isca.cor} mb-2`} />
              <h3 className="font-semibold text-sm">{isca.nome}</h3>
              <p className="text-xs text-light-muted dark:text-dark-muted mb-2">{isca.promessa}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyUrl(isca.url)}
                  className="text-xs text-accent hover:underline"
                >
                  {copiedUrl === isca.url ? '✓ Copiado' : 'Copiar URL'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Seta */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center text-light-muted dark:text-dark-muted">
            <span className="text-xs mb-1">Nutrição personalizada</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Destino */}
        <div className="bg-accent/10 rounded-lg p-4 border-2 border-accent">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-bold text-accent">{destino.nome}</h3>
              <p className="text-sm">{destino.data} | {destino.preco}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-accent/20 px-2 py-1 rounded">Lista: {destino.lista}</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Tag Compra: {destino.tagCompra}</span>
              <button
                onClick={() => copyUrl(destino.url)}
                className="text-sm text-accent hover:underline"
              >
                {copiedUrl === destino.url ? '✓' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo por Isca */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-lg font-semibold mb-4">Resumo por Isca</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-2 px-3">Isca</th>
                <th className="text-left py-2 px-3">Entrega</th>
                <th className="text-center py-2 px-3">Lista</th>
                <th className="text-center py-2 px-3">Tags</th>
                <th className="text-center py-2 px-3">Emails</th>
              </tr>
            </thead>
            <tbody>
              {iscas.map((isca) => (
                <tr key={isca.id} className="border-b border-light-border/50 dark:border-dark-border/50">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isca.cor}`} />
                      <span className="font-medium">{isca.nome}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-light-muted dark:text-dark-muted">{isca.entrega}</td>
                  <td className="py-3 px-3 text-center font-mono">{isca.lista}</td>
                  <td className="py-3 px-3 text-center font-mono">{isca.tags}</td>
                  <td className="py-3 px-3 text-center">{isca.emails}</td>
                </tr>
              ))}
              <tr className="bg-light-bg/50 dark:bg-dark-bg/50">
                <td className="py-3 px-3 font-semibold">TOTAL</td>
                <td className="py-3 px-3">-</td>
                <td className="py-3 px-3 text-center">4 listas</td>
                <td className="py-3 px-3 text-center">35 tags</td>
                <td className="py-3 px-3 text-center font-semibold">69</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Temperaturas */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-lg font-semibold mb-4">Sistema de Temperatura</h2>
        <p className="text-sm text-light-muted dark:text-dark-muted mb-4">
          Cada isca qualifica o lead em HOT/WARM/COLD baseado em dados diferentes.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {temperaturas.map((temp) => (
            <div key={temp.nivel} className="text-center p-4 bg-light-bg dark:bg-dark-bg rounded-lg">
              <span className={`text-2xl font-bold ${temp.cor}`}>{temp.nivel}</span>
              <p className="text-xs text-light-muted dark:text-dark-muted mt-1">{temp.acao}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-light-muted dark:text-dark-muted space-y-1">
          <p><strong>Calculadora:</strong> HOT = +20h/sem perdidas | WARM = 10-20h | COLD = -10h</p>
          <p><strong>Quiz:</strong> HOT = Score 7-9 | WARM = 4-6 | COLD = 0-3</p>
          <p><strong>Paradoxo:</strong> HOT = Score 9-12 | WARM = 5-8 | COLD = 0-4</p>
          <p><strong>Guia:</strong> HOT = Testou prompt | WARM = Baixou | COLD = Não engajou</p>
        </div>
      </div>

      {/* Links Rápidos */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-lg font-semibold mb-4">Links Rápidos</h2>

        <div className="space-y-2">
          {[...iscas, { id: 'imersao', nome: 'Imersão (Vendas)', url: destino.url, cor: 'bg-accent' }].map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-light-bg dark:bg-dark-bg rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.cor}`} />
                <span className="font-medium text-sm">{item.nome}</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs text-light-muted dark:text-dark-muted hidden sm:block">{item.url}</code>
                <CopyButton text={item.url} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remetente */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-lg font-semibold mb-4">Configuração de Email</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-light-muted dark:text-dark-muted">From Name:</span>
            <p className="font-mono">Alan</p>
          </div>
          <div>
            <span className="text-light-muted dark:text-dark-muted">From Email:</span>
            <p className="font-mono">alan@academialendaria.ai</p>
          </div>
          <div>
            <span className="text-light-muted dark:text-dark-muted">Reply-to:</span>
            <p className="font-mono">alan@academialendaria.ai</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-light-muted dark:text-dark-muted">
        <p>Tracking Hub v1.0 | Imersão Prática de IA para Negócios | Jan/2026</p>
      </div>
    </div>
  )
}
