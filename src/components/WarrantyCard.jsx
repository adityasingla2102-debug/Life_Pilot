import React from 'react';
import StatusBadge from './StatusBadge.jsx';
import { getExpiryStatus, getRemainingDays } from '../data/initialData.jsx';

export default function WarrantyCard({ warranty, onEdit, onDelete }) {
  const status = getExpiryStatus(warranty.warrantyExpiry);
  const remainingDays = getRemainingDays(warranty.warrantyExpiry);

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      border: '1px solid #E5E3DA',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
    }}>
      <div>
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            backgroundColor: '#F3F2EC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem'
          }}>
            🛡️
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Title & Category Badge */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#222222', marginBottom: '6px', letterSpacing: '-0.01em' }}>
            {warranty.productName}
          </h3>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: '#737373',
            backgroundColor: '#EAE8DF',
            padding: '4px 12px',
            borderRadius: '9999px',
            display: 'inline-block'
          }}>
            {warranty.category}
          </span>
        </div>

        {/* Details List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px' }}>
          {warranty.purchaseDate && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#737373' }}>Purchase Date</span>
              <strong style={{ color: '#222222', fontWeight: 600 }}>{warranty.purchaseDate}</strong>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: '#737373' }}>Warranty Expiry</span>
            <strong style={{ color: '#222222', fontWeight: 700 }}>{warranty.warrantyExpiry || 'N/A'}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: '#737373' }}>Remaining Days</span>
            <strong style={{ color: status === 'Expired' ? '#9B1C1C' : '#222222', fontWeight: 700 }}>
              {status === 'Expired' ? '0 days (Expired)' : `${remainingDays} days`}
            </strong>
          </div>

          {warranty.seller && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#737373' }}>Seller Store</span>
              <strong style={{ color: '#222222', fontWeight: 600 }}>{warranty.seller}</strong>
            </div>
          )}

          {warranty.notes && (
            <div style={{
              marginTop: '8px',
              background: '#F3F2EC',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.78rem',
              color: '#555555',
              fontStyle: 'italic',
              lineHeight: 1.4
            }}>
              "{warranty.notes}"
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #E5E3DA' }}>
        <button
          onClick={() => onEdit(warranty)}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: '9999px',
            backgroundColor: '#EAE8DF',
            color: '#222222',
            fontSize: '0.82rem',
            fontWeight: 700
          }}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(warranty.id)}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: '9999px',
            backgroundColor: '#FDF2F2',
            color: '#9B1C1C',
            fontSize: '0.82rem',
            fontWeight: 700
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
