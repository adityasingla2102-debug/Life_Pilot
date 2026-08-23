import React from 'react';

// Controlled form component for adding and editing warranties with basic validation message
export default function WarrantyForm({
  editingId,
  formData,
  errorMessage,
  onChange,
  onSubmit,
  onCancel
}) {
  const inputStyle = {
    width: '100%',
    height: '44px',
    padding: '0 14px',
    borderRadius: '12px',
    border: '1px solid #E5E3DA',
    backgroundColor: '#FAF9F5',
    fontSize: '0.88rem',
    color: '#222222',
    outline: 'none',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #E5E3DA',
      padding: '28px',
      marginBottom: '36px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
    }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#222222', marginBottom: '16px' }}>
        {editingId ? 'Edit Warranty' : 'Add New Warranty'}
      </h3>

      {errorMessage && (
        <div style={{ color: '#9B1C1C', backgroundColor: '#FDF2F2', padding: '10px 14px', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '16px', fontWeight: '700' }}>
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#737373', display: 'block', marginBottom: '6px' }}>
            Product Name *
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={onChange}
            placeholder="e.g. MacBook Air"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#737373', display: 'block', marginBottom: '6px' }}>
            Purchase Date *
          </label>
          <input
            type="text"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={onChange}
            placeholder="e.g. 15 Aug 2025"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#737373', display: 'block', marginBottom: '6px' }}>
            Warranty Expiry *
          </label>
          <input
            type="text"
            name="warrantyExpiry"
            value={formData.warrantyExpiry}
            onChange={onChange}
            placeholder="e.g. 15 Aug 2027"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#737373', display: 'block', marginBottom: '6px' }}>
            Notes
          </label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={onChange}
            placeholder="e.g. AppleCare+ included"
            style={inputStyle}
          />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 20px', borderRadius: '9999px', backgroundColor: '#EAE8DF', color: '#222222', fontWeight: '700', fontSize: '0.82rem', border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ padding: '10px 24px', borderRadius: '9999px', backgroundColor: '#222222', color: '#FFFFFF', fontWeight: '700', fontSize: '0.82rem', border: 'none', cursor: 'pointer' }}
          >
            {editingId ? 'Update Warranty' : 'Add Warranty'}
          </button>
        </div>
      </form>
    </div>
  );
}
