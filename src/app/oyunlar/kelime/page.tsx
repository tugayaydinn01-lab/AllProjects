import type { Metadata } from 'next';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';
import { ToolStructuredData } from '@/components/StructuredData';
import ToolGuide from '@/components/ToolGuide';
import WordGame from '@/components/games/WordGame';
import { istanbulDateKey } from '@/lib/date';
import { pageGuides } from '@/lib/guides.mjs';

export const metadata:Metadata={title:'Günlük 5 Harfli Türkçe Kelime Oyunu',description:'Altı denemede günün beş harfli Türkçe kelimesini bul; renk ipuçlarının ve tekrarlanan harflerin nasıl puanlandığını öğren.',alternates:{canonical:'/oyunlar/kelime'},openGraph:{title:'Günlük 5 Harfli Türkçe Kelime Oyunu',description:'Her gün yenilenen ücretsiz Türkçe kelime bulmacası.',url:'/oyunlar/kelime',type:'website'}};
export const revalidate=3600;
const breadcrumbs:BreadcrumbItem[]=[{label:'Ana sayfa',href:'/'},{label:'Oyunlar',href:'/oyunlar'},{label:'Günlük kelime'}];
export default function Page(){return <main id="ana-icerik" className="container narrow section"><ToolStructuredData name="Günlük Beş Harfli Kelime" description="Altı denemeli, her gün yenilenen Türkçe kelime bulmacası." path="/oyunlar/kelime" category="GameApplication" breadcrumbs={breadcrumbs}/><Breadcrumbs items={breadcrumbs}/><div className="pageHeader"><span className="eyebrow">GÜNLÜK BULMACA</span><h1>Beş harfli kelime</h1><p className="intro">Altı denemede günün Türkçe kelimesini bul. Yeşil doğru yeri, sarı kelimede bulunan farklı yeri gösterir.</p></div><WordGame dateKey={istanbulDateKey()}/><ToolGuide guide={pageGuides.kelime}/></main>}
