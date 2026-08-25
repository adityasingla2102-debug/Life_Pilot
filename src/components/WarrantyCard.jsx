import React from 'react';
import StatusBadge from './StatusBadge.jsx';
import { getExpiryStatus, getRemainingDaysText } from '../data/initialData.jsx';

// Card component displaying individual warranty details with status badge, remaining days, and Edit/Delete actions
export default function WarrantyCard({ warranty, onEdit, onDelete }) {
  const status = getExpiryStatus(warranty.warrantyExpiry, 'Active');
  const remainingDays = getRemainingDaysText(warranty.warrantyExpiry);

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
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#222222', margin: 0 }}>
            {warranty.productName}
          </h3>
          <StatusBadge status={status} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#737373' }}>Purchase Date:</span>
            <strong style={{ color: '#222222' }}>{warranty.purchaseDate}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#737373' }}>Warranty Expiry:</span>
            <strong style={{ color: '#222222' }}>{warranty.warrantyExpiry}</strong>
          </div>
          {remainingDays && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#737373' }}>Remaining:</span>
              <strong style={{ color: status === 'Expired' ? '#9B1C1C' : '#222222' }}>{remainingDays}</strong>
            </div>
          )}
          {warranty.notes && (
            <div style={{ marginTop: '8px', padding: '10px 12px', backgroundColor: '#FAF9F5', borderRadius: '8px', fontSize: '0.8rem', color: '#555555' }}>
              {warranty.notes}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E3DA' }}>
        <button style={actionButtonStyle(false)} onClick={() => onEdit(warranty)}>
          Edit
        </button>
        <button style={actionButtonStyle(true)} onClick={() => onDelete(warranty.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

