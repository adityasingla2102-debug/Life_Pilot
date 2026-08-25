import React from 'react';

export default function StatusBadge({ status }) {
  const badgeText = String(status || '').trim();
  let badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '0.72rem',
    fontWeight: '700',
    letterSpacing: '0.02em'
  };

  const upper = badgeText.toUpperCase();

  if (upper === 'VALID' || upper === 'ACTIVE') {
    badgeStyle = {
      ...badgeStyle,
      backgroundColor: '#EAE8DF',
      color: '#222222',
      border: '1px solid #D9D8D2'
    };
  } else if (upper === 'EXPIRING SOON' || upper === 'SERVICE DUE') {
    badgeStyle = {
      ...badgeStyle,
      backgroundColor: '#FFF3BE',
      color: '#856404',
      border: '1px solid #FFEBAA'
    };
  } else {
    badgeStyle = {
      ...badgeStyle,
      backgroundColor: '#FDF2F2',
      color: '#9B1C1C',
      border: '1px solid #F8B4B4'
    };
  }

  return (
    <span style={badgeStyle}>
      {badgeText}
    </span>
  );
}


