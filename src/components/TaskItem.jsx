import { useState } from "react";
import { useDispatch } from "react-redux";
import { moveTask, deleteTask, editTask } from "../redux/TaskSlice";
import EditTaskForm from "./EditTaskForm.jsx";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Card className="mb-3">
      <Card.Body>
        {isEditing ? (
          <EditTaskForm
            task={task}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <Card.Title>{task.name}</Card.Title>
            <Card.Text>Priority: {task.priority}</Card.Text>
            <Card.Text>Deadline: {task.deadline}</Card.Text>
            <div className="d-flex flex-wrap justify-content-between">
              <Button
                variant="primary"
                onClick={() => handleMove("backward")}
                disabled={stage === 0}
                className="mb-2 me-2"
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => handleMove("forward")}
                disabled={stage === 3}
                className="mb-2 me-2"
              >
                Forward
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="mb-2 me-2"
              >
                Delete
              </Button>
              <Button variant="secondary" onClick={handleEdit} className="mb-2">
                Edit
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
