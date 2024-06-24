import NavBar from "../components/NavBar";
import TaskBoard from "../components/TaskBoard";
import TaskForm from "../components/TaskForm";

const TaskManagement = () => {
  return (
    <div>
      <NavBar />
      <TaskForm />
      <TaskBoard />
    </div>
  );
};

export default TaskManagement;
