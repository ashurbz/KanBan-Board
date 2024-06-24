import TaskItem from "./TaskItem";

const TaskList = ({ tasks, stage }) => {
  if (!tasks) {
    return;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} stage={stage} />
      ))}
    </div>
  );
};

export default TaskList;
