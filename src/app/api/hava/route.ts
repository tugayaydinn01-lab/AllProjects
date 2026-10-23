import { NextRequest, NextResponse } from 'next/server';

const noStore = { 'Cache-Control': 'no-store' };
export async function GET(request: NextRequest) {
  const city=(request.nextUrl.searchParams.get('city')||'').trim();
  if(city.length<2||city.length>60) return NextResponse.json({error:'Geçerli bir şehir adı girin.'},{status:400,headers:noStore});
  try {
    const geoResponse=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=tr&format=json`,{cache:'no-store',signal:AbortSignal.timeout(8000)});
    if(!geoResponse.ok) throw new Error('Şehir arama servisine ulaşılamadı.');
    const geo=await geoResponse.json() as {results?:Array<{name:string;country:string;latitude:number;longitude:number}>};const location=geo.results?.[0];
    if(!location) return NextResponse.json({error:'Şehir bulunamadı.'},{status:404,headers:noStore});
    const weatherResponse=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`,{cache:'no-store',signal:AbortSignal.timeout(8000)});
    if(!weatherResponse.ok) throw new Error('Hava durumu servisine ulaşılamadı.');
    const weather=await weatherResponse.json() as {current?:{time:string;temperature_2m:number;apparent_temperature:number;relative_humidity_2m:number;wind_speed_10m:number;weather_code:number};utc_offset_seconds?:number};const current=weather.current;
    if(!current) throw new Error('Sağlayıcı güncel ölçüm döndürmedi.');
    const observedAt=new Date(`${current.time}:00Z`);observedAt.setUTCSeconds(observedAt.getUTCSeconds()+(weather.utc_offset_seconds||0)*-1);
    return NextResponse.json({location:location.name,country:location.country,temperature:current.temperature_2m,apparentTemperature:current.apparent_temperature,humidity:current.relative_humidity_2m,windSpeed:current.wind_speed_10m,weatherCode:current.weather_code,observedAt:observedAt.toISOString(),fetchedAt:new Date().toISOString()},{headers:noStore});
  } catch(reason) {console.error('[api/hava] Provider request failed',reason instanceof Error?reason.message:'Unknown error');return NextResponse.json({error:'Hava durumu sağlayıcısına şu anda ulaşılamıyor.'},{status:503,headers:noStore});}
}
