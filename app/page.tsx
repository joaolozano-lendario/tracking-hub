import { UTMGenerator } from '@/components/UTMGenerator'

export default function Home() {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">🔗 Gerador de Links</h1>
        <p className="text-light-muted dark:text-dark-muted max-w-lg mx-auto">
          Crie links rastreáveis em segundos.
          Selecione as opções abaixo e copie o link gerado.
        </p>
      </div>

      <UTMGenerator />
    </div>
  )
}
