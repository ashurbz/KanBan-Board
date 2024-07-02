import { DragDropContext } from "react-beautiful-dnd";
import NavBar from "../components/NavBar";
import TaskBoard from "../components/TaskBoard";
import TaskForm from "../components/TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { deleteTaskAsync, editTaskAsync } from "../redux/TaskSlice";
import Trash from "../components/Trash";
import { useState } from "react";

const TaskManagement = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result) => {
    setIsDragging(false);
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const stages = ["Backlog", "To Do", "Ongoing", "Done"];
    const task = tasks.find((task) => task.name === result.draggableId);

    if (destination.droppableId === "trash") {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the task "${task.name}"?`
      );
      if (confirmDelete) {
        dispatch(deleteTaskAsync(task.id));
      }
      return;
    }

    dispatch(
      editTaskAsync({
        ...task,
        stage: stages.indexOf(destination.droppableId),
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
            position: "fixed",
            maxHeight: "100px",
            bottom: "100px",
            width: "90%",
            opacity: isDragging ? "1" : "0",
            marginLeft: "90%",
          }}
        >
          <Trash />
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
