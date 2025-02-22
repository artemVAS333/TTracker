import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './project/projectSlice';
import taskReducer from './task/taskSlice';

const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
