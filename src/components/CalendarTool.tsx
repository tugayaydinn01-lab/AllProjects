'use client';

import { useState } from 'react';

const weekdays=['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
export default function CalendarTool(){
  const now=new Date();const [year,setYear]=useState(now.getFullYear());const [month,setMonth]=useState(now.getMonth());
  const firstDay=(new Date(year,month,1).getDay()+6)%7;const dayCount=new Date(year,month+1,0).getDate();const title=new Intl.DateTimeFormat('tr-TR',{month:'long',year:'numeric'}).format(new Date(year,month,1));
  function move(delta:number){const next=new Date(year,month+delta,1);setYear(next.getFullYear());setMonth(next.getMonth());}
  return <div className="calendarPanel"><div className="calendarHeader"><button type="button" onClick={()=>move(-1)} aria-label="Önceki ay">←</button><h2>{title}</h2><button type="button" onClick={()=>move(1)} aria-label="Sonraki ay">→</button></div><div className="calendarGrid">{weekdays.map(day=><strong key={day}>{day}</strong>)}{Array.from({length:firstDay},(_,index)=><span key={`empty-${index}`} />)}{Array.from({length:dayCount},(_,index)=>{const day=index+1;const today=day===now.getDate()&&month===now.getMonth()&&year===now.getFullYear();return <span className={today?'today':''} key={day}>{day}</span>})}</div><button className="secondaryButton" type="button" onClick={()=>{setYear(now.getFullYear());setMonth(now.getMonth())}}>Bugüne dön</button></div>;
}
