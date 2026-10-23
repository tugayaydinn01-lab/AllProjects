'use client';

import { useMemo, useState } from 'react';
import { dailyIndex } from '@/lib/daily.mjs';

const questions = [
  { q: 'Türkiye Cumhuriyeti hangi yıl ilan edildi?', options: ['1920', '1923', '1938', '1945'], answer: 1 },
  { q: 'Dünyanın en büyük okyanusu hangisidir?', options: ['Atlas', 'Hint', 'Pasifik', 'Arktik'], answer: 2 },
  { q: 'Suyun kimyasal formülü nedir?', options: ['CO₂', 'H₂O', 'O₂', 'NaCl'], answer: 1 },
  { q: 'Kapadokya ağırlıklı olarak hangi ilimizdedir?', options: ['Nevşehir', 'Bursa', 'Artvin', 'Edirne'], answer: 0 },
  { q: 'Bir üçgenin iç açılar toplamı kaç derecedir?', options: ['90', '180', '270', '360'], answer: 1 },
  { q: 'İstiklal Marşı’nın yazarı kimdir?', options: ['Nazım Hikmet', 'Mehmet Akif Ersoy', 'Yahya Kemal', 'Orhan Veli'], answer: 1 },
  { q: 'Güneş Sistemi’nin en büyük gezegeni hangisidir?', options: ['Mars', 'Satürn', 'Jüpiter', 'Venüs'], answer: 2 },
  { q: 'Türkiye’nin en uzun nehri hangisidir?', options: ['Kızılırmak', 'Fırat', 'Sakarya', 'Yeşilırmak'], answer: 0 },
  { q: '“Küçük Prens” kitabının yazarı kimdir?', options: ['Victor Hugo', 'Jules Verne', 'Antoine de Saint-Exupéry', 'Albert Camus'], answer: 2 },
  { q: 'Işığın boşluktaki hızı yaklaşık kaç km/s’dir?', options: ['30.000', '300.000', '3.000', '3.000.000'], answer: 1 },
];

export default function QuizGame({ dateKey }: { dateKey: string }) {
  const dailyQuestions = useMemo(() => Array.from({length:5},(_,index)=>questions[(dailyIndex(dateKey,questions.length,31)+index)%questions.length]), [dateKey]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const finished = current >= dailyQuestions.length;

  if (finished) return <div className="gamePanel gameComplete"><span className="symbol">✓</span><h2>Bugünkü yarışma tamamlandı</h2><p><strong>{dailyQuestions.length}</strong> soruda <strong>{score}</strong> doğru cevap verdin.</p></div>;
  const question = dailyQuestions[current];
  return <div className="gamePanel"><div className="quizProgress"><span>Soru {current+1}/{dailyQuestions.length}</span><span>{score} doğru</span></div><div className="progressBar"><span style={{width:`${(current/dailyQuestions.length)*100}%`}}/></div><h2 className="quizQuestion">{question.q}</h2><div className="quizOptions">{question.options.map((option,index)=><button type="button" key={option} disabled={selected!==null} className={selected===null?'':index===question.answer?'correctOption':index===selected?'wrongOption':''} onClick={()=>{setSelected(index);if(index===question.answer)setScore(value=>value+1)}}>{option}</button>)}</div>{selected!==null&&<button type="button" className="primaryButton nextButton" onClick={()=>{setCurrent(value=>value+1);setSelected(null)}}>{current===dailyQuestions.length-1?'Sonucu gör':'Sonraki soru'} →</button>}</div>;
}
