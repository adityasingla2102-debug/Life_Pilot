/**
 * ReminderCard component displays a single reminder item.
 * Props:
 *  - reminder: { id, title, date, category, priority, completed }
 */
function ReminderCard({ reminder }) {
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
      </div>
    </article>
  );
}

export default ReminderCard;
