import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [] },
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);

      async function taskData() {
        try {
          const res = await axios.post(
            `http://localhost:9000/tasks`,
            action.payload
          );
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }

      taskData();
    },

    editTask(state, action) {
      const updatedState = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );

      async function updateTaskOnServer() {
        try {
          const res = await axios.put(
            `http://localhost:9000/tasks/${action.payload.id}`,
            action.payload
          );
        } catch (error) {
          console.error("Error updating task:", error.message);
        }
      }

      updateTaskOnServer();

      state.tasks = updatedState;
    },
    moveTask: (state, action) => {
      const { taskId, direction } = action.payload;

      const updatedState = state.tasks.map((task) => {
        if (task.id === taskId) {
          let newStage = task.stage;
          if (direction === "forward" && newStage < 3) newStage++;
          if (direction === "backward" && newStage > 0) newStage--;
          return { ...task, stage: newStage };
        }
        return task;
      });

      async function updateTaskOnServer() {
        try {
          const updatedTask = updatedState.find((task) => task.id === taskId);

          const res = await axios.put(
            `http://localhost:9000/tasks/${taskId}`,
            updatedTask
          );
        } catch (error) {
          console.error("Error moving task:", error.message);
        }
      }

      updateTaskOnServer();

      state.tasks = updatedState;
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;

      const updatedState = state.tasks.filter((task) => task.id !== taskId);

      async function deleteTaskOnServer() {
        try {
          const res = await axios.delete(
            `http://localhost:9000/tasks/${taskId}`
          );
        } catch (error) {
          console.error("Error deleting task:", error.message);
        }
      }

      deleteTaskOnServer();

      state.tasks = updatedState;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload || [];
    },

    getTasks: (state) => {
      return state.tasks;
    },
  },
});

export const {
  addTask,
  editTask,
  moveTask,
  deleteTask,

  setTasks,
  getTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
