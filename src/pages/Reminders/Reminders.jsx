import { useState } from 'react';
import ReminderList from '../../components/reminders/ReminderList';
import ReminderForm from '../../components/reminders/ReminderForm';
import { INITIAL_REMINDERS } from '../../data/initialReminders';

function Reminders() {
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);

  const handleAddReminder = (newReminder) => {
    setReminders((prevReminders) => [newReminder, ...prevReminders]);
  };

  const handleToggleReminder = (reminderId) => {
    setReminders((prevReminders) => prevReminders.map((reminder) => (
      reminder.id === reminderId
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    )));
  };

  const handleDeleteReminder = (reminderId) => {
    setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== reminderId));
  };

  const totalReminders = reminders.length;
  const pendingReminders = reminders.filter((r) => !r.completed).length;
  const highPriorityReminders = reminders.filter((r) => r.priority === 'High' && !r.completed).length;
  const completedReminders = reminders.filter((r) => r.completed).length;

  return (
    <div className="reminders-page">

      <header className="page-header">
        <h1 className="page-title">Reminders</h1>
        <p className="page-subtitle">Keep track of the things you don't want to forget.</p>
      </header>

      <section className="reminders-stats-row" aria-label="Reminder Statistics">
        <div className="stat-card">
          <span className="stat-number">{totalReminders}</span>
          <span className="stat-label">Total Reminders</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{pendingReminders}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-number stat-highlight-high">{highPriorityReminders}</span>
          <span className="stat-label">High Priority</span>
        </div>
        <div className="stat-card">
          <span className="stat-number stat-highlight-completed">{completedReminders}</span>
          <span className="stat-label">Completed</span>
        </div>
      </section>

      <div className="reminders-layout">

        <main className="reminders-main-column">
          <section className="reminders-section">
            <div className="section-header">
              <h2 className="section-title">All Reminders</h2>
              <p className="section-subtitle">A timely view of all your pending and completed reminders</p>
            </div>
            <ReminderList
              reminders={reminders}
              onToggleReminder={handleToggleReminder}
              onDeleteReminder={handleDeleteReminder}
            />
          </section>
        </main>

        <aside className="reminders-aside-column">
          <ReminderForm onAddReminder={handleAddReminder} />
        </aside>
      </div>
    </div>
  );
}

export default Reminders;
