import { NextRequest, NextResponse } from 'next/server';

const currencies = new Set(['TRY','USD','EUR','GBP','CHF','JPY']);
export async function GET(request: NextRequest) {
  const base=(request.nextUrl.searchParams.get('base')||'TRY').toUpperCase();
  const quote=(request.nextUrl.searchParams.get('quote')||'USD').toUpperCase();
  if(!currencies.has(base)||!currencies.has(quote)) return NextResponse.json({error:'Desteklenmeyen para birimi.'},{status:400});
  if(base===quote) return NextResponse.json({rate:1,date:new Date().toISOString().slice(0,10),fetchedAt:new Date().toISOString(),source:'HerGün'});
  try {
    const response=await fetch(`https://api.frankfurter.app/latest?from=${base}&to=${quote}`,{next:{revalidate:3600}});
    if(!response.ok) throw new Error(`Sağlayıcı ${response.status} yanıtı verdi.`);
    const body=await response.json() as {rates?:Record<string,number>;date?:string};const rate=body.rates?.[quote];
    if(typeof rate!=='number'||!Number.isFinite(rate)||!body.date) throw new Error('Sağlayıcı geçerli kur döndürmedi.');
    return NextResponse.json({rate,date:body.date,fetchedAt:new Date().toISOString(),source:'Frankfurter / Avrupa Merkez Bankası'});
  } catch(reason) {return NextResponse.json({error:reason instanceof Error?reason.message:'Kur servisine ulaşılamadı.'},{status:503});}
}
