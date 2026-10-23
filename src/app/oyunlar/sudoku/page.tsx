import type { Metadata } from 'next';
import Link from 'next/link';
import SudokuGame from '@/components/games/SudokuGame';
export const metadata:Metadata={title:'Günlük Sudoku',description:'Ücretsiz, mobil uyumlu 9×9 sudoku bulmacası.',alternates:{canonical:'/oyunlar/sudoku'}};
export default function Page(){return <main id="ana-icerik" className="container narrow section"><div className="breadcrumb"><Link href="/">Ana sayfa</Link> / <Link href="/oyunlar">Oyunlar</Link> / Sudoku</div><div className="pageHeader"><span className="eyebrow">MANTIK OYUNU</span><h1>Günlük Sudoku</h1><p className="intro">Her satır, sütun ve 3×3 bölgede 1–9 rakamlarını yalnızca bir kez kullan.</p></div><SudokuGame/></main>}
