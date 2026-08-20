import React from 'react';
import StatusBadge from './StatusBadge.jsx';
import { getExpiryStatus } from '../data/initialData.jsx';

export default function VehicleCard({ vehicle, onEdit, onDelete }) {
  const insuranceStatus = getExpiryStatus(vehicle.insuranceExpiry);
  const pucStatus = getExpiryStatus(vehicle.pucExpiry);
  const serviceStatus = getExpiryStatus(vehicle.serviceDate);

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      border: '1px solid #E5E3DA',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
    }}>
      <div>
        {/* Top Header Row */}
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
            🚗
          </div>
          <StatusBadge status={insuranceStatus} />
        </div>

        {/* Title & Registration Badge */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#222222', marginBottom: '6px', letterSpacing: '-0.01em' }}>
            {vehicle.name}
          </h3>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#222222',
            backgroundColor: '#EAE8DF',
            padding: '4px 12px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            display: 'inline-block'
          }}>
            {vehicle.vehicleNumber} ({vehicle.type})
          </span>
        </div>

        {/* Key Dates List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px' }}>
          {vehicle.purchaseDate && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#737373' }}>Purchased</span>
              <strong style={{ color: '#222222', fontWeight: 600 }}>{vehicle.purchaseDate}</strong>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
            <span style={{ color: '#737373' }}>Next Service</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ color: '#222222', fontWeight: 700 }}>{vehicle.serviceDate || 'N/A'}</strong>
              {serviceStatus === 'EXPIRING SOON' && (
                <span style={{ fontSize: '0.65rem', background: '#FFF3BE', color: '#856404', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                  Due Soon
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: '#737373' }}>Insurance Expiry</span>
            <strong style={{ color: '#222222', fontWeight: 700 }}>{vehicle.insuranceExpiry || 'N/A'}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
            <span style={{ color: '#737373' }}>PUC Expiry</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ color: '#222222', fontWeight: 700 }}>{vehicle.pucExpiry || 'N/A'}</strong>
              <StatusBadge status={pucStatus} />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '18px', borderTop: '1px solid #E5E3DA' }}>
        <button
          onClick={() => onEdit(vehicle)}
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
          onClick={() => onDelete(vehicle.id)}
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

