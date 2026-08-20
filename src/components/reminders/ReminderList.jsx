import ReminderCard from './ReminderCard';

/**
 * ReminderList component renders a collection of reminders using map().
 * Props:
 *  - reminders: Array of reminder objects
 */
function ReminderList({ reminders }) {
  if (!reminders || reminders.length === 0) {
    return (
      <div className="reminders-empty-state">
        <p className="empty-title">No reminders found</p>
        <p className="empty-subtitle">Create a new reminder using the form to stay organized.</p>
      </div>
    );
  }

  return (
    <div className="reminder-list-grid">
      {reminders.map((reminder) => (
        <ReminderCard key={reminder.id} reminder={reminder} />
      ))}
    </div>
  );
}

export default ReminderList;
