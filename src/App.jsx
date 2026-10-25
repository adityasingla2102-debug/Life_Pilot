import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Tasks from './pages/Tasks/Tasks';
import Documents from './pages/Documents';
import Vehicles from './pages/Vehicles';
import Warranties from './pages/Warranties';
import Bills from './components/Bills';
import Subscriptions from './components/Subscriptions';
import Appointments from './components/Appointments';
import Reminders from './pages/Reminders/Reminders';
import NotFound from './pages/NotFound/NotFound';

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
  },
  {
    id: 5,
    title: "Submit semester fee receipt to admin office",
    category: "College",
    priority: "Medium",
    dueDate: "2026-09-05",
    completed: false
  },
  {
    id: 6,
    title: "Schedule car pollution & emission check (PUC)",
    category: "Vehicles",
    priority: "High",
    dueDate: "2026-09-01",
    completed: false
  },
  {
    id: 7,
    title: "Pay monthly broadband Wi-Fi bill",
    category: "Bills",
    priority: "Low",
    dueDate: "2026-09-10",
    completed: false
  },
  {
    id: 8,
    title: "Annual health checkup consultation",
    category: "Appointments",
    priority: "Medium",
    dueDate: "2026-09-20",
    completed: false
  },
  {
    id: 9,
    title: "Prepare presentation slides for final project",
    category: "College",
    priority: "High",
    dueDate: "2026-08-28",
    completed: false
  }
];

function App() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        if (Array.isArray(parsed)) {
          const existingIds = new Set(parsed.map(t => t.id));
          const existingTitles = new Set(parsed.map(t => (t.title || '').trim().toLowerCase()));
          const missingDefaults = INITIAL_TASKS.filter(
            initTask => !existingIds.has(initTask.id) && !existingTitles.has(initTask.title.trim().toLowerCase())
          );
          return [...parsed, ...missingDefaults];
        }
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
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <Dashboard
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              onNavigate={(view) => navigate('/' + view)}
            />
          }
        />
        <Route
          path="dashboard"
          element={
            <Dashboard
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              onNavigate={(view) => navigate('/' + view)}
            />
          }
        />
        <Route
          path="tasks"
          element={
            <Tasks
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
          }
        />
        <Route path="documents" element={<Documents />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="warranties" element={<Warranties />} />
        <Route path="bills" element={<Bills />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="reminders" element={<Reminders />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
