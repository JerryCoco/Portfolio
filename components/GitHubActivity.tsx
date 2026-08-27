'use client';

import { useEffect, useRef, useState } from 'react';
import { Skeleton } from './Skeleton';

interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

const LEVEL_COLORS = [
  'rgba(255,255,255,0.06)',
  '#1e3a8a',
  '#2563eb',
  '#3b82f6',
  '#60a5fa',
];

const MONTHS_BACK = 6;

function formatShortDate(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Consecutive days with at least one contribution, counted backward from
 *  today. Today itself doesn't break the streak if it has no activity yet. */
function computeStreak(sortedDays: ContributionDay[]): number {
  let days = sortedDays;
  if (days.length > 0 && days[days.length - 1].count === 0) {
    days = days.slice(0, -1);
  }
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
}

interface HoverInfo {
  x: number;
  y: number;
  date: string;
  count: number;
}

export function GitHubActivity() {
  const [days, setDays] = useState<ContributionDay[] | null>(null);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [hover, setHover] = useState<HoverInfo | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setError(false);

    fetch('/api/github-activity', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text().catch(() => '');
          throw new Error(`GitHub Activity fetch failed: ${res.status} ${body.slice(0, 200)}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setDays(data.days);
      })
      .catch((err) => {
        console.error('[GitHubActivity]', err);
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  if (error) {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.14)',
        borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', height: 160, gap: 10,
      }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, Inter, sans-serif' }}>
          GitHub activity is unavailable right now.
        </span>
        <button
          onClick={() => setRetryKey((k) => k + 1)}
          style={{
            fontSize: 12, color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)',
            border: 'none', borderRadius: 999, padding: '5px 14px', cursor: 'pointer',
            fontFamily: 'Geist, Inter, sans-serif',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - MONTHS_BACK);

  // GitHub's contribution table lists cells row-by-row (all Sundays, then
  // all Mondays, ...), not chronologically, so sort by date before grouping.
  const visibleDays = (days?.filter((d) => new Date(d.date) >= cutoff) ?? [])
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  // Group into weeks (columns), Sunday-start rows, for the grid.
  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  visibleDays.forEach((day, i) => {
    const dow = new Date(day.date + 'T00:00:00').getDay();
    if (i === 0) {
      for (let pad = 0; pad < dow; pad++) currentWeek.push(null);
    }
    currentWeek.push(day);
    if (dow === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const rangeLabel =
    visibleDays.length > 0
      ? `${formatShortDate(new Date(visibleDays[0].date + 'T00:00:00'))} – ${formatShortDate(new Date(visibleDays[visibleDays.length - 1].date + 'T00:00:00'))}`
      : '';

  const allDaysSorted = (days ?? []).slice().sort((a, b) => a.date.localeCompare(b.date));
  const totalVisibleContributions = visibleDays.reduce((sum, d) => sum + d.count, 0);
  const streak = computeStreak(allDaysSorted);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.14)',
        borderRadius: '1rem',
        padding: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <span style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, Inter, sans-serif',
        }}>
          Github Activity
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: 'Geist, Inter, sans-serif',
            background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: 999,
          }}>
            {MONTHS_BACK} Months
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.26 5.68.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
          </svg>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Doto:wght@700&display=swap');
        .gh-led-number {
          font-family: 'Doto', 'Geist Mono', monospace;
          font-weight: 700;
        }
      `}</style>

      {days !== null && visibleDays.length > 0 && (
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.25rem' }}>
          <div>
            <div className="gh-led-number" style={{ fontSize: 28, color: '#7dd3fc', lineHeight: 1 }}>
              {totalVisibleContributions.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, Inter, sans-serif', marginTop: 4 }}>
              contributions
            </div>
          </div>
          <div>
            <div className="gh-led-number" style={{ fontSize: 28, color: '#7dd3fc', lineHeight: 1 }}>
              {streak}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, Inter, sans-serif', marginTop: 4 }}>
              day streak
            </div>
          </div>
        </div>
      )}

      {days === null ? (
        <>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.25rem' }}>
            <div>
              <Skeleton width={50} height={28} borderRadius={4} />
              <div style={{ marginTop: 6 }}><Skeleton width={70} height={11} borderRadius={4} /></div>
            </div>
            <div>
              <Skeleton width={30} height={28} borderRadius={4} />
              <div style={{ marginTop: 6 }}><Skeleton width={60} height={11} borderRadius={4} /></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: 26 }).map((_, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {Array.from({ length: 7 }).map((_, di) => (
                  <Skeleton key={di} width={10} height={10} borderRadius={2.5} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Skeleton width={90} height={11} borderRadius={4} />
            <Skeleton width={100} height={11} borderRadius={4} />
          </div>
        </>
      ) : visibleDays.length === 0 ? (
        <div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, Inter, sans-serif' }}>
            No recent activity.
          </span>
        </div>
      ) : (
        <>
          <div ref={gridRef} style={{ position: 'relative' }}>
            {hover && (
              <div
                style={{
                  position: 'absolute',
                  left: hover.x,
                  top: hover.y,
                  transform: 'translate(-50%, calc(-100% - 8px))',
                  background: '#fff',
                  color: '#1a1a1a',
                  fontSize: 11,
                  fontWeight: 500,
                  padding: '5px 10px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 10,
                  fontFamily: 'Geist, Inter, sans-serif',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                }}
              >
                {hover.date} | {hover.count} Contribution{hover.count === 1 ? '' : 's'}
              </div>
            )}
            <div style={{ display: 'flex', gap: 3, overflowX: 'auto' }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      onMouseEnter={(e) => {
                        if (!day || !gridRef.current) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const containerRect = gridRef.current.getBoundingClientRect();
                        setHover({
                          x: rect.left - containerRect.left + rect.width / 2,
                          y: rect.top - containerRect.top,
                          date: day.date,
                          count: day.count,
                        });
                      }}
                      onMouseLeave={() => setHover(null)}
                      style={{
                        width: 10, height: 10, borderRadius: 2.5,
                        background: day ? LEVEL_COLORS[day.level] : 'transparent',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist Mono, monospace' }}>
              {rangeLabel}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, Inter, sans-serif', marginRight: 2 }}>
                Less
              </span>
              {LEVEL_COLORS.map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: 2.5, background: c }} />
              ))}
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, Inter, sans-serif', marginLeft: 2 }}>
                More
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GitHubActivity;
