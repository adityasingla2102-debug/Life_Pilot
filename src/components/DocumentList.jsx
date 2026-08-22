import React from 'react';
import DocumentCard from './DocumentCard.jsx';

// Component mapping over document list and passing down action handlers
export default function DocumentList({ documents, onEdit, onDelete }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  };

  return (
    <div style={gridStyle}>
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
