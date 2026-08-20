import React from 'react';
import DocumentList from './DocumentList.jsx';

// Main Documents Page component containing sample data and layout
export default function DocumentsPage() {
  const initialDocuments = [
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
  ];

  const pageContainerStyle = {
    padding: '40px 48px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '36px',
    flexWrap: 'wrap',
    gap: '20px'
  };

  const buttonStyle = {
    backgroundColor: '#222222',
    color: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '0.88rem',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={pageContainerStyle}>
      {/* Page Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#222222', lineHeight: 1.1 }}>
            Documents
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#737373', marginTop: '6px' }}>
            Keep your important documents organized.
          </p>
        </div>

        <button style={buttonStyle}>
          + Add Document
        </button>
      </div>

      {/* Render Document List Component */}
      <DocumentList documents={initialDocuments} />
    </div>
  );
}
