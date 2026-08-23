import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import DocumentsPage from './components/DocumentsPage.jsx';
import Vehicles from './pages/Vehicles.jsx';
import WarrantiesPage from './components/WarrantiesPage.jsx';
import { INITIAL_VEHICLES } from './data/initialData.jsx';

// Root App component with Sidebar navigation supporting Person 2 modules
export default function App() {
  const [activeTab, setActiveTab] = useState('Warranties');
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);

  const appStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F3F2EC',
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  };

  return (
    <div style={appStyle}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'Documents' && <DocumentsPage />}
        {activeTab === 'Vehicles' && <Vehicles vehicles={vehicles} setVehicles={setVehicles} />}
        {activeTab === 'Warranties' && <WarrantiesPage />}
      </main>
    </div>
  );
}
