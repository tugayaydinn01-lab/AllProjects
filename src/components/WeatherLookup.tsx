'use client';

import { FormEvent, useState } from 'react';

type WeatherData = { location: string; country: string; temperature: number; apparentTemperature: number; humidity: number; windSpeed: number; weatherCode: number; observedAt: string; fetchedAt: string };
const weatherText: Record<number,string> = {0:'Açık',1:'Çoğunlukla açık',2:'Parçalı bulutlu',3:'Kapalı',45:'Sisli',48:'Kırağılı sis',51:'Hafif çisenti',53:'Çisenti',55:'Yoğun çisenti',61:'Hafif yağmur',63:'Yağmurlu',65:'Şiddetli yağmur',71:'Hafif kar',73:'Karlı',75:'Yoğun kar',80:'Sağanak',81:'Kuvvetli sağanak',82:'Şiddetli sağanak',95:'Gök gürültülü'};

export default function WeatherLookup() {
  const [city,setCity]=useState('İstanbul');
  const [data,setData]=useState<WeatherData|null>(null);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();setLoading(true);setError('');setData(null);
    try {const response=await fetch(`/api/hava?city=${encodeURIComponent(city)}`);const body=await response.json();if(!response.ok)throw new Error(body.error||'Hava durumu alınamadı.');setData(body);} catch(reason){setError(reason instanceof Error?reason.message:'Hava durumu alınamadı.');} finally {setLoading(false);}
  }

  return <div className="dataPanel"><form className="inlineForm" onSubmit={submit}><label className="field"><span>Şehir</span><input value={city} minLength={2} maxLength={60} onChange={(event)=>setCity(event.target.value)} placeholder="Örn. Ankara" /></label><button className="primaryButton" disabled={loading||city.trim().length<2}>{loading?'Aranıyor…':'Hava durumunu getir'}</button></form>{error&&<div className="dataError" role="alert"><strong>Güncel veri gösterilemiyor.</strong><p>{error}</p></div>}{data&&<div className="weatherResult"><div><span>{data.location}, {data.country}</span><strong>{Math.round(data.temperature)}°</strong><p>{weatherText[data.weatherCode]||'Hava durumu'}</p></div><dl><div><dt>Hissedilen</dt><dd>{Math.round(data.apparentTemperature)}°C</dd></div><div><dt>Nem</dt><dd>%{data.humidity}</dd></div><div><dt>Rüzgâr</dt><dd>{data.windSpeed} km/sa</dd></div></dl></div>}{data&&<p className="sourceNote">Ölçüm zamanı: <strong>{new Date(data.observedAt).toLocaleString('tr-TR')}</strong> · Alınma zamanı: {new Date(data.fetchedAt).toLocaleString('tr-TR')} · <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> verisi</p>}</div>;
}
