import { useState, useEffect } from 'react';

import Dashboard from './pages/Dashboard/Dashboard';

import Tasks from './pages/Tasks/Tasks';

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Finalize college project documentation",
    category: "College",
    priority: "High",
    dueDate: "2026-08-25",
    completed: false
  },
  {
    id: 2,
    title: "Renew vehicle insurance",
    category: "Vehicles",
    priority: "High",
    dueDate: "2026-09-15",
    completed: false
  },
  {
    id: 3,
    title: "Pay electricity bill",
    category: "Bills",
    priority: "Medium",
    dueDate: "2026-08-30",
    completed: false
  },
  {
    id: 4,
    title: "Book dentist appointment",
    category: "Appointments",
    priority: "Low",
    dueDate: "2026-08-22",
    completed: false
  }
];

function App() {
  const [currentView, setCurrentView] = useState(() => {
    const savedView = localStorage.getItem('currentView');
    if (savedView) {
      return savedView;
    }
    return 'dashboard';
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        return INITIAL_TASKS;
      }
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    document.title = "LifePilot";
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

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

              <li>
                <div
                  className={
                    currentView === 'dashboard'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                  onClick={() => setCurrentView('dashboard')}
                >

                  <span className="nav-item-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="9" rx="1" />
                      <rect x="14" y="3" width="7" height="5" rx="1" />
                      <rect x="14" y="12" width="7" height="9" rx="1" />
                      <rect x="3" y="16" width="7" height="5" rx="1" />
                    </svg>
                  </span>

                  <span className="nav-item-text">
                    Dashboard
                  </span>

                  {currentView === 'dashboard' && (
                    <span className="nav-active-dot"></span>
                  )}

                </div>
              </li>

              <li>
                <div
                  className={
                    currentView === 'tasks'
                      ? 'nav-item active'
                      : 'nav-item'
                  }
                  onClick={() => setCurrentView('tasks')}
                >

                  <span className="nav-item-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>

                  <span className="nav-item-text">
                    Tasks
                  </span>

                  {currentView === 'tasks' && (
                    <span className="nav-active-dot"></span>
                  )}

                </div>
              </li>

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

        {currentView === 'dashboard' && (
          <Dashboard
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'tasks' && (
          <Tasks
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

      </main>

    </div>
  );
}

export default App;