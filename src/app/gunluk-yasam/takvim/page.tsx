import type { Metadata } from 'next';
import Link from 'next/link';
import CalendarTool from '@/components/CalendarTool';
export const metadata:Metadata={title:'Aylık Takvim',description:'Mobil uyumlu ücretsiz aylık takvim; aylar arasında kolayca gezin.',alternates:{canonical:'/gunluk-yasam/takvim'}};
export default function Page(){return <main id="ana-icerik" className="container narrow section"><div className="breadcrumb"><Link href="/">Ana sayfa</Link> / <Link href="/gunluk-yasam">Günlük yaşam</Link> / Takvim</div><div className="pageHeader"><span className="eyebrow">PLANLA</span><h1>Aylık takvim</h1><p className="intro">Aylar arasında gezin, bugünü kolayca bul. Gün hesabı için ayrı gün sayacını kullan.</p></div><CalendarTool/><Link className="cta" href="/hesaplama/tarih-farki-hesaplama">Gün sayacını aç →</Link></main>}
