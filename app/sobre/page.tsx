'use client'

import Link from 'next/link'

const exemplos = [
  {
    pergunta: 'Quantos leads vieram das lives do Alan?',
    resposta: 'Filtra por utm_source = live-alan',
    icon: '🎥'
  },
  {
    pergunta: 'Qual email converte mais na sequência do Quiz?',
    resposta: 'Compara utm_content = e3 vs e5',
    icon: '📧'
  },
  {
    pergunta: 'Qual grupo de WhatsApp traz mais gente?',
    resposta: 'Compara utm_term = chatgeral01 vs chatgeral02',
    icon: '💬'
  },
  {
    pergunta: 'José ou Charão: quem traz mais leads?',
    resposta: 'Compara utm_source = jose vs charao',
    icon: '👤'
  },
]

const parametros = [
  { nome: 'utm_source', pergunta: 'De onde veio?', exemplo: 'email, live-alan, jose, wa-grupo' },
  { nome: 'utm_medium', pergunta: 'Como chegou?', exemplo: 'nurture, live-chat, cpc, grupo' },
  { nome: 'utm_campaign', pergunta: 'Qual ação?', exemplo: 'livesemanal049, abertura-jan26' },
  { nome: 'utm_content', pergunta: 'Qual peça?', exemplo: 'e3-framework, dor-v1' },
  { nome: 'utm_term', pergunta: 'Qual contexto?', exemplo: 'chatgeral01, min45, dia1' },
]

