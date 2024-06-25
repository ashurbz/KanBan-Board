import { DragDropContext } from "react-beautiful-dnd";
import NavBar from "../components/NavBar";
import TaskBoard from "../components/TaskBoard";
import TaskForm from "../components/TaskForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/TaskSlice";
import Trash from "../components/Trash";

const TaskManagement = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
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
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <NavBar />
      <TaskForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskBoard />
      </DragDropContext>
      <div
        style={{
          bottom: "100px",
          width: "90%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Trash />
      </div>
    </div>
  );
};

export default TaskManagement;
