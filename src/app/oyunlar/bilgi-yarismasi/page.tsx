import type { Metadata } from 'next';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';
import { ToolStructuredData } from '@/components/StructuredData';
import ToolGuide from '@/components/ToolGuide';
import QuizGame from '@/components/games/QuizGame';
import { istanbulDateKey } from '@/lib/date';
import { pageGuides } from '@/lib/guides.mjs';

export const metadata:Metadata={title:'Günlük Ücretsiz Bilgi Yarışması',description:'Her gün beş Türkçe genel kültür sorusu; anında doğru yanıt geri bildirimi ve günlük skor.',alternates:{canonical:'/oyunlar/bilgi-yarismasi'},openGraph:{title:'Günlük Ücretsiz Bilgi Yarışması',description:'Beş soruluk günlük Türkçe genel kültür turu.',url:'/oyunlar/bilgi-yarismasi',type:'website'}};
export const revalidate=3600;
const breadcrumbs:BreadcrumbItem[]=[{label:'Ana sayfa',href:'/'},{label:'Oyunlar',href:'/oyunlar'},{label:'Bilgi yarışması'}];
export default function Page(){return <main id="ana-icerik" className="container narrow section"><ToolStructuredData name="Günlük Bilgi Yarışması" description="Her gün beş Türkçe genel kültür sorusu ve anında skor." path="/oyunlar/bilgi-yarismasi" category="GameApplication" breadcrumbs={breadcrumbs}/><Breadcrumbs items={breadcrumbs}/><div className="pageHeader"><span className="eyebrow">BUGÜN NE KADAR BİLİYORSUN?</span><h1>Günlük bilgi yarışması</h1><p className="intro">Beş soruyu yanıtla ve günlük skorunu gör.</p></div><QuizGame dateKey={istanbulDateKey()}/><ToolGuide guide={pageGuides.quiz}/></main>}
