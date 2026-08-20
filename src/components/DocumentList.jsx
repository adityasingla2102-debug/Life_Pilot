import React from 'react';
import DocumentCard from './DocumentCard.jsx';

// Component responsible for mapping over the document list
export default function DocumentList({ documents }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  };

  return (
    <div style={gridStyle}>
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
}
