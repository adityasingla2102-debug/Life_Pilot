import React from 'react';

// ==========================================================
// STATCARD COMPONENT
// ==========================================================
// A reusable card component to display key metrics (e.g. Total Bills,
// Monthly Subscription Cost, Today's Appointments).
// Updated with custom color palette:
// Primary: #06A9C9, Secondary: #2F8196, Tertiary: #6176AC, Neutral: #747782
// ==========================================================

function StatCard({ title, value, subtitle, icon, color = "#06A9C9", bgColor = "#e6f8fa", badge }) {
  // Container style for the stat card
  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "20px 24px",
    boxShadow: "0 2px 10px rgba(47, 129, 150, 0.06)",
    border: "1px solid #e2e4e8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: "220px",
    flex: "1 1 calc(20% - 16px)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  };

  // Header style containing title and icon
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  };

  // Title label style (using Neutral #747782)
  const titleStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#747782",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0
  };

  // Icon container style
  const iconContainerStyle = {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    backgroundColor: bgColor,
    color: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold"
  };

  // Big number/value display style
  const valueStyle = {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e232d",
    margin: "0 0 6px 0",
    lineHeight: 1.2
  };

  // Subtitle / footnote style
  const subtitleStyle = {
    fontSize: "12px",
    color: "#747782",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "6px"
  };

  // Optional badge style
  const badgeStyle = {
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "12px",
    backgroundColor: bgColor,
    color: color
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <span style={titleStyle}>{title}</span>
        <div style={iconContainerStyle}>
          {icon}
        </div>
      </div>
      <div>
        <h3 style={valueStyle}>{value}</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={subtitleStyle}>{subtitle}</p>
          {badge && <span style={badgeStyle}>{badge}</span>}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
