import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

// Domínio do encurtador
const SHORTENER_DOMAIN = 'go.lendario.ai'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Se for o domínio do encurtador
  if (hostname === SHORTENER_DOMAIN || hostname === `www.${SHORTENER_DOMAIN}`) {
    // Ignora favicon e outros assets
    if (pathname === '/favicon.ico' || pathname.startsWith('/_next')) {
      return NextResponse.next()
    }

    // Pega o slug (remove a barra inicial)
    const slug = pathname.slice(1)

    // Se não tem slug, redireciona pro tracking hub
    if (!slug) {
      return NextResponse.redirect('https://tracking-hub-fawn.vercel.app')
    }

    try {
      // Busca o link no KV
      const link = await kv.get<{ url: string; clicks: number }>(`link:${slug}`)

      if (link) {
        // Incrementa clicks (fire and forget)
        kv.set(`link:${slug}`, { ...link, clicks: (link.clicks || 0) + 1 }).catch(() => {})

        // Redireciona pro destino
        return NextResponse.redirect(link.url, { status: 302 })
      }
    } catch (error) {
      console.error('Erro no middleware:', error)
    }

    // Link não encontrado - redireciona pro tracking hub
    return NextResponse.redirect('https://tracking-hub-fawn.vercel.app')
  }

  // Para outros domínios, segue normal
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Aplica em todas as rotas exceto API e assets
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
