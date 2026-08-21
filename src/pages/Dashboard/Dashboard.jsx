import React from 'react';
import StatCard from '../../components/tasks/StatCard';
import TaskCard from '../../components/tasks/TaskCard';

/**
 * Dashboard page displays general metrics and a preview of current tasks.
 */
function Dashboard({ tasks }) {
  // Show a preview of the first 3 tasks
  const previewTasks = tasks.slice(0, 3);

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
          {previewTasks.map(task => (
            <TaskCard 
              key={task.id}
              title={task.title}
              category={task.category}
              priority={task.priority}
              dueDate={task.dueDate}
              completed={task.completed}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
