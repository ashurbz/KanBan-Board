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
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, editTask, moveTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
