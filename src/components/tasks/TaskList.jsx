import TaskCard from './TaskCard';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  return (
    <div className="task-list-grid">
      {tasks.map(task => (
        <TaskCard 
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
