import React from 'react';
import TaskCard from './TaskCard';

/**
 * TaskList component displays a collection of tasks.
 * Uses map() to render TaskCard components dynamically.
 */
function TaskList({ tasks }) {
  return (
    <div className="task-list-grid">
      {tasks.map(task => (
        <TaskCard 
          key={task.id}
          title={task.title}
          category={task.category}
          priority={task.priority}
          dueDate={task.dueDate}
          completed={task.completed}
        />
      ))}
    </div>
  );
}

export default TaskList;
