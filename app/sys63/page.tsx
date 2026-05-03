// app/sys63/page.tsx
'use client';
import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
//import ProfileWidget from '@/components/sys63/ProfileWidget';
//import ClockWidget from '@/components/sys63/ClockWidget';
//import WeatherWidget from '@/components/sys63/WeatherWidget';
//import GithubWidget from '@/components/sys63/GithubWidget';

// Background particles
function Particles() {
  const ref = useRef<any>();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0008;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={800}
          array={new Float32Array(Array.from({length: 800*3}, () => (Math.random()-0.5)*12))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="white" />
    </points>
  );
}

function Sys63Background() {
  return (
    <div className="sys63-bg" style={{ backgroundImage: "url('data:image/svg+xml,...')" /* use same SVG */ }}>
      <Canvas style={{ position: 'absolute', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.08 }}>
        <Particles />
      </Canvas>
    </div>
  );
}

const ProfileWidget = () => <div style={{ padding: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 10 }}>Profile Widget</div>;
const ClockWidget = () => <div style={{ padding: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 10 }}>Clock</div>;
const WeatherWidget = () => <div style={{ padding: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 10 }}>Weather</div>;
const GithubWidget = () => <div style={{ padding: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 10 }}>GitHub</div>;
const Dock = ({ onSettingsClick }: { onSettingsClick: () => void }) => (
  <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
    <button onClick={onSettingsClick} style={{ padding: '10px 20px', borderRadius: 8, background: '#fff', color: '#000' }}>Dock Item</button>
  </div>
);
const Settings = ({ open, onClose }: { open: boolean; onClose: () => void }) => 
  open ? (
    <div style={{ position: 'fixed', top: '20%', left: '30%', width: 300, height: 400, background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: 20, zIndex: 100 }}>
      <h2>Settings</h2>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;

export default function Sys63() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <div id="page-sys63" className="page active" style={{ paddingTop: 0 }}>
      <Sys63Background />
      <div className="sys63-topbar">
        <div className="sys63-topbar-left">
          <span style={{ fontSize:15 }}>⬡</span>
          <div style={{ display:'flex', gap:'0.5rem', fontSize:11, color:'rgba(255,255,255,0.3)' }}>✦ ▣ ⋮ ⌚</div>
        </div>
        <div className="sys63-topbar-right">
          <Sys63Date />
          <Sys63TimeTop />
        </div>
      </div>
      <div className="sys63-desktop">
        <ProfileWidget />
        <div className="right-widgets" style={{ flex:1 }}>
          <div style={{ display:'flex', gap:'1rem' }}>
            <ClockWidget />
            <GithubWidget />
          </div>
          <WeatherWidget />
          <div style={{ display:'flex', gap:'1.5rem', padding:'0.5rem' }}>
            <div style={{ textAlign:'center', cursor:'pointer' }} onClick={() => setSettingsOpen(true)}>
              <div style={{ width:48, height:48, background:'rgba(255,255,255,0.06)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, margin:'0 auto' }}>⚙</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:4, fontFamily:'var(--font-mono)' }}>Settings</div>
            </div>
            <div style={{ textAlign:'center' }}>
              <div style={{ width:48, height:48, background:'rgba(255,255,255,0.06)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, margin:'0 auto' }}>📚</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:4, fontFamily:'var(--font-mono)' }}>Library</div>
            </div>
          </div>
        </div>
      </div>
      <Dock onSettingsClick={() => setSettingsOpen(true)} />
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

// Helper components for top bar
function Sys63Date() {
  const [date, setDate] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      setDate(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span>{date}</span>;
}

function Sys63TimeTop() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const h12 = now.getHours() % 12 || 12;
      setTime(`${h12}:${String(now.getMinutes()).padStart(2,'0')} ${ampm}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span>{time}</span>;
}