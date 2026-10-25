import type { Metadata } from 'next';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';
import { ToolStructuredData } from '@/components/StructuredData';
import ToolGuide from '@/components/ToolGuide';
import WeatherLookup from '@/components/WeatherLookup';
import { pageGuides } from '@/lib/guides.mjs';

export const metadata:Metadata={title:'Şehir Bazlı Güncel Hava Durumu',description:'Şehir adına göre sıcaklık, hissedilen sıcaklık, nem ve rüzgâr; ölçüm zamanı ve Open‑Meteo kaynağıyla birlikte.',alternates:{canonical:'/gunluk-yasam/hava-durumu'},openGraph:{title:'Şehir Bazlı Güncel Hava Durumu',description:'Kaynağı ve ölçüm zamanı görünür şehir hava durumu.',url:'/gunluk-yasam/hava-durumu',type:'website'}};
const breadcrumbs:BreadcrumbItem[]=[{label:'Ana sayfa',href:'/'},{label:'Günlük yaşam',href:'/gunluk-yasam'},{label:'Hava durumu'}];
export default function Page(){return <main id="ana-icerik" className="container section"><ToolStructuredData name="Şehir Hava Durumu" description="Şehir adına göre kaynak ve ölçüm zamanı gösteren hava durumu aracı." path="/gunluk-yasam/hava-durumu" category="WeatherApplication" breadcrumbs={breadcrumbs}/><Breadcrumbs items={breadcrumbs}/><div className="pageHeader"><span className="eyebrow">GÜNCEL HAVA</span><h1>Şehir hava durumu</h1><p className="intro">Şehir adına göre son ölçümü getir. Veri zamanı ve kaynak her sonuçta gösterilir.</p></div><WeatherLookup/><ToolGuide guide={pageGuides.hava}/></main>}
