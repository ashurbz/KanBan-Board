import { useState } from "react";

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Task Name"
          value={editedTask.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <select
          className="form-control"
          name="priority"
          value={editedTask.priority}
          onChange={handleChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="form-group">
        <input
          type="date"
          className="form-control"
          name="deadline"
          value={editedTask.deadline}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditTaskForm;
