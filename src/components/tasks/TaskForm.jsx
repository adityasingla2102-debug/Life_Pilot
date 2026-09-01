import { useState, useEffect } from 'react';

const DEFAULT_CATEGORIES = ['College', 'Vehicles', 'Bills', 'Appointments'];

function TaskForm({ onAddTask }) {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CATEGORIES;
      }
    }
    return DEFAULT_CATEGORIES;
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategory.trim();

    if (!trimmed) {
      return;
    }

    const alreadyExists = categories.some(
      cat => cat.toLowerCase() === trimmed.toLowerCase()
    );

    if (!alreadyExists) {
      setCategories([...categories, trimmed]);
      setCategory(trimmed);
      setNewCategory('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      category: category || (categories[0] || 'College'),
      priority: priority || 'Medium',
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      completed: false
    };

    onAddTask(newTask);

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

        <div className="form-group">
          <label htmlFor="task-category-select">Category</label>
          <select 
            id="task-category-select" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="category-add-row">
          <input 
            type="text" 
            placeholder="New custom category..." 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="category-add-input"
          />
          <button 
            type="button" 
            className="btn-add-category"
            onClick={handleAddCategory}
          >
            + Add Category
          </button>
        </div>

        <div className="form-row">
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
        </div>

        <button type="submit" className="btn-primary">
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;

