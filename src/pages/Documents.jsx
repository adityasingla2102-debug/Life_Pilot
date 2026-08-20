import React, { useState } from 'react';
import StatCard from '../components/StatCard.jsx';
import DocumentCard from '../components/DocumentCard.jsx';
import DocumentForm from '../components/DocumentForm.jsx';
import { getExpiryStatus } from '../data/initialData.jsx';

export default function Documents({ documents, setDocuments }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    type: 'Identity',
    issueDate: '',
    expiryDate: '',
    notes: ''
  });

  const totalDocs = documents.length;
  const validDocs = documents.filter(d => getExpiryStatus(d.expiryDate) === 'VALID').length;
  const expiringDocs = documents.filter(d => getExpiryStatus(d.expiryDate) === 'EXPIRING SOON').length;
  const expiredDocs = documents.filter(d => getExpiryStatus(d.expiryDate) === 'EXPIRED').length;

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData({ name: '', type: 'Identity', issueDate: '', expiryDate: '', notes: '' });
    setShowForm(true);
    setErrorMessage('');
  };

  const handleEditClick = (doc) => {
    setEditingId(doc.id);
    setFormData({
      name: doc.name,
      type: doc.type,
      issueDate: doc.issueDate,
      expiryDate: doc.expiryDate,
      notes: doc.notes || ''
    });
    setShowForm(true);
    setErrorMessage('');
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.expiryDate) {
      setErrorMessage('Document Name and Expiry Date are required!');
      return;
    }

    if (editingId) {
      setDocuments(documents.map(doc =>
        doc.id === editingId ? { ...doc, ...formData } : doc
      ));
    } else {
      const newDoc = {
        id: Date.now(),
        ...formData
      };
      setDocuments([...documents, newDoc]);
    }

    setShowForm(false);
    setFormData({ name: '', type: 'Identity', issueDate: '', expiryDate: '', notes: '' });
  };

  return (
    <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#222222', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
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
            padding: '12px 26px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
          }}
        >
          + Add Document
        </button>
      </div>

      {/* Statistics Banner */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '36px' }}>
        <StatCard title="Total Documents" value={totalDocs} color="#222222" />
        <StatCard title="Valid" value={validDocs} color="#222222" />
        <StatCard title="Expiring Soon" value={expiringDocs} color="#856404" />
        <StatCard title="Expired" value={expiredDocs} color="#9B1C1C" />
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '32px' }}>
        <input
          type="text"
          placeholder="🔍 Search documents by name or type..."
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

      {/* Add / Edit Form Modal Sub-component */}
      {showForm && (
        <DocumentForm
          editingId={editingId}
          formData={formData}
          errorMessage={errorMessage}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Grid List */}
      {filteredDocuments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px', backgroundColor: '#FFFFFF', borderRadius: '24px', color: '#737373', border: '1px solid #E5E3DA' }}>
          No documents found. Click "+ Add Document" to create one.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredDocuments.map(doc => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}


