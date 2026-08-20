import React from 'react';

export default function DocumentForm({
  editingId,
  formData,
  errorMessage,
  onChange,
  onSubmit,
  onCancel
}) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      border: '1px solid #E5E3DA',
      padding: '32px',
      marginBottom: '40px',
      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)'
    }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#222222', marginBottom: '20px' }}>
        {editingId ? 'Edit Document' : 'Add New Document'}
      </h3>

      {errorMessage && (
        <div style={{
          color: '#9B1C1C',
          background: '#FDF2F2',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '0.85rem',
          marginBottom: '20px',
          fontWeight: 700,
          border: '1px solid #F8B4B4'
        }}>
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>
            Document Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="e.g. Driving Licence"
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>
            Document Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={onChange}
            style={{ width: '100%', backgroundColor: '#FAF9F5' }}
          >
            <option value="Identity">Identity</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Insurance">Insurance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>
            Issue Date
          </label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={onChange}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>
            Expiry Date *
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={onChange}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>
            Notes
          </label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={onChange}
            placeholder="Optional notes or document number"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              backgroundColor: '#EAE8DF',
              color: '#222222',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '12px 28px',
              borderRadius: '9999px',
              backgroundColor: '#222222',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            {editingId ? 'Save Changes' : 'Add Document'}
          </button>
        </div>
      </form>
    </div>
  );
}
