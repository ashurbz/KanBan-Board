import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addTaskAsync = (task) => async (dispatch) => {
  dispatch(addTaskRequest());
  try {
    const response = await axios.post("http://localhost:9000/tasks", task);
    dispatch(addTaskSuccess(response.data));
  } catch (error) {
    dispatch(addTaskFailure(error.response.data));
  }
};

export const editTaskAsync = (task) => async (dispatch) => {
  console.log(task);
  dispatch(editTaskRequest(task.id));
  try {
    const response = await axios.put(
      `http://localhost:9000/tasks/${task.id}`,
      task
    );
    dispatch(editTaskSuccess(response.data));
  } catch (error) {
    dispatch(editTaskFailure(error.response.data));
  }
};

export const moveTaskAsync =
  ({ taskId, direction }) =>
  async (dispatch, getState) => {
    dispatch(moveTaskRequest());
    const state = getState().tasks.tasks;
    const foundTask = state.find((task) => task.id === taskId);
    if (!foundTask) return dispatch(moveTaskFailure("Task not found"));

    let newStage = foundTask.stage;
    if (direction === "forward" && newStage < 3) newStage++;
    if (direction === "backward" && newStage > 0) newStage--;

    const updatedTask = { ...foundTask, stage: newStage };

    try {
      const response = await axios.put(
        `http://localhost:9000/tasks/${taskId}`,
        updatedTask
      );
      dispatch(moveTaskSuccess(response.data));
    } catch (error) {
      dispatch(moveTaskFailure(error.response.data));
    }
  };

export const deleteTaskAsync = (taskId) => async (dispatch) => {
  dispatch(deleteTaskRequest(taskId));
  try {
    await axios.delete(`http://localhost:9000/tasks/${taskId}`);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    dispatch(deleteTaskFailure(error.response.data));
  }
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], error: null },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload || [];
    },
    clearTasks: (state) => {
      state.tasks = [];
    },

    addTaskRequest: (state) => {
      state.error = null;
    },
    addTaskSuccess: (state, action) => {
      state.tasks.push(action.payload);
    },
    addTaskFailure: (state, action) => {
      state.error = action.payload;
    },

    editTaskRequest: (state) => {
      state.error = null;
    },
    editTaskSuccess: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    editTaskFailure: (state, action) => {
      state.error = action.payload;
    },

    moveTaskRequest: (state) => {
      state.error = null;
    },
    moveTaskSuccess: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    moveTaskFailure: (state, action) => {
      state.error = action.payload;
    },

    deleteTaskRequest: (state) => {
      state.error = null;
    },
    deleteTaskSuccess: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    deleteTaskFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  clearTasks,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  moveTaskRequest,
  moveTaskSuccess,
  moveTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;
