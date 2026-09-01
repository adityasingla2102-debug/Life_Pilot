function StatCard({ number, label }) {
  return (
    <article className="stat-card">
      <span className="stat-label">{label}</span>
      <p className="stat-number">{number}</p>
    </article>
  );
}

export default StatCard;
