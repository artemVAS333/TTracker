import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, ProjectState, Task } from '../../types/projectTypes';

const initialState: ProjectState = {
  projects: [],
  activeProjectId: undefined,
};

const findProject = (state: ProjectState, projectId: string) => state.projects.find((p) => p.id === projectId);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<string>) => {
      state.projects.push({
        id: crypto.randomUUID(),
        name: action.payload,
        tasks: [],
      });
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    setActiveProject: (state, action: PayloadAction<string | undefined>) => {
      state.activeProjectId = action.payload;
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addTaskToProject: (state, action: PayloadAction<{ projectId: string; task: Task }>) => {
      const project = findProject(state, action.payload.projectId);
      if (project) project.tasks.push(action.payload.task);
    },
    removeTaskFromProject: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      const project = findProject(state, action.payload.projectId);
      if (project) project.tasks = project.tasks.filter((task) => task.id !== action.payload.taskId);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const project = findProject(state, action.payload);
      if (project) project.tasks = project.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addProject, deleteProject, setActiveProject, setProjects, addTaskToProject, removeTaskFromProject } =
  projectSlice.actions;
export default projectSlice.reducer;
