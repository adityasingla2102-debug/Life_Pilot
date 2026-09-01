function TaskCard({ task, onToggleComplete, onDeleteTask }) {
  let priorityClass = 'priority-low';
  if (task.priority === 'High') {
    priorityClass = 'priority-high';
  } else if (task.priority === 'Medium') {
    priorityClass = 'priority-medium';
  }

  let deadlineLabel = 'Upcoming';
  let deadlineClass = 'deadline-upcoming';

  if (task.completed) {
    deadlineLabel = 'Completed';
    deadlineClass = 'status-completed';
  } else if (task.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = task.dueDate.split('-');
    const due = new Date(parts[0], parts[1] - 1, parts[2]);

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      deadlineLabel = 'OVERDUE';
      deadlineClass = 'deadline-overdue';
    } else if (diffDays === 0) {
      deadlineLabel = 'DUE TODAY';
      deadlineClass = 'deadline-today';
    } else if (diffDays <= 3) {
      deadlineLabel = 'DUE SOON';
      deadlineClass = 'deadline-soon';
    }
  }

  return (
    <article className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-badges-group">
          <span className={`task-badge ${priorityClass}`}>{task.priority}</span>
          <span className={`task-badge ${deadlineClass}`}>{deadlineLabel}</span>
        </div>
      </div>
      
      <div className="task-details">
        <div className="task-detail-item">
          <span className="detail-label">Category</span>
          <span className="detail-value">{task.category}</span>
        </div>
        <div className="task-detail-item">
          <span className="detail-label">Due Date</span>
          <span className="detail-value">{task.dueDate}</span>
        </div>
      </div>

      {(onToggleComplete || onDeleteTask) && (
        <div className="task-card-actions">
          {onDeleteTask && (
            <button 
              type="button" 
              className="btn-task-delete"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          )}

          {onToggleComplete && (
            <button 
              type="button" 
              className={`btn-task-toggle ${task.completed ? 'completed' : 'pending'}`}
              onClick={() => onToggleComplete(task.id)}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default TaskCard;


