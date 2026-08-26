import { Skeleton } from '@/components/Skeleton';

export default function BlogPostLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
      <div style={{ padding: '28px 2.5rem 6rem', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.75rem' }}>
          <Skeleton width={70} height={14} borderRadius={4} />
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: '1.1rem' }}>
            <Skeleton width={70} height={11} borderRadius={4} />
            <Skeleton width={60} height={11} borderRadius={4} />
          </div>

          <div style={{ display: 'grid', gap: 10, marginBottom: '1.1rem' }}>
            <Skeleton width="90%" height={34} borderRadius={6} />
            <Skeleton width="55%" height={34} borderRadius={6} />
          </div>

          <div style={{ display: 'grid', gap: 8, marginBottom: '1.25rem' }}>
            <Skeleton width="100%" height={14} borderRadius={4} />
            <Skeleton width="70%" height={14} borderRadius={4} />
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: '0.5rem' }}>
            <Skeleton width={64} height={22} borderRadius={20} />
            <Skeleton width={80} height={22} borderRadius={20} />
          </div>

          <div style={{ marginTop: '2rem', height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} width={i % 3 === 2 ? '65%' : '100%'} height={14} borderRadius={4} />
          ))}
        </div>
      </div>
    </div>
  );
}
