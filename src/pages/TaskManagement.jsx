import { DragDropContext } from "react-beautiful-dnd";
import NavBar from "../components/NavBar";
import TaskBoard from "../components/TaskBoard";
import TaskForm from "../components/TaskForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../redux/TaskSlice";
import Trash from "../components/Trash";
import { useState } from "react";

const TaskManagement = () => {
  const [isDragging, setIsDragging] = useState(false);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onDragStart = () => {
    console.log(isDragging + "in drag start before true");

    setIsDragging(true);
    console.log(isDragging + "in drag start after true");
  };
  const onDragEnd = (result) => {
    console.log(isDragging + "in drag start before false");

    setIsDragging(false);
    console.log(isDragging + "in drag start after false");

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
    if (destination.droppableId === "trash") {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the task "${data[0].name}"?`
      );
      if (confirmDelete) {
        dispatch(deleteTask(data[0].id));
      }
      return;
    }
    console.log(data);

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
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <TaskBoard />

        <div
          style={{
            bottom: "100px",
            width: "90%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Trash />
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
