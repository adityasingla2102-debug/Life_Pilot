import React from 'react';

// Card component displaying individual document information via props
export default function DocumentCard({ document }) {
  const cardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    border: '1px solid #E5E3DA',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const badgeStyle = {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#222222',
    backgroundColor: '#F4D35E',
    padding: '4px 12px',
    borderRadius: '9999px',
    display: 'inline-block',
    alignSelf: 'flex-start',
    marginBottom: '16px'
  };

  return (
    <div style={cardStyle}>
      <div>
        <span style={badgeStyle}>{document.type}</span>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#222222', marginBottom: '16px' }}>
          {document.name}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#737373' }}>Issue Date:</span>
            <strong style={{ color: '#222222' }}>{document.issueDate}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#737373' }}>Expiry Date:</span>
            <strong style={{ color: '#222222' }}>{document.expiryDate}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
