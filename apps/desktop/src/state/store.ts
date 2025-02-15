import { configureStore } from '@reduxjs/toolkit';
import projectReducer, { setProjects } from './project/projectSlice';
import { loadProjectsFromStorage } from '../utils/storage';

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});

const savedProjects = loadProjectsFromStorage();
if (savedProjects.length) store.dispatch(setProjects(savedProjects));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
