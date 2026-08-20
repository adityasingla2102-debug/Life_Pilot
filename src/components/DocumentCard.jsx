import React from 'react';
import StatusBadge from './StatusBadge.jsx';
import { getExpiryStatus } from '../data/initialData.jsx';

export default function DocumentCard({ document, onEdit, onDelete }) {
  const status = getExpiryStatus(document.expiryDate);

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      border: '1px solid #E5E3DA',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      <div>
        {/* Top Row: Icon & Status Badge */}
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
            📄
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Title & Document Type Pill */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#222222', marginBottom: '6px', letterSpacing: '-0.01em' }}>
            {document.name}
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
            {document.type}
          </span>
        </div>

        {/* Metadata Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px' }}>
          {document.issueDate && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#737373' }}>Issue Date</span>
              <strong style={{ color: '#222222', fontWeight: 600 }}>{document.issueDate}</strong>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: '#737373' }}>Expires</span>
            <strong style={{ color: '#222222', fontWeight: 700 }}>{document.expiryDate || 'N/A'}</strong>
          </div>

          {document.notes && (
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
              "{document.notes}"
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #E5E3DA' }}>
        <button
          onClick={() => onEdit(document)}
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
          onClick={() => onDelete(document.id)}
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

