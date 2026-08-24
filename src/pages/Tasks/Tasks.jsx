
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';

/**
 * Tasks page displays the complete task list and the new task form.
 */
function Tasks({ tasks, onToggleComplete, onAddTask }) {
  return (
    <div className="page-tasks">
      <header className="page-header">
        <h1 className="page-title">Tasks</h1>
        <p className="page-subtitle">Track, organize, and manage your personal action items.</p>
      </header>

      <div className="tasks-layout">
        {/* Main List Column */}
        <main className="tasks-main-content">
          <section className="tasks-section">
            <h2 className="section-title">All Tasks</h2>
            <p className="section-desc">A complete list of your personal tasks</p>
            <TaskList tasks={tasks} onToggleComplete={onToggleComplete} />
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
