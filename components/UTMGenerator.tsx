'use client'

import { useState, useEffect } from 'react'
import { baseUrls } from '@/data/urls'
import { sourceCategories, sourceMediumMap, getAllSources } from '@/data/sources'
import { mediums } from '@/data/mediums'
import { campaignCategories } from '@/data/campaigns'
import { contentCategories } from '@/data/contents'
import { termCategories } from '@/data/terms'
import { buildUTMUrl } from '@/lib/utm-builder'
import { addToHistory } from '@/lib/storage'
import { CopyButton } from './CopyButton'
import { QRCodeDisplay } from './QRCodeDisplay'
import { CreateShortLinkModal } from './CreateShortLinkModal'

export function UTMGenerator() {
  // Form state
  const [baseUrl, setBaseUrl] = useState('')
  const [customUrl, setCustomUrl] = useState('')
  const [source, setSource] = useState('')
  const [customSource, setCustomSource] = useState('')
  const [medium, setMedium] = useState('')
  const [customMedium, setCustomMedium] = useState('')
  const [campaign, setCampaign] = useState('')
  const [customCampaign, setCustomCampaign] = useState('')
  const [content, setContent] = useState('')
  const [customContent, setCustomContent] = useState('')
  const [term, setTerm] = useState('')
  const [customTerm, setCustomTerm] = useState('')

  // UI state
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showShortLinkModal, setShowShortLinkModal] = useState(false)

  // Get final values
  const finalUrl = baseUrl === 'custom' ? customUrl : baseUrl
  const finalSource = source === 'custom' ? customSource : source
  const finalMedium = medium === 'custom' ? customMedium : medium
  const finalCampaign = campaign === 'custom' ? customCampaign : campaign
  const finalContent = content === 'custom' ? customContent : content
  const finalTerm = term === 'custom' ? customTerm : term

  // Get available mediums based on source
  const availableMediums = finalSource && sourceMediumMap[finalSource]
    ? mediums.filter(m => sourceMediumMap[finalSource].includes(m.value))
    : mediums

  // Generate URL whenever inputs change
  useEffect(() => {
    if (finalUrl && finalSource && finalMedium && finalCampaign) {
      const url = buildUTMUrl({
        baseUrl: finalUrl,
        source: finalSource,
        medium: finalMedium,
        campaign: finalCampaign,
        content: finalContent || undefined,
        term: finalTerm || undefined,
      })
      setGeneratedUrl(url)
    } else {
      setGeneratedUrl('')
    }
  }, [finalUrl, finalSource, finalMedium, finalCampaign, finalContent, finalTerm])

  // Copy handler
  const handleCopy = async () => {
    if (!generatedUrl) return
    try {
      await navigator.clipboard.writeText(generatedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Save handler
  const handleSave = () => {
    if (!generatedUrl) return
    addToHistory({
      url: generatedUrl,
      baseUrl: finalUrl,
      source: finalSource,
      medium: finalMedium,
      campaign: finalCampaign,
      content: finalContent || undefined,
      term: finalTerm || undefined,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Check if form is complete
  const isComplete = finalUrl && finalSource && finalMedium && finalCampaign

  return (
    <div className="space-y-6">
      {/* STEP 1: Destino */}
      <div className="bg-light-card dark:bg-dark-card rounded-2xl p-5 border border-light-border dark:border-dark-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-accent text-accent-contrast flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h3 className="font-semibold">Para onde vai o link?</h3>
            <p className="text-sm text-light-muted dark:text-dark-muted">Escolha a página de destino</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
          {baseUrls.map((url) => (
            <button
              key={url.id}
              onClick={() => { setBaseUrl(url.url); setCustomUrl(''); }}
              className={`p-3 rounded-xl text-left transition-all border-2 ${
                baseUrl === url.url
                  ? 'border-accent bg-accent/10'
                  : 'border-transparent bg-light-bg dark:bg-dark-bg hover:border-light-border dark:hover:border-dark-border'
              }`}
            >
              <div className="font-medium text-sm">{url.label}</div>
              <div className="text-xs text-light-muted dark:text-dark-muted truncate">{url.url.replace('https://', '')}</div>
            </button>
          ))}
          <button
            onClick={() => setBaseUrl('custom')}
            className={`p-3 rounded-xl text-left transition-all border-2 ${
              baseUrl === 'custom'
                ? 'border-accent bg-accent/10'
                : 'border-transparent bg-light-bg dark:bg-dark-bg hover:border-light-border dark:hover:border-dark-border'
            }`}
          >
            <div className="font-medium text-sm">🔗 Outro link</div>
            <div className="text-xs text-light-muted dark:text-dark-muted">Live, palestra, etc</div>
          </button>
        </div>

        {baseUrl === 'custom' && (
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://exemplo.com/pagina"
            className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border focus:border-accent outline-none"
          />
        )}
      </div>

      {/* STEP 2: Source */}
      <div className={`bg-light-card dark:bg-dark-card rounded-2xl p-5 border border-light-border dark:border-dark-border transition-opacity ${!finalUrl ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${finalUrl ? 'bg-accent text-accent-contrast' : 'bg-light-border dark:bg-dark-border'}`}>
            2
          </div>
          <div>
            <h3 className="font-semibold">De onde vem o tráfego?</h3>
            <p className="text-sm text-light-muted dark:text-dark-muted">Selecione a origem do clique</p>
          </div>
        </div>

        <div className="space-y-4">
          {sourceCategories.slice(0, 6).map((category) => (
            <div key={category.id}>
              <div className="text-xs font-medium text-light-muted dark:text-dark-muted mb-2">
                {category.icon} {category.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.sources.slice(0, 6).map((s) => (
                  <button
                    key={s.value}
                    onClick={() => { setSource(s.value); setCustomSource(''); setMedium(''); }}
                    className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                      source === s.value
                        ? 'border-accent bg-accent/10 text-accent font-medium'
                        : 'border-light-border dark:border-dark-border hover:border-accent/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Custom source */}
          <div>
            <div className="text-xs font-medium text-light-muted dark:text-dark-muted mb-2">
              ✏️ Outro
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSource('custom')}
                className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                  source === 'custom'
                    ? 'border-accent bg-accent/10 text-accent font-medium'
                    : 'border-light-border dark:border-dark-border hover:border-accent/50'
                }`}
              >
                Personalizado
              </button>
              {source === 'custom' && (
                <input
                  type="text"
                  value={customSource}
                  onChange={(e) => setCustomSource(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="nome-da-fonte"
                  className="flex-1 px-3 py-2 rounded-lg text-sm bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:border-accent outline-none"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3: Medium */}
      <div className={`bg-light-card dark:bg-dark-card rounded-2xl p-5 border border-light-border dark:border-dark-border transition-opacity ${!finalSource ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${finalSource ? 'bg-accent text-accent-contrast' : 'bg-light-border dark:bg-dark-border'}`}>
            3
          </div>
          <div>
            <h3 className="font-semibold">Qual o tipo de mídia?</h3>
            <p className="text-sm text-light-muted dark:text-dark-muted">Como o tráfego está chegando</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {availableMediums.slice(0, 12).map((m) => (
            <button
              key={m.value}
              onClick={() => { setMedium(m.value); setCustomMedium(''); }}
              className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                medium === m.value
                  ? 'border-accent bg-accent/10 text-accent font-medium'
                  : 'border-light-border dark:border-dark-border hover:border-accent/50'
              }`}
              title={m.description}
            >
              {m.label}
            </button>
          ))}
          <button
            onClick={() => setMedium('custom')}
            className={`px-3 py-2 rounded-lg text-sm transition-all border ${
              medium === 'custom'
                ? 'border-accent bg-accent/10 text-accent font-medium'
                : 'border-light-border dark:border-dark-border hover:border-accent/50'
            }`}
          >
            Outro...
          </button>
        </div>

        {medium === 'custom' && (
          <input
            type="text"
            value={customMedium}
            onChange={(e) => setCustomMedium(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            placeholder="tipo-de-midia"
            className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border focus:border-accent outline-none"
          />
        )}
      </div>

      {/* STEP 4: Campaign */}
      <div className={`bg-light-card dark:bg-dark-card rounded-2xl p-5 border border-light-border dark:border-dark-border transition-opacity ${!finalMedium ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${finalMedium ? 'bg-accent text-accent-contrast' : 'bg-light-border dark:bg-dark-border'}`}>
            4
          </div>
          <div>
            <h3 className="font-semibold">Qual a campanha?</h3>
            <p className="text-sm text-light-muted dark:text-dark-muted">Nome que identifica a ação</p>
          </div>
        </div>

        <div className="space-y-3">
          {campaignCategories.slice(0, 4).map((cat) => (
            <div key={cat.id}>
              <div className="text-xs font-medium text-light-muted dark:text-dark-muted mb-2">{cat.label}</div>
              <div className="flex flex-wrap gap-2">
                {cat.campaigns.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => { setCampaign(c.value); setCustomCampaign(''); }}
                    className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                      campaign === c.value
                        ? 'border-accent bg-accent/10 text-accent font-medium'
                        : 'border-light-border dark:border-dark-border hover:border-accent/50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Custom campaign */}
          <div className="pt-2">
            <button
              onClick={() => setCampaign('custom')}
              className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                campaign === 'custom'
                  ? 'border-accent bg-accent/10 text-accent font-medium'
                  : 'border-light-border dark:border-dark-border hover:border-accent/50'
              }`}
            >
              ✏️ Campanha personalizada
            </button>
            {campaign === 'custom' && (
              <input
                type="text"
                value={customCampaign}
                onChange={(e) => setCustomCampaign(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="nome-da-campanha"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border focus:border-accent outline-none"
              />
            )}
          </div>
        </div>
      </div>

      {/* STEP 5: Content + Term (Optional) */}
      <div className={`bg-light-card dark:bg-dark-card rounded-2xl p-5 border border-light-border dark:border-dark-border transition-opacity ${!finalCampaign ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${finalCampaign ? 'bg-green-500 text-white' : 'bg-light-border dark:bg-dark-border'}`}>
            5
          </div>
          <div>
            <h3 className="font-semibold">Detalhes extras <span className="text-light-muted dark:text-dark-muted font-normal">(opcional)</span></h3>
            <p className="text-sm text-light-muted dark:text-dark-muted">Para rastrear variações específicas</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Content */}
          <div>
            <label className="block text-xs font-medium text-light-muted dark:text-dark-muted mb-2">
              Content (ex: número do email, variação do criativo)
            </label>
            <select
              value={content}
              onChange={(e) => { setContent(e.target.value); setCustomContent(''); }}
              className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:border-accent outline-none text-sm"
            >
              <option value="">Nenhum</option>
              {contentCategories.map((cat) => (
                <optgroup key={cat.id} label={cat.label}>
                  {cat.contents.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </optgroup>
              ))}
              <option value="custom">Personalizado...</option>
            </select>
            {content === 'custom' && (
              <input
                type="text"
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="identificador"
                className="w-full mt-2 px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:border-accent outline-none text-sm"
              />
            )}
          </div>

          {/* Term */}
          <div>
            <label className="block text-xs font-medium text-light-muted dark:text-dark-muted mb-2">
              Term (ex: público alvo, keyword)
            </label>
            <select
              value={term}
              onChange={(e) => { setTerm(e.target.value); setCustomTerm(''); }}
              className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:border-accent outline-none text-sm"
            >
              <option value="">Nenhum</option>
              {termCategories.map((cat) => (
                <optgroup key={cat.id} label={cat.label}>
                  {cat.terms.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </optgroup>
              ))}
              <option value="custom">Personalizado...</option>
            </select>
            {term === 'custom' && (
              <input
                type="text"
                value={customTerm}
                onChange={(e) => setCustomTerm(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="termo"
                className="w-full mt-2 px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border focus:border-accent outline-none text-sm"
              />
            )}
          </div>
        </div>
      </div>

      {/* RESULT */}
      {isComplete && generatedUrl && (
        <div className="bg-gradient-to-br from-accent/20 to-green-500/20 rounded-2xl p-5 border-2 border-accent/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">✅</span>
            <h3 className="font-bold text-lg">Link Pronto!</h3>
          </div>

          <div className="bg-light-bg dark:bg-dark-bg rounded-xl p-4 mb-4">
            <code className="text-sm break-all block">{generatedUrl}</code>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-accent text-accent-contrast hover:bg-accent-hover'
              }`}
            >
              {copied ? '✓ Copiado!' : '📋 Copiar Link'}
            </button>

            <button
              onClick={() => setShowShortLinkModal(true)}
              className="px-4 py-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-all font-medium"
            >
              ✂️ Link Curto
            </button>

            <button
              onClick={() => setShowQR(!showQR)}
              className="px-4 py-3 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent transition-all"
            >
              📱 QR Code
            </button>

            <button
              onClick={handleSave}
              className={`px-4 py-3 rounded-xl transition-all ${
                saved
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-accent'
              }`}
            >
              {saved ? '✓ Salvo!' : '💾 Salvar'}
            </button>
          </div>

          {showQR && (
            <div className="mt-4">
              <QRCodeDisplay url={generatedUrl} />
            </div>
          )}
        </div>
      )}

      {/* Helper text when incomplete */}
      {!isComplete && (
        <div className="text-center py-8 text-light-muted dark:text-dark-muted">
          <p className="text-lg mb-2">👆 Preencha os campos acima</p>
          <p className="text-sm">O link será gerado automaticamente</p>
        </div>
      )}

      {/* Short Link Modal */}
      <CreateShortLinkModal
        isOpen={showShortLinkModal}
        onClose={() => setShowShortLinkModal(false)}
        linkData={{
          url: generatedUrl,
          baseUrl: finalUrl,
          source: finalSource,
          medium: finalMedium,
          campaign: finalCampaign,
          content: finalContent || undefined,
          term: finalTerm || undefined,
        }}
      />
    </div>
  )
}
