import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { moveTask, deleteTask } from "../redux/TaskSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id, stage: task.stage },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  const handleMove = (direction) => {
    dispatch(moveTask({ taskId: task.id, direction }));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className="card mb-2" ref={drag} style={{ opacity }}>
      <div className="card-body">
        <h5 className="card-title">{task.name}</h5>
        <p className="card-text">Priority: {task.priority}</p>
        <p className="card-text">Deadline: {task.deadline}</p>
        <button
          className="btn btn-warning"
          onClick={() => handleMove("backward")}
          disabled={task.stage === 0}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleMove("forward")}
          disabled={task.stage === 3}
        >
          Forward
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
