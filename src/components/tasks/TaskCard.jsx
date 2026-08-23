

/**
 * TaskCard component represents an individual task.
 * Displays title, category, priority, due date, and completed status.
 */
function TaskCard({ id, title, category, priority, dueDate, completed, onToggleComplete }) {
  // Determine CSS classes based on priority for specific pill highlights
  const priorityClass = priority.toLowerCase() === 'high' ? 'priority-high' : 
                        priority.toLowerCase() === 'medium' ? 'priority-medium' : 'priority-low';

  const statusText = completed ? 'Completed' : 'Pending';
  const statusClass = completed ? 'status-completed' : 'status-pending';

  return (
    <article className={`task-card ${completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <span className={`task-badge ${priorityClass}`}>{priority} Priority</span>
        <span className={`task-badge ${statusClass}`}>{statusText}</span>
      </div>
      
      <h4 className="task-title">{title}</h4>
      
      <div className="task-details">
        <div className="task-detail-item">
          <span className="detail-label">Category</span>
          <span className="detail-value">{category}</span>
        </div>
        <div className="task-detail-item">
          <span className="detail-label">Due Date</span>
          <span className="detail-value">{dueDate}</span>
        </div>
      </div>

      {onToggleComplete && (
        <div className="task-card-actions">
          <button 
            type="button" 
            className={`btn-task-toggle ${completed ? 'completed' : 'pending'}`}
            onClick={() => onToggleComplete(id)}
          >
            {completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
        </div>
      )}
    </article>
  );
}

export default TaskCard;
