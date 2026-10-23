'use client';
import { useState } from 'react';
import { ageOn, daysBetween, depositInterest, loanSchedule, monthlyLoanPayment, percentOf, percentageChange, vatExclusive, vatInclusive } from '@/lib/calculations.mjs';
import type { ToolSlug } from '@/lib/tools';
const money=(v:number)=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:2}).format(v);
const num=(v:number)=>new Intl.NumberFormat('tr-TR',{maximumFractionDigits:2}).format(v);
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
function Field({label,value,onChange,type='number',step='any'}:{label:string;value:string;onChange:(v:string)=>void;type?:string;step?:string}) {return <label className="field"><span>{label}</span><input type={type} step={step} inputMode={type==='number'?'decimal':undefined} value={value} onChange={e=>onChange(e.target.value)} /></label>}
export default function Calculator({slug}:{slug:ToolSlug}) {
  const [a,setA]=useState('1000'),[b,setB]=useState('20'),[c,setC]=useState('12');
  const [start,setStart]=useState('2000-01-01'),[end,setEnd]=useState(today());
  const [mode,setMode]=useState('normal');
  const n=(v:string)=>v.trim()===''?NaN:Number(v);
  const valid=(...values:number[])=>values.every(v=>Number.isFinite(v)&&v>=0);
  let result: {label:string;value:string}[]=[]; let error='';
  let schedule: ReturnType<typeof loanSchedule> = null;
  if(slug==='yuzde-hesaplama') {
    if(!valid(n(a),n(b))) error='Geçerli, negatif olmayan değerler girin.';
    else if(mode==='change') {const r=percentageChange(n(a),n(b)); if(r===null) error='Başlangıç değeri sıfır olamaz.'; else result=[{label:'Değişim',value:`%${num(r)}`}];}
    else result=[{label:'Yüzde tutarı',value:money(percentOf(n(a),n(b)))}];
  } else if(slug==='kdv-hesaplama') {
    if(!valid(n(a),n(b))) error='Tutar ve KDV oranı geçerli olmalı.';
    else if(mode==='included'){const r=vatInclusive(n(a),n(b));result=[{label:'KDV hariç',value:money(r.base)},{label:'KDV tutarı',value:money(r.vat)}]}
    else {const r=vatExclusive(n(a),n(b));result=[{label:'KDV tutarı',value:money(r.vat)},{label:'KDV dahil',value:money(r.total)}]}
  } else if(slug==='kredi-hesaplama') {
    const r=monthlyLoanPayment(n(a),n(b),n(c));
    if(r===null || !Number.isFinite(r)) error='Kredi pozitif, aylık faiz negatif olmayan ve vade tam sayı olmalı.';
    else {schedule=loanSchedule(n(a),n(b),n(c));const total=schedule?.reduce((sum,row)=>sum+row.payment,0)??r*n(c);result=[{label:'Aylık taksit',value:money(r)},{label:'Toplam taksit',value:money(total)},{label:'Faiz farkı',value:money(total-n(a))}];}
  } else if(slug==='mevduat-hesaplama') {
    const r=depositInterest(n(a),n(b),n(c),n(mode));
    if(!r || !Object.values(r).every(Number.isFinite)) error='Geçerli tutar, oran, gün ve 0–100 arasında stopaj girin.';
    else result=[{label:'Brüt getiri',value:money(r.gross)},{label:'Stopaj',value:money(r.tax)},{label:'Net getiri',value:money(r.net)},{label:'Vade sonu',value:money(r.maturity)}];
  } else if(slug==='yas-hesaplama') {
    const r=ageOn(start,end);if(r===null) error='Doğum tarihi geçerli ve hesaplama tarihinden önce olmalı.';
    else result=[{label:'Yaş',value:`${r} yıl`}];
  } else if(slug==='tarih-farki-hesaplama') {
    const r=daysBetween(start,end);if(r===null) error='İki geçerli tarih seçin.';
    else result=[{label:'Gün farkı',value:`${num(r)} gün`},{label:'Mutlak gün farkı',value:`${num(Math.abs(r))} gün`}];
  }
  return <div className="calculator">
    {slug==='yuzde-hesaplama' && <><div className="toggle"><button className={mode==='normal'?'active':''} onClick={()=>setMode('normal')}>Yüzdesini bul</button><button className={mode==='change'?'active':''} onClick={()=>setMode('change')}>Yüzde değişim</button></div><div className="fields"><Field label={mode==='change'?'İlk değer':'Tutar (TL)'} value={a} onChange={setA}/><Field label={mode==='change'?'Son değer':'Yüzde (%)'} value={b} onChange={setB}/></div></>}
    {slug==='kdv-hesaplama' && <><div className="toggle"><button className={mode!=='included'?'active':''} onClick={()=>setMode('normal')}>KDV hariç tutar</button><button className={mode==='included'?'active':''} onClick={()=>setMode('included')}>KDV dahil tutar</button></div><div className="fields"><Field label="Tutar (TL)" value={a} onChange={setA}/><Field label="KDV oranı (%)" value={b} onChange={setB}/></div></>}
    {slug==='kredi-hesaplama' && <div className="fields"><Field label="Kredi tutarı (TL)" value={a} onChange={setA}/><Field label="Aylık faiz (%)" value={b} onChange={setB}/><Field label="Vade (ay)" value={c} onChange={setC} step="1"/></div>}
    {slug==='mevduat-hesaplama' && <><div className="fields"><Field label="Anapara (TL)" value={a} onChange={setA}/><Field label="Yıllık faiz (%)" value={b} onChange={setB}/><Field label="Vade (gün)" value={c} onChange={setC}/></div><Field label="Stopaj (%) — kullanıcı girdisi" value={mode==='normal'?'0':mode} onChange={setMode}/></>}
    {(slug==='yas-hesaplama'||slug==='tarih-farki-hesaplama') && <div className="fields"><Field label={slug==='yas-hesaplama'?'Doğum tarihi':'Başlangıç tarihi'} type="date" value={start} onChange={setStart}/><Field label="Hesaplama / bitiş tarihi" type="date" value={end} onChange={setEnd}/></div>}
    <div className="results" aria-live="polite">{error?<p className="error">{error}</p>:result.map(r=><div className="result" key={r.label}><span>{r.label}</span><strong>{r.value}</strong></div>)}</div>
    {schedule && <details className="schedule"><summary>Ödeme planını göster ({schedule.length} ay)</summary><div className="tableWrap"><table><thead><tr><th>Ay</th><th>Taksit</th><th>Anapara</th><th>Faiz</th><th>Kalan</th></tr></thead><tbody>{schedule.map(row=><tr key={row.month}><td>{row.month}</td><td>{money(row.payment)}</td><td>{money(row.principal)}</td><td>{money(row.interest)}</td><td>{money(row.balance)}</td></tr>)}</tbody></table></div></details>}
    {(slug==='kredi-hesaplama'||slug==='mevduat-hesaplama')&&<p className="fine">Bu hesaplama bilgilendirme amaçlıdır; banka teklifi değildir. Kredi masrafları, vergiler ve sigorta dahil değildir. Mevduatta stopaj oranını kendiniz belirleyin.</p>}
  </div>;
}
