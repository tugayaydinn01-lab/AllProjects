import type { Metadata } from 'next';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';
import CalendarTool from '@/components/CalendarTool';
import { ToolStructuredData } from '@/components/StructuredData';
import ToolGuide from '@/components/ToolGuide';
import { pageGuides } from '@/lib/guides.mjs';

export const metadata:Metadata={title:'Ücretsiz Aylık Takvim',description:'Aylar arasında gezinebileceğin mobil uyumlu takvim; bugünü vurgular ve gün sayacına hızlı geçiş sunar.',alternates:{canonical:'/gunluk-yasam/takvim'},openGraph:{title:'Ücretsiz Aylık Takvim',description:'Mobil uyumlu aylık takvim ve gün sayacı bağlantısı.',url:'/gunluk-yasam/takvim',type:'website'}};
const breadcrumbs:BreadcrumbItem[]=[{label:'Ana sayfa',href:'/'},{label:'Günlük yaşam',href:'/gunluk-yasam'},{label:'Takvim'}];
export default function Page(){return <main id="ana-icerik" className="container narrow section"><ToolStructuredData name="Aylık Takvim" description="Aylar arasında gezinmeyi ve bugünü bulmayı sağlayan ücretsiz takvim." path="/gunluk-yasam/takvim" category="UtilitiesApplication" breadcrumbs={breadcrumbs}/><Breadcrumbs items={breadcrumbs}/><div className="pageHeader"><span className="eyebrow">PLANLA</span><h1>Aylık takvim</h1><p className="intro">Aylar arasında gezin, bugünü kolayca bul. Gün hesabı için ayrı gün sayacını kullan.</p></div><CalendarTool/><ToolGuide guide={pageGuides.takvim}/></main>}
