'use client';

import { useState } from 'react';

type GoldData = { ounceTry: number; gramTry: number; observedAt: string; fetchedAt: string; source: string };

export default function GoldPrices() {
  const [data,setData]=useState<GoldData|null>(null);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  async function load(){setLoading(true);setError('');setData(null);try{const response=await fetch('/api/altin');const body=await response.json();if(!response.ok)throw new Error(body.error||'Altın verisi alınamadı.');setData(body);}catch(reason){setError(reason instanceof Error?reason.message:'Altın verisi alınamadı.');}finally{setLoading(false);}}
  const money=(value:number)=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:2}).format(value);
  return <div className="dataPanel"><button className="primaryButton" type="button" onClick={load} disabled={loading}>{loading?'Güncel veri alınıyor…':'Güncel altın fiyatını getir'}</button>{error&&<div className="dataError" role="alert"><strong>Canlı fiyat gösterilemiyor.</strong><p>{error}</p><p>Herhangi bir tahmini veya sahte fiyat kullanılmadı.</p></div>}{data&&<><div className="marketGrid"><div><span>Ons altın / TRY</span><strong>{money(data.ounceTry)}</strong></div><div><span>Gram karşılığı</span><strong>{money(data.gramTry)}</strong><small>Ons fiyatının 31,1034768 grama bölünmesiyle hesaplanır.</small></div></div><p className="sourceNote">Veri zamanı: <strong>{new Date(data.observedAt).toLocaleString('tr-TR')}</strong> · Alınma zamanı: {new Date(data.fetchedAt).toLocaleString('tr-TR')} · Kaynak: {data.source}</p></>}</div>;
}
