import type { Metadata } from 'next';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';
import GoldPrices from '@/components/GoldPrices';
import { ToolStructuredData } from '@/components/StructuredData';
import ToolGuide from '@/components/ToolGuide';
import { pageGuides } from '@/lib/guides.mjs';

export const metadata:Metadata={title:'Altın Fiyatı ve Gram Karşılığı',description:'Kaynağı ve veri zamanı belirtilen ons altın fiyatı ile formülü açıklanan matematiksel gram karşılığı.',alternates:{canonical:'/finans/altin-fiyatlari'},openGraph:{title:'Altın Fiyatı ve Gram Karşılığı',description:'Kaynak ve veri zamanı görünür altın fiyatı aracı.',url:'/finans/altin-fiyatlari',type:'website'}};
const breadcrumbs:BreadcrumbItem[]=[{label:'Ana sayfa',href:'/'},{label:'Finans',href:'/finans'},{label:'Altın fiyatları'}];
export default function Page(){return <main id="ana-icerik" className="container section"><ToolStructuredData name="Altın Fiyatları" description="Kaynağı ve veri zamanı belirtilen ons altın fiyatı ile matematiksel gram karşılığı." path="/finans/altin-fiyatlari" category="FinanceApplication" breadcrumbs={breadcrumbs}/><Breadcrumbs items={breadcrumbs}/><div className="pageHeader"><span className="eyebrow">ALTIN</span><h1>Altın fiyatları</h1><p className="intro">Canlı veri yalnızca yapılandırılmış sağlayıcıdan alınır. Servis çalışmıyorsa tahmini fiyat gösterilmez.</p></div><GoldPrices/><ToolGuide guide={pageGuides.altin}/></main>}
