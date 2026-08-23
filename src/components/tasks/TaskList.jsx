
import TaskCard from './TaskCard';

/**
 * TaskList component displays a collection of tasks.
 * Uses map() to render TaskCard components dynamically.
 */
function TaskList({ tasks, onToggleComplete }) {
  return (
    <div className="task-list-grid">
      {tasks.map(task => (
        <TaskCard 
          key={task.id}
          id={task.id}
          title={task.title}
          category={task.category}
          priority={task.priority}
          dueDate={task.dueDate}
          completed={task.completed}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;
