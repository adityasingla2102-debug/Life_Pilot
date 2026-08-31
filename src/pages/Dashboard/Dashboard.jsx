function Dashboard() {
  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome to LifeAdmin. Manage your personal life here.</p>
      </header>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Getting Started</h2>
          <p>Use the sidebar navigation to explore different modules and manage your personal information.</p>
        </div>
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Reminders</h2>
          <p>Navigate to Reminders to keep track of important tasks and deadlines.</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
