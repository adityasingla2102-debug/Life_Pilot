import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = '#222222',
  bgColor = '#e6f8fa',
  badge
}) {

  if (icon || subtitle || badge || (bgColor && bgColor !== '#e6f8fa')) {
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

    const headerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px"
    };

    const titleStyle = {
      fontSize: "13px",
      fontWeight: "600",
      color: "#747782",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      margin: 0
    };

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

    const valueStyle = {
      fontSize: "26px",
      fontWeight: "700",
      color: "#1e232d",
      margin: "0 0 6px 0",
      lineHeight: 1.2
    };

    const subtitleStyle = {
      fontSize: "12px",
      color: "#747782",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "6px"
    };

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
          {icon && <div style={iconContainerStyle}>{icon}</div>}
        </div>
        <div>
          <h3 style={valueStyle}>{value}</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
            {badge && <span style={badgeStyle}>{badge}</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      padding: '24px 28px',
      border: '1px solid #E5E3DA',
      flex: '1 1 200px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: '180px'
    }}>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: '800',
        color: color,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        marginBottom: '10px'
      }}>
        {value}
      </div>
      <span style={{
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#737373',
        letterSpacing: '0.01em'
      }}>
        {title}
      </span>
    </div>
  );
}
