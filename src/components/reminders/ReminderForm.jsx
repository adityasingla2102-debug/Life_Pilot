import { useState } from 'react';

/**
 * ReminderForm component provides a controlled form to create a new reminder.
 * Props:
 *  - onAddReminder: Function callback to send new reminder to parent component
 */
function ReminderForm({ onAddReminder }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim() || !date) {
      return;
    }

    const newReminder = {
      id: `rem-${Date.now()}`,
      title: title.trim(),
      date,
      category,
      priority,
      completed: false
    };

    onAddReminder(newReminder);

    // Reset form state
    setTitle('');
    setDate('');
    setCategory('Personal');
    setPriority('Medium');
  };

  return (
    <section className="reminder-form-card">
      <h3 className="form-heading">Add New Reminder</h3>
      <p className="form-subheading">Create a reminder for important upcoming deadlines or events.</p>

      <form onSubmit={handleSubmit} className="reminder-form">
        <div className="form-field">
          <label htmlFor="reminder-title" className="form-label">
            Reminder Title <span className="required-star">*</span>
          </label>
          <input
            id="reminder-title"
            type="text"
            className="form-input"
            placeholder="e.g. Renew driver's license"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="reminder-category" className="form-label">
              Category
            </label>
            <select
              id="reminder-category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Personal">Personal</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Documents">Documents</option>
              <option value="Bills">Bills</option>
              <option value="Appointments">Appointments</option>
              <option value="Subscriptions">Subscriptions</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="reminder-priority" className="form-label">
              Priority
            </label>
            <select
              id="reminder-priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="reminder-date" className="form-label">
            Due Date <span className="required-star">*</span>
          </label>
          <input
            id="reminder-date"
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-submit-reminder">
          Add Reminder
        </button>
      </form>
    </section>
  );
}

export default ReminderForm;
