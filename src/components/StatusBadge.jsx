import React from 'react';

export default function StatusBadge({ status }) {
  let badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 14px',
    borderRadius: '9999px',
    fontSize: '0.72rem',
    fontWeight: '700',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  };

  if (status === 'VALID' || status === 'Active') {
    badgeStyle = {
      ...badgeStyle,
      backgroundColor: '#EAE8DF',
      color: '#222222',
      border: '1px solid #D9D8D2'
    };
  } else if (status === 'EXPIRING SOON' || status === 'Service Due') {
    badgeStyle = {
      ...badgeStyle,
      backgroundColor: '#FFF3BE',
      color: '#856404',
      border: '1px solid #FFEBAA'
    };
  } else {
    // EXPIRED
    badgeStyle = {
      ...badgeStyle,
      backgroundColor: '#FDF2F2',
      color: '#9B1C1C',
      border: '1px solid #F8B4B4'
    };
  }

  return (
    <span style={badgeStyle}>
      {status}
    </span>
  );
}

