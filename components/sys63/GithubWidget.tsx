export default function GithubWidget() {
  return (
    <div className="widget github-widget" style={{ flex: 1 }}>
      <div className="github-info">
        <div className="github-header">
          <span style={{ fontSize:12 }}>⊞</span>
          <span className="github-label">GitHub</span>
          <span className="github-streak">6 Mo</span>
        </div>
        <div className="github-count">2453</div>
        <div className="github-count-label">contributions</div>
        <div className="github-fire">🔥 45 day streak</div>
      </div>
      <div className="github-graph"></div>
    </div>
  );
}