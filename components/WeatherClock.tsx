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
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(TIMEZONE)}&temperature_unit=fahrenheit`)
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

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '1rem',
    padding: '1.5rem',
  };

  return (
    <div className="weather-clock-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Doto:wght@700&display=swap');
        .wc-led { font-family: 'Doto', 'Geist Mono', monospace; font-weight: 700; }
        @media (max-width: 640px) {
          .weather-clock-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Weather */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1rem' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>📍</span>
          <span style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, Inter, sans-serif',
          }}>
            {LOCATION_LABEL}
          </span>
        </div>

        {error ? (
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, Inter, sans-serif' }}>
            Weather unavailable.
          </span>
        ) : !weather ? (
          <>
            <Skeleton width={80} height={36} borderRadius={6} />
            <div style={{ marginTop: 8 }}><Skeleton width={140} height={13} borderRadius={4} /></div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="wc-led" style={{ fontSize: 36, color: 'white' }}>{weather.temp}°F</span>
              <span style={{ fontSize: 18 }}>{condition?.icon}</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: 'Geist, Inter, sans-serif', marginTop: 4 }}>
              {condition?.label} · H{weather.high}° L{weather.low}°
            </div>
          </>
        )}
      </div>

      {/* Clock */}
      <div style={cardStyle}>
        <div style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, Inter, sans-serif', marginBottom: '1rem',
        }}>
          {dateString ?? <Skeleton width={90} height={12} borderRadius={4} />} · GMT
        </div>
        <div className="wc-led" style={{ fontSize: 32, color: '#7dd3fc', letterSpacing: '0.05em' }}>
          {timeString ?? <Skeleton width={130} height={32} borderRadius={6} />}
        </div>
      </div>
    </div>
  );
}

export default WeatherClock;
