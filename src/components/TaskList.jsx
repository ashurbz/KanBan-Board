import { Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, stage }) => {
  if (!tasks) {
    return;
  }
  console.log(tasks);
  return (
    <div>
      {tasks.map((task, index) => (
        <Draggable draggableId={task.name} key={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskItem task={task} stage={stage} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TaskList;
