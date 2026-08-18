import React, { useState } from 'react';
import Bills from './components/Bills.jsx';
import Subscriptions from './components/Subscriptions.jsx';
import Appointments from './components/Appointments.jsx';

// ==========================================================
// LIFEADMIN — MAIN APP CONTAINER (PERSON 3)
// ==========================================================
// Theme:
// Background: Cream / Off-white (#faf9f5)
// Cards: White (#ffffff) with rounded corners & subtle shadows
// Accent: Soft Yellow / Amber (#f59e0b)
// Text: Dark (#1e293b)
// ==========================================================

function App() {
  // Current active view state: 'bills' | 'subscriptions' | 'appointments'
  const [activeTab, setActiveTab] = useState('bills');

  // Inline container styles
  const appContainerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#faf9f5",
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
  };

  const sidebarStyle = {
    width: "250px",
    backgroundColor: "#181c24",
    color: "#f4f5f7",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexShrink: 0,
    boxShadow: "2px 0 12px rgba(0, 0, 0, 0.08)"
  };

  const brandStyle = {
    padding: "0 8px 22px 8px",
    borderBottom: "1px solid #282f3d"
  };

  const navListStyle = {
    listStyle: "none",
    padding: 0,
    margin: "24px 0 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  };

  const navItemBtnStyle = (isActive) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 16px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: isActive ? "#f59e0b" : "transparent",
    color: isActive ? "#181c24" : "#9ca3af",
    fontSize: "14px",
    fontWeight: isActive ? "700" : "500",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s ease",
    boxShadow: isActive ? "0 2px 8px rgba(245, 158, 11, 0.3)" : "none"
  });

  const mainContentStyle = {
    flex: 1,
    overflowY: "auto",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  };

  const integrationNoticeStyle = {
    backgroundColor: "#fffbeb",
    borderBottom: "1px solid #fef3c7",
    padding: "10px 36px",
    fontSize: "13px",
    color: "#92400e",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px"
  };

  return (
    <div style={appContainerStyle}>
      {/* ----------------- SIDEBAR NAVIGATION ----------------- */}
      <aside style={sidebarStyle}>
        <div>
          {/* Brand Header */}
          <div style={brandStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#f59e0b",
                  color: "#181c24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  boxShadow: "0 2px 6px rgba(245, 158, 11, 0.4)"
                }}
              >
                ⚡
              </div>
              <div>
                <h2 style={{ fontSize: "16px", fontWeight: "700", margin: 0, color: "#ffffff" }}>
                  LifeAdmin
                </h2>
                <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "600" }}>
                  Module 3 (Person 3)
                </span>
              </div>
            </div>
          </div>

          {/* Module 3 Nav Links */}
          <ul style={navListStyle}>
            <li>
              <button
                onClick={() => setActiveTab('bills')}
                style={navItemBtnStyle(activeTab === 'bills')}
              >
                <span style={{ fontSize: "17px" }}>📄</span>
                <span>Bills</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab('subscriptions')}
                style={navItemBtnStyle(activeTab === 'subscriptions')}
              >
                <span style={{ fontSize: "17px" }}>📦</span>
                <span>Subscriptions</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab('appointments')}
                style={navItemBtnStyle(activeTab === 'appointments')}
              >
                <span style={{ fontSize: "17px" }}>🗓️</span>
                <span>Appointments</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Sidebar Footer / Developer Info */}
        <div
          style={{
            padding: "14px",
            backgroundColor: "#202530",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#9ca3af",
            border: "1px solid #2d3444"
          }}
        >
          <div style={{ fontWeight: "600", color: "#ffffff", marginBottom: "4px" }}>
            👤 Person 3 Workspace
          </div>
          <div style={{ color: "#6b7280" }}>BTech 2nd Year Project</div>
          <div style={{ marginTop: "6px", fontSize: "11px", color: "#f59e0b", fontWeight: "600" }}>
            Evaluation 1 • Bills Module
          </div>
        </div>
      </aside>

      {/* ----------------- MAIN CONTENT AREA ----------------- */}
      <main style={mainContentStyle}>
        {/* Top Header Bar */}
        <div style={integrationNoticeStyle}>
          <div>
            ✨ <strong>LifeAdmin Dashboard:</strong> Evaluation 1 Active
          </div>
          <div style={{ fontSize: "12px", color: "#92400e", fontWeight: "600" }}>
            Current Module: <strong style={{ color: "#d97706" }}>{activeTab.toUpperCase()}</strong>
          </div>
        </div>

        {/* Dynamic Page Rendering */}
        <div style={{ flex: 1 }}>
          {activeTab === 'bills' && <Bills />}
          {activeTab === 'subscriptions' && <Subscriptions />}
          {activeTab === 'appointments' && <Appointments />}
        </div>
      </main>
    </div>
  );
}

// Export individual components for easy team import
export { Bills, Subscriptions, Appointments };

export default App;
