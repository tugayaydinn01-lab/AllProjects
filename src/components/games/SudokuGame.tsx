'use client';

import { useState } from 'react';

const puzzle = '530070000600195000098000060800060003400803001700020006060000280000419005000080079';
const solution = '534678912672195348198342567859761423426853791713924856961537284287419635345286179';

export default function SudokuGame() {
  const [values, setValues] = useState(() => Array.from(puzzle, (value) => value === '0' ? '' : value));
  const [message, setMessage] = useState('');

  function update(index: number, value: string) {
    if (puzzle[index] !== '0') return;
    setValues((current) => current.map((item, itemIndex) => itemIndex === index ? value.replace(/[^1-9]/g, '').slice(-1) : item));
    setMessage('');
  }

  function check() {
    if (values.some((value) => !value)) setMessage('Kontrol etmeden önce tüm kutuları doldur.');
    else setMessage(values.join('') === solution ? 'Harika! Sudoku doğru çözüldü.' : 'Bazı kutular henüz doğru değil. Tekrar dene.');
  }

  function reset() {
    setValues(Array.from(puzzle, (value) => value === '0' ? '' : value));
    setMessage('');
  }

  return <div className="gamePanel"><div className="sudoku" role="grid" aria-label="Sudoku tahtası">{values.map((value,index)=>{const fixed=puzzle[index]!=='0';return <input key={index} aria-label={`${Math.floor(index/9)+1}. satır ${index%9+1}. sütun`} className={fixed?'fixed':''} inputMode="numeric" value={value} readOnly={fixed} onChange={(event)=>update(index,event.target.value)} />})}</div><div className="buttonRow"><button className="primaryButton" type="button" onClick={check}>Çözümü kontrol et</button><button className="secondaryButton" type="button" onClick={reset}>Temizle</button></div>{message&&<p className={message.startsWith('Harika')?'gameMessage success':'gameMessage'} role="status">{message}</p>}</div>;
}
