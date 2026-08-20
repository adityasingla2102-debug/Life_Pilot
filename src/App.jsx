import React from 'react';
import DocumentsPage from './components/DocumentsPage.jsx';

// Root App component providing warm cream background container
export default function App() {
  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#F3F2EC',
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  };

  return (
    <div style={appStyle}>
      <DocumentsPage />
    </div>
  );
}
