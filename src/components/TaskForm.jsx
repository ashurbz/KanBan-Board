import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/TaskSlice";

const TaskForm = () => {
  const [task, setTask] = useState({ name: "", priority: "low", deadline: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.deadline) {
      window.alert("Please fill in all fields");
      return;
    }
    dispatch(addTask({ ...task, id: Date.now(), stage: 0 }));
    setTask({ name: "", priority: "low", deadline: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Task Name"
          value={task.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <select
          className="form-control"
          name="priority"
          value={task.priority}
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
          value={task.deadline}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
