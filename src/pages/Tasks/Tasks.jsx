import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';

function Tasks({ tasks, onToggleComplete, onAddTask, onDeleteTask }) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'High').length;

  return (
    <div className="page-tasks">
      <header className="page-header">
        <div className="header-title-group">
          <h1 className="page-title">Tasks</h1>
          <p className="page-subtitle">Track, organize, and manage your personal action items.</p>
        </div>
        <div className="header-summary-chips">
          <span className="summary-chip">{totalTasks} Total</span>
          <span className="summary-chip">{pendingTasks} Pending</span>
          <span className="summary-chip">{highPriorityTasks} High Priority</span>
        </div>
      </header>

      <div className="tasks-layout">
        {/* Main List Column */}
        <main className="tasks-main-content">
          <section className="tasks-section">
            <div className="section-header">
              <h2 className="section-title">All Tasks</h2>
              <p className="section-desc">A complete list of your personal tasks</p>
            </div>
            {tasks.length > 0 ? (
              <TaskList 
                tasks={tasks} 
                onToggleComplete={onToggleComplete} 
                onDeleteTask={onDeleteTask} 
              />
            ) : (
              <div className="empty-tasks-card">
                <p>No tasks found. Use the form on the right to create your first task.</p>
              </div>
            )}
          </section>
        </main>

        {/* Sidebar Form Column */}
        <aside className="tasks-sidebar-content">
          <TaskForm onAddTask={onAddTask} />
        </aside>
      </div>
    </div>
  );
}

export default Tasks;
