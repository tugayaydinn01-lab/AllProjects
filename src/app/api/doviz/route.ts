import { NextRequest, NextResponse } from 'next/server';

const currencies = new Set(['TRY','USD','EUR','GBP','CHF','JPY']);
const noStore = { 'Cache-Control': 'no-store' };
export async function GET(request: NextRequest) {
  const base=(request.nextUrl.searchParams.get('base')||'TRY').toUpperCase();
  const quote=(request.nextUrl.searchParams.get('quote')||'USD').toUpperCase();
  if(!currencies.has(base)||!currencies.has(quote)) return NextResponse.json({error:'Desteklenmeyen para birimi.'},{status:400,headers:noStore});
  if(base===quote) return NextResponse.json({rate:1,date:new Date().toISOString().slice(0,10),fetchedAt:new Date().toISOString(),source:'HerGün'},{headers:noStore});
  try {
    const response=await fetch(`https://api.frankfurter.app/latest?from=${base}&to=${quote}`,{next:{revalidate:3600},signal:AbortSignal.timeout(8000)});
    if(!response.ok) throw new Error(`Sağlayıcı ${response.status} yanıtı verdi.`);
    const body=await response.json() as {rates?:Record<string,number>;date?:string};const rate=body.rates?.[quote];
    if(typeof rate!=='number'||!Number.isFinite(rate)||!body.date) throw new Error('Sağlayıcı geçerli kur döndürmedi.');
    return NextResponse.json({rate,date:body.date,fetchedAt:new Date().toISOString(),source:'Frankfurter / Avrupa Merkez Bankası'},{headers:noStore});
  } catch(reason) {console.error('[api/doviz] Provider request failed',reason instanceof Error?reason.message:'Unknown error');return NextResponse.json({error:'Kur sağlayıcısına şu anda ulaşılamıyor.'},{status:503,headers:noStore});}
}
