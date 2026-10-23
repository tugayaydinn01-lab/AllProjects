'use client';

import { FormEvent, useMemo, useState } from 'react';
import { dailyIndex, scoreGuess } from '@/lib/daily.mjs';

const words = ['KALEM', 'BAHAR', 'KİTAP', 'BULUT', 'ŞEHİR', 'YAZAR', 'GÜNEŞ', 'ORMAN', 'KÖPRÜ', 'MEYVE', 'SAHİL', 'ÇİÇEK', 'DÜNYA', 'AKŞAM', 'SABAH', 'KAHVE', 'DENİZ', 'BİLGİ', 'YOLCU'];

export default function WordGame({ dateKey }: { dateKey: string }) {
  const answer = useMemo(() => words[dailyIndex(dateKey, words.length, 17)], [dateKey]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const won = guesses.includes(answer);
  const finished = won || guesses.length >= 6;

  function submit(event: FormEvent) {
    event.preventDefault();
    const guess = value.trim().toLocaleUpperCase('tr-TR');
    if (Array.from(guess).length !== 5 || finished) return;
    setGuesses((current) => [...current, guess]);
    setValue('');
  }

  return <div className="gamePanel"><div className="gameMeta"><span>Günün bulmacası</span><strong>{dateKey}</strong></div><div className="wordGrid" aria-label="Kelime tahminleri">{Array.from({length:6},(_,row)=>{const guess=guesses[row]||'';const scores=guess?scoreGuess(answer,guess):[];return <div className="wordRow" key={row}>{Array.from({length:5},(_,column)=><span key={column} className={`wordCell ${scores[column]||''}`}>{Array.from(guess)[column]||''}</span>)}</div>})}</div>{!finished && <form className="gameForm" onSubmit={submit}><label className="field"><span>Beş harfli tahminin</span><input value={value} maxLength={5} autoComplete="off" onChange={(event)=>setValue(event.target.value.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ]/g,''))} /></label><button className="primaryButton" type="submit" disabled={Array.from(value).length!==5}>Tahmin et</button></form>}{finished && <div className={`gameMessage ${won?'success':''}`} role="status"><strong>{won ? 'Tebrikler, doğru bildin!' : `Günün kelimesi: ${answer}`}</strong><p>Yeni kelime Türkiye saatiyle gece yarısında gelir.</p></div>}<div className="legend"><span><i className="correct"/>Doğru yer</span><span><i className="present"/>Kelime içinde</span><span><i className="absent"/>Yok</span></div></div>;
}
