import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const sidebarStyle = {
    width: '260px',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #E5E3DA',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.02)'
  };

  const navItemStyle = (isActive) => ({
    width: '100%',
    padding: '12px 18px',
    borderRadius: '9999px',
    border: 'none',
    textAlign: 'left',
    fontSize: '0.88rem',
    fontWeight: isActive ? 700 : 500,
    backgroundColor: isActive ? '#222222' : 'transparent',
    color: isActive ? '#FFFFFF' : '#737373',
    marginBottom: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease'
  });

  return (
    <aside style={sidebarStyle}>
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: '#222222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F4D35E',
            fontSize: '1.1rem',
            fontWeight: 800
          }}>
            🧭
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#222222', lineHeight: 1, letterSpacing: '-0.02em' }}>
              LifeAdmin
            </h2>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px', display: 'block' }}>
              Personal Dashboard
            </span>
          </div>
        </div>

        {/* Core Navigation */}
        <div style={{ marginBottom: '36px' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '14px', paddingLeft: '8px' }}>
            Modules
          </span>

          <button
            style={navItemStyle(activeTab === 'Documents')}
            onClick={() => setActiveTab('Documents')}
          >
            <span>📄 Documents</span>
            {activeTab === 'Documents' && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F4D35E', display: 'inline-block' }} />
            )}
          </button>

          <button
            style={navItemStyle(activeTab === 'Vehicles')}
            onClick={() => setActiveTab('Vehicles')}
          >
            <span>🚗 Vehicles</span>
            {activeTab === 'Vehicles' && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F4D35E', display: 'inline-block' }} />
            )}
          </button>

          <button
            style={navItemStyle(activeTab === 'Warranties')}
            onClick={() => setActiveTab('Warranties')}
          >
            <span>🛡️ Warranties</span>
            {activeTab === 'Warranties' && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F4D35E', display: 'inline-block' }} />
            )}
          </button>
        </div>
      </div>

      {/* User Profile Footer */}
      <div style={{
        background: '#EAE8DF',
        borderRadius: '16px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#222222',
          color: '#F4D35E',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.85rem'
        }}>
          LA
        </div>
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#222222' }}>LifeAdmin Account</h4>
          <span style={{ fontSize: '0.7rem', color: '#737373' }}>Personal Plan</span>
        </div>
      </div>
    </aside>
  );
}

