import { Outlet, NavLink, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      alias: '/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      )
    },
    {
      label: 'Tasks',
      path: '/tasks',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      label: 'Documents',
      path: '/documents',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      label: 'Vehicles',
      path: '/vehicles',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      )
    },
    {
      label: 'Warranties',
      path: '/warranties',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      label: 'Bills',
      path: '/bills',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <line x1="6" y1="15" x2="10" y2="15" />
        </svg>
      )
    },
    {
      label: 'Subscriptions',
      path: '/subscriptions',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      )
    },
    {
      label: 'Appointments',
      path: '/appointments',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      label: 'Reminders',
      path: '/reminders',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    }
  ];

  return (
    <div className="app-container">

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="6"
                stroke="#242424"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="#242424"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="9"
                x2="12"
                y2="12"
                stroke="#242424"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="12"
                x2="15"
                y2="12"
                stroke="#242424"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="brand-text">
            <span className="brand-title">LifePilot</span>
            <span className="brand-subtitle">PERSONAL DASHBOARD</span>
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
                    style={{ textDecoration: 'none' }}
                    className={({ isActive }) => {
                      const isAliasActive =
                        item.alias &&
                        location.pathname === item.alias;
                      return `nav-item ${isActive || isAliasActive ? 'active' : ''}`;
                    }}
                  >
                    {({ isActive }) => {
                      const isAliasActive =
                        item.alias &&
                        location.pathname === item.alias;
                      const active = isActive || isAliasActive;
                      return (
                        <>
                          <span className="nav-item-icon">
                            {item.icon}
                          </span>
                          <span className="nav-item-text">
                            {item.label}
                          </span>
                          {active && (
                            <span className="nav-active-dot"></span>
                          )}
                        </>
                      );
                    }}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              LP
            </div>
            <div className="user-info">
              <span className="user-name">
                LifePilot Account
              </span>
              <span className="user-plan">
                Personal Plan
              </span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
