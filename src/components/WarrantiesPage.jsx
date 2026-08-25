import React, { useState } from 'react';
import WarrantyList from './WarrantyList.jsx';
import WarrantyForm from './WarrantyForm.jsx';

// Warranties page managing state, controlled form, validation, and CRUD operations
export default function WarrantiesPage() {
  const [warranties, setWarranties] = useState([
    {
      id: 1,
      productName: 'MacBook Air',
      purchaseDate: '15 Aug 2025',
      warrantyExpiry: '15 Sep 2026',
      notes: 'AppleCare+ included'
    },
    {
      id: 2,
      productName: 'Samsung Refrigerator',
      purchaseDate: '10 Jan 2025',
      warrantyExpiry: '10 Jan 2027',
      notes: '2 year manufacturer warranty'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    productName: '',
    purchaseDate: '',
    warrantyExpiry: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData({ productName: '', purchaseDate: '', warrantyExpiry: '', notes: '' });
    setErrorMessage('');
    setShowForm(true);
  };

  const handleEditClick = (warranty) => {
    setEditingId(warranty.id);
    setFormData({
      productName: warranty.productName,
      purchaseDate: warranty.purchaseDate,
      warrantyExpiry: warranty.warrantyExpiry,
      notes: warranty.notes || ''
    });
    setErrorMessage('');
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setWarranties(warranties.filter((w) => w.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.productName.trim() || !formData.purchaseDate.trim() || !formData.warrantyExpiry.trim()) {
      setErrorMessage('Please fill in all required fields (Product Name, Purchase Date, Warranty Expiry).');
      return;
    }

    if (editingId) {
      setWarranties(warranties.map((w) =>
        w.id === editingId ? { ...w, ...formData } : w
      ));
    } else {
      const newWarranty = {
        id: Date.now(),
        ...formData
      };
      setWarranties([...warranties, newWarranty]);
    }

    setFormData({ productName: '', purchaseDate: '', warrantyExpiry: '', notes: '' });
    setEditingId(null);
    setErrorMessage('');
    setShowForm(false);
  };

  return (
    <div style={{ padding: '40px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#222222', lineHeight: 1.1 }}>
            Warranties
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#737373', marginTop: '6px' }}>
            Keep track of your product warranties.
          </p>
        </div>

        <button
          onClick={handleOpenAddForm}
          style={{
            backgroundColor: '#222222',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontWeight: '700',
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            border: 'none'
          }}
        >
          + Add Warranty
        </button>
      </div>

      {showForm && (
        <WarrantyForm
          editingId={editingId}
          formData={formData}
          errorMessage={errorMessage}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingId(null);
            setFormData({ productName: '', purchaseDate: '', warrantyExpiry: '', notes: '' });
          }}
        />
      )}

      <WarrantyList
        warranties={warranties}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
}
