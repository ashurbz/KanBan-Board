import { DragDropContext } from "react-beautiful-dnd";
import NavBar from "../components/NavBar";
import TaskBoard from "../components/TaskBoard";
import TaskForm from "../components/TaskForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/TaskSlice";

const TaskManagement = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const stages = ["Backlog", "To Do", "Ongoing", "Done"];

    const data = tasks.filter((task) => task.name === result.draggableId);

    dispatch(
      editTask({
        ...data[0],
        stage: stages.indexOf(result.destination.droppableId),
      })
    );
  };
  return (
    <div>
      <NavBar />
      <TaskForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskBoard />
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
