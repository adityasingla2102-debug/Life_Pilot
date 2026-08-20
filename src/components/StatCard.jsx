import React from 'react';

export default function StatCard({ title, value, color = '#222222' }) {
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

