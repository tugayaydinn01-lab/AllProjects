'use client';

import { FormEvent, useState } from 'react';

const currencies = ['TRY', 'USD', 'EUR', 'GBP', 'CHF', 'JPY'];
type RateData = { rate: number; date: string; fetchedAt: string; source: string };

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1000');
  const [base, setBase] = useState('TRY');
  const [quote, setQuote] = useState('USD');
  const [data, setData] = useState<RateData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function convert(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setData(null);
    try {
      const response = await fetch(`/api/doviz?base=${base}&quote=${quote}`);
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Kur bilgisi alınamadı.');
      setData(body as RateData);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Kur bilgisi alınamadı.');
    } finally {
      setLoading(false);
    }
  }

  const numericAmount = Number(amount);
  const converted = data && Number.isFinite(numericAmount) && numericAmount >= 0 ? numericAmount * data.rate : null;
  const money = (value: number, currency: string) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency, maximumFractionDigits: currency === 'JPY' ? 0 : 2 }).format(value);

  return <div className="dataPanel"><form onSubmit={convert}><div className="fields"><label className="field"><span>Tutar</span><input type="number" min="0" inputMode="decimal" value={amount} onChange={(event)=>setAmount(event.target.value)} /></label><label className="field"><span>Kaynak para birimi</span><select value={base} onChange={(event)=>{setBase(event.target.value);setData(null);setError('')}}>{currencies.map(currency=><option key={currency}>{currency}</option>)}</select></label><label className="field"><span>Hedef para birimi</span><select value={quote} onChange={(event)=>{setQuote(event.target.value);setData(null);setError('')}}>{currencies.map(currency=><option key={currency}>{currency}</option>)}</select></label></div><button className="primaryButton" type="submit" disabled={loading||!Number.isFinite(numericAmount)||numericAmount<0}>{loading?'Güncel kur alınıyor…':'Dönüştür'}</button></form>{error&&<div className="dataError" role="alert"><strong>Canlı kur gösterilemiyor.</strong><p>{error} Eski veri güncelmiş gibi gösterilmez.</p></div>}{converted!==null&&!loading&&<div className="dataResult"><span>Hesaplanan tutar</span><strong>{money(converted,quote)}</strong><p>1 {base} = {new Intl.NumberFormat('tr-TR',{maximumFractionDigits:6}).format(data!.rate)} {quote}</p></div>}{data&&!loading&&<p className="sourceNote">Veri tarihi: <strong>{data.date}</strong> · Alınma zamanı: {new Date(data.fetchedAt).toLocaleString('tr-TR')} · Kaynak: <a href="https://frankfurter.dev" target="_blank" rel="noreferrer">{data.source}</a></p>}</div>;
}
