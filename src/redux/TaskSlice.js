import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
    },
    moveTask: (state, action) => {
      const { taskId, direction } = action.payload;
      console.log(action.payload);
      return state.map((task) => {
        if (task.id === taskId) {
          let newStage = task.stage;
          if (direction === "forward" && newStage < 3) newStage++;
          if (direction === "backward" && newStage > 0) newStage--;
          return { ...task, stage: newStage };
        }
        return task;
      });
    },

    deleteTask: (state, action) => {
      console.log(action.payload, "asdjkskdjsdk");
      return state.filter((task) => task.id !== action.payload);
    },
    clearTasks: (state, action) => {
      return (state = []);
    },
  },
});

export const { addTask, editTask, moveTask, deleteTask, clearTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
