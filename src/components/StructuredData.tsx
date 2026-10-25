import { resolveSiteUrl } from '@/lib/site.mjs';
import type { BreadcrumbItem } from '@/components/Breadcrumbs';

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}} />;
}

export function ToolStructuredData({ name, description, path, category, breadcrumbs }: { name:string;description:string;path:string;category:string;breadcrumbs:BreadcrumbItem[] }) {
  const base=resolveSiteUrl();
  const url=`${base}${path}`;
  const graph=[
    {'@type':'WebApplication',name,description,url,applicationCategory:category,operatingSystem:'Any',inLanguage:'tr-TR',offers:{'@type':'Offer',price:'0',priceCurrency:'TRY'}},
    {'@type':'BreadcrumbList',itemListElement:breadcrumbs.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.label,item:`${base}${item.href||path}`}))},
  ];
  return <JsonLd data={{'@context':'https://schema.org','@graph':graph}}/>;
}

export function WebsiteStructuredData(){const base=resolveSiteUrl();return <JsonLd data={{'@context':'https://schema.org','@type':'WebSite',name:'HerGün',url:base,inLanguage:'tr-TR',description:'Günlük yaşam için ücretsiz hesaplama araçları, oyunlar ve kaynak bilgisi gösterilen veriler.'}}/>;}
