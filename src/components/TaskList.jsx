import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveTask } from "../redux/TaskSlice";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, stage }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item) => {
        if (item.stage !== stage) {
          dispatch(
            moveTask({
              taskId: item.id,
              direction: item.stage < stage ? "forward" : "backward",
            })
          );
        }
      },
    }),
    [stage]
  );

  return (
    <div ref={drop}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
