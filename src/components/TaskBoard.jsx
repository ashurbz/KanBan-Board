import { useSelector } from "react-redux";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskBoard = () => {
  const tasks = useSelector((state) => state.tasks);
  const stages = ["Backlog", "To Do", "Ongoing", "Done"];

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="container-fluid">
      <div className="row">
        {stages.map((stage, index) => (
          <Droppable key={stage} droppableId={stage}>
            {(provided) => (
              <div
                className="col-12 col-md-6 col-lg-3 mb-3"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="p-2 border rounded bg-light">
                  <h2 className="text-center">{stage}</h2>
                  <TaskList
                    tasks={tasks.filter((task) => task.stage === index)}
                    stage={index}
                  />
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
