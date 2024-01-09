import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { supabase } from '@/services/supabase.conect';

const NEXT_LINK = process.env.NEXT_LINK

export async function POST(req: Request) {
  try {
    const { originalLink } = await req.json()
    const shortId = nanoid(6) // Se puede ajustar la longitud del identificador

    const { data: dataSelect, error: errorSelect } = await supabase
      .from('TEMPORARY_PUBLIC_SHORTENER')
      .select()
      .eq('original_link', originalLink)
      .maybeSingle()

    if (errorSelect) throw new Error()

    if (dataSelect) return NextResponse.json({ message: 'El enlace ya se encuentra acortado, en hora buena!', ...dataSelect })

    const shortenedLink = NEXT_LINK + 'prl?id=' + shortId

    const { data: dataUpsert, error: errorInsert } = await supabase
      .from('TEMPORARY_PUBLIC_SHORTENER')
      .upsert({ original_link: originalLink, link_shortened: shortenedLink, shortId })
      .select()
      .maybeSingle()

    if (errorInsert) throw new Error()

    return NextResponse.json({ message: 'El enlace ya se encuentra acortado, en hora buena!', ...dataUpsert })
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}
