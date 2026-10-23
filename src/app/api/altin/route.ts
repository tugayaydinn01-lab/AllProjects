import { NextResponse } from 'next/server';

export async function GET() {
  const key=process.env.GOLD_API_KEY;
  if(!key) return NextResponse.json({error:'Altın veri sağlayıcısı için GOLD_API_KEY henüz yapılandırılmadı.'},{status:503});
  try {
    const response=await fetch('https://www.goldapi.io/api/XAU/TRY',{headers:{'x-access-token':key,'Content-Type':'application/json'},cache:'no-store'});
    if(!response.ok) throw new Error(`Altın sağlayıcısı ${response.status} yanıtı verdi.`);
    const body=await response.json() as {price?:number;timestamp?:number};
    if(typeof body.price!=='number'||!Number.isFinite(body.price)||typeof body.timestamp!=='number') throw new Error('Sağlayıcı geçerli fiyat döndürmedi.');
    return NextResponse.json({ounceTry:body.price,gramTry:body.price/31.1034768,observedAt:new Date(body.timestamp*1000).toISOString(),fetchedAt:new Date().toISOString(),source:'GoldAPI.io'});
  } catch(reason) {return NextResponse.json({error:reason instanceof Error?reason.message:'Altın verisi alınamadı.'},{status:503});}
}
