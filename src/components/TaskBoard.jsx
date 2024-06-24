import { useSelector } from "react-redux";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const tasks = useSelector((state) => state.tasks);
  const stages = ["Backlog", "To Do", "Ongoing", "Done"];

  return (
    <div className="container">
      <div className="row">
        {stages.map((stage, index) => (
          <div key={index} className="col">
            <h2>{stage}</h2>
            <TaskList
              tasks={tasks.filter((task) => task.stage === index)}
              stage={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
