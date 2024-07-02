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

      console.log("Updating task with ID:", action.payload.id);
      console.log("Task data:", action.payload);

      async function updateTaskOnServer() {
        try {
          const res = await axios.put(
            `http://localhost:9000/tasks/${action.payload.id}`,
            action.payload
          );
          console.log(action.payload);

          console.log("Task updated successfully:", res.data);
        } catch (error) {
          console.error("Error updating task:", error.message);
        }
      }

      updateTaskOnServer();

      state.tasks = updatedState;
    },
    moveTask: (state, action) => {
      const { taskId, direction } = action.payload;
      console.log(action.payload);

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
          console.log("Task moved successfully:", res.data);
        } catch (error) {
          console.error("Error moving task:", error.message);
        }
      }

      updateTaskOnServer();

      state.tasks = updatedState;
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      console.log("Deleting task with ID:", taskId);

      const updatedState = state.tasks.filter((task) => task.id !== taskId);

      async function deleteTaskOnServer() {
        try {
          const res = await axios.delete(
            `http://localhost:9000/tasks/${taskId}`
          );
          console.log("Task deleted successfully:", res.data);
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

    clearTasks: (state) => {
      state.tasks = [];
    },
    getTasks: (state, action) => {
      return state.tasks;
    },
  },
});

export const {
  addTask,
  editTask,
  moveTask,
  deleteTask,
  clearTasks,
  setTasks,
  getTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
