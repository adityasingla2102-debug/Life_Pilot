import React, { useState } from 'react';
import DocumentList from './DocumentList.jsx';

// Documents Page managing CRUD operations, validation, and controlled form
export default function DocumentsPage() {
  // Documents state list initialized with sample data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Driving Licence',
      type: 'Government ID',
      issueDate: '15 Aug 2021',
      expiryDate: '15 Aug 2031'
    },
    {
      id: 2,
      name: 'Passport',
      type: 'Identity',
      issueDate: '10 Jan 2022',
      expiryDate: '10 Jan 2032'
    }
  ]);

  // Form visibility state
  const [showForm, setShowForm] = useState(false);

  // Edit state holding ID of document currently being edited
  const [editingId, setEditingId] = useState(null);

  // Validation error message state
  const [errorMessage, setErrorMessage] = useState('');

  // Controlled form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'Government ID',
    issueDate: '',
    expiryDate: ''
  });

  // Input change handler for controlled form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open form for adding a new document
  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData({ name: '', type: 'Government ID', issueDate: '', expiryDate: '' });
    setErrorMessage('');
    setShowForm(true);
  };

  // Populate form with existing document details for editing
  const handleEditClick = (doc) => {
    setEditingId(doc.id);
    setFormData({
      name: doc.name,
      type: doc.type,
      issueDate: doc.issueDate,
      expiryDate: doc.expiryDate
    });
    setErrorMessage('');
    setShowForm(true);
  };

  // Delete document by filtering out matching ID
  const handleDeleteClick = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  // Form submit handler for Add and Update operations
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation checking required fields
    if (!formData.name.trim() || !formData.type.trim() || !formData.issueDate || !formData.expiryDate) {
      setErrorMessage('All fields (Document Name, Type, Issue Date, Expiry Date) are required!');
      return;
    }

    if (editingId) {
      // Update existing document using map()
      setDocuments(documents.map((doc) =>
        doc.id === editingId ? { ...doc, ...formData } : doc
      ));
    } else {
      // Add new document with simple unique timestamp ID
      const newDocument = {
        id: Date.now(),
        ...formData
      };
      setDocuments([...documents, newDocument]);
    }

    // Reset form and hide modal
    setFormData({ name: '', type: 'Government ID', issueDate: '', expiryDate: '' });
    setEditingId(null);
    setErrorMessage('');
    setShowForm(false);
  };

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
    <div style={{ padding: '40px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#222222', lineHeight: 1.1 }}>
            Documents
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#737373', marginTop: '6px' }}>
            Keep your important documents organized.
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
          + Add Document
        </button>
      </div>

      {/* Controlled Add/Edit Document Form */}
      {showForm && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E5E3DA',
          padding: '28px',
          marginBottom: '36px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#222222', marginBottom: '16px' }}>
            {editingId ? 'Edit Document' : 'Add New Document'}
          </h3>

          {/* Validation Error Message */}
          {errorMessage && (
            <div style={{ color: '#9B1C1C', backgroundColor: '#FDF2F2', padding: '10px 14px', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '16px', fontWeight: '700' }}>
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#737373', display: 'block', marginBottom: '6px' }}>
                Document Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Driving Licence"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#737373', display: 'block', marginBottom: '6px' }}>
                Document Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="Government ID">Government ID</option>
                <option value="Identity">Identity</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Insurance">Insurance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#737373', display: 'block', marginBottom: '6px' }}>
                Issue Date *
              </label>
              <input
                type="text"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                placeholder="e.g. 15 Aug 2021"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#737373', display: 'block', marginBottom: '6px' }}>
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="e.g. 15 Aug 2031"
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ padding: '10px 20px', borderRadius: '9999px', backgroundColor: '#EAE8DF', color: '#222222', fontWeight: '700', fontSize: '0.82rem', border: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '10px 24px', borderRadius: '9999px', backgroundColor: '#222222', color: '#FFFFFF', fontWeight: '700', fontSize: '0.82rem', border: 'none', cursor: 'pointer' }}
              >
                {editingId ? 'Update Document' : 'Add Document'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Render Document List Component */}
      <DocumentList
        documents={documents}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
}
