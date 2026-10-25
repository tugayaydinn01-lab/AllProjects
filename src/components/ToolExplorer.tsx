'use client';

import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { portalTools } from '@/lib/tools';

const storageKey = 'hergun-favoriler';

function subscribeFavorites(callback:()=>void){window.addEventListener('storage',callback);window.addEventListener('hergun-favorites',callback);return()=>{window.removeEventListener('storage',callback);window.removeEventListener('hergun-favorites',callback)}}
function getFavoritesSnapshot(){return window.localStorage.getItem(storageKey)||'[]'}
function parseFavorites(value:string){try{const parsed=JSON.parse(value);return Array.isArray(parsed)?parsed.filter((item):item is string=>typeof item==='string'):[]}catch{return []}}

function saveFavorites(favorites:string[]){
  window.localStorage.setItem(storageKey,JSON.stringify(favorites));
  window.dispatchEvent(new Event('hergun-favorites'));
}

export default function ToolExplorer() {
  const [query, setQuery] = useState('');
  const favoriteSnapshot=useSyncExternalStore(subscribeFavorites,getFavoritesSnapshot,()=> '[]');
  const favorites=useMemo(()=>parseFavorites(favoriteSnapshot),[favoriteSnapshot]);
  const normalized = query.trim().toLocaleLowerCase('tr-TR');
  const filtered = useMemo(() => portalTools.filter((tool) =>
    !normalized || `${tool.title} ${tool.description} ${tool.category}`.toLocaleLowerCase('tr-TR').includes(normalized)
  ), [normalized]);

  function toggleFavorite(slug: string) {
    saveFavorites(favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug]);
  }

  const favoriteTools = portalTools.filter((tool) => favorites.includes(tool.slug));

  return (
    <>
      <div className="searchBox">
        <label htmlFor="tool-search">Araçlarda ara</label>
        <div className="searchControl"><span aria-hidden="true">⌕</span><input id="tool-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="KDV, sudoku, hava durumu…" /></div>
      </div>
      {favoriteTools.length > 0 && !normalized && <section className="section compactSection"><div className="sectionTitle"><div><span className="eyebrow">SANA ÖZEL</span><h2>Favorilerin</h2></div></div><div className="cards">{favoriteTools.map((tool) => <ToolCard key={tool.slug} tool={tool} favorite onFavorite={toggleFavorite} />)}</div></section>}
      <section className="section" id="araclar">
        <div className="sectionTitle"><div><span className="eyebrow">TEK YERDE</span><h2>{normalized ? `“${query}” sonuçları` : 'Öne çıkan araçlar'}</h2></div><span className="resultCount">{filtered.length} araç</span></div>
        {filtered.length > 0 ? <div className="cards">{filtered.map((tool) => <ToolCard key={tool.slug} tool={tool} favorite={favorites.includes(tool.slug)} onFavorite={toggleFavorite} />)}</div> : <div className="emptyState"><strong>Sonuç bulunamadı.</strong><p>Farklı bir kelimeyle tekrar ara.</p></div>}
      </section>
    </>
  );
}

type PortalTool = (typeof portalTools)[number];

function ToolCard({ tool, favorite, onFavorite }: { tool: PortalTool; favorite: boolean; onFavorite: (slug: string) => void }) {
  return <article className="toolcard interactiveCard"><div className="cardTop"><span className="symbol">{tool.icon}</span><button className={`favoriteButton ${favorite ? 'isFavorite' : ''}`} type="button" onClick={() => onFavorite(tool.slug)} aria-label={favorite ? `${tool.title} favorilerden çıkar` : `${tool.title} favorilere ekle`} aria-pressed={favorite}>{favorite ? '★' : '☆'}</button></div><span className="categoryLabel">{tool.category}</span><h3><Link href={tool.href}>{tool.title}</Link></h3><p>{tool.description}</p><Link className="cardlink" href={tool.href}>Aç →</Link></article>;
}
