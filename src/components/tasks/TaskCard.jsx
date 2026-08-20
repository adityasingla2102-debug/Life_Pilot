import React from 'react';

/**
 * TaskCard component represents an individual task.
 * Displays title, category, priority, due date, and status.
 */
function TaskCard({ title, category, priority, dueDate, status }) {
  // Determine CSS classes based on priority for specific pill highlights
  const priorityClass = priority.toLowerCase() === 'high' ? 'priority-high' : 
                        priority.toLowerCase() === 'medium' ? 'priority-medium' : 'priority-low';

  const statusClass = status.toLowerCase() === 'completed' ? 'status-completed' : 'status-pending';

  return (
    <article className="task-card">
      <div className="task-card-header">
        <span className={`task-badge ${priorityClass}`}>{priority} Priority</span>
        <span className={`task-badge ${statusClass}`}>{status}</span>
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
    </article>
  );
}

export default TaskCard;
