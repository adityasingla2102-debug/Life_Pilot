import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Documents from './pages/Documents.jsx';
import Vehicles from './pages/Vehicles.jsx';
import Warranties from './pages/Warranties.jsx';
import {
  INITIAL_DOCUMENTS,
  INITIAL_VEHICLES,
  INITIAL_WARRANTIES
} from './data/initialData.jsx';

export default function App() {
  // Navigation state (E1 simple conditional rendering)
  const [activeTab, setActiveTab] = useState('Documents');

  // Module state management
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [warranties, setWarranties] = useState(INITIAL_WARRANTIES);

  // Render active module component
  const renderActiveModule = () => {
    switch (activeTab) {
      case 'Documents':
        return <Documents documents={documents} setDocuments={setDocuments} />;
      case 'Vehicles':
        return <Vehicles vehicles={vehicles} setVehicles={setVehicles} />;
      case 'Warranties':
        return <Warranties warranties={warranties} setWarranties={setWarranties} />;
      default:
        return <Documents documents={documents} setDocuments={setDocuments} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F3F2EC' }}>
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Module Content */}
      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        {renderActiveModule()}
      </main>
    </div>
  );
}
