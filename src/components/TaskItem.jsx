import { useState } from "react";
import { useDispatch } from "react-redux";
import { moveTask, deleteTask, editTask } from "../redux/TaskSlice";
import EditTaskForm from "./EditTaskForm.jsx";

const TaskItem = ({ task, stage }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleMove = (direction) => {
    dispatch(moveTask({ taskId: task.id, direction }));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedTask) => {
    dispatch(editTask(updatedTask));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        {isEditing ? (
          <EditTaskForm
            task={task}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <h5 className="card-title">{task.name}</h5>
            <p className="card-text">Priority: {task.priority}</p>
            <p className="card-text">Deadline: {task.deadline}</p>
            <button
              className="btn btn-warning"
              onClick={() => handleMove("backward")}
              disabled={stage === 0}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleMove("forward")}
              disabled={stage === 3}
            >
              Forward
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-secondary" onClick={handleEdit}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
