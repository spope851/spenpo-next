import { getLinkPreview as fetchData } from '@/app/utils/getLinkPreview'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  // console.log('GET link preview  ', req.query)
  const url = req.nextUrl.searchParams.get('url')

  const lp = await fetchData(String(url))

  return NextResponse.json(lp)
}
