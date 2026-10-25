import type { Metadata } from 'next';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';
import CurrencyConverter from '@/components/CurrencyConverter';
import { ToolStructuredData } from '@/components/StructuredData';
import ToolGuide from '@/components/ToolGuide';
import { pageGuides } from '@/lib/guides.mjs';

export const metadata:Metadata={title:'Döviz Çevirici ve Referans Kur Hesabı',description:'ECB referans verilerine dayalı ücretsiz döviz çevirici; kur tarihi, alınma zamanı, kaynak ve hesaplama yöntemiyle birlikte.',alternates:{canonical:'/finans/doviz-cevirici'},openGraph:{title:'Döviz Çevirici ve Referans Kur Hesabı',description:'Kaynağı ve veri tarihi açık referans kur hesaplayıcı.',url:'/finans/doviz-cevirici',type:'website'}};
const breadcrumbs:BreadcrumbItem[]=[{label:'Ana sayfa',href:'/'},{label:'Finans',href:'/finans'},{label:'Döviz çevirici'}];
export default function Page(){return <main id="ana-icerik" className="container section"><ToolStructuredData name="Döviz Çevirici" description="ECB referans verilerine dayalı, kur tarihi ve kaynağı görünür döviz dönüşüm aracı." path="/finans/doviz-cevirici" category="FinanceApplication" breadcrumbs={breadcrumbs}/><Breadcrumbs items={breadcrumbs}/><div className="pageHeader"><span className="eyebrow">DÖVİZ</span><h1>Döviz çevirici</h1><p className="intro">Avrupa Merkez Bankası referans verilerini kullanan, güncelleme tarihi görünür kur hesaplayıcı.</p></div><CurrencyConverter/><ToolGuide guide={pageGuides.doviz}/></main>}
