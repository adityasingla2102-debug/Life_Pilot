import React from 'react';
import StatCard from '../../components/tasks/StatCard';
import TaskCard from '../../components/tasks/TaskCard';

/**
 * Dashboard page displays general metrics and a preview of current tasks.
 */
function Dashboard() {
  return (
    <div className="page-dashboard">
      <header className="page-header">
        <h1 className="page-title">LifeAdmin</h1>
        <p className="page-subtitle">Welcome back. Keep your personal life organized, calm, and on track.</p>
      </header>

      {/* Metrics Row */}
      <section className="stats-row">
        <StatCard number="12" label="Total Tasks" />
        <StatCard number="8" label="Completed" />
        <StatCard number="4" label="Pending" />
        <StatCard number="2" label="High Priority" />
      </section>

      {/* Preview Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Task Preview</h2>
          <p className="section-desc">Active tasks requiring your attention</p>
        </div>
        
        <div className="task-preview-grid">
          <TaskCard 
            title="Finalize college project documentation" 
            category="College" 
            priority="High" 
            dueDate="2026-08-25" 
            status="Pending" 
          />
          <TaskCard 
            title="Renew vehicle insurance" 
            category="Vehicles" 
            priority="High" 
            dueDate="2026-09-15" 
            status="Pending" 
          />
          <TaskCard 
            title="Pay electricity bill" 
            category="Bills" 
            priority="Medium" 
            dueDate="2026-08-30" 
            status="Pending" 
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
