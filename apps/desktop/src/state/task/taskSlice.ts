import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from '../../types/taskTypes';

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string }>) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        title: action.payload.title,
        isActive: false,
        pinned: false,
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTaskToProject: (state, action: PayloadAction<{ taskId: string }>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.taskId);
    },
    moveTaskToFreeList: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { addTask, deleteTask, moveTaskToProject, moveTaskToFreeList } = taskSlice.actions;
export default taskSlice.reducer;
