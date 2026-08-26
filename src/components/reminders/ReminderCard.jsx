/**
 * ReminderCard component displays a single reminder item.
 * Props:
 *  - reminder: { id, title, date, category, priority, completed }
 */
function ReminderCard({ reminder, onToggle, onDelete }) {
  const { title, date, category, priority, completed } = reminder;

  // Determine styling based on priority
  const getPriorityBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'badge-priority-high';
      case 'medium':
        return 'badge-priority-medium';
      case 'low':
        return 'badge-priority-low';
      default:
        return 'badge-priority-low';
    }
  };

  return (
    <article className={`reminder-card ${completed ? 'reminder-card-completed' : ''}`}>
      <div className="reminder-card-header">
        <div className="reminder-badges">
          <span className={`reminder-badge ${getPriorityBadgeClass(priority)}`}>
            {priority} Priority
          </span>
          <span className="reminder-category-badge">
            {category}
          </span>
        </div>
        <span className={`reminder-status-pill ${completed ? 'status-completed' : 'status-pending'}`}>
          {completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <h3 className="reminder-title">{title}</h3>

      <div className="reminder-card-footer">
        <div className="reminder-date-info">
          <span className="reminder-date-label">Due Date</span>
          <span className="reminder-date-value">{date}</span>
        </div>
        <div className="reminder-card-actions">
          <button
            type="button"
            className="reminder-action-button reminder-toggle-button"
            onClick={() => onToggle(reminder.id)}
          >
            {completed ? 'Mark Pending' : 'Mark Complete'}
          </button>
          <button
            type="button"
            className="reminder-action-button reminder-delete-button"
            onClick={() => onDelete(reminder.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default ReminderCard;