const quemUsaOQue = [
  { pessoa: 'Marketing', acao: 'Gera links para campanhas', ferramenta: 'Tracking Hub' },
  { pessoa: 'Taís', acao: 'Divulga nos grupos WhatsApp', ferramenta: 'Tracking Hub' },
  { pessoa: 'Especialistas', acao: 'Geram links para conteúdos', ferramenta: 'Tracking Hub' },
  { pessoa: 'Lory', acao: 'Define padrões de ads', ferramenta: 'Ads Manager + Hub' },
]

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Sistema de Tracking</h1>
        <p className="text-xl text-light-muted dark:text-dark-muted">
          Academia Lendária
        </p>
      </div>

      {/* O que é */}
      <section className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-xl font-semibold mb-4">O que é este sistema?</h2>

        <div className="space-y-4 text-light-muted dark:text-dark-muted">
          <p className="text-lg">
            <strong className="text-light-text dark:text-dark-text">Em uma frase:</strong> Um sistema que permite saber exatamente de onde veio cada pessoa que entra em contato com a Academia Lendária.
          </p>
        </div>
      </section>

      {/* O problema */}
      <section className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-xl font-semibold mb-4">O problema que resolve</h2>

        <div className="space-y-4">
          <p className="text-light-muted dark:text-dark-muted">
            Imagine que você investe em anúncios, faz lives, posta no Instagram, envia emails, divulga em grupos de WhatsApp... Mas quando alguém compra, você não sabe o que funcionou.
          </p>

          <ul className="space-y-2 text-light-muted dark:text-dark-muted">
            <li>• Foi o anúncio do José?</li>
            <li>• Foi a live de quinta?</li>
            <li>• Foi aquele email de quarta?</li>
            <li>• Foi o post que a Day fez?</li>
          </ul>

          <p className="font-semibold text-red-500">
            Sem tracking, você está no escuro. Continua investindo sem saber o que dá retorno.
          </p>
        </div>
      </section>

      {/* A solução */}
      <section className="bg-accent/10 rounded-xl p-6 border-2 border-accent">
        <h2 className="text-xl font-semibold mb-4 text-accent">A solução</h2>

        <p className="text-light-muted dark:text-dark-muted mb-4">
          Este sistema marca cada link com "etiquetas invisíveis" (chamadas UTMs). Quando alguém clica, essas etiquetas viajam junto e ficam registradas no nosso CRM.
        </p>

        <p className="text-lg font-semibold">
          Resultado: <span className="text-accent">sabemos exatamente de onde veio cada lead e cada venda.</span>
        </p>
      </section>

      {/* O que conseguimos responder */}
      <section className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-xl font-semibold mb-4">O que conseguimos responder?</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-3 px-4">Parâmetro</th>
                <th className="text-left py-3 px-4">Pergunta</th>
                <th className="text-left py-3 px-4">Exemplos</th>
              </tr>
            </thead>
            <tbody>
              {parametros.map((p) => (
                <tr key={p.nome} className="border-b border-light-border/50 dark:border-dark-border/50">
                  <td className="py-3 px-4 font-mono text-accent">{p.nome}</td>
                  <td className="py-3 px-4 font-medium">{p.pergunta}</td>
                  <td className="py-3 px-4 text-light-muted dark:text-dark-muted">{p.exemplo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Exemplos práticos */}
      <section className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-xl font-semibold mb-4">Exemplos práticos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exemplos.map((ex, i) => (
            <div key={i} className="bg-light-bg dark:bg-dark-bg rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{ex.icon}</span>
                <div>
                  <p className="font-medium text-sm mb-1">"{ex.pergunta}"</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">→ {ex.resposta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quem usa o que */}
      <section className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-xl font-semibold mb-4">Quem usa o que?</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border">
                <th className="text-left py-3 px-4">Pessoa</th>
                <th className="text-left py-3 px-4">O que faz</th>
                <th className="text-left py-3 px-4">Ferramenta</th>
              </tr>
            </thead>
            <tbody>
              {quemUsaOQue.map((q) => (
                <tr key={q.pessoa} className="border-b border-light-border/50 dark:border-dark-border/50">
                  <td className="py-3 px-4 font-medium">{q.pessoa}</td>
                  <td className="py-3 px-4 text-light-muted dark:text-dark-muted">{q.acao}</td>
                  <td className="py-3 px-4 text-accent">{q.ferramenta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Regra de Ouro */}
      <section className="bg-yellow-500/10 rounded-xl p-8 border-2 border-yellow-500/50 text-center">
        <h2 className="text-2xl font-bold mb-4">⚡ A Regra de Ouro</h2>

        <p className="text-2xl font-bold mb-4">
          Todo link passa pelo Tracking Hub.
        </p>

        <p className="text-lg text-light-muted dark:text-dark-muted mb-6">
          Sem exceção.
        </p>

        <p className="text-sm text-light-muted dark:text-dark-muted">
          Link criado "na mão" = lead sem origem = impossível saber o que funcionou.
        </p>
      </section>

      {/* O que fica registrado */}
      <section className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border">
        <h2 className="text-xl font-semibold mb-4">O que fica registrado automaticamente?</h2>

        <div className="space-y-3">
          <p className="text-light-muted dark:text-dark-muted">
            Quando alguém preenche um formulário nas nossas iscas:
          </p>

          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              <span>De onde veio (última vez) - <strong>Last Touch</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>De onde veio (primeira vez) - <strong>First Touch</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>ID do anúncio do Facebook (se veio de ads)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>ID do anúncio do Google (se veio de ads)</span>
            </li>
          </ul>

          <p className="text-sm text-light-muted dark:text-dark-muted mt-4">
            Tudo isso <strong>sem precisar fazer nada manual</strong> - o sistema captura automaticamente.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Próximos passos</h2>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            🔗 Gerar Link Agora
          </Link>

          <Link
            href="/overview"
            className="px-6 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg font-medium hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
          >
            📊 Ver Sistema de Iscas
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-xs text-light-muted dark:text-dark-muted pt-8 border-t border-light-border dark:border-dark-border">
        <p>Sistema de Tracking v2.1 | Academia Lendária</p>
        <p className="mt-1">"Todo link passa pelo Tracking Hub. Sem exceção."</p>
      </div>
    </div>
  )
}
