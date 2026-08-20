import React from 'react';
import TaskCard from './TaskCard';

/**
 * TaskList component displays a collection of tasks.
 * As per Commit 1 rules, map() and filter() are not used; cards are rendered statically.
 */
function TaskList() {
  return (
    <div className="task-list-grid">
      <TaskCard 
        title="Finalize college project documentation" 
        category="College" 
        priority="High" 
        dueDate="2026-08-25" 
        status="Pending" 
      />
      <TaskCard 
        title="Renew vehicle insurance" 
        category="Vehicles" 
        priority="High" 
        dueDate="2026-09-15" 
        status="Pending" 
      />
      <TaskCard 
        title="Pay electricity bill" 
        category="Bills" 
        priority="Medium" 
        dueDate="2026-08-30" 
        status="Pending" 
      />
      <TaskCard 
        title="Book dentist appointment" 
        category="Appointments" 
        priority="Low" 
        dueDate="2026-08-22" 
        status="Pending" 
      />
    </div>
  );
}

export default TaskList;
