import { supabase } from '@/services/supabase.conect';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // const { searchParams } = new URL(req.url)
    // const id = searchParams.get('id')

    // const { data: dataSelect, error: errorSelect } = await supabase
    // .from('TEMPORARY_PUBLIC_SHORTENER')
    // .select()
    // .eq('shortId', id)
    // .maybeSingle()

    // if (errorSelect || !dataSelect) throw new Error()
    
    const relevantInfo = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      bodyUsed: req.bodyUsed,
      cache: req.cache,
      credentials: req.credentials,
      destination: req.destination,
      integrity: req.integrity,
      keepalive: req.keepalive,
      mode: req.mode,
      redirect: req.redirect,
      referrer: req.referrer,
      referrerPolicy: req.referrerPolicy,
      signal: req.signal
    }
  
    return NextResponse.json({ req: relevantInfo })

    // return NextResponse.redirect(dataSelect.original_link, {
    //   status: 307,
    //   headers: {
    //     'Cache-Control': 'no-store, max-age=0',
    //     'Expires': '0',
    //     'Pragma': 'no-cache',
    //   },
    // });

  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}