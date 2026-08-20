import React from 'react';

/**
 * TaskForm component serves as a visual shell for task creation.
 * Form elements are disabled and do not contain event handlers or state.
 */
function TaskForm() {
  return (
    <section className="task-form-container">
      <h3 className="form-title">Create New Task</h3>
      <form className="task-form-disabled">
        <div className="form-group">
          <label htmlFor="task-title-input">Task Title</label>
          <input 
            type="text" 
            id="task-title-input" 
            placeholder="e.g. Renew car insurance" 
            disabled 
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-category-select">Category</label>
            <select id="task-category-select" disabled defaultValue="">
              <option value="" disabled>Select category</option>
              <option value="College">College</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Bills">Bills</option>
              <option value="Appointments">Appointments</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="task-priority-select">Priority</label>
            <select id="task-priority-select" disabled defaultValue="">
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
            disabled 
          />
        </div>
        <button type="button" className="btn-primary btn-disabled" disabled>
          Add Task
        </button>
        <p className="form-note">Task creation will be enabled in Commit 2.</p>
      </form>
    </section>
  );
}

export default TaskForm;
