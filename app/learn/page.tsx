// app/learn/page.tsx
'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Learn() {
  const pinRefs = [useRef<HTMLInputElement>(null!), useRef<HTMLInputElement>(null!), useRef<HTMLInputElement>(null!), useRef<HTMLInputElement>(null!)];
  const router = useRouter();

  const checkPin = () => {
    const pin = pinRefs.map(ref => ref.current.value).join('');
    if (pin.length === 4) {
      alert('Access granted! (Demo: any 4 digits work)');
    } else {
      alert('Enter 4 digits first');
    }
  };

  const handleInput = (index: number) => {
    if (pinRefs[index].current.value && index < 3) {
      pinRefs[index+1].current.focus();
    }
  };

  return (
    <div className="page active" style={{ paddingTop: '52px' }}>
      <div className="learn-section">
        <div className="lock-icon">🔒</div>
        <div className="lock-title">Learning hub is locked</div>
        <div className="lock-sub">Enter the 4-digit code to access the learning hub.</div>
        <div className="pin-inputs">
          {pinRefs.map((ref, i) => (
            <input key={i} ref={ref} className="pin-input" type="password" maxLength={1} onChange={() => handleInput(i)} />
          ))}
        </div>
        <div className="pin-btns">
          <button className="pin-btn pin-btn-unlock" onClick={checkPin}>Unlock</button>
          <button className="pin-btn pin-btn-back" onClick={() => router.push('/')}>Back</button>
        </div>
      </div>
    </div>
  );
}