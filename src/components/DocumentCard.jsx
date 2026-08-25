import React from 'react';
import StatusBadge from './StatusBadge.jsx';
import { getExpiryStatus, getRemainingDaysText } from '../data/initialData.jsx';

// Card component displaying individual document with status badge and remaining days
export default function DocumentCard({ document, onEdit, onDelete }) {
  const status = getExpiryStatus(document.expiryDate, 'Valid');
  const remainingDays = getRemainingDaysText(document.expiryDate);

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
    display: 'inline-block'
  };

  const actionButtonStyle = (isDelete = false) => ({
    flex: 1,
    padding: '8px 14px',
    borderRadius: '9999px',
    backgroundColor: isDelete ? '#FDF2F2' : '#EAE8DF',
    color: isDelete ? '#9B1C1C' : '#222222',
    fontSize: '0.8rem',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer'
  });

  return (
    <div style={cardStyle}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={badgeStyle}>{document.type}</span>
          <StatusBadge status={status} />
        </div>
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
          {remainingDays && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#737373' }}>Remaining:</span>
              <strong style={{ color: status === 'Expired' ? '#9B1C1C' : '#222222' }}>{remainingDays}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Edit and Delete Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E3DA' }}>
        <button style={actionButtonStyle(false)} onClick={() => onEdit(document)}>
          Edit
        </button>
        <button style={actionButtonStyle(true)} onClick={() => onDelete(document.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

