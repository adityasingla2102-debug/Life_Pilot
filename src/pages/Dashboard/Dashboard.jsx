import StatCard from '../../components/tasks/StatCard';
import TaskCard from '../../components/tasks/TaskCard';

function Dashboard({ tasks, onToggleComplete, onDeleteTask, onNavigate }) {
  const previewTasks = tasks.slice(0, 3);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'High').length;

  let progressPercentage = 0;
  if (totalTasks > 0) {
    progressPercentage = Math.round((completedTasks / totalTasks) * 100);
  }


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (!task.completed && task.dueDate) {
      const parts = task.dueDate.split('-');
      const due = new Date(parts[0], parts[1] - 1, parts[2]);
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        deadlineTasks.push({ ...task, dueLabel: 'Due today' });
      } else if (diffDays === 1) {
        deadlineTasks.push({ ...task, dueLabel: 'Due tomorrow' });
      } else if (diffDays === 2) {
        deadlineTasks.push({ ...task, dueLabel: 'Due in 2 days' });
      }
    }
  }

  return (
    <div className="page-dashboard">
      <header className="page-header">
        <div className="header-title-group">
          <h1 className="page-title">LifePilot</h1>
          <p className="page-subtitle">Welcome back. Keep your personal life organized, calm, and on track.</p>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="stats-row">
        <StatCard number={totalTasks} label="Total Tasks" />
        <StatCard number={completedTasks} label="Completed" />
        <StatCard number={pendingTasks} label="Pending" />
        <StatCard number={highPriorityTasks} label="High Priority" />
      </section>

      {/* 2-Column Overview Section: Progress + Deadline Notification Panel */}
      <section className="dashboard-grid-row">
        <div className="dashboard-card progress-card">
          <div className="card-header-compact">
            <div>
              <span className="card-sub-label">Overview</span>
              <h3 className="card-heading">Task Completion</h3>
            </div>
            <span className="progress-percentage">{progressPercentage}%</span>
          </div>

          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="progress-card-footer">
            <span className="progress-status-text">
              {completedTasks} of {totalTasks} tasks completed
            </span>
            <span className="progress-remaining-text">
              {pendingTasks} remaining
            </span>
          </div>
        </div>

        {/* In-App Deadline Notification Panel */}
        <div className="dashboard-card notification-card">
          <div className="card-header-compact">
            <div>
              <span className="card-sub-label">Attention</span>
              <h3 className="card-heading">Approaching Deadlines</h3>
            </div>
            <span className={`task-badge ${deadlineTasks.length > 0 ? 'deadline-today' : 'status-completed'}`}>
              {deadlineTasks.length} {deadlineTasks.length === 1 ? 'Alert' : 'Alerts'}
            </span>
          </div>

          {deadlineTasks.length > 0 ? (
            <div className="notification-content">
              <div className="notification-list">
                {deadlineTasks.slice(0, 3).map(task => (
                  <div key={task.id} className="notification-item">
                    <div className="notification-item-info">
                      <span className="notification-item-title">{task.title}</span>
                      <span className="notification-item-category">{task.category}</span>
                    </div>
                    <span className="notification-item-badge">{task.dueLabel}</span>
                  </div>
                ))}
              </div>
              {deadlineTasks.length > 3 && (
                <span className="notification-more-text">
                  + {deadlineTasks.length - 3} more upcoming {deadlineTasks.length - 3 === 1 ? 'task' : 'tasks'}
                </span>
              )}
            </div>
          ) : (
            <div className="notification-empty">
              <p className="notification-empty-text">
                You're all caught up. No upcoming deadlines.
              </p>
            </div>
          )}

          <div className="focus-footer">
            <span className="focus-meta-text">
              {pendingTasks} total pending items across all categories
            </span>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <div className="section-header">
            <h2 className="section-title">Active Tasks</h2>
            <p className="section-desc">Recent personal responsibilities requiring attention</p>
          </div>
          {onNavigate && (
            <button 
              type="button" 
              className="btn-link-action"
              onClick={() => onNavigate('tasks')}
            >
              View All Tasks →
            </button>
          )}
        </div>
        
        {previewTasks.length > 0 ? (
          <div className="task-preview-grid">
            {previewTasks.map(task => (
              <TaskCard 
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="empty-tasks-card">
            <p>No tasks available. Go to the Tasks page to create your first task.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;

