import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Tasks from './pages/Tasks/Tasks';

// Toggle this to 'tasks' to view the Tasks page, or keep as 'dashboard' to view the Dashboard page
const CURRENT_VIEW = 'dashboard';

function App() {
  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="#242424" strokeWidth="2"/>
              <circle cx="12" cy="12" r="5" stroke="#242424" strokeWidth="2"/>
              <line x1="12" y1="9" x2="12" y2="12" stroke="#242424" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="12" x2="15" y2="12" stroke="#242424" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">LifeAdmin</span>
            <span className="brand-subtitle">PERSONAL DASHBOARD</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <span className="nav-group-title">MODULES</span>
            <ul className="nav-list">
              <li>
                <div className={`nav-item ${CURRENT_VIEW === 'dashboard' ? 'active' : ''}`}>
                  <span className="nav-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="9" rx="1"/>
                      <rect x="14" y="3" width="7" height="5" rx="1"/>
                      <rect x="14" y="12" width="7" height="9" rx="1"/>
                      <rect x="3" y="16" width="7" height="5" rx="1"/>
                    </svg>
                  </span>
                  <span className="nav-item-text">Dashboard</span>
                  {CURRENT_VIEW === 'dashboard' && <span className="nav-active-dot"></span>}
                </div>
              </li>
              <li>
                <div className={`nav-item ${CURRENT_VIEW === 'tasks' ? 'active' : ''}`}>
                  <span className="nav-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </span>
                  <span className="nav-item-text">Tasks</span>
                  {CURRENT_VIEW === 'tasks' && <span className="nav-active-dot"></span>}
                </div>
              </li>
            </ul>
          </div>
        </nav>

        {/* User profile footer */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">LA</div>
            <div className="user-info">
              <span className="user-name">LifeAdmin Account</span>
              <span className="user-plan">Personal Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {CURRENT_VIEW === 'dashboard' ? <Dashboard /> : <Tasks />}
      </main>
    </div>
  );
}

export default App;
