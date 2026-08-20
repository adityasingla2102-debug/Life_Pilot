import React, { useState } from 'react';
import StatCard from '../components/StatCard.jsx';
import WarrantyCard from '../components/WarrantyCard.jsx';
import { getExpiryStatus } from '../data/initialData.jsx';

export default function Warranties({ warranties, setWarranties }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    productName: '',
    category: 'Electronics',
    purchaseDate: '',
    warrantyExpiry: '',
    seller: '',
    notes: ''
  });

  const totalWarranties = warranties.length;
  const activeWarranties = warranties.filter(w => getExpiryStatus(w.warrantyExpiry) === 'VALID').length;
  const expiringWarranties = warranties.filter(w => getExpiryStatus(w.warrantyExpiry) === 'EXPIRING SOON').length;
  const expiredWarranties = warranties.filter(w => getExpiryStatus(w.warrantyExpiry) === 'EXPIRED').length;

  const filteredWarranties = warranties.filter(w =>
    w.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData({ productName: '', category: 'Electronics', purchaseDate: '', warrantyExpiry: '', seller: '', notes: '' });
    setShowForm(true);
    setErrorMessage('');
  };

  const handleEditClick = (w) => {
    setEditingId(w.id);
    setFormData({
      productName: w.productName,
      category: w.category,
      purchaseDate: w.purchaseDate,
      warrantyExpiry: w.warrantyExpiry,
      seller: w.seller || '',
      notes: w.notes || ''
    });
    setShowForm(true);
    setErrorMessage('');
  };

  const handleDelete = (id) => {
    setWarranties(warranties.filter(w => w.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName.trim() || !formData.warrantyExpiry) {
      setErrorMessage('Product Name and Warranty Expiry Date are required!');
      return;
    }

    if (editingId) {
      setWarranties(warranties.map(w =>
        w.id === editingId ? { ...w, ...formData } : w
      ));
    } else {
      const newWarranty = {
        id: Date.now(),
        ...formData
      };
      setWarranties([...warranties, newWarranty]);
    }

    setShowForm(false);
    setFormData({ productName: '', category: 'Electronics', purchaseDate: '', warrantyExpiry: '', seller: '', notes: '' });
  };

  return (
    <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#222222', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Warranties
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#737373', marginTop: '6px' }}>
            Never lose track of your product warranties.
          </p>
        </div>

        <button
          onClick={handleOpenAddForm}
          style={{
            backgroundColor: '#222222',
            color: '#FFFFFF',
            padding: '12px 26px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
          }}
        >
          + Add Warranty
        </button>
      </div>

      {/* Statistics Banner */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '36px' }}>
        <StatCard title="Total" value={totalWarranties} color="#222222" />
        <StatCard title="Active" value={activeWarranties} color="#222222" />
        <StatCard title="Expiring Soon" value={expiringWarranties} color="#856404" />
        <StatCard title="Expired" value={expiredWarranties} color="#9B1C1C" />
      </div>

      {/* Search Input Bar */}
      <div style={{ marginBottom: '32px' }}>
        <input
          type="text"
          placeholder="🔍 Search warranties by product name or seller..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '480px',
            height: '50px',
            padding: '0 22px',
            borderRadius: '9999px',
            border: '1px solid #E5E3DA',
            backgroundColor: '#FFFFFF',
            outline: 'none',
            fontSize: '0.9rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
          }}
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E5E3DA',
          padding: '32px',
          marginBottom: '40px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#222222', marginBottom: '20px' }}>
            {editingId ? 'Edit Warranty' : 'Add New Warranty'}
          </h3>

          {errorMessage && (
            <div style={{ color: '#9B1C1C', background: '#FDF2F2', padding: '12px 16px', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '20px', fontWeight: 700, border: '1px solid #F8B4B4' }}>
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Product Name *</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="e.g. Laptop"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{ width: '100%', backgroundColor: '#FAF9F5' }}
              >
                <option value="Electronics">Electronics</option>
                <option value="Mobile">Mobile & Tablets</option>
                <option value="Appliances">Home Appliances</option>
                <option value="Audio">Audio & Headphones</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Warranty Expiry Date *</label>
              <input
                type="date"
                name="warrantyExpiry"
                value={formData.warrantyExpiry}
                onChange={handleInputChange}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Seller Store</label>
              <input
                type="text"
                name="seller"
                value={formData.seller}
                onChange={handleInputChange}
                placeholder="e.g. Apple Store, Amazon"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#222222', display: 'block', marginBottom: '6px' }}>Notes</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Optional notes or invoice number"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ padding: '12px 24px', borderRadius: '9999px', backgroundColor: '#EAE8DF', color: '#222222', fontWeight: 700, fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '12px 28px', borderRadius: '9999px', backgroundColor: '#222222', color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem' }}
              >
                {editingId ? 'Save Changes' : 'Add Warranty'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid List */}
      {filteredWarranties.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: '#FFFFFF', borderRadius: '24px', color: '#737373', border: '1px solid #E5E3DA' }}>
          No warranties found. Click "+ Add Warranty" to register one.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredWarranties.map(w => (
            <WarrantyCard
              key={w.id}
              warranty={w}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

