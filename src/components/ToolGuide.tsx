import Link from 'next/link';
import type { Guide } from '@/lib/guides.mjs';

export default function ToolGuide({ guide }: { guide: Guide }) {
  return <section className="toolGuide" aria-labelledby="yardim-basligi"><div className="guideIntro"><span className="eyebrow">KISA REHBER</span><h2 id="yardim-basligi">{guide.heading}</h2><p>{guide.summary}</p></div><div className="guideGrid"><section><h3>Nasıl kullanılır?</h3><ol>{guide.steps.map(step=><li key={step}>{step}</li>)}</ol></section><section><h3>Formül veya yöntem</h3><p>{guide.formula}</p><div className="exampleBox"><strong>Doğrulanabilir örnek</strong><p>{guide.example}</p></div></section><section><h3>Dikkat edilmesi gerekenler</h3><ul>{guide.cautions.map(caution=><li key={caution}>{caution}</li>)}</ul></section></div><div className="guideRelated"><strong>İlgili araçlar</strong>{guide.related.map(item=><Link key={item.href} href={item.href}>{item.label} →</Link>)}</div></section>;
}
