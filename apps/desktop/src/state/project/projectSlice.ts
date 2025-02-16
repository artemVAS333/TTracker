import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Task, ProjectState } from '../../types/projectTypes';

const initialState: ProjectState = {
  projects: [],
};

const findProject = (state: ProjectState, projectId: string) => state.projects.find((p) => p.id === projectId);

const updateTask = (project: Project | undefined, taskId: string, updates: Partial<Task>) => {
  if (project) project.tasks = project.tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task));
};

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
    setActiveProject: (state, action: PayloadAction<string>) => {
      state.activeProjectId = action.payload;
    },
    unSetActiveProject: (state) => {
      state.activeProjectId = undefined;
    },
    addTask: (state, action: PayloadAction<{ projectId: string; title: string }>) => {
      const project = findProject(state, action.payload.projectId);
      if (project) {
        project.tasks.push({
          id: crypto.randomUUID(),
          title: action.payload.title,
          isActive: false,
          pinned: false,
        });
      }
    },
    deleteTask: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      const project = findProject(state, action.payload.projectId);
      if (project) project.tasks = project.tasks.filter((task) => task.id !== action.payload.taskId);
    },
    startTask: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      updateTask(findProject(state, action.payload.projectId), action.payload.taskId, {
        isActive: true,
        startTime: Date.now(),
      });
    },
    stopTask: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      updateTask(findProject(state, action.payload.projectId), action.payload.taskId, {
        isActive: false,
      });
    },
    pinTask: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      updateTask(findProject(state, action.payload.projectId), action.payload.taskId, {
        pinned: true,
      });
    },
    unPinTask: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      updateTask(findProject(state, action.payload.projectId), action.payload.taskId, {
        pinned: false,
      });
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
  },
});

export const {
  addProject,
  deleteTask,
  deleteProject,
  setActiveProject,
  unSetActiveProject,
  addTask,
  startTask,
  stopTask,
  pinTask,
  unPinTask,
  setProjects,
} = projectSlice.actions;
export default projectSlice.reducer;
