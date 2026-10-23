import type { Metadata } from 'next';
import Link from 'next/link';
import QuizGame from '@/components/games/QuizGame';
import { istanbulDateKey } from '@/lib/date';
export const metadata:Metadata={title:'Günlük Bilgi Yarışması',description:'Her gün beş Türkçe genel kültür sorusunu yanıtla.',alternates:{canonical:'/oyunlar/bilgi-yarismasi'}};
export const revalidate=3600;
export default function Page(){return <main id="ana-icerik" className="container narrow section"><div className="breadcrumb"><Link href="/">Ana sayfa</Link> / <Link href="/oyunlar">Oyunlar</Link> / Bilgi yarışması</div><div className="pageHeader"><span className="eyebrow">BUGÜN NE KADAR BİLİYORSUN?</span><h1>Günlük bilgi yarışması</h1><p className="intro">Beş soruyu yanıtla ve günlük skorunu gör.</p></div><QuizGame dateKey={istanbulDateKey()}/></main>}
