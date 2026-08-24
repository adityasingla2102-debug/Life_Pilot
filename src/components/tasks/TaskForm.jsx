import { useState } from 'react';

/**
 * TaskForm component serves as a form for task creation.
 */
function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the title is not empty
    if (!title.trim()) {
      return;
    }

    // Create a new task object following the required structure
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      category: category || 'College',
      priority: priority || 'Medium',
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      completed: false
    };

    onAddTask(newTask);

    // Clear the form fields
    setTitle('');
    setCategory('');
    setPriority('');
    setDueDate('');
  };

  return (
    <section className="task-form-container">
      <h3 className="form-title">Create New Task</h3>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title-input">Task Title</label>
          <input 
            type="text" 
            id="task-title-input" 
            placeholder="e.g. Renew car insurance" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-category-select">Category</label>
            <select 
              id="task-category-select" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select category</option>
              <option value="College">College</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Bills">Bills</option>
              <option value="Appointments">Appointments</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="task-priority-select">Priority</label>
            <select 
              id="task-priority-select" 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="" disabled>Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="task-date-input">Due Date</label>
          <input 
            type="date" 
            id="task-date-input" 
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
