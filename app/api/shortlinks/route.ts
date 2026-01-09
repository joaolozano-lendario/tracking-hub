import { NextRequest, NextResponse } from 'next/server'
import { createShortLink, listShortLinks, deleteShortLink } from '@/lib/shortlinks'

// GET - Listar todos os links
export async function GET() {
  try {
    const links = await listShortLinks()
    return NextResponse.json({ links })
  } catch (error) {
    console.error('Erro ao listar links:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// POST - Criar novo link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar campos obrigatórios
    if (!body.slug || !body.url || !body.destination || !body.source || !body.medium || !body.campaign) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    // Validar formato do slug
    if (!/^[a-z0-9-]+$/.test(body.slug)) {
      return NextResponse.json({ error: 'Slug deve conter apenas letras minúsculas, números e hífens' }, { status: 400 })
    }

    const result = await createShortLink({
      slug: body.slug,
      url: body.url,
      destination: body.destination,
      source: body.source,
      medium: body.medium,
      campaign: body.campaign,
      content: body.content,
      term: body.term,
      createdBy: body.createdBy,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao criar link:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// DELETE - Deletar link
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug não informado' }, { status: 400 })
    }

    const success = await deleteShortLink(slug)

    if (!success) {
      return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar link:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
