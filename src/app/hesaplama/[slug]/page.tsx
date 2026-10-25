import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';
import Calculator from '@/components/Calculator';
import { ToolStructuredData } from '@/components/StructuredData';
import ToolGuide from '@/components/ToolGuide';
import { calculatorGuides } from '@/lib/guides.mjs';
import { tools } from '@/lib/tools';

export function generateStaticParams(){return tools.map(tool=>({slug:tool.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const tool=tools.find(item=>item.slug===slug);return tool?{title:tool.title,description:tool.description,alternates:{canonical:`/hesaplama/${slug}`},openGraph:{title:tool.title,description:tool.description,url:`/hesaplama/${slug}`,type:'website'}}:{title:'Araç bulunamadı'};}

export default async function ToolPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const tool=tools.find(item=>item.slug===slug);
  if(!tool)notFound();
  const guide=calculatorGuides[tool.slug];
  const path=`/hesaplama/${tool.slug}`;
  const breadcrumbs:BreadcrumbItem[]=[{label:'Ana sayfa',href:'/'},{label:'Hesaplama',href:'/hesaplama'},{label:tool.title}];
  return <main id="ana-icerik" className="container section"><ToolStructuredData name={tool.title} description={tool.description} path={path} category="FinanceApplication" breadcrumbs={breadcrumbs}/><Breadcrumbs items={breadcrumbs}/><div className="pageHeader"><span className="eyebrow">HESAPLAMA</span><h1>{tool.title}</h1><p className="intro">{tool.description} Değerleri değiştirdiğinde sonuç otomatik güncellenir.</p></div><Calculator slug={tool.slug}/><ToolGuide guide={guide}/><section className="section"><h2>Tüm hesaplama araçları</h2><div className="related">{tools.filter(item=>item.slug!==slug).map(item=><Link key={item.slug} href={`/hesaplama/${item.slug}`}>{item.title} →</Link>)}</div></section></main>;
}
