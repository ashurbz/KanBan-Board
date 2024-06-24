import NavBar from "../components/NavBar";
import TaskBoard from "../components/TaskBoard";
import TaskList from "../components/TaskList";

const TaskManagement = () => {
  return (
    <div>
      <NavBar />
      <TaskBoard />
      <TaskList />
    </div>
  );
};

export default TaskManagement;
