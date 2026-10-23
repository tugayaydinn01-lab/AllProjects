import type { Metadata } from 'next';
import Link from 'next/link';
import WordGame from '@/components/games/WordGame';
import { istanbulDateKey } from '@/lib/date';
export const metadata:Metadata={title:'Günlük 5 Harfli Türkçe Kelime Oyunu',description:'Günün beş harfli Türkçe kelimesini altı denemede bul.',alternates:{canonical:'/oyunlar/kelime'}};
export const revalidate=3600;
export default function Page(){return <main id="ana-icerik" className="container narrow section"><div className="breadcrumb"><Link href="/">Ana sayfa</Link> / <Link href="/oyunlar">Oyunlar</Link> / Günlük kelime</div><div className="pageHeader"><span className="eyebrow">GÜNLÜK BULMACA</span><h1>Beş harfli kelime</h1><p className="intro">Altı denemede günün Türkçe kelimesini bul. Yeşil doğru yeri, sarı kelimede bulunan farklı yeri gösterir.</p></div><WordGame dateKey={istanbulDateKey()}/></main>}
