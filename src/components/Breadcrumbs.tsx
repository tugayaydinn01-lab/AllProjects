import Link from 'next/link';

export type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return <nav className="breadcrumb" aria-label="İçerik yolu"><ol>{items.map((item,index)=><li key={`${item.label}-${index}`}>{item.href?<Link href={item.href}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}
