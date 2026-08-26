'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from './Skeleton';

// Accra, Ghana — fixed to the site owner's location (like atom63.io pins
// its weather/clock to Los Angeles), not the visitor's.
const LAT = 5.6037;
const LON = -0.187;
const TIMEZONE = 'Africa/Accra';
const LOCATION_LABEL = 'Accra';

interface WeatherData {
  temp: number;
  high: number;
  low: number;
  code: number;
}

// WMO weather codes -> label + a simple line icon.
function describeWeather(code: number): { label: string; icon: string } {
  if (code === 0) return { label: 'Clear', icon: '☀️' };
  if (code <= 2) return { label: 'Partly Cloudy', icon: '⛅' };
  if (code === 3) return { label: 'Cloudy', icon: '☁️' };
  if (code <= 48) return { label: 'Foggy', icon: '🌫️' };
  if (code <= 67) return { label: 'Rainy', icon: '🌧️' };
  if (code <= 82) return { label: 'Showers', icon: '🌦️' };
  if (code <= 99) return { label: 'Thunderstorm', icon: '⛈️' };
  return { label: 'Clear', icon: '☀️' };
}

function useAccraTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function WeatherClock() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const now = useAccraTime();

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(TIMEZONE)}`)
      .then((res) => {
        if (!res.ok) throw new Error('bad response');
        return res.json();
      })
      .then((data) => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
          code: data.current.weather_code,
        });
      })
      .catch(() => setError(true));
  }, []);

  const timeParts = now
    ? new Intl.DateTimeFormat('en-US', {
        timeZone: TIMEZONE, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }).formatToParts(now)
    : null;
  const timeString = timeParts
    ? timeParts.filter((p) => p.type !== 'literal' || p.value !== '').map((p) => p.value).join('')
    : null;
  const dateString = now
    ? new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, weekday: 'short', month: 'short', day: 'numeric' }).format(now)
    : null;

  const condition = weather ? describeWeather(weather.code) : null;

  return (
    <div
      style={{
        background: 'linear-gradient(160deg, #4f7fe0 0%, #6b8fe8 45%, #3a5fc4 100%)',
        borderRadius: '1rem',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Doto:wght@700&display=swap');
        .wc-led { font-family: 'Doto', 'Geist Mono', monospace; font-weight: 700; }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 13 }}>📍</span>
        <span style={{
          fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)',
          fontFamily: 'Geist, Inter, sans-serif',
        }}>
          {LOCATION_LABEL}
        </span>
      </div>

      {error ? (
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, Inter, sans-serif' }}>
          Weather unavailable.
        </span>
      ) : !weather ? (
        <>
          <Skeleton width={90} height={40} borderRadius={6} style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ marginTop: -6 }}><Skeleton width={150} height={13} borderRadius={4} style={{ background: 'rgba(255,255,255,0.15)' }} /></div>
        </>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="wc-led" style={{ fontSize: 40, color: 'white' }}>{weather.temp}°C</span>
            <span style={{ fontSize: 18 }}>{condition?.icon}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'white', fontFamily: 'Geist, Inter, sans-serif' }}>
              {condition?.label}
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'Geist, Inter, sans-serif', marginTop: 2 }}>
            H{weather.high}° L{weather.low}°
          </div>
        </div>
      )}

      {/* Nested clock panel */}
      <div style={{ background: 'rgba(10,10,10,0.55)', borderRadius: 12, padding: '0.85rem 1rem' }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, Inter, sans-serif', marginBottom: 6,
        }}>
          {dateString ?? <Skeleton width={90} height={11} borderRadius={4} />} · GMT
        </div>
        <div className="wc-led" style={{ fontSize: 28, color: '#7dd3fc', letterSpacing: '0.05em' }}>
          {timeString ?? <Skeleton width={130} height={28} borderRadius={6} />}
        </div>
      </div>
    </div>
  );
}

export default WeatherClock;
