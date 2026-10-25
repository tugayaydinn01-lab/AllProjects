import type { Metadata } from 'next';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';
import { ToolStructuredData } from '@/components/StructuredData';
import ToolGuide from '@/components/ToolGuide';
import SudokuGame from '@/components/games/SudokuGame';
import { istanbulDateKey } from '@/lib/date';
import { pageGuides } from '@/lib/guides.mjs';

export const metadata:Metadata={title:'Ücretsiz Günlük Sudoku',description:'Mobil uyumlu 9×9 sudoku; kurallar, kullanım adımları ve çözüm kontrolüyle ücretsiz mantık bulmacası.',alternates:{canonical:'/oyunlar/sudoku'},openGraph:{title:'Ücretsiz Günlük Sudoku',description:'Mobil uyumlu ücretsiz 9×9 sudoku.',url:'/oyunlar/sudoku',type:'website'}};
const breadcrumbs:BreadcrumbItem[]=[{label:'Ana sayfa',href:'/'},{label:'Oyunlar',href:'/oyunlar'},{label:'Sudoku'}];
export const revalidate=3600;
export default function Page(){return <main id="ana-icerik" className="container narrow section"><ToolStructuredData name="Günlük Sudoku" description="Mobil uyumlu, çözüm kontrollü ücretsiz 9×9 sudoku." path="/oyunlar/sudoku" category="GameApplication" breadcrumbs={breadcrumbs}/><Breadcrumbs items={breadcrumbs}/><div className="pageHeader"><span className="eyebrow">MANTIK OYUNU</span><h1>Günlük Sudoku</h1><p className="intro">Her satır, sütun ve 3×3 bölgede 1–9 rakamlarını yalnızca bir kez kullan.</p></div><SudokuGame dateKey={istanbulDateKey()}/><ToolGuide guide={pageGuides.sudoku}/></main>}
