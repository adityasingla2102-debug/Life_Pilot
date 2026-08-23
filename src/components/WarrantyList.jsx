import React from 'react';
import WarrantyCard from './WarrantyCard.jsx';

// Component mapping over warranty array to display cards or empty state message
export default function WarrantyList({ warranties, onEdit, onDelete }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  };

  if (warranties.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px', backgroundColor: '#FFFFFF', borderRadius: '20px', color: '#737373', border: '1px solid #E5E3DA' }}>
        No warranties found. Click "+ Add Warranty" to create one.
      </div>
    );
  }

  return (
    <div style={gridStyle}>
      {warranties.map((warranty) => (
        <WarrantyCard
          key={warranty.id}
          warranty={warranty}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
