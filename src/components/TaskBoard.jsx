import { useSelector } from "react-redux";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";

const TaskBoard = () => {
  const tasks = useSelector((state) => state.tasks);
  const stages = ["Backlog", "To Do", "Ongoing", "Done"];

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="container">
      <div className="row">
        {stages.map((stage, index) => (
          <Droppable key={stage} droppableId={stage}>
            {(provided) => (
              <div
                className="col"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>{stage}</h2>
                <TaskList
                  tasks={tasks.filter((task) => task.stage === index)}
                  stage={index}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
