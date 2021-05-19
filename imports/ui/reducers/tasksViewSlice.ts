import { createSlice } from "@reduxjs/toolkit";

export interface TasksViewState {
  selectedTaskId: string | null;
  currentMenu: "TaskDetails" | "NewTask" | null;
}

export const tasksViewSlice = createSlice({
  name: "tasksView",
  initialState: {
    selectedTaskId: null,
    currentMenu: null,
  } as TasksViewState,
  reducers: {
    setSelectedTask: (state, { payload: taskId }: { payload: string }) => {
      state.selectedTaskId = taskId;
      state.currentMenu = "TaskDetails";
    },
    setNewTaskMenuShown: (state) => {
      state.selectedTaskId = null;
      state.currentMenu = "NewTask";
    },
    setMenuClosed: (state) => {
      state.selectedTaskId = null;
      state.currentMenu = null;
    },
  },
});

export const { setSelectedTask, setNewTaskMenuShown, setMenuClosed } =
  tasksViewSlice.actions;
export default tasksViewSlice.reducer;
