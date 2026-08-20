import React from 'react';

/**
 * StatCard component displays a statistic metric with a number and a label.
 * Designed to look elegant and clean, matching the LifeAdmin branding.
 */
function StatCard({ number, label }) {
  return (
    <article className="stat-card">
      <p className="stat-number">{number}</p>
      <h3 className="stat-label">{label}</h3>
    </article>
  );
}

export default StatCard;
