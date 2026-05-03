'use client';
import { useEffect, useState } from 'react';

export default function ClockWidget() {
  const [time, setTime] = useState('11:51:51');
  const [dayDate, setDayDate] = useState('WED\n04/29');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2,'0');
      const m = String(now.getMinutes()).padStart(2,'0');
      const s = String(now.getSeconds()).padStart(2,'0');
      setTime(`${h}:${m}:${s}`);
      const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
      const month = String(now.getMonth()+1).padStart(2,'0');
      const date = String(now.getDate()).padStart(2,'0');
      setDayDate(`${days[now.getDay()]}\n${month}/${date}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget" style={{ flex: 1 }}>
      <div className="clock-widget">
        <div className="clock-header">
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Local Time</span>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:'var(--font-mono)' }}>Los Angeles</span>
        </div>
        <div style={{ display:'flex', alignItems:'baseline', gap:'0.5rem' }}>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontFamily:'var(--font-mono)', whiteSpace:'pre' }}>{dayDate}</div>
          <div className="clock-time">{time}</div>
        </div>
      </div>
    </div>
  );
}