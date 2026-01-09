import { NextRequest, NextResponse } from 'next/server'
import { getShortLink, incrementClicks } from '@/lib/shortlinks'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const link = await getShortLink(slug)

    if (!link) {
      // Redirect para home se não encontrar
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Incrementar contador de clicks (fire and forget)
    incrementClicks(slug).catch(console.error)

    // Redirect 302 (temporário) para a URL de destino
    return NextResponse.redirect(link.url, { status: 302 })
  } catch (error) {
    console.error('Erro no redirect:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}
