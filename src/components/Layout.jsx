import { Outlet, NavLink } from 'react-router-dom';

function Layout() {
  const navigationItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Reminders', path: '/reminders' },
  ];

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
          <div className="brand-info">
            <span className="brand-name">Life Pilot</span>
            <span className="brand-tagline">PERSONAL DASHBOARD</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <span className="nav-group-title">MODULES</span>
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? 'active' : ''}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="nav-item-icon">
                          {/* Using bell icon for all items */}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                          </svg>
                        </span>
                        <span className="nav-item-text">{item.label}</span>
                        {isActive && <span className="nav-active-dot"></span>}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User profile footer */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">LA</div>
            <div className="user-details">
              <span className="user-name">Life Pilot Account</span>
              <span className="user-role">Personal Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
