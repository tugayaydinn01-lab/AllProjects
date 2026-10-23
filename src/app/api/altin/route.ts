import { NextResponse } from 'next/server';

const noStore = { 'Cache-Control': 'no-store' };
export async function GET() {
  const key=process.env.GOLD_API_KEY;
  if(!key) return NextResponse.json({error:'Altın fiyatı servisi henüz yapılandırılmadı.'},{status:503,headers:noStore});
  try {
    const response=await fetch('https://www.goldapi.io/api/XAU/TRY',{headers:{'x-access-token':key},cache:'no-store',signal:AbortSignal.timeout(8000)});
    if(!response.ok) throw new Error(`Altın sağlayıcısı ${response.status} yanıtı verdi.`);
    const body=await response.json() as {price?:number;timestamp?:number};
    if(typeof body.price!=='number'||!Number.isFinite(body.price)||typeof body.timestamp!=='number') throw new Error('Sağlayıcı geçerli fiyat döndürmedi.');
    return NextResponse.json({ounceTry:body.price,gramTry:body.price/31.1034768,observedAt:new Date(body.timestamp*1000).toISOString(),fetchedAt:new Date().toISOString(),source:'GoldAPI.io'},{headers:noStore});
  } catch(reason) {console.error('[api/altin] Provider request failed',reason instanceof Error?reason.message:'Unknown error');return NextResponse.json({error:'Altın fiyatı sağlayıcısına şu anda ulaşılamıyor.'},{status:503,headers:noStore});}
}
